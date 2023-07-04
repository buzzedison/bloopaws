import Link from "next/link"
import Image from "next/image"

// Define an array of objects to store the data for each section
const sections = [
  {
    title: "Business Development, Funding, and Advisory Services",
    description: "We help you grow your business with the right strategies, funding sources, and partnerships.",
    image: "/images/funding.png",
    alt: "Business image",
    button: {
      text: "Learn More",
      link: "/business"
    }
  },
  {
    title: "Web Development, Product Development, Mobile App & SEO Services",
    description: "We build stunning websites, products, and apps that boost your online presence and conversions.",
    image: "/images/webnew.png",
    alt: "Web image",
    button: {
      text: "Check Us Out",
      link: "/technology"
    }
  },

  
]

export default function GoalsSection(){
  return (
    <>
      <div className="mt-16">
        <div>
          <h1 className="text-grey-500 text-3xl text-center font-bold mb-0">
            Let us help you achieve your goals<br/>
            What can we do for you today?
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8 md:px-24 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Use the map method to iterate over the sections array and render each section dynamically */}
            {sections.map((section) => (
              <div key={section.title} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col w-3/4 items-center ">
                <Image className=" 
                fill={true}
                loader={imageLoader}
                
                w-full" src={section.image} alt={section.alt}
                 width={300} height={150} />
                <div className="p-2 flex flex-col justify-between flex-grow">
                  <div className="px-6">
                    <h2 className="text-lg font-extrabold mb-2 pt-4 pb-4 ">{section.title}</h2>
                    <p className="text-md text-gray-600 mb-1">{section.description}</p>
                  </div>
                  <Link className="px-6" href={section.button.link} passHref>
                    <button className="inline-block bg-red-600 text-white px-6 py-3 mb-2 rounded-lg hover:bg-red-700 self-start">{section.button.text}</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
