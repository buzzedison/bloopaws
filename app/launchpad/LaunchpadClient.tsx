'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "../../sanity/lib/image";
import { ArrowRight, Search, Sun, Moon, Filter, Rocket, X, Plus, ExternalLink, Award, Globe } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Define TypeScript interfaces
interface SanityImage {
    _type: string;
    asset: {
        _ref: string;
    };
    alt?: string;
}

interface LaunchpadStory {
    _id?: string;
    title: string;
    subtitle?: string;
    category?: string;
    stage?: string;
    outcomeType?: string;
    result?: string;
    description?: string;
    backstory?: string;
    founderName?: string;
    founderRole?: string;
    founderPhoto?: SanityImage;
    mainImage?: SanityImage;
    logo?: SanityImage;
    technologies?: string[];
    slug: { current: string };
    metrics?: Array<{ label: string; value: string; period?: string }>;
}

interface LaunchpadClientProps {
    stories: LaunchpadStory[];
}

// Filter configurations
const industries = [
    { name: 'All Industries', value: 'all' },
    { name: 'Agtech', value: 'agtech' },
    { name: 'Fintech', value: 'fintech' },
    { name: 'Healthcare', value: 'healthcare' },
    { name: 'Creative Economy', value: 'creative-economy' },
    { name: 'E-commerce', value: 'ecommerce' },
    { name: 'Logistics', value: 'logistics' },
];

const stages = [
    { name: 'All Stages', value: 'all' },
    { name: 'MVP', value: 'mvp', description: 'Idea to Launch' },
    { name: 'Scale', value: 'scale', description: 'Growth Phase' },
    { name: 'Enterprise', value: 'enterprise', description: 'Optimization' },
];

const outcomes = [
    { name: 'All Outcomes', value: 'all' },
    { name: 'Revenue Growth', value: 'revenue-growth' },
    { name: 'Operational Efficiency', value: 'operational-efficiency' },
    { name: 'Market Expansion', value: 'market-expansion' },
    { name: 'Product Launch', value: 'product-launch' },
];

