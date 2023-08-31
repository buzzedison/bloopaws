"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants 
const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.5 
    }
  },
};

const slideUp = {
  hidden: { 
    y: 50 
  },
  show: {
    y: 0,
    transition: {
      duration: 0.5
    }
  },
};

const Services = () => {

  return (
    <section className="background-color-indigo-100 padding-top-16 padding-bottom-16">
      
      <motion.div 
        className="container max-width-x padding-left-4 padding-right-4"
        initial="hidden"
        whileInView="show"
        viewport-once="true"
      >

        <motion.h2
          variants={slideUp}
          className="text-size-4xl font-bold text-align-center"  
        >
          What We Offer
        </motion.h2>

        <motion.div
          className="grid grid-columns-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport-once="true" 
        >
        
          {/* Web Development */}
          <motion.div variants={fadeIn} className="background-color-white padding-6 rounded shadow-lg grid-column-span-2">
            <Image
              src="/icons/web.svg" 
              width="80"
              height="80"
              alt="Web icon"
            />

            <h3 className="margin-top-6 font-bold text-size-xl">Web Development</h3>

            <p className="text-color-gray-600 margin-top-2">
              Custom web solutions crafted just for you.
            </p>
          </motion.div>
        
          {/* Middle wider column */}
          <motion.div variants={fadeIn} className="background-color-white padding-6 rounded shadow-lg grid-column-span-4">
          
            {/* Service content */}
          
          </motion.div>
          
          {/* Other cards */}
        
        </motion.div>

      </motion.div>
      
    </section>
  )
}

export default Services;