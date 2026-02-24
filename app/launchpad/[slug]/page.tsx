'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ExternalLink, Sun, Moon, Play, TrendingUp, Code, Lightbulb, Calendar, Rocket, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

interface SanityImage {
  _type: string;
  asset: { _ref: string };
  alt?: string;
}

interface StackDecision {
  decision: string;
  reasoning: string;
}

interface Update {
  date: string;
  title: string;
  content: string;
  metrics?: Array<{ label: string; value: string }>;
}

interface TechStackCategory {
  category: string;
  tools: string[];
}

interface LaunchpadStory {
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
  founderBio?: string;
  founderPhoto?: SanityImage;
  challenge?: any[];
  solution?: any[];
  impact?: any[];
  technicalChallenges?: string[];
  stackDecisions?: StackDecision[];
  buildTimeline?: string;
  pivots?: string;
  quote?: string;
  author?: string;
  clientAvatar?: SanityImage;
  videoTestimonialUrl?: string;
  technologies?: string[];
  techStackDetails?: TechStackCategory[];
  lessonsLearned?: string[];
  relatedResources?: Array<{ title: string; url: string }>;
  projectUrl?: string;
  updates?: Update[];
  whatsNext?: string;
  metrics?: Array<{ label: string; value: string; period?: string }>;
  mainImage?: SanityImage;
  logo?: SanityImage;
  gallery?: Array<SanityImage & { caption?: string }>;
  content?: any[];
}

