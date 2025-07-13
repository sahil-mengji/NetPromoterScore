import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NPSCategory } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNPSCategory(score: number): NPSCategory {
  if (score >= 0 && score <= 6) {
    return {
      type: 'detractor',
      label: 'Detractor',
      color: 'bg-red-500'
    };
  } else if (score >= 7 && score <= 8) {
    return {
      type: 'passive',
      label: 'Passive',
      color: 'bg-yellow-500'
    };
  } else {
    return {
      type: 'promoter',
      label: 'Promoter',
      color: 'bg-green-500'
    };
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}