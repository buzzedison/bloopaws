'use client'

import React, { useRef } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-white text-black"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Latest Intelligence
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              No fluff. Just actionable insights from the front lines of product development.
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/insight" className="group flex items-center text-lg font-medium hover:text-red-600 transition-colors">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post, idx) => (
            <motion.div
              key={post._id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: "easeOut" }}
            >
              <Link href={`/${post.slug.current}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
                  {post.mainImage && (
                    <Image
                      src={builder.image(post.mainImage).url()}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      alt={post?.mainImage?.alt || 'Post image'}
                      className="transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-red-600">
                    <span>Analysis</span>
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight group-hover:text-red-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 md:hidden text-center">
          <Link href="/insight" className="inline-flex items-center text-lg font-medium hover:text-red-600 transition-colors">
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
