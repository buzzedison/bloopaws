'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, ArrowRight as ArrowRightIcon, Download, CheckCircle2 } from 'lucide-react'

export default function FlagshipOfferSlider() {
  // Custom cursor for interactive elements
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorScale, setCursorScale] = useState(1)
  const [cursorText, setCursorText] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  // Mouse movement handlers for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
    if (!cursorVisible) setCursorVisible(true)
  }

  const handleMouseEnter = (text: string) => {
    setCursorScale(2.5)
    setCursorText(text)
  }

  const handleMouseLeave = () => {
    setCursorScale(1)
    setCursorText('')
  }
  
  // Define offers with enhanced visual elements
  const offers = [
    {
      id: 1,
      title: "Bloop AI Launch Pack",
      subtitle: "Launch smarter in 30 days",
      description: "Our flagship AI-powered launch package gets you up and running with everything you need for a successful digital presence.",
      badge: "Most Popular",
      features: [
        "Stunning site or app",
        "Custom AI assistant embedded",
        "Project management smart‑ops stack",
        "AI content & outreach kit",
        "3‑week team training sprint"
      ],
      pricing: [
        { tier: "Starter", price: "10,000 GHC" },
        { tier: "Pro", price: "20,000 GHC" },
        { tier: "Elite", price: "50,000 GHC" }
      ],
      image: "/images/launch-pack.jpg",
      color: "from-red-600 to-red-700",
      accentColor: "bg-red-500",
      gradient: "bg-gradient-to-br from-red-500/20 via-transparent to-violet-500/10",
      pattern: "radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)"
    },
    {
      id: 2,
      title: "Full Brand Package",
      subtitle: "Complete identity & pitch solution",
      description: "Everything you need to present your business professionally to customers and investors.",
      features: [
        "Professional website with custom design",
        "Logo & brand identity package",
        "Investor-ready pitch deck",
        "Business email setup",
        "Social media profile designs"
      ],
      pricing: [
        { tier: "Standard", price: "15,000 GHC" }
      ],
      image: "/images/brand-package.jpg",
      color: "from-violet-600 to-violet-700",
      accentColor: "bg-violet-500",
      gradient: "bg-gradient-to-br from-violet-500/20 via-transparent to-red-500/10",
      pattern: "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"
    }
  ]
  
  // Auto-advance the slider
  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1))
    }, 8000)
    
    return () => clearInterval(interval)
  }, [isInView, offers.length])
  
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  }
  
  const [slideDirection, setSlideDirection] = useState(0)
  
  const nextSlide = () => {
    setSlideDirection(1)
    setActiveIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setSlideDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1))
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor */}
      {cursorVisible && (
        <motion.div 
          className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-50 flex items-center justify-center text-white text-xs font-bold"
          animate={{
            x: cursorPosition.x - 24,
            y: cursorPosition.y - 24,
            scale: cursorText ? cursorScale : 0,
            opacity: cursorText ? 1 : 0
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ backgroundColor: '#ff4545' }}
        >
          {cursorText}
        </motion.div>
      )}
      {/* Enhanced background elements with animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-red-100/20 to-red-200/20 -top-[400px] -right-[400px]"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-100/20 to-violet-200/20 -bottom-[300px] -left-[300px]"
          animate={{
            x: [0, 15, 0],
            scale: [1, 1.03, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full border border-red-200/30 top-[20%] left-[10%]"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ 
            rotate: {
              repeat: Infinity, 
              duration: 60,
              ease: "linear"
            },
            scale: {
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut"
            }
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced section header with animated text */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="relative inline-block">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
              variants={itemVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-violet-600">Flagship</span> Offers
            </motion.h2>
            <motion.div 
              className="absolute -bottom-2 left-0 h-3 bg-red-200/30 w-full rounded-full z-0"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            />
          </motion.div>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Choose the perfect package to accelerate your business growth
          </motion.p>
        </motion.div>
        
        {/* Offer slider */}
        <div className="relative">
          {/* Enhanced slider navigation */}
          <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-between items-center px-4 md:px-8 -mt-6 pointer-events-none">
            <motion.button
              className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg text-gray-800 hover:text-red-600 transition-all pointer-events-auto border border-gray-200/50"
              onClick={prevSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              onMouseEnter={() => handleMouseEnter('Prev')}
              onMouseLeave={handleMouseLeave}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg text-gray-800 hover:text-red-600 transition-all pointer-events-auto border border-gray-200/50"
              onClick={nextSlide}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              onMouseEnter={() => handleMouseEnter('Next')}
              onMouseLeave={handleMouseLeave}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Enhanced slider pagination */}
          <div className="flex justify-center space-x-4 mb-12">
            {offers.map((offer, index) => (
              <motion.button
                key={`pagination-${index}`}
                className={`relative px-4 py-2 rounded-full ${index === activeIndex ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-300`}
                onClick={() => {
                  setSlideDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => handleMouseEnter(offer.title.split(' ')[0])}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`text-sm font-medium ${index === activeIndex ? 'text-red-600' : 'text-gray-500'}`}>
                  {offer.title.split(' ')[0]}
                </span>
                {index === activeIndex && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-full"
                    layoutId="activePagination"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Offer cards */}
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={`offer-${activeIndex}`}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-2xl shadow-xl overflow-hidden relative"
              style={{ 
                backgroundImage: offers[activeIndex].pattern,
                backgroundSize: '100% 100%'
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                  {offers[activeIndex].badge && (
                    <motion.div 
                      className="absolute -right-2 top-8 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold py-1 px-4 rounded-l-full shadow-md"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {offers[activeIndex].badge}
                    </motion.div>
                  )}
                  <motion.div 
                    className={`h-1.5 ${offers[activeIndex].accentColor} mb-8 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '6rem' }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                  ></motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-4xl font-bold mb-2">{offers[activeIndex].title}</h3>
                    <p className="text-xl text-gray-600 mb-6">{offers[activeIndex].subtitle}</p>
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {offers[activeIndex].description}
                  </motion.p>
                  
                  <motion.div 
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {offers[activeIndex].features.map((feature, idx) => (
                      <motion.div 
                        key={`feature-${idx}`} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <CheckCircle2 className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <p className="text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-3 mb-8">
                      {offers[activeIndex].pricing.map((tier, idx) => (
                        <motion.div 
                          key={`pricing-${idx}`}
                          className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: offers[activeIndex].accentColor.replace('bg-', 'rgb-'),
                            color: 'white'
                          }}
                        >
                          {tier.tier}: <span className="font-bold">{tier.price}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <Link prefetch={false} href="/files/bloop-offers.pdf">
                        <motion.button 
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center relative overflow-hidden group"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onMouseEnter={() => handleMouseEnter('Download')}
                          onMouseLeave={handleMouseLeave}
                        >
                          <span className="relative z-10 flex items-center">
                            <motion.span
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Download className="w-4 h-4" />
                            </motion.span>
                            Download Details
                          </span>
                          <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500"
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </Link>
                      <Link prefetch={false} href="/contact">
                        <motion.button 
                          className={`bg-gradient-to-r ${offers[activeIndex].color} text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all flex items-center justify-center overflow-hidden relative`}
                          whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ scale: 0.97 }}
                          onMouseEnter={() => handleMouseEnter('Apply')}
                          onMouseLeave={handleMouseLeave}
                        >
                          <motion.span
                            className="relative z-10 flex items-center"
                            whileHover={{ x: -4 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            Apply Now
                            <motion.span 
                              className="ml-2"
                              whileHover={{ x: 4 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                              <ArrowRightIcon className="w-4 h-4" />
                            </motion.span>
                          </motion.span>
                          <motion.div 
                            className="absolute inset-0 bg-white opacity-0"
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
                
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
                    className="h-full w-full relative"
                  >
                    <Image 
                      src={offers[activeIndex].image || "/images/default-offer.jpg"} 
                      alt={offers[activeIndex].title} 
                      fill 
                      style={{ objectFit: "cover" }} 
                      className="h-full w-full transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${offers[activeIndex].color} opacity-30 mix-blend-multiply`}></div>
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div 
                    className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border-2 border-white/20"
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, 180, 360],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-white/10"
                    animate={{ 
                      x: [0, 20, 0],
                      y: [0, -15, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
