'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Quote, ChevronRight, ChevronLeft, Star } from 'lucide-react'

export default function SuccessStoriesInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeCase, setActiveCase] = useState(0)
  
  const caseStudies = [
    {
      id: 1,
      title: "Crowdpen",
      subtitle: "Creator platform",
      result: "1,500 beta users in 60 days",
      description: "We helped Crowdpen build a platform that connects content creators with their audience through innovative monetization tools.",
      quote: "Bloop transformed our idea into a thriving platform. Their approach to product development was exceptional.",
      author: "Kofi Mensah, Founder",
      metrics: [
        { label: "User Growth", value: "150%", period: "Month-over-Month" },
        { label: "Retention", value: "87%", period: "After 30 Days" },
        { label: "Revenue", value: "$25K", period: "First Quarter" }
      ],
      image: "/images/crowdpenweb.png",
      logo: "/images/crowdpen.webp",
      link: "/casestudies/crowdpen",
      tags: ["Product Development", "UI/UX Design", "Growth Strategy"]
    },
    {
      id: 2,
      title: "AgriPro Hub",
      subtitle: "Knowledge hub",
      result: "AI-powered agribusiness answers",
      description: "We built a specialized knowledge base with pre-trained AI models to provide instant answers to agribusiness questions.",
      quote: "The AI solution Bloop created has revolutionized how farmers access critical information in our region.",
      author: "Ama Darko, CEO",
      metrics: [
        { label: "Questions Answered", value: "10K+", period: "Per Month" },
        { label: "Accuracy", value: "94%", period: "Verified Responses" },
        { label: "User Base", value: "5,000+", period: "Active Farmers" }
      ],
      image: "/images/agriproai.png",
      logo: "/images/logoagripro.png",
      link: "/casestudies/agripro",
      tags: ["AI Implementation", "Data Engineering", "Mobile App"]
    },
    {
      id: 3,
      title: "Taskify",
      subtitle: "Internal tool",
      result: "Replaced 3 tools for 20+ agencies",
      description: "We developed a unified workspace that replaced Slack, Trello, and Notion, streamlining operations for digital agencies.",
      quote: "Our productivity increased by 40% after implementing Taskify across our organization.",
      author: "Daniel Osei, Operations Director",
      metrics: [
        { label: "Time Saved", value: "15 hrs", period: "Per Employee/Month" },
        { label: "Tool Consolidation", value: "3-in-1", period: "Platform" },
        { label: "Adoption Rate", value: "98%", period: "Within 2 Weeks" }
      ],
      image: "/images/case-taskify.jpg",
      logo: "/images/logo-taskify.png",
      link: "/casestudies/taskify",
      tags: ["SaaS Development", "Workflow Automation", "Enterprise Solution"]
    },
    {
      id: 4,
      title: "Loudspeaker",
      subtitle: "Feedback platform",
      result: "Actionable insights from customers",
      description: "We created a comprehensive feedback platform that helps businesses collect, analyze, and act on customer insights.",
      quote: "Loudspeaker has transformed how we understand our customers. The insights are invaluable.",
      author: "Priscilla Owusu, Customer Experience Lead",
      metrics: [
        { label: "Response Rate", value: "78%", period: "Average" },
        { label: "Insights Generated", value: "200+", period: "Per Campaign" },
        { label: "Customer Satisfaction", value: "+35%", period: "Improvement" }
      ],
      image: "/images/case-loudspeaker.jpg",
      logo: "/images/logo-loudspeaker.png",
      link: "/casestudies/loudspeaker",
      tags: ["Data Analytics", "Customer Experience", "Dashboard Design"]
    }
  ]
  
  const nextCase = () => {
    setActiveCase((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
  }
  
  const prevCase = () => {
    setActiveCase((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
  }
  
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
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
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
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="flex justify-between items-end flex-wrap gap-y-6" variants={itemVariants}>
            <div>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                Success Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
                Our Impact
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-red-600 w-full rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                ></motion.div>
              </h2>
            </div>
            
            {/* Navigation controls */}
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-500 mr-2">
                {activeCase + 1} / {caseStudies.length}
              </div>
              <div className="flex space-x-2">
                <motion.button
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                  onClick={prevCase}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                  onClick={nextCase}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Featured case study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`case-${activeCase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left column - Image and metrics */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.div 
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <Image 
                  src={caseStudies[activeCase].image} 
                  alt={caseStudies[activeCase].title} 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="transition-transform duration-700 hover:scale-105"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Logo overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
                  <div className="relative w-12 h-12">
                    <Image 
                      src={caseStudies[activeCase].logo || "/images/default-logo.png"} 
                      alt={`${caseStudies[activeCase].title} logo`} 
                      fill 
                      style={{ objectFit: "contain" }} 
                    />
                  </div>
                </div>
                
                {/* Result badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                  <div className="text-sm font-bold text-red-600">{caseStudies[activeCase].result}</div>
                </div>
              </motion.div>
              
              {/* Metrics cards */}
              <motion.div 
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {caseStudies[activeCase].metrics.map((metric, idx) => (
                  <motion.div 
                    key={`metric-${idx}`}
                    className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{metric.label}</div>
                    <div className="text-xs text-gray-500">{metric.period}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Tags */}
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {caseStudies[activeCase].tags.map((tag, idx) => (
                  <motion.span 
                    key={`tag-${idx}`}
                    className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            
            {/* Right column - Content */}
            <div className="lg:col-span-7 flex flex-col">
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-xl mb-6 relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2">{caseStudies[activeCase].title}</h3>
                      <p className="text-xl text-gray-600">{caseStudies[activeCase].subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-8 text-lg">{caseStudies[activeCase].description}</p>
                  
                  {/* Quote */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 relative">
                    <Quote className="absolute text-red-200 w-12 h-12 -top-2 -left-2 opacity-50" />
                    <div className="relative z-10">
                      <p className="text-gray-700 italic mb-4">"{caseStudies[activeCase].quote}"</p>
                      <p className="text-gray-900 font-medium">{caseStudies[activeCase].author}</p>
                    </div>
                  </div>
                  
                  <Link href={caseStudies[activeCase].link}>
                    <motion.button 
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Full Case Study
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
                
                {/* Background pattern */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full border border-red-200/20 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full border border-red-200/20 pointer-events-none"></div>
              </motion.div>
              
              {/* Other case studies thumbnails */}
              <motion.div 
                className="grid grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {caseStudies.map((caseStudy, idx) => (
                  <motion.div 
                    key={`thumbnail-${idx}`}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${idx === activeCase ? 'ring-2 ring-red-600 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setActiveCase(idx)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative aspect-video">
                      <Image 
                        src={caseStudy.image} 
                        alt={caseStudy.title} 
                        fill 
                        style={{ objectFit: "cover" }} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium truncate">{caseStudy.title}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/case-studies">
            <motion.button 
              className="bg-black border border-black text-white hover:bg-black/90 font-semibold py-3 px-8 rounded-full shadow-sm transition-all inline-flex items-center group"
              whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ y: 0, boxShadow: "0 5px 10px -5px rgba(0, 0, 0, 0.1)" }}
            >
              View All Case Studies
              <motion.span
                className="ml-2 group-hover:translate-x-1 transition-transform"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
