'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Code2, Lightbulb, Handshake, Users } from 'lucide-react';

const values = [
  {
    icon: <Lightbulb className="w-6 h-6 text-red-600" />,
    title: "Honest before comfortable",
    body: "We'll tell you when an idea needs work before we build it. A rough conversation early saves months of wasted development later.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-red-600" />,
    title: "Build it right the first time",
    body: "Clean architecture, readable code, proper documentation. We build things you can hand off to an internal team without it falling apart.",
  },
  {
    icon: <Users className="w-6 h-6 text-red-600" />,
    title: "Founders first",
    body: "We work with founders, not for them. That means showing up to weekly calls, explaining decisions, and treating your product like it's ours.",
  },
  {
    icon: <Handshake className="w-6 h-6 text-red-600" />,
    title: "Transparency over theater",
    body: "No inflated timelines, no mystery pricing, no holding code hostage. You own everything we build from day one.",
  },
];

const team = [
  {
    name: "Coming Soon",
    role: "Founder & CEO",
    bio: "Leads strategy, client relationships, and product direction. Previously built and sold two SaaS products.",
    location: "Accra / London",
  },
  {
    name: "Coming Soon",
    role: "Head of Engineering",
    bio: "Full-stack architect with a background in fintech infrastructure. Obsessive about performance and code quality.",
    location: "Lagos",
  },
  {
    name: "Coming Soon",
    role: "Head of AI & Automation",
    bio: "Builds the AI systems and workflow automations that save our clients hundreds of hours a month.",
    location: "Remote",
  },
];

const stats = [
  { value: "2015", label: "Founded" },
  { value: "100+", label: "Products shipped" },
  { value: "3", label: "Countries active" },
  { value: "8 wks", label: "Avg. MVP timeline" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-black">

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                Who We Are
              </span>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-8">
                We're the technical team <br className="hidden md:block" />
                <span className="text-red-600">founders wish they had</span>{' '}
                from day one.
              </h1>

              <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl">
                Bloop Global is a product development studio. We build web apps, mobile platforms, and AI automation systems for founders who know what they want to build but don't yet have the technical team to build it.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50 hover:border-red-100 hover:bg-red-50/30 transition-all duration-300">
                    <p className="text-4xl font-black text-black mb-1">{s.value}</p>
                    <p className="text-sm text-zinc-500 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 mb-6">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                We built our own products first.{' '}
                <span className="text-red-500">Then we helped others build theirs.</span>
              </h2>
            </motion.div>

            <motion.div
              className="lg:col-span-7 space-y-6 text-zinc-400 text-lg leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <p>
                Bloop started because we kept seeing the same problem: founders with genuinely good ideas spending months finding the right developers, burning budget on agencies that treated them like a ticket number, and ending up with products that were hard to maintain and impossible to hand off.
              </p>
              <p>
                We'd been through it ourselves. We built CrowdPen, TaskWit, and Strideos — our own products — before we started taking client work. That experience taught us what a good build process actually looks like: clear communication, iterative demos, clean code, and a handover that doesn't leave the client stranded.
              </p>
              <p className="text-white font-medium">
                That's the standard we hold ourselves to for every client. Not because it's good marketing — because we've felt what the alternative costs.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How We Work</h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              These aren't aspirational values on a wall. They're the actual things we argue about internally when we're deciding how to handle something.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl bg-white border border-zinc-100 hover:border-red-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.5}
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{v.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — hidden until ready */}

      {/* Where We Work */}
      <section className="py-16 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Where We Operate</p>
              <p className="text-xl font-bold text-black">Ghana · Nigeria · United Kingdom · United States · Canada</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Calendar className="w-4 h-4" />
              <span>Available for new projects — typical start time is 2 weeks from contract</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-black text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Want to work together?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Tell us what you're building. We'll come back with a clear view on how we'd approach it and whether we're a good fit — no sales pressure, no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/contact">
                <button className="bg-red-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center gap-3 shadow-lg shadow-red-900/20">
                  Book a Free Call <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link prefetch={false} href="/services">
                <button className="border border-zinc-700 text-zinc-300 px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-900 hover:text-white transition-colors">
                  See What We Build
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
