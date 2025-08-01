// pages/index.tsx in your Next.js app
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <Head>
        <title>Perfect Pitch Decks</title>
      </Head>

      {/* Hero Section */}
      <section className="text-center py-24">
        <h1 className="text-6xl font-extrabold mb-6">Perfect Pitch Decks</h1>
        <p className="text-2xl mb-8">One-on-One Coaching to Create Winning Presentations</p>
        <p className="max-w-2xl mx-auto mb-12">Craft a compelling pitch deck that hooks investors and gets funded. Work 1:1 with our expert coaches to build visually stunning decks that tell your startup's story.</p>
        <Link href="/consultation">
          <a className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300">Schedule a Consultation</a>
        </Link>
      </section>

      {/* Grid Section 1 */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Pitch Deck Audits */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="font-bold text-2xl mb-4">Pitch Deck Audits</h2>
            <p>Get objective feedback on your existing deck from our presentation pros. We'll assess your content, story flow, visuals and help identify areas for improvement.</p>
          </div>
          {/* Pitch Deck Development */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="font-bold text-2xl mb-4">Pitch Deck Development</h2>
            <p>Don't start from scratch alone. Partner with our coaches to create an effective pitch deck tailored to your business goals and audience. We'll guide you each step.</p>
          </div>
        </div>
      </section>

      {/* Grid Section 2 */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Slide Design Services */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="font-bold text-2xl mb-4">Slide Design Services</h2>
            <p>Make your deck visually memorable with professional graphic design help. Our team can create or enhance slides, infographics, charts, illustrations.</p>
          </div>
          {/* Presentation Coaching */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="font-bold text-2xl mb-4">Presentation Coaching</h2>
            <p>Nail your pitching skills. Get custom guidance on delivery, body language and handling Q&A confidently. We'll ensure you connect with investors.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-24 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
        <p className="mb-8">Schedule a free 30-minute consultation to get started on your winning pitch deck today.</p>
        <Link href="/consultation">
          <a className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition duration-300">Schedule a Consultation</a>
        </Link>
      </section>
    </div>
  );
}

export default Home;