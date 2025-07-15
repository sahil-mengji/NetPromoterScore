export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NPSCategory {
  type: 'detractor' | 'passive' | 'promoter';
  label: string;
  color: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface ConversationContext {
  npsScore: number;
  category: NPSCategory;
  messages: Message[];
}

