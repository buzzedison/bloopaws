'use client';

import { useState } from 'react';
import { QuizSection as QuizSectionType, MCQQuestion, ShortAnswerQuestion } from '../../lib/quiz-data';
import MCQQuestionComponent from './MCQQuestion';
import ShortAnswerQuestionComponent from './ShortAnswerQuestion';
import MarkdownContent from './MarkdownContent';

interface QuizSectionProps {
  section: QuizSectionType;
  onAnswersChange: (sectionId: string, answers: Record<string, any>) => void;
  currentAnswers?: Record<string, any>;
  showResults?: boolean;
}

export default function QuizSection({
  section,
  onAnswersChange,
  currentAnswers = {},
  showResults = false
}: QuizSectionProps) {
  const [answers, setAnswers] = useState<Record<string, any>>(currentAnswers);

  const handleAnswerChange = (questionId: string, answer: any) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    onAnswersChange(section.id, newAnswers);
  };

  return (
    <div className="mb-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
        {section.description && (
          <MarkdownContent content={section.description} />
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Total Points: {section.totalPoints}
          </span>
          <span className="text-sm text-gray-500">
            {section.questions.length} question{section.questions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {section.type === 'mcq' && (
          <>
            {(section.questions as MCQQuestion[]).map((question, index) => (
              <div key={question.id} className="relative">
                <div className="absolute -left-4 top-6 bg-red-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <MCQQuestionComponent
                  question={question}
                  onAnswer={handleAnswerChange}
                  currentAnswer={answers[question.id]}
                  showResults={showResults}
                />
              </div>
            ))}
          </>
        )}

        {section.type === 'short_answer' && (
          <>
            {(section.questions as ShortAnswerQuestion[]).map((question, index) => (
              <div key={question.id} className="relative">
                <div className="absolute -left-4 top-6 bg-red-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <ShortAnswerQuestionComponent
                  question={question}
                  onAnswer={handleAnswerChange}
                  currentAnswer={answers[question.id]}
                  showResults={showResults}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
