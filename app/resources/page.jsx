import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-red-800 min-h-screen">
      <Head>
        <title>Resources</title>
      </Head>

      {/* Hero Section */}
      <div className="relative h-[450px] bg-gray-900 rounded-xl p-10 text-white shadow-lg">
        <h1 className="pt-2 md:pt-24 mt-10 md:mt-24 text-5xl font-bold leading-tight mb-6">Explore Our Resource Collections</h1>
        <p className="text-xl max-w-xl opacity-80">Dive into our diverse array of resources, from games and templates to comprehensive whitepapers and enriching courses.</p>
        <div className="absolute bottom-0 right-0 p-4 text-sm text-gray-400">
          Scroll to Discover
        </div>
      </div>

      {/* Resources Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 p-4">
        {[
          { title: 'Games', description: 'Engage with our fun and educational games.', link: '/games' },
          { title: 'Templates', description: 'Ready-to-use templates for various projects.', link: '/templates' },
          { title: 'Whitepapers', description: 'In-depth insights on various topics.', link: '/whitepapers' },
          { title: 'Courses', description: 'Learn new skills or enhance your current ones.', link: '/courses' },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
            <p className="text-gray-600 mb-6">{item.description}</p>
            <Link prefetch={false} href={item.link} className="py-2 px-6 bg-red-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-300">
                Learn More
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
