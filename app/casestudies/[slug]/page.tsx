'use client';

import { cachedClient } from "../../../sanity/lib/client";
import { caseStudyQuery } from "../../../sanity/lib/caseStudyQueries";
import { urlForImage } from "../../../sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Layout, Cpu, Image as ImageIcon, Briefcase, Zap, Plus, Sun, Moon } from "lucide-react";
import { PortableText } from '@portabletext/react';
import React, { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface CaseStudyParams {
  params: {
    slug: string;
  };
}

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface CaseStudy {
  title: string;
  subtitle?: string;
  category?: string;
  result?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  quote?: string;
  author?: string;
  clientAvatar?: SanityImage;
  technologies?: string[];
  projectUrl?: string;
  metrics?: Array<{
    label: string;
    value: string;
    period?: string;
  }>;
  mainImage?: SanityImage;
  logo?: SanityImage;
  gallery?: Array<SanityImage & { caption?: string }>;
  tags?: string[];
  content?: any[];
  publishedAt?: string;
}

const getComponents = (isDark: boolean) => ({
  block: {
    h2: ({ children }: any) => <h2 className="text-4xl font-black uppercase tracking-tighter italic mt-20 mb-10">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-12 mb-6">{children}</h3>,
    normal: ({ children }: any) => <p className={`text-xl font-medium leading-tight mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l border-red-600 pl-10 italic text-3xl font-light my-20">
        {children}
      </blockquote>
    ),
  },
});

export default function CaseStudyPage({ params }: CaseStudyParams) {
  const { slug } = params;
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('case-studies-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    async function fetchData() {
      try {
        const data: CaseStudy = await cachedClient(caseStudyQuery, { slug });
        setCaseStudy(data);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('case-studies-theme', newTheme);
  };

  const isDark = theme === 'dark';
  const components = getComponents(isDark);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDark ? 'bg-[#0c0c0c]' : 'bg-[#f8f6f2]'}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 animate-pulse">Loading Artifact...</div>
    </div>
  );

  if (!caseStudy) notFound();

  const getImageUrl = (image?: any, width = 2000, height = 1200) => {
    if (image?.asset?._ref) {
      return urlForImage(image).width(width).height(height).url();
    }
    return '/images/placeholder.svg';
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-red-600 selection:text-white transition-colors duration-700 ${isDark ? 'bg-[#0c0c0c] text-[#e5e5e5]' : 'bg-[#f8f6f2] text-[#1a1a1a]'}`}>

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
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end mb-20">
            <div className="col-span-12 lg:col-span-9">
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-red-600 mb-8 block">Artifact Case Study</span>
              <h1 className="text-[8vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase italic">
                {caseStudy.title}
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 pb-4">
              <p className={`text-xl font-medium leading-tight ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {caseStudy.description}
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[16/7] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out group border border-transparent group-hover:border-zinc-800 transition-colors">
            <Image
              src={getImageUrl(caseStudy.mainImage, 2400, 1050)}
              alt={caseStudy.title}
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
              priority
            />
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0c0c0c]' : 'from-[#f8f6f2]'} via-transparent to-transparent opacity-60`} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-12">

          {/* Left: Narrative */}
          <div className="col-span-12 lg:col-span-8 space-y-40">

            {/* The Challenge */}
            {caseStudy.challenge && (
              <div className="grid grid-cols-12 gap-6 group">
                <div className="col-span-12 lg:col-span-3">
                  <span className={`text-[10px] font-black tracking-[0.5em] uppercase transition-colors ${isDark ? 'text-zinc-600 group-hover:text-red-600' : 'text-zinc-400 group-hover:text-red-600'}`}>01 • The Problem</span>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <div className="text-3xl lg:text-5xl font-black leading-tight mb-8 italic uppercase tracking-tighter">
                    {caseStudy.challenge}
                  </div>
                </div>
              </div>
            )}

            {/* The Solution */}
            {caseStudy.solution && (
              <div className="grid grid-cols-12 gap-6 group">
                <div className="col-span-12 lg:col-span-3">
                  <span className={`text-[10px] font-black tracking-[0.5em] uppercase transition-colors ${isDark ? 'text-zinc-600 group-hover:text-red-600' : 'text-zinc-400 group-hover:text-red-600'}`}>02 • The Vision</span>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <div className="text-3xl lg:text-5xl font-black leading-tight mb-8 italic uppercase tracking-tighter">
                    {caseStudy.solution}
                  </div>
                </div>
              </div>
            )}

            {/* Structured Content */}
            {caseStudy.content && (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-3" />
                <div className="col-span-12 lg:col-span-9">
                  <PortableText value={caseStudy.content} components={components} />
                </div>
              </div>
            )}

            {/* High-End Gallery */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-12 lg:col-span-3">
                  <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>03 • Visuals</span>
                </div>
                <div className="col-span-12 lg:col-span-9 space-y-12">
                  {caseStudy.gallery.map((img, i) => (
                    <div key={i} className={`relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ${i % 3 === 0 ? 'aspect-video' : 'aspect-[4/5] w-2/3 ml-auto'}`}>
                      <Image
                        src={getImageUrl(img, 1600, 900)}
                        alt={img.alt || 'Gallery'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Meta Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-40 space-y-20">

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-12">
                {caseStudy.metrics?.map((m, i) => (
                  <div key={i} className={`border-t pt-8 ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>
                    <div className="text-[8vw] lg:text-[5vw] font-black italic tracking-tighter leading-none text-red-600">{m.value}</div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="space-y-6">
                <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Tech Artifacts</span>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {caseStudy.technologies?.map((tech, i) => (
                    <span key={i} className={`text-sm font-bold tracking-tight border-b pb-1 ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* Quote Card */}
              {caseStudy.quote && (
                <div className={`p-12 space-y-8 relative overflow-hidden group ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#ffffff] border border-zinc-100 shadow-sm'}`}>
                  <Plus className={`absolute top-0 right-0 w-8 h-8 group-hover:rotate-90 transition-transform duration-700 ${isDark ? 'text-zinc-800' : 'text-zinc-200'}`} />
                  <p className="text-2xl font-medium leading-tight italic">
                    "{caseStudy.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    {caseStudy.clientAvatar && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden grayscale">
                        <Image src={getImageUrl(caseStudy.clientAvatar, 200, 200)} alt="Client" fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em]">{caseStudy.author || 'Confidential'}</div>
                      <div className={`text-[8px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Partner Stakeholder</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <section className={`py-60 px-6 transition-colors duration-700 ${isDark ? 'bg-[#080808]' : 'bg-[#fefefe]'}`}>
        <div className="max-w-[1800px] mx-auto text-center">
          <h2 className="text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic mb-20">
            Next <br />
            Perspective.
          </h2>
          <Link prefetch={false} href="/casestudies" className="group inline-flex flex-col items-center gap-6">
            <div className={`w-20 h-20 rounded-full border flex items-center justify-center group-hover:border-red-600 transition-colors duration-700 ${isDark ? 'border-zinc-800 text-zinc-800' : 'border-zinc-200 text-zinc-300'}`}>
              <ArrowUpRight className="w-8 h-8 group-hover:text-red-600 transition-colors duration-700" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Explore More Artifacts</span>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        body { 
            background-color: ${isDark ? '#0c0c0c' : '#f8f6f2'}; 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            transition: background-color 0.7s ease;
        }
      `}</style>

    </div>
  );
}
