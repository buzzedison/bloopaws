'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Download, FileText, Lightbulb } from 'lucide-react'

export default function PlaybookTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const resources = [
    {
      icon: FileText,
      title: "Business Templates",
      description: "Ready-to-use frameworks"
    },
    {
      icon: Lightbulb,
      title: "Strategic Guides",
      description: "Step-by-step playbooks"
    },
    {
      icon: BookOpen,
      title: "No-BS Advice",
      description: "Real-world insights"
    },
    {
      icon: Download,
      title: "Free Downloads",
      description: "No catch, no strings"
    }
  ]

  return (
    <section 
      ref={ref}
      className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-100 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-10 right-20 w-2 h-40 bg-gradient-to-b from-red-200 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-2 h-32 bg-gradient-to-b from-pink-200 to-transparent transform -rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your idea is worth more{" "}
            <span className="text-red-600">than a guess.</span>
          </motion.h2>

          {/* Body text */}
          <motion.p
            className="text-xl md:text-2xl text-black leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Before you spend a dime, get smart. We've opened up our entire playbook of guides, templates, and no-BS advice on building a business. It's all free. No catch. Start here.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/freebies">
              <motion.button 
                className="group relative overflow-hidden bg-red-600 text-white font-medium py-4 px-8 rounded-full shadow-lg mb-16"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Grab the Playbook
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

        {/* Resource highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={resource.title}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut" 
                }}
              >
                <div className="bg-white border border-pink-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-red-100/50 hover:border-red-200 hover:-translate-y-2 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  
                  <p className="text-lg text-black">
                    {resource.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
