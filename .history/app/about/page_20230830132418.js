"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const iconVariants = {
  offscreen: { scale: 0 },
  onscreen: { 
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] mb-16">
        <Image 
          src="/images/back.png"
          fill={true}
          objectFit="cover"
          alt="About hero"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
          <h1 className="text-6xl font-bold">What We Do</h1>
          
          <p className="mt-4 text-xl max-w-3xl">
            We guide visionary startups by illuminating strategy, defining winning plans, markets, and roadmaps. We help build winning products every step of the way from brainstorming to launch.
          </p>
        </div>
      </div>

      {/* How We Do It Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center">
            How We Do It
          </motion.h2>
          
          <div className="flex flex-wrap -mx-4">
            {/* Card 1 */}
            <motion.div 
              className="w-full md:w-1/2 px-4 mb-8"
              initial="offscreen"
              animate="onscreen"
              variants={cardVariants}>
              <div className="p-8 bg-white hover:bg-opacity-75 shadow rounded">
                <motion.div variants={iconVariants}>
                  {/* Your SVG for Big Ideas */}
                </motion.div>
                <h3 className="mt-4 text-xl font-bold">Big Ideas</h3>
                
                <p className="mt-2 text-gray-600">
                  We hunt big, world-changing ideas and help them take flight.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="w-full md:w-1/2 px-4 mb-8"
              initial="offscreen"
              animate="onscreen"
              variants={cardVariants}>
              <div className="p-8 bg-white hover:bg-opacity-75 shadow rounded">
                <motion.div variants={iconVariants}>
                  <Image 
                    src="/images/teamnew.svg"
                    width={80}
                    height={80}
                    alt="Assemble the Team icon"
                  />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold">Assemble the Team</h3>
                
                <p className="mt-2 text-gray-600">
                  We rally the right team to fuel the journey, raise funds, and make the vision take flight.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="w-full md:w-1/2 px-4 mb-8"
              initial="offscreen"
              animate="onscreen"
              variants={cardVariants}>
              <div className="p-8 bg-white hover:bg-opacity-75 shadow rounded">
                <motion.div variants={iconVariants}>
                  <Image 
                    src="/images/fuel.svg"
                    width={80}
                    height={80}
                    alt="Fuel the Journey icon"
                  />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold">Fuel the Journey</h3>
                
                <p className="mt-2 text-gray-600">
                  We provide hands-on support to build, launch, and rapidly grow successful companies.
                </p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              className="w-full md:w-1/2 px-4 mb-8"
              initial="offscreen"
              animate="onscreen"
              variants={cardVariants}>
              <div className="p-8 bg-white hover:bg-opacity-75 shadow rounded">
                <motion.div variants={iconVariants}>
                  <Image 
                    src="/images/driveresults.svg"
                    width={80}
                    height={80}
                    alt="Drive Results icon"
                  />
                </motion.div>
                <h3 className="mt-4 text-xl font-bold">Drive Results</h3>
                
                <p className="mt-2 text-gray-600">
                  Our goal is to build businesses that can compete with the biggest names in the world.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Helping Brands Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Helping Brands</h2>
          
          <div className="max-w-lg mx-auto p-8 bg-white shadow rounded">
            <h3 className="text-2xl font-bold mb-4"># Idea To Company</h3>
            
            <p className="text-gray-600">
              At Bloop Global, we partner with top talent to invest in, build, and grow successful companies. Our mission is to tackle big problems, create products people love, and build businesses that compete globally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
