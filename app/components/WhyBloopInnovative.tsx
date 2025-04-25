'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Code, Zap, Users, Clock, Award, Lightbulb, Sparkles, BarChart } from 'lucide-react'

export default function WhyBloopInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeValue, setActiveValue] = useState(0)
  
  const values = [
    {
      id: 1,
      title: "Innovative Approach",
      description: "We blend leading technology with creative thinking to deliver solutions that stand out in the market.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-red-600",
      image: "/images/innovativeapproach.png",
      stats: [
        { value: "80%", label: "Faster delivery" },
        { value: "3x", label: "More innovative" }
      ],
      features: [
        "AI-first methodology",
        "Creative problem solving",
        "Cutting-edge tech stack"
      ]
    },
    {
      id: 2,
      title: "Speed & Efficiency",
      description: "Our streamlined processes and expert team ensure rapid delivery without compromising on quality.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-red-600",
      image: "/images/speed-efficiency.jpg",
      stats: [
        { value: "2x", label: "Faster than competitors" },
        { value: "30%", label: "Cost reduction" }
      ],
      features: [
        "Rapid prototyping",
        "Agile development",
        "Streamlined workflows"
      ]
    },
    {
      id: 3,
      title: "Technical Excellence",
      description: "Our engineering team brings deep expertise across multiple technologies to build robust, scalable solutions.",
      icon: <Code className="w-6 h-6" />,
      color: "bg-red-600",
      image: "/images/technical-excellence.jpg",
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "100+", label: "Successful projects" }
      ],
      features: [
        "Clean, maintainable code",
        "Scalable architecture",
        "Performance optimization"
      ]
    },
    {
      id: 4,
      title: "Client-Centric Focus",
      description: "We prioritize understanding your unique needs and goals to deliver solutions that truly serve your business.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-red-600",
      image: "/images/client-centric.jpg",
      stats: [
        { value: "95%", label: "Client satisfaction" },
        { value: "85%", label: "Repeat business" }
      ],
      features: [
        "Collaborative approach",
        "Transparent communication",
        "Tailored solutions"
      ]
    }
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
        ></motion.div>
        
        <motion.div 
          className="absolute -top-64 -right-64 w-[500px] h-[500px] rounded-full border border-red-200/30 opacity-60"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border border-red-200/30 opacity-60"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        ></motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="inline-block relative mb-2" variants={itemVariants}>
            <span className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-1 rounded-full">
              Our Difference
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 relative inline-block"
            variants={itemVariants}
          >
            Why Choose Bloop
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-red-600 w-full rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            ></motion.div>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            What makes us different from other agencies and why clients choose to work with us
          </motion.p>
        </motion.div>
        
        {/* Interactive value showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Value tabs */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {values.map((value, idx) => (
              <motion.div 
                key={`value-tab-${value.id}`}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${activeValue === idx ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                onClick={() => setActiveValue(idx)}
                whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ y: 0, boxShadow: "0 5px 10px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${activeValue === idx ? 'bg-white/20' : 'bg-red-100'}`}>
                    <div className={activeValue === idx ? 'text-white' : 'text-red-600'}>
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className={`${activeValue === idx ? 'text-white/80' : 'text-gray-600'} text-sm`}>{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Right column - Value details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`value-detail-${activeValue}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="relative h-64 md:h-80">
                  <Image 
                    src={values[activeValue].image || "/images/default-value.jpg"} 
                    alt={values[activeValue].title} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    className="transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="flex items-center mb-4"
                    >
                      <div className="bg-red-600 p-3 rounded-full mr-4">
                        <div className="text-white">
                          {values[activeValue].icon}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{values[activeValue].title}</h3>
                    </motion.div>
                    
                    <motion.p 
                      className="text-white/90 text-lg max-w-2xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {values[activeValue].description}
                    </motion.p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <BarChart className="w-5 h-5 text-red-600 mr-2" />
                        Key Metrics
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {values[activeValue].stats.map((stat, idx) => (
                          <motion.div 
                            key={`stat-${idx}`}
                            className="bg-gray-50 rounded-xl p-4 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                            whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.05)" }}
                          >
                            <div className="text-3xl font-bold text-red-600 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 text-red-600 mr-2" />
                        What We Deliver
                      </h4>
                      
                      <div className="space-y-3">
                        {values[activeValue].features.map((feature, idx) => (
                          <motion.div 
                            key={`feature-${idx}`}
                            className="flex items-center bg-gray-50 rounded-xl p-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-red-600 mr-3"></div>
                            <p className="text-gray-700">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Awards and recognition */}
        <motion.div 
          className="mt-16 bg-gray-50 rounded-3xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold">Awards & Recognition</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div 
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-lg font-bold mb-1">Best AI Implementation</div>
                <div className="text-sm text-gray-600">Tech Innovation Awards 2024</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="text-lg font-bold mb-1">Top Digital Agency</div>
                <div className="text-sm text-gray-600">Ghana Business Excellence 2024</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="text-lg font-bold mb-1">UX Design Excellence</div>
                <div className="text-sm text-gray-600">African Design Awards 2023</div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="text-lg font-bold mb-1">Fastest Growing Tech Company</div>
                <div className="text-sm text-gray-600">West Africa Business Awards 2023</div>
              </motion.div>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-red-100/50"></div>
            <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-red-100/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
