import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-red-50 min-h-screen p-4">
      <Head>
        <title>Resources</title>
      </Head>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center text-white py-20 px-4 bg-red-600 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Explore Our Resource Collections</h1>
        <p className="text-2xl">We provide a wide array of resources including games, templates, insights from whitepapers, and educational courses for your needs.</p>
      </div>

      {/* Resources Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {[
          {title: 'Games', description: 'Engage with our fun and educational games designed to enhance your skills.'},
          {title: 'Templates', description: 'Get started quickly with our ready-to-use templates for various projects.'},
          {title: 'Whitepapers/Insights', description: 'Gain insights from our comprehensive whitepapers on various topics.'},
          {title: 'Courses', description: 'Enroll in our courses to learn new skills or enhance your existing ones.'}
        ].map((item, index) => (
          <div key={index} className="p-6 border-2 border-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{item.title}</h2>
            <p className="text-black mb-6">{item.description}</p>
            <button className="py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200">Learn More</button>
          </div>
        ))}
      </div>

    </div>
  );
}