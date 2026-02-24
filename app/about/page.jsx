'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Target, Zap, Users, Lock, Terminal, FileText, Crosshair, Sun, Moon } from 'lucide-react';

export default function AboutPage() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
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

      {/* Hero Section */}
      <section className={`relative pt-40 pb-20 px-6 border-b overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
        {/* Background Elements */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${isDark ? 'opacity-100' : 'opacity-50'}`}></div>
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-red-900/10' : 'bg-red-500/5'}`}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center space-x-2 mb-6 border px-4 py-1.5 rounded-full transition-colors duration-500 ${isDark ? 'border-red-900/50 bg-red-950/20' : 'border-red-200 bg-red-50'}`}>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 text-xs font-mono tracking-widest uppercase">
                {isDark ? 'Origin Story: Declassified' : 'Corporate History: Public'}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Rebellion.</span>
            </h1>

            <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed border-l-2 border-red-600 pl-6 transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Bloop Global was built for one reason: To engineer market dominance. We provide the capital, the code, and the strategy to turn ambitious ideas into industry leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Mission Brief */}
      <section className={`py-24 px-6 border-b transition-colors duration-500 ${isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-100/50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className={`text-4xl font-bold mb-8 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>The Mission Brief</h2>
          <p className={`text-xl leading-relaxed mb-12 transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Most startups fail because they move too slow. We fix that. <br />
            We don't just advise; we build. We equip founders with the elite engineering, aggressive strategy, and financial firepower needed to win.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className={`p-6 border rounded-xl transition-all duration-300 ${isDark ? 'border-gray-800 bg-black hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-lg'}`}>
              <Zap className="w-8 h-8 text-red-500 mb-4" />
              <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Speed is Survival</h3>
              <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>We launch fast. We iterate daily. We outpace the competition.</p>
            </div>
            <div className={`p-6 border rounded-xl transition-all duration-300 ${isDark ? 'border-gray-800 bg-black hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-lg'}`}>
              <Shield className="w-8 h-8 text-red-500 mb-4" />
              <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Unbreakable Code</h3>
              <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>We build scalable, military-grade tech that handles millions of users.</p>
            </div>
            <div className={`p-6 border rounded-xl transition-all duration-300 ${isDark ? 'border-gray-800 bg-black hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-lg'}`}>
              <Crosshair className="w-8 h-8 text-red-500 mb-4" />
              <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Precision Strikes</h3>
              <p className={`text-sm transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>We identify market gaps and attack them with laser focus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Operatives (Team) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className={`text-4xl font-bold transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>The Operatives</h2>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Operative 1 */}
            <div className={`group relative border overflow-hidden transition-all duration-300 ${isDark ? 'border-gray-800 bg-gray-900/50 hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-xl'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
              <div className="aspect-square relative grayscale group-hover:grayscale-0 transition-all duration-500">
                {/* Placeholder for team image */}
                <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Users className={`w-20 h-20 transition-colors duration-500 ${isDark ? 'text-gray-700' : 'text-gray-400'}`} />
                </div>
              </div>
              <div className={`p-6 border-t transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="text-red-500 text-xs font-mono uppercase tracking-widest mb-1">Founder / CEO</div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Agent "Alpha"</h3>
                <p className={`text-sm mb-4 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Specialization: Grand Strategy & Capital Allocation.
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-600">
                  <span>STATUS: ACTIVE</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Operative 2 */}
            <div className={`group relative border overflow-hidden transition-all duration-300 ${isDark ? 'border-gray-800 bg-gray-900/50 hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-xl'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
              <div className="aspect-square relative grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Terminal className={`w-20 h-20 transition-colors duration-500 ${isDark ? 'text-gray-700' : 'text-gray-400'}`} />
                </div>
              </div>
              <div className={`p-6 border-t transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="text-red-500 text-xs font-mono uppercase tracking-widest mb-1">Head of Engineering</div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Agent "Zero"</h3>
                <p className={`text-sm mb-4 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Specialization: System Architecture & AI Warfare.
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-600">
                  <span>STATUS: ACTIVE</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Operative 3 */}
            <div className={`group relative border overflow-hidden transition-all duration-300 ${isDark ? 'border-gray-800 bg-gray-900/50 hover:border-red-900/50' : 'border-gray-200 bg-white hover:border-red-200 hover:shadow-xl'}`}>
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
              <div className="aspect-square relative grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <FileText className={`w-20 h-20 transition-colors duration-500 ${isDark ? 'text-gray-700' : 'text-gray-400'}`} />
                </div>
              </div>
              <div className={`p-6 border-t transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="text-red-500 text-xs font-mono uppercase tracking-widest mb-1">Head of Growth</div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>Agent "Velocity"</h3>
                <p className={`text-sm mb-4 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Specialization: Viral Loops & Market Penetration.
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-600">
                  <span>STATUS: ACTIVE</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Code (Values) */}
      <section className={`py-24 px-6 border-t transition-colors duration-500 ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>The Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`border-l-4 border-red-600 pl-8 py-2 transition-colors duration-300 ${isDark ? 'hover:bg-gray-900/30' : 'hover:bg-red-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>01. Radical Truth</h3>
              <p className={`transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>We don't sell comfort. We sell reality. If your idea is bad, we kill it. If it's good, we scale it.</p>
            </div>
            <div className={`border-l-4 pl-8 py-2 transition-all duration-300 ${isDark ? 'border-gray-700 hover:border-red-600 hover:bg-gray-900/30' : 'border-gray-300 hover:border-red-600 hover:bg-red-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>02. Speed Over Perfection</h3>
              <p className={`transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Perfection is procrastination in a tuxedo. We ship fast, break things, and fix them faster.</p>
            </div>
            <div className={`border-l-4 pl-8 py-2 transition-all duration-300 ${isDark ? 'border-gray-700 hover:border-red-600 hover:bg-gray-900/30' : 'border-gray-300 hover:border-red-600 hover:bg-red-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>03. Impact or Nothing</h3>
              <p className={`transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>We don't build for vanity metrics. We build for revenue, dominance, and legacy.</p>
            </div>
            <div className={`border-l-4 border-red-600 pl-8 py-2 transition-colors duration-300 ${isDark ? 'hover:bg-gray-900/30' : 'hover:bg-red-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>04. Loyalty to the Mission</h3>
              <p className={`transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Once we partner, we are in the trenches with you. Your war is our war.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 border-t relative overflow-hidden transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${isDark ? 'from-red-900/20 via-black to-black' : 'from-red-100/50 via-white to-white'}`}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className={`text-5xl md:text-6xl font-black mb-8 tracking-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Join the <span className="text-red-600">Alliance.</span>
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            We are looking for the next generation of industry titans. Are you one of them?
          </p>
          <Link prefetch={false} href="/contact">
            <button className={`px-10 py-5 rounded-full font-bold text-xl transition-colors transform hover:scale-105 duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-none'}`}>
              Request Briefing
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}