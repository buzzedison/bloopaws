'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'Does this work with any landing page?',
    answer: 'Yes — MediaBrain uses WebFetch to read any publicly accessible URL. It works best on pages with clear copy and a defined offer. For gated pages or login-protected content, it extracts what\'s visible and asks you to fill in the gaps during the interview phase.',
  },
  {
    id: 2,
    question: 'Do I need an API key or a special Claude subscription?',
    answer: 'No. MediaBrain is a Claude Code skill — it runs inside your existing Claude Code session. You need Claude Code (available with Claude Pro or Team plans) and that\'s it. No additional API keys, no new subscriptions.',
  },
  {
    id: 3,
    question: 'How long does the full workflow actually take?',
    answer: 'Brand extraction takes ~2 minutes. The interview takes 5–10 minutes depending on how detailed your answers are. Customer roleplay, Reddit research, and competitor analysis run automatically — about 8–12 minutes combined. Creative generation is another 5–8 minutes. Total: 25–35 minutes for 16 complete creatives.',
  },
  {
    id: 4,
    question: 'Are the creatives ready to run, or do they need editing?',
    answer: 'The strategy and angles are consistently strong. The individual creatives vary — some will be exactly right, others will need light editing to match your tone or product details. Think of MediaBrain as giving you a very solid first draft that normally takes a week and $5k in agency fees.',
  },
  {
    id: 5,
    question: 'Can I run this multiple times for A/B testing different angles?',
    answer: 'Absolutely. You can re-run MediaBrain on the same URL with a focus on a specific angle, or use the output as a base and ask Claude to generate variations on a specific creative. The skill is designed for iteration.',
  },
  {
    id: 6,
    question: 'What if my landing page is minimal or has very little copy?',
    answer: 'The interview phase is designed exactly for this. If the page is sparse, MediaBrain extracts what it can and then fills in the gaps through the 9 interview questions. Founders with minimal pages often get the best results because MediaBrain can\'t be misled by marketing fluff.',
  },
]

export default function MediaBrainFAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [openItem, setOpenItem] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 relative inline-block">
            Common Questions
            <motion.div
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="text-xl text-black mt-8">Everything you need to know before running your first session</p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="group bg-pink-50 hover:bg-pink-100 rounded-2xl overflow-hidden transition-all duration-300 border border-pink-100 hover:border-red-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <motion.div
                className="cursor-pointer"
                onClick={() => toggle(index)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.998 }}
              >
                <div className="p-7 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black pr-8 group-hover:text-red-600 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openItem === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-7 pb-7">
                      <motion.div
                        className="border-t border-gray-200 pt-5"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <p className="text-black leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
