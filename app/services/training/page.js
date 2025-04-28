'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen, Users, ExternalLink, Award, Lightbulb, Rocket } from 'lucide-react';

export default function TrainingServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax and animation values
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  
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

  // Featured courses offered through Taskwit
  const featuredCourses = [
    {
      icon: <Rocket size={32} className="text-red-600" />,
      title: "AI for Business Growth",
      description: "Learn how to leverage AI technologies to drive business growth, automate processes, and gain competitive advantage.",
      duration: "6 weeks"
    },
    {
      icon: <Lightbulb size={32} className="text-red-600" />,
      title: "Digital Skills Training",
      description: "Master essential digital skills for the modern workplace, from data analysis to digital marketing fundamentals.",
      duration: "8 weeks"
    },
    {
      icon: <Users size={32} className="text-red-600" />,
      title: "Leadership in Tech",
      description: "Develop the leadership skills needed to guide teams through digital transformation and technological change.",
      duration: "4 weeks"
    },
    {
      icon: <Award size={32} className="text-red-600" />,
      title: "Product Management Essentials",
      description: "Learn the fundamentals of product management, from ideation to launch and beyond.",
      duration: "6 weeks"
    }
  ];

  // Training formats available
  const trainingFormats = [
    {
      title: "Self-Paced Online Courses",
      description: "Learn at your own pace with 24/7 access to course materials and exercises."
    },
    {
      title: "Live Virtual Workshops",
      description: "Interactive sessions led by industry experts with real-time feedback and Q&A."
    },
    {
      title: "Corporate Training",
      description: "Customized training programs designed specifically for your team's needs and objectives."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Animated Education Elements */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700">
        {/* Animated Education Background */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {/* Floating education icons */}
          {[
            { icon: <GraduationCap size={40} />, x: 20, y: 30, delay: 0 },
            { icon: <BookOpen size={40} />, x: 80, y: 20, delay: 1 },
            { icon: <Users size={40} />, x: 30, y: 70, delay: 2 },
            { icon: <Lightbulb size={40} />, x: 70, y: 60, delay: 3 },
            { icon: <Award size={40} />, x: 50, y: 40, delay: 4 },
          ].map((item, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-white text-opacity-30"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%` 
              }}
              animate={{
                y: ['-10px', '10px', '-10px'],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item.icon}
            </motion.div>
          ))}
          
          {/* Connection lines */}
          {[...Array(8)].map((_, i) => {
            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 80 + 10;
            const endX = startX + (Math.random() * 30 - 15);
            const endY = startY + (Math.random() * 30 - 15);
            
            return (
              <motion.div
                key={`line-${i}`}
                className="absolute bg-white opacity-10"
                style={{
                  height: '1px',
                  width: '100px',
                  left: `${startX}%`,
                  top: `${startY}%`,
                  transformOrigin: 'left center',
                  transform: `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`
                }}
                animate={{
                  opacity: [0.05, 0.2, 0.05],
                  scaleX: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
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
              Transform Your Skills with <br className="hidden md:block" />
              <span className="text-red-300">Taskwit</span>
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Elevate your career with our industry-leading training programs designed to 
              help you master the skills needed in today's digital economy.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a href="https://taskwt.co" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="bg-white text-red-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-100 transition-colors shadow-lg w-full flex items-center justify-center">
                  <span>Visit Taskwit</span>
                  <ExternalLink size={18} className="ml-2" />
                </button>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white/10 transition-colors w-full">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our most popular courses available through Taskwit, our dedicated training platform.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredCourses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 h-full flex flex-col"
                variants={itemVariants}
              >
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full mt-1">
                      {course.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="mt-auto">
                  <a 
                    href="https://taskwt.co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-700 font-medium hover:text-red-800 transition-colors"
                  >
                    Learn more
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Formats */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Training Formats</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer flexible learning options to fit your schedule and learning style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingFormats.map((format, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md overflow-hidden h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{format.title}</h3>
                <p className="text-gray-600">{format.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-900 to-red-800 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Skills?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Visit Taskwit to explore our full catalog of courses and training programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="https://taskwt.co" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="bg-white text-red-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-100 transition-colors shadow-lg w-full flex items-center justify-center">
                  <span>Visit Taskwit</span>
                  <ExternalLink size={18} className="ml-2" />
                </button>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white/10 transition-colors w-full">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
