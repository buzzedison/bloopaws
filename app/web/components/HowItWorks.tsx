"use client"
import { motion } from 'framer-motion';
import React from 'react';

const HowItWorks = () => {
  return (
    <motion.section 
      className="bg-gradient-to-r from-red-800 to-red-900 text-white py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold mb-10 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
    How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="bg-white text-red-900 p-10 rounded-lg shadow-lg"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-5">In-Depth Market Research</h3>
            <p className="text-lg">
              We analyze your competitors, audience, and market trends to craft a strategy that meets your business goals.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white text-red-900 p-10 rounded-lg shadow-lg"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-5">Custom Copy & Design</h3>
            <p className="text-lg">
              We develop engaging copy and design that align with your brand and convert visitors into customers.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white text-red-900 p-10 rounded-lg shadow-lg md:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-5">Launch & Optimize</h3>
            <p className="text-lg">
              We launch your site and provide ongoing support to refine and scale your business.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <svg className="h-10 w-10 mx-auto mb-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-lg">Secure payments through Stripe/Paystack</p>
          </div>

          <div className="text-center">
            <svg className="h-10 w-10 mx-auto mb-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg">Communicate via Asana</p>
          </div>

          <div className="text-center">
            <svg className="h-10 w-10 mx-auto mb-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">Delivered with Figma, JavaScript frameworks, or WordPress</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;