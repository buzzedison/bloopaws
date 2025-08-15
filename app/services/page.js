"use client"

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Bot, LineChart, GraduationCap, DollarSign, Smartphone, Target, Zap, Users } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Finding Funding: Getting the \"Yes\"",
    problem: "Pitch decks are a nightmare. You've got one shot to convince investors, and you're not sure what they actually want to see.",
    approach: "We don't just pretty up your slides. We help you build a bulletproof business case and a compelling story. We've been on both sides of the table, so we know what works.",
    deliverables: [
      "Pitch Deck Strategy & Design",
      "Financial Modeling",
      "Investor Targeting",
      "Pitch Coaching"
    ],
    icon: <DollarSign size={28} className="text-red-600" />,
    bgColor: "bg-red-100/60", 
    textColor: "text-red-950", 
    accentColor: "text-red-600",
    primaryColor: "#ef4444", // Red
    secondaryColor: "#fee2e2", // Light red
    link: "/services/funding"
  },
  {
    id: 2,
    title: "Web & App Builds: Building Something People Love (and Use)",
    problem: "Tech can feel like a black box. You need more than just a website; you need a platform that converts, a product that works, and an experience that keeps users coming back.",
    approach: "We build with your business goals in mind. Every line of code, every pixel, and every user flow is designed to get a result—whether that's a sale, a signup, or a subscription.",
    deliverables: [
      "MVP Development",
      "Full-Stack Web & App Builds",
      "UI/UX Design",
      "Conversion Rate Optimization"
    ],
    icon: <Smartphone size={28} className="text-violet-600" />,
    bgColor: "bg-violet-100/60", 
    textColor: "text-violet-950",
    accentColor: "text-violet-600",
    primaryColor: "#8b5cf6", // Violet
    secondaryColor: "#ede9fe", // Light violet
    link: "/services/web"
  },
  {
    id: 3,
    title: "AI & Automation: Put Your Business on Autopilot",
    problem: "Your to-do list is endless. Repetitive, manual tasks are eating up the hours you should be spending on growth. You hear about AI everywhere, but it feels like a complicated, expensive world you don't have time to enter.",
    approach: "We skip the hype. Our goal is simple: find the parts of your business that are slowing you down and automate them. We integrate smart AI tools and build custom workflows that handle the grunt work—from qualifying leads to answering customer queries. It's about freeing up your best people (especially you) to do their best work.",
    deliverables: [
      "Custom Workflow Automation",
      "AI-Powered Chatbots",
      "Automated Lead Nurturing",
      "Smart Internal Tools & Dashboards"
    ],
    icon: <Zap size={28} className="text-amber-600" />,
    bgColor: "bg-amber-100/60", 
    textColor: "text-amber-950",
    accentColor: "text-amber-600",
    primaryColor: "#d97706", // Amber
    secondaryColor: "#fef3c7", // Light amber
    link: "/services/ai"
  },
  {
    id: 4,
    title: "Market Strategy: Finding Your People",
    problem: "You built something amazing, but nobody knows it exists. Shouting into the void of social media isn't a strategy.",
    approach: "We skip the fluff and find the most direct path to your ideal customers. We use data to understand who they are, where they hang out, and what they want to hear.",
    deliverables: [
      "Market Research",
      "Go-to-Market Strategy",
      "Customer Persona Development",
      "Digital Marketing Roadmaps"
    ],
    icon: <Target size={28} className="text-purple-600" />,
    bgColor: "bg-purple-100/60", 
    textColor: "text-purple-950",
    accentColor: "text-purple-600",
    primaryColor: "#9333ea", // Purple
    secondaryColor: "#f3e8ff", // Light purple
    link: "/services/strategy"
  },
  {
    id: 5,
    title: "TaskWit Training: Build a Rockstar Crew",
    problem: "Your team is smart and capable, but they need the right tools and processes to truly crush it. Boring lectures just won't cut it.",
    approach: "We got so obsessed with making teams work smarter that we built a dedicated training arm to teach our methods. That's TaskWit. It's our system for hands-on, real-world workshops that actually stick, delivered with the same practical, no-fluff approach we apply to everything we do.",
    deliverables: [
      "Agile & Scrum bootcamps",
      "Sales process workshops", 
      "Digital marketing training",
      "Custom team effectiveness programs"
    ],
    icon: <Users size={28} className="text-red-600" />, 
    bgColor: "bg-red-100/60", 
    textColor: "text-red-950", 
    accentColor: "text-red-600",
    primaryColor: "#ef4444", // Red
    secondaryColor: "#fee2e2", // Light red
    link: "https://www.taskwit.co",
    isExternal: true
  }
 ];

