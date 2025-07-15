"use client";

import React, { useState } from "react";
import NPSForm from "@/components/NPSform";
import ChatInterface from "@/components/ChatInterface";
import { getNPSCategory } from "@/lib/utils";
import { ArrowLeft, Star, Sparkles, MessageSquare } from "lucide-react";

export default function Home() {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleScoreSelect = (score: number) => {
    setNpsScore(score);
    setShowChat(true);
  };

  const handleBackToForm = () => {
    setShowChat(false);
    setNpsScore(null);
  };

  if (showChat && npsScore !== null) {
    const category = getNPSCategory(npsScore);
    return (
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="-top-1/2 -right-1/2 absolute bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl rounded-full w-96 h-96 animate-pulse"></div>
          <div className="-bottom-1/2 -left-1/2 absolute bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 blur-3xl rounded-full w-96 h-96 animate-pulse delay-1000"></div>
        </div>

        {/* Enhanced Header */}
        <div className="z-10 relative bg-white/80 shadow-sm backdrop-blur-xl border-gray-200/50 border-b">
          <div className="mx-auto px-6 py-4 max-w-7xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-2 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-xl">
                    NPS Feedback Chat
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Powered by AI Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={handleBackToForm}
                className="group inline-flex items-center bg-white hover:bg-gray-50 shadow-sm hover:shadow-md px-5 py-2.5 border border-gray-200 hover:border-gray-300 rounded-xl font-medium text-gray-700 text-sm transition-all duration-300"
              >
                <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
                Back to Survey
                <Sparkles className="opacity-0 group-hover:opacity-100 ml-2 w-4 h-4 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="z-10 relative p-6">
          <ChatInterface npsScore={npsScore} category={category} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="top-1/4 left-1/4 absolute bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl rounded-full w-72 h-72 animate-bounce-gentle"></div>
        <div className="right-1/4 bottom-1/4 absolute bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 blur-3xl rounded-full w-96 h-96 animate-bounce-gentle delay-2000"></div>
        <div className="top-1/2 left-1/2 absolute bg-gradient-to-r from-emerald-400/10 to-blue-500/10 blur-2xl rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2 animate-pulse transform"></div>
      </div>

      {/* Enhanced Header */}
      <div className="z-10 relative bg-white/80 shadow-sm backdrop-blur-xl border-gray-200/50 border-b">
        <div className="mx-auto px-6 py-5 max-w-7xl">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-3 rounded-2xl">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 font-bold text-transparent text-2xl">
                  Net Promoter Score Survey
                </h1>
                <p className="mt-1 text-gray-500">
                  Help us understand your experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 relative p-6">
        <NPSForm onScoreSelect={handleScoreSelect} />
      </div>
    </div>
  );
}
