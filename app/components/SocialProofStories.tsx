'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function SocialProofStories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      name: "CrowdPen",
      description: "From idea to 2000+ beta users",
      lesson: "User feedback shapes everything"
    },
    {
      name: "TaskWit",
      description: "The all-in-one platform for learning, job searching, and professional networking",
      lesson: "Simple solutions win"
    },
    {
      name: "Loudspeaker",
      description: "Market intelligence app",
      lesson: "Speed beats perfection"
    }
  ]

  return (
    <section 
      ref={ref}
      className="py-24 px-4 bg-gradient-to-br from-white via-pink-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute top-1/2 left-10 w-2 h-48 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12"></div>
        <div className="absolute top-1/3 right-10 w-2 h-32 bg-gradient-to-b from-pink-200 to-transparent transform rotate-12"></div>
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
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
                We've made the mistakes{" "}
                <span className="text-red-600">so you don't have to.</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-black leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Our own projects—CrowdPen, TaskWit, Loudspeaker—are our proof. They weren't perfect overnight successes. They were our learning labs. We're not just giving you theory; we're giving you lessons learned from the front lines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link href="/casestudies">
                <motion.button 
                  className="group relative overflow-hidden bg-red-600 text-white font-medium py-4 px-8 rounded-full shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    See Our Stories
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
            </motion.div>
          </div>

          {/* Right content - Project cards */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="bg-white border border-pink-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-100/50 hover:border-red-200 transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut" 
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-2">{project.name}</h3>
                    <p className="text-lg text-black mb-3">{project.description}</p>
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                      <p className="text-red-600 font-medium italic">
                        "{project.lesson}"
                      </p>
                    </div>
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
