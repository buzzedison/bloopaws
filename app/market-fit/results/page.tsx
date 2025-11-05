'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Target,
  Zap,
  Mail,
  Download
} from 'lucide-react'

interface DimensionData {
  score: number | null
  selectedOption: number | null
}

interface Results {
  formData: {
    businessName: string
    description: string
    problemExistence: DimensionData
    activeSearch: DimensionData
    willingnessToPay: DimensionData
    reachability: DimensionData
  }
  totalScore: number
  zone: {
    name: string
    color: string
    description: string
  }
  scores: {
    problemExistence: number
    activeSearch: number
    willingnessToPay: number
    reachability: number
  }
}

export default function MarketFitResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Results | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    const storedResults = sessionStorage.getItem('marketFitResults')
    const storedEmail = sessionStorage.getItem('marketFitEmail')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
      if (storedEmail) {
        setEmail(storedEmail)
      }
    } else {
      router.push('/market-fit')
    }
  }, [router])

  const handleEmailResults = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')

    if (!results) {
      setEmailError('Results not available. Please retake the assessment.')
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
      const response = await fetch('/api/market-fit/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), results }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to send report')
      }

      setEmailSent(true)
      sessionStorage.setItem('marketFitEmail', email.trim())
    } catch (err: any) {
      console.error('Failed to send market-fit report:', err)
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

  const isGreenZone = results.zone.name.includes('GREEN')
  const isYellowZone = results.zone.name.includes('YELLOW')
  const isRedZone = !isGreenZone && !isYellowZone

  const getRecommendations = () => {
    if (results.totalScore >= 70) {
      return {
        title: '🟢 GREEN ZONE: BUILD THIS NOW',
        description: 'Congratulations. You\'ve found a real problem with real demand. This is what product-market fit looks like before you build.',
        actions: [
          'Start building immediately (but keep it lean)',
          'Get to your first 10 customers ASAP',
          'Focus on speed to value (how fast can they see results?)',
          'Document everything you learn from early customers',
          'Don\'t over-engineer—launch fast, iterate faster'
        ]
      }
    } else if (results.totalScore >= 40) {
      const weakDimensions = []
      if (results.scores.problemExistence < 15) weakDimensions.push('Problem Existence')
      if (results.scores.activeSearch < 15) weakDimensions.push('Active Search')
      if (results.scores.willingnessToPay < 15) weakDimensions.push('Willingness to Pay')
      if (results.scores.reachability < 15) weakDimensions.push('Reachability')

      return {
        title: '🟡 YELLOW ZONE: TREAD CAREFULLY',
        description: 'You\'re missing one or two critical elements. This doesn\'t mean stop—it means fix what\'s broken first.',
        actions: [
          `Identify your weak dimension(s): ${weakDimensions.join(', ') || 'Review all dimensions'}`,
          'If Problem Existence is low: Validate the problem exists with more research',
          'If Active Search is low: People may not be aware they have this problem yet',
          'If Willingness to Pay is low: Find a different monetization angle or audience',
          'If Reachability is low: Rethink your distribution strategy',
          'Don\'t build yet—fix the gaps first'
        ]
      }
    } else {
      return {
        title: '🔴 RED ZONE: WALK AWAY (OR PIVOT HARD)',
        description: 'Hard truth: This idea, in its current form, is not ready. Building now will waste your time and money.',
        actions: [
          'Pause. Don\'t build anything yet.',
          'Go back to customer discovery—talk to 20-30 potential users',
          'Consider a significant pivot based on what you learn',
          'If multiple dimensions scored 0-10, consider a completely different idea',
          'Better to know now than after 6 months and $50K'
        ]
      }
    }
  }

  const recommendations = getRecommendations()

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-pink-50 to-white py-20 px-4 text-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-red-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-16 w-40 h-40 bg-red-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
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
            Your Market-Fit Assessment Results
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's what we learned about your business idea
          </p>
        </motion.div>

        {/* Business Info */}
        <motion.div
          className="bg-white/95 backdrop-blur rounded-3xl border border-red-100 p-8 md:p-12 mb-10 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Business Idea</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-semibold">Business/Product Name</div>
              <div className="text-xl font-bold text-gray-900">{results.formData.businessName || 'Not provided'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-semibold">Description</div>
              <div className="text-lg text-gray-700">{results.formData.description || 'Not provided'}</div>
            </div>
          </div>
        </motion.div>

        {/* Score Card */}
        <motion.div
          className={`backdrop-blur rounded-3xl border p-8 md:p-12 mb-10 shadow-xl ${
            isGreenZone ? 'bg-emerald-50 border-emerald-200' :
            isYellowZone ? 'bg-amber-50 border-amber-200' :
            'bg-red-50 border-red-200'
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center">
            <div className={`text-5xl font-bold mb-4 ${
              isGreenZone ? 'text-emerald-600' :
              isYellowZone ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {results.totalScore} / 100
            </div>
            <div className={`text-3xl font-bold mb-2 ${
              isGreenZone ? 'text-emerald-600' :
              isYellowZone ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {results.zone.name}
            </div>
            <div className="text-xl text-gray-700 font-semibold mb-6">
              {results.zone.description}
            </div>
            
            {/* Score Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Problem Existence</div>
                <div className="text-2xl font-bold text-gray-900">{results.scores.problemExistence} / 25</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Active Search</div>
                <div className="text-2xl font-bold text-gray-900">{results.scores.activeSearch} / 25</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Willingness to Pay</div>
                <div className="text-2xl font-bold text-gray-900">{results.scores.willingnessToPay} / 25</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Reachability</div>
                <div className="text-2xl font-bold text-gray-900">{results.scores.reachability} / 25</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="bg-white/90 backdrop-blur rounded-3xl border border-red-100 p-8 mb-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Target className="w-6 h-6 text-red-500" />
            {recommendations.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {recommendations.description}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What to do next:</h3>
            <ul className="space-y-3">
              {recommendations.actions.map((action, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Score Summary */}
        <motion.div
          className="bg-white/90 backdrop-blur rounded-3xl border border-red-100 p-8 mb-10 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <TrendingUp className="w-6 h-6 text-red-500" />
            Your Assessment Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { key: 'problemExistence', title: 'Problem Existence', score: results.scores.problemExistence, icon: '🎯' },
              { key: 'activeSearch', title: 'Active Search', score: results.scores.activeSearch, icon: '📊' },
              { key: 'willingnessToPay', title: 'Willingness to Pay', score: results.scores.willingnessToPay, icon: '💰' },
              { key: 'reachability', title: 'Reachability', score: results.scores.reachability, icon: '🌟' }
            ].map((item) => {
              const percentage = (item.score / 25) * 100
              const scoreColor = percentage >= 70 ? 'emerald' : percentage >= 40 ? 'amber' : 'red'
              return (
                <div key={item.key} className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <div className={`text-xl font-bold ${
                      scoreColor === 'emerald' ? 'text-emerald-600' :
                      scoreColor === 'amber' ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {item.score} / 25
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full ${
                        scoreColor === 'emerald' ? 'bg-emerald-500' :
                        scoreColor === 'amber' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
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
            Ready to Build Something People Actually Want?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Let's turn these insights into action. Book a free 30-minute strategy call to discuss your market-fit roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="group relative overflow-hidden bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
                <span className="relative z-10 flex items-center">
                  Book Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            <Link href="/services">
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Explore Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Retake Option */}
        <div className="text-center mt-10">
          <Link href="/market-fit" className="text-gray-500 hover:text-red-600 transition-colors font-medium">
            ← Retake the assessment
          </Link>
        </div>
      </div>
    </section>
  )
}