// --- Dynamic Animated Background Service Section --- 
const ServiceSection = ({ service, index }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ['start end', 'end start'] 
  });

  // Animation values for background elements
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const shapeScale1 = useTransform(scrollYProgress, [0, 1], [0.6, 1.4]);
  const shapeScale2 = useTransform(scrollYProgress, [0, 1], [1.2, 0.8]);
  const shapeRotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const shapeRotate2 = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const shapeX1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const shapeX2 = useTransform(scrollYProgress, [0, 1], ['10%', '-15%']);
  const shapeY1 = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);
  const shapeY2 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  
  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], ['40px', '0px']);
  const textRotate = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [-1, 1] : [1, -1]);

  // Stagger children animation config
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  // Determine text alignment and sticky top position based on index for variety
  const alignmentClass = ['justify-start', 'justify-end', 'justify-center', 'justify-end'][index % 4];
  const stickyTopClass = ['top-28', 'top-36', 'top-24', 'top-32'][index % 4];
  const textWidthClass = ['lg:w-2/5', 'lg:w-[45%]', 'lg:w-2/5', 'lg:w-[42%]'][index % 4];
  
  // Generate unique background patterns based on service type
  const renderBackgroundShapes = () => {
    // Each service gets a unique background composition
    switch(index % 4) {
      case 0: // Digital Product Dev - Interconnected grid/nodes
        return (
          <>
            {/* Gradient background - softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-red-50/30"></div>
            
            {/* Large circle - reduced opacity */}
            <motion.div 
              className="absolute right-[10%] top-1/4 w-[40vw] h-[40vw] rounded-full opacity-10"
              style={{ 
                background: `radial-gradient(circle at 30% 40%, ${service.secondaryColor}80, ${service.primaryColor}40)`,
                scale: shapeScale1,
                x: shapeX1,
                y: shapeY1,
                opacity: bgOpacity
              }}
            />
            
            {/* Grid pattern - simulating connected nodes - more subtle */}
            <motion.div 
              className="absolute inset-0 opacity-5"
              style={{ 
                opacity: bgOpacity,
                backgroundImage: `
                  linear-gradient(${service.primaryColor}10 1px, transparent 1px),
                  linear-gradient(90deg, ${service.primaryColor}10 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                y: shapeY2
              }}
            />
            
            {/* Floating squares - reduced opacity */}
            <motion.div 
              className="absolute left-[15%] bottom-[20%] w-[15vw] h-[15vw] rounded-lg opacity-15"
              style={{ 
                backgroundColor: `${service.primaryColor}80`,
                rotate: shapeRotate1,
                scale: shapeScale2,
                opacity: bgOpacity
              }}
            />
            
            <motion.div 
              className="absolute left-[60%] top-[60%] w-[8vw] h-[8vw] rounded-lg opacity-10"
              style={{ 
                backgroundColor: `${service.primaryColor}70`,
                rotate: shapeRotate2,
                scale: shapeScale1,
                opacity: bgOpacity
              }}
            />
          </>
        );
        
      case 1: // AI Automations - Neural network inspired
        return (
          <>
            {/* Gradient background - softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-violet-50/30"></div>
            
            {/* Neural network nodes - circles connected by lines - more subtle */}
            <motion.div 
              className="absolute left-[10%] top-[20%] w-[35vw] h-[35vw] rounded-full opacity-10"
              style={{ 
                background: `radial-gradient(circle at 70% 30%, ${service.secondaryColor}70, ${service.primaryColor}40)`,
                scale: shapeScale2,
                x: shapeX2,
                opacity: bgOpacity
              }}
            />
            
            {/* Pulsing small circles - like data nodes - reduced opacity */}
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                className="absolute rounded-full opacity-15"
                style={{ 
                  backgroundColor: `${service.primaryColor}90`,
                  width: `${i * 3 + 10}px`,
                  height: `${i * 3 + 10}px`,
                  left: `${i * 15 + 20}%`,
                  top: `${(i * 10 + 30) % 80}%`,
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]),
                  opacity: bgOpacity
                }}
              />
            ))}
            
            {/* Hexagonal grid - tech/data structure feel */}
            <motion.div 
              className="absolute right-[20%] bottom-[30%] w-[25vw] h-[25vw] opacity-20"
              style={{ 
                backgroundImage: `radial-gradient(${service.primaryColor}30 15%, transparent 16%)`,
                backgroundSize: '30px 30px',
                rotate: shapeRotate1,
                y: shapeY1,
                opacity: bgOpacity
              }}
            />
          </>
        );
        
      case 2: // AI & Automation - Neural network inspired
        return (
          <>
            {/* Gradient background - softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-amber-50/30"></div>
            
            {/* Upward trending line - like a growth chart */}
            <motion.div 
              className="absolute left-[10%] bottom-[20%] w-[70%] h-[2px] origin-left"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${service.primaryColor})`,
                rotate: useTransform(scrollYProgress, [0, 1], [20, 35]),
                scaleX: useTransform(scrollYProgress, [0, 1], [0.7, 1.3]),
                opacity: bgOpacity
              }}
            />
            
            {/* Chart dots along the line */}
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                className="absolute rounded-full"
                style={{ 
                  backgroundColor: service.primaryColor,
                  width: i === 5 ? '12px' : '8px',
                  height: i === 5 ? '12px' : '8px',
                  left: `${i * 15}%`,
                  bottom: `${20 + i * 3}%`,
                  opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.2]),
                }}
              />
            ))}
            
            {/* Large strategic shape - more subtle */}
            <motion.div 
              className="absolute right-[20%] top-[25%] w-[30vw] h-[30vw] opacity-10"
              style={{ 
                background: `radial-gradient(circle at 40% 40%, ${service.secondaryColor}60, ${service.primaryColor}30)`,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Blob shape
                scale: shapeScale1,
                rotate: shapeRotate2,
                opacity: bgOpacity
              }}
            />
            
            {/* Dotted grid - planning/structure */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              style={{ 
                backgroundImage: `radial-gradient(${service.primaryColor}40 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
                y: shapeY2,
                opacity: bgOpacity
              }}
            />
          </>
        );
        
      case 3: // Market Strategy - Charts and growth patterns
        return (
          <>
            {/* Gradient background - softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-green-50/30"></div>
            
            {/* Target/bullseye pattern */}
            <motion.div 
              className="absolute left-[10%] top-[20%] w-[35vw] h-[35vw] rounded-full opacity-10"
              style={{ 
                background: `radial-gradient(circle at 50% 50%, transparent 30%, ${service.primaryColor}40 32%, transparent 34%, transparent 50%, ${service.primaryColor}30 52%, transparent 54%)`,
                scale: shapeScale2,
                x: shapeX2,
                opacity: bgOpacity
              }}
            />
            
            {/* Customer journey dots */}
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                className="absolute rounded-full opacity-15"
                style={{ 
                  backgroundColor: `${service.primaryColor}90`,
                  width: `${i * 2 + 8}px`,
                  height: `${i * 2 + 8}px`,
                  left: `${i * 12 + 25}%`,
                  top: `${(i * 8 + 40) % 70}%`,
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]),
                  opacity: bgOpacity
                }}
              />
            ))}
            
            {/* Strategic shape */}
            <motion.div 
              className="absolute right-[20%] bottom-[25%] w-[25vw] h-[25vw] opacity-10"
              style={{ 
                background: `radial-gradient(circle at 40% 40%, ${service.secondaryColor}60, ${service.primaryColor}30)`,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                scale: shapeScale1,
                rotate: shapeRotate2,
                opacity: bgOpacity
              }}
            />
          </>
        );
        
      case 4: // Training & Academy - Learning and growth
        return (
          <>
            {/* Gradient background - softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-red-50/30"></div>
            
            {/* Stacked layers - like books or courses - more subtle */}
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                className="absolute rounded-lg opacity-10"
                style={{ 
                  backgroundColor: `${service.primaryColor}70`,
                  width: '35vw',
                  height: '4vw',
                  left: '15%',
                  top: `${30 + i * 8}%`,
                  y: useTransform(scrollYProgress, [0, 1], [i * 20, i * -20]),
                  opacity: bgOpacity
                }}
              />
            ))}
            
            {/* Circular progress - learning journey */}
            <motion.div 
              className="absolute right-[25%] top-[20%] w-[25vw] h-[25vw] rounded-full opacity-10"
              style={{ 
                border: `15px solid ${service.primaryColor}`,
                borderRightColor: 'transparent',
                rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
                scale: shapeScale2,
                opacity: bgOpacity
              }}
            />
            
            {/* Graduation cap icon - large and more subtle */}
            <motion.div 
              className="absolute right-[20%] bottom-[25%] opacity-10"
              style={{ 
                scale: shapeScale1,
                rotate: shapeRotate1,
                opacity: bgOpacity
              }}
            >
              <GraduationCap size={150} color={service.primaryColor} opacity={0.15} />
            </motion.div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-red-100/40 to-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-red-100/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-50/20 to-pink-50/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Service card */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-200/50 overflow-hidden group hover:shadow-red-200/50 transition-all duration-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -10 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* Icon side - enhanced */}
            <div className={`lg:col-span-5 relative flex items-center justify-center p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-100 opacity-50"></div>
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              >
                {/* Main icon container */}
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-white to-pink-50 rounded-full flex items-center justify-center shadow-2xl border border-pink-200/30">
                    <div className="w-64 h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-inner">
                      <div className="text-white scale-[4] drop-shadow-lg">
                        {React.cloneElement(service.icon, { className: "text-white" })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements around icon */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2
                    const radius = 180 + (i % 3) * 20
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    
                    return (
                      <motion.div
                        key={`element-${i}`}
                        className="absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          translateX: "-50%",
                          translateY: "-50%",
                          x,
                          y
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ 
                          opacity: 0.6, 
                          scale: 1,
                        }}
                        viewport={{ once: true }}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          opacity: { delay: 0.8 + (i * 0.1), duration: 0.6, ease: "easeOut" },
                          scale: { delay: 0.8 + (i * 0.1), duration: 0.6, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 2 },
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${i % 3 === 0 ? 'bg-white' : i % 3 === 1 ? 'bg-pink-200' : 'bg-pink-100'} shadow-lg`}></div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Content side - enhanced */}
            <div className={`lg:col-span-7 p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <motion.div 
                className="space-y-8"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Service number */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white text-2xl font-bold rounded-2xl shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>
                
                {/* Title */}
                <motion.div className="mb-8" variants={itemVariants}> 
                  <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-black leading-tight">
                    {service.title}
                  </h2>
                </motion.div>
                
                {/* Problem section */}
                <motion.div className="mb-8 p-6 bg-red-50 rounded-2xl border-l-4 border-red-500" variants={itemVariants}>
                  <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    The Problem
                  </h3>
                  <p className="text-lg text-black leading-relaxed">{service.problem}</p>
                </motion.div>
                
                {/* Approach section */}
                <motion.div className="mb-8 p-6 bg-pink-50 rounded-2xl border-l-4 border-pink-500" variants={itemVariants}>
                  <h3 className="text-xl font-bold text-pink-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    Our Approach
                  </h3>
                  <p className="text-lg text-black leading-relaxed">{service.approach}</p>
                </motion.div>
                
                {/* Deliverables section */}
                <motion.div className="mb-10 p-6 bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl" variants={itemVariants}>
                  <h3 className="text-xl font-bold text-black mb-6 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    What You Get
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    {service.deliverables.map((deliverable, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-black font-medium">{deliverable}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  {service.isExternal ? (
                    <a href={service.link} target="_blank" rel="noopener noreferrer">
                      <motion.button 
                        className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      > 
                        <span className="relative z-10 flex items-center text-lg">
                          {service.id === 5 ? 'Explore Courses on Taskwit.co' : 'Learn More'}
                          <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-black"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </motion.button>
                    </a>
                  ) : (
                    <Link href={service.link}>
                      <motion.button 
                        className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      > 
                        <span className="relative z-10 flex items-center text-lg">
                          Learn More 
                          <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-black"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({ 
    target: heroRef, 
    offset: ['start start', 'end start'] // Track scroll from top of hero to bottom of hero starting point
  });

  // Parallax effect for the hero background pattern
  const patternY = useTransform(heroScrollYProgress, [0, 1], ['0%', '40%']); // Increase parallax effect
  const patternOpacity = useTransform(heroScrollYProgress, [0, 0.5], [0.15, 0]); // Fade out quicker

  return (
    <div className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden"> 
      {/* Hero Section - Matching homepage style */}
      <div ref={heroRef} className="relative min-h-[90vh] bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden"> 
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-30 blur-lg"></div>
          <div className="absolute top-1/2 left-10 w-2 h-48 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12"></div>
          <div className="absolute top-1/3 right-10 w-2 h-32 bg-gradient-to-b from-pink-200 to-transparent transform rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[90vh]">
          <div className="text-center max-w-5xl">
            <motion.h1 
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-black mb-6 leading-tight tracking-tight" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              We handle the <span className="text-red-600">hard parts.</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-black max-w-4xl mx-auto mb-12 leading-relaxed" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              You've got the vision. We've got the toolkit to build it. We plug in where you need us most, from getting that first check to putting your operations on autopilot.
            </motion.p>
            <motion.div
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            >
              <Link href="/contact">
                <motion.button 
                  className="group relative overflow-hidden bg-red-600 text-white font-medium py-4 px-8 rounded-full shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Today
                    <motion.span
                      className="inline-block ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sections now stack directly */}
      <div className="relative z-[5]"> 
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Final CTA Section - Matching homepage style */}
      <section className="py-24 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-10 w-2 h-48 bg-gradient-to-b from-white/20 to-transparent transform -rotate-12"></div>
          <div className="absolute top-1/3 right-10 w-2 h-32 bg-gradient-to-b from-white/10 to-transparent transform rotate-12"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to make it{" "}
            <span className="text-white">real?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Enough thinking, more doing. Let's talk about that idea of yours.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/contact">
              <button className="group relative overflow-hidden bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
                <span className="relative z-10 flex items-center">
                  Let's Chat
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-sm opacity-70 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Or email us at{" "}
            <a href="mailto:ask@bloopglobal.com" className="underline hover:no-underline font-medium">
              ask@bloopglobal.com
            </a>{" "}
            with your project details
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
