'use client';

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { getNPSCategory } from '@/lib/utils';

interface NPSFormProps {
  onScoreSelect: (score: number) => void;
}

const NPSForm: React.FC<NPSFormProps> = ({ onScoreSelect }) => {
  const scores = Array.from({ length: 11 }, (_, i) => i);

  const getScoreColor = (score: number) => {
    const category = getNPSCategory(score);
    switch (category.type) {
      case 'detractor':
        return 'hover:bg-red-500 hover:text-white border-red-200';
      case 'passive':
        return 'hover:bg-yellow-500 hover:text-white border-yellow-200';
      case 'promoter':
        return 'hover:bg-green-500 hover:text-white border-green-200';
      default:
        return 'hover:bg-gray-500 hover:text-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            How likely are you to recommend us?
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Please select a score from 0 to 10
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-11 gap-2">
            {scores.map((score) => (
              <Button
                key={score}
                variant="outline"
                className={`h-12 w-12 text-lg font-semibold transition-all duration-200 ${getScoreColor(score)}`}
                onClick={() => onScoreSelect(score)}
              >
                {score}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 px-2">
            <span>Not likely at all</span>
            <span>Extremely likely</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
              <div className="text-sm font-medium text-gray-700">Detractors</div>
              <div className="text-xs text-gray-500">0-6</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
              <div className="text-sm font-medium text-gray-700">Passives</div>
              <div className="text-xs text-gray-500">7-8</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
              <div className="text-sm font-medium text-gray-700">Promoters</div>
              <div className="text-xs text-gray-500">9-10</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NPSForm;