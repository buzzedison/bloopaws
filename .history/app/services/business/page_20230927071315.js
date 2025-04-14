import Image from 'next/image'
import Link from 'next/link'

export default function BusinessServices() {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Business Development, Funding, and Advisory Services
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We help you grow your business with the right strategies, funding sources, and partnerships. Whether you are a startup, a small business, or an established enterprise, we have the expertise and network to help you achieve your goals.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900">Our services include:</h3>
            <ul className="mt-2 space-y-2 text-gray-500">
              <li>Business plan development and review</li>
              <li>Market research and analysis</li>
              <li>Funding strategy and pitch deck creation</li>
              <li>Investor relations and deal negotiation</li>
              <li>Strategic partnerships and alliances</li>
              <li>Business coaching and mentoring</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <div className="flex items-center justify-center h-full w-full bg-white shadow-xl rounded-lg">
            <Image
              src="/images/business-services.jpg"
              alt="A group of people working on a laptop"
              width={500}
              height={500}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/contact"className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Contact us today
          
        </Link>
      </div>
    </div>
  )
}
