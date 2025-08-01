'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '../../public/images/websiteofferd.png';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroOffer() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-white">
      <div className="md:w-1/2 flex flex-col justify-center px-8 pt-16 pb-0 bg-red-600 text-white">
        <div className="max-w-md mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          >
            Don't Miss Out!
            50% Off Website Design & Development
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            Our biggest sale ever ends soon.
            Get the website you deserve at a price you'll love.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            <Link href="https://airtable.com/appN08604EcWr0e4L/pagPlniVKUdd9LlZZ/form">
              <motion.button
                className="bg-white text-red-600 hover:bg-red-100 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Grab this deal
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="md:w-1/2 relative h-screen">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <Image
            src={heroImage}
            alt="Digital Transformation"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
