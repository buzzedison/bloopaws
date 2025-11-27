'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, FileText, BarChart, ShieldCheck, DownloadCloud } from 'lucide-react'

export default function PlaybookTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const resources = [
    {
      icon: FileText,
      title: "Business Templates",
      description: "Ready-to-use frameworks",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: BarChart,
      title: "Financial Models",
      description: "Investor-grade spreadsheets",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: ShieldCheck,
      title: "Legal Checklists",
      description: "Protect your IP from day one",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: DownloadCloud,
      title: "Go-to-Market Strategy",
      description: "Launch plans that convert",
      color: "bg-orange-50 text-orange-600"
    }
  ]

  return (
    <section
      ref={ref}
      className="py-32 px-4 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          {/* Headline */}
          <motion.h2
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The Founder's <span className="text-red-600">Arsenal.</span>
          </motion.h2>

          {/* Body text */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Stop guessing. Steal our internal frameworks, financial models, and go-to-market checklists. 100% Free. No catch.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/freebies">
              <motion.button
                className="group relative overflow-hidden bg-black text-white font-medium py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Access The Vault
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-red-500" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Resource highlights with 3D Card Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={resource.title}
                className="group perspective-1000"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform group-hover:rotate-y-12 group-hover:rotate-x-6 preserve-3d">
                  {/* Floating Icon */}
                  <div className={`mb-6 inline-flex p-4 rounded-xl ${resource.color} transform group-hover:translate-z-20 transition-transform duration-500`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300 transform group-hover:translate-z-10">
                    {resource.title}
                  </h3>

                  <p className="text-gray-700 transform group-hover:translate-z-10">
                    {resource.description}
                  </p>

                  {/* Decorative corner fold */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-gray-100 transform rotate-45 translate-x-2 -translate-y-2"></div>
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