export default function FounderStoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [story, setStory] = useState<LaunchpadStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('launchpad-theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('launchpad-theme', newTheme);
  };

  const isDark = theme === 'dark';

  useEffect(() => {
    async function fetchStory() {
      const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
        title, subtitle, category, stage, outcomeType, result, description, backstory,
        founderName, founderRole, founderBio, founderPhoto,
        challenge, solution, impact,
        technicalChallenges, stackDecisions, buildTimeline, pivots,
        quote, author, clientAvatar, videoTestimonialUrl,
        technologies, techStackDetails, lessonsLearned, relatedResources,
        projectUrl, updates, whatsNext, metrics, mainImage, logo, gallery, content
      }`;

      try {
        const data = await client.fetch(query, { slug });
        if (!data) {
          setError('Story not found');
        } else {
          setStory(data);
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story');
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchStory();
  }, [slug]);

  const getImageUrl = (image?: SanityImage, width = 1600, height = 1200): string => {
    if (image?.asset?._ref) {
      try {
        return urlForImage(image).width(width).height(height).url();
      } catch (error) {
        console.error('Error:', error);
      }
    }
    return '/images/placeholder.svg';
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#faf9f6] text-black'}`}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Rocket className="w-12 h-12 text-red-600" />
        </motion.div>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-black uppercase tracking-[0.8em]"
          >
            Retrieving Story
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-zinc-500 mb-8">This founder story is still being written or has moved.</p>
          <Link prefetch={false} href="/launchpad" className="text-red-600 font-bold hover:underline">
            Back to Launchpad
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} selection:bg-red-600 selection:text-white font-sans overflow-x-hidden pt-24`}>

      {/* Header Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[150] px-6 lg:px-20 py-6 flex items-center justify-between pointer-events-none">
        <Link prefetch={false} href="/launchpad" className="pointer-events-auto group flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm transition-all hover:border-red-600">
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold uppercase tracking-wider">Back</span>
        </Link>

        <button onClick={toggleTheme} className="pointer-events-auto p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-red-600 transition-all">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Sophisticated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.05] ${isDark ? 'bg-red-600' : 'bg-red-400'}`} />
        <div className={`absolute inset-0 opacity-[0.03] contrast-150 brightness-100 pointer-events-none`}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 pb-24 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category */}
            <div className="flex flex-wrap gap-3 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-red-600 text-red-600 rounded-full">{story.category}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-red-600 text-white rounded-full">{story.stage === 'mvp' ? 'MVP' : story.stage}</span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight mb-8">
              {story.title}
            </h1>

            <div className="max-w-2xl">
              <p className={`text-lg lg:text-xl font-medium leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {story.subtitle || story.description}
              </p>
            </div>

            <div className="mt-20 flex flex-wrap gap-12">
              {story.result && (
                <div className="group">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-3 block">Primary Outcome</span>
                  <span className="text-3xl font-black italic text-red-600">{story.result}</span>
                </div>
              )}
              {story.projectUrl && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-3 block">Interface</span>
                  <a href={story.projectUrl} target="_blank" className="flex items-center gap-3 text-sm font-bold hover:text-red-600 transition-colors uppercase tracking-widest">
                    Visit Project <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative px-6 lg:px-20 py-24 z-10 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          <div className="lg:col-span-8 space-y-24">
            {[
              { id: '01', title: 'The Mission', content: story.challenge },
              { id: '02', title: 'The Evolution', content: story.solution },
              { id: '03', title: 'The Impact', content: story.impact }
            ].map((section, i) => (
              section.content && section.content.length > 0 && (
                <div key={section.id} className="relative">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-8">
                    <span className="text-red-600 mr-4 text-sm font-mono opacity-50">{section.id}</span>
                    {section.title}
                  </h2>
                  <div className={`prose prose-zinc ${isDark ? 'prose-invert' : ''} font-medium leading-relaxed text-zinc-600 dark:text-zinc-400`}>
                    <PortableText value={section.content} />
                  </div>
                </div>
              )
            ))}

            {/* Gallery / Visual Content */}
            {story.gallery && story.gallery.length > 0 && (
              <div className="grid grid-cols-1 gap-8">
                {story.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.98 }}
                    className="relative aspect-video rounded-[4px] overflow-hidden group shadow-xl"
                  >
                    <Image src={getImageUrl(img)} alt={img.caption || 'Project visual'} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-bold tracking-wider">{img.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-24 space-y-12">

              {story.metrics && story.metrics.length > 0 && (
                <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-8">Key Metrics</h3>
                  <div className="space-y-8">
                    {story.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-4xl font-bold text-red-600 tracking-tight mb-1">{m.value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest">{m.label}</div>
                        {m.period && <div className="text-[8px] text-zinc-500 mt-1 uppercase tracking-widest">{m.period}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(story.technologies || []) && (
                <div className="px-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {(story.technologies || []).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Founder Info */}
              {story.founderName && (
                <div className="p-8 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-red-600 p-1">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src={getImageUrl(story.founderPhoto)} alt={story.founderName} fill className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-black italic">{story.founderName}</div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-red-600">{story.founderRole}</div>
                    </div>
                  </div>
                  {story.quote && (
                    <p className="text-base italic opacity-70 leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Living Document Updates */}
      {story.updates && story.updates.length > 0 && (
        <section className="px-6 lg:px-20 py-24 z-10 border-t border-zinc-100 dark:border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 block">Founder Log</span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Growth Updates</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {story.updates.map((update, i) => (
                <div key={i} className="p-8 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-6 opacity-50">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(update.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{update.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{update.content}</p>
                  {update.metrics && (
                    <div className="flex gap-6">
                      {update.metrics.map((m, j) => (
                        <div key={j}>
                          <div className="text-2xl font-bold text-red-600 tracking-tight">{m.value}</div>
                          <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Detail Section (If present) */}
      {(story.lessonsLearned || story.stackDecisions) && (
        <section className="px-6 lg:px-20 py-40 z-10 bg-black/5 dark:bg-white/5">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-12">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter mb-20 text-center">Intel <span className="opacity-20">& Details.</span></h2>
            </div>

            {story.lessonsLearned && (
              <div className="lg:col-span-6 space-y-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Retrospective</h3>
                <div className="space-y-6">
                  {story.lessonsLearned.map((l, i) => (
                    <div key={i} className="flex gap-6 items-start p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-red-600 font-bold">0{i + 1}</span>
                      <p className="text-lg font-medium italic opacity-80">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {story.stackDecisions && (
              <div className="lg:col-span-6 space-y-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Architectural Choice</h3>
                <div className="space-y-6">
                  {story.stackDecisions.map((d, i) => (
                    <div key={i} className="p-8 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                      <h4 className="text-xl font-black mb-4 uppercase italic">{d.decision}</h4>
                      <p className="text-base font-medium opacity-60 leading-relaxed italic">{d.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Next Step CTA */}
      <section className={`py-32 px-6 lg:px-20 border-t ${isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-100 bg-zinc-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-8">
            Build your success story.
          </h2>
          <Link prefetch={false} href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-black transition-all">
            Start Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 lg:px-20 py-20 border-t ${isDark ? 'border-zinc-900' : 'border-zinc-200'} bg-transparent z-10 relative`}>
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div className="flex flex-col gap-4">
            <Link prefetch={false} href="/" className="text-3xl font-black italic tracking-tighter">BLOOP<span className="text-red-600">.</span></Link>
            <p className="text-[10px] font-medium tracking-widest opacity-40 uppercase">Venture Building Studio • Africa</p>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-16">
            {['Instagram', 'LinkedIn', 'X', 'Medium'].map(social => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-red-600 transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
          background-color: ${isDark ? '#0a0a0a' : '#faf9f6'};
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        h1, h2, h3, h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .italic {
          font-style: italic;
        }

        ::selection {
          background: #dc2626;
          color: white;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDark ? '#0a0a0a' : '#faf9f6'};
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
}
