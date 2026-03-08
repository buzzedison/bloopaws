'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, CheckCircle, ArrowRight, Terminal } from 'lucide-react'

const businessTypes = [
  { value: '', label: 'Select business type' },
  { value: 'ecommerce', label: 'Ecommerce / DTC' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'service', label: 'Service Business' },
  { value: 'coaching', label: 'Coaching / Course' },
  { value: 'agency', label: 'Marketing Agency' },
  { value: 'other', label: 'Other' },
]

const adSpendOptions = [
  { value: '', label: 'Current monthly Meta ad spend' },
  { value: '0', label: '$0 — just starting' },
  { value: '1k-5k', label: '$1k – $5k / month' },
  { value: '5k-20k', label: '$5k – $20k / month' },
  { value: '20k-plus', label: '$20k+ / month' },
]

export default function WaitlistForm() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [form, setForm] = useState({
    name: '',
    email: '',
    url: '',
    businessType: '',
    adSpend: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setError('Name and email are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/mediabrain/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4" />
            Early Access
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Get MediaBrain First
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Drop your URL below. When MediaBrain launches, you'll be first — and we'll pre-run the brand extraction on your page.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!success ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Edison Ade"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landing page URL{' '}
                  <span className="text-gray-400 font-normal">(the page you want MediaBrain to analyze)</span>
                </label>
                <input
                  name="url"
                  type="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://yourproduct.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business type</label>
                  <select
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm text-gray-700 bg-white"
                  >
                    {businessTypes.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly ad spend</label>
                  <select
                    name="adSpend"
                    value={form.adSpend}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm text-gray-700 bg-white"
                  >
                    {adSpendOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Submitting...
                  </span>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-5 h-5 text-red-500" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-xs text-gray-400">
                No spam. Just early access + install instructions when ready.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">You're on the list.</h3>
              <p className="text-gray-600 mb-8">
                We'll reach out with install instructions when MediaBrain is ready. In the meantime, you can install the Claude Code skill manually.
              </p>

              {/* Install instructions */}
              <div className="bg-gray-950 rounded-xl p-6 text-left mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Terminal className="w-3 h-3" />
                  <span>Install MediaBrain (Claude Code)</span>
                </div>
                <code className="text-green-400 text-sm font-mono block leading-relaxed">
                  {`# Clone the plugin`}<br />
                  {`git clone https://github.com/bloopglobal/mediabrain`}<br />
                  {`~/.claude/plugins/repos/mediabrain`}<br />
                  <br />
                  {`# Then in any Claude Code session:`}<br />
                  {`> create meta ads for [your-url]`}
                </code>
              </div>

              <p className="text-sm text-gray-500">
                Questions? Reach us at{' '}
                <a href="mailto:ask@bloopglobal.com" className="text-red-600 hover:underline">
                  ask@bloopglobal.com
                </a>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
