'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Bot, LineChart, GraduationCap } from 'lucide-react'

export default function ServicesOrbitalRefined() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  const services = [
    {
      id: 1,
      title: "Digital Product Dev",
      description: "MVPs, SaaS, e‑commerce & mobile—future‑proof from day one.",
      icon: <Code className="w-6 h-6" />,
      position: { x: 0, y: -1 }, // top - most prominent position
      initialDelay: 0, // Lowest delay to appear first
    },
    {
      id: 2,
      title: "AI Automations",
      description: "Chatbots, content engines, dashboards that save 100+ hrs/quarter.",
      icon: <Bot className="w-6 h-6" />,
      position: { x: 1, y: 0 }, // right
      initialDelay: 0.1,
    },
    {
      id: 3,
      title: "Strategy & Advisory",
      description: "GTM plans, pricing models, investor decks that raise capital.",
      icon: <LineChart className="w-6 h-6" />,
      position: { x: 0, y: 1 }, // bottom
      initialDelay: 0.2,
    },
    {
      id: 4,
      title: "Training & Taskwit Academy",
      description: "Live cohorts and custom workshops that turn teams into operators.",
      icon: <GraduationCap className="w-6 h-6" />,
      position: { x: -1, y: 0 }, // left
      initialDelay: 0.3,
    },
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }
  
  // Calculate positions for the orbit layout
  const getPosition = (position: {x: number, y: number}, index: number, isActive: boolean) => {
    // Increased radius for better spacing
    const radius = isActive ? 0 : 220
    // Start angle from top (- Math.PI/2) to position Digital Product Dev at top
    const angle = (index / services.length) * Math.PI * 2 - Math.PI/2
    
    // If active, center it, otherwise position in orbit
    if (isActive) {
      return {
        x: 0,
        y: 0,
        scale: 1.1,
        zIndex: 10
      }
    }
    
    // Calculate orbit position
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      scale: 1,
      zIndex: 1
    }
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-red-100/30 to-red-200/30 -top-[400px] -right-[400px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-100/50 to-gray-200/50 -bottom-[300px] -left-[300px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
            We build growth engines, not just websites.
            <motion.div 
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            />
          </h2>
        </motion.div>
        
        {/* Interactive orbit layout */}
        <div className="relative h-[700px] flex items-center justify-center">
          {/* Center element */}
          <motion.div 
            className="absolute z-0 w-[120px] h-[120px] rounded-full bg-white shadow-xl flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl font-bold text-red-600">B</div>
          </motion.div>
          
          {/* Connecting lines */}
          {activeService === null && (
            <>
              {services.map((service, index) => (
                <motion.div 
                  key={`line-${service.id}`}
                  className="absolute left-1/2 top-1/2 origin-left h-[1px] bg-gradient-to-r from-red-200 to-transparent z-0"
                  initial={{ width: 0, rotate: (index / services.length) * 360 }}
                  animate={isInView ? { width: 220 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                />
              ))}
            </>
          )}
          
          {/* Service cards in orbit */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {services.map((service, index) => {
              const isActive = activeService === service.id
              const position = getPosition(service.position, index, isActive)
              
              return (
                <motion.div
                  key={service.id}
                  className={`absolute cursor-pointer w-[280px] rounded-2xl overflow-hidden ${isActive ? 'z-10' : 'z-1'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: position.x,
                    y: position.y,
                    scale: position.scale,
                    zIndex: position.zIndex,
                    opacity: 1
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.4 },
                    delay: service.initialDelay // Use service-specific delay
                  }}

                  onClick={() => setActiveService(isActive ? null : service.id)}
                  variants={itemVariants}
                >
                  {/* Refined card design */}
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-full overflow-hidden border border-gray-100 hover:border-red-200">
                    {/* Animated red accent line */}
                    <motion.div 
                      className="h-1 bg-red-600"
                      initial={{ width: "30%" }}
                      animate={isInView ? { width: "100%" } : { width: "30%" }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                    />
                    
                    <div className="p-8">
                      <div className="flex items-start mb-6">
                        <motion.div 
                          className="bg-red-50 p-3 rounded-xl mr-4 group-hover:bg-red-100 transition-colors duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {React.cloneElement(service.icon, { className: "w-6 h-6 text-red-600" })}
                        </motion.div>
                        <motion.h3 
                          className="text-xl font-bold text-gray-900"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        >
                          {service.title}
                        </motion.h3>
                      </div>
                      
                      <motion.p 
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                      >
                        {service.description}
                      </motion.p>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            <button className="group flex items-center text-red-600 font-medium overflow-hidden relative py-2 px-4 rounded-full">
                              <span className="relative z-10">Learn more</span>
                              <motion.span
                                className="inline-block ml-2 relative z-10"
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.span>
                              <motion.div 
                                className="absolute bottom-0 left-0 h-[2px] bg-red-600"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
        
        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link href="/services">
            <motion.button 
              className="group relative overflow-hidden bg-white border-2 border-red-600 text-red-600 font-medium py-4 px-10 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 flex items-center font-semibold">
                Explore All Services
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-red-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span 
                className="absolute inset-0 flex items-center justify-center text-white font-semibold z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                Explore All Services
                <span className="ml-2">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
