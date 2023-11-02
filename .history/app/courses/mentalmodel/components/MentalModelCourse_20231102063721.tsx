// components/MentalModelsCourse.tsx
"use client"
import Image from "next/image";
import { motion } from 'framer-motion';  // Import framer-motion for animation

export default function MentalModelsCourse() {
    return (
        <div className="py-16 bg-purple-100">
            <div className="container mx-auto mt-0 md:mt-24 py-24 md:py-12 ">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center mb-16 px-2 md:px-12">
                    <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Mental Models for Business Growth MasterClass</h1>
                        <p className="text-lg mb-8">What if you could make razor-sharp decisions in any situation? See problems from new angles? And think circles around your competition?</p>
                        <a href="#waiting-list" className="text-xl font-bold text-red-700">Join the Waiting List →</a>
                    </div>
                    <div className="md:w-1/2">
                        <Image src="/images/mentalwoman.jpg" width={500} height={500} alt="Mental Models" className="rounded-xl"/>
                    </div>
                </div>

                {/* Course Details Section */}
                <div className="bg-purple-900 p-8 rounded-lg shadow-lg text-white px-2 md:px-12 py-2 md:py-24">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 px-5 md:px-0">Unlock Next-Level Critical Thinking</h2>
                    <ul className="list-disc list-inside mb-8">
                        <li>Approach any problem like a pro</li>
                        <li>Make confident decisions under pressure</li>
                        <li>Generate creative solutions others miss</li>
                        <li>Get the growth-boosting skills top professionals rely on</li>
                    </ul>
                    <p className="text-lg mb-8">Stop struggling and start excelling! Enrol in the Mental Models for Business Growth MasterClass and start making intelligent decisions today.</p>
                    <motion.a
                        href="#signup"
                        className="text-2xl font-bold text-purple-300"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Sign Up for $49 →
                    </motion.a>
                </div>
            </div>
        </div>
    );
}
