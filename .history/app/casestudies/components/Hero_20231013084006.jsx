// pages/case-studies.js
import Image from 'next/image'

// pages/case-studies.js

export default function CaseStudies() {
    return (
      <div className="min-h-screen bg-blue-100 p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-purple-900">Revamping MyCo's Online Presence</h1>
          <p className="text-xl mb-10 text-purple-700">
            The founders of MyCo knew there had to be a better way to manage customer relations. After countless late nights and many cups of coffee, they cracked the code - 
            a revolutionary app called My Center Office (MyCo).
          </p>
          <div className="relative mb-10 h-56 md:h-96 bg-center bg-cover" style={{ backgroundImage: 'url(/images/casehome.jpg)' }}></div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-semibold mb-4">The economic potential of generative AI: The next productivity frontier</h3>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-semibold mb-4">McKinsey Technology Trends Outlook 2023</h3>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-semibold mb-4">Author Talks: How to speak confidently when you’re put on the spot</h3>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-semibold mb-4">Some employees are destroying value. Others are building it. Do you know the difference?</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
  