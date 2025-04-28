'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Bot, LineChart, GraduationCap } from 'lucide-react'

export default function ServicesInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])
  
  // Service data
  const services = [
    {
      id: 1,
      title: "Digital Product Dev",
      description: "MVPs, SaaS, e‑commerce & mobile—future‑proof from day one.",
      icon: <Code />,
      color: "from-red-500 to-red-600",
      textColor: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      highlightColor: "bg-red-500"
    },
    {
      id: 2,
      title: "AI Automations",
      description: "Chatbots, content engines, dashboards that save 100+ hrs/quarter.",
      icon: <Bot />,
      color: "from-violet-500 to-violet-600",
      textColor: "text-violet-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      highlightColor: "bg-violet-500"
    },
    {
      id: 3,
      title: "Strategy & Advisory",
      description: "GTM plans, pricing models, investor decks that raise capital.",
      icon: <LineChart />,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      highlightColor: "bg-amber-500"
    },
    {
      id: 4,
      title: "Training & Bloop Academy",
      description: "Live cohorts and custom workshops that turn teams into operators.",
      icon: <GraduationCap />,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      highlightColor: "bg-emerald-500"
    }
  ]
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
    }
  }
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.2,
        ease: [0.215, 0.61, 0.355, 1] 
      }
    }
  }
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity, y: backgroundY }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-red-50 to-red-100 rounded-full opacity-60 blur-3xl"></div>
          <div className="absolute top-[60%] -right-[5%] w-[40%] h-[40%] bg-gradient-to-br from-violet-50 to-violet-100 rounded-full opacity-60 blur-3xl"></div>
          <div className="absolute top-[80%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-amber-50 to-amber-100 rounded-full opacity-60 blur-3xl"></div>
        </div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 px-2 sm:px-0 inline-block leading-tight text-gray-900"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            We build growth engines, not just websites.
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={subtitleVariants}
          >
            Our integrated approach combines cutting-edge technology with strategic thinking.
          </motion.p>
        </div>
        
        {/* Innovative service cards layout */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Active service detail panel */}
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                className="relative z-20 mb-16 rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div className={`bg-gradient-to-r ${services[activeIndex].color} text-white p-8 md:p-12`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="bg-white/20 p-3 rounded-xl mr-4">
                          {React.cloneElement(services[activeIndex].icon, { className: "w-8 h-8" })}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">{services[activeIndex].title}</h3>
                      </div>
                      <p className="text-lg md:text-xl mb-8">{services[activeIndex].description}</p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-start">
                          <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span>Custom-built solutions tailored to your specific needs</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span>Rapid development with continuous iteration</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span>Seamless integration with your existing systems</span>
                        </li>
                      </ul>
                      <Link href={`/services/${services[activeIndex].title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <button className="bg-white text-black font-medium py-3 px-8 rounded-full hover:bg-white/90 transition-colors flex items-center">
                          Learn more
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="relative aspect-square max-w-md mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-[80%] h-[80%] rounded-full ${services[activeIndex].bgColor} opacity-30 animate-pulse`}></div>
                          <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold opacity-10">
                            {services[activeIndex].title.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  className="absolute top-6 right-6 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                  onClick={() => setActiveIndex(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  activeIndex === index 
                    ? `${service.borderColor} shadow-lg` 
                    : 'border-transparent hover:shadow-md'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Animated background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                
                {/* Card content */}
                <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
  <div className={`${service.bgColor} p-3 rounded-xl mr-4 group-hover:bg-white/20 transition-colors duration-300`}>
    {React.cloneElement(service.icon, { 
      className: `w-6 h-6 ${service.textColor} group-hover:text-white transition-colors duration-300` 
    })}
  </div>
  <h3 className={`text-xl font-bold ${service.textColor} group-hover:text-white transition-colors duration-300 flex-1`}>
    {service.title}
  </h3>
  <span className="flex items-center">
    <svg
      className={`w-6 h-6 transition-transform duration-300 ml-1 ${activeIndex === index ? 'rotate-90' : 'rotate-0'} ${activeIndex === index ? 'text-primary' : 'text-gray-500'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </span>
</div>
                  
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto flex items-center">
                    <span className={`text-sm font-medium ${service.textColor} group-hover:text-white transition-colors duration-300 flex items-center`}>
                      Explore
                      <motion.span
                        className="inline-block ml-1"
                        initial={{ x: 0 }}
                        animate={{ x: hoverIndex === index ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-transparent to-black/5 group-hover:from-transparent group-hover:to-white/10 transition-colors duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/services">
              <button className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-800 font-medium py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                <span className="relative z-10 flex items-center">
                  Explore All Services
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
