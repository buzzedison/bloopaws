'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Code, Zap, Users, Lightbulb } from 'lucide-react'

export default function WhyBloopUnique() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const values = [
    {
      id: 1,
      title: "Innovative Approach",
      description: "We blend cutting-edge technology with creative thinking to deliver solutions that stand out in the market.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 2,
      title: "Speed & Efficiency",
      description: "Our streamlined processes and expert team ensure rapid delivery without compromising on quality.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 3,
      title: "Technical Excellence",
      description: "Our engineering team brings deep expertise across multiple technologies to build robust, scalable solutions.",
      icon: <Code className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 4,
      title: "Client-Centric Focus",
      description: "We prioritize understanding your unique needs and goals to deliver solutions that truly serve your business.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    }
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gray-900 text-white"
    >
      {/* Diagonal design elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-0 left-0 w-full h-20 bg-red-600 -skew-y-6 origin-left transform -translate-y-10"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-0 right-0 w-full h-20 bg-red-600/30 -skew-y-6 origin-right transform translate-y-10"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          ></motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header - Asymmetrical design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-red-500">Bloop</span>
            </h2>
            <div className="h-1 w-24 bg-red-600 mb-6"></div>
            <p className="text-xl text-white">
              What makes us different from other agencies and why clients choose to work with us
            </p>
          </motion.div>
          
          <motion.div
            className="relative h-64 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Image 
              src="/images/team-collaboration.jpg" 
              alt="Bloop team collaboration" 
              fill 
              style={{ objectFit: "cover" }} 
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-transparent mix-blend-multiply"></div>
          </motion.div>
        </div>
        
        {/* Values in a horizontal scrolling layout */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            <div className="flex space-x-6 px-4">
              {values.map((value, idx) => (
                <motion.div 
                  key={`value-${value.id}`}
                  className="bg-gray-800 rounded-xl p-8 shadow-lg flex-shrink-0 w-[300px] md:w-[350px] snap-center border border-red-500/30"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.215, 0.61, 0.355, 1] }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className={`${value.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-6`}>
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-white">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {values.map((_, idx) => (
              <div 
                key={`indicator-${idx}`} 
                className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-red-600' : 'bg-gray-600'}`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Testimonial section with offset design */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 md:col-start-6 bg-gray-800 rounded-xl p-8 relative z-10 border border-red-500/30">
              <div className="text-3xl font-serif text-red-500 mb-6">"</div>
              <p className="text-xl text-white mb-6">
                Bloop transformed our business with their innovative approach. Their team delivered a solution that exceeded our expectations and helped us achieve our goals faster than we thought possible.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-600/30 mr-4 flex items-center justify-center text-white font-bold">KM</div>
                <div>
                  <div className="font-bold">Kofi Mensah</div>
                  <div className="text-white text-sm">CEO, TechVentures Ghana</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6 md:col-start-1 md:row-start-1 bg-red-600/40 rounded-xl p-8 h-full flex items-center border border-red-500/50">
              <div className="text-2xl font-bold text-white">
                We've helped 50+ businesses accelerate their digital transformation journey
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
