'use client';

import { useState } from 'react';
import { MCQQuestion as MCQQuestionType } from '../../lib/quiz-data';

interface MCQQuestionProps {
  question: MCQQuestionType;
  onAnswer: (questionId: string, answer: string) => void;
  currentAnswer?: string;
  showResults?: boolean;
}

export default function MCQQuestion({
  question,
  onAnswer,
  currentAnswer,
  showResults = false
}: MCQQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(currentAnswer || '');

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
    onAnswer(question.id, value);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const isIncorrect = selectedAnswer && selectedAnswer !== question.correctAnswer;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.value;
          const isCorrectOption = option.value === question.correctAnswer;

          let optionClass = "flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ";

          if (showResults) {
            if (isCorrectOption) {
              optionClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrectOption) {
              optionClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              optionClass += "border-gray-200 text-gray-700";
            }
          } else {
            if (isSelected) {
              optionClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              optionClass += "border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-25";
            }
          }

          return (
            <label key={option.value} className={optionClass}>
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={(e) => handleAnswerChange(e.target.value)}
                disabled={showResults}
                className="mr-3 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium">
                <span className="font-bold text-gray-600 mr-2">{option.label.charAt(0)})</span>
                {option.label}
              </span>
              {showResults && isCorrectOption && (
                <span className="ml-auto text-green-600 font-medium">✓ Correct</span>
              )}
              {showResults && isSelected && !isCorrectOption && (
                <span className="ml-auto text-red-600 font-medium">✗ Your answer</span>
              )}
            </label>
          );
        })}
      </div>

      {showResults && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Explanation:</h4>
          <p className="text-sm text-blue-700">{question.explanation}</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Points: {question.points}
      </div>
    </div>
  );
}
