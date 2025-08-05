import Link from "next/link"
import Image from "next/image"
import { cachedClient } from "../sanity/lib/client"
import { postsQuery } from "../sanity/lib/queries";
import { caseStudiesQuery } from "../sanity/lib/caseStudyQueries";
import InsightsInnovative from "./components/InsightsInnovative";
import { ArrowRight, CheckCircle2, Download, ExternalLink } from "lucide-react";
import HeroInnovative from "./components/HeroInnovative";
import ServicesOrbitalRefined from "./components/ServicesOrbitalRefined";
import WhyBloopLight from "./components/WhyBloopLight";
import ProcessSideBySide from "./components/ProcessSideBySide";
import PricingInnovative from "./components/PricingInnovative";
import FAQInnovative from "./components/FAQInnovative";

export default async function Home() {
  // Fetch blog posts from Sanity
  const posts = await cachedClient(postsQuery);
  const majorPosts = posts.slice(0, 3);
  
  // Fetch case studies from Sanity
  const caseStudies = await cachedClient(caseStudiesQuery);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with new copy */}
      <HeroInnovative />
      
      {/* Creative Proof Bar */}
      <section className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black transform skew-y-[-1.5deg] origin-top-right scale-y-110"></div>
        
        <div className="relative z-10 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Updated stats */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <div className="flex items-center space-x-16">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Generated</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">90 Days</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Average Launch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">8+ Years</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Avg Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Generated</span>
                  </div>
                </div>
              </div>
              <div className="inline-block animate-marquee2">
                <div className="flex items-center space-x-16">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Generated</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">90 Days</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Average Launch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">8+ Years</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Avg Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Generated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with updated copy */}
      <ServicesOrbitalRefined />

      {/* Why Bloop Section with updated copy */}
      <WhyBloopLight />

      {/* Process Section with updated copy */}
      <div id="process">
        <ProcessSideBySide />
      </div>

      {/* Pricing Section */}
      <PricingInnovative />

      {/* FAQ Section */}
      <FAQInnovative />

      {/* Insights Section */}
      <InsightsInnovative posts={majorPosts} />

      {/* Updated Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Revenue Engine?</h2>
          <p className="text-xl mb-4 opacity-90">
            <strong>The longer you wait, the more market share your competitors capture.</strong>
          </p>
          <p className="text-lg mb-8 opacity-80">
            Most successful SaaS platforms launched their MVP within 6 months of having the idea. 
            Where will you be in 6 months—still planning, or already generating revenue?
          </p>
          <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/">
            <button className="bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
              Schedule Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
          <p className="text-sm opacity-70 mt-4">
            Or email us at{" "}
            <a href="mailto:ask@bloopglobal.com" className="underline hover:no-underline">
              ask@bloopglobal.com
            </a>{" "}
            with your project details
          </p>
        </div>
      </section>
    </div>
  )
}


