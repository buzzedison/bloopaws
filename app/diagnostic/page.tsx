'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question: string
  type: 'single' | 'multiple' | 'scale'
  options?: { value: string; label: string }[]
  scaleLabels?: { min: string; max: string }
}

const diagnosticQuestions: Question[] = [
  {
    id: 'stage',
    question: 'Where are you in your journey?',
    type: 'single',
    options: [
      { value: 'idea', label: 'Just an idea - nothing built yet' },
      { value: 'prototype', label: 'Built a prototype or MVP' },
      { value: 'launched', label: 'Launched with some users' },
      { value: 'scaling', label: 'Growing and need to scale' },
    ],
  },
  {
    id: 'biggest_challenge',
    question: 'What\'s your biggest challenge right now?',
    type: 'single',
    options: [
      { value: 'technical', label: 'Building the actual product' },
      { value: 'funding', label: 'Getting funding or investment' },
      { value: 'customers', label: 'Finding and acquiring customers' },
      { value: 'team', label: 'Finding the right team or co-founder' },
      { value: 'strategy', label: 'Figuring out the business model' },
    ],
  },
  {
    id: 'technical_capability',
    question: 'How would you rate your technical capabilities?',
    type: 'scale',
    scaleLabels: { min: 'Non-technical', max: 'Can build anything' },
  },
  {
    id: 'needs',
    question: 'What do you need most? (Select all that apply)',
    type: 'multiple',
    options: [
      { value: 'web_dev', label: 'Web development' },
      { value: 'mobile_dev', label: 'Mobile app development' },
      { value: 'saas', label: 'SaaS platform' },
      { value: 'ai', label: 'AI/ML integration' },
      { value: 'design', label: 'UI/UX design' },
      { value: 'strategy', label: 'Business strategy' },
      { value: 'funding', label: 'Funding guidance' },
      { value: 'marketing', label: 'Marketing & growth' },
    ],
  },
  {
    id: 'timeline',
    question: 'What\'s your timeline to launch or scale?',
    type: 'single',
    options: [
      { value: 'urgent', label: 'ASAP - within 1-2 months' },
      { value: 'soon', label: 'Soon - within 3-6 months' },
      { value: 'flexible', label: 'Flexible - 6-12 months' },
      { value: 'exploring', label: 'Just exploring options' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    type: 'single',
    options: [
      { value: 'bootstrap', label: 'Bootstrapping - under $10k' },
      { value: 'small', label: '$10k - $50k' },
      { value: 'medium', label: '$50k - $150k' },
      { value: 'large', label: '$150k+' },
      { value: 'flexible', label: 'Flexible based on value' },
    ],
  },
  {
    id: 'confidence',
    question: 'How confident are you that you can execute this vision?',
    type: 'scale',
    scaleLabels: { min: 'Not confident', max: 'Very confident' },
  },
  {
    id: 'priority',
    question: 'What matters most to you right now?',
    type: 'single',
    options: [
      { value: 'speed', label: 'Speed - get to market fast' },
      { value: 'quality', label: 'Quality - build it right' },
      { value: 'cost', label: 'Cost - stay within budget' },
      { value: 'validation', label: 'Validation - test the idea first' },
    ],
  },
]

export default function DiagnosticPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const question = diagnosticQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100

  const handleAnswer = (value: any) => {
    if (question.type === 'multiple') {
      const currentAnswers = answers[question.id] || []
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((v: string) => v !== value)
        : [...currentAnswers, value]
      setAnswers({ ...answers, [question.id]: newAnswers })
    } else {
      setAnswers({ ...answers, [question.id]: value })
    }
  }

  const canProceed = () => {
    const answer = answers[question.id]
    if (question.type === 'multiple') {
      return answer && answer.length > 0
    }
    return answer !== undefined && answer !== null
  }

  const handleNext = () => {
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setDirection('forward')
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection('backward')
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setEmailError('')

    try {
      if (!email.trim()) {
        setEmailError('Email is required to deliver your personalized report.')
        setIsSubmitting(false)
        return
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      if (!emailValid) {
        setEmailError('Enter a valid email address so we can send your PDF report.')
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/diagnostic/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, email: email.trim() }),
      })

      const data = await response.json()
      
      if (data.success) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem('diagnosticResults', JSON.stringify(data.results))
        sessionStorage.setItem('diagnosticEmail', email.trim())
        router.push('/diagnostic/results')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting diagnostic:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-pink-50 to-white text-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-red-100/50 rounded-full blur-2xl" />
        <div className="absolute bottom-[-96px] right-[-120px] w-80 h-80 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/2 w-px h-48 bg-gradient-to-b from-transparent via-red-100 to-transparent rotate-12" />
      </div>

      <div className="relative max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold shadow-sm mb-6">
            2-min assessment • instant results
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Disruptor's Diagnostic
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let’s pinpoint exactly where momentum stalls and build a plan to cross the execution gap.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
            <span>Question {currentQuestion + 1} of {diagnosticQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-red-100 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: direction === 'forward' ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -60 : 60 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white/90 backdrop-blur-lg border border-red-100 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black leading-snug">
              {question.question}
            </h2>

            {/* Single Choice */}
            {question.type === 'single' && (
              <div className="space-y-4">
                {question.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${
                      answers[question.id] === option.value
                        ? 'border-red-500 bg-red-50 shadow-lg text-red-700'
                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50/40 bg-white text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium leading-relaxed">{option.label}</span>
                      {answers[question.id] === option.value && (
                        <CheckCircle2 className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Multiple Choice */}
            {question.type === 'multiple' && (
              <div className="space-y-4">
                {question.options?.map((option) => {
                  const isSelected = (answers[question.id] || []).includes(option.value)
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm ${
                        isSelected
                          ? 'border-red-500 bg-red-50 shadow-lg text-red-700'
                          : 'border-gray-200 hover:border-red-200 hover:bg-red-50/40 bg-white text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium leading-relaxed">{option.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Scale */}
            {question.type === 'scale' && (
              <div className="space-y-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
                  <span>{question.scaleLabels?.min}</span>
                  <span>{question.scaleLabels?.max}</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(value)}
                      className={`flex-1 aspect-square rounded-xl border-2 transition-all duration-200 flex items-center justify-center font-semibold ${
                        answers[question.id] === value
                          ? 'border-red-500 bg-red-500 text-white shadow-lg scale-105'
                          : 'border-gray-200 hover:border-red-200 bg-white text-gray-700 hover:text-red-600'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion === diagnosticQuestions.length - 1 && (
              <div className="mt-10 p-6 border border-red-100 rounded-2xl bg-red-50/40">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Where should we send your diagnostic?</h3>
                <p className="text-sm text-gray-600 mb-4">Well email you the full PDF report with your roadmap and next steps.</p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-xl border ${emailError ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200' : 'border-gray-200 focus:border-red-300 focus:ring-1 focus:ring-red-100'} bg-white text-gray-800`}
                  />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold border transition-colors ${
              currentQuestion === 0
                ? 'opacity-50 cursor-not-allowed border-gray-200 bg-white text-gray-400'
                : 'border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={(!canProceed() && currentQuestion < diagnosticQuestions.length - 1) || isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold shadow-lg transition-all ${
              ((!canProceed() && currentQuestion < diagnosticQuestions.length - 1) || isSubmitting)
                ? 'opacity-50 cursor-not-allowed bg-red-500 text-white'
                : 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : currentQuestion === diagnosticQuestions.length - 1 ? (
              <>
                Get Results
                <CheckCircle2 className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
