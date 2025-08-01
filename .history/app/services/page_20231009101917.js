"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Services = () => {
  const servicesData = [
    { name: 'Web Development', image: '/images/web.svg', link: '/web-development' },
    { name: 'Mobile + Product Development', image: '/images/mobile.svg', link: '/mobile-product-development' },
    { name: 'Business Development and Fundraising', image: '/images/business.svg', link: '/services/business' },
    { name: 'Training', image: '/images/training.svg', link: '/training' }
  ];

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Hero Section */}
      <div className="relative h-[600px] mb-16 overflow-hidden">
        <Image 
          src="/images/back.png" 
          layout="fill"
          objectFit="cover"
          alt="Services Hero"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
          <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} className="text-6xl font-semibold tracking-tight">
            Our Services
          </motion.h1>
          <motion.p initial={{ y: 50 }} animate={{ y: 0 }} className="mt-4 text-xl max-w-3xl">
            Elevate your startup with our bespoke services designed to make your vision a reality.
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {servicesData.map((service, index) => (
              <Link href={service.link} key={index}>
                <motion.a
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 bg-white shadow-lg rounded-lg cursor-pointer transition-all duration-300 hover:shadow-xl">
                  <div className="flex flex-col items-center">
                    <Image 
                      src={service.image}
                      width={80}
                      height={80}
                      alt={`${service.name} Icon`}
                    />
                    <h3 className="mt-4 text-2xl font-semibold text-center">{service.name}</h3>
                  </div>
                  <p className="mt-2 text-gray-600 text-center">
                    We deliver exceptional {service.name.toLowerCase()} solutions tailored to your unique needs.
                  </p>
                </motion.a>
              </Link>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="py-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Elevate Your Startup?</h2>
          <p className="text-xl mb-8">
            Let us turn your big ideas into remarkable success stories.
          </p>
          <Link href="/get-started">
            <a className="inline-block bg-white text-black px-8 py-3 text-xl font-bold rounded-full hover:bg-opacity-80 transition-colors duration-300 cursor-pointer">
              Get Started
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;