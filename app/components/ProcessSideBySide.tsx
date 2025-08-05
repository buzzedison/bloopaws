'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText, Cpu, Rocket, Users } from 'lucide-react'

export default function ProcessSideBySide() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeStep, setActiveStep] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const steps = [
    {
      id: 1,
      number: "01",
      title: "Strategic Foundation",
      description: "Business model validation, technical architecture planning, UX wireframing, and development roadmap creation.",
      icon: <FileText className="w-6 h-6" />,
      details: [
        "Business model validation",
        "Technical architecture planning",
        "User experience wireframing",
        "Development roadmap creation"
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Core Development",
      description: "MVP feature development, database & API construction, user interface implementation, and payment system integration.",
      icon: <Cpu className="w-6 h-6" />,
      details: [
        "MVP feature development",
        "Database & API construction",
        "User interface implementation",
        "Payment system integration"
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Launch Preparation",
      description: "Quality assurance testing, performance optimization, deployment & hosting setup, and launch strategy execution.",
      icon: <Rocket className="w-6 h-6" />,
      details: [
        "Quality assurance testing",
        "Performance optimization",
        "Deployment & hosting setup",
        "Launch strategy execution"
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Growth Partnership",
      description: "Performance monitoring, feature iteration based on user feedback, scaling infrastructure, and continuous optimization.",
      icon: <Users className="w-6 h-6" />,
      details: [
        "Performance monitoring",
        "Feature iteration based on user feedback",
        "Scaling infrastructure as you grow",
        "Continuous optimization"
      ]
    }
  ]
  
  // Reset user interaction status after 60 seconds of inactivity
  const resetUserInteraction = useCallback(() => {
    setUserInteracted(false)
  }, [])
  
  // Handle manual step change
  const handleStepChange = useCallback((index: number) => {
    setActiveStep(index)
    setUserInteracted(true)
    
    // Reset user interaction after 60 seconds
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current)
    }
    autoSlideTimerRef.current = setTimeout(resetUserInteraction, 60000)
  }, [resetUserInteraction])
  
  // Auto-slide functionality
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (!userInteracted && isInView) {
        setActiveStep(prevStep => (prevStep + 1) % steps.length)
      }
    }, 60000) // 60 seconds
    
    return () => {
      clearInterval(autoSlideInterval)
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current)
      }
    }
  }, [userInteracted, isInView, steps.length])
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-pink-50"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-red-100 opacity-50"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full border border-red-100 opacity-50"></div>
          <svg className="absolute -bottom-1 left-0 w-full text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" opacity="0.1"></path>
          </svg>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Our Process</h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-black">
            From idea to revenue in 12 weeks or less
          </p>
        </motion.div>
        
        {/* Side-by-side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Circle visualization on the left */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] h-[300px]">
              {/* Circle background with gradient */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 shadow-inner"></div>
              
              {/* Progress circle */}
              <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="#f8fafc" 
                  strokeWidth="1"
                />
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="1.5"
                  strokeDasharray="301.59"
                  strokeDashoffset="301.59"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 301.59 }}
                  animate={{ 
                    strokeDashoffset: 301.59 - ((activeStep + 1) / steps.length) * 301.59 
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </svg>
              
              {/* Step indicators */}
              {steps.map((step, idx) => {
                // Calculate position on circle
                const angle = (idx / steps.length) * Math.PI * 2 - Math.PI / 2; // Start from top
                const radius = 150; // Circle radius
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const isActive = idx === activeStep;
                
                return (
                  <motion.div
                    key={step.id}
                    className={`absolute transition-all duration-500 ${idx !== activeStep ? 'opacity-60 hover:opacity-100' : ''}`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer ${isActive ? 'bg-red-600 text-white' : 'bg-white text-black border border-pink-200 hover:border-red-200'}`}
                      onClick={() => handleStepChange(idx)}
                    >
                      <div className="text-sm font-bold">{step.number}</div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Center text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-gray-400 text-sm font-medium">STEP</div>
                <div className="text-red-600 text-2xl font-bold">{activeStep + 1} / {steps.length}</div>
              </div>
            </div>
          </div>
          
          {/* Step content on the right */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-content-${activeStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-6">
                      {steps[activeStep].icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-black">{steps[activeStep].title}</h3>
                    <p className="text-black mb-8">{steps[activeStep].description}</p>
                    
                    <motion.div className="space-y-4">
                      {steps[activeStep].details.map((detail, idx) => (
                        <motion.div 
                          key={`detail-${idx}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        >
                          <ArrowRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-1" />
                          <p className="text-black">{detail}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="md:col-span-2 bg-gradient-to-br from-red-600 to-red-700 p-6 flex items-center justify-center text-white">
                    <div>
                      <motion.div 
                        className="text-5xl font-bold mb-6 opacity-20 text-center"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 0.2, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {steps[activeStep].number}
                      </motion.div>
                      
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="text-lg font-bold">What you can expect:</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-sm font-medium mb-1">Timeline</div>
                          <div className="text-base font-bold">
                            {activeStep === 0 && "Weeks 1-2"}
                            {activeStep === 1 && "Weeks 3-8"}
                            {activeStep === 2 && "Weeks 9-12"}
                            {activeStep === 3 && "Ongoing"}
                          </div>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-sm font-medium mb-1">Deliverables</div>
                          <div className="text-base font-bold">
                            {activeStep === 0 && "Strategy & roadmap"}
                            {activeStep === 1 && "MVP & integrations"}
                            {activeStep === 2 && "Launch-ready product"}
                            {activeStep === 3 && "Ongoing growth support"}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Step navigation */}
            <div className="flex justify-between mt-6">
              <motion.button
                className={`px-4 py-2 rounded-lg ${activeStep === 0 ? 'bg-pink-100 text-black cursor-not-allowed' : 'bg-black text-white hover:bg-black/90 shadow-sm'}`}
                onClick={() => activeStep > 0 && handleStepChange(activeStep - 1)}
                disabled={activeStep === 0}
                whileHover={activeStep > 0 ? { y: -3 } : {}}
                whileTap={activeStep > 0 ? { y: 0 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Previous Step
              </motion.button>
              
              <motion.button
                className={`px-4 py-2 rounded-lg ${activeStep === steps.length - 1 ? 'bg-pink-100 text-black cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-sm'}`}
                onClick={() => activeStep < steps.length - 1 && handleStepChange(activeStep + 1)}
                disabled={activeStep === steps.length - 1}
                whileHover={activeStep < steps.length - 1 ? { y: -3 } : {}}
                whileTap={activeStep < steps.length - 1 ? { y: 0 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Next Step
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
