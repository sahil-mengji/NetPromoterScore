"use client";

import React, { useState } from "react";
import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { MessageCircle, User, Copy, Check, Bot, Sparkles } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full mb-8 animate-fade-in group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-3xl px-6 py-5 shadow-lg transition-all duration-300 hover:shadow-xl relative",
          isUser
            ? "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-200 hover:shadow-blue-300 ml-12"
            : "bg-white text-gray-900 border border-gray-200 shadow-gray-200 hover:shadow-gray-300 mr-12"
        )}
      >
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg",
            isUser
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          )}
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>

        {/* Assistant Header */}
        {!isUser && (
          <div className="flex items-center mb-4">
            <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg mr-3 rounded-full w-10 h-10">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="flex items-center space-x-2 font-bold text-gray-800 text-sm">
                <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent">
                  NPS Assistant
                </span>
                <Sparkles className="w-3 h-3 text-purple-500" />
              </span>
              <p className="text-gray-500 text-xs">
                AI-Powered Feedback Analysis
              </p>
            </div>
          </div>
        )}

        {/* User Header */}
        {isUser && (
          <div className="flex justify-end items-center mb-4">
            <div className="mr-3 text-right">
              <span className="font-bold text-blue-100 text-sm">You</span>
              <p className="text-blue-200 text-xs">Customer</p>
            </div>
            <div className="flex justify-center items-center bg-white/25 shadow-lg backdrop-blur-sm rounded-full w-10 h-10">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isUser ? "text-white" : "text-gray-800"
          )}
        >
          {message.content}
        </div>

        {/* Timestamp and Status */}
        <div
          className={cn(
            "flex items-center justify-between mt-4 pt-3 border-t",
            isUser
              ? "text-blue-100 border-white/20"
              : "text-gray-500 border-gray-200"
          )}
        >
          <span className="text-xs">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isUser && (
            <div className="flex items-center space-x-1 text-xs">
              <div className="bg-green-300 rounded-full w-1.5 h-1.5"></div>
              <span>Delivered</span>
            </div>
          )}

          {!isUser && (
            <div className="flex items-center space-x-1 text-xs">
              <MessageCircle className="w-3 h-3" />
              <span>AI Response</span>
            </div>
          )}
        </div>

        {/* Message Reactions (for assistant messages) */}
        {!isUser && (
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 mt-3 transition-opacity duration-300">
            <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-600 text-xs transition-colors duration-200">
              <span>👍</span>
              <span>Helpful</span>
            </button>
            <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-600 text-xs transition-colors duration-200">
              <span>👎</span>
              <span>Not helpful</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
