"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, DollarSign, Target, ArrowRight, Sparkles, Trophy, Brain, TrendingUp } from 'lucide-react';

const games = [
  {
    id: 'entrepreneur',
    title: 'Know Your Entrepreneur Type',
    description: 'Discover what type of entrepreneur you are and unlock your business potential.',
    icon: Users,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['10 insightful questions', '4 entrepreneur archetypes', 'Personalized insights']
  },
  {
    id: 'money',
    title: 'Test Your Financial Literacy',
    description: 'Evaluate your understanding of basic financial concepts and business money management.',
    icon: DollarSign,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Financial knowledge assessment', 'Business finance focus', 'Actionable tips']
  },
  {
    id: 'leadership',
    title: 'What Type of Leader Are You?',
    description: 'Uncover insights into your leadership skills and how they affect your business decisions.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Leadership style analysis', 'Team management insights', 'Growth recommendations']
  },
  {
    id: 'strategy',
    title: 'Business Strategy Assessment',
    description: 'Evaluate your strategic thinking and business planning capabilities for long-term success.',
    icon: TrendingUp,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Strategic mindset evaluation', 'Business model analysis', 'Growth planning insights']
  },
  {
    id: 'risk',
    title: 'Risk Assessment Game',
    description: 'Discover your risk tolerance and learn to make calculated decisions under uncertainty.',
    icon: Target,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Risk personality profiling', 'Decision-making scenarios', 'Risk management strategies']
  },
  {
    id: 'marketing',
    title: 'Marketing Knowledge Quiz',
    description: 'Test your marketing strategy skills and customer acquisition expertise.',
    icon: Users,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: ['Marketing strategy assessment', 'Customer journey analysis', 'Growth tactics evaluation']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Games = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Interactive Business Tools
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-black text-white sm:text-6xl lg:text-7xl"
            >
              Business Games & Assessments
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-3xl text-xl text-white/90"
            >
              Discover your entrepreneurial strengths, test your financial knowledge, and uncover your leadership style through our interactive business assessments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm font-medium">Personalized Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <span className="text-sm font-medium">Expert Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">Free to Play</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              Choose Your Assessment
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each game takes 3-5 minutes and provides valuable insights to help you grow your business.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {games.map((game) => {
              const IconComponent = game.icon;
              return (
                <Link prefetch={false} key={game.id} href={`/games/${game.id}`}>
                  <motion.div
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  >
                    <div className={`h-2 bg-gradient-to-r ${game.color}`}></div>

                    <div className="p-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${game.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-8 w-8 ${game.textColor}`} />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {game.description}
                      </p>

                      <div className="space-y-2 mb-8">
                        {game.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="group/btn inline-flex items-center gap-3 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg">
                        Start Assessment
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}></div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to Discover Your Business Potential?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Take our assessments and gain valuable insights into your entrepreneurial journey.
          </p>
          <div className="mt-8">
            <Link prefetch={false} href="#games">
              <button className="inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;
