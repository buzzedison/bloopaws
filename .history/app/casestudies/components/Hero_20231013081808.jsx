// pages/case-studies.js
import Image from 'next/image'

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-blue-100 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-blue-900">Global Banking Annual Review 2023: The Great Banking Transition</h1>
        <p className="text-xl mb-10 text-blue-700">Banking profits are up, thanks to rising interest rates, but financial institutions globally need to reinvent themselves in the face of major structural and macroeconomic shifts.</p>
        <div className="relative mb-10">
          <Image src="/your-image-path.jpg" alt="Abstract Design" width={1500} height={500} />
        </div>
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
