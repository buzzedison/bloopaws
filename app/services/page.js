"use client"

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Bot, LineChart, GraduationCap } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Digital Product Dev",
    description: "From concept to launch, we build MVPs, robust SaaS platforms, engaging e-commerce experiences, and intuitive mobile apps. Our solutions are scalable, secure, and designed for future growth.",
    details: [
      "Rapid MVP development & validation",
      "Scalable SaaS & E-commerce platforms",
      "Intuitive cross-platform mobile apps",
      "Future-proof architecture & design"
    ],
    icon: <Code size={28} className="text-red-600" />,
    bgColor: "bg-red-100/60", 
    textColor: "text-red-950", 
    accentColor: "text-red-600",
    primaryColor: "#ef4444", // Red
    secondaryColor: "#fee2e2", // Light red
    link: "/services/web"
  },
  {
    id: 2,
    title: "AI Automations",
    description: "Leverage the power of AI to streamline operations and unlock new efficiencies. We build custom AI chatbots, content generation engines, intelligent dashboards, and automated workflows.",
    details: [
      "Intelligent chatbots & customer support AI",
      "Automated content & marketing workflows",
      "Data-driven dashboards & predictive insights",
      "Custom AI models tailored to your business"
    ],
    icon: <Bot size={28} className="text-violet-600" />,
    bgColor: "bg-violet-100/60", 
    textColor: "text-violet-950",
    accentColor: "text-violet-600",
    primaryColor: "#8b5cf6", // Violet
    secondaryColor: "#ede9fe", // Light violet
    link: "/services/ai"
  },
  {
    id: 3,
    title: "Strategy & Advisory",
    description: "Navigate the complexities of growth with expert guidance. We help startups define go-to-market strategies, craft compelling pricing models, develop investor-ready decks, and secure funding.",
    details: [
      "Data-backed go-to-market strategies",
      "Effective pricing & monetization models",
      "Investor deck creation & pitch coaching",
      "Fractional leadership & strategic advisory"
    ],
    icon: <LineChart size={28} className="text-amber-600" />,
    bgColor: "bg-amber-100/60", 
    textColor: "text-amber-950",
    accentColor: "text-amber-600",
    primaryColor: "#d97706", // Amber
    secondaryColor: "#fef3c7", // Light amber
    link: "/services/strategy"
  },
  {
    id: 4,
    title: "Training & Bloop Academy",
    description: "Empower your team with the skills they need to excel. We offer live cohorts, custom corporate workshops, and online courses through Bloop Academy, transforming teams into high-performing operators.",
    details: [
      "Hands-on training cohorts & workshops",
      "Customized corporate training programs",
      "Comprehensive online courses (Bloop Academy)",
      "Building internal capabilities & skills"
    ],
    icon: <GraduationCap size={28} className="text-red-600" />, 
    bgColor: "bg-red-100/60", 
    textColor: "text-red-950", 
    accentColor: "text-red-600",
    primaryColor: "#ef4444", // Red
    secondaryColor: "#fee2e2", // Light red
    link: "/services/training"
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
        
      case 2: // Strategy & Advisory - Charts and growth patterns
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
        
      case 3: // Training & Academy - Learning and growth
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
      className={`relative py-32 md:py-48 min-h-[110vh] overflow-hidden`}
    >
      {/* Dynamic Background Composition */}
      <div className="absolute inset-0 overflow-hidden">
        {renderBackgroundShapes()}
      </div>

      {/* Content Overlay - Sticky positioned, asymmetric alignment */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full">
        <div className={`flex items-start h-full ${alignmentClass}`}>
          <motion.div 
            className={`sticky ${stickyTopClass} md:w-1/2 ${textWidthClass} p-8 md:p-10 rounded-xl shadow-xl backdrop-blur-lg bg-white/90`}
            style={{ 
              opacity: textOpacity, 
              y: textY,
              rotate: textRotate
            }}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="inline-flex items-center space-x-3 mb-6" variants={itemVariants}> 
              <span className={`p-3 rounded-full ${service.bgColor}`}>{service.icon}</span> 
              <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight ${service.textColor}`}>{service.title}</h2>
            </motion.div>
            <motion.p className="text-base lg:text-lg text-gray-700 mb-7 leading-relaxed" variants={itemVariants}> 
              {service.description}
            </motion.p>
            <ul className="space-y-3 mb-9 text-gray-600 text-sm lg:text-base"> 
              {service.details.map((detail, i) => (
                <motion.li key={i} className="flex items-start" variants={itemVariants}>
                  <svg className={`w-5 h-5 ${service.accentColor} mr-3 mt-[0.1rem] flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div variants={itemVariants}>
              {/* Updated Button Style - assuming a primary style exists */} 
              <Link href={service.link}>
                <button className={`group inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-semibold transition-all duration-300 ease-in-out 
                                   ${service.accentColor.replace('text-', 'bg-')} text-white 
                                   hover:opacity-90 hover:shadow-md 
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 ${service.accentColor.replace('text-', 'focus:ring-')}
                                   `}> 
                  Learn More 
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
      <div ref={heroRef} className="relative h-[80vh] md:h-[90vh]"> 
        <motion.div 
          className="sticky top-0 h-full flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-gray-50 to-red-100/50" 
        >
          <motion.div 
            className="absolute inset-0 z-0 opacity-10"
            style={{ 
              y: patternY, 
              opacity: patternOpacity, // Apply fade out
              backgroundImage: 'url(/images/patterns/hero-subtle-waves.svg)', // Ensure pattern is applied
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto 400px' // Adjust size if needed
            }}
          />
          
          <motion.div 
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tighter" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              Fueling Growth, <span className="text-red-600">Building Futures</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              Explore our comprehensive suite of services designed to accelerate your startup's journey from idea to impact.
            </motion.p>
            <motion.div
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            >
              <Link href="/contact">
                  <button className="bg-red-600 text-white font-semibold py-3.5 px-9 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"> 
                      Get Started Today
                  </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections now stack directly */}
      <div className="relative z-[5]"> 
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>

      <section className="relative py-24 md:py-32 bg-gradient-to-br from-red-600 to-red-800 text-white overflow-hidden"> 
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 -translate-y-1/3 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 filter blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10"> 
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Vision into Reality?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-10 text-red-100 max-w-2xl mx-auto" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partner with Bloop Global and let's build something extraordinary together. We're excited to hear about your project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact">
                <button className="bg-white text-red-700 font-bold py-4 px-10 rounded-full hover:bg-red-50 transition-all duration-300 shadow-xl text-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"> 
                    Discuss Your Project
                </button>
            </Link>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
