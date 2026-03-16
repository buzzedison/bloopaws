'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import * as tracking from '../lib/tracking';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

const SERVICES = [
  'AI Automation',
  'Web & Mobile App Development',
  'Product Design (UI/UX)',
  'Funding & Pitch Strategy',
  'Growth Engineering',
  'Consulting & Strategy',
  'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      tracking.event('Contact', {
        content_name: 'Contact Form',
        content_category: formData.service,
      });
      tracking.ga_event('contact_form_submit', 'engagement', formData.service);

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl">

          {/* ── Left panel ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 bg-black text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
                  Let&apos;s Talk
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Build Something <span className="text-red-500">Big.</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Tell us about your idea. We&apos;ll get back to you within 2 hours with a clear path forward.
                </p>
              </motion.div>

              <motion.div
                className="mt-12 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {[
                  { icon: Clock, label: 'Response time', value: 'Within 2 hours' },
                  { icon: Mail, label: 'Email', value: 'ask@bloopglobal.com' },
                  { icon: Phone, label: 'Phone', value: '+233 500 002 994' },
                  { icon: MapPin, label: 'Serving', value: 'US · UK · Ghana · Canada · Nigeria' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-red-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                      <p className="text-white font-medium text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Trust badges */}
            <motion.div
              className="relative z-10 mt-12 pt-10 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">You&apos;re in good company</p>
              <div className="flex flex-wrap gap-3">
                {['NDA on request', '70% non-technical founders', 'MVPs in 8–12 weeks'].map(badge => (
                  <span
                    key={badge}
                    className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right panel ────────────────────────────────────────── */}
          <div className="lg:col-span-3 bg-white p-10 md:p-14">
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-3">Message received.</h2>
                  <p className="text-gray-500 text-lg max-w-sm">
                    We&apos;ll review your brief and get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '', service: '' });
                    }}
                    className="mt-8 text-sm text-red-600 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-black mb-1">Request a Briefing</h2>
                  <p className="text-gray-400 text-sm mb-8">All fields marked * are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="jane@company.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 555 000 0000"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>

                    {/* Service pill selector */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Service Needed *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, service: s }))}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                              formData.service === s
                                ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      {/* Hidden required input to enforce selection */}
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        required
                        readOnly
                        className="sr-only"
                        tabIndex={-1}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Tell us about your project *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe what you're building, where you are in the process, and what you need most right now..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm resize-none"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full bg-black text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:bg-red-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Brief
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-gray-400">
                      We respond within 2 hours · NDA available on request
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
