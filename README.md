# NPS Conversational Agent

A modern web application that collects Net Promoter Score (NPS) feedback and transitions to an AI-powered conversational interface for gathering deeper customer insights.

## Features

- **Interactive NPS Form**: Beautiful 0-10 score selection interface
- **AI-Powered Conversations**: Seamless transition to chat interface after score selection
- **Contextual Responses**: AI adapts tone and questions based on NPS category (Detractor, Passive, Promoter)
- **Real-time Chat**: Instant responses powered by OpenAI GPT-4 or Google Gemini
- **Modern UI**: Built with Tailwind CSS and Shadcn components
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **AI Integration**: OpenAI GPT-4 or Google Gemini API
- **State Management**: React hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key OR Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nps-conversational-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your API key to `.env.local`:
```bash
# For OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# OR for Gemini
GOOGLE_API_KEY=your_google_api_key_here
```

5. Configure LLM provider in `src/app/api/chat/route.ts`:
```typescript
const LLM_PROVIDER = 'openai'; // or 'gemini'
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **NPS Selection**: Users select a score from 0-10
2. **Automatic Transition**: Form disappears and chat interface appears
3. **AI Conversation**: AI asks contextual follow-up questions based on the score
4. **Ongoing Chat**: Users can continue the conversation to provide detailed feedback

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts         # LLM API integration
│   ├── page.tsx                  # Main page component
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── NPSForm.tsx              # NPS score selection form
│   ├── ChatInterface.tsx        # Main chat interface
│   └── ChatMessage.tsx          # Individual chat message
├── lib/
│   └── utils.ts                 # Utility functions
└── types/
    └── index.ts                 # TypeScript interfaces
```

## Configuration

### Switching LLM Providers

To switch between OpenAI and Gemini:

1. Update the `LLM_PROVIDER` constant in `src/app/api/chat/route.ts`
2. Add the corresponding API key to `.env.local`
3. Restart the development server

### Customizing AI Behavior

Modify the `generateSystemPrompt` function in `src/app/api/chat/route.ts` to customize how the AI responds to different NPS categories.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## API Reference

### POST /api/chat

Sends message to AI and receives response.

**Request Body:**
```json
{
  "npsScore": 8,
  "category": "passive",
  "messages": [
    {
      "id": "msg1",
      "role": "user",
      "content": "The service was okay",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  ],
  "isInitial": false
}
```

**Response:**
```json
{
  "message": "Thanks for sharing that! What would have made your experience great instead of just okay?"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.
