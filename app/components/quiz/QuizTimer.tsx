'use client';

import { useState, useEffect } from 'react';

interface QuizTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
  isActive: boolean;
}

export default function QuizTimer({ timeLimit, onTimeUp, isActive }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // convert to seconds

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft <= 300; // 5 minutes
  const isCriticalTime = timeLeft <= 60; // 1 minute

  let timerClass = "text-lg font-mono font-bold ";
  if (isCriticalTime) {
    timerClass += "text-red-600 animate-pulse";
  } else if (isLowTime) {
    timerClass += "text-orange-600";
  } else {
    timerClass += "text-gray-700";
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700 font-medium">Time Remaining</span>
        </div>
        <div className={timerClass}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {isLowTime && (
        <div className={`mt-3 text-sm ${isCriticalTime ? 'text-red-600' : 'text-orange-600'}`}>
          {isCriticalTime
            ? '⚠️ Time is almost up! Please submit soon.'
            : '⏰ Less than 5 minutes remaining.'
          }
        </div>
      )}

      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isCriticalTime ? 'bg-red-600' :
            isLowTime ? 'bg-orange-500' : 'bg-green-500'
          }`}
          style={{ width: `${(timeLeft / (timeLimit * 60)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
