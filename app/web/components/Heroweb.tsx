"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroWeb() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-red-700 text-white px-4">
      <div className="flex items-center space-x-4 mb-4">
        {['/images/avatars/1.png', '/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png'].map((src, index) => (
          <Image
            key={index}
            className="w-8 h-8 rounded-full"
            src={src}
            alt={`Avatar ${index + 1}`}
            width={32}
            height={32}
          />
        ))}
        <span className="text-yellow-400">★★★★★</span>
        <span className="text-gray-400">Loved by Founders Globally to Drive Results</span>
      </div>

      <motion.h1
        className="text-7xl font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Web Design That <br/>Converts.
      </motion.h1>

      <p className="text-2xl text-center text-gray-300 mt-4">
        <strong>Design</strong>, <strong>copy</strong>, and <strong>development</strong> crafted to <br/>convert <strong>visitors</strong> into <strong>buyers</strong> on autopilot
      </p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link href="/contact">
          <div className="flex items-center bg-white text-black px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition cursor-pointer">
            <Image 
              src="/images/call-icon.png" 
              alt="Call Icon" 
              width={20} 
              height={20} 
              className="mr-2"
            />
            <span className="font-semibold">Book a Call for Free</span>
          </div>
        </Link>
      </motion.div>

      <p className="text-center text-gray-400 mt-2">
        No obligation. No subscription required.
      </p>
    </section>
  );
}
