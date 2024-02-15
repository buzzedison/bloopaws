"use client"
// components/AICourseDescription.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AICourseDescription() {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">Course Description</h2>
                </motion.div>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/2">
                        <motion.p className="mb-8 text-2xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            What if AI could 2x your business growth in 12 months? This exclusive training shows you how...
                        </motion.p>
                        <motion.p className="text-lg mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            Discover how industry leaders are using AI to:
                            <ul className="list-disc list-inside">
                                <li>Brainstorm groundbreaking new product ideas</li>
                                <li>Create captivating marketing content in seconds</li>
                                <li>Extract game-changing insights from data</li>
                                <li>Never pay for logo design ever again</li>
                            </ul>
                        </motion.p>
                        <motion.p className="text-lg mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            Don't let competitors pull ahead. Join the AI revolution today and fuel game-changing business growth!
                            Limited-time enrollment fee: $45 
                        </motion.p>
                        <motion.p className="text-lg mb-8 font-bold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                            You will finish ready to implement a strategic AI plan tailored to your business. Drive growth by increasing creativity, innovation, and competitive edge.
                            Don't miss this opportunity. Join the AI revolution today and unlock your full business potential.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                            <Link href="https://bloopglobal.ck.page/f1460a0d63" className="inline-block px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded-md shadow-lg hover:bg-red-800 transition-all">Sign Up</Link>
                        </motion.div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
                            <Image className="rounded-2xl" src="/images/aievent.png" width={500} height={500} alt="AI Event" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
