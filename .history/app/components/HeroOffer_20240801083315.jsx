import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 overflow-hidden">
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          className="lg:w-1/2 text-white z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Don't Miss Out!
            <span className="block text-yellow-300 mt-2">50% Off Website Design & Development</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-xl">
            Our biggest sale ever ends soon. Get the website you deserve at a price you'll love.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="https://airtable.com/appN08604EcWr0e4L/pagPlniVKUdd9LlZZ/form">
              <a className="inline-block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                Grab This Deal
              </a>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 mt-12 lg:mt-0 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="/images/websiteoffer.png"
              alt="Website Design Illustration"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['100%', '200%'],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{
            backgroundImage: 'url("/images/pattern.svg")',
          }}
        />
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </section>
  );
};

export default HeroSection;