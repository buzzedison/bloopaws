'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Zap, Brain, MessageSquare, BarChart, FileCode } from 'lucide-react';

export default function AIServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax effect values
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacitySection1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacitySection3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900">
        {/* Animated Neural Network Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Connection lines */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-white opacity-10"
              style={{
                width: '1px',
                height: Math.random() * 200 + 100 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                transformOrigin: 'center',
                rotate: Math.random() * 360 + 'deg'
              }}
              animate={{
                opacity: [0.05, 0.2, 0.05]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Intelligent Automation <br className="hidden md:block" />
              <span className="text-violet-300">for the Modern Business</span>
            </h1>
            <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to streamline operations, 
              enhance customer experiences, and unlock new business opportunities.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/contact">
                <button className="bg-white text-violet-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-violet-100 transition-colors shadow-lg">
                  Start Your AI Journey
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* AI Solutions Grid */}
      <motion.section 
        className="py-24 px-6 bg-white"
        style={{ opacity: opacitySection1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AI Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We build intelligent systems that learn, adapt, and deliver value across your organization.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                variants={itemVariants}
              >
                <div className="bg-violet-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-violet-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
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
        className="py-24 px-6 bg-gray-50"
        style={{ opacity: opacitySection2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AI Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to creating intelligent solutions that deliver real business value.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-violet-200"></div>

            {/* Timeline Items */}
            {[
              { 
                title: "Discovery & Strategy", 
                description: "We analyze your business needs, data landscape, and opportunities for AI implementation.",
                delay: 0.1
              },
              { 
                title: "Solution Design", 
                description: "Our team designs a custom AI solution architecture tailored to your specific requirements.",
                delay: 0.3
              },
              { 
                title: "Development & Training", 
                description: "We develop and train AI models using your data, ensuring accuracy and performance.",
                delay: 0.5
              },
              { 
                title: "Integration & Testing", 
                description: "The AI solution is integrated with your existing systems and thoroughly tested.",
                delay: 0.7
              },
              { 
                title: "Deployment & Monitoring", 
                description: "We deploy your AI solution and establish continuous monitoring and improvement processes.",
                delay: 0.9
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className={`relative flex items-center justify-between mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: step.delay, duration: 0.6 }}
              >
                <div className="w-5/12"></div>
                
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-violet-600 border-4 border-white shadow z-10"></div>
                
                {/* Content Box */}
                <div className="w-5/12 bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-violet-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section 
        className="py-24 px-6 bg-white"
        style={{ opacity: opacitySection3 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI solutions have transformed businesses across industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={`${study.color} py-4 px-6`}>
                  <span className="text-sm font-semibold text-white/80">{study.industry}</span>
                  <h3 className="text-2xl font-bold text-white mt-1">{study.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="bg-violet-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-violet-900 mb-1">Results:</h4>
                    <p className="text-violet-700">{study.results}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-violet-900 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
              Let's discuss how our AI solutions can address your specific challenges and unlock new opportunities.
            </p>
            <Link href="/contact">
              <button className="bg-white text-violet-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-violet-100 transition-colors shadow-lg">
                Schedule a Consultation
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
