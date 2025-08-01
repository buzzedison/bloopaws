// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pitch Perfect Event</title>
        <meta name="description" content="Join the Pitch Perfect event..." />
      </Head>

      <main className=" bg-white">
        {/* Hero Section */}
        <section className="text-center p-12 bg-red-700 text-white">
          <h1 className="text-5xl font-bold mb-6 pt-24 mt-12">Bring Your Ideas to Life</h1>
          <p className="text-2xl mb-4">Pitch Your Startup to the World - The Online Pitch Event</p>
          <p className="text-2xl font-bold text-red-200 mb-8"> Tuesday, January 23, 2024</p>
         <Link href="https://airtable.com/app5IEtJhqo7tKWRf/shrb97BeZGsQAb6yV">
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
         Apply Now
          </button>
          </Link>
        </section>

        {/* About the Event */}
        <section className="py-12 px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Amplify Your Impact from Anywhere</h2>
          <p className="text-lg text-gray-600">Join us for Pitch Perfect — the online pitch 
          event where boundaries blur and your ideas take center stage.</p>
       <div className="mt-4 text-2xl font-bold"><p> Are you a business owner with untapped innovations


</p>
<p>An aspiring entrepreneur with big dreams?</p>
<p>A working professional plotting your next venture?</p>
</div>
        </section>


{/* Benefits of Participating */}
<section className="py-12 px-4 md:px-12 bg-red-100 ">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Pitch Your Startup Idea</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {/* Card 1 */}
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-red-600">Pocket a Cool $100</h3>
      <p className="text-gray-600">It's not just about the money, but hey, it doesn’t hurt.</p>
    </div>
    {/* Card 2 */}
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-red-600">High Impact Website</h3>
      <p className="text-gray-600">Land a free website build to dominate the digital realm.</p>
    </div>
    {/* Card 3 */}
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-red-600">Spotlight Special</h3>
      <p className="text-gray-600">Enjoy the fame as we feature your brand in the virtual square.</p>
    </div>
  </div>
</section>


        {/* Event Mechanics */}
        {/* ... Similar structure for other sections */}
        
        {/* Call to Action */}
        <section className="text-center p-12 bg-red-600 text-white">
          <h2 className="text-4xl font-bold mb-6">Pitch for Glory</h2>
          <p className="text-lg mb-2">Sharpen your pitch, set up your backdrop, and get ready to charm screens across the globe.
          </p>
          <p className="mb-8 px-2 md:px-24 text-3xl font-extrabold"> Doesn’t matter if you're chasing capital or not, here's your spotlight to shine and capture the attention your venture deserves.</p>
           <Link href="https://airtable.com/app5IEtJhqo7tKWRf/shrb97BeZGsQAb6yV">
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300">
Apply Now
          </button>
          </Link>
        </section>
      </main>
    </>
  );
}
