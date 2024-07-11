'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-1 p-8 md:p-20 max-w-xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-red-600"
          >
            Ready to Embrace Digital Transformation?
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-600">
            It's not just about technology—it's about building a smarter, more
            agile business. Download our free template to start your journey
            today.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Download Your Free Digital Transformation Template
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex-1 p-8 md:p-20">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur-2xl opacity-75"></div>
          <Image
            src="/team-collaboration.png"
            alt="Team Collaboration"
            width={800}
            height={600}
            className="relative rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;