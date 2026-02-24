'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'

export default function FlagshipOfferInnovative() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  // Define offers
  const offers = [
    {
      id: 1,
      title: "Bloop AI Launch Pack",
      subtitle: "Launch smarter in 30 days",
      description: "Our flagship AI-powered launch package gets you up and running with everything you need for a successful digital presence.",
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
      image: "/images/bloopai.png",
      color: "from-red-600 to-red-700",
      accentColor: "bg-red-600"
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
      image: "/images/bloopweb.png",
      color: "from-red-500 to-red-600",
      accentColor: "bg-red-500"
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
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1))
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none"></div>
      
      {/* Diagonal line decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-[200%] h-1 bg-red-600/20 -rotate-6 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-32 left-0 w-[200%] h-1 bg-red-600/10 -rotate-6 origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        ></motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-6 md:mb-0"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
              Flagship Offers
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-600 max-w-xl">
              Choose the perfect package to accelerate your business growth
            </p>
          </motion.div>
          
          {/* Navigation controls */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="text-sm font-medium text-gray-500">
              {activeIndex + 1} / {offers.length}
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Innovative staggered layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`offer-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative"
          >
            {/* Left column - Image */}
            <motion.div 
              className="lg:col-span-5 relative h-[300px] lg:h-[500px] rounded-3xl overflow-hidden"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <Image 
                src={offers[activeIndex].image || "/images/default-offer.jpg"} 
                alt={offers[activeIndex].title} 
                fill 
                style={{ objectFit: "cover" }} 
                className="h-full w-full"
              />
              
              {/* Overlay with diagonal gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{offers[activeIndex].title}</h3>
                  <p className="text-xl text-white/80">{offers[activeIndex].subtitle}</p>
                </motion.div>
              </div>
              
              {/* Floating price badges */}
              <div className="absolute top-6 right-6 flex flex-col space-y-3">
                {offers[activeIndex].pricing.map((tier, idx) => (
                  <motion.div
                    key={`price-badge-${idx}`}
                    className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  >
                    <span className="text-sm font-medium text-gray-600">{tier.tier}:</span>
                    <span className="ml-1 font-bold text-red-600">{tier.price}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right column - Content */}
            <motion.div 
              className="lg:col-span-7 flex flex-col"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Description card */}
              <motion.div 
                className="bg-gray-50 rounded-3xl p-8 mb-8 relative overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${offers[activeIndex].accentColor}`}></div>
                <div className="relative z-10">
                  <motion.p 
                    className="text-lg text-gray-700 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {offers[activeIndex].description}
                  </motion.p>
                  
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {offers[activeIndex].features.map((feature, idx) => (
                      <motion.div 
                        key={`feature-${idx}`} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                      >
                        <div className="mr-3 mt-1">
                          <motion.div
                            className="bg-red-100 rounded-full p-1"
                            whileHover={{ scale: 1.2, backgroundColor: "#f87171" }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <CheckCircle2 className="text-red-600 w-4 h-4" />
                          </motion.div>
                        </div>
                        <p className="text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Background pattern */}
                <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full border border-red-200/30 pointer-events-none"></div>
                <div className="absolute top-12 -right-24 w-48 h-48 rounded-full border border-red-200/20 pointer-events-none"></div>
              </motion.div>
              
              {/* CTA card */}
              <motion.div 
                className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 text-white relative overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="relative z-10">
                  <motion.h4 
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Ready to transform your business?
                  </motion.h4>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Link prefetch={false} href="/files/bloop-offers.pdf">
                      <motion.button 
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center border border-white/30"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Download className="mr-2 w-4 h-4" />
                        Download Details
                      </motion.button>
                    </Link>
                    <Link prefetch={false} href="/contact">
                      <motion.button 
                        className="bg-white text-red-600 font-semibold py-3 px-6 rounded-full shadow-md transition-all flex items-center justify-center"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                       Let's Chat
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
                
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5"></div>
                  <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-white/5"></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
