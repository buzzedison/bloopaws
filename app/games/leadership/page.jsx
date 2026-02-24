
"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle, X, Crown, Users, Zap, Heart, ArrowRight, Award } from 'lucide-react';

// Define the questions and answers
const questions = [
    {
      question: 'When faced with a problem, you tend to:',
      answers: [
        { text: 'Look for input from team members', style: 'Democratic' },
        { text: 'Provide a clear direction for solving the problem', style: 'Authoritative' },
        { text: 'Allow the team to solve it on their own', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you prefer to make decisions?',
      answers: [
        { text: 'Collectively with the team', style: 'Democratic' },
        { text: 'Based on your own expertise', style: 'Authoritative' },
        { text: 'Letting individuals make their own decisions', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you respond to failure?',
      answers: [
        { text: 'Discuss the failure with the team to learn from mistakes', style: 'Democratic' },
        { text: 'Analyze what went wrong and set a new direction', style: 'Authoritative' },
        { text: 'Believe it’s part of the learning process for the team', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you delegate tasks?',
      answers: [
        { text: 'Based on discussion and team consensus', style: 'Democratic' },
        { text: 'Assign tasks based on your understanding of strengths and weaknesses', style: 'Authoritative' },
        { text: 'Allow team members to choose their own tasks', style: 'Laissez-faire' },
      ],
    },
    {
      question: 'How do you prefer to provide feedback?',
      answers: [
        { text: 'In a group setting to promote discussion', style: 'Democratic' },
        { text: 'Individually and directly', style: 'Authoritative' },
        { text: 'On an as-needed basis', style: 'Laissez-faire' },
      ],
    },

    {
        question: 'How do you approach setting goals for your team?',
        answers: [
          { text: 'Collaborate with the team to set achievable goals', style: 'Democratic' },
          { text: 'Set challenging goals to push the team to excel', style: 'Authoritative' },
          { text: 'Allow team members to set their own goals', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you handle conflict within your team?',
        answers: [
          { text: 'Facilitate a discussion to resolve issues collectively', style: 'Democratic' },
          { text: 'Make a decision to resolve the conflict quickly', style: 'Authoritative' },
          { text: 'Allow team members to work it out independently', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you approach communication with your team?',
        answers: [
          { text: 'Maintain open channels for dialogue and feedback', style: 'Democratic' },
          { text: 'Provide clear directives and updates', style: 'Authoritative' },
          { text: 'Keep communication informal and as-needed', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you handle a team member who isn’t meeting expectations?',
        answers: [
          { text: 'Discuss with them and the team to find supportive solutions', style: 'Democratic' },
          { text: 'Provide direct feedback and clear performance objectives', style: 'Authoritative' },
          { text: 'Believe they will improve with time and experience', style: 'Laissez-faire' },
        ],
    },
    {
        question: 'How do you approach innovation and new ideas?',
        answers: [
          { text: 'Encourage team discussion and collaborative brainstorming', style: 'Democratic' },
          { text: 'Provide a vision and challenge the team to innovate', style: 'Authoritative' },
          { text: 'Allow team members to explore new ideas independently', style: 'Laissez-faire' },
        ],
    }

    // ...additional questions
  ];

const leadershipStyles = {
  Authoritative: {
    title: 'Authoritative Leader',
    description: 'You lead with confidence and clarity, making decisive decisions and providing strong direction. You excel at setting clear goals and maintaining structure.',
    icon: Crown,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Clear decision making', 'Strong direction', 'Goal-oriented', 'Efficient problem solving'],
    whenToUse: 'Best for crisis situations, new teams, or when quick decisions are needed',
    growthAreas: ['May come across as controlling', 'Could benefit from more team input'],
    recommendations: ['Balance authority with empathy', 'Encourage team feedback', 'Delegate more to develop others']
  },
  Democratic: {
    title: 'Democratic Leader',
    description: 'You value collaboration and team input, fostering participation and shared decision-making. You create an inclusive environment where everyone\'s voice matters.',
    icon: Users,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['Inclusive decision making', 'Team collaboration', 'High morale', 'Creative solutions'],
    whenToUse: 'Ideal for creative projects, team development, or complex problems needing diverse perspectives',
    growthAreas: ['May take longer to make decisions', 'Could be more decisive when needed'],
    recommendations: ['Set clear timelines for decisions', 'Learn to balance input with action', 'Develop confidence in your own judgment']
  },
  LaissezFaire: {
    title: 'Laissez-Faire Leader',
    description: 'You provide freedom and autonomy to your team members, trusting them to manage their own work and make decisions. You focus on creating an environment of trust and independence.',
    icon: Zap,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    strengths: ['High autonomy', 'Innovation and creativity', 'Team ownership', 'Low micromanagement'],
    whenToUse: 'Perfect for experienced teams, creative work, or when developing self-sufficient team members',
    growthAreas: ['May lack structure', 'Could provide more guidance when needed'],
    recommendations: ['Set clear expectations and boundaries', 'Provide regular check-ins', 'Ensure accountability measures are in place']
  }
};
  
  const LeadershipQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [styleScores, setStyleScores] = useState({
      Authoritative: 0,
      Democratic: 0,
      LaissezFaire: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [leadershipStyle, setLeadershipStyle] = useState(null);

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const startQuiz = () => {
      if (name.trim()) {
        setQuizStarted(true);
      } else {
        alert('Please enter your name to start the quiz.');
      }
    };

    const handleAnswerOptionClick = (style, index) => {
      if (selectedAnswer !== null) return; // Prevent multiple selections

      setSelectedAnswer(index);

      // Add a delay before moving to next question or showing results
      setTimeout(() => {
        setStyleScores((prevScores) => {
          const newScores = { ...prevScores, [style]: prevScores[style] + 1 };
          return newScores;
        });

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setSelectedAnswer(null);
        } else {
          // Find dominant leadership style
          const styles = Object.keys(styleScores);
          let maxScore = 0;
          let dominantStyle = '';
          const finalScores = { ...styleScores, [style]: styleScores[style] + 1 };

          styles.forEach((styleKey) => {
            if (finalScores[styleKey] > maxScore) {
              maxScore = finalScores[styleKey];
              dominantStyle = styleKey;
            }
          });

          setLeadershipStyle(leadershipStyles[dominantStyle]);
          setShowModal(true);
        }
      }, 800);
    };

    const resetQuiz = () => {
      setCurrentQuestion(0);
      setStyleScores({
        Authoritative: 0,
        Democratic: 0,
        LaissezFaire: 0
      });
      setShowModal(false);
      setLeadershipStyle(null);
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
                Leadership Assessment
              </div>
              <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
                Discover Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Leadership Style</span>
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Uncover your dominant leadership approach and learn how to leverage your strengths to build stronger teams and achieve better results.
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Leadership Style?</h2>
                  <p className="text-gray-600">
                    This assessment takes about 5 minutes and will reveal insights about how you lead teams and make decisions.
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
                            onClick={() => handleAnswerOptionClick(answer.style, index)}
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
          {showModal && leadershipStyle && (
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
                <div className={`h-2 bg-gradient-to-r ${leadershipStyle.color}`}></div>
                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${leadershipStyle.bgColor} mb-6`}>
                      <leadershipStyle.icon className={`h-10 w-10 ${leadershipStyle.textColor}`} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                      {name}, you're a
                    </h2>
                    <h3 className={`text-2xl font-bold ${leadershipStyle.textColor} mb-4`}>
                      {leadershipStyle.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {leadershipStyle.description}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      Your Leadership Strengths
                    </h4>
                    <div className="grid gap-3">
                      {leadershipStyle.strengths.map((strength, index) => (
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
                      <p className="text-gray-700">{leadershipStyle.whenToUse}</p>
                    </div>
                  </div>

                  {/* Growth Areas */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Growth Opportunities
                    </h4>
                    <div className="space-y-3">
                      {leadershipStyle.growthAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Development Recommendations</h4>
                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="grid gap-3">
                        {leadershipStyle.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
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
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Want to develop your leadership skills further?</h4>
                    <p className="text-gray-600 mb-4">
                      Join our newsletter for leadership insights, team management tips, and exclusive resources to become a more effective leader.
                    </p>
                    <Link
                      href="https://bloopglobal.ck.page/ebb664d278"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      Get Leadership Insights
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

export default LeadershipQuiz;
