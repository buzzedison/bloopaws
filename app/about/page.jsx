import Image from 'next/image'
import { ArrowRight, Globe, Zap, Target, Users, BarChart } from 'lucide-react'
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <header className="py-20 md:py-28 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
            We Transform <span className="text-red-600">Ideas</span> into <span className="text-red-600">Industry Leaders</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl">
            From disruptive startups to Fortune 500 innovators, Bloop Global catalyzes unprecedented growth and market leadership.
          </p>
          <button className="bg-red-600 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-red-700 transition-colors inline-flex items-center">
            Start Your Transformation
            <ArrowRight className="ml-2" />
          </button>
        </header>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Vision</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To be the premier catalyst for business innovation and growth, empowering companies of all sizes to create industry-leading products and services that reshape markets globally.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/digital.png"
                alt="Bloop Global Vision"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-24 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 bg-red-600 text-white">
              <h2 className="text-3xl font-bold mb-8">The Bloop Advantage</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <Zap className="mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Big Ideas, Bigger Impact</h3>
                    <p>We focus on ideas that have the power to revolutionize industries and improve lives.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Globe className="mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Comprehensive Growth Ecosystem</h3>
                    <p>We offer end-to-end support tailored to your business stage and needs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Target className="mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Global Perspective, Local Expertise</h3>
                    <p>We position our partner companies for success in both established and emerging markets.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/images/digitald.png"
                alt="Bloop Global Advantage"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">How We Drive Success. The Bloop Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Identify Opportunities", icon: Target, description: "We pinpoint opportunities for groundbreaking growth and innovation." },
              { title: "Assemble Elite Teams", icon: Users, description: "We bring together world-class talent, pairing visionary leaders with experienced industry experts." },
              { title: "Fuel Growth and Innovation", icon: Zap, description: "We provide hands-on support tailored to your business needs." },
              { title: "Drive Market Leadership", icon: BarChart, description: "Our ultimate goal is to build or transform businesses into market leaders." }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-600 text-white rounded-full p-3 inline-block mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">Our Track Record. From Startups to Industry Giants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Startup Success", 
                description: "Launched and scaled ventures like CrowdPen, TaskWit, and Ding",
                image: "/images/digitalpeople.png"
              },
              { 
                title: "Corporate Innovation", 
                description: "Assisted Fortune 500 companies in developing new product lines and entering emerging markets",
                image: "/images/real.png"
              },
              { 
                title: "Digital Transformation", 
                description: "Guided established businesses through successful digital overhauls, resulting in increased efficiency and market share",
                image: "/images/digitala.png"
              }
            ].map((record, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={record.image}
                    alt={record.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-black mb-4">{record.title}</h3>
                  <p className="text-gray-700">{record.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white p-12 rounded-3xl shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Partner with Bloop Global</h2>
            <p className="text-xl mb-8">
              Whether you're a startup founder with a game-changing idea or a corporate leader looking to drive innovation and growth, Bloop Global is your ideal partner. We're not just consultants or investors – we're co-creators and growth accelerators, committed to your success at every stage of your business journey.
            </p>
            <Link href="/contact">
            <button className="inline-flex items-center bg-white text-red-600 font-semibold py-4 px-8 rounded-full text-lg hover:bg-gray-50 transition-colors">
              Contact Us to Accelerate Your Growth
              <ArrowRight className="ml-2" />
            </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}