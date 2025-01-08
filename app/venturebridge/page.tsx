import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Lightbulb, Target, BarChart, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VentureBridge | Bloop Global',
  description: 'Connecting Startups with Professionals Who Care',
};

export default function VentureBridgePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-20">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Connecting Startups</span>
                <span className="block text-red-600 mt-2">with Professionals Who Care</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                Affordable services, expert advice, and even free support—because growing your business should not feel impossible.
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <Link 
                  href="https://airtable.com/app7rzeBLQmXIiBQ5/pagCtEZVrDuB4bFg4/form"
                  className="rounded-lg px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Join as Startup
                </Link>
                <Link 
                  href="https://airtable.com/app7rzeBLQmXIiBQ5/pagW0s7zW1oyKlNqS/form"
                  className="rounded-lg px-6 py-3 bg-gray-100 text-white font-medium hover:bg-gray-900 transition-colors"
                >
                  Join as Professional
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Join the Network</h2>
              <p className="mt-4 text-lg text-gray-600">
                Bloop Global and Enterprise Village are creating a network that does more than connect startups with professionals. We are building a community where founders can access affordable—and sometimes free—services from trusted experts who care about their success.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                From legal consultations to marketing strategies, this is the platform where startups thrive, and professionals make a lasting impact.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <Users className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Community First</h3>
                <p className="mt-2 text-gray-600">Built on trust and mutual growth</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <Shield className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Vetted Experts</h3>
                <p className="mt-2 text-gray-600">Qualified professionals you can trust</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <Target className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Targeted Help</h3>
                <p className="mt-2 text-gray-600">Specific solutions for your needs</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <BarChart className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Growth Focus</h3>
                <p className="mt-2 text-gray-600">Measurable impact on your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Who We Serve</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">For Startups</h3>
                <Lightbulb className="w-8 h-8 text-red-600" />
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Exclusive discounts on essential services like legal, financial, and marketing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Free consultations and workshops offered by professionals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">A trusted network of experts to help you grow with confidence</span>
                </li>
              </ul>
              <Link 
                href="#startup-signup"
                className="inline-flex items-center text-red-600 font-medium hover:text-red-700"
              >
                Sign Up as a Startup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">For Professionals</h3>
                <Briefcase className="w-8 h-8 text-red-600" />
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Partner with startups to offer paid services—and donate your time</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Expand your client base while building meaningful relationships</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-red-600 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Gain exposure through our platform as a trusted professional</span>
                </li>
              </ul>
              <Link 
                href="#professional-signup"
                className="inline-flex items-center text-red-600 font-medium hover:text-red-700"
              >
                Sign Up as a Professional
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Register for Free',
                description: "Whether you're a startup founder or a professional, it's quick and easy to join.",
                step: '01'
              },
              {
                title: 'Find the Right Match',
                description: 'Startups can explore affordable services and free offerings. Professionals can connect with founders who need their expertise.',
                step: '02'
              },
              {
                title: 'Collaborate for Growth',
                description: 'Work together on projects, join free consultations, and grow your impact.',
                step: '03'
              }
            ].map((item, index) => (
              <div key={index} className="relative p-8 bg-gray-50 rounded-xl">
                <span className="absolute -top-4 right-4 text-6xl font-bold text-red-100">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join our network of innovators, creators, and problem-solvers. Whether you're building the next big thing or ready to share your expertise, your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://airtable.com/app7rzeBLQmXIiBQ5/pagCtEZVrDuB4bFg4/form"
              className="rounded-lg px-8 py-4 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              Join as a Startup
            </Link>
            <Link 
              href="https://airtable.com/app7rzeBLQmXIiBQ5/pagW0s7zW1oyKlNqS/form"
              className="rounded-lg px-8 py-4 bg-gray-100 text-white font-medium hover:bg-gray-100 transition-colors"
            >
              Join as a Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 