'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Smartphone, ShoppingCart, Layers, Database, Globe, Palette } from 'lucide-react';

export default function WebDevServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax and animation values
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const opacitySection1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const digitalProducts = [
    {
      icon: <Globe size={32} className="text-red-600" />,
      title: "Web Applications",
      description: "Custom web applications that solve complex business problems with intuitive user experiences.",
      features: [
        "Responsive design for all devices",
        "Progressive Web App capabilities",
        "High-performance architecture",
        "Scalable cloud infrastructure"
      ]
    },
    {
      icon: <ShoppingCart size={32} className="text-red-600" />,
      title: "E-commerce Platforms",
      description: "High-converting online stores with seamless checkout experiences and robust backend systems.",
      features: [
        "Custom shopping experiences",
        "Secure payment processing",
        "Inventory management",
        "Analytics and reporting"
      ]
    },
    {
      icon: <Smartphone size={32} className="text-red-600" />,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences on any device.",
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "Offline functionality",
        "Push notifications"
      ]
    },
    {
      icon: <Layers size={32} className="text-red-600" />,
      title: "SaaS Products",
      description: "Scalable software-as-a-service solutions that grow with your business and delight your customers.",
      features: [
        "Multi-tenant architecture",
        "Subscription management",
        "User onboarding flows",
        "Feature permission controls"
      ]
    },
    {
      icon: <Database size={32} className="text-red-600" />,
      title: "Custom Backends",
      description: "Robust backend systems that power your applications with security, reliability, and performance.",
      features: [
        "API development",
        "Database architecture",
        "Authentication systems",
        "Microservices implementation"
      ]
    },
    {
      icon: <Palette size={32} className="text-red-600" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that enhance user satisfaction and drive engagement with your product.",
      features: [
        "User research & testing",
        "Wireframing & prototyping",
        "Visual design systems",
        "Interaction design"
      ]
    }
  ];

  const techStacks = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'Django', category: 'Backend' },
    { name: 'Laravel', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'Firebase', category: 'Database' },
    { name: 'AWS', category: 'Infrastructure' },
    { name: 'Google Cloud', category: 'Infrastructure' },
    { name: 'Azure', category: 'Infrastructure' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'CI/CD', category: 'DevOps' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Animated Code Elements */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700">
        {/* Animated Code Background */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {/* Code lines */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute left-0 right-0 h-6 bg-white opacity-10 overflow-hidden whitespace-nowrap"
              style={{ top: `${i * 5}%` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: Math.random() * 15 + 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.2
              }}
            >
              <div className="font-mono text-xs">
                {`${"<"}div className="${Math.random().toString(36).substring(2, 15)}"${">"}${Math.random().toString(36).substring(2, 15)}${"</"}div${">"}`.repeat(10)}
              </div>
            </motion.div>
          ))}
          
          {/* Floating elements */}
          {['<div>', '</div>', '<span>', '{...}', '()', '=>', 'const', 'function', 'return', 'import'].map((el, i) => (
            <motion.div
              key={`el-${i}`}
              className="absolute font-mono text-white text-opacity-20 text-lg"
              style={{ 
                left: `${Math.random() * 80 + 10}%`, 
                top: `${Math.random() * 80 + 10}%` 
              }}
              animate={{
                y: [Math.random() * 30 - 15, Math.random() * 30 - 15],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {el}
            </motion.div>
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
              Transforming Ideas into <br className="hidden md:block" />
              <span className="text-red-300">Digital Experiences</span>
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              We build innovative digital products that solve real problems, delight users,
              and drive business growth in today's competitive landscape.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/contact">
                <button className="bg-white text-red-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-100 transition-colors shadow-lg">
                  Start Your Project
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Digital Products Grid */}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Digital Products We Build</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to launch, we create digital products that solve problems and deliver exceptional experiences.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {digitalProducts.map((product, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                variants={itemVariants}
              >
                <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Development Process */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers exceptional results on time and within budget.
            </p>
          </motion.div>

          <div className="relative py-8">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-200 transform -translate-x-1/2"></div>
            
            {[
              {
                number: "01",
                title: "Discovery & Planning",
                description: "We dive deep into your business goals, user needs, and technical requirements to create a comprehensive project plan.",
                align: "right"
              },
              {
                number: "02",
                title: "Design & Prototyping",
                description: "Our designers create intuitive interfaces and user flows, iterating based on your feedback until we have the perfect design.",
                align: "left"
              },
              {
                number: "03",
                title: "Development & Testing",
                description: "Our engineers build your product using modern technologies and best practices, with rigorous testing at every step.",
                align: "right"
              },
              {
                number: "04",
                title: "Launch & Support",
                description: "We deploy your product and provide ongoing support to ensure it continues to perform flawlessly.",
                align: "left"
              }
            ].map((step, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                <div className={`md:w-1/2 ${step.align === 'left' ? 'md:ml-auto' : ''}`}>
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-md relative"
                    initial={{ opacity: 0, x: step.align === 'left' ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Number indicator */}
                    <div className="absolute top-6 md:top-1/2 md:transform md:-translate-y-1/2 md:w-12 md:h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl
                      ${step.align === 'left' ? 'left-0 md:-left-6' : 'right-0 md:-right-6'}
                    ">
                      {step.number}
                    </div>
                    
                    <div className="md:px-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use modern, battle-tested technologies to build robust, scalable digital products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { category: "Frontend", color: "bg-red-600" },
              { category: "Backend", color: "bg-red-700" },
              { category: "Database", color: "bg-red-800" },
              { category: "Infrastructure", color: "bg-red-900" }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={`${category.color} py-3 px-4`}>
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {techStacks
                      .filter(tech => tech.category === category.category)
                      .map((tech, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">{tech.name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-900 to-red-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Digital Product?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Let's discuss how we can help you transform your idea into a successful digital product.
            </p>
            <Link href="/contact">
              <button className="bg-white text-red-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-100 transition-colors shadow-lg">
                Start Your Project
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
