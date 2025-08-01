'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Pen, Briefcase, Calendar, LucideIcon } from 'lucide-react'
import Link from 'next/link'

export default function ProductShowcase() {
  return (
    <div className="bg-white py-24 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
          We Walk the Talk. Our Products
          </h2>
          <p className="text-base text-gray-600">
            Innovative solutions we've built and launched
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard
            title="CrowdPen"
            description="Empowering creators to monetize their content"
            icon={<Pen className="w-5 h-5" />}
            delay={0.1}
            link="https://www.crowdpen.co"
          />
          <ProductCard
            title="TaskWit"
            description="Assemble high-performing teams for your projects"
            icon={<Briefcase className="w-5 h-5" />}
            delay={0.2}
            link="https://www.taskwit.co"
          />
          <ProductCard
            title="Ding"
            description="Streamlined online appointment booking"
            icon={<Calendar className="w-5 h-5" />}
            delay={0.3}
            link="#"
          />
        </div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactElement<LucideIcon>;
  delay: number;
  link: string;
}

function ProductCard({ title, description, icon, delay, link }: ProductCardProps) {
  return (
    <motion.div
      className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="bg-red-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <Link href={link} passHref>
        <button className="group w-full bg-red-500 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-300 hover:bg-red-600">
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </Link>
    </motion.div>
  )
}