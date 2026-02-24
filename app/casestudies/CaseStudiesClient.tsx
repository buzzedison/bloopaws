'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import { ArrowRight, ArrowUpRight, Plus, Sparkles, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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
    category?: string;
    result?: string;
    description?: string;
    mainImage?: SanityImage;
    fallbackImage?: string;
    tags?: string[];
    excerpt?: string;
    slug: { current: string };
    metrics?: Array<{ label: string; value: string; period?: string }>;
}

interface CaseStudiesClientProps {
    caseStudies: CaseStudy[];
}

const categories = [
    { name: 'All Work', value: 'all' },
    { name: 'Technology', value: 'technology' },
    { name: 'Healthcare', value: 'healthcare' },
    { name: 'Finance', value: 'finance' },
    { name: 'Real Estate', value: 'real-estate' },
    { name: 'Construction', value: 'construction' },
];

export default function CaseStudiesClient({ caseStudies }: CaseStudiesClientProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [activeCategory, setActiveCategory] = useState('all');
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('case-studies-theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('case-studies-theme', newTheme);
    };

    const isDark = theme === 'dark';

    const filteredStudies = caseStudies?.filter(study =>
        activeCategory === 'all' || study.category === activeCategory
    ) || [];

    const getImageUrl = (caseStudy: CaseStudy): string => {
        if (caseStudy.mainImage?.asset?._ref) {
            try {
                return urlForImage(caseStudy.mainImage).width(1600).height(2000).url();
            } catch (error) {
                console.error('Error:', error);
            }
        }
        return '/images/placeholder.svg';
    };

    return (
        <div ref={containerRef} className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-[#0c0c0c] text-[#e5e5e5]' : 'bg-[#f8f6f2] text-[#1a1a1a]'} selection:bg-red-600 selection:text-white font-sans relative`}>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`fixed bottom-10 left-10 z-[110] p-4 rounded-full backdrop-blur-md border transition-all duration-500 group ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
            >
                {isDark ? <Sun className="w-5 h-5 transition-transform group-hover:rotate-45" /> : <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />}
            </button>

            {/* Global Texture Overlay */}
            <div className={`fixed inset-0 pointer-events-none z-[100] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'} contrast-150 brightness-150`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 Vag%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Editorial Hero */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 pt-40 pb-20">
                <div className="max-w-[1800px] mx-auto w-full grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-red-600 mb-8 block">Selected Work • 2024</span>
                            <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                                Creating <br />
                                <span className="ml-[10vw] opacity-80">Iconic</span> <br />
                                Impact.
                            </h1>
                        </motion.div>
                    </div>
                    <div className="col-span-12 lg:col-span-3 pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-8"
                        >
                            <p className={`text-xl font-medium leading-tight ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                We partner with visionary brands to engineer digital products that define their category.
                            </p>
                            <div className="flex flex-col gap-4 pt-4">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => {
                                            setActiveCategory(cat.value);
                                            gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className={`text-[10px] font-black uppercase tracking-[0.3em] text-left transition-all flex items-center gap-4 group ${activeCategory === cat.value ? 'text-red-600' : isDark ? 'text-zinc-600 hover:text-white' : 'text-zinc-400 hover:text-black'}`}
                                    >
                                        <span className={`w-8 h-px bg-current transition-all ${activeCategory === cat.value ? 'w-12' : 'group-hover:w-12'}`} />
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Vertical Scroll Line */}
                <div className={`absolute right-12 bottom-0 w-px h-40 ${isDark ? 'bg-gradient-to-b from-transparent to-red-600' : 'bg-gradient-to-b from-transparent to-red-600'} hidden lg:block`} />
            </section>

            {/* The "Story" Grid */}
            <section ref={gridRef} className="px-6 py-40">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-40">
                        <AnimatePresence mode="popLayout">
                            {filteredStudies.map((study, idx) => {
                                // Dynamic Layout Logic
                                const isWide = idx % 3 === 0;
                                const isOffset = idx % 2 !== 0;

                                return (
                                    <motion.div
                                        key={study._id || idx}
                                        layout
                                        initial={{ opacity: 0, y: 100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        className={`group relative ${isWide ? 'lg:col-span-8' : 'lg:col-span-4'} ${isOffset ? 'lg:mt-40' : ''}`}
                                    >
                                        <Link prefetch={false} href={`/casestudies/${study.slug.current}`} className="block">
                                            {/* Visual Container */}
                                            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[80vh] overflow-hidden bg-zinc-900 group-hover:scale-[0.98] transition-transform duration-1000 ease-out border border-transparent group-hover:border-zinc-800 transition-colors">
                                                <Image
                                                    src={getImageUrl(study)}
                                                    alt={study.title}
                                                    fill
                                                    priority={idx < 2}
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                                                />
                                                {/* Meta Overlay */}
                                                <div className="absolute top-10 left-10 flex flex-col gap-2">
                                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase mix-blend-difference text-white">0{idx + 1}</span>
                                                    <span className="h-px w-8 bg-white/50 mix-blend-difference" />
                                                </div>

                                                {/* Hover Arrow */}
                                                <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 backdrop-blur-sm">
                                                    <ArrowUpRight className="w-8 h-8 text-white" />
                                                </div>
                                            </div>

                                            {/* Editorial Content */}
                                            <div className="mt-12 grid grid-cols-12 gap-6">
                                                <div className="col-span-12 lg:col-span-8">
                                                    <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] italic mb-6">
                                                        {study.title}
                                                    </h2>
                                                    <div className={`flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'opacity-40' : 'opacity-60'}`}>
                                                        <span>{study.category}</span>
                                                        <span>•</span>
                                                        <span>{study.result || 'Engineering'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 lg:col-span-4 pt-2">
                                                    <p className={`text-lg font-medium leading-tight line-clamp-3 mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                                        {study.description}
                                                    </p>
                                                    <button className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 flex items-center gap-4 group/btn">
                                                        Read The Case <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {filteredStudies.length === 0 && (
                        <div className="py-60 text-center">
                            <p className={`text-[10vw] font-black uppercase italic tracking-tighter ${isDark ? 'opacity-10' : 'opacity-5'}`}>No Artifacts.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Next Chapter CTA */}
            <section className={`py-60 px-6 border-t ${isDark ? 'border-zinc-900 bg-[#080808]' : 'border-zinc-200 bg-[#fefefe]'}`}>
                <div className="max-w-[1800px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-red-600 mb-12 block">Collaborate</span>
                        <h2 className="text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic mb-20">
                            Build Your <br />
                            Legacy <br />
                            <span className={isDark ? 'text-zinc-800' : 'text-zinc-200'}>Together.</span>
                        </h2>
                        <Link
                            href="/contact"
                            className="group inline-flex flex-col items-center gap-6"
                        >
                            <div className="w-40 h-40 rounded-full border border-red-600 flex items-center justify-center group-hover:bg-red-600 transition-all duration-700">
                                <Plus className="w-12 h-12 text-red-600 group-hover:text-white group-hover:rotate-90 transition-all duration-700" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Start A Build</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Custom Footer */}
            <footer className={`px-6 py-20 border-t ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>
                <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-2xl font-black italic">BLOOP<span className="text-red-600">.</span></span>
                        <span className={`text-[10px] font-bold tracking-[0.2em] ${isDark ? 'opacity-40' : 'opacity-60'}`}>© 2024 BLOOP ARTIFACTS LTD.</span>
                    </div>
                    <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
                        <a href="#" className="hover:text-red-600 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-red-600 transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-red-600 transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                
                body {
                    background-color: ${isDark ? '#0c0c0c' : '#f8f6f2'};
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    transition: background-color 0.7s ease;
                }

                h1, h2, h3 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }

                ::selection {
                    background: #dc2626;
                    color: white;
                }
            `}</style>

        </div>
    );
}
