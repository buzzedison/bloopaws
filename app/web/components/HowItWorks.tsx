'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, PenTool, Rocket, CreditCard, MessageSquare, Monitor } from 'lucide-react'

const steps = [
  {
    title: "In-Depth Market Research",
    description: "We analyze your competitors, audience, and market trends to craft a strategy that meets your business goals.",
    icon: <Lightbulb className="h-8 w-8" />,
  },
  {
    title: "Custom Copy & Design",
    description: "We develop engaging copy and design that align with your brand and convert visitors into customers.",
    icon: <PenTool className="h-8 w-8" />,
  },
  {
    title: "Launch & Optimize",
    description: "We launch your site and provide ongoing support to refine and scale your business.",
    icon: <Rocket className="h-8 w-8" />,
  },
]

const features = [
  {
    title: "Secure Payments",
    description: "Through Stripe/Paystack",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    title: "Communicate",
    description: "Via Asana",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "Delivered With",
    description: "Figma, JavaScript frameworks, or WordPress",
    icon: <Monitor className="h-6 w-6" />,
  },
]

export default function Component() {
  return (
    <section className="bg-gradient-to-br from-red-800 to-red-900 text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Our Process</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How It Works</h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Our streamlined process ensures your project is completed efficiently and effectively.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 border-none shadow-lg hover:bg-white/20 transition-colors duration-300">
                <CardHeader>
                  <div className="bg-red-200 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-100">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-700 to-red-600 rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <div className="bg-red-800 p-3 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-red-100">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}