'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function RealityCheck() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="py-32 bg-black text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div style={{ y: yText, opacity }}>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              Ideas are easy. <br />
              <span className="text-red-600">Building is the hard part.</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              <p>
                You're juggling a million things: the tech, the funding, the marketing, finding customers... it's a lot.
              </p>
              <p>
                You don't need another consultant with a 50-page PowerPoint. You need a crew that gets their hands dirty.
              </p>
              <p className="font-semibold text-white border-l-4 border-red-600 pl-4">
                That's us. We handle the tricky parts so you can focus on your vision.
              </p>
            </div>
          </motion.div>

          {/* Right: Chaos to Order Visual */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <ChaosToOrderVisual scrollProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ChaosToOrderVisual({ scrollProgress }: { scrollProgress: any }) {
  // Transform chaos to order based on scroll
  const chaos = useTransform(scrollProgress, [0.2, 0.6], [1, 0])

  return (
    <div className="relative w-full h-full">
      {/* Grid Container */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gray-800 rounded-lg relative overflow-hidden"
            style={{
              // Random initial positions that animate to grid positions
              x: useTransform(chaos, [1, 0], [(Math.random() - 0.5) * 500, 0]),
              y: useTransform(chaos, [1, 0], [(Math.random() - 0.5) * 500, 0]),
              rotate: useTransform(chaos, [1, 0], [(Math.random() - 0.5) * 180, 0]),
              scale: useTransform(chaos, [1, 0], [0.5 + Math.random(), 1]),
              opacity: useTransform(chaos, [1, 0], [0.3, 1]),
              backgroundColor: useTransform(chaos, (latest) =>
                latest < 0.1 ? '#1f2937' : '#ef4444' // Turns red momentarily then dark
              )
            }}
          >
            {/* Inner content of each block */}
            <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
          </motion.div>
        ))}
      </div>

      {/* Central "Order" Label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(chaos, [0.5, 0], [0, 1]) }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10">
          <span className="text-2xl font-bold tracking-widest text-white">EXECUTION</span>
        </div>
      </motion.div>
    </div>
  )
}
