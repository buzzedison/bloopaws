import Link from "next/link";

const sections = [
  {
    title: "Business Development, Funding, and Advisory Services",
    description: "We help you grow your business with the right strategies, funding sources, and partnerships.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>

    ),
    button: {
      text: "Learn More",
      link: "/services/business",
    },
  },
  {
    title: "Web Development, Product Development, Mobile App & SEO Services",
    description: "We build stunning websites, products, and apps that boost your online presence and conversions.",
    icon: (
    

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mb-2">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
</svg>

    ),
    button: {
      text: "Check Us Out",
      link: "/services/web",
    },
  },
];

export default function GoalsSection() {
  return (
    <>
      <div className="mt-16 bg-gray-50 w-full">
        <div className="mt-2 md:mt-12">
          <h1 className="text-gray-500 text-lg md:text-3xl  text-center font-bold mb-0">
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
                {section.icon}
                <div className="flex flex-col justify-between flex-grow w-full">
                  <div>
                    <h2 className="text-lg font-extrabold mb-2">{section.title}</h2>
                    <p className="text-md text-gray-600 mb-4">{section.description}</p>
                  </div>
                  <Link prefetch={false} href={section.button.link} passHref>
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