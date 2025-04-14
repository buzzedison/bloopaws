"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] mb-16">
        <Image 
          src="/images/services-hero.jpg" // Replace with your hero image
          fill={true}
          objectFit="cover"
          alt="Services Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
          <h1 className="text-6xl font-bold">Our Servicesb</h1>
          <p className="mt-4 text-xl max-w-3xl">
            Elevate your startup with our bespoke services designed to make your vision a reality.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* Service 1: Web Development */}
            <div className="p-8 bg-white shadow rounded">
              <Image 
                src="/images/web-development-icon.svg" // Replace with your Web Development icon
                width={80}
                height={80}
                alt="Web Development Icon"
              />
              <h3 className="mt-4 text-xl font-bold">Web Development</h3>
              <p className="mt-2 text-gray-600">
                Turn your ideas into digital realities with cutting-edge web development solutions.
              </p>
            </div>

            {/* Service 2: Mobile + Product Development */}
            <div className="p-8 bg-white shadow rounded">
              <Image 
                src="/images/mobile-product-icon.svg" // Replace with your Mobile + Product Development icon
                width={80}
                height={80}
                alt="Mobile + Product Development Icon"
              />
              <h3 className="mt-4 text-xl font-bold">Mobile + Product Development</h3>
              <p className="mt-2 text-gray-600">
                Create compelling mobile experiences that captivate your audience.
              </p>
            </div>

            {/* Service 3: Business Development and Fundraising */}
            <div className="p-8 bg-white shadow rounded">
              <Image 
                src="/images/business-fundraising-icon.svg" // Replace with your Business Development and Fundraising icon
                width={80}
                height={80}
                alt="Business Development and Fundraising Icon"
              />
              <h3 className="mt-4 text-xl font-bold">Business Development and Fundraising</h3>
              <p className="mt-2 text-gray-600">
                Fuel your growth with smart business development and fundraising strategies.
              </p>
            </div>

            {/* Service 4: Training */}
            <div className="p-8 bg-white shadow rounded">
              <Image 
                src="/images/training-icon.svg" // Replace with your Training icon
                width={80}
                height={80}
                alt="Training Icon"
              />
              <h3 className="mt-4 text-xl font-bold">Training</h3>
              <p className="mt-2 text-gray-600">
                Equip your team with the skills they need to excel in a fast-paced digital world.
              </p>
            </div>
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

export default About;
