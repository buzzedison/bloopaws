"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Services = () => {
    const servicesData = [
        {
            name: 'Web Development',
            image: '/images/web.svg',
            link: '/services/web',
            description: 'Transcend the ordinary with our cutting-edge web development services. We bring your most daring digital visions to life.'
        },
        {
            name: 'Mobile + Product Development',
            image: '/images/mobile.svg',
            link: '/services/mobile',
            description: 'Harness the power of mobile. Our pristine mobile and product development solutions place the future at your fingertips.'
        },
        {
            name: 'Business Development and Fundraising',
            image: '/images/business.svg',
            link: '/services/business',
            description: 'Fuel your venture’s fire with our business development and fundraising expertise. Propel your startup to unimaginable heights.'
        },
        {
            name: 'Training',
            image: '/images/training.svg',
            link: '/services/training',
            description: 'Sharpen your competitive edge with our premier training services. We cultivate a culture of continuous growth and learning.'
        }
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
                    <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} className="text-6xl font-extrabold">
                        Our Services
                    </motion.h1>
                    <motion.p initial={{ y: 50 }} animate={{ y: 0 }} className="mt-4 text-xl max-w-3xl font-light">
                        Elevate your startup with our bespoke services designed to make your vision a reality.
                    </motion.p>
                </div>
            </div>

            {/* Services Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold mb-12 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    {servicesData.map((service, index) => (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-8 border-2 border-gray-200 hover:border-red-500 rounded-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
            key={index}  // Ensure a unique key is provided
        >
            <Image 
                src={service.image}
                width={80}
                height={80}
                alt={`${service.name} Icon`}
            />
            <h3 className="mt-4 text-xl font-extrabold">{service.name}</h3>
            <p className="mt-2 text-gray-600">
                {service.description}
            </p>
            <Link href={service.link} className="mt-4 inline-block text-purple-900 font-semibold hover:underline">
                    Learn More
                
            </Link>
        </motion.div>
    ))}
</div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-red-700 via-red-700 to-red-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-extrabold mb-8">Ready to Elevate Your Startup?</h2>
                    <p className="text-xl mb-8 font-light">
                        Let us turn your big ideas into remarkable success stories.
                    </p>
                    <Link href="/contact">
                        <button className="bg-white text-black px-8 py-3 text-xl font-bold rounded-full hover:bg-opacity-80 transition-colors duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                            Get Started
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
