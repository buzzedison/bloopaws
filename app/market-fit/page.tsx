'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles, Target, TrendingUp, Zap, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DimensionData {
  score: number | null
  selectedOption: number | null
}

interface FormData {
  businessName: string
  description: string
  problemExistence: DimensionData
  activeSearch: DimensionData
  willingnessToPay: DimensionData
  reachability: DimensionData
}

type DimensionKey = 'problemExistence' | 'activeSearch' | 'willingnessToPay' | 'reachability'

interface Dimension {
  key: DimensionKey
  title: string
  question: string
  icon: React.ReactNode
  color: string
  options: {
    value: number
    label: string
    description: string
    emoji: string
  }[]
}

const dimensions: Dimension[] = [
  {
    key: 'problemExistence',
    title: 'Problem Existence',
    question: 'Do people actually have this problem right now?',
    icon: <Target className="w-6 h-6" />,
    color: 'red',
    options: [
      { value: 0, label: '0 pts', description: 'Problem doesn\'t exist or is extremely rare', emoji: '❌' },
      { value: 10, label: '10 pts', description: 'Problem exists but only for a small niche', emoji: '⚠️' },
      { value: 18, label: '18 pts', description: 'Problem is real and affects a decent-sized market', emoji: '✅' },
      { value: 25, label: '25 pts', description: 'Problem is widespread, urgent, and causing measurable pain', emoji: '🔥' }
    ]
  },
  {
    key: 'activeSearch',
    title: 'Active Search',
    question: 'Are they actively looking for solutions?',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'blue',
    options: [
      { value: 0, label: '0 pts', description: 'No one is actively looking for solutions', emoji: '🚫' },
      { value: 10, label: '10 pts', description: 'Some casual searching but no urgency', emoji: '🔍' },
      { value: 18, label: '18 pts', description: 'Regular search activity and people asking for recommendations', emoji: '📊' },
      { value: 25, label: '25 pts', description: 'High search volume and people actively trying multiple solutions', emoji: '🚀' }
    ]
  },
  {
    key: 'willingnessToPay',
    title: 'Willingness to Pay',
    question: 'Will they pay to solve it?',
    icon: <Zap className="w-6 h-6" />,
    color: 'emerald',
    options: [
      { value: 0, label: '0 pts', description: 'No one is paying for any solution (free expectations)', emoji: '💸' },
      { value: 10, label: '10 pts', description: 'Some people pay but expect very low prices', emoji: '💵' },
      { value: 18, label: '18 pts', description: 'Established market with people regularly paying for solutions', emoji: '💰' },
      { value: 25, label: '25 pts', description: 'People pay premium prices and buying decisions are quick', emoji: '💎' }
    ]
  },
  {
    key: 'reachability',
    title: 'Reachability',
    question: 'Can you reach them affordably?',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'purple',
    options: [
      { value: 0, label: '0 pts', description: 'No idea how to reach them or CAC is prohibitive', emoji: '🔒' },
      { value: 10, label: '10 pts', description: 'Possible but expensive or difficult channels', emoji: '🛤️' },
      { value: 18, label: '18 pts', description: 'Clear channels exist and are reasonably affordable', emoji: '🎯' },
      { value: 25, label: '25 pts', description: 'Multiple affordable channels + strong referral potential', emoji: '🌟' }
    ]
  }
]

