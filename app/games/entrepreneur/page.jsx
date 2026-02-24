"use client"
// Import necessary libraries
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, CheckCircle, X, Sparkles, Trophy, Target, TrendingUp, Award } from 'lucide-react';
// Define the questions and answers
const questions = [
    {
      question: 'How do you handle risk in business ventures?',
      answers: [
        { text: 'Avoid it at all costs', value: 1 },
        { text: 'Calculate and take if warranted', value: 2 },
        { text: 'Embrace and charge forward', value: 3 }
      ],
    },
    {
      question: 'When faced with a tough business decision, you usually:',
      answers: [
        { text: 'Seek advice from mentors or advisors', value: 1 },
        { text: 'Analyze the data and make an informed choice', value: 2 },
        { text: 'Go with your gut feeling', value: 3 }
      ],
    },
    {
      question: 'How would you describe your leadership style?',
      answers: [
        { text: 'Authoritative', value: 1 },
        { text: 'Democratic', value: 2 },
        { text: 'Laissez-faire', value: 3 }
      ],
    },
    {
      question: 'When a problem arises in your business, your first reaction is to:',
      answers: [
        { text: 'Find who is responsible', value: 1 },
        { text: 'Look for a solution', value: 2 },
        { text: 'Evaluate the impact on the business', value: 3 }
      ],
    },
    {
      question: 'How important is innovation in your business model?',
      answers: [
        { text: 'Crucial, always looking for the next big thing', value: 3 },
        { text: 'Important, but not at the cost of current operations', value: 2 },
        { text: 'Not as important as stability and consistency', value: 1 }
      ],
    },
    {
      question: 'How do you manage finances in your business?',
      answers: [
        { text: 'Very conservatively, avoiding debt', value: 1 },
        { text: 'Wisely, with a balance of debt and equity', value: 2 },
        { text: 'Aggressively, leveraging debt for growth', value: 3 }
      ],
    },
    {
      question: 'What’s more important when building a team?',
      answers: [
        { text: 'Skill and expertise', value: 1 },
        { text: 'Cultural fit', value: 2 },
        { text: 'A balance of both', value: 3 }
      ],
    },
    {
      question: 'How do you handle negative customer feedback?',
      answers: [
        { text: 'Take it personally and feel discouraged', value: 1 },
        { text: 'Analyze it for constructive feedback', value: 2 },
        { text: 'See it as an opportunity for improvement', value: 3 }
      ],
    },
    {
      question: 'Where do you see your business in 10 years?',
      answers: [
        { text: 'Dominating the market', value: 3 },
        { text: 'Having a loyal customer base', value: 2 },
        { text: 'Making a difference in the community', value: 1 }
      ],
    },
    {
      question: 'How do you balance work and personal life?',
      answers: [
        { text: 'Work always comes first', value: 3 },
        { text: 'Strive for a healthy balance', value: 2 },
        { text: 'Ensure personal life is prioritized', value: 1 }
      ],
    },
  ];
  
const entrepreneurialTypes = [
  {
    minScore: 10,
    maxScore: 15,
    type: 'The Conservative Entrepreneur',
    description: 'You prefer a steady and secure approach, valuing stability over high-risk opportunities. You\'re methodical, risk-averse, and prioritize sustainable growth over rapid expansion.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Risk Management', 'Stability Focus', 'Long-term Planning'],
    recommendations: ['Focus on established markets', 'Build strong financial reserves', 'Prioritize customer retention']
  },
  {
    minScore: 16,
    maxScore: 20,
    type: 'The Balanced Entrepreneur',
    description: 'You strike a balance between risk and reward, making calculated decisions to grow your venture. You\'re pragmatic, adaptable, and know when to push forward or hold back.',
    icon: TrendingUp,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Strategic Thinking', 'Risk Assessment', 'Adaptability'],
    recommendations: ['Use data-driven decision making', 'Diversify revenue streams', 'Balance innovation with stability']
  },
  {
    minScore: 21,
    maxScore: 25,
    type: 'The Go-Getter Entrepreneur',
    description: 'Your proactive and ambitious nature drives you to chase down opportunities and achieve lofty goals. You\'re energetic, competitive, and always looking for the next big win.',
    icon: Trophy,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Opportunity Recognition', 'Competitive Drive', 'Growth Orientation'],
    recommendations: ['Pursue high-growth markets', 'Network aggressively', 'Invest in marketing and sales']
  },
  {
    minScore: 26,
    maxScore: 30,
    type: 'The Visionary Entrepreneur',
    description: 'With an all-or-nothing attitude, you\'re ready to invest heavily and take bold actions to realize your vision. You\'re innovative, bold, and willing to bet big on your dreams.',
    icon: Sparkles,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Innovation Leadership', 'Bold Decision Making', 'Vision Execution'],
    recommendations: ['Lead disruptive innovation', 'Build scalable business models', 'Seek venture capital funding']
  }
];

// The main quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [entrepreneurialType, setEntrepreneurialType] = useState(null);
  const [name, setName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
        // Find the entrepreneurial type based on final score
        const finalScore = score + value;
        const foundType = entrepreneurialTypes.find(
          type => finalScore >= type.minScore && finalScore <= type.maxScore
        );
        setEntrepreneurialType(foundType);
        setShowModal(true);
      }
    }, 800);
  };

  const startQuiz = () => {
    if (name.trim()) {
      setQuizStarted(true);
    } else {
      alert('Please enter your name to start the quiz.');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setEntrepreneurialType(null);
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
              <Users className="h-4 w-4" />
              Entrepreneur Assessment
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              Discover Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Entrepreneur Type</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Answer 10 questions to uncover your entrepreneurial personality and get personalized insights for your business journey.
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
                    <Users className="h-10 w-10 text-red-600" />
                  </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>
                <p className="text-gray-600">
                  This assessment takes about 3 minutes and will provide valuable insights into your entrepreneurial style.
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
        {showModal && entrepreneurialType && (
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
              <div className={`h-2 bg-gradient-to-r ${entrepreneurialType.color}`}></div>
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${entrepreneurialType.bgColor} mb-6`}>
                    <entrepreneurialType.icon className={`h-10 w-10 ${entrepreneurialType.textColor}`} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {name}, you're a
                  </h2>
                  <h3 className={`text-2xl font-bold ${entrepreneurialType.textColor} mb-4`}>
                    {entrepreneurialType.type}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {entrepreneurialType.description}
                  </p>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Your Strengths
                  </h4>
                  <div className="grid gap-3">
                    {entrepreneurialType.strengths.map((strength, index) => (
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
                    Growth Recommendations
                  </h4>
                  <div className="grid gap-3">
                    {entrepreneurialType.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Want to develop your entrepreneurial skills further?</h4>
                  <p className="text-gray-600 mb-4">
                    Join our newsletter for exclusive business tips, guides, and opportunities to grow your venture.
                  </p>
                  <Link
                    href="https://bloopglobal.ck.page/ebb664d278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Business Insights
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
