'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getQuizConfig } from '@/app/lib/quiz-data';
import {
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import type { MCQQuestion, QuizSection, ShortAnswerQuestion } from '@/app/lib/quiz-data';

const supabase = createClient();

type QuizSubmission = {
  id: string;
  quiz_token: string;
  application_email: string;
  role: string;
  time_limit: number;
  total_points: number;
  answers: Record<string, any> | null;
  submitted_at: string;
  mcq_score: number;
  mcq_total: number;
  total_score: number;
  percentage: number;
  passed: boolean;
  graded: boolean;
  graded_at: string | null;
  time_up: boolean;
  created_at: string;
};

const formatAnswer = (
  questionId: string,
  answerValue: any,
  sectionType: QuizSection['type'],
  question?: MCQQuestion | ShortAnswerQuestion
): ReactNode => {
  if (answerValue === undefined || answerValue === null || answerValue === '') {
    return <span className="text-gray-400 italic">No response</span>;
  }

  if (sectionType === 'mcq' && question && 'options' in question) {
    const mcqQuestion = question as MCQQuestion;
    const selectedOption = mcqQuestion.options.find(opt => opt.value === answerValue);
    if (selectedOption) {
      const isCorrect = answerValue === mcqQuestion.correctAnswer;
      return (
        <span>
          <span className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{selectedOption.label}</span>
          <span className="ml-2 text-xs uppercase tracking-wide text-gray-400">({answerValue})</span>
          {!isCorrect && (
            <span className="ml-2 text-xs text-gray-500">
              Correct: {mcqQuestion.options.find(opt => opt.value === mcqQuestion.correctAnswer)?.label || mcqQuestion.correctAnswer}
            </span>
          )}
        </span>
      );
    }
  }

  if (typeof answerValue === 'object') {
    return <pre className="text-xs bg-gray-100 text-gray-800 rounded p-3 whitespace-pre-wrap break-words">{JSON.stringify(answerValue, null, 2)}</pre>;
  }

  return <span className="text-gray-800 whitespace-pre-wrap break-words">{String(answerValue)}</span>;
};

const roleLabels: Record<string, string> = {
  mobile: 'Mobile Engineering',
  'bd-sales': 'Business Development & Sales',
  investment: 'Investment Analyst'
};

const roleIcons: Record<string, string> = {
  mobile: '📱',
  'bd-sales': '💼',
  investment: '📊'
};

export default function QuizSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [gradingScore, setGradingScore] = useState<number | ''>('');
  const [gradingFeedback, setGradingFeedback] = useState<string>('');
  const [gradingDirty, setGradingDirty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | keyof typeof roleLabels>('all');
  const [passFilter, setPassFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [gradingFilter, setGradingFilter] = useState<'all' | 'graded' | 'pending'>('all');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_submissions')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (error) throw error;
        setSubmissions((data || []) as QuizSubmission[]);
      } catch (error) {
        console.error('Error fetching quiz submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const stats = useMemo(() => {
    const total = submissions.length;
    const passed = submissions.filter(sub => sub.passed).length;
    const failed = submissions.filter(sub => !sub.passed).length;
    const graded = submissions.filter(sub => sub.graded).length;
    const pending = submissions.filter(sub => !sub.graded).length;

    const byRole = submissions.reduce((acc, sub) => {
      acc[sub.role] = (acc[sub.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, passed, failed, graded, pending, byRole };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchesRole = roleFilter === 'all' || sub.role === roleFilter;
      const matchesPass = passFilter === 'all' || (passFilter === 'passed' ? sub.passed : !sub.passed);
      const matchesGrading = gradingFilter === 'all' || (gradingFilter === 'graded' ? sub.graded : !sub.graded);
      const matchesSearch = !searchQuery ||
        sub.application_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.quiz_token.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRole && matchesPass && matchesGrading && matchesSearch;
    });
  }, [submissions, roleFilter, passFilter, gradingFilter, searchQuery]);

  const selectedQuizConfig = useMemo(() => {
    if (!selectedSubmission) return null;
    return getQuizConfig(selectedSubmission.role);
  }, [selectedSubmission]);

  const submitGrading = useCallback(async () => {
    if (!selectedSubmission || gradingScore === '') return;

    try {
      const response = await fetch(`/api/quiz/results?submissionId=${selectedSubmission.quiz_token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score: gradingScore,
          graded: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update quiz results');
      }

      const updated = await response.json();
      const updatedScore = updated.score ?? gradingScore;
      const updatedPercentage = selectedSubmission.total_points > 0
        ? Math.round((updatedScore / selectedSubmission.total_points) * 100)
        : 0;
      const updatedPassed = selectedSubmission.total_points > 0
        ? updatedScore >= selectedSubmission.total_points * 0.7
        : false;

      setSubmissions(prev => prev.map(sub => (
        sub.quiz_token === selectedSubmission.quiz_token
          ? {
            ...sub,
            total_score: updatedScore,
            percentage: updatedPercentage,
            passed: updatedPassed,
            graded: true,
            graded_at: updated.gradedAt || new Date().toISOString()
          }
          : sub
      )));

      setSelectedSubmission(prev => prev ? {
        ...prev,
        total_score: updatedScore,
        percentage: updatedPercentage,
        passed: updatedPassed,
        graded: true,
        graded_at: updated.gradedAt || new Date().toISOString()
      } : prev);

      setGradingDirty(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save grade. Please try again.');
    }
  }, [selectedSubmission, gradingScore, gradingFeedback]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-gray-500 font-semibold tracking-wide animate-pulse text-center">Loading Submissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight flex items-center gap-3">
            Quiz Submissions
            <span className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-[2px] mt-1 shrink-0">{submissions.length} Total</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Review completed quizzes, scores, and manual grading status for program candidates.</p>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stats.total}</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submissions</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-green-500">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">Passed</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-green-600 tracking-tight">{stats.passed}</h3>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
              {stats.total ? Math.round((stats.passed / stats.total) * 100) : 0}% rate
            </span>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Graded</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-blue-600 tracking-tight">{stats.graded}</h3>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{stats.pending} pending</span>
          </div>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Top Role</p>
          <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
            {submissions.length > 0 ? roleLabels[submissions[0].role] || submissions[0].role : 'N/A'}
          </h3>
          <div className="absolute -right-2 -bottom-2 opacity-10 rotate-12 transition-transform group-hover:scale-110">
            <TrendingUp className="w-16 h-16" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm"
            >
              <option value="all">All Roles</option>
              {Object.entries(roleLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Result</label>
            <select
              value={passFilter}
              onChange={(e) => setPassFilter(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Grading</label>
            <select
              value={gradingFilter}
              onChange={(e) => setGradingFilter(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm"
            >
              <option value="all">All</option>
              <option value="graded">Graded</option>
              <option value="pending">Pending Manual Review</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.quiz_token} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{submission.application_email}</div>
                    <div className="text-xs text-gray-500">{submission.quiz_token}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center gap-2">
                      <span>{roleIcons[submission.role] || '📝'}</span>
                      {roleLabels[submission.role] || submission.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {submission.total_score}/{submission.total_points}
                    </div>
                    <div className="text-xs text-gray-500">{submission.percentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${submission.passed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {submission.passed ? 'Passed' : 'Failed'}
                    </span>
                    <div className="mt-2">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${submission.graded
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {submission.graded ? 'Graded' : 'Manual review pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(submission.submitted_at).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(submission.submitted_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setGradingScore(submission.total_score ?? '');
                        setGradingFeedback((submission as any).feedback ?? '');
                        setGradingDirty(false);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No submissions match your filters</h3>
            <p className="text-gray-500">Try adjusting the filters or search criteria</p>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <div>
                <h2 className="text-xl font-semibold">{selectedSubmission.application_email}</h2>
                <p className="text-white/80 text-sm">
                  {roleLabels[selectedSubmission.role] || selectedSubmission.role} • {selectedSubmission.quiz_token}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSubmission(null);
                  setGradingScore('');
                  setGradingFeedback('');
                  setGradingDirty(false);
                }}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedSubmission.total_score}/{selectedSubmission.total_points}
                  </p>
                  <p className="text-sm text-gray-600">{selectedSubmission.percentage}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Result</p>
                  <p className={`text-2xl font-bold ${selectedSubmission.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedSubmission.passed ? 'Passed' : 'Failed'}
                  </p>
                  {selectedSubmission.time_up && (
                    <p className="text-xs text-amber-600">⏰ Submission auto-submitted when time elapsed</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="text-base font-semibold text-gray-900">
                    {new Date(selectedSubmission.submitted_at).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {selectedSubmission.graded
                      ? `Graded ${selectedSubmission.graded_at ? new Date(selectedSubmission.graded_at).toLocaleString() : ''}`
                      : 'Manual grading pending'}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Manual Grading</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Score</label>
                    <input
                      type="number"
                      min={0}
                      max={selectedSubmission.total_points}
                      value={gradingScore}
                      onChange={(e) => {
                        setGradingScore(e.target.value === '' ? '' : Number(e.target.value));
                        setGradingDirty(true);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Out of {selectedSubmission.total_points} points</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback (notes for admin)</label>
                    <textarea
                      value={gradingFeedback}
                      onChange={(e) => {
                        setGradingFeedback(e.target.value);
                        setGradingDirty(true);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Internal notes about this submission (not persisted)"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedSubmission) return;
                      setGradingScore(selectedSubmission.total_score ?? '');
                      setGradingFeedback((selectedSubmission as any).feedback ?? '');
                      setGradingDirty(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    disabled={!gradingDirty}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={submitGrading}
                    disabled={!gradingDirty || gradingScore === ''}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${!gradingDirty || gradingScore === ''
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                  >
                    Save Grade
                  </button>
                </div>
              </div>

              {selectedSubmission.answers && selectedQuizConfig && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Responses</h3>
                  <div className="space-y-5">
                    {selectedQuizConfig.sections.map(section => (
                      <div key={section.id} className="border border-gray-200 rounded-lg">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {section.title}
                            <span className="ml-2 text-xs uppercase tracking-wide text-gray-400">{section.type.replace('_', ' ')}</span>
                          </h4>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {(section.questions as (MCQQuestion | ShortAnswerQuestion)[]).map(question => (
                            <div key={question.id} className="px-4 py-3">
                              <p className="text-sm font-medium text-gray-800 mb-2">{question.question}</p>
                              <div className="text-sm">
                                {formatAnswer(
                                  question.id,
                                  (selectedSubmission.answers ?? {})[question.id],
                                  section.type,
                                  question
                                )}
                              </div>
                              {section.type === 'mcq' && question && 'options' in question && (
                                <p className="mt-2 text-[11px] text-gray-400 uppercase tracking-wide">
                                  Correct answer: {
                                    (question as MCQQuestion).options.find(opt => opt.value === (question as MCQQuestion).correctAnswer)?.label
                                    || (question as MCQQuestion).correctAnswer
                                  }
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Submission ID:</span> {selectedSubmission.quiz_token}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {selectedSubmission.application_email}
                  </div>
                  <div>
                    <span className="font-medium">Time Limit:</span> {selectedSubmission.time_limit} minutes
                  </div>
                  <div>
                    <span className="font-medium">MCQ Score:</span> {selectedSubmission.mcq_score}/{selectedSubmission.mcq_total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

