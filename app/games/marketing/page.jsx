"use client"
// Import necessary libraries
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle, X, Award, Target, TrendingUp, ArrowRight, Megaphone, BarChart3 } from 'lucide-react';

// Define the questions and answers
const questions = [
  {
    question: 'What is the primary goal of content marketing?',
    answers: [
      { text: 'Direct sales conversion', value: 1, style: 'Transactional' },
      { text: 'Building trust and authority over time', value: 3, style: 'Relationship' },
      { text: 'Quick lead generation', value: 2, style: 'Balanced' }
    ],
  },
  {
    question: 'When developing a marketing strategy, you should start by:',
    answers: [
      { text: 'Choosing your marketing channels', value: 1, style: 'Transactional' },
      { text: 'Understanding your target audience deeply', value: 3, style: 'Relationship' },
      { text: 'Setting specific sales targets', value: 2, style: 'Balanced' }
    ],
  },
  {
    question: 'How do you measure the success of your marketing efforts?',
    answers: [
      { text: 'Primarily by immediate sales revenue', value: 1, style: 'Transactional' },
      { text: 'Through a mix of quantitative metrics and qualitative feedback', value: 2, style: 'Balanced' },
      { text: 'By long-term brand awareness and customer loyalty', value: 3, style: 'Relationship' }
    ],
  },
  {
    question: 'What role does social proof play in marketing?',
    answers: [
      { text: 'Minimal - focus on product features instead', value: 1, style: 'Transactional' },
      { text: 'Important for credibility but not the main focus', value: 2, style: 'Balanced' },
      { text: 'Critical for building trust and influencing decisions', value: 3, style: 'Relationship' }
    ],
  },
  {
    question: 'When creating marketing content, you prioritize:',
    answers: [
      { text: 'Persuasive sales copy and clear calls-to-action', value: 1, style: 'Transactional' },
      { text: 'Educational and valuable content that helps customers', value: 3, style: 'Relationship' },
      { text: 'Balanced mix of promotional and helpful content', value: 2, style: 'Balanced' }
    ],
  },
  {
    question: 'How important is customer feedback in your marketing strategy?',
    answers: [
      { text: 'Somewhat important for product improvement', value: 2, style: 'Balanced' },
      { text: 'Essential for building long-term relationships and advocacy', value: 3, style: 'Relationship' },
      { text: 'Less important than focusing on new customer acquisition', value: 1, style: 'Transactional' }
    ],
  },
  {
    question: 'What is your approach to customer retention marketing?',
    answers: [
      { text: 'Focus primarily on acquiring new customers', value: 1, style: 'Transactional' },
      { text: 'Balance acquisition with retention efforts', value: 2, style: 'Balanced' },
      { text: 'Prioritize retention as it\'s more cost-effective than acquisition', value: 3, style: 'Relationship' }
    ],
  },
  {
    question: 'How do you view the customer journey?',
    answers: [
      { text: 'A linear path from awareness to purchase', value: 1, style: 'Transactional' },
      { text: 'A complex, ongoing relationship with multiple touchpoints', value: 3, style: 'Relationship' },
      { text: 'A process with clear stages but room for optimization', value: 2, style: 'Balanced' }
    ],
  }
];

const marketingTypes = {
  Transactional: {
    title: 'Transactional Marketer',
    description: 'You focus on direct response and immediate conversions. Your marketing emphasizes clear value propositions, compelling offers, and driving quick sales through targeted campaigns and persuasive messaging.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Direct response focus', 'Clear value propositions', 'Sales-driven campaigns', 'Conversion optimization'],
    whenToUse: 'Perfect for short sales cycles, clear buying processes, or performance marketing',
    growthAreas: ['May neglect long-term brand building', 'Could strengthen relationship marketing'],
    recommendations: ['Incorporate relationship-building elements', 'Develop brand storytelling', 'Balance short-term wins with long-term loyalty']
  },
  Balanced: {
    title: 'Balanced Marketing Strategist',
    description: 'You effectively combine transactional and relationship marketing approaches. This pragmatic strategy allows you to drive immediate results while building sustainable customer relationships and brand equity.',
    icon: BarChart3,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Strategic balance', 'Performance tracking', 'Customer journey optimization', 'Flexible approach'],
    whenToUse: 'Ideal for most businesses needing both immediate results and long-term growth',
    growthAreas: ['May need to specialize in one approach', 'Could deepen expertise in specific areas'],
    recommendations: ['Choose primary focus areas based on business goals', 'Develop deeper expertise in chosen strategies', 'Maintain balance while adapting to market changes']
  },
  Relationship: {
    title: 'Relationship Marketing Expert',
    description: 'You prioritize building deep, lasting connections with customers. Your approach focuses on trust-building, community development, and creating advocates who become brand ambassadors and drive organic growth.',
    icon: Users,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Customer relationship building', 'Brand loyalty development', 'Community engagement', 'Long-term value creation'],
    whenToUse: 'Excellent for subscription businesses, B2B relationships, or brand-driven companies',
    growthAreas: ['May need more focus on immediate conversions', 'Could strengthen direct response tactics'],
    recommendations: ['Develop conversion-focused campaigns alongside relationship building', 'Track both immediate and long-term ROI', 'Balance relationship depth with business growth metrics']
  }
};

// The main quiz component
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [marketingType, setMarketingType] = useState(null);
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
        // Find the marketing type based on final score
        const finalScore = score + value;
        let dominantType = 'Balanced'; // Default

        if (finalScore >= 18) {
          dominantType = 'Relationship';
        } else if (finalScore <= 12) {
          dominantType = 'Transactional';
        }

        setMarketingType(marketingTypes[dominantType]);
        setShowModal(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setMarketingType(null);
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
              Marketing Assessment
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              Marketing Knowledge
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Quiz</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Test your marketing strategy skills and discover your approach to customer acquisition and relationship building.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Test Your Marketing Knowledge?</h2>
                <p className="text-gray-600">
                  This assessment takes about 5 minutes and will evaluate your marketing strategy approach and customer relationship skills.
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
        {showModal && marketingType && (
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
              <div className={`h-2 bg-gradient-to-r ${marketingType.color}`}></div>
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${marketingType.bgColor} mb-6`}>
                    <marketingType.icon className={`h-10 w-10 ${marketingType.textColor}`} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {name}, you're a
                  </h2>
                  <h3 className={`text-2xl font-bold ${marketingType.textColor} mb-4`}>
                    {marketingType.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {marketingType.description}
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    {score}/{questions.length * 3}
                  </div>
                  <div className="text-sm text-gray-600">Marketing Strategy Score</div>
                </div>

                {/* Strengths */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Your Marketing Strengths
                  </h4>
                  <div className="grid gap-3">
                    {marketingType.strengths.map((strength, index) => (
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
                    <Megaphone className="h-5 w-5 text-blue-500" />
                    When Your Style Excels
                  </h4>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <p className="text-gray-700">{marketingType.whenToUse}</p>
                  </div>
                </div>

                {/* Growth Areas */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    Areas for Marketing Growth
                  </h4>
                  <div className="space-y-3">
                    {marketingType.growthAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Marketing Development Roadmap</h4>
                  <div className="bg-red-50 rounded-xl p-6">
                    <div className="grid gap-3">
                      {marketingType.recommendations.map((rec, index) => (
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
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Want to master marketing strategy?</h4>
                  <p className="text-gray-600 mb-4">
                    Join our newsletter for marketing insights, customer acquisition strategies, and growth hacking tips.
                  </p>
                  <Link
                    href="https://bloopglobal.ck.page/ebb664d278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Get Marketing Insights
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
