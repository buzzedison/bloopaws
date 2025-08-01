'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText, Cpu, Rocket, Users } from 'lucide-react'

export default function ProcessUnique() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeStep, setActiveStep] = useState(0)
  
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and project requirements to create a strategic roadmap.",
      icon: <FileText className="w-6 h-6" />,
      details: [
        "Stakeholder interviews",
        "Requirements gathering",
        "Strategic planning",
        "Project roadmap creation"
      ]
    },
    {
      id: 2,
      number: "02",
      title: "Design & Prototyping",
      description: "Our design team creates intuitive user experiences and visually appealing interfaces that align with your brand.",
      icon: <Users className="w-6 h-6" />,
      details: [
        "UX/UI design",
        "Interactive prototyping",
        "User testing",
        "Design iteration"
      ]
    },
    {
      id: 3,
      number: "03",
      title: "Development & Testing",
      description: "Our engineers build your solution using modern technologies, with rigorous testing throughout the process.",
      icon: <Cpu className="w-6 h-6" />,
      details: [
        "Agile development",
        "Quality assurance",
        "Performance optimization",
        "Security testing"
      ]
    },
    {
      id: 4,
      number: "04",
      title: "Launch & Growth",
      description: "We deploy your solution and provide ongoing support to ensure continued success and growth.",
      icon: <Rocket className="w-6 h-6" />,
      details: [
        "Deployment",
        "User onboarding",
        "Analytics setup",
        "Continuous improvement"
      ]
    }
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-dashed border-red-200 opacity-50"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full border-2 border-dashed border-red-200 opacity-50"></div>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Process</h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            A streamlined approach that delivers results efficiently and effectively
          </p>
        </motion.div>
        
        {/* Circular process visualization */}
        <div className="relative mb-20">
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-gray-200"></div>
          
          {steps.map((step, idx) => {
            // Calculate position on circle
            const angle = (idx / steps.length) * Math.PI * 2 - Math.PI / 2; // Start from top
            const radius = 200; // Circle radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={`step-circle-${step.id}`}
                className={`hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[${x}px] translate-y-[${y}px] w-16 h-16 rounded-full ${activeStep === idx ? 'bg-red-600 text-white' : 'bg-white text-gray-900'} shadow-lg items-center justify-center cursor-pointer z-20`}
                style={{ 
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  boxShadow: activeStep === idx ? '0 10px 25px -5px rgba(239, 68, 68, 0.4)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setActiveStep(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <span className="text-xl font-bold">{step.number.split('0')[1]}</span>
              </motion.div>
            )
          })}
          
          {/* Center logo or icon */}
          <motion.div 
            className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-xl items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-red-600 font-bold text-lg">BLOOP</div>
          </motion.div>
          
          {/* Mobile step indicators */}
          <div className="flex md:hidden justify-center space-x-2 mb-8">
            {steps.map((_, idx) => (
              <motion.button
                key={`mobile-indicator-${idx}`}
                className={`w-3 h-3 rounded-full ${idx === activeStep ? 'bg-red-600' : 'bg-gray-300'}`}
                onClick={() => setActiveStep(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              />
            ))}
          </div>
        </div>
        
        {/* Step details with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-detail-${activeStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <div className="text-red-600">
                      {steps[activeStep].icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-600">Step {steps[activeStep].number}</div>
                    <h3 className="text-2xl font-bold">{steps[activeStep].title}</h3>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {steps[activeStep].description}
                </motion.p>
                
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {steps[activeStep].details.map((detail, idx) => (
                    <motion.div 
                      key={`detail-${idx}`}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                    >
                      <ArrowRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">{detail}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 md:p-12 flex items-center justify-center text-white">
                <div className="max-w-sm">
                  <motion.div 
                    className="text-6xl font-bold mb-6 opacity-20"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 0.2, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {steps[activeStep].number}
                  </motion.div>
                  
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="text-xl font-bold">What you can expect:</div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm font-medium mb-1">Timeline</div>
                      <div className="text-lg font-bold">
                        {activeStep === 0 && "1-2 weeks"}
                        {activeStep === 1 && "2-4 weeks"}
                        {activeStep === 2 && "4-8 weeks"}
                        {activeStep === 3 && "1-2 weeks"}
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm font-medium mb-1">Deliverables</div>
                      <div className="text-lg font-bold">
                        {activeStep === 0 && "Project plan & roadmap"}
                        {activeStep === 1 && "Design prototypes"}
                        {activeStep === 2 && "Functional product"}
                        {activeStep === 3 && "Live solution & support"}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Step navigation */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <motion.button
              className={`px-4 py-2 rounded-lg border ${activeStep === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'}`}
              onClick={() => activeStep > 0 && setActiveStep(prev => prev - 1)}
              disabled={activeStep === 0}
              whileHover={activeStep > 0 ? { y: -5 } : {}}
              whileTap={activeStep > 0 ? { y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Previous Step
            </motion.button>
            
            <motion.button
              className={`px-4 py-2 rounded-lg border ${activeStep === steps.length - 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'}`}
              onClick={() => activeStep < steps.length - 1 && setActiveStep(prev => prev + 1)}
              disabled={activeStep === steps.length - 1}
              whileHover={activeStep < steps.length - 1 ? { y: -5 } : {}}
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
    </section>
  )
}
