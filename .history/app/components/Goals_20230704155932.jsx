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
  }
]

export default function GoalsSection(){
  return (
    <>
      <div className="mt-16">
        <div>
          <h1 className="text-grey-500 text-3xl text-center font-bold mb-8">
            Let us help you achieve your goals<br/>
            What can we do for you today?
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Use the map method to iterate over the sections array and render each section dynamically */}
            {sections.map((section) => (
              // Reduce the width and height of the images and cards
              <div key={section.title} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:pr-12 w-3/4 h-3/4 mx-auto">
                
                <Image className="w-full" src={section.image} alt={section.alt} width={450} height={150} objectFit="cover" />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                   
                    <h2 className="text-xl font-medium mb-2 pt-4 pb-4 ">{section.title}</h2>
                    
                    <p className="text-sm text-gray-800 mb-4">{section.description}</p>
                  </div>
                  <Link href={section.button.link} passHref>
                   
                    <button className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 self-start text-sm transform transition duration-500 hover:scale-110 hover:-rotate-12">{section.button.text}</button>
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
