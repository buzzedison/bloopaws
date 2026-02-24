'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Bot, LineChart, GraduationCap } from 'lucide-react'

export default function ServicesOrbit() {
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
      color: "bg-gradient-to-br from-red-500/90 to-red-600/90",
      position: { x: 0, y: -1 }, // top
    },
    {
      id: 2,
      title: "AI Automations",
      description: "Chatbots, content engines, dashboards that save 100+ hrs/quarter.",
      icon: <Bot className="w-6 h-6" />,
      color: "bg-gradient-to-br from-red-600/90 to-red-700/90",
      position: { x: 1, y: 0 }, // right
    },
    {
      id: 3,
      title: "Strategy & Advisory",
      description: "GTM plans, pricing models, investor decks that raise capital.",
      icon: <LineChart className="w-6 h-6" />,
      color: "bg-gradient-to-br from-red-700/90 to-red-800/90",
      position: { x: 0, y: 1 }, // bottom
    },
    {
      id: 4,
      title: "Training & Bloop Academy",
      description: "Live cohorts and custom workshops that turn teams into operators.",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-gradient-to-br from-red-800/90 to-red-900/90",
      position: { x: -1, y: 0 }, // left
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
    const radius = isActive ? 0 : 180
    const angle = (index / services.length) * Math.PI * 2
    
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
    <section className="relative py-32 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-red-100/30 to-red-200/30 -top-[400px] -right-[400px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-100/50 to-gray-200/50 -bottom-[300px] -left-[300px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
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
        <div className="relative h-[600px] flex items-center justify-center">
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
                  animate={isInView ? { width: 180 } : { width: 0 }}
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
                  className={`absolute cursor-pointer w-[280px] rounded-2xl overflow-hidden shadow-lg ${isActive ? 'z-10' : 'z-1'}`}
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
                    opacity: { duration: 0.4 }
                  }}
                  onClick={() => setActiveService(isActive ? null : service.id)}
                  variants={itemVariants}
                >
                  <div className={`${service.color} p-6 text-white h-full`}>
                    <div className="flex items-start mb-4">
                      <div className="bg-white/20 p-3 rounded-lg mr-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    
                    <p className="text-white/90 mb-4">{service.description}</p>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link prefetch={false} href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <button className="group flex items-center text-white font-medium mt-4">
                            Learn more
                            <motion.span
                              className="inline-block ml-2"
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.span>
                          </button>
                        </Link>
                      </motion.div>
                    )}
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
          <Link prefetch={false} href="/services">
            <button className="group relative overflow-hidden bg-white border border-red-600 text-red-600 font-medium py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
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
              <motion.div 
                className="absolute inset-0 bg-red-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ color: "white" }}
              />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
