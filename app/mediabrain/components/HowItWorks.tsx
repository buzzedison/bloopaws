'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link2, Cpu, MessageSquare, Users, Search, Target, Layers } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Link2,
    title: 'Paste your landing page URL',
    description: 'That\'s it. One URL is all MediaBrain needs to start.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Claude extracts your brand identity',
    description: 'Headline, value prop, tone, offer, proof points — pulled and confirmed with you.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Answer 9 targeted questions',
    description: 'Your ICP, objections, differentiator, transformation, and desired CTA. Takes 5 minutes.',
  },
  {
    number: '04',
    icon: Users,
    title: 'Claude roleplays AS your buyer',
    description: 'A 200-word internal monologue in your customer\'s voice. This becomes the soul of every creative.',
  },
  {
    number: '05',
    icon: Search,
    title: 'Reddit research for real ICP language',
    description: 'Real complaints, real desires, real objections — mined from actual communities.',
  },
  {
    number: '06',
    icon: Target,
    title: 'Competitor gap analysis',
    description: 'What your competitors say — and the white space they leave wide open.',
  },
  {
    number: '07',
    icon: Layers,
    title: '16 creatives delivered',
    description: '4 strategic angles × 4 formats. Apple Notes, iMessage, Meme, Comparison Table. Ready to launch.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 relative inline-block">
            How MediaBrain Works
            <motion.div
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Seven phases. Thirty minutes. The same research a media buyer does in a week.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className={`relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300 group ${
                  i === steps.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Step number */}
                <div className="text-5xl font-black text-gray-100 group-hover:text-red-50 transition-colors mb-4 leading-none select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>

                {/* Text */}
                <h3 className="font-bold text-black text-lg mb-2 leading-snug">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[3.5rem] -right-3 w-6 h-[2px] bg-red-100 z-10" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-gray-400 text-base">
            No API keys required. No subscriptions. Just Claude Code and a URL.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
