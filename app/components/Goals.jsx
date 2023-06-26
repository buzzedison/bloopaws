import Link from "next/link"
import Image from "next/image"

export default function GoalsSection(){
    return (
        <>
        
        <div className="mt-16">

            <div>
                <h1 className=" text-grey-500 text-3xl text-center font-bold mb-8">
                    Let us help you achieve your goals<br/>
What can we do for you today?</h1>
            </div>
            <div>
            <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Image className="w-full" src="/images/funding.png" alt="Business image" width={600} height={200} />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-3xl font-bold mb-2">Business Development, Funding, and Advisory Services</h2>
                <p className="text-lg text-gray-600 mb-4">We help you grow your business with the right strategies, funding sources, and partnerships.</p>
              </div>
              <Link href="/request-info" passHref>
                <button className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 self-start">Request info</button>
              </Link>
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Image src="/images/webnew.png" alt="Web image" width={600} height={200} />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-3xl font-bold mb-2">Web Development, Product Development, Mobile App & SEO Services</h2>
                <p className="text-lg text-gray-600 mb-4">We build stunning websites, products, and apps that boost your online presence and conversions.</p>
              </div>
              <Link href="/get-started" passHref>
                <button className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 self-end">Get started</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
                </div>
        </div>
        </>
    )
}
