import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-red-50 min-h-screen p-4">
      <Head>
        <title>Resources</title>
      </Head>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center text-white py-12 px-4 bg-red-600 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to our Resources Page</h1>
        <p className="text-xl">Explore our vast collection of games, templates, whitepapers, and courses!</p>
      </div>

      {/* Resources Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {['Games', 'Templates', 'Whitepapers/Insights', 'Courses'].map((item, index) => (
          <div key={index} className="p-4 border-2 border-red-600 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-2">{item}</h2>
            <p className="text-black mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">Learn More</button>
          </div>
        ))}
      </div>

    </div>
  );
}