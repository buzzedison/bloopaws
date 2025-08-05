'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  
  // Track mouse position for interactive elements
  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Text animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  }
  
  // Headline words with custom styling
  const headlineWords = [
    { text: "Turn", className: "text-black" },
    { text: "Your", className: "text-black" },
    { text: "Business", className: "text-black" },
    { text: "Idea", className: "text-black" },
    { text: "Into", className: "text-black" },
    { text: "Revenue-Generating", className: "text-red-600" },
    { text: "Companies", className: "text-black" }
  ]
  
  // Calculate dynamic positions for floating elements
  const floatingX = useTransform(() => mousePosition.x * 40 - 20)
  const floatingY = useTransform(() => mousePosition.y * 40 - 20)
  
  // Calculate inverted motion values for alternating elements
  const invertedX = useTransform(() => -1 * (mousePosition.x * 40 - 20))
  const invertedY = useTransform(() => -1 * (mousePosition.y * 40 - 20))
  
  // Animated shapes
  const shapes = [
    { size: 120, x: -5, y: 10, rotation: 15, color: "rgba(239, 68, 68, 0.15)" },
    { size: 80, x: 80, y: -10, rotation: -20, color: "rgba(239, 68, 68, 0.1)" },
    { size: 60, x: -20, y: 60, rotation: 45, color: "rgba(0, 0, 0, 0.05)" },
    { size: 40, x: 60, y: 70, rotation: -15, color: "rgba(0, 0, 0, 0.03)" }
  ]
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden"
    >
      {/* Animated background shapes */}
      {isMounted && shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            x: i % 2 === 0 ? floatingX : invertedX,
            y: i % 2 === 0 ? floatingY : invertedY,
            rotate: shape.rotation
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: i * 0.2,
              duration: 1.2, 
              ease: "easeOut" 
            }
          }}
        />
      ))}
      
      {/* Diagonal line decorations */}
      <div className="absolute w-[1px] h-[60%] bg-gradient-to-b from-transparent via-red-200 to-transparent top-[20%] left-[15%] transform -rotate-12"></div>
      <div className="absolute w-[1px] h-[40%] bg-gradient-to-b from-transparent via-gray-200 to-transparent top-[30%] left-[85%] transform rotate-12"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left content area */}
          <div className="lg:col-span-7 space-y-12 lg:pr-12">
            {/* Animated headline */}
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                <div className="flex flex-wrap gap-x-6">
                  {headlineWords.map((word, i) => (
                    <motion.span
                      key={i}
                      className={word.className}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariants}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </div>
            
            {/* Animated subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-black leading-relaxed max-w-2xl mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.6, 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
            >
              We build websites, custom SaaS platforms, mobile apps, and 
              AI automations that generate measurable ROI within 90 days. 
              From MVP to scale, we're your technical co-founder.
            </motion.p>
            
            {/* CTA buttons with staggered animation */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.8, 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
            >
              <Link href="/contact">
                <motion.button 
                  className="group relative overflow-hidden bg-red-600 text-white font-medium py-4 px-8 rounded-full shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Get in touch
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
              
              <motion.button 
                className="group relative overflow-hidden bg-transparent border border-pink-300 text-black font-medium py-4 px-8 rounded-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center">
                  View Our Process
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-pink-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right content area - Interactive visual element */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full max-w-md mx-auto">
              <InteractiveVisual mouseX={mousePosition.x} mouseY={mousePosition.y} />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [0, 10, 0],
            transition: { 
              delay: 1.5,
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-red-400 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  )
}

// Interactive visual component that responds to mouse movement
function InteractiveVisual({ mouseX, mouseY }: { mouseX: number, mouseY: number }) {
  // Calculate dynamic positions based on mouse
  const moveX = (offset: number) => mouseX * offset - offset/2
  const moveY = (offset: number) => mouseY * offset - offset/2
  
  // Layers of the visual with different parallax effects
  const layers = [
    { 
      shape: "circle", 
      size: 300, 
      x: moveX(20), 
      y: moveY(20), 
      color: "rgba(239, 68, 68, 0.1)", 
      delay: 0 
    },
    { 
      shape: "square", 
      size: 280, 
      x: moveX(-15), 
      y: moveY(-15), 
      color: "rgba(0, 0, 0, 0.03)", 
      delay: 0.1,
      rotate: 15
    },
    { 
      shape: "circle", 
      size: 200, 
      x: moveX(30), 
      y: moveY(30), 
      color: "rgba(239, 68, 68, 0.15)", 
      delay: 0.2 
    },
    { 
      shape: "square", 
      size: 150, 
      x: moveX(-25), 
      y: moveY(-25), 
      color: "white", 
      delay: 0.3,
      rotate: -15,
      border: "2px solid rgba(239, 68, 68, 0.3)"
    }
  ]
  
  return (
    <div className="relative w-full h-full">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: layer.size,
            height: layer.size,
            backgroundColor: layer.color,
            borderRadius: layer.shape === "circle" ? "50%" : "15%",
            border: layer.border || "none",
            x: layer.x,
            y: layer.y,
            rotate: layer.rotate || 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.8,
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: layer.delay,
              duration: 1, 
              ease: "easeOut" 
            }
          }}
        />
      ))}
      
      {/* Central element with text */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 0.5, duration: 0.8 }
        }}
      >
        <div className="relative">
          <motion.div 
            className="text-6xl font-bold text-red-600"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              transition: { 
                duration: 6, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
          >
            B
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative dots */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 160
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-3 h-3 rounded-full bg-red-500"
            style={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
              x,
              y
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: i % 2 === 0 ? 0.7 : 0.4, 
              scale: 1,
              transition: { 
                delay: 0.6 + (i * 0.05),
                duration: 0.4, 
                ease: "easeOut" 
              }
            }}
          />
        )
      })}
    </div>
  )
}
