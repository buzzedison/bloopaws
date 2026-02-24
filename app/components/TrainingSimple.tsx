'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Users, Calendar, Zap } from 'lucide-react'

export default function TrainingSimple() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const trainings = [
    {
      id: 1,
      title: "AI Mastery Bootcamp",
      description: "Intensive 3-day workshop teaching teams to leverage AI for business operations.",
      icon: <Zap className="w-5 h-5" />,
      details: {
        duration: "3 days",
        participants: "Up to 20",
        nextCohort: "June 15, 2025"
      }
    },
    {
      id: 2,
      title: "Digital Leadership Program",
      description: "Executive training on digital transformation strategy and implementation.",
      icon: <Users className="w-5 h-5" />,
      details: {
        duration: "6 weeks",
        participants: "Up to 15",
        nextCohort: "July 1, 2025"
      }
    },
    {
      id: 3,
      title: "Taskwit Academy Certification",
      description: "Comprehensive certification program for digital product development.",
      icon: <GraduationCap className="w-5 h-5" />,
      details: {
        duration: "12 weeks",
        participants: "Up to 30",
        nextCohort: "August 10, 2025"
      }
    }
  ]
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-red-50 text-red-600 text-sm font-medium px-4 py-1 rounded-full mb-3">
            Level Up Your Team
          </span>
          
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Training & Capacity Building
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Equip your team with the skills they need to thrive in the digital age.
          </p>
        </motion.div>
        
        {/* Training cards - simple, clean layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainings.map((training, idx) => (
            <motion.div
              key={training.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-red-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <div className="p-6">
                <div className="bg-red-50 w-12 h-12 rounded-lg flex items-center justify-center text-red-600 mb-4">
                  {training.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{training.title}</h3>
                <p className="text-gray-600 mb-6">{training.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{training.details.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{training.details.participants}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Next: {training.details.nextCohort}</span>
                    <Link prefetch={false} href="/training" className="text-red-600 font-medium flex items-center hover:text-red-700 transition-colors">
                      Details
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Simple CTA */}
        <motion.div 
          className="mt-16 bg-red-50 rounded-xl p-8 relative overflow-hidden text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h4 className="text-xl font-bold mb-2 text-gray-900">Need a custom training solution?</h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer tailored training programs designed specifically for your organization's needs.
          </p>
          <Link prefetch={false} href="/contact">
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
