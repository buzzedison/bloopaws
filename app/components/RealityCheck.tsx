'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RealityCheck() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className="py-24 px-4 bg-gradient-to-br from-white via-pink-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-2 h-32 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-2 h-32 bg-gradient-to-b from-pink-200 to-transparent transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-red-100 rounded-full opacity-30 transform -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-100 rounded-full opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ideas are easy.{" "}
            <span className="text-red-600">Building is the hard part.</span>
          </motion.h2>

          {/* Body text */}
          <motion.div
            className="text-xl md:text-2xl text-black leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="mb-6">
              You're juggling a million things: the tech, the funding, the marketing, finding customers... it's a lot. 
            </p>
            <p className="mb-6">
              You don't need another consultant with a 50-page PowerPoint. You need a crew that gets their hands dirty. 
            </p>
            <p className="font-semibold text-red-600">
              That's us. We handle the tricky parts so you can focus on your vision.
            </p>
          </motion.div>

          {/* Decorative quote marks */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-red-300 text-8xl font-serif leading-none">"</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
