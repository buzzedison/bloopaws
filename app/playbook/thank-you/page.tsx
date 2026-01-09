"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Twitter, Linkedin, Github, Mail, BookOpen, Wrench, Zap } from "lucide-react";

export default function PlaybookThankYou() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-jakarta">
      {/* Editorial Header Space */}
      <div className="h-32 bg-white" />

      <section className="flex-1 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-10">
              <Mail className="w-10 h-10 text-red-600" />
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tight">
                Welcome to <br /><span className="italic text-red-600">The Build Sheet.</span>
              </h1>
              <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
                Subscription confirmed. You’ve joined a network of 12,000+ builders dedicated to high-output execution.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div className="space-y-4 p-8 bg-gray-50 rounded-3xl border border-gray-100 italic">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black">The Blueprint</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                One deep-dive analysis of a field-tested system or a failure we learned from.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-gray-50 rounded-3xl border border-gray-100 italic">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <Wrench className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black">The Toolbox</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                A specific framework, prompt, or technical template you can deploy immediately.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-gray-50 rounded-3xl border border-gray-100 italic">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black">The Synthesis</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                Curated market signals and strategic links that actually move the needle.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-t border-gray-100 pt-16">
            <Link
              href="/playbook"
              className="px-10 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-red-600 transition-all shadow-xl flex items-center gap-4 group"
            >
              Enter The Playbook Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="mt-32 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-8">Ensure Delivery</p>
            <p className="text-sm text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
              To make sure the briefing hits your inbox every Friday, please move this email from your 'Promotions' or 'Spam' tab to 'Primary'.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="py-12 border-t border-gray-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">
            Bloop Global LLC &copy; {new Date().getFullYear()} — Execution over Everything.
          </p>
        </div>
      </footer>

      {/* Inject Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </main>
  );
}