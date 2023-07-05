import Link from "next/link";
import Image from "next/image";

// Define an array of objects to store the data for each section
const sections = [
  {
    title: "Business Development, Funding, and Advisory Services",
    description: "We help you grow your business with the right strategies, funding sources, and partnerships.",
    icon: "/icons/business-icon.svg",
    alt: "Business image",
    button: {
      text: "Learn More",
      link: "/business"
    }
  },
  {
    title: "Web Development, Product Development, Mobile App & SEO Services",
    description: "We build stunning websites, products, and apps that boost your online presence and conversions.",
    icon: "/icons/web-icon.svg",
    alt: "Web image",
    button: {
      text: "Check Us Out",
      link: "/technology"
    }
  },
];

export default function GoalsSection() {
  return (
    <>
      <div className="mt-16">
        <div>
          <h1 className="text-gray-500 text-3xl text-center font-bold mb-0">
            Let us help you achieve your goals
            <br />
            What can we do for you today?
          </h1>
        </div>
        <div className="container mx-auto px-4 py-8 md:px-24 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Use the map method to iterate over the sections array and render each section dynamically */}
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-gradient-to-tr from-[#f7f7fc] to-[#ffffff] shadow-lg rounded-2xl overflow-hidden flex flex-col items-center p-4 md:p-8 transform transition duration-300 hover:shadow-2xl hover:scale-105"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>

                <div className="flex flex-col justify-between flex-grow w-full">
                  <div>
                    <h2 className="text-lg font-extrabold mb-2">{section.title}</h2>
                    <p className="text-md text-gray-600 mb-4">{section.description}</p>
                  </div>
                  <Link href={section.button.link} passHref>
                    <button className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 self-start">
                      {section.button.text}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}