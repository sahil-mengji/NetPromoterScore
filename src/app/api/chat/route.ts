import { NextRequest, NextResponse } from 'next/server';
import { Message } from '@/types';

// You can switch between OpenAI and Gemini by changing this configuration
const LLM_PROVIDER = 'openai'; // or 'gemini'

interface ChatRequest {
  npsScore: number;
  category: 'detractor' | 'passive' | 'promoter';
  messages: Message[];
  isInitial: boolean;
}

interface APIMessage {
  role: string;
  content: string;
}

async function callOpenAI(messages: APIMessage[], systemPrompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(messages: APIMessage[], systemPrompt: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: systemPrompt + '\n\n' + messages.map(m => `${m.role}: ${m.content}`).join('\n')
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const { npsScore, category, messages, isInitial }: ChatRequest = await request.json();

    // Generate system prompt based on NPS score and category
    const systemPrompt = generateSystemPrompt(npsScore, category, isInitial);

    // Convert messages to API format
    const apiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    let responseMessage: string;

    if (LLM_PROVIDER === 'openai') {
      responseMessage = await callOpenAI(apiMessages, systemPrompt);
    } else if (LLM_PROVIDER === 'gemini') {
      responseMessage = await callGemini(apiMessages, systemPrompt);
    } else {
      throw new Error('Invalid LLM provider');
    }

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}

function generateSystemPrompt(npsScore: number, category: string, isInitial: boolean): string {
  const basePrompt = `You are a customer feedback specialist having a conversation with a customer who just gave an NPS score of ${npsScore}/10, making them a ${category}.`;

  if (isInitial) {
    switch (category) {
      case 'detractor':
        return `${basePrompt} 
        
This is your first message. You should:
- Thank them for their feedback
- Acknowledge that their score indicates they had some challenges
- Ask what specifically went wrong or what could be improved
- Be empathetic and show genuine interest in making things better
- Keep it conversational and not too formal
- Be concise but warm`;

      case 'passive':
        return `${basePrompt}
        
This is your first message. You should:
- Thank them for their feedback
- Acknowledge that their score shows they had an okay experience
- Ask what would make their experience great rather than just okay
- Show interest in understanding what's missing
- Be friendly and encouraging
- Keep it conversational and not too formal
- Be concise but engaging`;

      case 'promoter':
        return `${basePrompt}
        
This is your first message. You should:
- Thank them enthusiastically for their high rating
- Express genuine appreciation for their satisfaction
- Ask what specifically made their experience great
- Show interest in understanding what we did well
- Be warm and appreciative
- Keep it conversational and not too formal
- Be concise but enthusiastic`;

      default:
        return `${basePrompt} This is your first message. Ask them about their experience in a friendly way.`;
    }
  } else {
    return `${basePrompt}
    
Continue the conversation by:
- Responding appropriately to their latest message
- Asking follow-up questions to gather deeper insights
- Being empathetic and understanding
- Providing helpful responses when appropriate
- Keeping the conversation flowing naturally
- Being concise but thorough
- Showing genuine interest in their feedback
    
Remember their NPS score of ${npsScore} and adjust your tone accordingly.`;
  }
}