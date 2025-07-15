"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ChatMessage from "./ChatMessage";
import { Message, NPSCategory } from "@/types";
import { generateId } from "@/lib/utils";
import {
  Send,
  Loader2,
  MessageCircle,
  Star,
  Bot,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface ChatInterfaceProps {
  npsScore: number;
  category: NPSCategory;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  npsScore,
  category,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get initial message from LLM
    const getInitialMessage = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            npsScore,
            category: category.type,
            messages: [],
            isInitial: true,
          }),
        });

        const data = await response.json();

        if (data.message) {
          const initialMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          };
          setMessages([initialMessage]);
        } else if (data.error) {
          console.error("API Error:", data.error);
          // Show specific error if available
          const errorMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: `I'm having trouble connecting to our AI service: ${data.error}. Please try again in a moment.`,
            timestamp: new Date(),
          };
          setMessages([errorMessage]);
        }
      } catch (error) {
        console.error("Error getting initial message:", error);
        // Fallback message
        const fallbackMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: `Thank you for rating us ${npsScore}/10! I'd love to understand more about your experience. What influenced your rating?`,
          timestamp: new Date(),
        };
        setMessages([fallbackMessage]);
      } finally {
        setInitialLoading(false);
      }
    };

    getInitialMessage();
  }, [npsScore, category]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    // Update messages with the new user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          npsScore,
          category: category.type,
          messages: updatedMessages, // Use the updated messages array
          isInitial: false,
        }),
      });

      const data = await response.json();

      if (data.message) {
        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (data.error) {
        console.error("API Error:", data.error);
        const errorMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: `I'm having trouble connecting to our AI service: ${data.error}. Please try again.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Card className="relative bg-white/95 shadow-2xl backdrop-blur-xl border-0 w-full max-w-4xl overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 opacity-20 blur-xl animate-pulse"></div>

          <CardContent className="z-10 relative flex flex-col justify-center items-center py-20">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 shadow-lg mb-6 p-5 rounded-2xl animate-bounce-gentle">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="font-semibold text-gray-700 text-xl">
                Initializing AI Assistant...
              </span>
            </div>
            <p className="mt-2 max-w-md text-gray-600 text-center leading-relaxed">
              We&apos;re creating a personalized conversation experience based on
              your NPS score of{" "}
              <span className="font-semibold text-blue-600">{npsScore}/10</span>
            </p>
            <div className="flex items-center space-x-2 mt-6 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>This usually takes just a moment...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCategoryGradient = () => {
    switch (category.type) {
      case "promoter":
        return "from-emerald-500 to-green-600";
      case "passive":
        return "from-amber-500 to-orange-600";
      case "detractor":
        return "from-red-500 to-rose-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryBg = () => {
    switch (category.type) {
      case "promoter":
        return "from-emerald-50 to-green-50";
      case "passive":
        return "from-amber-50 to-orange-50";
      case "detractor":
        return "from-red-50 to-rose-50";
      default:
        return "from-gray-50 to-gray-50";
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="relative flex flex-col bg-white/95 shadow-2xl backdrop-blur-xl border-0 w-full max-w-5xl h-[750px] overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600"></div>
        </div>

        {/* Enhanced Header */}
        <CardHeader
          className={`relative z-10 bg-gradient-to-r ${getCategoryBg()} border-b border-gray-200/50 shrink-0`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div
                className={`bg-gradient-to-r ${getCategoryGradient()} p-3 rounded-xl shadow-lg`}
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="mb-1 font-bold text-gray-800 text-xl">
                  Feedback Conversation
                </CardTitle>
                <p className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Bot className="w-4 h-4" />
                  <span>Powered by AI Assistant</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1 text-gray-600 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Your NPS Score</span>
                </div>
                <div
                  className={`bg-gradient-to-r ${getCategoryGradient()} px-4 py-2 rounded-xl text-white text-sm font-bold shadow-lg`}
                >
                  {npsScore}/10 • {category.label}
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle2 className="mr-1 w-4 h-4" />
                <span>Connected</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Chat Area */}
        <CardContent className="z-10 relative flex flex-col flex-1 p-6 overflow-hidden">
          <div className="flex-1 space-y-6 mb-6 pr-2 min-h-[300px] overflow-y-auto custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex justify-center items-center py-8 text-gray-500 text-center">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 shadow-lg px-6 py-4 border border-gray-200 rounded-2xl max-w-xs">
                  <div className="flex items-center">
                    <div
                      className={`flex justify-center items-center bg-gradient-to-r ${getCategoryGradient()} mr-3 rounded-full w-8 h-8 shadow-lg`}
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"></div>
                        <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-100"></div>
                        <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-200"></div>
                      </div>
                      <span className="font-medium text-gray-600 text-sm">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="bg-gradient-to-r from-white to-gray-50 shadow-inner p-5 border-2 border-gray-200 rounded-2xl">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts and feedback..."
                  disabled={isLoading}
                  className="bg-white shadow-md focus:shadow-lg px-4 py-3 pr-12 border-2 border-gray-200 focus:border-blue-300 rounded-xl w-full text-sm transition-all duration-200"
                />
                {inputValue && (
                  <div className="top-1/2 right-3 absolute -translate-y-1/2 transform">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`bg-gradient-to-r ${getCategoryGradient()} hover:shadow-xl px-6 py-3 rounded-xl text-white transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <div className="flex justify-between items-center mt-3 text-gray-500 text-xs">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <div className="flex items-center space-x-4">
                <span>{inputValue.length}/500</span>
                <div className="flex items-center space-x-1">
                  <div className="bg-green-400 rounded-full w-2 h-2"></div>
                  <span>Secure & Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
