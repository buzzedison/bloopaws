"use client"
// Import necessary libraries
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, X, Shield, Zap, Award, TrendingUp, ArrowRight, AlertTriangle } from 'lucide-react';

// Define the questions and answers
const questions = [
  {
    question: 'When considering a new business opportunity with high potential returns, you typically:',
    answers: [
      { text: 'Research thoroughly and proceed only if risks are minimal', value: 1, style: 'Conservative' },
      { text: 'Calculate the risk-reward ratio and proceed if it\'s favorable', value: 2, style: 'Calculated' },
      { text: 'Dive in enthusiastically, believing in the potential upside', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'How do you feel about investing significant time/money in unproven ideas?',
    answers: [
      { text: 'Very uncomfortable - prefer proven concepts', value: 1, style: 'Conservative' },
      { text: 'Open to it if the potential is substantial and risks are managed', value: 2, style: 'Calculated' },
      { text: 'Excited by the possibility of breakthrough success', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'When your business faces unexpected challenges, your first instinct is to:',
    answers: [
      { text: 'Implement protective measures and cut back on risky activities', value: 1, style: 'Conservative' },
      { text: 'Assess the situation and adjust strategy while maintaining momentum', value: 2, style: 'Calculated' },
      { text: 'See it as an opportunity and potentially increase commitment', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'How much of your business resources are you comfortable allocating to experimental projects?',
    answers: [
      { text: 'Very little - prefer to focus on core, proven operations', value: 1, style: 'Conservative' },
      { text: 'A moderate portion with clear success metrics and exit strategies', value: 2, style: 'Calculated' },
      { text: 'A significant portion - innovation requires substantial investment', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'When evaluating market opportunities, you prioritize:',
    answers: [
      { text: 'Stability and predictability in market conditions', value: 1, style: 'Conservative' },
      { text: 'Balanced assessment of opportunities and risks', value: 2, style: 'Calculated' },
      { text: 'High-growth potential, even in volatile markets', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'How do you approach business expansion decisions?',
    answers: [
      { text: 'Expand gradually and only when current operations are highly stable', value: 1, style: 'Conservative' },
      { text: 'Expand strategically with contingency plans and risk mitigation', value: 2, style: 'Calculated' },
      { text: 'Expand aggressively to capture market share quickly', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'When considering partnerships or investments, you focus most on:',
    answers: [
      { text: 'Track record of reliability and financial stability', value: 1, style: 'Conservative' },
      { text: 'Combination of potential and risk management strategies', value: 2, style: 'Calculated' },
      { text: 'Growth potential and transformative opportunities', value: 3, style: 'Aggressive' }
    ],
  },
  {
    question: 'How tolerant are you of business setbacks and failures?',
    answers: [
      { text: 'Not very tolerant - prefer to avoid situations that could lead to failure', value: 1, style: 'Conservative' },
      { text: 'Moderately tolerant with backup plans and recovery strategies', value: 2, style: 'Calculated' },
      { text: 'Highly tolerant - view failures as essential learning experiences', value: 3, style: 'Aggressive' }
    ],
  }
];

const riskTypes = {
  Conservative: {
    title: 'Conservative Risk Manager',
    description: 'You prioritize stability and risk minimization above all else. Your approach focuses on preserving capital, maintaining steady operations, and avoiding situations that could jeopardize your business foundation.',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Capital preservation', 'Operational stability', 'Risk avoidance', 'Financial prudence'],
    whenToUse: 'Ideal for established businesses, risk-averse industries, or when capital preservation is critical',
    growthAreas: ['May miss high-growth opportunities', 'Could benefit from calculated risk-taking'],
    recommendations: ['Develop risk assessment frameworks', 'Explore low-risk growth opportunities', 'Balance caution with strategic opportunities']
  },
  Calculated: {
    title: 'Calculated Risk Taker',
    description: 'You excel at evaluating risk-reward ratios and making informed decisions. Your balanced approach allows you to capitalize on opportunities while maintaining sufficient safeguards and contingency plans.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Risk-reward analysis', 'Strategic decision making', 'Contingency planning', 'Opportunity recognition'],
    whenToUse: 'Perfect for most business situations requiring balanced growth and risk management',
    growthAreas: ['May be overly cautious at times', 'Could take more decisive action when opportunities arise'],
    recommendations: ['Trust your analysis more confidently', 'Develop faster decision-making processes', 'Balance analysis with action']
  },
  Aggressive: {
    title: 'Aggressive Risk Seeker',
    description: 'You thrive on high-stakes opportunities and are willing to accept significant risk for potentially transformative rewards. Your bold approach can lead to breakthrough success but requires careful risk management.',
    icon: Zap,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Bold decision making', 'Opportunity recognition', 'High-growth potential', 'Innovation drive'],
    whenToUse: 'Great for startups, high-growth industries, or when breakthrough success is needed',
    growthAreas: ['May overlook important risks', 'Could benefit from more risk mitigation strategies'],
    recommendations: ['Implement risk management frameworks', 'Develop contingency plans', 'Balance boldness with prudence']
  }
};

// The main quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [riskType, setRiskType] = useState(null);
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
        // Find the risk type based on final score
        const finalScore = score + value;
        let dominantType = 'Calculated'; // Default

        if (finalScore >= 18) {
          dominantType = 'Aggressive';
        } else if (finalScore <= 12) {
          dominantType = 'Conservative';
        }

        setRiskType(riskTypes[dominantType]);
        setShowModal(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setRiskType(null);
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
              <Target className="h-4 w-4" />
              Risk Assessment
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              Risk Assessment
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Game</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Discover your risk tolerance and learn how to make calculated decisions that balance opportunity with security.
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
                  <Target className="h-10 w-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Risk Tolerance?</h2>
                <p className="text-gray-600">
                  This assessment takes about 5 minutes and will help you understand your approach to business risk and decision-making.
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
        {showModal && riskType && (
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
              <div className={`h-2 bg-gradient-to-r ${riskType.color}`}></div>
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${riskType.bgColor} mb-6`}>
                    <riskType.icon className={`h-10 w-10 ${riskType.textColor}`} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {name}, you're a
                  </h2>
                  <h3 className={`text-2xl font-bold ${riskType.textColor} mb-4`}>
                    {riskType.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {riskType.description}
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    {score}/{questions.length * 3}
                  </div>
                  <div className="text-sm text-gray-600">Risk Tolerance Score</div>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Your Risk Management Strengths
                  </h4>
                  <div className="grid gap-3">
                    {riskType.strengths.map((strength, index) => (
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
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    When Your Approach Works Best
                  </h4>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <p className="text-gray-700">{riskType.whenToUse}</p>
                  </div>
                </div>

                {/* Growth Areas */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Areas for Growth
                  </h4>
                  <div className="space-y-3">
                    {riskType.growthAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Risk Management Development Plan</h4>
                  <div className="bg-red-50 rounded-xl p-6">
                    <div className="grid gap-3">
                      {riskType.recommendations.map((rec, index) => (
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
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Want to master risk management?</h4>
                  <p className="text-gray-600 mb-4">
                    Join our newsletter for risk assessment strategies, decision-making frameworks, and entrepreneurial risk management insights.
                  </p>
                  <Link
                    href="https://bloopglobal.ck.page/ebb664d278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Risk Management Tips
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
