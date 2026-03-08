'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { StickyNote, MessageCircle, Laugh, Table2 } from 'lucide-react'

const formats = [
  {
    number: '01',
    icon: StickyNote,
    name: 'Apple Notes Style',
    description: 'Screenshot-aesthetic note that looks like a private tip going public. Bullet-point body, soft CTA. Bypasses ad-blindness because it feels like organic content.',
    why: 'Native content converts 3x better than polished ads in feed',
    tag: 'High trust',
  },
  {
    number: '02',
    icon: MessageCircle,
    name: 'Fake iMessage Thread',
    description: '6–10 message exchange between two real-sounding people. No brand names in early messages. Skepticism from Person A makes Person B\'s proof land harder.',
    why: 'Conversational format triggers reading behavior people use on personal content',
    tag: 'High engagement',
  },
  {
    number: '03',
    icon: Laugh,
    name: 'Meme Ad',
    description: 'Top text / bottom text / specific meme template. Uses highly specific ICP language. The buyer laughs because it\'s painfully accurate — then clicks.',
    why: 'Viral mechanic. Buyers tag friends. Emotion first, logic second',
    tag: 'High shareability',
  },
  {
    number: '04',
    icon: Table2,
    name: 'Comparison Table',
    description: '3-column table: Your product vs. DIY vs. Competitor. 5–7 rows hitting different pain points. Final row is price-to-result ratio. Rational buyers use this to confirm a decision already made.',
    why: 'Converts skeptical, solution-aware buyers who need a final push',
    tag: 'High intent',
  },
]

export default function CreativeFormats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-4">What You Get</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 relative inline-block">
            4 Formats That Actually Convert
            <motion.div
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Each of the 4 strategic angles gets generated in all 4 formats. 16 creatives total. Cover every buyer type and placement.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formats.map((format, i) => {
            const Icon = format.icon
            return (
              <motion.div
                key={format.number}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Red top accent */}
                <div className="h-1 bg-red-600 group-hover:bg-red-700 transition-colors" />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-gray-300 font-black text-2xl leading-none">{format.number}</p>
                        <h3 className="font-bold text-black text-xl leading-tight">{format.name}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-red-700 bg-red-50 px-3 py-1 rounded-full whitespace-nowrap">
                      {format.tag}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">{format.description}</p>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-400">
                      <span className="font-medium text-gray-700">Why it works: </span>
                      {format.why}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
