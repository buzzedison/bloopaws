"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Instagram,
    Linkedin,
    Twitter,
    ArrowRight,
    BookOpen,
    ArrowUpRight,
    PlayCircle,
    Briefcase,
    Layers,
    Sparkles,
    Share2,
    Check
} from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt?: string;
    _createdAt?: string;
    mainImage?: any;
    categories?: { title: string }[];
}

interface CaseStudy {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    publishedAt?: string;
    _createdAt?: string;
}

interface Career {
    _id: string;
    title: string;
    slug: { current: string };
    department: string;
    publishedAt?: string;
    _createdAt?: string;
}

interface Category {
    _id: string;
    title: string;
}

interface GridItem {
    id: string;
    title: string;
    type: 'post' | 'caseStudy' | 'career';
    slug: string;
    image?: any;
    date: string;
    categories: string[];
}

export default function LinksClient({
    posts,
    caseStudies,
    categories,
    careers = []
}: {
    posts: Post[],
    caseStudies: CaseStudy[],
    categories: Category[],
    careers?: Career[]
}) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const gridItems = useMemo(() => {
        const items: GridItem[] = [
            ...posts.map(p => ({
                id: p._id,
                title: p.title,
                type: 'post' as const,
                slug: `/insight/${p.slug.current}`,
                image: p.mainImage,
                date: p.publishedAt || p._createdAt || new Date().toISOString(),
                categories: p.categories?.map(c => c.title) || ['Insight']
            })),
            ...caseStudies.map(c => ({
                id: c._id,
                title: c.title,
                type: 'caseStudy' as const,
                slug: `/casestudies/${c.slug.current}`,
                image: c.mainImage,
                date: c.publishedAt || c._createdAt || '2024-01-01',
                categories: ['Success Stories', 'Case Studies']
            })),
            ...careers.map(c => ({
                id: c._id,
                title: c.title,
                type: 'career' as const,
                slug: `/careers/${c.slug.current}`,
                date: c.publishedAt || c._createdAt || '2024-01-01',
                categories: ['Careers', c.department]
            }))
        ];

        // Sort by date descending (newest first)
        return items.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // Descending order
        });
    }, [posts, caseStudies, careers]);

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") return gridItems;
        return gridItems.filter(item =>
            item.categories.some(cat => cat.toLowerCase() === activeCategory.toLowerCase())
        );
    }, [gridItems, activeCategory]);

    const displayCategories = [
        "All",
        ...categories.map(c => c.title),
        "Success Stories",
        "Careers"
    ].filter((v, i, a) => a.indexOf(v) === i);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-jakarta overflow-x-hidden relative">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: #0a0a0a; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* Floating Share Button */}
            <button
                onClick={handleShare}
                className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white text-black shadow-2xl hover:bg-zinc-200 transition-all flex items-center justify-center"
            >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>

            {/* Header Content (with padding) */}
            <div className="w-full max-w-4xl mx-auto px-4 pt-16 pb-8 relative z-10">
                {/* Profile */}
                <header className="flex flex-col items-center text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-red-600 to-zinc-800 mb-6"
                    >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white">
                            <Image src="/images/blooplogo2.png" width={80} height={20} alt="Bloop" className="w-14 h-auto" />
                        </div>
                    </motion.div>
                    <h1 className="text-2xl font-extrabold mb-1">Bloop Global</h1>
                    <p className="text-zinc-400 text-sm mb-6 max-w-xs">High-performance engineering & strategic venture building.</p>

                    <div className="flex gap-4 mb-8">
                        <a href="https://linkedin.com/company/bloopglobal" target="_blank" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="https://twitter.com/bloopglobal" target="_blank" className="text-zinc-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="https://instagram.com/bloopglobal" target="_blank" className="text-zinc-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                </header>

                {/* Featured Actions */}
                <div className="grid grid-cols-1 gap-3 mb-12">
                    <Link href="/vanguard" className="flex items-center justify-between p-4 rounded-xl bg-white text-black font-bold group hover:bg-red-600 hover:text-white transition-all shadow-xl">
                        <span className="flex items-center gap-3"><Sparkles size={18} /> The Vanguard Program</span>
                        <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100" />
                    </Link>
                    <Link href="/playbook" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 transition-all font-bold">
                        <span className="flex items-center gap-3"><BookOpen size={18} className="text-red-600" /> The Playbook</span>
                        <ArrowRight size={18} className="opacity-40" />
                    </Link>
                </div>

                {/* Instagram Category Bar */}
                <div className="mb-8 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2 pb-2">
                        {displayCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Instagram Grid (2 per row on mobile, 3 on desktop) */}
            <div className="w-full max-w-4xl mx-auto px-0 sm:px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] sm:gap-2">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                className="relative aspect-square bg-zinc-900 group"
                            >
                                <Link href={item.slug} className="block w-full h-full">
                                    {item.image ? (
                                        <Image
                                            src={builder.image(item.image).width(600).height(600).url()}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-zinc-800 to-zinc-900">
                                            <span className="text-[8px] font-black uppercase text-center opacity-40">{item.title}</span>
                                        </div>
                                    )}

                                    {/* Icon Overlay */}
                                    <div className="absolute top-2 right-2">
                                        {item.type === 'caseStudy' && <Sparkles size={12} className="text-white drop-shadow-lg" />}
                                        {item.type === 'career' && <Briefcase size={12} className="text-white drop-shadow-lg" />}
                                        {item.type === 'post' && <PlayCircle size={12} className="text-white drop-shadow-lg" />}
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-[11px] md:text-sm font-black leading-tight uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {item.title}
                                            </p>
                                            <div className="h-[2px] w-0 group-hover:w-8 bg-red-600 transition-all duration-700 delay-100" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="py-20 text-center text-zinc-500 px-4">
                    <Layers className="mx-auto mb-4 opacity-20" size={48} />
                    <p className="text-xs uppercase tracking-widest">No entries in this category yet</p>
                </div>
            )}

            {/* Footer (with padding) */}
            <footer className="w-full max-w-4xl mx-auto mt-20 pb-20 text-center px-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4">© Bloop Global LLC</p>
                <div className="flex justify-center gap-6">
                    <Link href="/" className="text-xs text-zinc-500">Main Site</Link>
                    <Link href="/contact" className="text-xs text-zinc-500">Contact</Link>
                </div>
            </footer>
        </main>
    );
}
