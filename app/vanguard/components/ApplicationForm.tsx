'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Smartphone, Users, TrendingUp, CheckCircle } from 'lucide-react'
import * as tracking from '../../lib/tracking'

interface ApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  selectedRole?: string
}

interface FormData {
  role: string
  fullName: string
  email: string
  phone: string
  location: string
  experience: string
  portfolio: string
  linkedin: string
  github?: string
  motivation: string
  availability: string
  referralSource: string
}

export default function ApplicationForm({ isOpen, onClose, selectedRole }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    role: selectedRole || 'mobile',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    portfolio: '',
    linkedin: '',
    github: '',
    motivation: '',
    availability: '',
    referralSource: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const roles = [
    {
      id: 'mobile',
      title: 'Mobile Engineering Intern',
      icon: Smartphone,
      description: 'Build & Ship Features'
    },
    {
      id: 'bd-sales',
      title: 'Business Development & Sales Intern',
      icon: Users,
      subtitle: 'Close Real Deals'
    },
    {
      id: 'investment',
      title: 'Investment Analyst Intern',
      icon: TrendingUp,
      subtitle: 'Build Investor-Grade Analysis'
    }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/vanguard/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')

        // Track Conversion
        tracking.event('CompleteRegistration', {
          content_name: 'Vanguard Application',
          role: formData.role
        });
        tracking.ga_event('vanguard_application_submit', 'engagement', formData.role);

        // Reset form after successful submission
        setFormData({
          role: selectedRole || 'mobile',
          fullName: '',
          email: '',
          phone: '',
          location: '',
          experience: '',
          portfolio: '',
          linkedin: '',
          github: '',
          motivation: '',
          availability: '',
          referralSource: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedRoleData = roles.find(role => role.id === formData.role)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedRoleData && <selectedRoleData.icon className="w-6 h-6" />}
                <div>
                  <h2 className="text-xl font-bold">Apply for The Vanguard Program</h2>
                  <p className="text-pink-100 text-sm">
                    {selectedRoleData?.title} • {selectedRoleData?.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-black mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for applying to The Vanguard Program. We'll review your application and get back to you within 48 hours.
                </p>

                {/* Quiz Link Section */}
                <div className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-black mb-3">🎯 Next Step: Assessment Quiz</h4>
                  <p className="text-gray-700 mb-4">
                    If your application is approved, you'll need to complete our assessment quiz to proceed.
                    The quiz is designed to evaluate your skills and fit for the role.
                  </p>

                  <div className="bg-white rounded-lg p-4 border border-pink-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Your Selected Role:</span>
                      <span className="text-sm font-semibold text-pink-600">
                        {selectedRoleData?.title}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Quiz Duration:</span>
                        <span className="font-medium">
                          {formData.role === 'mobile' ? '45' :
                            formData.role === 'bd-sales' ? '40' :
                              formData.role === 'investment' ? '45' : '45'} minutes
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passing Score:</span>
                        <span className="font-medium">70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span className="font-medium">MCQ + Short Answer</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> Quiz links will be sent via email after application review.
                        You can only take the quiz once, so prepare thoroughly!
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Position Applied For *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {roles.map((role) => {
                      const IconComponent = role.icon
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleInputChange('role', role.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${formData.role === role.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <IconComponent className={`w-6 h-6 mx-auto mb-2 ${formData.role === role.id ? 'text-pink-600' : 'text-gray-400'
                            }`} />
                          <div className="text-sm font-medium text-black">{role.title}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Experience Level *
                  </label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                    <option value="student">Current Student</option>
                  </select>
                </div>

                {/* Portfolio & Links */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Portfolio/Resume Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://yourportfolio.com or LinkedIn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                {/* GitHub for tech roles */}
                {(formData.role === 'mobile' || formData.role === 'investment') && (
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      GitHub Profile {formData.role === 'mobile' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="url"
                      required={formData.role === 'mobile'}
                      value={formData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                )}

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Why do you want to join The Vanguard Program? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your background, what excites you about this role, and what you hope to achieve..."
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Availability *
                  </label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">When can you start?</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-week">Within 1 week</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                {/* Referral Source */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => handleInputChange('referralSource', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral from someone</option>
                    <option value="social-media">Social Media</option>
                    <option value="job-board">Job Board</option>
                    <option value="university">University/Campus</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-red-600 text-sm mt-2 text-center">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
