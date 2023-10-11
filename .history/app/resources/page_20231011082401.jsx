import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 min-h-screen p-8">
      <Head>
        <title>Resources</title>
      </Head>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-red-500 to-red-700 rounded-xl p-10 text-white shadow-2xl">
        <h1 className="sm: mt-4 md:mt-24 text-6xl font-extrabold mb-4">Explore Our Resource Collections</h1>
        <p className="text-2xl mb-4 p-0 md:pr-20">We offer a cornucopia of resources—games, templates, insights from whitepapers, and educational courses—to meet your every need.</p>
        <div className="absolute bottom-0 right-0 p-4 text-sm text-gray-300">
          Scroll to Discover
        </div>
      </div>

      {/* Resources Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {[
          {title: 'Games', description: 'Engage with our fun and educational games designed to enhance your skills.'},
          {title: 'Templates', description: 'Get started quickly with our ready-to-use templates for various projects.'},
          {title: 'Whitepapers', description: 'Gain insights from our comprehensive whitepapers on various topics.'},
          {title: 'Courses', description: 'Enroll in our courses to learn new skills or enhance your existing ones.'},
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-extrabold text-red-600 mb-4">{item.title}</h2>
            <p className="text-gray-700 mb-6">{item.description}</p>
            <button className="py-2 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded hover:from-red-600 hover:to-red-700 transition-all duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
