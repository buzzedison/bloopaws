"use client";

import { useState } from "react";
import Link from "next/link";

export default function PitchPerfectPage() {
  const [selectedParticipation, setSelectedParticipation] = useState<"pitch" | "learn" | null>(null);

  return (
    <main className="flex flex-col min-h-screen pt-12">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 pt-8 pb-16 bg-gradient-to-br from-light-white-100 via-white to-light-white-300 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Minimal Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-3xl transform rotate-12"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-500/5 rounded-2xl transform -rotate-12"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-red-500/8 rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Clean Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-semibold text-sm tracking-wide">FREE EVENT • JUNE 28, 2025</span>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-none text-black-100">
                  FOUNDER
                  <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    FIRST
                  </span>
                  <span className="block">PITCH</span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-1 bg-red-600 rounded-full"></div>
                  <p className="text-2xl md:text-3xl font-light text-gray">
                    Where Great Ideas Meet Great Support
                  </p>
                </div>
              </div>
              
              {/* Clean Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-light-white-200">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-black-100">Saturday, 2nd August 2025</p>
                    <p className="text-gray text-sm">12:00 PM - 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-light-white-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-black-100">Enterprise Village</p>
                    <p className="text-gray text-sm">Dzorwulu, Accra</p>
                  </div>
                </div>
              </div>
              
              {/* Clean CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Reserve Your Spot
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a 
                  href="#learn-more"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-light-white-200 text-black-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all hover:shadow-lg hover:border-red-300"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Enhanced 3D Visual */}
            <div className="relative perspective-1000">
              <div className="relative w-full max-w-lg mx-auto transform-gpu">
                {/* 3D Card Stack with Enhanced Depth */}
                <div className="absolute top-16 left-16 w-full h-80 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl shadow-2xl transform rotate-12 scale-95 opacity-40 blur-sm"></div>
                <div className="absolute top-12 left-12 w-full h-80 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 rounded-3xl shadow-2xl transform rotate-8 scale-97 opacity-60"></div>
                <div className="absolute top-8 left-8 w-full h-80 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl transform rotate-6 scale-98 opacity-75"></div>
                <div className="absolute top-4 left-4 w-full h-80 bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 rounded-3xl shadow-2xl transform rotate-3 scale-99 opacity-85"></div>
                
                {/* Main Interactive Card */}
                <div className="relative w-full h-80 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-500 hover:rotate-1 border border-red-400/20">
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
                  
                  <div className="relative flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <div className="w-6 h-6 bg-white rounded-lg"></div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Pitch Perfect</h3>
                          <p className="text-white/90 text-sm">Event 2025</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-lg">Your startup journey starts here</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="h-px bg-white/20"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="text-2xl font-bold">3</div>
                          <div className="text-xs text-white/80">Minutes</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="text-2xl font-bold">₵1K</div>
                          <div className="text-xs text-white/80">Prize</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="text-2xl font-bold">50+</div>
                          <div className="text-xs text-white/80">Founders</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating 3D Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl transform rotate-12 hover:rotate-45 transition-transform duration-500 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-lg opacity-80"></div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-xl animate-pulse flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full opacity-90"></div>
                </div>
                
                <div className="absolute top-1/2 -right-4 w-12 h-32 bg-gradient-to-b from-pink-400 to-purple-500 rounded-full shadow-lg transform -translate-y-1/2 rotate-12 opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simple Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-16 fill-current text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Clean Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2.5", label: "Hours", suffix: "hrs" },
              { number: "1000", label: "Prize Pool", prefix: "₵" },
              { number: "50", label: "Founders", suffix: "+" },
              { number: "100", label: "Learning", suffix: "%" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-black text-black-100 mb-2 group-hover:text-red-600 transition-colors">
                  {stat.prefix}{stat.number}{stat.suffix}
                </div>
                <p className="text-gray font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="learn-more" className="py-24 px-4 bg-light-white-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-black-100 mb-6">
              Finally, A Pitch Event That Actually Puts{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                YOU
              </span>{" "}
              First
            </h2>
            <p className="text-xl md:text-2xl text-gray max-w-4xl mx-auto leading-relaxed">
              Tired of pitch competitions that feel like gladiator battles? Where you need perfect slides, 
              flawless delivery, and all the answers to even consider participating?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Problems */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-black-100 mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  Traditional Pitch Events
                </h3>
              </div>
              {[
                "High-pressure performance anxiety",
                "Focus on perfection over passion", 
                "Intimidating for early-stage founders",
                "Competition kills collaboration",
                "You leave feeling more confused than confident"
              ].map((problem, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-red-100">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray text-lg leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-black-100 mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  Our Founder-First Solution
                </h3>
              </div>
              {[
                "Your passion matters more than polish",
                "Learning trumps performing",
                "All stages welcome - from idea to execution", 
                "Community over competition",
                "You leave with clarity, connections, and confidence"
              ].map((solution, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray text-lg leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl md:text-6xl font-black text-center text-black-100 mb-20">
            What Makes This Event{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Different?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "No Performance Pressure",
                description: "Bring your passion, we'll help with the rest. Authentic stories matter more than rehearsed performances.",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Learning-First Approach",
                description: "Every minute designed to educate. Gain actionable insights you can implement immediately.",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Real Expert Feedback", 
                description: "3 minutes of direct feedback from industry experts and investors who want to help you succeed.",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Amazing Prizes + More",
                description: "Cash prizes, free websites, coworking access. But the real value? Connections and confidence.",
                color: "from-red-500 to-red-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-light-white-200 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className={`w-3 h-3 bg-gradient-to-r ${feature.color} rounded-full mb-6`}></div>
                  <h3 className="text-xl font-bold text-black-100 mb-4">{feature.title}</h3>
                  <p className="text-gray leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-24 px-4 bg-light-white-100">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-6xl font-black text-center text-black-100 mb-20">
            Here's What Happens in{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              2.5 Hours
            </span>
          </h2>
          
          <div className="space-y-8">
            {[
              {
                title: "PITCH SESSION",
                duration: "3 minutes each",
                description: "Share your vision with authentic storytelling. No need for perfect slides - just genuine enthusiasm."
              },
              {
                title: "EXPERT FEEDBACK", 
                duration: "3 minutes each",
                description: "Industry professionals give immediate, actionable guidance to help you think critically about your venture."
              },
              {
                title: "EDUCATIONAL PRESENTATIONS",
                duration: "",
                description: "Learn practical insights about startup financing and fundraising you can apply right away."
              },
              {
                title: "NETWORKING & COMMUNITY",
                duration: "",
                description: "Connect with fellow founders, investors, mentors, and industry professionals. Build lasting relationships."
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-8 p-8 bg-white rounded-2xl shadow-lg border border-light-white-200 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full shrink-0 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-black-100">{item.title}</h3>
                      {item.duration && (
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-gray text-lg leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Options */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-black text-center text-black-100 mb-6">
            Two Ways to{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Participate
            </span>
          </h2>
          <p className="text-2xl text-gray text-center mb-20">(Both Equally Welcome)</p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group relative">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 rounded-3xl shadow-xl border border-red-200 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-8 mx-auto"></div>
                <h3 className="text-3xl font-bold text-black-100 mb-6 text-center">ACTIVE PARTICIPATION</h3>
                <p className="text-gray text-lg mb-8 text-center leading-relaxed">
                  Pitch your idea on stage and receive expert feedback. Perfect for founders ready to share their vision.
                </p>
                <button 
                  onClick={() => setSelectedParticipation("pitch")}
                  className={`w-full py-4 px-8 rounded-full font-bold text-xl transition-all ${
                    selectedParticipation === "pitch" 
                      ? "bg-red-600 text-white shadow-lg scale-105" 
                      : "bg-white text-gray border-2 border-light-white-200 hover:bg-light-white-100"
                  }`}
                >
                  I Want to Pitch
                </button>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-3xl shadow-xl border border-blue-200 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 mx-auto"></div>
                <h3 className="text-3xl font-bold text-black-100 mb-6 text-center">LEARNING PARTICIPATION</h3>
                <p className="text-gray text-lg mb-8 text-center leading-relaxed">
                  Attend, learn, and network without pitching. Ideal for early-stage ideas or those wanting to observe first.
                </p>
                <button 
                  onClick={() => setSelectedParticipation("learn")}
                  className={`w-full py-4 px-8 rounded-full font-bold text-xl transition-all ${
                    selectedParticipation === "learn" 
                      ? "bg-blue-600 text-white shadow-lg scale-105" 
                      : "bg-white text-gray border-2 border-light-white-200 hover:bg-light-white-100"
                  }`}
                >
                  I Want to Learn
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray text-lg mt-12">
            Both options give you full access to all sessions, networking, and educational content.
          </p>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-24 px-4 bg-light-white-100">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-5xl md:text-6xl font-black text-black-100 mb-20">
            Amazing{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Prizes
            </span>{" "}
            + So Much More
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-3xl border-2 border-yellow-200 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-6 mx-auto"></div>
                <h3 className="text-2xl font-bold text-black-100 mb-4">1st Place</h3>
                <p className="text-3xl font-black text-yellow-700">₵1000 Cash Prize</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-white p-8 rounded-3xl border-2 border-light-white-200 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="w-4 h-4 bg-gradient-to-r from-gray to-black-100 rounded-full mb-6 mx-auto"></div>
                <h3 className="text-2xl font-bold text-black-100 mb-4">2nd Place</h3>
                <p className="text-xl font-bold text-gray">Free Professional Website</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl border-2 border-orange-200 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mb-6 mx-auto"></div>
                <h3 className="text-2xl font-bold text-black-100 mb-4">3rd Place</h3>
                <p className="text-xl font-bold text-orange-700">Free Coworking Space</p>
              </div>
            </div>
          </div>
          
          <p className="text-2xl text-gray font-medium">
            But the real value? The <strong className="text-black-100">connections, insights, and confidence</strong> you'll gain.
          </p>
        </div>
      </section>

      {/* Powered By */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h3 className="text-3xl font-bold text-black-100 mb-12">Powered By</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex items-center gap-4 p-6 bg-light-white-100 rounded-2xl">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              <div className="text-left">
                <p className="text-xl font-bold text-black-100">Bloop Global LLC</p>
                <p className="text-gray">International startup expertise</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-light-white-100 rounded-2xl">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="text-left">
                <p className="text-xl font-bold text-black-100">The Enterprise Village</p>
                <p className="text-gray">Local ecosystem knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="py-24 px-4 bg-gradient-to-r from-black-100 via-black to-black-100">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Ready to Experience Pitching the Way It{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Should Be?
            </span>
          </h2>
          <p className="text-2xl text-light-white-200 mb-12 max-w-3xl mx-auto">
            Join us for an event designed for YOUR success, where great ideas meet great support.
          </p>
          
          <div className="bg-white rounded-3xl p-10 max-w-3xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <div>
                  <p className="font-bold">Saturday, 2nd August, 2025</p>
                  <p className="text-gray">12:00 PM - 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-bold">The Enterprise Village</p>
                  <p className="text-gray">Dzorwulu, Accra</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <div>
                  <p className="font-bold">FREE Event</p>
                  <p className="text-gray">RSVP Required</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <div>
                  <p className="font-bold">All Stages Welcome</p>
                  <p className="text-gray">Idea to execution</p>
                </div>
              </div>
            </div>
            
            <div id="register" className="mt-12 text-center">
              <a
                href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-xl transition-all shadow-lg hover:shadow-xl"
              >
                {selectedParticipation === "pitch" ? "Register to Pitch" : selectedParticipation === "learn" ? "Register to Learn" : "Choose an Option to Register"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-16 px-4 bg-light-white-100">
        <div className="container mx-auto max-w-5xl text-center">
          <blockquote className="text-2xl md:text-3xl text-gray italic mb-8 leading-relaxed">
            "Traditional pitch events made me feel like I wasn't ready. This event made me realize I was more ready than I thought - I just needed the right support and feedback."
          </blockquote>
          <p className="text-xl font-bold text-black-100">
            We're not here to judge you. We're here to help you grow.
          </p>
        </div>
      </section>

      <div className="mt-20 text-center">
        <h3 className="text-4xl font-bold text-black-100 mb-6">Ready to Join Us?</h3>
        <p className="text-xl text-gray mb-10 max-w-2xl mx-auto">
          Secure your spot at the most supportive pitch event in town. Whether you're pitching or learning, you're in for a treat.
        </p>
        <a
          href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-5 px-12 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Sign Up for Pitch Perfect
        </a>
      </div>
    </main>
  );
} 