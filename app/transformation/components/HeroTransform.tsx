'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 overflow-hidden">
        <motion.div 
          className="flex-1 p-4 sm:p-8 lg:p-12 max-w-2xl mx-auto lg:mx-0"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-red-600 mb-6 text-center lg:text-left"
          >
            Embrace Digital Transformation
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-red-800 text-lg sm:text-xl mb-8 text-center lg:text-left">
            Build a smarter, more agile business. Start your journey with our free template today.
          </motion.p>
          <motion.div variants={fadeInUp} className="text-center lg:text-left">
           <Link prefetch={false} href="https://airtable.com/appN08604EcWr0e4L/pagyheDh7PwWuFRkp/form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            >
              Get Your Free Template
            </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex-1 p-4 sm:p-8 lg:p-12 mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <div className="relative max-w-md mx-auto lg:max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur-2xl opacity-30 transform rotate-3"></div>
            <Image
              src="/images/digital2.png"
              alt="Team Collaboration"
              width={700}
              height={600}
              className="relative rounded-2xl shadow-2xl transform -rotate-3 transition-transform duration-300 hover:rotate-0"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;