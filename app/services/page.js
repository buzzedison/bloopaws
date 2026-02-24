"use client"

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign, Smartphone, Zap, Target, Users, Layers, Rocket, ShieldCheck, Cpu } from 'lucide-react';

// --- Data Structure: Phased Approach ---
const phases = [
  {
    id: "phase-1",
    title: "Phase 1: The Foundation",
    subtitle: "Strategy & Capital",
    description: "Validate before you build. We secure the capital and the roadmap to turn your product vision into a viable business.",
    color: "red",
    icon: <ShieldCheck size={32} />,
    services: [
      {
        id: "funding",
        title: "Funding & Pitch Strategy",
        description: "We craft investor-grade pitch decks and financial models that get you to 'Yes'. We've helped founders raise millions by turning complex visions into compelling narratives.",
        features: ["Pitch Deck Design", "Financial Modeling", "Investor Targeting"],
        link: "/services/funding"
      },
      {
        id: "strategy",
        title: "Market Strategy & Research",
        description: "Don't guess. We validate your market fit with deep data analysis and competitor research, ensuring you're solving a problem people will pay for.",
        features: ["Market Validation", "Competitor Analysis", "Go-to-Market Strategy"],
        link: "/services/strategy"
      }
    ]
  },
  {
    id: "phase-2",
    title: "Phase 2: The Creation",
    subtitle: "Engineering & Design",
    description: "This is where ideas become tangible. We deploy elite engineering and world-class design to build products that are robust, scalable, and beautiful.",
    color: "black",
    icon: <Layers size={32} />,
    services: [
      {
        id: "web-app",
        title: "Web & Mobile Development",
        description: "From high-performance web apps to native mobile experiences. We write clean, scalable code that powers your business today and supports your growth tomorrow.",
        features: ["Full-Stack Development", "iOS & Android Apps", "Scalable Architecture"],
        link: "/services/web"
      },
      {
        id: "design",
        title: "Product Design (UI/UX)",
        description: "We design interfaces that convert. Our user-centric approach ensures every click, swipe, and interaction feels intuitive and premium.",
        features: ["User Interface Design", "User Experience Research", "Prototyping"],
        link: "/services/web" // Assuming design is part of web/app for now
      }
    ]
  },
  {
    id: "phase-3",
    title: "Phase 3: The Acceleration",
    subtitle: "Growth & Automation",
    description: "Building is half the battle. Now we scale. We implement AI automations and growth engines to multiply your output without multiplying your headcount.",
    color: "red",
    icon: <Rocket size={32} />,
    services: [
      {
        id: "ai",
        title: "AI & Workflow Automation",
        description: "Stop doing busy work. We build custom AI agents and automated workflows that handle customer support, lead gen, and operations 24/7.",
        features: ["Custom AI Agents", "Process Automation", "Internal Tools"],
        link: "/services/ai"
      },
      {
        id: "growth",
        title: "Growth Engineering",
        description: "Data-driven marketing infrastructure. We set up the tracking, the funnels, and the experiments to acquire customers at scale.",
        features: ["Conversion Optimization", "Analytics Setup", "Growth Experiments"],
        link: "/services/strategy"
      }
    ]
  },
  {
    id: "phase-4",
    title: "Phase 4: The Empowerment",
    subtitle: "Training & Culture",
    description: "We transfer our 'Bloop DNA' to your team. We train your internal squads to operate with elite agility and precision.",
    color: "gray",
    icon: <Users size={32} />,
    services: [
      {
        id: "training",
        title: "TaskWit Training",
        description: "Agile workshops, sales training, and leadership coaching. We transfer our 'Bloop DNA' to your team, building a culture of high performance.",
        features: ["Agile Workshops", "Sales Training", "Leadership Coaching"],
        link: "https://www.taskwit.co",
        isExternal: true
      }
    ]
  }
];

const PhaseSection = ({ phase, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className={`py-24 relative overflow-hidden ${isEven ? 'bg-white text-black' : 'bg-black text-white'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full opacity-[0.03] ${isEven ? 'bg-[radial-gradient(#000_1px,transparent_1px)]' : 'bg-[radial-gradient(#fff_1px,transparent_1px)]'} [background-size:20px_20px]`}></div>
        <div className={`absolute -right-20 top-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${phase.color === 'red' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Phase Header (Left/Right alternating) */}
          <div className={`lg:col-span-4 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-6 ${isEven ? 'bg-red-50 text-red-600' : 'bg-gray-900 text-red-500'}`}>
                {phase.icon}
              </div>
              <h3 className={`text-lg font-bold tracking-widest uppercase mb-2 ${isEven ? 'text-red-600' : 'text-red-500'}`}>
                {phase.title}
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                {phase.subtitle}
              </h2>
              <p className={`text-lg leading-relaxed ${isEven ? 'text-gray-600' : 'text-gray-400'}`}>
                {phase.description}
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className={`lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phase.services.map((service, sIndex) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sIndex * 0.1 }}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isEven
                    ? 'bg-gray-50 border-gray-100 hover:border-red-100 hover:bg-white'
                    : 'bg-gray-900 border-gray-800 hover:border-red-900/30 hover:bg-gray-800'
                    }`}
                >
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h4>
                  <p className={`mb-6 leading-relaxed ${isEven ? 'text-gray-600' : 'text-gray-400'}`}>
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm font-medium opacity-80">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isEven ? 'bg-red-500' : 'bg-red-500'}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {service.isExternal ? (
                    <a href={service.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-bold text-sm tracking-wide uppercase group-hover:underline decoration-red-500 underline-offset-4">
                      Visit TaskWit <ArrowRight className="ml-2 w-4 h-4 text-red-500" />
                    </a>
                  ) : (
                    <Link prefetch={false} href={service.link} className="inline-flex items-center font-bold text-sm tracking-wide uppercase group-hover:underline decoration-red-500 underline-offset-4">
                      Learn More <ArrowRight className="ml-2 w-4 h-4 text-red-500" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <div className="font-sans antialiased bg-white">

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black text-white overflow-hidden pt-32 pb-20">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                Dominance.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              We provide the strategic, technical, and operational infrastructure to take you from napkin sketch to market leader.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link prefetch={false} href="/contact">
                <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                  Start Your Project
                </button>
              </Link>
              <Link prefetch={false} href="#methodology">
                <button className="px-8 py-4 rounded-full font-bold text-lg border border-gray-700 hover:bg-gray-900 transition-colors">
                  Our Process
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology / Process Overview */}
      <section id="methodology" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-black mb-4">The Bloop Blueprint</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach to building value. We don't skip steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Validate", desc: "Stress-test the idea before writing code." },
              { step: "02", title: "Build", desc: "Ship a robust, scalable MVP fast." },
              { step: "03", title: "Automate", desc: "Remove human bottlenecks with AI." },
              { step: "04", title: "Scale", desc: "Pour fuel on the fire with growth ops." }
            ].map((item, i) => (
              <div key={i} className="relative p-6 border-l-2 border-gray-200 hover:border-red-500 transition-colors duration-300">
                <span className="text-6xl font-black text-gray-100 absolute -top-4 -left-2 -z-10 select-none">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Service Phases */}
      <div>
        {phases.map((phase, index) => (
          <PhaseSection key={phase.id} phase={phase} index={index} />
        ))}
      </div>

      {/* Final CTA */}
      <section className="py-32 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
            Stop playing small.
          </h2>
          <p className="text-2xl text-gray-400 mb-12">
            You have the vision. We have the army. Let's build an empire.
          </p>
          <Link prefetch={false} href="/contact">
            <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200">
              Deploy Us Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