export default function MarketFitPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [showScoreAnimation, setShowScoreAnimation] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    description: '',
    problemExistence: { score: null, selectedOption: null },
    activeSearch: { score: null, selectedOption: null },
    willingnessToPay: { score: null, selectedOption: null },
    reachability: { score: null, selectedOption: null }
  })

  const totalSteps = dimensions.length + 2 // dimensions + business info + results
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateDimension = (dimensionKey: DimensionKey, optionValue: number, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      [dimensionKey]: { score: optionValue, selectedOption: optionIndex }
    }))
    setShowScoreAnimation(true)
    setTimeout(() => setShowScoreAnimation(false), 600)
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.businessName.trim() !== '' && formData.description.trim() !== ''
    }
    if (currentStep >= 1 && currentStep <= dimensions.length) {
      const dimensionKey = dimensions[currentStep - 1].key
      return formData[dimensionKey].score !== null
    }
    return true
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateTotalScore = () => {
    return (formData.problemExistence.score ?? 0) +
           (formData.activeSearch.score ?? 0) +
           (formData.willingnessToPay.score ?? 0) +
           (formData.reachability.score ?? 0)
  }

  const getZone = (score: number) => {
    if (score >= 70) return { 
      name: 'GREEN ZONE', 
      color: 'emerald', 
      description: 'BUILD THIS NOW',
      icon: '🚀',
      message: 'Congratulations! You\'ve found a real problem with real demand.'
    }
    if (score >= 40) return { 
      name: 'YELLOW ZONE', 
      color: 'amber', 
      description: 'TREAD CAREFULLY',
      icon: '⚠️',
      message: 'You\'re missing one or two critical elements. Fix the gaps first.'
    }
    return { 
      name: 'RED ZONE', 
      color: 'red', 
      description: 'WALK AWAY (OR PIVOT HARD)',
      icon: '🛑',
      message: 'This idea, in its current form, is not ready. Pivot or find a different problem.'
    }
  }

  const getCompletedDimensions = () => {
    return dimensions.filter(d => formData[d.key].score !== null).length
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

      const totalScore = calculateTotalScore()
      const zone = getZone(totalScore)

      const results = {
        formData,
        totalScore,
        zone,
        scores: {
          problemExistence: formData.problemExistence.score ?? 0,
          activeSearch: formData.activeSearch.score ?? 0,
          willingnessToPay: formData.willingnessToPay.score ?? 0,
          reachability: formData.reachability.score ?? 0
        }
      }

      sessionStorage.setItem('marketFitResults', JSON.stringify(results))
      sessionStorage.setItem('marketFitEmail', email.trim())

      router.push('/market-fit/results')
    } catch (error) {
      console.error('Error submitting assessment:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <Sparkles className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Let's Start Your Assessment</h2>
        <p className="text-gray-600">Tell us about your business idea</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business/Product Name
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            placeholder="e.g., TaskMaster Pro"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white text-gray-800 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            One-sentence description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you're building..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white text-gray-800 resize-none transition-all"
          />
        </div>
      </div>
    </div>
  )

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string; bgLight: string; borderLight: string; bgGradient: string; bgSolid: string }> = {
      red: {
        border: 'border-red-500',
        bg: 'bg-red-50',
        text: 'text-red-700',
        bgLight: 'bg-red-50',
        borderLight: 'border-red-200',
        bgGradient: 'from-red-400 to-red-600',
        bgSolid: 'bg-red-500'
      },
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        bgLight: 'bg-blue-50',
        borderLight: 'border-blue-200',
        bgGradient: 'from-blue-400 to-blue-600',
        bgSolid: 'bg-blue-500'
      },
      emerald: {
        border: 'border-emerald-500',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-200',
        bgGradient: 'from-emerald-400 to-emerald-600',
        bgSolid: 'bg-emerald-500'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        bgLight: 'bg-purple-50',
        borderLight: 'border-purple-200',
        bgGradient: 'from-purple-400 to-purple-600',
        bgSolid: 'bg-purple-500'
      }
    }
    return colorMap[color] || colorMap.red
  }

  const renderDimension = (dimension: Dimension, index: number) => {
    const dimensionData = formData[dimension.key]
    const colors = getColorClasses(dimension.color)

    return (
      <div className="space-y-6">
        {/* Dimension Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 ${colors.borderLight} ${colors.bgLight}`}>
            {dimension.icon}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold mb-3">
            Question {index + 1} of {dimensions.length}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dimension.title}</h2>
          <p className="text-lg text-gray-600">{dimension.question}</p>
        </div>

        {/* Scoring Options */}
        <div className="space-y-3">
          {dimension.options.map((option, idx) => {
            const isSelected = dimensionData.selectedOption === idx
            return (
              <motion.button
                key={option.value}
                onClick={() => updateDimension(dimension.key, option.value, idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? `${colors.border} ${colors.bgLight} shadow-lg`
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-3xl ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {option.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-bold text-lg ${isSelected ? colors.text : 'text-gray-900'}`}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${colors.bgSolid} text-white`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                    <p className={`text-sm ${isSelected ? colors.text : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Score Display */}
        {dimensionData.score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-4 rounded-xl ${colors.bgLight} border-2 ${colors.borderLight}`}
          >
            <div className="text-sm text-gray-600 mb-1">Your Score</div>
            <div className={`text-3xl font-bold ${colors.text}`}>
              {dimensionData.score} / 25
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  const renderResults = () => {
    const totalScore = calculateTotalScore()
    const zone = getZone(totalScore)
    const zoneColors = getColorClasses(zone.color)
    const isGreen = zone.color === 'emerald'
    const isYellow = zone.color === 'amber'
    const isRed = zone.color === 'red'
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-6xl mb-4"
          >
            {zone.icon}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
          <p className="text-gray-600">Here's your market-fit score</p>
        </div>

        {/* Total Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${
            isGreen ? 'from-emerald-50 to-emerald-100 border-emerald-300' :
            isYellow ? 'from-amber-50 to-amber-100 border-amber-300' :
            'from-red-50 to-red-100 border-red-300'
          } border-2 rounded-2xl p-8 text-center`}
        >
          <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">{totalScore}</div>
          <div className="text-2xl text-gray-600 mb-4">out of 100</div>
          <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
            isGreen ? 'text-emerald-600' :
            isYellow ? 'text-amber-600' :
            'text-red-600'
          }`}>
            {zone.name}
          </div>
          <div className="text-lg text-gray-700 font-semibold">{zone.description}</div>
          <div className="mt-4 text-sm text-gray-600">{zone.message}</div>
        </motion.div>

        {/* Score Breakdown */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-500" />
            Score Breakdown
          </h3>
          <div className="space-y-3">
            {dimensions.map((dim) => {
              const score = formData[dim.key].score ?? 0
              const percentage = (score / 25) * 100
              const dimColors = getColorClasses(dim.color)
              return (
                <div key={dim.key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{dim.title}</span>
                    <span className="text-sm font-bold text-gray-900">{score} / 25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${dimColors.bgGradient}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Email Input */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Get Your Full Report</h3>
          <p className="text-sm text-gray-600 mb-4">We'll email you a detailed PDF with your zone analysis and next steps.</p>
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm ${emailError ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100'} bg-white text-gray-800 transition-all`}
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    if (currentStep === 0) return renderBusinessInfo()
    if (currentStep <= dimensions.length) {
      return renderDimension(dimensions[currentStep - 1], currentStep - 1)
    }
    if (currentStep === totalSteps - 1) return renderResults()
    return null
  }

  const currentDimension = currentStep > 0 && currentStep <= dimensions.length 
    ? dimensions[currentStep - 1] 
    : null

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-pink-50 to-white text-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-red-100/50 rounded-full blur-2xl" />
        <div className="absolute bottom-[-96px] right-[-120px] w-80 h-80 bg-red-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Header - Only show on first step */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-100 text-red-600 text-xs sm:text-sm font-semibold shadow-sm mb-4 sm:mb-6">
              THE BLOOP MARKET-FIT MATRIX
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Are You Building Something People Actually Want?
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Most startup failures aren't execution problems—they're market-fit problems.
            </p>
            <p className="text-sm sm:text-base text-gray-700 font-semibold">
              4 questions • 5 minutes • Instant clarity
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-2 font-medium">
            <span>
              {currentStep === 0 && 'Getting Started'}
              {currentStep > 0 && currentStep <= dimensions.length && `Question ${currentStep} of ${dimensions.length}`}
              {currentStep > dimensions.length && 'Results'}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6 sm:mb-8 max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-320px)] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white/95 backdrop-blur border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-3 sm:gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold border-2 transition-all text-sm sm:text-base ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed border-gray-200 bg-white text-gray-400'
                : 'border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg transition-all text-sm sm:text-base ${
                (isSubmitting || !canProceed())
                  ? 'opacity-50 cursor-not-allowed bg-red-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Get My Results</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg transition-all text-sm sm:text-base ${
                !canProceed()
                  ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              <span>{currentStep === 0 ? 'Start Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
