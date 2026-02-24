'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall } from 'lucide-react'

const avatars = ['/images/avatars/1.png', '/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png']

export default function HeroWeb() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-red-700 text-white px-4 py-8">
      <div className="flex flex-wrap justify-center items-center mb-4">
        {avatars.map((src, index) => (
          <Image
            key={index}
            className="w-8 h-8 rounded-full m-1"
            src={src}
            alt={`Avatar ${index + 1}`}
            width={32}
            height={32}
          />
        ))}
        <div className="w-full text-center mt-2">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-gray-400 text-sm ml-2">Loved by Founders Globally</span>
        </div>
      </div>

      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Web Design That <br />Converts.
      </motion.h1>

      <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-300 mt-4">
        <strong>Design</strong>, <strong>copy</strong>, and <strong>development</strong> crafted to convert <br />
        <strong>visitors</strong> into <strong>buyers</strong> on autopilot
      </p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link prefetch={false} href="/contact" className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
          <PhoneCall className="w-5 h-5 mr-2" />
          <span className="font-bold text-lg">Book a Free Call</span>
        </Link>
      </motion.div>

      <p className="text-center text-gray-400 mt-2 text-sm">
        No obligation. No subscription required.
      </p>
    </section>
  )
}