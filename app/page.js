import Link from "next/link"
import Image from "next/image"
import { cachedClient } from "../sanity/lib/client"
import { postsQuery } from "../sanity/lib/queries";
import { caseStudiesQuery } from "../sanity/lib/caseStudyQueries";
import InsightsInnovative from "./components/InsightsInnovative";
import { ArrowRight, CheckCircle2, Download, ExternalLink } from "lucide-react";
import HeroInnovative from "./components/HeroInnovative";
import ServicesOrbitalRefined from "./components/ServicesOrbitalRefined";
    // import FlagshipOfferInnovative from "./components/FlagshipOfferInnovative";
    // import TrainingSimple from "./components/TrainingSimple";
// import SuccessStoriesInnovative from "./components/SuccessStoriesInnovative";
import WhyBloopLight from "./components/WhyBloopLight";
import ProcessSideBySide from "./components/ProcessSideBySide";

export default async function Home() {
  // Fetch blog posts from Sanity
  const posts = await cachedClient(postsQuery);
  const majorPosts = posts.slice(0, 3);
  
  // Fetch case studies from Sanity
  const caseStudies = await cachedClient(caseStudiesQuery);

  return (
    <div className="flex flex-col w-full">
      {/* Innovative Hero Section */}
      <HeroInnovative />
      
      {/* Creative Proof Bar */}
      <section className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black transform skew-y-[-1.5deg] origin-top-right scale-y-110"></div>
        
        <div className="relative z-10 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Animated ticker/marquee effect */}
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <div className="flex items-center space-x-16">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">10+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Countries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Influenced</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">900+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Professionals Trained</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">10+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Countries</span>
                  </div>
                </div>
              </div>
              <div className="inline-block animate-marquee2">
                <div className="flex items-center space-x-16">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">10+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Countries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">$120M</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Revenue Influenced</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">900+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Professionals Trained</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold text-2xl">10+</span>
                    <span className="text-gray-300 text-sm uppercase tracking-wider">Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refined Orbital Services Section */}
      <ServicesOrbitalRefined />

      {/* Innovative Flagship Offer Section */}
      {/* <FlagshipOfferInnovative /> */}

      {/* Simple Modern Training & Capacity Building Section */}
      {/* <TrainingSimple /> */}

      {/* Innovative Success Stories Section */}
      {/* <SuccessStoriesInnovative caseStudies={caseStudies} /> */}

      {/* Light-Themed Why Bloop Section */}
      <WhyBloopLight />

      {/* Side-by-Side Process Section */}
      <ProcessSideBySide />

      {/* Innovative Insights Section */}
      <InsightsInnovative posts={majorPosts} />

      {/* 9. Final CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build smarter?</h2>
          <p className="text-xl mb-8">Your 30‑day sprint to an AI‑powered business starts here.</p>
          <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/">
            <button className="bg-white text-red-600 hover:bg-black hover:text-white font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center">
              Book a Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Component for service cards in the "What We Do" section
function ServiceCard({ title, description, iconPath }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 w-12 mb-4 text-red-600">
        <Image src={iconPath || "/images/icon-default.svg"} width={48} height={48} alt={title} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}

// Component for process steps in the "Our Process" section
function ProcessStep({ number, title, description }) {
  return (
    <div className="flex items-start md:items-center">
      <div className="relative">
        <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl z-10 relative">
          {number}
        </div>
      </div>
      <div className="ml-6 md:ml-12 bg-white rounded-xl p-6 shadow-md flex-1">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
