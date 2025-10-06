"use client"

// Import necessary libraries
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, CheckCircle, X, TrendingUp, Award, Target, BookOpen, ArrowRight, BarChart3 } from 'lucide-react';

// Define the questions, answers, and topics
const questions = [
    {
        topic: 'Budgeting',
        question: 'What is a budget?',
        answers: [
            { text: 'A record of past spending', value: 0 },
            { text: 'A plan for future spending', value: 1 },
            { text: 'A type of bank account', value: 0 }
        ],
    },
    {
        topic: 'Saving',
        question: 'Why is having an emergency fund important?',
        answers: [
            { text: 'For vacation planning', value: 0 },
            { text: 'For unexpected expenses', value: 1 },
            { text: 'To buy luxury items', value: 0 }
        ],
    },
    {
        topic: 'Investing',
        question: 'What is a stock?',
        answers: [
            { text: 'A type of bond', value: 0 },
            { text: 'Ownership in a company', value: 1 },
            { text: 'A type of bank account', value: 0 }
        ],
    },

    {
        question: 'What is cash flow?',
        answers: [
            { text: 'Money retained after all expenses', value: 0, topic: 'Cash Flow' },
            { text: 'The total revenue generated', value: 0, topic: 'Cash Flow' },
            { text: 'The movement of money in and out of a business', value: 1, topic: 'Cash Flow' }
        ],
    },
    {
        question: 'What’s the difference between revenue and profit?',
        answers: [
            { text: 'They are the same', value: 0, topic: 'Profit and Revenue' },
            { text: 'Revenue minus expenses equals profit', value: 1, topic: 'Profit and Revenue' },
            { text: 'Profit is the total income before expenses', value: 0, topic: 'Profit and Revenue' }
        ],
    },
    {
        question: 'What is the primary goal of investing for a business?',
        answers: [
            { text: 'Quickly doubling the money', value: 0, topic: 'Investing' },
            { text: 'Long-term growth or income generation', value: 1, topic: 'Investing' },
            { text: 'Avoiding all risks', value: 0, topic: 'Investing' }
        ],
    },
    {
        question: 'What is an asset?',
        answers: [
            { text: 'Something you owe', value: 0, topic: 'Investing' },
            { text: 'Something you own that has value', value: 1, topic: 'Investing' },
            { text: 'A monthly expense', value: 0, topic: 'Investing' }
        ],
    },
    {
        question: 'Why is budgeting important for a business?',
        answers: [
            { text: 'To ensure there are enough funds to cover expenses', value: 1, topic: 'Budgeting' },
            { text: 'To eliminate all expenses', value: 0, topic: 'Budgeting' },
            { text: 'To increase the company’s debt', value: 0, topic: 'Budgeting' }
        ],
    },
    {
        question: 'What is the significance of a positive cash flow?',
        answers: [
            { text: 'The business is in debt', value: 0, topic: 'Cash Flow' },
            { text: 'The business is generating more money than it is spending', value: 1, topic: 'Cash Flow' },
            { text: 'The business has high expenses', value: 0, topic: 'Cash Flow' }
        ],
    },
    {
        question: 'What is considered a good practice for managing business savings?',
        answers: [
            { text: 'Spending all savings on new ventures', value: 0, topic: 'Savings' },
            { text: 'Keeping a reserve for emergencies and future investments', value: 1, topic: 'Savings' },
            { text: 'Investing all savings in high-risk assets', value: 0, topic: 'Savings' }
        ],
    },
];

