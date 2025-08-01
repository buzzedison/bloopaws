'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaChartLine, FaSmile, FaCogs, FaChartBar, FaCloud, FaRobot, FaShieldAlt, FaUsers } from 'react-icons/fa';

const ChallengeSolution = () => {
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

  const offerings = [
    { icon: FaChartLine, title: "Plan for Success", description: "Strategic planning and roadmap development for your digital journey." },
    { icon: FaSmile, title: "Happy Customers, Every Time", description: "Customer experience optimization through data-driven insights." },
    { icon: FaCogs, title: "Work Smarter, Not Harder", description: "Process automation and optimization for increased efficiency." },
    { icon: FaChartBar, title: "Make Decisions with Confidence", description: "Data analytics and reporting to empower informed decision-making." },
    { icon: FaCloud, title: "Move to the Cloud", description: "Secure and scalable cloud migration solutions." },
    { icon: FaRobot, title: "Automate the Boring Stuff", description: "Robotic process automation to streamline repetitive tasks." },
    { icon: FaShieldAlt, title: "Stay Safe & Secure", description: "Robust cybersecurity solutions to protect your business." },
    { icon: FaUsers, title: "Get Your Team on Board", description: "Digital skills training and change management support." },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.section 
        className="py-16 bg-white"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          The World is Going Digital. Is Your Business Ready?
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Every day, businesses leverage technology to work smarter, connect better, and achieve more. This is digital transformation, and it's no longer optional – it's essential.
        </motion.p>
        <motion.div variants={fadeInUp} className="relative max-w-4xl mx-auto">
          <Image
            src="/images/digital2.png"
            alt="Digital Transformation"
            width={1000}
            height={500}
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </motion.section>

      <motion.section 
        className="py-16 bg-gray-100"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Your Digital Transformation Partner
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We're more than just a technology company. We're your partners in navigating the digital landscape and achieving lasting success.
        </motion.p>
        <motion.div 
          variants={fadeInUp} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {offerings.map((offering, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <offering.icon className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{offering.title}</h3>
              <p className="text-gray-600">{offering.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ChallengeSolution;