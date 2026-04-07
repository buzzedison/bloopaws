"use client"

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Globe, BarChart2, GraduationCap, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: "ai",
    number: "01",
    category: "AI & Automation",
    headline: "Automate the Work That's Eating Your Team's Time.",
    description: "We build custom AI agents and automated workflows — from lead handling and customer support to internal data processing — that run 24/7 without adding headcount. You stop doing repetitive work. Your team focuses on what actually moves the needle.",
    features: [
      "Custom AI agents & chatbots",
      "End-to-end workflow automation",
      "CRM & operations integrations",
      "Internal tooling & dashboards",
    ],
    link: "/services/ai",
    icon: <Bot size={28} />,
    bg: "bg-black",
    text: "text-white",
    accent: "text-red-500",
    cardBg: "bg-zinc-900 border-zinc-800 hover:border-red-900/40",
    featureDot: "bg-red-500",
    tagBg: "bg-red-600/10 text-red-400",
  },
  {
    id: "web",
    number: "02",
    category: "Web & Mobile Apps",
    headline: "Full-Stack Products Built to Handle Real Traffic.",
    description: "From high-performance web apps to native iOS and Android experiences. We write clean, scalable code on modern infrastructure — built for the load you have today and the growth you're planning for. No shortcuts, no tech debt surprises.",
    features: [
      "Full-stack web applications",
      "iOS & Android mobile apps",
      "Scalable cloud infrastructure",
      "Product design & prototyping",
    ],
    link: "/services/web",
    icon: <Globe size={28} />,
    bg: "bg-white",
    text: "text-black",
    accent: "text-red-600",
    cardBg: "bg-gray-50 border-gray-100 hover:border-red-100 hover:bg-white",
    featureDot: "bg-red-500",
    tagBg: "bg-red-50 text-red-600",
  },
  {
    id: "strategy",
    number: "03",
    category: "Strategy & Fundraising",
    headline: "Investor-Ready from Day One.",
    description: "We build the pitch decks, financial models, and go-to-market plans that turn investor conversations into term sheets. We've been on both sides of the table — we know what gets a 'yes', and what gets a polite pass.",
    features: [
      "Pitch deck design & narrative",
      "Financial modelling & projections",
      "Go-to-market planning",
      "Investor targeting & prep",
    ],
    link: "/services/strategy",
    icon: <BarChart2 size={28} />,
    bg: "bg-black",
    text: "text-white",
    accent: "text-red-500",
    cardBg: "bg-zinc-900 border-zinc-800 hover:border-red-900/40",
    featureDot: "bg-red-500",
    tagBg: "bg-red-600/10 text-red-400",
  },
  {
    id: "training",
    number: "04",
    category: "Training & Handover",
    headline: "We Don't Hand You a Black Box.",
    description: "Every build includes a full knowledge transfer so your team owns the product long after we're done. We also run training programmes for in-house teams — agile workflows, AI tools, product ops — so you're not dependent on us forever.",
    features: [
      "Full codebase walkthrough & docs",
      "Agile & product ops training",
      "AI tools adoption workshops",
      "Ongoing retainer support (optional)",
    ],
    link: "/services/training",
    icon: <GraduationCap size={28} />,
    bg: "bg-white",
    text: "text-black",
    accent: "text-red-600",
    cardBg: "bg-gray-50 border-gray-100 hover:border-red-100 hover:bg-white",
    featureDot: "bg-red-500",
    tagBg: "bg-red-50 text-red-600",
  },
];

const processSteps = [
  { step: "01", title: "Understand", desc: "We dig into the problem, the market, and what success actually looks like before any work begins." },
  { step: "02", title: "Plan", desc: "Scope, architecture, and timeline locked before code is written. No surprises, no scope creep." },
  { step: "03", title: "Build", desc: "Iterative sprints with regular demos. You see progress every week, not at the end." },
  { step: "04", title: "Ship & Support", desc: "Launch, monitor, and improve. We stay close through go-live and beyond." },
];

const ServicesPage = () => {
  return (
    <div className="font-sans antialiased bg-white">

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center bg-black text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-800/60 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              What We Do
            </span>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-8">
              Everything You Need to Go From{' '}
              <span className="text-red-500">Idea to Revenue.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
              AI automation, web and mobile apps, fundraising strategy, and team training — all in one team. No agency hopping. No coordination overhead.
            </p>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-3 mb-12">
              {["AI & Automation", "Web Apps", "Mobile Apps", "Strategy & Fundraising", "Training & Handover"].map((chip) => (
                <span key={chip} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-300">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/contact">
                <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                  Book a Free Call
                </button>
              </Link>
              <Link prefetch={false} href="#process">
                <button className="px-8 py-4 rounded-full font-bold text-lg border border-zinc-700 hover:bg-zinc-900 transition-colors text-zinc-300">
                  See Our Process
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">How We Work</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              A straightforward process built around your timeline, not ours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-6 border-l-2 border-gray-200 hover:border-red-500 transition-colors duration-300 group"
              >
                <span className="text-5xl font-black text-gray-100 absolute -top-3 left-2 -z-10 select-none group-hover:text-red-50 transition-colors">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((svc, index) => (
        <section key={svc.id} className={`py-24 relative overflow-hidden ${svc.bg} ${svc.text}`}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute inset-0 opacity-[0.025] ${svc.bg === 'bg-black' ? 'bg-[radial-gradient(#fff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000_1px,transparent_1px)]'} [background-size:20px_20px]`} />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left: headline + description */}
              <motion.div
                className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${svc.bg === 'bg-black' ? 'bg-zinc-800 text-red-500' : 'bg-red-50 text-red-600'}`}>
                    {svc.icon}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-[0.25em] ${svc.accent}`}>{svc.number} — {svc.category}</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  {svc.headline}
                </h2>

                <p className={`text-lg leading-relaxed mb-8 ${svc.bg === 'bg-black' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {svc.description}
                </p>

                <Link
                  prefetch={false}
                  href={svc.link}
                  className={`inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wide hover:underline decoration-red-500 underline-offset-4 ${svc.accent}`}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Right: feature list card */}
              <motion.div
                className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={`rounded-2xl border p-8 md:p-10 ${svc.cardBg} transition-all duration-300`}>
                  <p className={`text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-50`}>What's included</p>
                  <ul className="space-y-4">
                    {svc.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-4">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${svc.accent}`} />
                        <span className={`text-base font-medium ${svc.bg === 'bg-black' ? 'text-zinc-200' : 'text-gray-800'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-8 pt-8 border-t ${svc.bg === 'bg-black' ? 'border-zinc-800' : 'border-gray-100'}`}>
                    <Link prefetch={false} href="/contact">
                      <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${svc.bg === 'bg-black' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-black text-white hover:bg-zinc-800'}`}>
                        Discuss This Service →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="py-28 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/20 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Not sure where to start?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Tell us what you're trying to build. We'll come back with a clear recommendation on what to tackle first — no pitch, no pressure.
            </p>
            <Link prefetch={false} href="/contact">
              <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-100 transition-colors inline-flex items-center gap-3">
                Book a Free Call <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
