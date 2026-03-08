'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Brain, Zap } from 'lucide-react'

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
}

const headlineWords = [
  { text: 'Turn', className: 'text-black' },
  { text: 'Any', className: 'text-black' },
  { text: 'Landing', className: 'text-black' },
  { text: 'Page', className: 'text-black' },
  { text: 'Into', className: 'text-black' },
  { text: '16', className: 'text-red-600' },
  { text: 'Meta', className: 'text-red-600' },
  { text: 'Ads.', className: 'text-black' },
]

const adPreviews = [
  {
    label: 'Apple Notes',
    bg: 'bg-yellow-50',
    content: (
      <div className="text-left p-4 font-mono text-xs leading-relaxed">
        <p className="font-bold text-gray-800 mb-2 text-sm">Why I stopped using agencies 🗒️</p>
        <ul className="space-y-1 text-gray-600">
          <li>• Paid $4k/mo for "strategy" that took 3 weeks</li>
          <li>• First draft missed the brief entirely</li>
          <li>• Found this Claude Code skill</li>
          <li>• Ran it on my URL at 11pm</li>
          <li>• 16 creatives by midnight</li>
          <li>• First ad live next morning</li>
          <li>• DM me "BRAIN" and I'll share it</li>
        </ul>
      </div>
    )
  },
  {
    label: 'iMessage',
    bg: 'bg-gray-50',
    content: (
      <div className="text-xs space-y-2 p-4">
        <div className="flex justify-start"><div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] text-gray-800">my ads are not converting at all, been testing for 6 weeks</div></div>
        <div className="flex justify-end"><div className="bg-blue-500 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] text-white">have you tried mediabrain yet</div></div>
        <div className="flex justify-start"><div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] text-gray-800">what's that</div></div>
        <div className="flex justify-end"><div className="bg-blue-500 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] text-white">claude code skill. paste your url, 30 mins later you have 16 ads with full strategy</div></div>
        <div className="flex justify-start"><div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] text-gray-800">send me the link</div></div>
      </div>
    )
  },
  {
    label: 'Meme Ad',
    bg: 'bg-white',
    content: (
      <div className="text-center p-4">
        <p className="font-black text-lg text-gray-900 uppercase tracking-wide">Paying $5k/mo to an agency</p>
        <div className="my-3 bg-gray-200 rounded-lg h-16 flex items-center justify-center text-gray-500 text-sm">[ Drake rejecting meme ]</div>
        <p className="font-black text-lg text-red-600 uppercase tracking-wide">Paste URL. Get 16 ads. 30 minutes.</p>
      </div>
    )
  }
]

export default function MediaBrainHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePreview, setActivePreview] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePreview(prev => (prev + 1) % adPreviews.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[92vh] bg-white overflow-hidden"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-100 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gray-100 rounded-full blur-[100px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 flex flex-col justify-center min-h-[92vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Left — Copy */}
          <div className="lg:col-span-7 space-y-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-2 rounded-full"
            >
              <Brain className="w-4 h-4" />
              Claude Code Skill · Built for Media Buyers
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
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

            {/* Subhead */}
            <motion.p
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } }}
            >
              MediaBrain extracts your brand, interviews you, roleplays as your buyer, researches Reddit, and outputs{' '}
              <span className="text-black font-semibold">4 angles × 4 formats = 16 battle-ready creatives.</span>
              {' '}No agency. No weeks. Just paste a URL.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.85, duration: 0.7 } }}
            >
              {[
                { number: '30', unit: 'min', label: 'full workflow' },
                { number: '16', unit: '', label: 'ad creatives' },
                { number: '4', unit: '', label: 'strategic angles' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-4xl font-black text-black">
                    {stat.number}<span className="text-red-600 text-2xl">{stat.unit}</span>
                  </span>
                  <span className="text-gray-500 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.7 } }}
            >
              <a href="#waitlist">
                <motion.button
                  className="group relative overflow-hidden bg-black text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Early Access
                  <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>
              <a
                href="#output-examples"
                className="text-gray-600 hover:text-black transition-colors duration-300 flex items-center px-6 font-medium"
              >
                See example output →
              </a>
            </motion.div>
          </div>

          {/* Right — Ad Preview Stack */}
          <div className="lg:col-span-5 relative h-[440px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8 } }}
              className="relative w-full max-w-sm"
            >
              {/* Stacked cards behind */}
              <div className="absolute top-3 left-3 right-0 h-full bg-red-100 rounded-2xl" />
              <div className="absolute top-6 left-6 right-0 h-full bg-red-50 rounded-2xl" />

              {/* Active card */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Tab row */}
                <div className="flex border-b border-gray-100">
                  {adPreviews.map((preview, i) => (
                    <button
                      key={preview.label}
                      onClick={() => setActivePreview(i)}
                      className={`flex-1 py-3 text-xs font-medium transition-colors ${
                        i === activePreview
                          ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {preview.label}
                    </button>
                  ))}
                </div>

                {/* Content area */}
                <div className="min-h-[240px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePreview}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {adPreviews[activePreview].content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer badge */}
                <div className="px-4 pb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-gray-400">Generated by MediaBrain in 28 min</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0], transition: { delay: 1.8, duration: 2, repeat: Infinity } }}
        >
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}
