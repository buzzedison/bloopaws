import Link from "next/link"
import Image from "next/image"
import { cachedClient } from "../sanity/lib/client"
import { postsQuery } from "../sanity/lib/queries";
import { caseStudiesQuery } from "../sanity/lib/caseStudyQueries";
import InsightsInnovative from "./components/InsightsInnovative";
import { ArrowRight, CheckCircle2, Download, ExternalLink } from "lucide-react";
import HeroInnovative from "./components/HeroInnovative";
import RealityCheck from "./components/RealityCheck";
import ServicesInnovative from "./components/ServicesInnovative";
import SocialProofStories from "./components/SocialProofStories";
import PlaybookTeaser from "./components/PlaybookTeaser";

export const metadata = {
  title: "Turn Your Idea Into a Business",
  description: "We turn big ideas into businesses that actually work. From web development to SaaS platforms, mobile apps, and AI automations - we handle the tricky parts so you can focus on your vision.",
  keywords: "business development, SaaS development, web development, mobile app development, AI automation, startup funding, business strategy, technical co-founder",
  openGraph: {
    title: "Turn Your Incredible Idea Into a Real Business | Bloop Global",
    description: "We turn big ideas into businesses that actually work. We've been in the trenches, built our own stuff, and we're here to help you build yours.",
    type: "website",
    url: "https://bloopglobal.com",
    siteName: "Bloop Global",
    images: [
      {
        url: "/images/blooplogo.png",
        width: 1200,
        height: 630,
        alt: "Bloop Global - Turn Ideas Into Businesses"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn Your Incredible Idea Into a Real Business | Bloop Global",
    description: "We turn big ideas into businesses that actually work. We've been in the trenches, built our own stuff, and we're here to help you build yours.",
    images: ["/images/blooplogo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function Home() {
  // Fetch blog posts from Sanity
  const posts = await cachedClient(postsQuery);
  const majorPosts = posts.slice(0, 3);

  // Fetch case studies from Sanity
  const caseStudies = await cachedClient(caseStudiesQuery);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bloop Global",
    "url": "https://bloopglobal.com",
    "logo": "https://bloopglobal.com/images/blooplogo.png",
    "description": "We turn big ideas into businesses that actually work. From web development to SaaS platforms, mobile apps, and AI automations.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "ask@bloopglobal.com"
    },
    "sameAs": [
      "https://twitter.com/bloopglobal",
      "https://linkedin.com/company/bloopglobal"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "SaaS Development",
        "description": "Custom SaaS platform development that generates measurable ROI"
      },
      {
        "@type": "Service",
        "name": "Web Development",
        "description": "Modern web applications that turn visitors into customers"
      },
      {
        "@type": "Service",
        "name": "Mobile App Development",
        "description": "Mobile apps that scale and engage users"
      },
      {
        "@type": "Service",
        "name": "AI Business Automation",
        "description": "AI automations that streamline business operations"
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <HeroInnovative />

        {/* Section 2: The Reality Check */}
        <RealityCheck />

        {/* Section 4: How We Can Help - Services */}
        <ServicesInnovative />

        {/* Section 4: Social Proof - Our Stories Teaser */}
        <SocialProofStories />

        {/* Section 5: The Playbook - Content Hub Teaser */}
        <PlaybookTeaser />

        {/* Insights Section */}
        <InsightsInnovative posts={majorPosts} />

        {/* Final CTA Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20"></div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to <span className="text-black">Dominate?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
              The market doesn't wait for perfect. It rewards action. Let's build something that makes your competition irrelevant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link prefetch={false} href="/contact">
                <button className="group relative overflow-hidden bg-white text-black font-bold py-5 px-12 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center text-lg">
                    Start Your Build
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>

              <a href="mailto:ask@bloopglobal.com" className="text-white/80 hover:text-white font-medium underline decoration-white/30 hover:decoration-white transition-all">
                Or email us directly
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}


