"use client";

import React, { useState } from "react";
import NPSForm from "@/components/NPSform";
import ChatInterface from "@/components/ChatInterface";
import { getNPSCategory } from "@/lib/utils";

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
      <div>
        <ChatInterface npsScore={npsScore} category={category} />
        <button
          onClick={handleBackToForm}
          className="top-4 left-4 fixed bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm transition-colors"
        >
          ← Back to NPS Form
        </button>
      </div>
    );
  }

  return <NPSForm onScoreSelect={handleScoreSelect} />;
}
