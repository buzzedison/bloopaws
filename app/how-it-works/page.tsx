'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, FileText, Layers, Rocket, LifeBuoy, CheckCircle2, Clock, Users, Shield } from 'lucide-react';

const phases = [
  {
    number: '01',
    name: 'Discovery Call',
    duration: 'Day 1',
    headline: 'We listen before we propose anything.',
    description: 'A 45-minute call where we ask about your idea, your market, your timeline, and your budget. No pitch from us — just questions. By the end we\'ll have a clear enough picture to tell you honestly whether we can help and roughly what it would cost.',
    icon: <MessageSquare className="w-6 h-6" />,
    deliverables: [
      'Honest assessment of your idea and market',
      'Rough scope and timeline estimate',
      'Clear next steps (or honest redirect if we\'re not the right fit)',
    ],
    clientTime: '45 minutes of your time',
  },
  {
    number: '02',
    name: 'Scope & Proposal',
    duration: 'Days 2–5',
    headline: 'A written plan before any money changes hands.',
    description: 'We take what we learned on the call and turn it into a detailed written scope: what we\'ll build, what we won\'t build in this phase, the tech stack, the milestones, and a fixed price. Nothing starts until you\'ve reviewed it, asked questions, and signed off.',
    icon: <FileText className="w-6 h-6" />,
    deliverables: [
      'Full written scope document',
      'Tech stack recommendation with rationale',
      'Fixed-price quote (no surprise invoices)',
      'Payment schedule tied to milestones',
    ],
    clientTime: '1–2 hours to review and give feedback',
  },
  {
    number: '03',
    name: 'Design & Architecture',
    duration: 'Weeks 1–2',
    headline: 'You see exactly what we\'re building before we build it.',
    description: 'Before writing a single line of production code, we design the product and map out the architecture. You review and approve wireframes and flows — so when development starts, there are no surprises about what the product looks or behaves like.',
    icon: <Layers className="w-6 h-6" />,
    deliverables: [
      'Wireframes for all key screens',
      'User flow documentation',
      'Technical architecture diagram',
      'Database schema overview',
    ],
    clientTime: '2–3 hours of reviews and approvals',
  },
  {
    number: '04',
    name: 'Build Sprints',
    duration: 'Weeks 2–10',
    headline: 'Weekly demos. No black boxes.',
    description: 'We build in 1-week sprints. Every Friday you get a live demo of what was completed that week — a real, working version you can click through, not a screenshot deck. You can give feedback, request adjustments, and see the product grow in real time. If something isn\'t right, we catch it in week 3, not week 10.',
    icon: <Rocket className="w-6 h-6" />,
    deliverables: [
      'Weekly live demos every Friday',
      'Shared project board (you have full visibility)',
      'Working build accessible via staging URL',
      'Weekly written update with what\'s next',
    ],
    clientTime: '30-min demo call each Friday',
  },
  {
    number: '05',
    name: 'Launch & Handover',
    duration: 'Final week',
    headline: 'You own everything. No dependency on us.',
    description: 'We deploy to production, run final QA, and then hand over everything: the code repository, access credentials, documentation, and a recorded walkthrough of the codebase. Your team should be able to maintain and extend the product without us — that\'s the standard we hold ourselves to.',
    icon: <LifeBuoy className="w-6 h-6" />,
    deliverables: [
      'Production deployment',
      'Full codebase handover (you own it)',
      'Recorded codebase walkthrough',
      'Written documentation',
      'Optional: 30-day post-launch support retainer',
    ],
    clientTime: '2-hour handover session',
  },
];

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'Most MVPs run $15,000–$50,000 depending on complexity. AI automation projects typically start from $8,000. We give a fixed price in the proposal — not an estimate that expands later.',
  },
  {
    q: 'How long does a typical build take?',
    a: 'Most MVPs ship in 8–12 weeks. Simpler AI automation projects can be done in 3–4 weeks. We\'ll give you a specific timeline in the scope document before anything starts.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. Over 70% of our clients have no coding background. We handle all technical decisions and explain our choices in plain language at every step.',
  },
  {
    q: 'What if the scope changes mid-build?',
    a: 'Minor adjustments are included. If something materially changes the scope, we scope it transparently and agree on the addition before it\'s built — never a surprise invoice at the end.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. 100%. From day one. We don\'t retain any IP or hold code hostage to retain clients.',
  },
  {
    q: 'What happens after launch?',
    a: 'We offer retainer packages from $2,000/month for ongoing development, hosting management, and feature additions. It\'s optional — we build you to be self-sufficient either way.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-70 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
              How We Work
            </span>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-8 text-black">
              What it actually looks like{' '}
              <span className="text-red-600">to work with us.</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mb-10">
              From the first call to launch day — here's exactly what happens, when it happens, and what we need from you at each step. No mystery, no jargon.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <Clock className="w-4 h-4 text-red-600" />, label: '8–12 week average MVP' },
                { icon: <Users className="w-4 h-4 text-red-600" />, label: '70% non-technical founders' },
                { icon: <Shield className="w-4 h-4 text-red-600" />, label: 'Fixed price, no surprises' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                  {s.icon}
                  {s.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase timeline */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.5}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-16 mb-16 border-b border-zinc-100 last:border-0 last:pb-0 last:mb-0"
              >
                {/* Left: number + timeline line */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg">
                    {phase.number}
                  </div>
                  {i < phases.length - 1 && (
                    <div className="hidden lg:block w-[2px] flex-1 bg-zinc-100 mx-auto mt-4" style={{ minHeight: '60px' }} />
                  )}
                </div>

                {/* Right: content */}
                <div className="lg:col-span-11">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600 mb-1">
                        {phase.name}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-black leading-tight">
                        {phase.headline}
                      </h2>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {phase.duration}
                    </span>
                  </div>

                  <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                    {phase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deliverables */}
                    <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">What you get</p>
                      <ul className="space-y-3">
                        {phase.deliverables.map((d, di) => (
                          <li key={di} className="flex items-start gap-3 text-sm text-zinc-700">
                            <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Client time */}
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400 mb-4">Your time commitment</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm font-semibold text-red-900">{phase.clientTime}</p>
                      </div>
                      <p className="text-xs text-red-400 mt-3 leading-relaxed">
                        We keep your involvement focused so you can run your business while we build the product.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Common questions</h2>
            <p className="text-zinc-500 text-lg">The things most founders ask before getting started.</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.3}
                className="bg-white rounded-2xl border border-zinc-100 p-8 hover:border-zinc-200 hover:shadow-sm transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-black mb-3">{faq.q}</h3>
                <p className="text-zinc-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/25 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Ready to start with the first call?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              It's 45 minutes. No commitment, no pitch from our side — just a straight conversation about what you're building.
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
