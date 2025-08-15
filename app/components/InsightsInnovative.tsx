'use client'

import React, { useRef } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BookOpen, TrendingUp, Lightbulb } from 'lucide-react'
import { SanityDocument } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "../../sanity/lib/client"

const builder = imageUrlBuilder(client)

interface InsightsInnovativeProps {
  posts: SanityDocument[]
}

export default function InsightsInnovative({ posts }: InsightsInnovativeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const icons = [
    <TrendingUp key="trending" className="w-6 h-6" />,
    <BookOpen key="book" className="w-6 h-6" />,
    <Lightbulb key="lightbulb" className="w-6 h-6" />
  ]

  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-red-50"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-100 opacity-70">
            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.3,81.4,26.6,73.6,38.6C65.8,50.6,55.7,61.3,43.7,67.8C31.7,74.3,17.8,76.7,2.9,72.9C-12,69.1,-26,59.1,-36.4,48.8C-46.8,38.5,-53.6,27.8,-60.9,15.5C-68.2,3.2,-76,-10.7,-76.2,-24.8C-76.4,-38.9,-69,-53.2,-57.4,-61.5C-45.8,-69.8,-29.9,-72.1,-15.5,-70.8C-1.1,-69.5,12,-69.6,25.9,-73.1C39.8,-76.6,54.5,-83.5,69.2,-83.7C83.8,-83.9,98.4,-77.4,113,-71Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-200 opacity-50">
            <path fill="currentColor" d="M39.9,-65.7C54.3,-60,70.2,-53.8,79.9,-42.1C89.7,-30.4,93.2,-13.2,89.8,2.5C86.3,18.2,75.9,32.4,65.1,45.2C54.2,58,42.9,69.4,29.3,75.2C15.7,81,0.8,81.2,-13.3,77.7C-27.4,74.2,-40.6,67,-52.5,57.1C-64.4,47.2,-74.9,34.6,-79.2,20.1C-83.5,5.7,-81.5,-10.7,-75.3,-24.9C-69.1,-39.1,-58.7,-51.1,-46.1,-57.7C-33.5,-64.3,-18.8,-65.5,-3.7,-69.8C11.3,-74.1,22.7,-81.5,34,-78.2C45.3,-74.9,56.7,-61,67.9,-47.1C79.2,-33.2,90.4,-19.3,93.8,-3.4C97.1,12.5,92.7,30.4,83.5,44.7C74.4,59,60.5,69.7,45.4,76.6C30.3,83.5,14,86.6,-1.3,88.8C-16.6,91,-33.2,92.3,-47.4,87C-61.7,81.7,-73.6,69.8,-81.2,55.6C-88.8,41.3,-92.1,24.7,-91.9,8.7C-91.7,-7.3,-88,-22.7,-80.1,-35.2C-72.2,-47.7,-60.1,-57.2,-46.6,-63.1C-33.1,-69,-16.6,-71.3,-0.9,-69.9C14.8,-68.6,29.5,-63.7,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header with staggered animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Growth Isn't Magic.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
              It's a Playbook.
            </span>
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
            Big growth comes from getting a thousand small things right. We've been in the trenches, made the mistakes, and found what works—and we wrote it all down. This is our collection of no-BS insights, actionable guides, and lessons learned the hard way.
          </p>
        </motion.div>
        
        {/* Posts grid with staggered animation and enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {posts.map((post, idx) => (
            <motion.div
              key={post._id}
              className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                idx === 0 ? 'md:col-span-12' : 'md:col-span-6'
              } border border-gray-100 group`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -10 }}
            >
              <div className={`flex flex-col ${idx === 0 ? 'md:flex-row' : ''}`}>
                <div className={`relative ${idx === 0 ? 'md:w-1/2' : 'h-[250px]'} w-full`}>
                  {post.mainImage && (
                    <Image
                      src={builder.image(post.mainImage).url()}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      alt={post?.mainImage?.alt || 'Post image'}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-red-600 text-white p-3 rounded-full shadow-lg">
                    {icons[idx % icons.length]}
                  </div>
                </div>
                
                <div className={`p-8 ${idx === 0 ? 'md:w-1/2' : 'w-full'}`}>
                  <Link href={`/${post.slug.current}`} className="block">
                    <h3 className={`${idx === 0 ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 hover:text-red-600 transition duration-300 mb-4`}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-red-600 font-semibold group/button">
                      Read More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA button with animation */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <Link href="/insight">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg inline-flex items-center">
              Explore More Insights
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