// Motion Components for Background Vectors
const FloatingOrbs = ({ isDark }: { isDark: boolean }) => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
            animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 ${isDark ? 'bg-red-900/40' : 'bg-red-300/40'} mix-blend-multiply`}
        />
        <motion.div
            animate={{
                y: [0, 60, 0],
                x: [0, -40, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className={`absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 ${isDark ? 'bg-blue-900/30' : 'bg-orange-300/30'} mix-blend-multiply`}
        />
        <motion.div
            animate={{
                rotate: [0, 360],
                scale: [1, 0.9, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className={`absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full blur-[90px] opacity-20 ${isDark ? 'bg-purple-900/30' : 'bg-rose-200/50'} mix-blend-multiply`}
        />
    </div>
);


export default function LaunchpadClient({ stories }: LaunchpadClientProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light
    const [activeIndustry, setActiveIndustry] = useState('all');
    const [activeStage, setActiveStage] = useState('all');
    const [activeOutcome, setActiveOutcome] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Initialize theme from localStorage (favor light if none)
    useEffect(() => {
        const savedTheme = localStorage.getItem('launchpad-theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('launchpad-theme', newTheme);
    };

    const isDark = theme === 'dark';

    // Multi-dimensional filtering with Search
    const filteredStories = stories?.filter(story => {
        const matchesIndustry = activeIndustry === 'all' || story.category?.toLowerCase() === activeIndustry;
        const matchesStage = activeStage === 'all' || story.stage?.toLowerCase() === activeStage;
        const matchesOutcome = activeOutcome === 'all' || story.outcomeType?.toLowerCase() === activeOutcome;

        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = searchQuery === '' ||
            (story.title || '').toLowerCase().includes(searchLower) ||
            (story.founderName || '').toLowerCase().includes(searchLower) ||
            (story.description || '').toLowerCase().includes(searchLower) ||
            (story.category || '').toLowerCase().includes(searchLower);

        return matchesIndustry && matchesStage && matchesOutcome && matchesSearch;
    }) || [];

    const getImageUrl = (image?: SanityImage): string => {
        if (image?.asset?._ref) {
            try {
                return urlForImage(image).width(1600).height(2000).url();
            } catch (error) {
                console.error('Error:', error);
            }
        }
        return '/images/placeholder.svg';
    };

    const resetFilters = () => {
        setActiveIndustry('all');
        setActiveStage('all');
        setActiveOutcome('all');
        setSearchQuery('');
    };

    const activeFilterCount = [activeIndustry, activeStage, activeOutcome].filter(f => f !== 'all').length;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div
            ref={containerRef}
            className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-[#0a0a0a] text-[#ffffff]' : 'bg-[#faf9f6] text-[#1a1a1a]'} selection:bg-red-600 selection:text-white font-sans overflow-x-hidden`}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-red-600 z-[200] origin-left shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                style={{ scaleX }}
            />

            {/* Controls */}
            <div className="fixed bottom-10 right-10 z-[150] flex flex-col gap-3">
                <button
                    onClick={toggleTheme}
                    className={`p-4 rounded-full backdrop-blur-md border shadow-2xl transition-all ${isDark ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' : 'bg-white/80 border-zinc-200 text-zinc-500 hover:text-black hover:bg-white'}`}
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Background Vectors */}
            <FloatingOrbs isDark={isDark} />

            {/* Filter Overlay */}
            <AnimatePresence>
                {showFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowFilters(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[160]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed right-0 top-0 bottom-0 w-full max-w-[500px] z-[170] shadow-2xl backdrop-blur-3xl border-l p-10 lg:p-14 overflow-y-auto ${isDark ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-white/95 border-black/10'}`}
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black tracking-tight">Refine Results</h3>
                                <button onClick={() => setShowFilters(false)} className="p-2 opacity-50 hover:opacity-100 transition-opacity bg-zinc-500/10 rounded-full">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-12">
                                {/* Industry */}
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mb-6">By Industry</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {industries.map(ind => (
                                            <button
                                                key={ind.value}
                                                onClick={() => setActiveIndustry(ind.value)}
                                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeIndustry === ind.value ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' : isDark ? 'bg-white/5 border-white/10 hover:bg-white/15' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
                                            >
                                                {ind.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Stage */}
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mb-6">By Stage</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {stages.map(stg => (
                                            <button
                                                key={stg.value}
                                                onClick={() => setActiveStage(stg.value)}
                                                className={`text-left p-5 rounded-2xl transition-all border group relative overflow-hidden ${activeStage === stg.value ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/30' : isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
                                            >
                                                <div className="font-bold text-lg">{stg.name}</div>
                                                {stg.description && <div className={`text-xs mt-1 ${activeStage === stg.value ? 'opacity-90' : 'opacity-50'}`}>{stg.description}</div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Outcomes */}
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 mb-6">By Outcome</h4>
                                    <div className="flex flex-col gap-3">
                                        {outcomes.map(out => (
                                            <button
                                                key={out.value}
                                                onClick={() => setActiveOutcome(out.value)}
                                                className={`flex items-center justify-between p-5 rounded-2xl text-sm font-bold transition-all border ${activeOutcome === out.value ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20' : isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}
                                            >
                                                {out.name}
                                                {activeOutcome === out.value && <Plus className="w-5 h-5 rotate-45" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={() => {
                                            setActiveIndustry('all');
                                            setActiveStage('all');
                                            setActiveOutcome('all');
                                        }}
                                        className="w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white transition-all mt-4"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Premium Hero Section */}
            <section className="relative pt-40 pb-20 px-6 lg:px-20 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/5 backdrop-blur-md self-start border-zinc-200 dark:border-white/10 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-red-600"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Success Stories Portfolio</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] -ml-1">
                            Visionaries <br className="hidden md:block" /> changing the world <br className="hidden md:block" />
                            <span className="text-red-600 italic font-light">with us.</span>
                        </h1>

                        <div className="max-w-3xl mt-4">
                            <p className={`text-xl lg:text-3xl font-light leading-relaxed tracking-wide ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Discover the brilliant founders and ambitious companies doing amazing things globally. These are their stories, their products, and their vision.
                            </p>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-4 max-w-4xl">
                            <div className="relative flex-1 group">
                                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${isDark ? 'text-zinc-500 group-focus-within:text-white' : 'text-zinc-400 group-focus-within:text-black'}`} />
                                <input
                                    type="text"
                                    placeholder="Search by founder, company, or industry..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-16 pr-6 py-5 rounded-2xl border text-lg focus:outline-none transition-all shadow-xl hover:shadow-2xl ${isDark ? 'bg-white/5 border-white/10 focus:border-red-600 text-white placeholder-zinc-500 hover:border-white/20' : 'bg-white/80 backdrop-blur-lg border-zinc-200 focus:border-red-600 text-black placeholder-zinc-400 hover:border-zinc-300'}`}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setShowFilters(true)}
                                className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold transition-all whitespace-nowrap border shadow-xl hover:shadow-2xl ${isDark ? 'bg-white/10 hover:bg-white/15 border-white/10 text-white' : 'bg-white/80 backdrop-blur-lg hover:bg-white border-zinc-200 text-black'}`}
                            >
                                <Filter className="w-5 h-5" />
                                Filters {activeFilterCount > 0 && <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs">{activeFilterCount}</span>}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intelligent Grid Section */}
            <section className="px-6 lg:px-20 pb-40 relative z-10 min-h-[50vh]">
                <div className="max-w-7xl mx-auto">
                    {/* Results Overview */}
                    <div className="mb-10 flex items-center justify-between">
                        <p className={`text-sm font-bold tracking-widest uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {filteredStories.length} {filteredStories.length === 1 ? 'Visionary' : 'Visionaries'} Found
                        </p>
                        {searchQuery && (
                            <p className="text-sm font-medium">Results for "{searchQuery}"</p>
                        )}
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                        {filteredStories.map((story, idx) => {
                            return (
                                <motion.div
                                    key={story._id || idx}
                                    variants={itemVariants}
                                    className={`group rounded-[2rem] overflow-hidden border transition-all duration-500 flex flex-col xl:flex-row ${isDark ? 'bg-zinc-900/40 backdrop-blur-md border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-red-600/5' : 'bg-white/60 backdrop-blur-md border-zinc-200 hover:border-zinc-300 hover:bg-white hover:shadow-2xl hover:shadow-black/5'}`}
                                >
                                    <Link prefetch={false} href={`/launchpad/${story.slug.current}`} className="flex-1 flex flex-col lg:flex-row w-full h-full">

                                        {/* Left Side: The Product / Work */}
                                        <div className="relative w-full lg:w-2/5 h-[300px] lg:h-auto overflow-hidden shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                                            <Image
                                                src={getImageUrl(story.mainImage)}
                                                alt={story.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            {/* Product Category Label */}
                                            {story.category && (
                                                <div className="absolute top-6 left-6 z-20">
                                                    <span className="px-4 py-1.5 backdrop-blur-md bg-white/90 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black shadow-lg">
                                                        {story.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* What We Built Preview */}
                                            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                                                <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-red-400 transition-colors drop-shadow-md">{story.title}</h3>
                                                <p className="text-xs font-medium opacity-80 uppercase tracking-widest">{story.stage}</p>
                                            </div>
                                        </div>

                                        {/* Right Side: The Founder / Vision */}
                                        <div className="p-8 lg:p-10 flex flex-col flex-1 relative">

                                            {/* Founder identity */}
                                            <div className="flex items-start gap-4 mb-6">
                                                {story.founderPhoto ? (
                                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-md relative shrink-0">
                                                        <Image src={getImageUrl(story.founderPhoto)} alt={story.founderName || 'Founder'} fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0 ${isDark ? 'border-zinc-700 bg-zinc-800' : 'border-zinc-200 bg-zinc-100'}`}>
                                                        <Award className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                                    </div>
                                                )}
                                                <div className="pt-2">
                                                    <h4 className="font-bold text-xl tracking-wide">{story.founderName || 'The Founders'}</h4>
                                                    <p className={`text-xs font-black uppercase tracking-widest mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{story.founderRole || 'Founder(s)'}</p>
                                                </div>
                                            </div>

                                            {/* The Vision / Build text */}
                                            <div className="flex-1 mb-6">
                                                <p className={`text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-4`}>
                                                    {story.description || story.backstory}
                                                </p>
                                            </div>

                                            {/* Highlights & View Button */}
                                            <div className="pt-6 border-t flex items-center justify-between mt-auto">
                                                {story.metrics && story.metrics.length > 0 ? (
                                                    <div className="flex gap-6">
                                                        {story.metrics.slice(0, 1).map((metric, i) => (
                                                            <div key={i}>
                                                                <p className="text-xl font-black text-red-600">{metric.value}</p>
                                                                <p className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{metric.label}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-red-600" />
                                                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Global Impact</span>
                                                    </div>
                                                )}

                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-white group-hover:bg-red-600' : 'bg-black/5 text-black group-hover:bg-red-600 group-hover:text-white'}`}>
                                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Empty State */}
                    {filteredStories.length === 0 && (
                        <div className="py-32 flex flex-col items-center justify-center text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-md w-full"
                            >
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${isDark ? 'bg-white/5 text-zinc-600' : 'bg-black/5 text-zinc-300'}`}>
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight mb-4">No stories found</h3>
                                <p className={`text-lg mb-8 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    We couldn't find any founders or companies matching your criteria. Try adjusting your search or filters.
                                </p>
                                <button onClick={resetFilters} className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                                    Clear all filters and search
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom Global Impact CTA */}
            <section className={`py-40 px-6 lg:px-20 relative overflow-hidden ${isDark ? 'bg-zinc-900 border-t border-zinc-800' : 'bg-zinc-50 border-t border-zinc-200'}`}>
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-8">Join the Vanguard</span>
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-10">
                        Ready to accelerate your <br /> <span className="text-red-600 italic font-light">growth story?</span>
                    </h2>

                    <p className={`text-xl lg:text-2xl font-light mb-12 max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Our ecosystem supports the brightest minds. Let's build products and scale services that shape the future.
                    </p>

                    <Link prefetch={false} href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all shadow-2xl shadow-red-600/20 hover:shadow-xl hover:-translate-y-1">
                        Start your journey <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>


            <style jsx global>{`
                body {
                    background-color: ${isDark ? '#0a0a0a' : '#faf9f6'};
                }

                .italic {
                    font-style: italic;
                }

                ::selection {
                    background: #dc2626;
                    color: white;
                }

                ::-webkit-scrollbar {
                    width: 6px;
                }

                ::-webkit-scrollbar-track {
                    background: ${isDark ? '#0a0a0a' : '#faf9f6'};
                }

                ::-webkit-scrollbar-thumb {
                    background: #dc2626;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

