import Image from "next/image"

export default function IdeaToCompanySection(){
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Use Image component to display the logo */}
          <Image src="/images/funding.png" alt="Bloop Global logo" width={400} height={250} />
          {/* Use a heading tag to display the section title */}
          <h2 className="text-4xl font-bold text-white md:ml-8">Idea To Company:<br/>Turning Ideas into Successful Businesses</h2>
        </div>
        {/* Use a paragraph tag to display the section description */}
        <p className="text-lg text-white mt-8 md:w-2/3">At Bloop Global, we partner with top talent to invest in, build, and grow successful companies. Our mission is to tackle big societal problems, create products that people love, and build businesses that can compete with the biggest names in the world.</p>
        {/* Use a button tag to display a call to action */}
        <button className="inline-block bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100 mt-8">Learn more</button>
      </div>
    </div>
  )
}
