'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, GraduationCap, Users, Calendar, Zap } from 'lucide-react'

export default function TrainingInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const trainings = [
    {
      id: 1,
      title: "AI Mastery Bootcamp",
      description: "Intensive 3-day workshop teaching teams to leverage AI for business operations and productivity.",
      image: "/images/bloopaitool.png",
      icon: <Zap className="w-5 h-5" />,
      color: "from-red-600 to-red-500",
      details: {
        duration: "3 days",
        participants: "Up to 20",
        nextCohort: "June 15, 2025"
      },
      features: [
        "Hands-on AI tools training",
        "Custom prompting techniques",
        "Workflow automation",
        "ROI measurement framework"
      ]
    },
    {
      id: 2,
      title: "Digital Leadership Program",
      description: "Executive training on digital transformation strategy and implementation for forward-thinking leaders.",
      image: "/images/bloopleader.png",
      icon: <Users className="w-5 h-5" />,
      color: "from-red-500 to-red-400",
      details: {
        duration: "6 weeks",
        participants: "Up to 15",
        nextCohort: "July 1, 2025"
      },
      features: [
        "Digital strategy development",
        "Change management",
        "Technology evaluation",
        "Innovation frameworks"
      ]
    },
    {
      id: 3,
      title: "Taskwit Academy Certification",
      description: "Comprehensive certification program for digital product development and management excellence.",
      image: "/images/blooptaskwit.png",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-red-700 to-red-600",
      details: {
        duration: "12 weeks",
        participants: "Up to 30",
        nextCohort: "August 10, 2025"
      },
      features: [
        "Product strategy & roadmapping",
        "UX/UI fundamentals",
        "Agile development practices",
        "Product analytics & optimization"
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
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        <motion.div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full border-2 border-red-200/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-16 right-16 w-64 h-64 rounded-full border-2 border-red-200/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        ></motion.div>
        
        <svg className="absolute bottom-0 left-0 w-full h-32 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="0.1"></path>
        </svg>
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
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md">
              Level Up Your Team
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 mt-4 relative inline-block"
            variants={itemVariants}
          >
            Training & Capacity Building
            <motion.div 
              className="absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r from-red-600 to-red-400 w-full rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto text-lg mt-6"
            variants={itemVariants}
          >
            Equip your team with the skills they need to thrive in the digital age. 
            Our training programs are designed to deliver immediate impact and long-term transformation.
          </motion.p>
        </motion.div>
        
        {/* Innovative staggered card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured training - takes up more space */}
          <motion.div 
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-full flex flex-col group border border-gray-100">
              <div className="relative h-72 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${trainings[0].color} opacity-90 z-10`}></div>
                <Image 
                  src={trainings[0].image || "/images/default-training.jpg"} 
                  alt={trainings[0].title} 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="transition-transform duration-700 group-hover:scale-105 mix-blend-overlay"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mr-4 w-14 h-14 flex items-center justify-center">
                      <div className="text-white">
                        {trainings[0].icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{trainings[0].title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-700 mb-6 text-lg">{trainings[0].description}</p>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-900 mb-3">What you'll learn:</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trainings[0].features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <div className="text-red-600 mr-2 mt-0.5">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
                  <div className="text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-red-600" />
                    <span className="block text-sm font-medium text-gray-500">Duration</span>
                    <span className="block font-bold">{trainings[0].details.duration}</span>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-red-600" />
                    <span className="block text-sm font-medium text-gray-500">Group Size</span>
                    <span className="block font-bold">{trainings[0].details.participants}</span>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-red-600" />
                    <span className="block text-sm font-medium text-gray-500">Next Cohort</span>
                    <span className="block font-bold">{trainings[0].details.nextCohort}</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Link prefetch={false} href="/training">
                    <motion.button 
                      className={`bg-gradient-to-r ${trainings[0].color} text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center w-full`}
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Secondary trainings - vertical stack */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {trainings.slice(1).map((training, idx) => (
              <motion.div 
                key={`training-${training.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col h-full group border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.2 * (idx + 1), ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative h-40 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${training.color} opacity-90 z-10`}></div>
                  <Image 
                    src={training.image || "/images/default-training.jpg"} 
                    alt={training.title} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    className="transition-transform duration-700 group-hover:scale-105 mix-blend-overlay"
                  />
                  
                  <div className="absolute top-0 left-0 w-full h-full z-20 p-4 flex items-start">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <div className="text-white">
                        {training.icon}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{training.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{training.description}</p>
                  
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {training.features.slice(0, 2).map((feature, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <div className="text-red-600 mr-2 mt-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4 bg-gray-50 p-2 rounded-lg">
                    <div>
                      <span className="block text-gray-500 text-xs">Duration</span>
                      <span className="font-medium">{training.details.duration}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs">Next Cohort</span>
                      <span className="font-medium text-red-600">{training.details.nextCohort}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link prefetch={false} href="/training">
                      <motion.button 
                        className={`bg-gradient-to-r ${training.color} text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center w-full`}
                        whileHover={{ scale: 1.02, boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-2xl font-bold mb-2">Custom Training Programs</h4>
              <p className="text-white/90">Need a tailored training solution for your organization?</p>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span className="text-sm text-white/80">Customized curriculum</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                  <span className="text-sm text-white/80">On-site or remote</span>
                </div>
              </div>
            </div>
            <Link prefetch={false} href="/contact">
              <motion.button 
                className="bg-white text-red-600 font-semibold py-3 px-8 rounded-xl shadow-md transition-all flex items-center justify-center whitespace-nowrap"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5"></div>
            <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-white/5"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
