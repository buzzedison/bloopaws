"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] mb-16">
        <Image 
          src="/images/back.png" // Replace with your hero image
          fill={true}
          objectFit="cover"
          alt="Services Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
          <h1 className="text-6xl font-bold">Our Services</h1>
          <p className="mt-4 text-xl max-w-3xl">
            Elevate your startup with our bespoke services designed to make your vision a reality.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* ... (existing code for each service card) */}
            {['Web Development', 'Mobile + Product Development', 'Business Development and Fundraising', 'Training'].map((service, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <Image 
                  src={`/images/${service.toLowerCase().replace(/\s+/g, '-')}-icon.svg`} // Dynamic icon URL
                  width={80}
                  height={80}
                  alt={`${service} Icon`}
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900">{service}</h3>
                <p className="mt-2 text-gray-600">
                  {/* Placeholder text - you can replace this with specific descriptions for each service */}
                  We deliver exceptional {service.toLowerCase()} solutions tailored to your unique needs.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Elevate Your Startup?</h2>
          <p className="text-xl mb-8">
            Let's turn your big ideas into remarkable success stories.
          </p>
          <button className="bg-white text-black px-8 py-3 text-xl font-bold rounded-full hover:bg-opacity-80">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
