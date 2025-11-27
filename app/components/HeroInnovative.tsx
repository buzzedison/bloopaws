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
    { text: "Vision", className: "text-black" },
    { text: "Into", className: "text-black" },
    { text: "A", className: "text-black" },
    { text: "Market-Leading", className: "text-red-600" },
    { text: "Tech", className: "text-black" },
    { text: "Company.", className: "text-black" }
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
      className="relative w-full min-h-[90vh] bg-white overflow-hidden"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-100 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gray-100 rounded-full blur-[100px]"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Left content area */}
          <div className="lg:col-span-7 space-y-12 lg:pr-12">
            {/* Animated headline */}
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                <div className="flex flex-wrap gap-x-4">
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
              className="text-xl md:text-2xl text-gray-800 leading-relaxed max-w-2xl mt-6 font-light"
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
              We don't just write code. We build award-winning web apps, mobile platforms, and AI systems that drive real revenue. From MVP to IPO, we are your technical co-founder.
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
                  className="group relative overflow-hidden bg-black text-white font-medium py-4 px-8 rounded-full shadow-2xl hover:shadow-red-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Build
                    <motion.span
                      className="inline-block ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-red-500" />
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

              <Link href="/contact" className="text-gray-600 hover:text-black transition-colors duration-300 flex items-center px-6">
                or, let's chat about your project →
              </Link>
            </motion.div>
          </div>

          {/* Right content area - Digital Orb */}
          <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center perspective-1000">
            <DigitalOrb mouseX={mousePosition.x} mouseY={mousePosition.y} />
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
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  )
}

// Sophisticated 3D Digital Orb
function DigitalOrb({ mouseX, mouseY }: { mouseX: number, mouseY: number }) {
  // Smooth rotation based on mouse
  const rotateX = useTransform(() => mouseY * 20 - 10)
  const rotateY = useTransform(() => mouseX * 20 - 10)

  return (
    <motion.div
      className="relative w-80 h-80 md:w-96 md:h-96"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Core Glow */}
      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-[60px] animate-pulse"></div>

      {/* Inner Sphere (Solid) */}
      <motion.div
        className="absolute inset-[15%] bg-gradient-to-br from-gray-900 to-black rounded-full shadow-2xl border border-gray-800"
        style={{ transform: "translateZ(20px)" }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Tech markings on sphere */}
        <div className="absolute inset-0 border-[1px] border-white/10 rounded-full opacity-50"></div>
        <div className="absolute inset-[20%] border-[1px] border-red-500/30 rounded-full"></div>
      </motion.div>

      {/* Outer Ring 1 (Horizontal) */}
      <motion.div
        className="absolute inset-0 border border-gray-300/30 rounded-full"
        style={{ transform: "rotateX(70deg) translateZ(0px)" }}
        animate={{
          rotateZ: 360
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
      </motion.div>

      {/* Outer Ring 2 (Vertical) */}
      <motion.div
        className="absolute inset-[-10%] border border-gray-400/20 rounded-full"
        style={{ transform: "rotateY(70deg) translateZ(0px)" }}
        animate={{
          rotateZ: -360
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black rounded-full"></div>
      </motion.div>

      {/* Outer Ring 3 (Diagonal) */}
      <motion.div
        className="absolute inset-[-20%] border border-red-500/10 rounded-full border-dashed"
        style={{ transform: "rotateX(45deg) rotateY(45deg)" }}
        animate={{
          rotateZ: 360
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: `translateZ(${40 + i * 10}px)`
          }}
          animate={{
            x: [Math.cos(i) * 100, Math.sin(i) * 100, Math.cos(i) * 100],
            y: [Math.sin(i) * 100, Math.cos(i) * 100, Math.sin(i) * 100],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  )
}
