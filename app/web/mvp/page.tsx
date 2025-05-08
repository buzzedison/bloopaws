import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: "MVP Builder Package | For Idea-Stage Companies",
  description: "Transform your idea into a professional MVP with our Builder Package. Includes landing page design, brainstorming session, and hosting. Perfect for idea-stage startups.",
  keywords: "MVP, startup, idea-stage, landing page, web development, Ghana",
  openGraph: {
    title: "MVP Builder Package | For Idea-Stage Companies",
    description: "Transform your idea into a professional MVP with our Builder Package. Includes landing page design, brainstorming session, and hosting.",
    images: [
      {
        url: "https://bloopglobal.com/images/mvp.png",
        width: 1200,
        height: 630,
        alt: "MVP Builder Package",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Builder Package | For Idea-Stage Companies",
    description: "Transform your idea into a professional MVP with our Builder Package. Includes landing page design, brainstorming session, and hosting.",
    images: ["https://example.com/twitter-image.jpg"],
  },
}

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-400 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up pt-24">
            MVP Builder Package
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up animation-delay-200">
            For Idea-Stage Companies
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full animate-fade-in-up animation-delay-400"></div>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Stop wondering, start testing.
            </h2>
            <p className="text-lg md:text-xl">
              If you're sitting on an idea, wondering if the world would love your product—it's time to take action.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="mr-2 h-6 w-6 text-white flex-shrink-0" />
                <span>Professional landing page design (value: 10,000 GHC)</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-6 w-6 text-white flex-shrink-0" />
                <span>Free brainstorming session (value: 10,000 GHC)</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-6 w-6 text-white flex-shrink-0" />
                <span>Domain name and 1 year of hosting included</span>
              </li>
            </ul>
          </div>

          <div className="bg-white text-red-800 rounded-lg shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 animate-fade-in-right">
            <h3 className="text-3xl font-bold mb-4 text-red-600">Get it ALL for ONLY</h3>
            <div className="text-6xl font-extrabold mb-4">2,500 GHC</div>
            <p className="mb-6 text-gray-600">Limited-time offer. When it's gone, it's gone.</p>
            <Link href="/contact">
              <Button className="w-full py-4 text-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>

        <section className="mt-24 bg-white text-red-800 rounded-lg shadow-xl p-12 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Who is this for?</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-3xl mx-auto text-center">
            This is for the starters. For professionals who have a killer idea but haven't tested it. If you're in the idea stage, this is your chance to launch without breaking the bank.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="tel:0500002994" className="flex items-center bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors duration-300 w-full md:w-auto justify-center">
              <Phone className="mr-3 h-6 w-6" />
              Call: 0500002994
            </Link>
            <Link href="https://wa.me/0277667561" className="flex items-center bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors duration-300 w-full md:w-auto justify-center">
              <MessageCircle className="mr-3 h-6 w-6" />
              WhatsApp: 0277667561
            </Link>
          </div>
        </section>

        <footer className="mt-16 text-center">
          <Link href="/contact" passHref>
            <Button className="bg-white text-red-600 hover:bg-red-100 transition-colors duration-300 px-8 py-3 rounded-full text-lg font-semibold">
              Contact Us
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  )
}