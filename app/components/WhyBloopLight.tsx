'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Code, Zap, Users, Lightbulb } from 'lucide-react'

export default function WhyBloopLight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeValue, setActiveValue] = useState(0)
  
  const values = [
    {
      id: 1,
      title: "Speed Without Shortcuts",
      description: "Most agencies take 6+ months to deliver. We ship your MVP in 8-12 weeks using proven frameworks and reusable components.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 2,
      title: "Revenue-First Thinking",
      description: "We don't just build features—we build business models. Every line of code is written with your revenue goals in mind.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 3,
      title: "Technical Excellence",
      description: "Our senior developers average 8+ years experience. We use modern, scalable tech stacks that won't break as you grow.",
      icon: <Code className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    },
    {
      id: 4,
      title: "Post-Launch Partnership",
      description: "Launch is just the beginning. We provide ongoing optimization, feature additions, and scaling support.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-red-600",
      textColor: "text-red-600"
    }
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Red diagonal strip */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-0 left-0 w-full h-32 bg-red-600 -skew-y-6 origin-left transform -translate-y-16"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          ></motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header - Split design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Why Choose <span className="text-red-600">Bloop</span>
            </h2>
            <div className="h-1 w-24 bg-red-600 mb-6"></div>
            <p className="text-xl text-black">
              We don't just build software—we build businesses
            </p>
          </motion.div>
          
          <motion.div
            className="relative h-64 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Image 
              src="/images/digitala.png" 
              alt="Bloop team collaboration" 
              fill 
              style={{ objectFit: "cover" }} 
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-transparent mix-blend-multiply"></div>
          </motion.div>
        </div>
        
        {/* Values in a grid layout with interactive elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {values.map((value, idx) => (
            <motion.div 
              key={`value-${value.id}`}
              className={`rounded-xl p-8 shadow-lg border border-gray-100 ${activeValue === idx ? 'bg-red-600 text-white' : 'bg-white hover:bg-gray-50'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => setActiveValue(idx)}
            >
              <div className={`p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-6 ${activeValue === idx ? 'bg-white/20' : 'bg-red-100'}`}>
                <div className={activeValue === idx ? 'text-white' : 'text-red-600'}>
                  {value.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className={activeValue === idx ? 'text-white/90' : 'text-black'}>{value.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial with offset design */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 md:col-start-6 bg-white rounded-xl p-8 relative z-10 shadow-xl border border-gray-100">
              <div className="text-5xl font-serif text-red-600 mb-6">"</div>
              <p className="text-xl text-black mb-6">
                Bloop transformed our business with their innovative approach. Their team delivered a solution that exceeded our expectations and helped us achieve our goals faster than we thought possible.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-100 mr-4 flex items-center justify-center text-red-600 font-bold">KM</div>
                <div>
                  <div className="font-bold text-black">Kofi Mensah</div>
                  <div className="text-black text-sm">CEO, TechVentures Ghana</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6 md:col-start-1 md:row-start-1 bg-red-600 rounded-xl p-8 h-full flex items-center">
              <div className="text-2xl font-bold text-white">
                We've helped 100+ businesses accelerate their digital transformation journey
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
