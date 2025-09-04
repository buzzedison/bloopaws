'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { getQuizConfig, calculateScore } from '../../../lib/quiz-data';

interface QuizSubmission {
  id: string;
  role: string;
  answers: Record<string, Record<string, any>>;
  score: number;
  totalScore: number;
  passed: boolean;
  submittedAt: string;
  graded: boolean;
}

export default function QuizResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = params.role as string;
  const submissionId = searchParams.get('submissionId');

  const [submission, setSubmission] = useState<QuizSubmission | null>(null);
  const [quizConfig, setQuizConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!submissionId) {
      router.push('/vanguard');
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/quiz/results?submissionId=${submissionId}`);
        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
          const config = getQuizConfig(role);
          setQuizConfig(config);
        } else {
          console.error('Failed to fetch results');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [submissionId, role, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!submission || !quizConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Results not found. Please contact support.</p>
        </div>
      </div>
    );
  }

  const score = calculateScore(submission.answers, quizConfig);
  const percentage = Math.round((submission.score / quizConfig.totalPoints) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
            submission.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {submission.passed ? (
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {submission.passed ? 'Congratulations!' : 'Quiz Completed'}
          </h1>

          <div className="text-6xl font-bold mb-4">
            <span className={submission.passed ? 'text-green-600' : 'text-red-600'}>
              {percentage}%
            </span>
          </div>

          <p className="text-xl text-gray-600 mb-6">
            You scored {submission.score} out of {quizConfig.totalPoints} points
          </p>

          <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
            submission.passed
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {submission.passed ? 'PASSED' : 'NOT PASSED'}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Breakdown</h2>

          <div className="space-y-4">
            {quizConfig.sections.map((section: any) => {
              const sectionScore = score.breakdown[section.id];
              return (
                <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {sectionScore.earned} / {sectionScore.total}
                    </div>
                    <div className="text-sm text-gray-600">
                      {sectionScore.percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>

          <div className="space-y-6">
            {submission.passed ? (
              <>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Application Review</h3>
                    <p className="text-gray-600">
                      Your application and quiz results will be reviewed by our team within 2-3 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Interview Invitation</h3>
                    <p className="text-gray-600">
                      If selected, you'll receive an interview invitation with next steps.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Detailed Feedback</h3>
                    <p className="text-gray-600">
                      We'll provide detailed feedback on your quiz performance and areas for improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Retake Option</h3>
                    <p className="text-gray-600">
                      You may retake the quiz after 30 days to improve your score.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Notification</h3>
                <p className="text-gray-600">
                  You'll receive an email with your detailed results and next steps within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/vanguard')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Vanguard Program
          </button>

          <button
            onClick={() => router.push('/careers')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View Other Opportunities
          </button>
        </div>

        {/* Submission Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Quiz submitted on {new Date(submission.submittedAt).toLocaleDateString()}</p>
          <p className="mt-2">
            {submission.graded
              ? 'Results have been finalized'
              : 'Results are being processed (short answer questions require manual grading)'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
