'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Target,
  Lightbulb,
  AlertCircle,
  Download,
  Mail
} from 'lucide-react'

interface Recommendation {
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
}

interface Results {
  profile: string
  urgency: string
  readiness: number
  topNeeds: string[]
  approach: string
  recommendations: Recommendation[]
}

export default function DiagnosticResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Results | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    const storedResults = sessionStorage.getItem('diagnosticResults')
    const storedEmail = sessionStorage.getItem('diagnosticEmail')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
      if (storedEmail) {
        setEmail(storedEmail)
      }
    } else {
      router.push('/diagnostic')
    }
  }, [router])

  const handleEmailResults = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')

    if (!results) {
      setEmailError('Results not available. Please retake the diagnostic.')
      return
    }

    if (!email.trim()) {
      setEmailError('Enter an email address to receive the PDF report.')
      return
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailValid) {
      setEmailError('Enter a valid email address.')
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/diagnostic/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), results }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to send report')
      }

      setEmailSent(true)
      sessionStorage.setItem('diagnosticEmail', email.trim())
    } catch (err: any) {
      console.error('Failed to send diagnostic report:', err)
      setEmailError(err?.message || 'Failed to send report. Please try again.')
      setEmailSent(false)
    } finally {
      setIsSending(false)
    }
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex items-center justify-center text-black">
        <div className="text-xl font-semibold">Loading your results...</div>
      </div>
    )
  }

  const getReadinessColor = (score: number) => {
    if (score >= 70) return 'text-emerald-500'
    if (score >= 40) return 'text-amber-500'
    return 'text-red-500'
  }

  const getReadinessLabel = (score: number) => {
    if (score >= 70) return 'Ready to Launch'
    if (score >= 40) return 'Building Momentum'
    return 'Early Stage'
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Zap className="w-5 h-5 text-red-500" />
      case 'medium':
        return <Target className="w-5 h-5 text-amber-500" />
      default:
        return <Lightbulb className="w-5 h-5 text-sky-500" />
    }
  }

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200'
      case 'medium':
        return 'border-amber-200'
      default:
        return 'border-sky-200'
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-pink-50 to-white py-20 px-4 text-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-red-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-16 w-40 h-40 bg-red-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-px h-56 bg-gradient-to-b from-transparent via-red-100 to-transparent rotate-12" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-sm uppercase tracking-wide shadow-sm mb-6">
            Results Ready
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Diagnostic Results
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's what we learned about your journey
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white/95 backdrop-blur rounded-3xl border border-red-100 p-8 md:p-12 mb-10 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Your Profile</div>
              <div className="text-3xl font-bold text-red-600">{results.profile}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Readiness Score</div>
              <div className={`text-3xl font-bold ${getReadinessColor(results.readiness)}`}>
                {results.readiness}%
              </div>
              <div className="text-sm text-gray-500 mt-1 font-medium">{getReadinessLabel(results.readiness)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Priority Level</div>
              <div className="text-3xl font-bold capitalize text-gray-800">{results.urgency}</div>
            </div>
          </div>
        </motion.div>

        {/* Top Needs */}
        <motion.div
          className="bg-white/90 backdrop-blur rounded-3xl border border-red-100 p-8 mb-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Target className="w-6 h-6 text-red-500" />
            Your Top Needs
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {results.topNeeds.map((need, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="font-semibold text-gray-800">{need}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Approach */}
        <motion.div
          className="bg-white/90 backdrop-blur rounded-3xl border border-red-100 p-8 mb-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <TrendingUp className="w-6 h-6 text-red-500" />
            Recommended Approach
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{results.approach}</p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Personalized Roadmap</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {results.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                className={`bg-white/95 backdrop-blur border-2 ${getPriorityBorder(rec.priority)} rounded-3xl p-6 shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  {getPriorityIcon(rec.priority)}
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{rec.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{rec.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wide">Next Step</div>
                <div className="font-semibold text-red-600">{rec.action}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email Results */}
        {!emailSent ? (
          <motion.div
            className="bg-white/90 backdrop-blur rounded-3xl border border-red-100 p-8 mb-10 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Mail className="w-6 h-6 text-red-500" />
              Get Your Results via Email
            </h3>
            <p className="text-gray-600 mb-6">
              We'll send you a detailed PDF with your results and next steps.
            </p>
            <form onSubmit={handleEmailResults} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`flex-1 px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-1 ${
                  emailError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-red-300 focus:ring-red-200'
                }`}
              />
              <button
                type="submit"
                disabled={isSending}
                className={`px-8 py-3 bg-red-600 text-white rounded-xl font-semibold transition-colors shadow ${
                  isSending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700'
                }`}
              >
                {isSending ? 'Sending…' : 'Send Results'}
              </button>
            </form>
            {emailError && <p className="text-sm text-red-500 mt-3">{emailError}</p>}
          </motion.div>
        ) : (
          <motion.div
            className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-semibold">Results sent! Check your inbox.</span>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Bridge the Gap?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's turn these insights into action. Book a free 30-minute strategy call to discuss your roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link prefetch={false} href="/contact">
              <button className="group relative overflow-hidden bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
                <span className="relative z-10 flex items-center">
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            <Link prefetch={false} href="/services">
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Explore Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Retake Option */}
        <div className="text-center mt-10">
          <Link prefetch={false} href="/diagnostic" className="text-gray-500 hover:text-red-600 transition-colors font-medium">
            ← Retake the diagnostic
          </Link>
        </div>
      </div>
    </section>
  )
}
