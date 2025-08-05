'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Smartphone, Brain, BarChart3, Clock, ArrowRight, Calendar } from 'lucide-react'

export default function PricingInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const services = [
    {
      id: 1,
      title: "SaaS Platform Development",
      timeline: "8-12 weeks",
      description: "Transform your business model into recurring revenue",
      icon: <Code className="w-7 h-7" />,
      features: [
        "React/Node.js applications",
        "User authentication & billing",
        "Admin dashboards & analytics",
        "Launch timeline guaranteed"
      ],
      highlight: "Most Popular"
    },
    {
      id: 2,
      title: "Mobile Apps That Scale",
      timeline: "10-14 weeks", 
      description: "iOS and Android apps built for growth from day one",
      icon: <Smartphone className="w-7 h-7" />,
      features: [
        "React Native cross-platform",
        "In-app purchases & subscriptions",
        "Push notifications & engagement",
        "App store optimization"
      ]
    },
    {
      id: 3,
      title: "AI Business Automations",
      timeline: "4-8 weeks",
      description: "Replace manual tasks with intelligent 24/7 systems",
      icon: <Brain className="w-7 h-7" />,
      features: [
        "Customer service chatbots",
        "Content generation pipelines", 
        "Data analysis & reporting",
        "Lead qualification systems"
      ]
    },
    {
      id: 4,
      title: "Strategic Advisory",
      timeline: "2-4 weeks",
      description: "Beyond development—launch, price, and scale profitably",
      icon: <BarChart3 className="w-7 h-7" />,
      features: [
        "Go-to-market strategy",
        "Revenue model optimization",
        "Investor pitch deck creation",
        "Product-market fit validation"
      ]
    }
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-pink-50"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black inline-block relative">
            Investment & Timeline
            <motion.div 
              className="absolute -bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            />
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            From concept to revenue-generating software in weeks, not months
          </p>
        </motion.div>
        
        {/* Premium services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-200/50 hover:border-red-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/50 to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Elegant top accent line */}
              <motion.div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-500"
                initial={{ width: "30%" }}
                animate={isInView ? { width: "100%" } : { width: "30%" }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
              />
              
              {/* Highlight badge */}
              {service.highlight && (
                <motion.div 
                  className="absolute top-6 right-6 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                  initial={{ scale: 0, rotate: -12 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -12 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {service.highlight}
                </motion.div>
              )}
              
              <div className="relative z-10">
                {/* Elegant header */}
                <div className="mb-8">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center text-red-600 font-semibold mb-4">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-lg">{service.timeline}</span>
                  </div>
                </div>
                
                {/* Premium description */}
                <p className="text-black mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                
                {/* Elegant features list */}
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center text-black"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) + (idx * 0.05) }}
                    >
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Premium CTA button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    Let's Build This
                    <motion.div
                      className="ml-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Premium bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative bg-gradient-to-br from-red-600 via-red-600 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl overflow-hidden">
            {/* Elegant background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,_white_2px,_transparent_2px)] bg-[length:60px_60px]"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">Ready to Build Something Amazing?</h3>
              <p className="text-red-100 mb-10 text-xl max-w-3xl mx-auto leading-relaxed">
                Let's discuss your vision and create a custom development plan that turns your ideas into profitable reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-red-600 hover:bg-red-50 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center text-lg"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="mr-3 w-6 h-6" />
                  Book Strategy Session
                </motion.button>
                
                <motion.button
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 inline-flex items-center text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Our Work
                  <ArrowRight className="ml-3 w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}