
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pitch Perfect Event</title>
        <meta name="description" content="Join the Pitch Perfect event..." />
      </Head>

      <main className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="text-center p-10 bg-red-600 text-white">
          <h1 className="text-5xl font-bold mb-6">Bring Your Visions to Life</h1>
          <p className="text-xl mb-8">Join Pitch Perfect - The Online Pitch Event</p>
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Join Now
          </button>
        </section>

        {/* About the Event */}
        <section className="py-10 px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Amplify Your Impact from Anywhere</h2>
          <p className="text-gray-600 mb-5">Join us for Pitch Perfect — the online pitch event where boundaries blur and your ideas take centre stage.</p>
          {/* ... More content */}
        </section>

        {/* Benefits of Participating */}
        <section className="py-10 px-6 bg-red-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">What’s the Buzz?</h2>
          <ul className="text-gray-600">
            <li className="mb-3">Pocket a Cool $100</li>
            <li className="mb-3">High Impact Website</li>
            <li>Spotlight Special</li>
          </ul>
        </section>

        {/* Event Mechanics */}
        <section className="py-10 px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Event Mechanics</h2>
          <p className="text-gray-600 mb-3">Submit Your Spark: Slide us your pitch deck and prepare to wow us.</p>
          {/* ... More content */}
        </section>

        {/* Why Pitch Perfect */}
        <section className="py-10 px-6 bg-red-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Why Pitch Perfect Is a Game-Changer</h2>
          <p className="text-gray-600 mb-3">Networking Nirvana: Virtually mingle with investors, gurus, and fellow trailblazers.</p>
          {/* ... More content */}
        </section>

        {/* Event Details */}
        <section className="py-10 px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Save the Date</h2>
          <p className="text-gray-600">Date: December 9, 2023</p>
          <p className="text-gray-600">Venue: Your screen!</p>
          {/* ... More content */}
        </section>

        {/* Call to Action */}
        <section className="text-center p-10 bg-red-600 text-white">
          <h2 className="text-3xl font-bold mb-6">Pitch for Glory</h2>
          <p className="mb-8">Sharpen your pitch, set up your backdrop, and get ready to charm screens across the globe.</p>
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
            Register Now
          </button>
        </section>
      </main>
    </>
  );
}
