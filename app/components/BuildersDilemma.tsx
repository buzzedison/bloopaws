'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lightbulb, Code, TrendingUp } from 'lucide-react'

export default function BuildersDilemma() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className="py-24 px-4 bg-white text-gray-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-10 w-2 h-48 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12"></div>
        <div className="absolute top-1/3 right-10 w-2 h-32 bg-gradient-to-b from-red-200 to-transparent transform rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-gray-900">
              The Builder's Dilemma
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              That moment when your vision meets the brutal reality of execution. 
              <span className="text-red-600 font-semibold"> Most fail here.</span> We're fixing that.
            </p>
          </motion.div>

          {/* Visual: Idea ←→ Execution Gap */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Idea Side */}
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4 shadow-sm">
                    <Lightbulb className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Your Vision</h3>
                  <p className="text-gray-600">The brilliant idea that keeps you up at night</p>
                </div>

                {/* Gap Visualization */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
                      <div className="text-red-600 text-4xl font-bold">?</div>
                      <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-green-500"></div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm text-red-600 font-semibold">THE GAP</span>
                    </div>
                  </div>
                </div>

                {/* Execution Side */}
                <div className="flex-1 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 shadow-sm">
                    <TrendingUp className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Real Business</h3>
                  <p className="text-gray-600">Revenue, customers, and market traction</p>
                </div>
              </div>

              {/* The Gap Description */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-red-600 font-bold text-lg mb-2">The Tech Stack</div>
                    <p className="text-sm text-gray-600">Which framework? What architecture? Cloud or on-prem?</p>
                  </div>
                  <div>
                    <div className="text-red-600 font-bold text-lg mb-2">The Resources</div>
                    <p className="text-sm text-gray-600">Budget constraints. Time pressure. Talent shortage.</p>
                  </div>
                  <div>
                    <div className="text-red-600 font-bold text-lg mb-2">The Execution</div>
                    <p className="text-sm text-gray-600">Building, testing, launching, scaling, iterating.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Where Are You Stuck?
              </h3>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Take our 2-minute Disruptor's Diagnostic and get a personalized roadmap to bridge your gap.
              </p>
              
              <Link href="/diagnostic">
                <button className="group relative overflow-hidden bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center text-lg">
                  <span className="relative z-10 flex items-center">
                    Take the Diagnostic
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>

              <p className="text-sm text-red-100 mt-6 opacity-80">
                Free • No signup required • Instant results
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
