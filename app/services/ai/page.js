'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Zap, Brain, MessageSquare, BarChart, FileCode, ChevronDown, Sparkles } from 'lucide-react';

export default function AIServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax effect values
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  const aiSolutions = [
    {
      icon: <MessageSquare size={32} className="text-violet-600" />,
      title: "Conversational AI",
      description: "Custom chatbots and virtual assistants that understand context, learn from interactions, and provide intelligent responses to your customers.",
      features: [
        "Natural language understanding",
        "Multi-channel deployment",
        "Continuous learning capabilities",
        "Seamless handoff to human agents"
      ]
    },
    {
      icon: <Zap size={32} className="text-violet-600" />,
      title: "Process Automation",
      description: "AI-powered workflows that automate repetitive tasks, analyze documents, and streamline operations across your organization.",
      features: [
        "Document processing & extraction",
        "Workflow optimization",
        "Error reduction systems",
        "Integration with existing tools"
      ]
    },
    {
      icon: <Brain size={32} className="text-violet-600" />,
      title: "Predictive Analytics",
      description: "Machine learning models that analyze your data to forecast trends, identify opportunities, and make data-driven recommendations.",
      features: [
        "Custom prediction models",
        "Anomaly detection",
        "Trend forecasting",
        "Decision support systems"
      ]
    },
    {
      icon: <BarChart size={32} className="text-violet-600" />,
      title: "Business Intelligence",
      description: "AI-enhanced dashboards and visualization tools that transform complex data into actionable insights for your business.",
      features: [
        "Interactive dashboards",
        "Real-time data processing",
        "Automated reporting",
        "Custom KPI tracking"
      ]
    },
    {
      icon: <FileCode size={32} className="text-violet-600" />,
      title: "Content Generation",
      description: "AI systems that create high-quality content, from marketing copy and product descriptions to code and creative assets.",
      features: [
        "Multilingual content creation",
        "Brand voice adaptation",
        "SEO-optimized writing",
        "Image and design generation"
      ]
    },
    {
      icon: <Bot size={32} className="text-violet-600" />,
      title: "Custom AI Solutions",
      description: "Bespoke artificial intelligence applications built specifically for your unique business challenges and opportunities.",
      features: [
        "Tailored AI strategy",
        "Custom model development",
        "Ethical AI implementation",
        "Ongoing optimization"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden" role="main">
      {/* Skip Link for Accessibility */}
      <a
        href="#solutions-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-4 focus:ring-violet-300"
      >
        Skip to main content
      </a>

      {/* Hero Section with Animated Background */}
      <section
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900"
        aria-labelledby="hero-heading"
        role="banner"
      >
        {/* Animated Neural Network Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + 3 + 'px',
                height: Math.random() * 8 + 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.4 + 0.2
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0.9, 0.2],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}

          {/* Floating AI Icons */}
          {[
            { Icon: Bot, delay: 0 },
            { Icon: Brain, delay: 1.5 },
            { Icon: Zap, delay: 3 },
            { Icon: MessageSquare, delay: 4.5 },
            { Icon: Sparkles, delay: 2.5 }
          ].map(({ Icon, delay }, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute opacity-10"
              style={{
                left: Math.random() * 80 + 10 + '%',
                top: Math.random() * 80 + 10 + '%'
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
            >
              <Icon size={24 + Math.random() * 16} className="text-violet-200" />
            </motion.div>
          ))}

          {/* Connection lines */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-white to-transparent opacity-8"
              style={{
                width: '2px',
                height: Math.random() * 150 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                transformOrigin: 'center',
                rotate: Math.random() * 360 + 'deg'
              }}
              animate={{
                opacity: [0.05, 0.3, 0.05],
                scaleY: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center px-4 md:px-6 max-w-4xl"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight"
            >
              Intelligent Automation <br className="hidden sm:block" />
              <span className="text-violet-300">for the Modern Business</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-violet-100 mb-6 md:mb-8 max-w-3xl mx-auto px-2">
              Harness the power of artificial intelligence to streamline operations,
              enhance customer experiences, and unlock new business opportunities.
            </p>
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link prefetch={false} href="/contact">
                <button
                  className="bg-white text-violet-900 px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-violet-100 hover:scale-105 focus:bg-violet-100 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Start your AI journey - Contact us to begin"
                >
                  Start Your AI Journey
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex flex-col items-center text-white/70 cursor-pointer group">
            <span className="text-sm mb-2 group-hover:text-white transition-colors duration-300">Explore More</span>
            <ChevronDown size={24} className="group-hover:text-white transition-colors duration-300" />
          </div>
        </motion.div>
      </section>

      {/* AI Solutions Grid */}
      <motion.section
        className="py-16 md:py-24 px-4 md:px-6 bg-white"
        aria-labelledby="solutions-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 id="solutions-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our AI Solutions</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              We build intelligent systems that learn, adapt, and deliver value across your organization.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-violet-200 hover:scale-105 cursor-pointer group focus-within:shadow-2xl focus-within:border-violet-200"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                role="article"
                tabIndex={0}
                aria-labelledby={`solution-${index}-title`}
              >
                <div className="bg-violet-100 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:bg-violet-200 transition-colors duration-300">
                  {solution.icon}
                </div>
                <h3
                  id={`solution-${index}-title`}
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-900 transition-colors duration-300"
                >
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{solution.description}</p>
                <ul className="space-y-2 md:space-y-3">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/item">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-violet-600 mr-2 md:mr-3 mt-0.5 group-hover/item:text-violet-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base group-hover/item:text-gray-900 transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section with Timeline */}
      <motion.section
        className="py-16 md:py-24 px-4 md:px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our AI Development Process</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              A structured approach to creating intelligent solutions that deliver real business value.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-violet-200"></div>

            {/* Timeline Items */}
            {[
              {
                title: "Discovery & Strategy",
                description: "We analyze your business needs, data landscape, and opportunities for AI implementation.",
                delay: 0.1,
                step: "01"
              },
              {
                title: "Solution Design",
                description: "Our team designs a custom AI solution architecture tailored to your specific requirements.",
                delay: 0.3,
                step: "02"
              },
              {
                title: "Development & Training",
                description: "We develop and train AI models using your data, ensuring accuracy and performance.",
                delay: 0.5,
                step: "03"
              },
              {
                title: "Integration & Testing",
                description: "The AI solution is integrated with your existing systems and thoroughly tested.",
                delay: 0.7,
                step: "04"
              },
              {
                title: "Deployment & Monitoring",
                description: "We deploy your AI solution and establish continuous monitoring and improvement processes.",
                delay: 0.9,
                step: "05"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative flex items-center justify-start md:justify-between mb-8 md:mb-16"
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: step.delay, duration: 0.6 }}
              >
                {/* Timeline Node - Mobile optimized */}
                <div className="flex-shrink-0 w-12 h-12 md:w-8 md:h-8 rounded-full bg-violet-600 border-4 border-white shadow z-10 flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                  <span className="text-white font-bold text-sm md:hidden">{step.step}</span>
                </div>

                {/* Content Box - Full width on mobile, half width on desktop */}
                <div className="ml-4 md:ml-0 w-full md:w-5/12 bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-violet-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        className="py-16 md:py-24 px-4 md:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Success Stories</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              See how our AI solutions have transformed businesses across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "E-commerce Personalization Engine",
                industry: "Retail",
                results: "43% increase in conversion rate, 27% higher average order value",
                description: "We built a recommendation engine that analyzes customer behavior to deliver hyper-personalized product suggestions.",
                color: "bg-violet-700"
              },
              {
                title: "Intelligent Customer Service Platform",
                industry: "Financial Services",
                results: "68% reduction in response time, 92% customer satisfaction",
                description: "Our AI-powered chatbot handles 80% of routine customer inquiries, freeing human agents for complex issues.",
                color: "bg-indigo-700"
              },
              {
                title: "Predictive Maintenance System",
                industry: "Manufacturing",
                results: "35% reduction in downtime, $1.2M annual savings",
                description: "Our solution predicts equipment failures before they happen, optimizing maintenance schedules and preventing costly breakdowns.",
                color: "bg-purple-700"
              },
              {
                title: "Content Optimization Platform",
                industry: "Media & Publishing",
                results: "52% increase in engagement, 3x content production efficiency",
                description: "We developed an AI system that generates, optimizes, and personalizes content across multiple channels.",
                color: "bg-violet-800"
              }
            ].map((study, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className={`${study.color} py-4 px-4 md:px-6 group-hover:opacity-90 transition-opacity duration-300`}>
                  <span className="text-xs md:text-sm font-semibold text-white/80">{study.industry}</span>
                  <h3 className="text-lg md:text-2xl font-bold text-white mt-1">{study.title}</h3>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{study.description}</p>
                  <div className="bg-violet-50 p-3 md:p-4 rounded-lg group-hover:bg-violet-100 transition-colors duration-300">
                    <h4 className="font-semibold text-violet-900 mb-1 text-sm md:text-base">Results:</h4>
                    <p className="text-violet-700 text-sm md:text-base">{study.results}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Preview Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Tiers</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Choose the perfect AI solution package for your business needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Starter AI",
                price: "Starting at $2,500",
                description: "Perfect for small businesses looking to automate basic processes",
                features: [
                  "Basic AI chatbot setup",
                  "Simple workflow automation",
                  "2 hours of training",
                  "Email support",
                  "Basic analytics dashboard"
                ],
                popular: false,
                icon: <Bot size={32} className="text-violet-600" />
              },
              {
                name: "Professional AI",
                price: "Starting at $7,500",
                description: "Comprehensive AI solutions for growing businesses",
                features: [
                  "Advanced conversational AI",
                  "Multi-channel integration",
                  "Custom model training",
                  "8 hours of training",
                  "Priority support",
                  "Advanced analytics",
                  "API integration"
                ],
                popular: true,
                icon: <Brain size={32} className="text-violet-600" />
              },
              {
                name: "Enterprise AI",
                price: "Custom pricing",
                description: "Full-scale AI transformation for large organizations",
                features: [
                  "Everything in Professional",
                  "Custom AI model development",
                  "Unlimited training sessions",
                  "24/7 premium support",
                  "Dedicated account manager",
                  "On-premise deployment options",
                  "Compliance & security features"
                ],
                popular: false,
                icon: <Zap size={32} className="text-violet-600" />
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  tier.popular
                    ? 'border-violet-500 scale-105 hover:scale-110'
                    : 'border-gray-100 hover:border-violet-200 hover:scale-105'
                } p-6 md:p-8`}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="bg-violet-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl md:text-3xl font-bold text-violet-600 mb-2">{tier.price}</div>
                  <p className="text-gray-600 text-sm md:text-base">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link prefetch={false} href="/contact" className="block">
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    tier.popular
                      ? 'bg-violet-600 text-white hover:bg-violet-700 hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-violet-600 hover:text-white hover:scale-105'
                  }`}>
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Need a custom solution? Let's discuss your specific requirements.
            </p>
            <Link prefetch={false} href="/contact">
              <button className="bg-transparent border-2 border-violet-600 text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-600 hover:text-white transition-all duration-200 hover:scale-105">
                Contact for Custom Quote
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Hear from business leaders who have successfully implemented our AI solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "The AI chatbot reduced our customer service costs by 40% while improving response quality. Our customers love the instant, intelligent support.",
                author: "Sarah Johnson",
                position: "CTO, TechFlow Solutions",
                rating: 5
              },
              {
                quote: "Their predictive analytics platform helped us optimize our supply chain, saving us $2.1M annually. The ROI was incredible.",
                author: "Michael Chen",
                position: "Operations Director, Global Manufacturing Corp",
                rating: 5
              },
              {
                quote: "The content generation AI transformed our marketing workflow. We're now producing 3x more content with the same team size.",
                author: "Emma Rodriguez",
                position: "Marketing Director, Digital Media Co",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 text-sm md:text-base italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.author}</div>
                  <div className="text-violet-600 text-xs md:text-sm">{testimonial.position}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-violet-900 to-indigo-900 text-white py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-base md:text-xl text-violet-100 mb-6 md:mb-8 max-w-3xl mx-auto px-2">
              Let's discuss how our AI solutions can address your specific challenges and unlock new opportunities.
            </p>
            <Link prefetch={false} href="/contact">
              <button className="bg-white text-violet-900 px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-violet-100 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Schedule a Consultation
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
