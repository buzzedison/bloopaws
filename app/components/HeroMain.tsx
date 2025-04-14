'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'

export default function Component() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 w-full py-12">
      <div className="relative flex flex-col items-center justify-center px-6 py-20 mx-auto max-w-7xl min-h-screen">
        {/* Content Section */}
        <div className="text-center space-y-8 z-10 max-w-3xl py-12">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-black">
            From Idea to <span className="text-red-600">Market Success</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700">
          Build and Grow Your Business With Custom Websites & Apps, Market Insights, High Performance Training 
          </p>
          <div className="flex justify-center">
            <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/s/6SCzru9ZGUeB8XFL-qW1Uw2">
              <button className="bg-red-600 text-white hover:bg-red-700 font-bold py-3 px-8 rounded-md transition duration-300 ease-in-out">
              Make It Happen!
              </button>
            </Link>
          </div>
        </div>

        {/* Workflow Illustration */}
        <div className="mt-16 w-full max-w-4xl ">
          <div className="relative w-full h-auto px-2 md:px-12 py-2 md:py-12 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-2xl overflow-hidden p-6">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <WorkflowStep icon="💡" text="You Share Your Idea" />
                <div className="hidden sm:flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <ChevronRight className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <WorkflowStep icon="🔧" text="We Build the Product" />
                <div className="hidden sm:flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-3 shadow-lg">
                    <ChevronRight className="w-8 h-8 text-white" />
                  </div>
                </div>
                <WorkflowStep icon="🚀" text="We Launch & Grow It" />
                <div className="hidden sm:flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Plus className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <WorkflowStep icon="💼" text="You Focus on Success" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-24 w-full bg-gray-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800"> How We Help Your Business Grow</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem
              icon={<WebDesignIcon className="w-10 h-10 text-red-600" />}
              title="Web & Mobile Apps"
              description="Convert visitors into buyers on autopilot."
            />
            <FeatureItem
              icon={<MarketIntelligenceIcon className="w-10 h-10 text-red-600" />}
              title="Market Intelligence"
              description="Make informed decisions to stay ahead."
            />
            <FeatureItem
              icon={<ExpertTrainingIcon className="w-10 h-10 text-red-600" />}
              title="Expert Training"
              description="Empower your team for business growth."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface WorkflowStepProps {
  icon: string;
  text: string;
  isAction?: boolean;
}

function WorkflowStep({ icon, text, isAction = false }: WorkflowStepProps) {
  return (
    <div className={`flex items-center ${isAction ? 'bg-red-100' : 'bg-white'} rounded-lg p-4 shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className={`${isAction ? 'bg-red-600' : 'bg-gray-200'} rounded-full p-3 mr-3`}>
        <span className={`text-lg font-bold ${isAction ? 'text-white' : 'text-gray-600'}`}>{icon}</span>
      </div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  )
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-lg font-semibold ml-3 text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

interface PlusProps extends React.SVGProps<SVGSVGElement> {}

function Plus(props: PlusProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function WebDesignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function MarketIntelligenceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function ExpertTrainingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  )
}