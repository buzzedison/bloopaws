'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Bot, LineChart, GraduationCap } from 'lucide-react'

export default function ServicesInnovative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // Service data with authoritative copy
  const services = [
    {
      id: 1,
      title: "The Silent Workforce",
      subtitle: "AI & Intelligent Automation",
      description: "Deploy autonomous agents that work 24/7, predicting trends and executing complex workflows while you sleep.",
      icon: <Bot />,
    },
    {
      id: 2,
      title: "Digital Infrastructure",
      subtitle: "Web & Mobile Platforms",
      description: "Scalable platforms engineered to handle millions of users without blinking. Speed, security, and stability as standard.",
      icon: <Code />,
    },
    {
      id: 3,
      title: "The War Room",
      subtitle: "Strategy & Fundraising",
      description: "Market-piercing strategies and financial modeling that turn investor skepticism into 'where do I sign?'.",
      icon: <LineChart />,
    },
    {
      id: 4,
      title: "Internal Capability",
      subtitle: "Training & Enablement",
      description: "We don't just build it for you; we train your team to wield it. Complete knowledge transfer and operational mastery.",
      icon: <GraduationCap />,
    }
  ]

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-white text-black"
    >
      {/* Architectural Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
        {/* Large Circles */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border-[1px] border-black rounded-full"></div>
        <div className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] border-[1px] border-black rounded-full border-dashed"></div>
        {/* Diagonal Lines */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[linear-gradient(45deg,transparent_49%,#000_49%,#000_51%,transparent_51%)] bg-[size:20px_20px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-24">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-black"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            We Don't Just Write Code.<br />
            <span className="text-red-600">We Engineer Dominance.</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={subtitleVariants}
          >
            Your vision requires more than a website. It demands a digital fortress—built on bulletproof logic, seductive design, and strategy that ignores the competition.
          </motion.p>
        </div>

        {/* 3D Card Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/services">
            <button className="group relative overflow-hidden bg-black text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <span className="relative z-10 flex items-center text-lg">
                Explore Our Capabilities
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="w-5 h-5 text-red-500" />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gray-900 group-hover:bg-red-600 transition-colors duration-300"></div>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    setRotateX(yPct * -10) // Max rotation 5 degrees
    setRotateY(xPct * 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className="relative h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        className="relative h-full bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg overflow-hidden group"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Depth Layer (Reveal on hover) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-20px)" }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between items-start mb-8">
            <div className="bg-black p-4 rounded-2xl group-hover:bg-red-600 transition-colors duration-300 shadow-md">
              {React.cloneElement(service.icon, { className: "w-8 h-8 text-white" })}
            </div>
            <div className="text-4xl font-bold text-gray-100 group-hover:text-red-50 transition-colors duration-300 select-none">
              0{service.id}
            </div>
          </div>

          <div className="mb-2">
            <span className="text-red-600 font-bold tracking-wider text-sm uppercase mb-2 block">
              {service.subtitle}
            </span>
            <h3 className="text-3xl font-bold text-black mb-4 group-hover:translate-x-1 transition-transform duration-300">
              {service.title}
            </h3>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow group-hover:text-gray-900 transition-colors duration-300">
            {service.description}
          </p>

          <div className="flex items-center text-black font-bold group-hover:text-red-600 transition-colors duration-300">
            <span>Deploy</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