const financialLiteracyLevels = [
  {
    minScore: 0,
    maxScore: 4,
    level: 'Beginner',
    description: 'You\'re just starting your financial journey. Focus on building basic knowledge of personal and business finance fundamentals.',
    icon: BookOpen,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Eager to learn', 'Fresh perspective'],
    recommendations: ['Start with basic budgeting', 'Learn about emergency funds', 'Study fundamental financial terms'],
    nextSteps: ['Read "Rich Dad Poor Dad"', 'Take a basic personal finance course', 'Set up a simple budget']
  },
  {
    minScore: 5,
    maxScore: 7,
    level: 'Intermediate',
    description: 'You have solid foundational knowledge but there\'s room for growth in advanced financial concepts and business applications.',
    icon: BarChart3,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Good basic understanding', 'Practical knowledge application'],
    recommendations: ['Explore investment options', 'Learn cash flow management', 'Study business financial statements'],
    nextSteps: ['Practice creating budgets', 'Learn about different investment vehicles', 'Study financial ratios']
  },
  {
    minScore: 8,
    maxScore: 10,
    level: 'Advanced',
    description: 'You demonstrate strong financial acumen. Focus on sophisticated strategies and business financial management.',
    icon: TrendingUp,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Strong financial knowledge', 'Strategic thinking', 'Risk assessment skills'],
    recommendations: ['Master advanced investment strategies', 'Learn tax optimization', 'Study financial modeling'],
    nextSteps: ['Explore venture capital', 'Learn advanced financial analysis', 'Consider financial certifications']
  }
];

// The main quiz component
const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [financialLiteracyLevel, setFinancialLiteracyLevel] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const startQuiz = () => {
    if (name.trim()) {
      setQuizStarted(true);
    } else {
      alert('Please enter your name to start the quiz.');
    }
  };

  const handleAnswerOptionClick = (value, index) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(index);

    // Add a delay before moving to next question or showing results
    setTimeout(() => {
      setScore(score + value);
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        // Find the financial literacy level based on final score
        const finalScore = score + value;
        const foundLevel = financialLiteracyLevels.find(
          level => finalScore >= level.minScore && finalScore <= level.maxScore
        );
        setFinancialLiteracyLevel(foundLevel);
        setShowModal(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setFinancialLiteracyLevel(null);
    setSelectedAnswer(null);
    setQuizStarted(false);
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm mb-6">
              <DollarSign className="h-4 w-4" />
              Financial Literacy Assessment
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              Test Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Financial Knowledge</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Evaluate your understanding of business finance, budgeting, investing, and cash flow management through our comprehensive assessment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="relative py-16">
        <div className="mx-auto max-w-2xl px-4">
          {!quizStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                    <DollarSign className="h-10 w-10 text-red-600" />
                  </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Assess Your Financial Knowledge?</h2>
                <p className="text-gray-600">
                  This assessment takes about 5 minutes and covers essential business finance concepts including budgeting, investing, and cash flow.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter your name to get personalized results
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <button
                  onClick={startQuiz}
                  disabled={!name.trim()}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Start Assessment
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Progress Bar */}
              <div className="bg-gray-50 px-8 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 mb-4">
                        {questions[currentQuestion].topic || 'Business Finance'}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                      {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-4">
                      {questions[currentQuestion].answers.map((answer, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswerOptionClick(answer.value, index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                            selectedAnswer === index
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50 text-gray-700'
                          }`}
                          whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                          whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                        >
                          <div className="flex items-center gap-4">
                            <div                             className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswer === index
                                ? 'border-red-500 bg-red-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedAnswer === index && (
                                <CheckCircle className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <span className="font-medium">{answer.text}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Modal */}
      <AnimatePresence>
        {showModal && financialLiteracyLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`h-2 bg-gradient-to-r ${financialLiteracyLevel.color}`}></div>
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${financialLiteracyLevel.bgColor} mb-6`}>
                    <financialLiteracyLevel.icon className={`h-10 w-10 ${financialLiteracyLevel.textColor}`} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {name}, you're at a
                  </h2>
                  <h3 className={`text-2xl font-bold ${financialLiteracyLevel.textColor} mb-4`}>
                    {financialLiteracyLevel.level} Level
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {financialLiteracyLevel.description}
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    {score}/{questions.length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Your Strengths
                  </h4>
                  <div className="grid gap-3">
                    {financialLiteracyLevel.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Focus Areas
                  </h4>
                  <div className="grid gap-3">
                    {financialLiteracyLevel.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h4>
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="grid gap-3">
                      {financialLiteracyLevel.nextSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Want to improve your financial skills?</h4>
                  <p className="text-gray-600 mb-4">
                    Join our newsletter for business finance tips, resources, and exclusive content to boost your financial knowledge.
                  </p>
                  <Link
                    href="https://bloopglobal.ck.page/ebb664d278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Finance Insights
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Take Again
                  </button>
                  <Link href="/games">
                    <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                      Try Other Games
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
    export default Quiz;