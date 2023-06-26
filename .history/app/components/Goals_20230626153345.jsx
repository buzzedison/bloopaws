import Link from "next/link"
import { FaHandshake, FaLaptopCode } from "react-icons/fa"
export default function GoalsSection(){
    return (
        <>
        <div className="mt-12">

            <div>
                <h1 className=" text-grey-500 text-3xl text-center font-bold">
                    Let us help you achieve your goals<br/>
What can we do for you today?</h1>
            </div>
            <div>
            <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between border-b-2 md:border-b-0 border-gray-300">
        <div className="md:w-1/2 p-4 text-center md:text-left">
          <FaHandshake size={200} className="mx-auto md:mx-0 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Business Development, Funding, and Advisory Services</h2>
          <p className="text-lg text-gray-600 mb-4">We help you grow your business with the right strategies, funding sources, and partnerships.</p>
          <Link href="/request-info" passHref>
            <button className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Request info</button>
          </Link>
        </div>
        <div className="md:w-1/2 p-4 text-center md:text-right">
          <FaLaptopCode size={200} className="mx-auto md:mx-0 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Web Development, Product Development, Mobile App & SEO Services</h2>
          <p className="text-lg text-gray-600 mb-4">We build stunning websites, products, and apps that boost your online presence and conversions.</p>
          <Link href="/get-started" passHref>
            <button className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Get started</button>
          </Link>
        </div>
      </div>
    </div>
                </div>
        </div>
        </>
    )
}