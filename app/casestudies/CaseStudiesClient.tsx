'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import { ArrowRight, Target, Database, Lock, Terminal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define TypeScript interfaces
interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
    };
    alt?: string;
}

interface CaseStudy {
    _id?: string;
    title: string;
    subtitle?: string;
    slug: { current: string };
    result?: string;
    description?: string;
    mainImage?: SanityImage;
    fallbackImage?: string;
    tags?: string[];
    excerpt?: string;
}

interface CaseStudiesClientProps {
    caseStudies: CaseStudy[];
}

export default function CaseStudiesClient({ caseStudies }: CaseStudiesClientProps) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Toggle theme handler
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // If no case studies, use fallback data
    const hasCaseStudies = caseStudies && caseStudies.length > 0;

    // Featured case study (first one or fallback)
    const featuredCaseStudy = hasCaseStudies ? caseStudies[0] : {
        title: "Special Homes",
        subtitle: "Real Estate Website",
        result: "300% increase in leads",
        slug: { current: "specialgardens" },
        fallbackImage: "/images/specialhomes.png",
        description: "We partnered with this client to transform their digital presence and deliver exceptional results. Through strategic planning and innovative solutions, we helped them achieve significant growth and ROI."
    };

    // Helper function to get image URL safely
    const getImageUrl = (caseStudy: CaseStudy): string => {
        if (caseStudy.mainImage &&
            caseStudy.mainImage._type === 'image' &&
            caseStudy.mainImage.asset &&
            caseStudy.mainImage.asset._ref &&
            caseStudy.mainImage.asset._ref.startsWith('image-')) {
            try {
                return urlForImage(caseStudy.mainImage).width(800).height(600).url();
            } catch (error) {
                console.error('Error generating image URL:', error);
            }
        }
        return caseStudy.fallbackImage || '/images/placeholder.svg';
    };

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-black text-white selection:bg-red-900 selection:text-white' : 'bg-gray-50 text-gray-900 selection:bg-red-200 selection:text-black'}`}>

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-24 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Hero Section: Declassified Header */}
            <section className={`relative pt-40 pb-20 px-6 border-b overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
                {/* Background Grid & Effects */}
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-100' : 'opacity-50'}`}></div>
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-red-900/10' : 'bg-red-500/5'}`}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`inline-flex items-center space-x-2 mb-6 border px-4 py-1.5 rounded-full transition-colors duration-500 ${isDark ? 'border-red-900/50 bg-red-950/20' : 'border-red-200 bg-red-50'}`}>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-500 text-xs font-mono tracking-widest uppercase">
                            {isDark ? 'Clearance Level: Top Secret' : 'Public Records Archive'}
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
                        Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Logs</span>
                    </h1>

                    <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed border-l-2 border-red-600 pl-6 transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We don't claim success. We prove it. Access the declassified files of our most critical operations and see exactly how we engineer dominance.
                    </p>
                </div>
            </section>

            {/* Featured Operation */}
            <section className={`py-24 px-6 border-b transition-colors duration-500 ${isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-100/50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className={`text-2xl font-mono uppercase tracking-widest flex items-center transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            <Target className="w-5 h-5 mr-3 text-red-500" />
                            Priority Target
                        </h2>
                        <div className={`hidden md:block font-mono text-xs transition-colors duration-500 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            ID: {featuredCaseStudy._id || 'OP-ALPHA-01'}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Visual Intel */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gray-900 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className={`relative rounded-xl overflow-hidden border aspect-video transition-colors duration-500 ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'}`}>
                                <Image
                                    src={getImageUrl(featuredCaseStudy)}
                                    alt={featuredCaseStudy.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />

                                {/* Overlay UI */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                    <div>
                                        <div className="text-red-500 text-xs font-mono mb-1">STATUS: MISSION ACCOMPLISHED</div>
                                        <div className="text-white font-bold text-lg">{featuredCaseStudy.title}</div>
                                    </div>
                                    <Lock className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Mission Brief */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h3 className={`text-4xl font-bold mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>{featuredCaseStudy.title}</h3>
                                <p className="text-red-500 font-mono text-sm uppercase tracking-wider mb-6">{featuredCaseStudy.subtitle}</p>
                                <p className={`leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {featuredCaseStudy.description || "Strategic intervention required to overhaul digital infrastructure. Objective: Maximize conversion and brand authority."}
                                </p>
                            </div>

                            <div className={`grid grid-cols-2 gap-4 border-t pt-8 transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                                <div>
                                    <div className={`text-xs font-mono uppercase mb-1 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Outcome</div>
                                    <div className={`text-2xl font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>{featuredCaseStudy.result || "Classified"}</div>
                                </div>
                                <div>
                                    <div className={`text-xs font-mono uppercase mb-1 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Sector</div>
                                    <div className={`text-xl font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Real Estate</div>
                                </div>
                            </div>

                            <Link
                                href={`/casestudies/${featuredCaseStudy.slug.current}`}
                                className={`inline-flex items-center group font-bold tracking-wide uppercase text-sm hover:text-red-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                <span className="border-b border-red-600 pb-1">Access Full Report</span>
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Field Reports Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className={`text-4xl font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Field Reports</h2>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hasCaseStudies && caseStudies.length > 1 ? (
                            caseStudies.slice(1).map((caseStudy: CaseStudy, index: number) => (
                                <Link
                                    key={caseStudy._id || index}
                                    href={`/casestudies/${caseStudy.slug.current}`}
                                    className={`group relative block border transition-all duration-300 overflow-hidden ${isDark ? 'bg-gray-900/50 border-gray-800 hover:border-red-900/50' : 'bg-white border-gray-200 hover:border-red-200 hover:shadow-xl'}`}
                                >
                                    {/* Hover Effect Background */}
                                    <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className={`relative h-64 border-b transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                                        <Image
                                            src={getImageUrl(caseStudy)}
                                            alt={caseStudy.title}
                                            fill
                                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isDark ? 'opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0' : 'opacity-100'}`}
                                        />
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-gray-700 px-2 py-1 text-xs font-mono text-white">
                                            CONFIDENTIAL
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-red-500 font-mono text-xs uppercase tracking-wider">{caseStudy.subtitle}</span>
                                            <Database className={`w-4 h-4 transition-colors duration-500 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                        </div>

                                        <h3 className={`text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{caseStudy.title}</h3>

                                        <p className={`text-sm mb-6 line-clamp-2 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                                            {caseStudy.excerpt || "Operational details classified. Authorized personnel only."}
                                        </p>

                                        <div className={`flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            View Debrief <ArrowRight className="ml-2 w-4 h-4 text-red-500" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Fallback cards
                            Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className={`border p-8 flex flex-col items-center justify-center text-center min-h-[400px] transition-colors duration-500 ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                                    <Terminal className={`w-12 h-12 mb-4 transition-colors duration-500 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                                    <h3 className={`font-mono text-sm uppercase tracking-widest transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Data Encrypted</h3>
                                    <p className={`text-xs mt-2 transition-colors duration-500 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Upload more case studies to Sanity to decrypt.</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={`py-32 border-t relative overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-red-900/20 via-black to-black' : 'from-red-100/50 via-white to-white'}`}></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className={`text-5xl md:text-6xl font-black mb-8 tracking-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Ready to Start Your <br />
                        <span className="text-red-600">Operation?</span>
                    </h2>
                    <p className={`text-xl mb-12 max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        We have the intel, the tools, and the team. All we need is the green light.
                    </p>
                    <Link href="/contact">
                        <button className={`px-10 py-5 rounded-full font-bold text-xl transition-colors transform hover:scale-105 duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-none'}`}>
                            Initiate Launch
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
