
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pitch Perfect Event</title>
        <meta name="description" content="Join the Pitch Perfect event..." />
        {/* Other SEO tags */}
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <section className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4">Bring Your Visions to Life</h1>
          <p className="text-xl mb-4">Join Pitch Perfect - The Online Pitch Event</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Now
          </button>
        </section>

        {/* About the Event */}
        <section className="p-6">
          <h2 className="text-3xl font-bold mb-3">Amplify Your Impact from Anywhere</h2>
          <p className="mb-2">Join us for Pitch Perfect — the online pitch event where boundaries blur and your ideas take centre stage.</p>
          {/* ... More content */}
        </section>

        {/* Benefits of Participating */}
        <section className="p-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-3">What’s the Buzz?</h2>
          <ul className="list-disc list-inside">
            <li>Pocket a Cool $100</li>
            <li>High Impact Website</li>
            <li>Spotlight Special</li>
          </ul>
        </section>

        {/* Event Mechanics */}
        <section className="p-6">
          <h2 className="text-3xl font-bold mb-3">Event Mechanics</h2>
          <p className="mb-2">Submit Your Spark: Slide us your pitch deck and prepare to wow us.</p>
          {/* ... More content */}
        </section>

        {/* Why Pitch Perfect */}
        <section className="p-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-3">Why Pitch Perfect Is a Game-Changer</h2>
          <p className="mb-2">Networking Nirvana: Virtually mingle with investors, gurus, and fellow trailblazers.</p>
          {/* ... More content */}
        </section>

        {/* Event Details */}
        <section className="p-6">
          <h2 className="text-3xl font-bold mb-3">Save the Date</h2>
          <p>Date: December 9, 2023</p>
          <p>Venue: Your screen!</p>
          {/* ... More content */}
        </section>

        {/* Call to Action */}
        <section className="p-6 bg-blue-500 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Pitch for Glory</h2>
          <p>Sharpen your pitch, set up your backdrop, and get ready to charm screens across the globe.</p>
          <button className="bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4 rounded mt-4">
            Register Now
          </button>
        </section>
      </main>
    </>
  );
}
