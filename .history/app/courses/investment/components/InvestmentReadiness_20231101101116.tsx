// components/InvestmentReadinessCourse.tsx
"use client"
import Image from "next/image";
import { motion } from 'framer-motion';  // Import framer-motion for animation

export default function InvestmentReadinessCourse() {
    return (
        <div className="py-16 bg-red-100">
            <div className="container mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center mb-16">
                    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Investment Readiness Masterclass</h1>
                        <p className="text-lg mb-8">Let's be real - every business needs money to reach its potential. But landing the right funding can be a challenge without proper preparation.</p>
                        <a href="#waiting-list" className="text-xl font-bold text-red-700">Join the Waiting List →</a>
                    </div>
                    <div className="md:w-1/2">
                        <Image src="/images/investment-readiness.png" width={500} height={500} alt="Investment Readiness" className="rounded-xl"/>
                    </div>
                </div>

                {/* Course Details Section */}
                <div className="bg-red-800 p-8 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                    <ul className="list-disc list-inside mb-8">
                        <li>Creating a rock-solid business plan that gets investors pumped up</li>
                        <li>Making realistic financial projections so you don't over-promise</li>
                        <li>Finding the ideal funding sources for your situation</li>
                        <li>Perfecting your pitch deck and presentation skills</li>
                        <li>Understanding key legal stuff like capitalization, valuation, dilution</li>
                        <li>Negotiating a solid deal so you don't leave money on the table</li>
                    </ul>
                    <p className="text-lg mb-8">You'll walk away ready to score the funding your business deserves. Whether you need angel investors, VC capital, crowdfunding, loans, grants - we've got you covered.</p>
                    <p className="text-lg font-bold mb-4">Tired of scraping by without enough cash? We'll help you get investment ready.</p>
                    <motion.a
                        href="#signup"
                        className="text-2xl font-bold text-white-700"
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
