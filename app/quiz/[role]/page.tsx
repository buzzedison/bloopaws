'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getQuizConfig, QuizConfig } from '../../lib/quiz-data';
import QuizTimer from '../../components/quiz/QuizTimer';
import QuizSection from '../../components/quiz/QuizSection';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = params.role as string;
  const email = searchParams.get('email') || '';

  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, any>>>({});
  const [timeUp, setTimeUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const config = getQuizConfig(role);
    if (!config) {
      router.push('/vanguard');
      return;
    }
    setQuizConfig(config);
  }, [role, router]);

  const handleAnswersChange = (sectionId: string, sectionAnswers: Record<string, any>) => {
    setAnswers(prev => ({
      ...prev,
      [sectionId]: sectionAnswers
    }));
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    // Auto-submit after 10 seconds
    setTimeout(() => {
      handleSubmit(true);
    }, 10000);
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          answers,
          timeUp: autoSubmit,
          completedAt: new Date().toISOString(),
          email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/quiz/${role}/results?submissionId=${result.submissionId}`);
      } else {
        console.error('Failed to submit quiz');
        alert('There was an error submitting your quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextSection = () => {
    if (currentSectionIndex < (quizConfig?.sections.length || 0) - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const getTotalAnswered = () => {
    let total = 0;
    Object.values(answers).forEach(sectionAnswers => {
      total += Object.keys(sectionAnswers).length;
    });
    return total;
  };

  const getTotalQuestions = () => {
    if (!quizConfig) return 0;
    return quizConfig.sections.reduce((total, section) => total + section.questions.length, 0);
  };

  if (!quizConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {quizConfig.title}
              </h1>
              <p className="text-lg text-gray-600">
                {quizConfig.description}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 ">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Instructions</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">⏱️</span>
                  <span><strong>Time Limit:</strong> {quizConfig.timeLimit} minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">📝</span>
                  <span><strong>Format:</strong> Individual work, no external help</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✅</span>
                  <span><strong>Passing Score:</strong> {quizConfig.passingScore}% ({Math.ceil(quizConfig.totalPoints * quizConfig.passingScore / 100)} points)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">🎯</span>
                  <span><strong>Total Points:</strong> {quizConfig.totalPoints}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">💾</span>
                  <span><strong>Auto-save:</strong> Your answers are saved as you progress</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• You can navigate between sections before submitting</li>
                <li>• Short answer questions will be manually graded</li>
                <li>• Results will be emailed to you within 2-3 business days</li>
                <li>• You can only take this quiz once</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSection = quizConfig.sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / quizConfig.sections.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 pt-8">{quizConfig.title}</h1>
              <p className="text-gray-600">
                Section {currentSectionIndex + 1} of {quizConfig.sections.length}: {currentSection.title}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Questions Answered</p>
              <p className="text-lg font-semibold text-gray-900">
                {getTotalAnswered()} / {getTotalQuestions()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Section {currentSectionIndex + 1} of {quizConfig.sections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Timer */}
        <QuizTimer
          timeLimit={quizConfig.timeLimit}
          onTimeUp={handleTimeUp}
          isActive={!timeUp}
        />

        {/* Time Up Warning */}
        {timeUp && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold">Time's Up!</p>
                <p className="text-sm">Your quiz will be automatically submitted in 10 seconds.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <QuizSection
          section={currentSection}
          onAnswersChange={handleAnswersChange}
          currentAnswers={answers[currentSection.id] || {}}
        />

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Previous Section
            </button>

            <div className="text-center">
              {currentSectionIndex === quizConfig.sections.length - 1 ? (
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting || timeUp}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              ) : (
                <button
                  onClick={nextSection}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Next Section
                </button>
              )}
            </div>

            <div className="text-sm text-gray-500">
              Section {currentSectionIndex + 1} / {quizConfig.sections.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
