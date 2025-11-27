'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Target, Shield, Zap } from 'lucide-react'

export default function SocialProofStories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      name: "CrowdPen",
      stats: "2000+ Beta Users",
      description: "Content monetization platform built from zero.",
      icon: <Target className="w-6 h-6 text-red-500" />
    },
    {
      name: "TaskWit",
      stats: "B2B Enterprise",
      description: "Professional networking & recruitment ecosystem.",
      icon: <Shield className="w-6 h-6 text-red-500" />
    },
    {
      name: "Loudspeaker",
      stats: "Real-time Data",
      description: "Market intelligence engine for rapid analysis.",
      icon: <Zap className="w-6 h-6 text-red-500" />
    }
  ]

  return (
    <section
      ref={ref}
      className="py-32 px-4 bg-black text-white relative overflow-hidden"
    >
      {/* Radar / Sonar Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>

        {/* Scanning Line */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[2px] bg-gradient-to-r from-transparent to-red-600/50 origin-left"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ top: '50%', left: '50%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Battle-Tested. <br />
                <span className="text-red-600">Market-Proven.</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              We don't guess. We deploy strategies forged in the fires of real-world product launches. Our internal ventures are our R&D labs—where we break things so your product is bulletproof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link href="/casestudies">
                <motion.button
                  className="group relative overflow-hidden bg-white text-black font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Mission Logs
                    <motion.span
                      className="inline-block ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right content - Project cards (Mission Log Style) */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-600/50 transition-colors duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-black rounded-lg border border-white/10">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.name}</h3>
                      <p className="text-sm text-red-500 font-mono uppercase tracking-wider">{project.stats}</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-gray-400 text-sm max-w-[200px]">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
