'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Brain } from 'lucide-react'

export default function MediaBrainCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Background accents */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <Brain className="w-4 h-4" />
              MediaBrain — By Bloop Global
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Stop paying agencies{' '}
              <span className="text-red-500">$5k/month</span>
              <br />
              for what takes Claude 30 minutes.
            </h2>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              The same research. The same angles. The same creative strategy. Done in a single Claude Code session with one URL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#waitlist">
                <motion.button
                  className="bg-red-600 text-white font-semibold py-4 px-10 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </a>
              <a href="/contact">
                <motion.button
                  className="text-gray-400 hover:text-white transition-colors font-medium py-4 px-10 rounded-full border border-gray-700 hover:border-gray-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Talk to us about AI automation
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
