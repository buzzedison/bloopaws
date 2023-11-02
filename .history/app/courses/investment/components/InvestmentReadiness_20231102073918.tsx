// components/InvestmentReadinessCourse.tsx
"use client"
import Image from "next/image";
import { motion } from 'framer-motion';  // Import framer-motion for animation

export default function InvestmentReadinessCourse() {
    return (
        <div className="py-16 bg-red-100">
            <div className="container mx-auto mt-24 ">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center mb-16 px-0">
                    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 pl-0 md:pl-12">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Investment Readiness Masterclass</h1>
                        <p className="text-lg mb-8 pr-0 md:pr-24">Let's be real - every business needs money to reach its potential. But landing the right funding can be a challenge without proper preparation.</p>
                        <a href="#waiting-list" className="text-xl font-bold text-red-700">Join the Waiting List →</a>
                    </div>
                    <div className="md:w-1/2">
                        <Image src="/images/investmannew.jpg" width={500} height={500} alt="Investment Readiness" className="rounded-xl"/>
                    </div>
                </div>

                {/* Course Details Section */}
                <div className="bg-red-800 p-10 rounded-lg shadow-lg text-white px-2 md:px-12 py-12 md:py-24">
                    <h2 className="text-3xl font-bold mb-4 mt-12 md:mt-0 pl-8 md:pl-0">What You'll Learn</h2>
                    <ul className="list-disc list-inside mb-8 pl-8 md:pl-6 pr-1 md:pr-0">
                        <li>Creating a rock-solid business plan that gets investors pumped up</li>
                        <li>Making realistic financial projections so you don't over-promise</li>
                        <li>Finding the ideal funding sources for your situation</li>
                        <li>Perfecting your pitch deck and presentation skills</li>
                        <li>Understanding key legal stuff like capitalization, valuation, dilution</li>
                        <li>Negotiating a solid deal so you don't leave money on the table</li>
                    </ul>
                    <p className="text-lg mb-8 pl-8 md:pl-0">You'll walk away ready to score the funding your business deserves. Whether you need angel investors, VC capital, crowdfunding, loans, grants - we've got you covered.</p>
                    <p className="text-lg font-bold mb-4 pl-8 md:pl-0 ">Tired of scraping by without enough cash? We'll help you get investment ready.</p>
                    <motion.a
                        href="#signup"
                        className="text-2xl font-bold text-red-200 pl-8 md:pl-0 pb-12 md:pb-0"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Sign Up for $29 →
                    </motion.a>
                </div>
            </div>
        </div>
    );
}
