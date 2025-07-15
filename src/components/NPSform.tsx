"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getNPSCategory } from "@/lib/utils";
import {
  ThumbsUp,
  Meh,
  ThumbsDown,
  Users,
  UserCheck,
  UserX,
  Star,
  TrendingUp,
  Heart,
  Zap,
} from "lucide-react";

interface NPSFormProps {
  onScoreSelect: (score: number) => void;
}

const NPSForm: React.FC<NPSFormProps> = ({ onScoreSelect }) => {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const scores = Array.from({ length: 11 }, (_, i) => i);

  const getScoreColor = (score: number) => {
    const category = getNPSCategory(score);
    switch (category.type) {
      case "detractor":
        return "hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white border-red-200 hover:border-red-500 hover:scale-110 hover:shadow-xl hover:shadow-red-200 group";
      case "passive":
        return "hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white border-amber-200 hover:border-amber-500 hover:scale-110 hover:shadow-xl hover:shadow-amber-200 group";
      case "promoter":
        return "hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:text-white border-emerald-200 hover:border-emerald-500 hover:scale-110 hover:shadow-xl hover:shadow-emerald-200 group";
      default:
        return "hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:text-white border-gray-200 hover:border-gray-500 hover:scale-110 hover:shadow-xl hover:shadow-gray-200 group";
    }
  };

  const getScoreIcon = (score: number) => {
    if (score <= 6)
      return (
        <UserX className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-opacity duration-200" />
      );
    if (score <= 8)
      return (
        <Meh className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-opacity duration-200" />
      );
    return (
      <UserCheck className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-opacity duration-200" />
    );
  };

  const getPreviewText = (score: number | null) => {
    if (score === null) return "Hover over a score to see details";
    const category = getNPSCategory(score);
    const descriptions = {
      detractor: "Unlikely to recommend and may discourage others",
      passive: "Satisfied but not enthusiastic about recommending",
      promoter: "Enthusiastic and will actively recommend to others",
    };
    return `Score ${score}/10 - ${category.label}: ${
      descriptions[category.type]
    }`;
  };

  return (
    <div className="flex justify-center items-center p-4 min-h-[calc(100vh-140px)]">
      <div className="space-y-6 w-full max-w-5xl">
        {/* Main Card */}
        <Card className="relative bg-white/95 shadow-2xl backdrop-blur-xl border-0 overflow-hidden">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 opacity-20 blur-xl"></div>

          <CardHeader className="z-10 relative pt-10 pb-8 text-center">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 shadow-lg mx-auto mb-6 p-4 rounded-2xl w-20 h-20 animate-bounce-gentle">
              <Users className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 mb-4 font-bold text-transparent text-3xl md:text-5xl animate-fade-in">
              How likely are you to recommend us?
            </CardTitle>
            <CardDescription className="mx-auto mt-4 max-w-3xl text-gray-600 text-lg md:text-xl leading-relaxed animate-slide-up">
              Your feedback is invaluable to us. Please take a moment to rate
              your experience and help us serve you better.
            </CardDescription>
          </CardHeader>

          <CardContent className="z-10 relative space-y-10 pb-10">
            {/* Score Preview */}
            <div className="flex justify-center items-center bg-gradient-to-r from-gray-50 to-blue-50 p-4 border border-gray-200 rounded-xl min-h-[60px] text-center">
              <p className="font-medium text-gray-700">
                {getPreviewText(hoveredScore)}
              </p>
            </div>

            {/* Score Grid */}
            <div className="gap-3 md:gap-4 grid grid-cols-6 md:grid-cols-11">
              {scores.map((score) => (
                <Button
                  key={score}
                  variant="outline"
                  className={`h-16 md:h-20 w-full md:w-20 text-lg md:text-2xl font-bold transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 relative overflow-hidden ${getScoreColor(
                    score
                  )}`}
                  onClick={() => onScoreSelect(score)}
                  onMouseEnter={() => setHoveredScore(score)}
                  onMouseLeave={() => setHoveredScore(null)}
                >
                  <span className="z-10 relative">{score}</span>
                  <div className="top-1 right-1 absolute">
                    {getScoreIcon(score)}
                  </div>
                  {/* Ripple effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Button>
              ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between px-4 font-semibold text-gray-700 text-sm md:text-base">
              <div className="flex items-center space-x-3 bg-red-50 px-4 py-2 border border-red-100 rounded-xl">
                <ThumbsDown className="w-5 h-5 text-red-500" />
                <span>Not likely at all</span>
              </div>
              <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 border border-emerald-100 rounded-xl">
                <span>Extremely likely</span>
                <ThumbsUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Category Legend */}
        <Card className="bg-white/95 shadow-xl backdrop-blur-xl border-0">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <h3 className="flex justify-center items-center space-x-2 mb-2 font-bold text-gray-800 text-xl md:text-2xl">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <span>Understanding NPS Categories</span>
              </h3>
              <p className="text-gray-600">
                Learn what each score range means for your feedback
              </p>
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              {/* Detractors */}
              <div className="group bg-gradient-to-br from-red-50 hover:from-red-100 to-red-100 hover:to-red-200 hover:shadow-lg p-6 border border-red-200 hover:border-red-300 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg mr-4 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      Detractors
                    </div>
                    <div className="bg-red-200 px-2 py-1 rounded-full font-semibold text-red-600 text-sm">
                      Score 0-6
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Customers who are unlikely to recommend and may actively
                  discourage others from using your service.
                </p>
                <div className="flex items-center mt-4 font-medium text-red-600 text-sm">
                  <Zap className="mr-1 w-4 h-4" />
                  Needs immediate attention
                </div>
              </div>

              {/* Passives */}
              <div className="group bg-gradient-to-br from-amber-50 hover:from-amber-100 to-orange-100 hover:to-orange-200 hover:shadow-lg p-6 border border-amber-200 hover:border-amber-300 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg mr-4 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Meh className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      Passives
                    </div>
                    <div className="bg-amber-200 px-2 py-1 rounded-full font-semibold text-amber-600 text-sm">
                      Score 7-8
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Satisfied customers who are content but not enthusiastic
                  enough to actively promote your service.
                </p>
                <div className="flex items-center mt-4 font-medium text-amber-600 text-sm">
                  <Star className="mr-1 w-4 h-4" />
                  Room for improvement
                </div>
              </div>

              {/* Promoters */}
              <div className="group bg-gradient-to-br from-emerald-50 hover:from-emerald-100 to-green-100 hover:to-green-200 hover:shadow-lg p-6 border border-emerald-200 hover:border-emerald-300 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg mr-4 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      Promoters
                    </div>
                    <div className="bg-emerald-200 px-2 py-1 rounded-full font-semibold text-emerald-600 text-sm">
                      Score 9-10
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Loyal enthusiasts who will actively recommend your service and
                  fuel positive word-of-mouth growth.
                </p>
                <div className="flex items-center mt-4 font-medium text-emerald-600 text-sm">
                  <Heart className="mr-1 w-4 h-4" />
                  Brand advocates
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NPSForm;
