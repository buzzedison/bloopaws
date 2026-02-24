"use client"

import { motion } from "framer-motion"

import Link from "next/link"

import { ArrowRight, Sparkles, CheckCircle2, Zap, Clock, Shield, Award } from "lucide-react"

export default function AnniversaryPage() {

  const fadeInUp = {

    initial: { opacity: 0, y: 40 },

    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    },

  }

  const staggerContainer = {

    initial: { opacity: 0 },

    animate: {

      opacity: 1,

      transition: {

        staggerChildren: 0.12,

      },

    },

  }

  return (

    <div className="min-h-screen bg-white text-black overflow-hidden">

      {/* Hero Section */}

      <section className="relative pt-32 pb-40">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-red-600 opacity-5 rounded-full blur-3xl"></div>

        </div>

        <div className="relative max-w-6xl mx-auto px-6">

          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl">

            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">

              <div className="w-2 h-2 bg-red-600 rounded-full"></div>

              <span className="text-sm font-medium text-gray-600 tracking-widest uppercase">Anniversary Special</span>

              </motion.div>

            <motion.h1 variants={fadeInUp} className="text-7xl md:text-8xl font-black mb-8 leading-none tracking-tight">

              Elevate Your

                <br />

              <span className="text-red-600">Business</span>

              </motion.h1>

              <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl font-light leading-relaxed"
            >
              Professional websites, pitch decks & business plans. Anniversary pricing—now only GHC 1,500. Offer ends 30 December 2025.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-16">

              <Link prefetch={false} href="#packages">

                  <motion.button

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: 0.95 }}

                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 text-lg flex items-center gap-2"

                  >

                  Explore Packages

                    <ArrowRight className="w-5 h-5" />

                  </motion.button>

                </Link>

              <motion.button

                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}

                className="px-8 py-4 border border-gray-300 hover:border-gray-500 text-black font-semibold rounded-lg transition-colors duration-200 text-lg"

              >

                Learn More

              </motion.button>

            </motion.div>

            {/* Stats */}

            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-12">

              {[

                { value: "Up to 90%", label: "Anniversary Discount" },

                { value: "7-10 Days", label: "Delivery" },

                { value: "4.9/5", label: "Client Rating" },

              ].map((stat, i) => (

                <div key={i}>

                  <div className="text-3xl font-black text-red-600 mb-2">{stat.value}</div>

                  <div className="text-sm text-gray-500">{stat.label}</div>

                </div>

              ))}

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* Packages Section */}

      <section id="packages" className="relative py-32 border-t border-gray-200">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600 opacity-3 rounded-full blur-3xl"></div>

        </div>

        <div className="relative max-w-6xl mx-auto px-6">

          <motion.div

            initial={{ opacity: 0, y: 40 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            className="mb-20"

          >

            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Choose Your Package</h2>

            <p className="text-xl text-gray-600 max-w-2xl">

              Everything you need to look professional and win trust. Limited time pricing.

            </p>

          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">

            {[

              {

                title: "Website",

                price: "GHC 1,500",

                oldPrice: "GHC 10,000",

                description: "Launch-ready. 7-day delivery.",

                features: [

                  "Custom responsive design",

                  "Up to 5 pages",

                  "Mobile-optimized",

                  "1 year hosting included",

                  "SSL certificate",

                  "Basic SEO setup",

                  "30 days support",

                ],

                cta: "/anniversary/form?package=website",

              },

              {

                title: "Pitch Deck",

                price: "GHC 1,500",

                oldPrice: "GHC 2,000",

                description: "Investor-ready. AI-generated.",

                features: [

                  "AI-generated 10-15 slides",

                  "Professional templates",

                  "Editable PowerPoint/Slides",

                  "PDF export",

                  "Industry customization",

                  "1 round regeneration",

                  "Expert review option",

                ],

                cta: "/anniversary/form?package=pitch-deck",

              },

              {

                title: "Business Plan",

                price: "GHC 1,500",

                oldPrice: "GHC 2,500",

                description: "25+ pages. Bank-ready.",

                features: [

                  "Executive summary",

                  "Market analysis",

                  "Competitive analysis",

                  "3-year financial projections",

                  "Marketing strategy",

                  "Operations plan",

                  "Editable Word/Docs",

                ],

                cta: "/anniversary/form?package=business-plan",

              },

            ].map((pkg, index) => (

            <motion.div

                    key={index}

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{ delay: index * 0.1 }}

              >

                <Link prefetch={false} href={pkg.cta}>

                  <div className="group h-full bg-gray-50 border border-gray-200 hover:border-red-600/50 rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col">

                    <div className="mb-6 pb-6 border-b border-gray-200">

                      <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>

                      <div className="flex items-baseline gap-3 mb-3">

                        <div className="text-4xl font-black text-red-600">{pkg.price}</div>

                        <div className="text-sm text-gray-400 line-through">{pkg.oldPrice}</div>

              </div>

                      <p className="text-gray-600 text-sm">{pkg.description}</p>

                  </div>

                    <ul className="space-y-3 mb-8 flex-grow">

                      {pkg.features.map((feature, i) => (

                        <li key={i} className="flex items-start gap-3">

                          <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />

                          <span className="text-gray-700 text-sm">{feature}</span>

                  </li>

                ))}

              </ul>

                <motion.button

                  whileHover={{ scale: 1.02 }}

                  whileTap={{ scale: 0.98 }}

                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"

                    >

                      <span>Get This Deal</span>

                      <ArrowRight className="w-4 h-4" />

                </motion.button>

                  </div>

              </Link>

            </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* Details Section */}

      <section className="relative py-32 border-t border-gray-200">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600 opacity-3 rounded-full blur-3xl"></div>

                  </div>

        <div className="relative max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Why Choose Us</h2>

              <div className="space-y-6">

                {[

                  { icon: Zap, label: "Lightning Fast", desc: "Delivered in 7-10 days" },

                  { icon: Shield, label: "Professional Quality", desc: "Built by experienced teams" },

                  { icon: Award, label: "Award-Winning", desc: "4.9/5 client satisfaction" },

                  { icon: Clock, label: "No Hidden Fees", desc: "Transparent pricing" },

                ].map((item, i) => (

                  <div key={i} className="flex gap-4">

                    <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0">

                      <item.icon className="w-6 h-6 text-red-600" />

                </div>

                    <div>

                      <h3 className="font-semibold mb-1">{item.label}</h3>

                      <p className="text-gray-600 text-sm">{item.desc}</p>

              </div>

                  </div>

                ))}

              </div>

            </motion.div>

            <motion.div

              initial={{ opacity: 0, x: 40 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              className="bg-gray-50 border border-gray-200 rounded-2xl p-12"

            >

              <div className="mb-8">

                <Sparkles className="w-12 h-12 text-red-600 mb-4" />

                <h3 className="text-2xl font-black mb-4">Limited Time Offer</h3>

                <p className="text-gray-600 mb-6">

                  This is our anniversary celebration. We're offering premium services at unbeatable prices—but only for

                  this month.

                </p>

              </div>

              <div className="space-y-4 pt-8 border-t border-gray-200">

                <div className="flex justify-between">

                  <span className="text-gray-600">Regular Price</span>

                  <span className="text-black">GHC 10,000+</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-600">Anniversary Price</span>

                  <span className="text-red-600 font-bold">GHC 1,500</span>

                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">

                  <span className="font-semibold text-black">You Save</span>

                  <span className="text-red-600 font-bold text-lg">Up to 67%</span>

                </div>

                <p className="text-sm text-gray-500 text-right">Offer ends 30 December 2025.</p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* Final CTA */}

      <section className="relative py-32 border-t border-gray-200">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <h2 className="text-6xl md:text-7xl font-black mb-8">

              Transform Your

              <br />

              <span className="text-red-600">Digital Presence</span>

            </h2>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">

              Secure premium services at unprecedented prices. This celebration pricing ends soon—seize the opportunity

              to elevate your brand.

            </p>

            <Link prefetch={false} href="#packages">

              <motion.button

                whileHover={{ scale: 1.05 }}

                whileTap={{ scale: 0.95 }}

                className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-600/30 transition-all duration-200 text-lg"

              >

                Claim Your Deal

                <ArrowRight className="w-5 h-5" />

              </motion.button>

            </Link>

          </motion.div>

        </div>

      </section>

    </div>

  )

}
