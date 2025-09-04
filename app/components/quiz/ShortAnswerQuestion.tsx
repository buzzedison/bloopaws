'use client';

import { useState } from 'react';
import { ShortAnswerQuestion as ShortAnswerQuestionType } from '../../lib/quiz-data';

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuestionType;
  onAnswer: (questionId: string, answer: string) => void;
  currentAnswer?: string;
  showResults?: boolean;
}

export default function ShortAnswerQuestion({
  question,
  onAnswer,
  currentAnswer,
  showResults = false
}: ShortAnswerQuestionProps) {
  const [answer, setAnswer] = useState<string>(currentAnswer || '');

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    onAnswer(question.id, value);
  };

  const characterCount = answer.length;
  const maxLength = question.maxLength || 1000;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {question.question}
      </h3>

      <div className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={maxLength}
          disabled={showResults}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical disabled:bg-gray-50 disabled:text-gray-500"
        />

        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            Points: {question.points}
          </div>
          <div className={`text-sm ${characterCount > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'}`}>
            {characterCount}/{maxLength} characters
          </div>
        </div>

        {showResults && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This question will be manually graded by our team.
              You'll receive your detailed results within 2-3 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
