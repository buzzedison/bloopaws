// pages/index.tsx
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pitch Perfect Event</title>
        <meta name="description" content="Join the Pitch Perfect event..." />
      </Head>

      <main className=" bg-white">
        {/* Hero Section */}
        <section className="text-center p-12 bg-red-900 text-white">
          <h1 className="text-5xl font-bold mb-6">Bring Your Visions to Life</h1>
          <p className="text-2xl mb-8">Join Pitch Perfect - The Online Pitch Event</p>
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Join Now
          </button>
        </section>

        {/* About the Event */}
        <section className="py-12 px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Amplify Your Impact from Anywhere</h2>
          <p className="text-lg text-gray-600">Join us for Pitch Perfect — the online pitch event where boundaries blur and your ideas take center stage.</p>
          {/* ... More content */}
        </section>

        {/* Benefits of Participating */}
        <section className="py-12 px-6 bg-red-100">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">What’s the Buzz?</h2>
          <div className="flex justify-center space-x-4">
            <div className="text-gray-600">
              <h3 className="text-xl font-semibold mb-2">Pocket a Cool $100</h3>
              <p>It's not just about the money, but hey, it doesn’t hurt.</p>
            </div>
            <div className="text-gray-600">
              <h3 className="text-xl font-semibold mb-2">High Impact Website</h3>
              <p>Land a free website build to dominate the digital realm.</p>
            </div>
            <div className="text-gray-600">
              <h3 className="text-xl font-semibold mb-2">Spotlight Special</h3>
              <p>Enjoy the fame as we feature your brand in the virtual square.</p>
            </div>
          </div>
        </section>

        {/* Event Mechanics */}
        {/* ... Similar structure for other sections */}
        
        {/* Call to Action */}
        <section className="text-center p-12 bg-red-600 text-white">
          <h2 className="text-4xl font-bold mb-6">Pitch for Glory</h2>
          <p className="text-lg mb-8">Sharpen your pitch, set up your backdrop, and get ready to charm screens across the globe.</p>
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Register Now
          </button>
        </section>
      </main>
    </>
  );
}
