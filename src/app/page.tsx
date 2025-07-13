'use client';

import React, { useState } from 'react';
import NPSForm from '@/components/NPSForm';
import ChatInterface from '@/components/ChatInterface';
import { getNPSCategory } from '@/lib/utils';

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
          className="fixed top-4 left-4 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back to NPS Form
        </button>
      </div>
    );
  }

  return <NPSForm onScoreSelect={handleScoreSelect} />;
}