"use client"
// Import necessary libraries
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, CheckCircle, X, Award, Target, Lightbulb, ArrowRight, BarChart3 } from 'lucide-react';

// Define the questions and answers
const questions = [
  {
    question: 'When planning for your business growth, you typically focus on:',
    answers: [
      { text: 'Short-term tactical moves to increase immediate revenue', value: 1, style: 'Tactical' },
      { text: 'Long-term strategic positioning for market leadership', value: 3, style: 'Strategic' },
      { text: 'Maintaining current operations with incremental improvements', value: 2, style: 'Balanced' }
    ],
  },
  {
    question: 'How do you approach competition in your market?',
    answers: [
      { text: 'Try to differentiate through unique value propositions', value: 3, style: 'Strategic' },
      { text: 'Focus on operational efficiency to offer better prices', value: 2, style: 'Balanced' },
      { text: 'Compete directly by matching or undercutting competitors', value: 1, style: 'Tactical' }
    ],
  },
  {
    question: 'When evaluating new opportunities, you prioritize:',
    answers: [
      { text: 'Market size and long-term potential', value: 3, style: 'Strategic' },
      { text: 'Quick wins and immediate profitability', value: 1, style: 'Tactical' },
      { text: 'Balanced consideration of both short and long-term factors', value: 2, style: 'Balanced' }
    ],
  },
  {
    question: 'How do you think about your business model?',
    answers: [
      { text: 'Continuously evolving it based on market trends and opportunities', value: 3, style: 'Strategic' },
      { text: 'Refining the current model for better efficiency', value: 2, style: 'Balanced' },
      { text: 'Focusing on execution within the established model', value: 1, style: 'Tactical' }
    ],
  },
  {
    question: 'When making business decisions, you tend to:',
    answers: [
      { text: 'Consider how decisions align with long-term vision and goals', value: 3, style: 'Strategic' },
      { text: 'Balance immediate needs with future considerations', value: 2, style: 'Balanced' },
      { text: 'Focus on solving immediate problems and opportunities', value: 1, style: 'Tactical' }
    ],
  },
  {
    question: 'How do you approach innovation in your business?',
    answers: [
      { text: 'Actively seek disruptive innovations that could transform the industry', value: 3, style: 'Strategic' },
      { text: 'Implement incremental improvements and process optimizations', value: 2, style: 'Balanced' },
      { text: 'Focus on proven methods and reliable solutions', value: 1, style: 'Tactical' }
    ],
  },
  {
    question: 'When planning your business development, you typically:',
    answers: [
      { text: 'Create comprehensive 3-5 year strategic plans', value: 3, style: 'Strategic' },
      { text: 'Set annual goals with quarterly reviews', value: 2, style: 'Balanced' },
      { text: 'Plan month-to-month with flexible adjustments', value: 1, style: 'Tactical' }
    ],
  },
  {
    question: 'How do you view market positioning?',
    answers: [
      { text: 'Position as a thought leader and category creator', value: 3, style: 'Strategic' },
      { text: 'Position as a strong competitor in existing markets', value: 2, style: 'Balanced' },
      { text: 'Position based on current customer needs and preferences', value: 1, style: 'Tactical' }
    ],
  }
];

const strategyTypes = {
  Strategic: {
    title: 'Strategic Visionary',
    description: 'You excel at long-term thinking and big-picture planning. You understand that true business success comes from positioning yourself for future opportunities rather than just chasing immediate gains.',
    icon: Lightbulb,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Long-term vision', 'Market foresight', 'Strategic positioning', 'Innovation focus'],
    whenToUse: 'Perfect for scaling businesses, entering new markets, or leading industry change',
    growthAreas: ['May overlook short-term execution needs', 'Could benefit from more tactical implementation'],
    recommendations: ['Develop detailed execution plans for your strategies', 'Balance vision with practical milestones', 'Build tactical capabilities alongside strategic thinking']
  },
  Balanced: {
    title: 'Balanced Strategist',
    description: 'You effectively balance short-term execution with long-term planning. This pragmatic approach allows you to capitalize on immediate opportunities while building for the future.',
    icon: BarChart3,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Practical execution', 'Balanced decision making', 'Adaptability', 'Risk management'],
    whenToUse: 'Ideal for established businesses needing both stability and growth',
    growthAreas: ['May miss breakthrough opportunities', 'Could develop stronger long-term vision'],
    recommendations: ['Strengthen long-term strategic planning', 'Explore more ambitious growth opportunities', 'Balance execution focus with strategic innovation']
  },
  Tactical: {
    title: 'Tactical Executor',
    description: 'You excel at operational execution and short-term optimization. Your focus on immediate results and practical solutions drives consistent performance and customer satisfaction.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Operational excellence', 'Customer focus', 'Efficiency optimization', 'Practical problem solving'],
    whenToUse: 'Great for operational roles, customer-facing businesses, or turnaround situations',
    growthAreas: ['May lack long-term strategic vision', 'Could benefit from bigger-picture thinking'],
    recommendations: ['Develop strategic planning skills', 'Consider long-term market trends', 'Balance short-term wins with strategic positioning']
  }
};

// The main quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [strategyType, setStrategyType] = useState(null);
  const [name, setName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
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
        // Find the strategy type based on final score
        const finalScore = score + value;
        let dominantType = 'Balanced'; // Default

        if (finalScore >= 18) {
          dominantType = 'Strategic';
        } else if (finalScore <= 12) {
          dominantType = 'Tactical';
        }

        setStrategyType(strategyTypes[dominantType]);
        setShowModal(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setStrategyType(null);
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
              <TrendingUp className="h-4 w-4" />
              Strategy Assessment
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              Business Strategy
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Assessment</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Evaluate your strategic thinking capabilities and learn how to plan for long-term business success.
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
                  <TrendingUp className="h-10 w-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Assess Your Strategic Thinking?</h2>
                <p className="text-gray-600">
                  This assessment takes about 5 minutes and will help you understand your approach to business strategy and planning.
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
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
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
        {showModal && strategyType && (
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
              <div className={`h-2 bg-gradient-to-r ${strategyType.color}`}></div>
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${strategyType.bgColor} mb-6`}>
                    <strategyType.icon className={`h-10 w-10 ${strategyType.textColor}`} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {name}, you're a
                  </h2>
                  <h3 className={`text-2xl font-bold ${strategyType.textColor} mb-4`}>
                    {strategyType.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {strategyType.description}
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    {score}/{questions.length * 3}
                  </div>
                  <div className="text-sm text-gray-600">Strategic Thinking Score</div>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Your Strategic Strengths
                  </h4>
                  <div className="grid gap-3">
                    {strategyType.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* When to Use */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    When Your Style Shines
                  </h4>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <p className="text-gray-700">{strategyType.whenToUse}</p>
                  </div>
                </div>

                {/* Growth Areas */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-red-500" />
                    Growth Opportunities
                  </h4>
                  <div className="space-y-3">
                    {strategyType.growthAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Strategic Development Plan</h4>
                  <div className="bg-red-50 rounded-xl p-6">
                    <div className="grid gap-3">
                      {strategyType.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Want to strengthen your strategic thinking?</h4>
                  <p className="text-gray-600 mb-4">
                    Join our newsletter for business strategy insights, frameworks, and tools to build your strategic capabilities.
                  </p>
                  <Link
                    href="https://bloopglobal.ck.page/ebb664d278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Strategy Insights
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
                  <Link prefetch={false} href="/games">
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
