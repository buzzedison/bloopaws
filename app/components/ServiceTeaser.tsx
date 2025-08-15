'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, DollarSign, Smartphone, Target, Users } from 'lucide-react'

export default function ServiceTeaser() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: DollarSign,
      title: "Finding Funding",
      description: "We help you craft a story (and a deck) that gets investors to listen.",
      link: "/services"
    },
    {
      icon: Smartphone,
      title: "Web & App Builds",
      description: "We build products that look great, work flawlessly, and turn visitors into customers.",
      link: "/services"
    },
    {
      icon: Target,
      title: "Market Strategy",
      description: "We dig into the data to find your first—or next—1,000 customers.",
      link: "/services"
    },
    {
      icon: Users,
      title: "Team Training",
      description: "We give your team the skills they need to become total rockstars.",
      link: "/services"
    }
  ]

  return (
    <section 
      ref={ref}
      className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-1 h-40 bg-gradient-to-b from-red-200 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-10 right-1/4 w-1 h-40 bg-gradient-to-b from-pink-200 to-transparent transform -rotate-45"></div>
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-pink-100 rounded-full opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
            Here's where we{" "}
            <span className="text-red-600">step in.</span>
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.1),
                  ease: "easeOut" 
                }}
              >
                <div className="bg-white border border-pink-200 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:shadow-red-100/50 hover:border-red-200 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-lg text-black leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <Link 
                    href={service.link}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
                  >
                    Learn more
                    <motion.span
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-500/10 to-transparent rounded-tr-2xl rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
