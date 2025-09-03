'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Users,
  TrendingUp,
  ChevronRight,
  MapPin,
  Clock,
  Target,
  CheckCircle,
  Calendar,
  MessageSquare,
  Award,
  Star,
  ArrowRight,
  Play
} from 'lucide-react'
import ApplicationForm from './components/ApplicationForm'

export default function VanguardClient() {
  const [activeRole, setActiveRole] = useState('mobile')
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedApplicationRole, setSelectedApplicationRole] = useState('mobile')

  const roles = [
    {
      id: 'mobile',
      icon: Smartphone,
      title: 'Mobile Engineering Intern',
      subtitle: 'Build & Ship Features',
      description: 'Build and ship features for live products; integrate APIs (Supabase/REST), basic analytics, testing, and store builds.',
      requirements: [
        'Shipped apps/features or strong repos',
        'Solid Git/PR habits',
        'Product sense',
        'Flutter or React Native preferred'
      ],
      kpis: [
        'Weekly feature velocity',
        'Crash-free sessions',
        'PR review pass rate'
      ]
    },
    {
      id: 'bd-sales',
      icon: Users,
      title: 'Business Development & Sales Interns',
      subtitle: 'Close Real Deals',
      description: 'Outbound research, pipe building (email/LinkedIn/WhatsApp), book discovery calls, help craft offers/proposals, and close small website/app projects.',
      requirements: [
        'Sales experience preferred',
        'Crisp writing skills',
        'KPI discipline',
        'Confident on calls'
      ],
      kpis: [
        'Qualified leads per week',
        'Meetings booked',
        'Proposal-to-close rate',
        'Revenue influenced'
      ]
    },
    {
      id: 'investment',
      icon: TrendingUp,
      title: 'Investment Analyst Intern',
      subtitle: 'Build Investor-Grade Analysis',
      description: 'Market maps, TAM/SAM/SOM, competitor teardowns; basic financial models (3-statement/light unit economics); investor-style memos; support the venture/BD pipeline.',
      requirements: [
        'Research + numbers passion',
        'Turn noise into crisp insights',
        'Sharp 1-page writing',
        'Excel/Sheets modeling'
      ],
      kpis: [
        'Number/quality of memos',
        'Time-to-insight',
        'Accuracy of assumptions'
      ]
    }
  ]

  const timeline = [
    {
      week: 'Month 1',
      title: 'Foundation & Integration',
      description: 'Onboard with our systems, meet the team, and understand our processes. Begin contributing to real projects while learning our methodologies.',
      deliverables: ['Complete onboarding', 'Team integration', 'Process mastery', 'First project contribution']
    },
    {
      week: 'Month 2',
      title: 'Ownership & Execution',
      description: 'Take full ownership of features, campaigns, or analyses. Execute independently while receiving strategic guidance and feedback.',
      deliverables: ['Lead feature development', 'Drive lead generation', 'Produce market insights', 'Present work to stakeholders']
    },
    {
      week: 'Month 3',
      title: 'Scale & Impact',
      description: 'Launch work to production, track real metrics, and contribute to company-wide initiatives. Demonstrate measurable impact.',
      deliverables: ['Production deployment', 'Revenue generation', 'Strategic recommendations', 'Performance review & next steps']
    }
  ]

  const selectionSteps = [
    {
      step: '01',
      title: 'Apply',
      description: '5-7 minute form + portfolio links',
      duration: '5-7 min'
    },
    {
      step: '02',
      title: 'Role Challenge',
      description: 'Complete role-specific assignment',
      duration: '48 hours'
    },
    {
      step: '03',
      title: 'Interview',
      description: 'Deep-dive into challenge + culture fit',
      duration: '30 min'
    },
    {
      step: '04',
      title: 'Offer',
      description: '90-day plan + stipend details',
      duration: 'Decision'
    }
  ]

  const faqs = [
    {
      question: 'Is this remote or on-site?',
      answer: 'This is on-site only. All interns work from our office in Dzorwulu, Accra. We believe in-person collaboration drives better results.'
    },
    {
      question: 'What\'s the time commitment?',
      answer: '20-30 hours per week for 12 weeks. Flexible scheduling to accommodate school or other commitments.'
    },
    {
      question: 'Do you provide a stipend?',
      answer: 'Yes, competitive stipend plus lunch allowance. Details shared during the offer process.'
    },
    {
      question: 'Can I convert to full-time?',
      answer: 'High performers may convert to part-time or full-time roles. We clearly state our conversion policy upfront.'
    },
    {
      question: 'What tools will I use?',
      answer: 'GitHub, Stride, Discord, Loom. Project stacks align with our web/mobile/AI work.'
    },
    {
      question: 'Do I need prior experience?',
      answer: 'We look for potential over polish. Show us what you\'ve built, sold, or analyzed. Passion and initiative matter most.'
    }
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openApplicationForm = (roleId: string) => {
    setSelectedApplicationRole(roleId)
    setShowApplicationForm(true)
  }

  const closeApplicationForm = () => {
    setShowApplicationForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <MapPin className="w-4 h-4" />
              Dzorwulu, Accra • On-Site Only
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-tight">
              Join the Builders.
              <br />
              <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Ship Work That Matters
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-black mb-12 max-w-3xl mx-auto leading-relaxed">
              Bloop's selective internship for Mobile, BD/Sales, and Investment Analysis.
              Real products. Real users. Real growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApplicationForm('mobile')}
                className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Apply — Mobile <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApplicationForm('bd-sales')}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
              >
                Apply — BD/Sales <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApplicationForm('investment')}
                className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                Apply — Investment <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-black">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-600" />
                <span>3 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-600" />
                <span>20-30 hrs/week</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-600" />
                <span>Dzorwulu, Accra</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
              What We Do at Bloop
            </h2>
            <p className="text-xl text-black leading-relaxed mb-12">
              We turn big ideas into businesses that actually work—across web, mobile, AI automations,
              and funding/advisory. So interns work on real deals and real users.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Smartphone, label: 'Mobile Apps', desc: 'Native iOS/Android' },
                { icon: Users, label: 'Web Development', desc: 'That converts' },
                { icon: TrendingUp, label: 'AI Automation', desc: 'Smart workflows' },
                { icon: Award, label: 'Funding Advisory', desc: 'Investor-ready' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-pink-50 p-6 rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-black mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="roles" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Available Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three specialized roles designed for exceptional talent. Real work, real responsibility, real growth.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {roles.map((role, index) => {
              const IconComponent = role.icon
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-12 last:mb-0"
                >
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Role Header */}
                      <div className="lg:w-1/3">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-black rounded-xl">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-black">{role.title}</h3>
                            <p className="text-gray-600 font-medium">{role.subtitle}</p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openApplicationForm(role.id)}
                          className="w-full lg:w-auto bg-black text-white py-3 px-8 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Role Details */}
                      <div className="lg:w-2/3 space-y-6">
                        <div>
                          <h4 className="font-semibold text-black mb-2">What You'll Do</h4>
                          <p className="text-gray-700 leading-relaxed">{role.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Ideal Profile
                            </h4>
                            <ul className="space-y-2">
                              {role.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-blue-600" />
                              Success Metrics
                            </h4>
                            <ul className="space-y-2">
                              {role.kpis.map((kpi, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  {kpi}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Application Note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Limited to Exceptional Candidates Only</h3>
              <p className="text-black leading-relaxed">
                We're seeking individuals who demonstrate exceptional potential through their work, initiative, and ability to learn quickly.
                This program is designed for those ready to contribute meaningfully from day one.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Your First 30 Days */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Your First 3 Months
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              From onboarding to shipping real work. We get you contributing fast.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-200 via-red-300 to-red-400 h-full hidden md:block"></div>

              {timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 mb-16 relative ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4 border border-red-100">
                      {phase.week}
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4">{phase.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{phase.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-black mb-3">You'll deliver:</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, i) => (
                          <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm border border-red-100">
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>

                    {/* Arrow pointing to next phase (for phases 1 and 2) */}
                    {index < timeline.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + 0.5, duration: 0.6 }}
                        viewport={{ once: true }}
                        className={`absolute top-16 left-1/2 transform -translate-x-1/2 ${
                          index % 2 === 0 ? 'md:left-full md:-translate-x-2' : 'md:left-0 md:translate-x-2'
                        }`}
                      >
                        <div className={`w-8 h-8 ${index % 2 === 0 ? 'rotate-90' : '-rotate-90'} md:rotate-0`}>
                          <svg
                            className="w-full h-full text-red-400 animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Selection Works */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              How Selection Works
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              We prioritize makers who show—not tell. Our 4-step process finds the real builders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {selectionSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="text-3xl font-bold text-pink-600 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <div className="text-sm text-pink-600 font-medium">{step.duration}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-white p-8 rounded-2xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-black mb-4">Scoring Focus</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Bias for Action', percent: '30%' },
                  { label: 'Craft', percent: '30%' },
                  { label: 'Communication', percent: '20%' },
                  { label: 'Culture Add', percent: '20%' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-pink-600 mb-1">{item.percent}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Everything you need to know about The Vanguard Program.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-red-100 hover:bg-red-50 transition-colors duration-300 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  {faq.question}
                </h3>
                <p className="text-black leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Level Up?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Join The Vanguard Program. Ship real work. Build your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApplicationForm('mobile')}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('roles')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300"
              >
                View Open Roles
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Elite Program</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Real Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Career Launchpad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Modal */}
      <ApplicationForm
        isOpen={showApplicationForm}
        onClose={closeApplicationForm}
        selectedRole={selectedApplicationRole}
      />
    </div>
  )
}
