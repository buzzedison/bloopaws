"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"

export default function AnniversaryFormPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const packageParam = searchParams.get("package") || "website"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: packageParam,
    howDidYouHear: "",
    howDidYouHearOther: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  useEffect(() => {
    setFormData((prev) => ({ ...prev, package: packageParam }))
  }, [packageParam])

  const packageInfo = {
    website: {
      title: "Website Package",
      price: "GHC 999",
      description: "Launch-ready. 7-day delivery.",
    },
    "pitch-deck": {
      title: "Pitch Deck Package",
      price: "GHC 999",
      description: "Investor-ready. AI-generated.",
    },
    "business-plan": {
      title: "Business Plan Package",
      price: "GHC 1,200",
      description: "25+ pages. Bank-ready.",
    },
  }

  const currentPackage = packageInfo[packageParam as keyof typeof packageInfo] || packageInfo.website

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    // Validate "other" field if "other" is selected
    if (formData.howDidYouHear === "other" && !formData.howDidYouHearOther.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please specify where you heard about us",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/anniversary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form")
      }

      setSubmitStatus({
        type: "success",
        message: "Form submitted successfully! We'll contact you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: packageParam,
        howDidYouHear: "",
        howDidYouHearOther: "",
        message: "",
      })

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/anniversary?success=true")
      }, 3000)
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-sm font-medium text-red-600">Anniversary Special</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            Claim Your Deal
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Package Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{currentPackage.title}</h2>
              <p className="text-gray-600">{currentPackage.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-red-600">{currentPackage.price}</div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Package Selection */}
          <div>
            <label htmlFor="package" className="block text-sm font-semibold mb-2 text-gray-900">
              Select Package
            </label>
            <select
              id="package"
              name="package"
              value={formData.package}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              required
            >
              <option value="website">Website - GHC 999</option>
              <option value="pitch-deck">Pitch Deck - GHC 999</option>
              <option value="business-plan">Business Plan - GHC 1,200</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-900">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="+233 XX XXX XXXX"
            />
          </div>

          {/* How Did You Hear About This */}
          <div>
            <label htmlFor="howDidYouHear" className="block text-sm font-semibold mb-2 text-gray-900">
              How did you hear about this? *
            </label>
            <select
              id="howDidYouHear"
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            >
              <option value="">Select an option</option>
              <option value="social-media">Social Media (Facebook, Instagram, Twitter, LinkedIn)</option>
              <option value="google-search">Google Search</option>
              <option value="friend-referral">Friend/Colleague Referral</option>
              <option value="email-marketing">Email Marketing</option>
              <option value="website">Our Website</option>
              <option value="blog-article">Blog Article or Content</option>
              <option value="podcast">Podcast</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Other Field - Shows when "Other" is selected */}
          {formData.howDidYouHear === "other" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label htmlFor="howDidYouHearOther" className="block text-sm font-semibold mb-2 text-gray-900">
                Please specify *
              </label>
              <input
                type="text"
                id="howDidYouHearOther"
                name="howDidYouHearOther"
                value={formData.howDidYouHearOther}
                onChange={handleChange}
                required={formData.howDidYouHear === "other"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Where did you hear about this?"
              />
            </motion.div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900">
              Additional Details (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Tell us about your project goals, timeline, or any specific requirements..."
            />
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {submitStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>⚠️</span>
                )}
                <span>{submitStatus.message}</span>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Claim My Deal</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to be contacted by our team.
          </p>
        </motion.form>
      </div>
    </div>
  )
}

