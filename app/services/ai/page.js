"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Zap, FileText, CheckCircle2, TrendingUp, Building2, Terminal, Users, Search, Play, Server } from 'lucide-react';

export default function AIAutomationServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  const useCases = [
    {
      icon: <FileText size={32} className="text-red-500" />,
      title: "Invoice Processing",
      features: [
        "AI reads invoices (OCR)",
        "Extracts key data",
        "Validates against purchase orders",
        "Routes for approval",
        "Posts to accounting system"
      ],
      roi: "20-30 hours/week saved"
    },
    {
      icon: <Users size={32} className="text-red-500" />,
      title: "Customer Service",
      features: [
        "AI answers common questions",
        "Routes complex issues to humans",
        "Learns from interactions",
        "Available 24/7"
      ],
      roi: "50%+ reduction in support volume"
    },
    {
      icon: <Search size={32} className="text-red-500" />,
      title: "Document Classification",
      features: [
        "AI reads documents",
        "Classifies by type",
        "Extracts key information",
        "Routes to right department"
      ],
      roi: "15-25 hours/week saved"
    },
    {
      icon: <Terminal size={32} className="text-red-500" />,
      title: "Data Entry",
      features: [
        "AI reads forms, receipts, documents",
        "Extracts structured data",
        "Validates and cleans",
        "Enters into your system"
      ],
      roi: "30-40 hours/week saved"
    }
  ];

  const packages = [
    {
      name: "Process Audit Only",
      price: "GHS 5K",
      time: "1 week",
      perfectFor: "Understanding automation opportunities before committing",
      includes: "Analysis of 3-5 processes, ROI calculations, recommendations",
      deliverable: "Process Audit Report",
      roiDelay: "N/A",
      popular: false
    },
    {
      name: "Single Workflow Automation",
      price: "GHS 10K-15K",
      time: "3-4 weeks",
      perfectFor: "Automating one high-impact process",
      includes: "Design, development, testing, deployment, training",
      example: "Invoice processing, email classification, data extraction",
      roiDelay: "Typically 90 days or less",
      popular: true
    },
    {
      name: "Multi-Workflow Automation",
      price: "GHS 25K-35K",
      time: "6-8 weeks",
      perfectFor: "Automating 3-5 related processes",
      includes: "Everything in Single Workflow × 3-5",
      example: "End-to-end accounts payable automation",
      roiDelay: "Typically 4-6 months",
      popular: false
    },
    {
      name: "Enterprise AI Platform",
      price: "GHS 80K-120K",
      time: "12-16 weeks",
      perfectFor: "Large-scale automation across departments",
      includes: "Custom AI models, integrations across systems, admin dashboard",
      example: "Customer service automation, document processing at scale",
      roiDelay: "Typically 6-12 months",
      popular: false
    }
  ];

  const approachSteps = [
    {
      title: "Process Audit",
      week: "Week 1",
      desc: "We analyze your workflows. Identify automation opportunities. Calculate potential ROI. What processes take the most time? Which can be automated? What's the ROI? You get a Process Audit Report with specific recommendations and ROI calculations."
    },
    {
      title: "Solution Design",
      week: "Week 2",
      desc: "We design the automation solution. Map data flows. Plan integrations. How will it work? What data is needed? How does it integrate with existing systems?"
    },
    {
      title: "Development",
      week: "Weeks 3-6",
      desc: "We build and test the automation. Train AI models. Integrate with your systems using rigorous testing protocols."
    },
    {
      title: "Deployment & Training",
      week: "Weeks 7-8",
      desc: "We deploy to production. Train your team. Monitor performance. You'll be fully equipped to handle and leverage the new system."
    }
  ];

  return (
    <div ref={containerRef} className="font-sans antialiased bg-white overflow-hidden text-black">

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-black text-white px-6 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-medium mb-8">
              <Zap size={16} /> Enterprise AI That Actually Delivers ROI
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              See ROI in 90 Days or <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                We Keep Working Until You Do.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop wasting time on repetitive tasks. We act where AI actually matters: from invoice processing and data entry to document classification and email routing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link prefetch={false} href="/contact">
                <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]">
                  Book Free Process Audit Call
                </button>
              </Link>
              <div className="text-gray-400 font-medium">
                Save 40+ hours per week.
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 sm:mt-24 relative mx-auto w-full max-w-4xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
              <Image
                src="/images/ai/hero-ai.png"
                alt="AI Automation Abstract"
                layout="responsive"
                width={1024}
                height={1024}
                className="rounded-t-3xl border-t border-x border-red-900/40 shadow-[0_0_50px_-15px_rgba(220,38,38,0.4)] object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Problem & Opportunity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Your team wastes <span className="text-red-600">40+ hours/week</span> on tasks AI can do in seconds.
            </h2>
            <div className="space-y-4 mb-8 text-xl text-gray-600 leading-relaxed">
              <p>Manual invoice processing. Repetitive data entry. Document classification. Email routing. Report generation.</p>
              <p className="font-semibold text-black">These aren&apos;t strategic tasks. But they eat your team&apos;s time.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-100 rounded-3xl blur-3xl opacity-30 transform translate-x-4 translate-y-4"></div>
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl bg-white group flex flex-col h-full">
              <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                <Image
                  src="/images/ai/use-cases-ai.png"
                  alt="Data Processing Visualization"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12 flex-1 bg-white relative">
                <h3 className="text-2xl font-bold mb-4 text-black">The AI Opportunity</h3>
                <p className="text-lg text-gray-600 mb-6">
                  AI can automate these processes. But most companies don&apos;t know where to start.
                  ChatGPT is impressive. But how does it help with your specific business problems?
                </p>
                <div className="inline-block px-6 py-3 bg-red-50 text-red-600 font-bold rounded-lg mt-2 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  We help you answer that question.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Use Cases Grid */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What We Automate</h2>
            <p className="text-xl text-gray-400">Practical business problems, not hype.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-red-500/50 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{useCase.title}</h3>
                </div>

                <ul className="space-y-3 mb-8">
                  {useCase.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-gray-400">
                      <CheckCircle2 size={18} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-800">
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Typical ROI</div>
                  <div className="text-lg font-bold text-red-400">{useCase.roi}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-24 bg-red-600 text-white perspective-1000">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-red-700/50 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-red-500/30 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-red-200 mb-6 font-bold uppercase tracking-wider text-sm">
              <TrendingUp size={18} /> Reality Check: Success Story
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-6">Large Ghanaian Financial Services Firm</h3>
                <div className="space-y-4 text-red-100">
                  <p><strong className="text-white">Process:</strong> Manual invoice processing (200+ invoices/week)</p>
                  <p><strong className="text-white">Team time:</strong> 30 hours/week (2 people × 15 hours)</p>
                  <p><strong className="text-white">Cost:</strong> GHS 800/week in labor</p>
                </div>

                <div className="mt-8 pt-8 border-t border-red-500/30 space-y-3">
                  <h4 className="font-bold text-xl mb-4">We automated it:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><ArrowRight size={16} /> AI reads and validates invoices</li>
                    <li className="flex items-center gap-2"><ArrowRight size={16} /> Auto-approves routine invoices</li>
                    <li className="flex items-center gap-2"><ArrowRight size={16} /> Flags exceptions for human review</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-8">
                <h4 className="text-2xl font-bold mb-6">The Result:</h4>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">25 hrs</div>
                    <div className="text-red-200">Saved per week (83% reduction)</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">GHS 38,400</div>
                    <div className="text-red-200">In yearly labor cost savings</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-white mb-1">3.7 months</div>
                    <div className="text-red-200">ROI Time (Project Cost: GHS 12K)</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">Our Approach</h2>
            <p className="text-xl text-gray-600">How we turn chaos into clockwork.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1 hidden lg:block"
            >
              <div className="absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-20 transform -translate-x-12 translate-y-12"></div>
              <Image
                src="/images/ai/approach-pipeline-ai.png"
                alt="Our Precise Pipeline"
                layout="responsive"
                width={1024}
                height={1024}
                className="relative z-10 rounded-3xl shadow-2xl object-cover"
              />
            </motion.div>

            <div className="space-y-8 order-1 lg:order-2">
              {approachSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 font-black text-2xl">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-red-500 tracking-wider uppercase mb-1">{step.week}</div>
                    <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">Investment Packages</h2>
            <p className="text-xl text-gray-600">Transparent pricing for real business outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-transform hover:-translate-y-1 ${pkg.popular
                  ? 'border-red-500 shadow-xl'
                  : 'border-gray-100 shadow-sm hover:border-red-200 hover:shadow-lg'
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-black mb-2">{pkg.name}</h3>
                <div className="text-3xl font-extrabold text-red-600 mb-2">{pkg.price}</div>
                <div className="text-gray-500 text-sm font-medium mb-6">Timeline: {pkg.time}</div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Perfect For</div>
                    <p className="text-sm text-gray-800 font-medium">{pkg.perfectFor}</p>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Includes</div>
                    <p className="text-sm text-gray-600">{pkg.includes}</p>
                  </div>
                  {pkg.example && (
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Example</div>
                      <p className="text-sm text-gray-600">{pkg.example}</p>
                    </div>
                  )}
                  {pkg.deliverable && (
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Deliverable</div>
                      <p className="text-sm text-gray-600 font-medium">{pkg.deliverable}</p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Expected ROI</div>
                    <p className="text-sm font-bold text-red-600">{pkg.roiDelay}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee & Final CTA */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,38,38,0.8)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <ShieldCheck size={64} className="text-red-500 mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            Our Guarantee
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            If you don&apos;t see ROI within 90 days, we keep working <span className="text-white font-bold border-b-2 border-red-500">for free</span> until you do.
          </p>
          <p className="text-xl text-red-400 font-bold mb-16 uppercase tracking-widest">
            We&apos;re that confident.
          </p>

          <Link prefetch={false} href="/contact">
            <button className="bg-white text-black px-10 py-5 rounded-full font-extrabold text-xl hover:bg-gray-200 transition-all transform hover:scale-105 duration-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Book Free Process Audit Call
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
