'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export default function FAQInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [openItem, setOpenItem] = useState<number | null>(0) // First item open by default
  
  const faqs = [
    {
      id: 1,
      question: "Do you work with non-technical founders?",
      answer: "Absolutely. 70% of our clients are business professionals without coding experience. We handle all technical aspects while keeping you informed every step of the way."
    },
    {
      id: 2,
      question: "What if my idea changes during development?",
      answer: "We build flexibility into every project. Minor changes are included, and we'll transparently communicate costs for major pivots."
    },
    {
      id: 3,
      question: "Do you provide ongoing support after launch?",
      answer: "Yes. We offer maintenance packages starting at $2,000/month, including hosting, security updates, and feature additions."
    },
    {
      id: 4,
      question: "How do you ensure my idea stays confidential?",
      answer: "We sign NDAs before any project discussion and have strict internal confidentiality protocols."
    },
    {
      id: 5,
      question: "What technologies do you use?",
      answer: "We use proven, modern stacks: React/Next.js, Node.js, PostgreSQL, AWS/Vercel for hosting. We choose technologies for longevity and scalability, not trends."
    }
  ]
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-600/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-red-600/5 to-transparent"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black inline-block relative">
            Frequently Asked Questions
            <motion.div 
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            />
          </h2>
          <p className="text-xl text-black">
            Everything you need to know about working with us
          </p>
        </motion.div>
        
        {/* FAQ items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="group bg-pink-50 hover:bg-pink-100 rounded-2xl overflow-hidden transition-all duration-300 border border-pink-100 hover:border-red-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.div
                className="cursor-pointer"
                onClick={() => toggleItem(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="p-8 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-black pr-8 group-hover:text-red-600 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {openItem === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
              
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8">
                      <motion.div
                        className="border-t border-gray-200 pt-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <p className="text-black leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-red-100 mb-6">
              Our team is here to help. Schedule a free consultation to discuss your project.
            </p>
            <motion.button
              className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}