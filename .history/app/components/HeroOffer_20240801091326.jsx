'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '../../public/images/websiteofferd.png';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroOffer() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white overflow-hidden">
      <motion.div 
        className="md:w-1/2 flex flex-col justify-center px-8 pt-16 pb-0 bg-red-600 text-white"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-md mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Don't Miss Out!
            <br />
            50% Off Website Design & Development
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Our biggest sale ever ends soon.
            <br />
            Get the website you deserve at a price you'll love.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="https://airtable.com/appN08604EcWr0e4L/pagPlniVKUdd9LlZZ/form">
              <motion.button 
                className="bg-white text-red-600 hover:bg-red-100 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Grab this deal
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="md:w-1/2 relative h-screen"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          <Image
            src={heroImage}
            alt="Digital Transformation"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}