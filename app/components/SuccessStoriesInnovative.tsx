'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Quote, ChevronRight, ChevronLeft, Star } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

// Define the CaseStudy interface for Sanity data
interface CaseStudy {
  _id: string;
  title: string;
  subtitle: string;
  slug: { current: string };
  result: string;
  description: string;
  quote: string;
  author: string;
  metrics: Array<{ label: string; value: string; period: string }>;
  mainImage: any;
  logo: any;
  tags: string[];
}

// Define the fallback case study interface
interface FallbackCaseStudy {
  id: number;
  title: string;
  subtitle: string;
  result: string;
  description: string;
  quote: string;
  author: string;
  metrics: Array<{ label: string; value: string; period: string }>;
  image: string;
  logo: string;
  link: string;
  tags: string[];
}

// Union type for both case study types
type CaseStudyType = CaseStudy | FallbackCaseStudy;

interface SuccessStoriesProps {
  caseStudies?: CaseStudy[];
}

export default function SuccessStoriesInnovative({ caseStudies = [] }: SuccessStoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeCase, setActiveCase] = useState(0)
  
  // Fallback case studies if none are provided from Sanity
  const fallbackCaseStudies: FallbackCaseStudy[] = [
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
  
  // Use Sanity data if available, otherwise use fallback data
  const displayCaseStudies: CaseStudyType[] = caseStudies.length > 0 ? caseStudies : fallbackCaseStudies
  
  // Early return if no case studies are available
  if (!displayCaseStudies || displayCaseStudies.length === 0) {
    return null
  }
  
  // Ensure we have valid data and activeCase is within bounds
  const currentCaseStudy = displayCaseStudies[activeCase] || displayCaseStudies[0] || fallbackCaseStudies[0]
  const validCaseStudiesCount = displayCaseStudies.length || fallbackCaseStudies.length
  
  const nextCase = () => {
    if (validCaseStudiesCount > 0) {
      setActiveCase((prev) => (prev + 1) % validCaseStudiesCount)
    }
  }
  
  const prevCase = () => {
    if (validCaseStudiesCount > 0) {
      setActiveCase((prev) => (prev - 1 + validCaseStudiesCount) % validCaseStudiesCount)
    }
  }
  
  // Helper function to get image URL based on case study type
  const getImageUrl = (caseStudy: CaseStudyType): string => {
    if ('mainImage' in caseStudy && caseStudy.mainImage) {
      return urlForImage(caseStudy.mainImage).url()
    } else if ('image' in caseStudy) {
      return caseStudy.image
    }
    return '/images/placeholder.svg'
  }
  
  // Helper function to get logo URL based on case study type
  const getLogoUrl = (caseStudy: CaseStudyType): string => {
    if ('logo' in caseStudy) {
      if (typeof caseStudy.logo === 'string') {
        return caseStudy.logo
      } else if (caseStudy.logo) {
        return urlForImage(caseStudy.logo).url()
      }
    }
    return '/images/placeholder-logo.svg'
  }
  
  // Helper function to get case study URL
  const getCaseStudyUrl = (caseStudy: CaseStudyType): string => {
    if ('slug' in caseStudy && caseStudy.slug) {
      return `/casestudies/${caseStudy.slug.current}`
    } else if ('link' in caseStudy) {
      return caseStudy.link
    }
    return '#'
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }
  
  return (
    <section 
      ref={containerRef}
      className="py-20 px-4 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses across industries achieve remarkable results with innovative solutions.
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`case-${activeCase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/2 relative">
                {/* Navigation controls */}
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-500 mr-2">
                    {activeCase + 1} / {validCaseStudiesCount}
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={prevCase}
                      className="bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-200 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </motion.button>
                    <motion.button
                      onClick={nextCase}
                      className="bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-200 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {(currentCaseStudy?.tags || []).map((tag, idx) => (
                    <span 
                      key={`tag-${idx}`}
                      className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Main image */}
                <motion.div 
                  className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <Image 
                    src={getImageUrl(currentCaseStudy)} 
                    alt={currentCaseStudy.title} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    className="transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Logo badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
                    <div className="relative w-12 h-12">
                      <Image 
                        src={getLogoUrl(currentCaseStudy)} 
                        alt={`${currentCaseStudy.title} logo`} 
                        fill 
                        style={{ objectFit: "contain" }} 
                      />
                    </div>
                  </div>
                
                  {/* Result badge */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                    <div className="text-sm font-bold text-red-600">{currentCaseStudy.result}</div>
                  </div>
                </motion.div>
                
                {/* Metrics */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {(currentCaseStudy?.metrics || []).map((metric, idx) => (
                    <motion.div 
                      key={`metric-${idx}`}
                      className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center text-center"
                      whileHover={{ y: -5, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <p className="text-3xl font-bold text-red-600">{metric.value}</p>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-xs text-gray-500">{metric.period}</p>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {(currentCaseStudy?.tags || []).map((tag, idx) => (
                    <motion.span 
                      key={`tag-${idx}`}
                      className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              
              <motion.div 
                className="lg:w-1/2 bg-white rounded-2xl p-8 shadow-xl relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2">{currentCaseStudy.title}</h3>
                      <p className="text-xl text-gray-600">{currentCaseStudy.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-8 text-lg">{currentCaseStudy.description}</p>
                  
                  {/* Quote */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6 relative">
                    <Quote className="absolute text-red-200 w-12 h-12 -top-2 -left-2 opacity-50" />
                    <div className="relative z-10">
                      <p className="text-gray-700 italic mb-4">"{currentCaseStudy.quote}"</p>
                      <p className="text-gray-900 font-medium">{currentCaseStudy.author}</p>
                    </div>
                  </div>
                  
                  <Link prefetch={false} href={getCaseStudyUrl(currentCaseStudy)}>
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
                  
                  {/* Other case studies thumbnails */}
                  <motion.div 
                    className="grid grid-cols-4 gap-2 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {(displayCaseStudies || []).map((caseStudy, idx) => (
                      <motion.div 
                        key={`thumbnail-${idx}`}
                        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${idx === activeCase ? 'ring-2 ring-red-600 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => setActiveCase(idx)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="relative aspect-video">
                          <Image 
                            src={getImageUrl(caseStudy)} 
                            alt={caseStudy.title} 
                            fill 
                            style={{ objectFit: "cover" }} 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-1 left-1 right-1">
                            <p className="text-white text-[10px] font-medium truncate">{caseStudy.title}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
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
          <Link prefetch={false} href="/casestudies">
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
