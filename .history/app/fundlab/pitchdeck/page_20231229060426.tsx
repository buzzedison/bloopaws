// pages/index.tsx
import Head from 'next/head';


const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 font-sans">
      <Head>
        <title>Perfect Pitch Decks</title>
       
      </Head>

     

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-6">Perfect Pitch Decks</h1>
        <p className="text-2xl mb-8">One-on-One Coaching to Create Winning Presentations</p>
        <p className="mx-auto leading-relaxed max-w-xl mb-8">Craft a compelling pitch deck that hooks investors and gets funded. Work 1:1 with our expert coaches to build visually stunning decks that tell your startup's story.</p>
      </section>

      {/* Grid Section 1 */}
      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Pitch Deck Audits */}
          <div className="border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="font-bold text-2xl mb-4">Pitch Deck Audits</h2>
            <p>Get objective feedback on your existing deck from our presentation pros. We'll assess your content, story flow, visuals and help identify areas for improvement.</p>
          </div>
          {/* Pitch Deck Development */}
          <div className="border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="font-bold text-2xl mb-4">Pitch Deck Development</h2>
            <p>Don't start from scratch alone. Partner with our coaches to create an effective pitch deck tailored to your business goals and audience. We'll guide you each step.</p>
          </div>
        </div>
      </section>

      {/* Grid Section 2 */}
      <section className="py-16 bg-gray-100">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Slide Design Services */}
          <div className="border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="font-bold text-2xl mb-4">Slide Design Services</h2>
            <p>Make your deck visually memorable with professional graphic design help. Our team can create or enhance slides, infographics, charts, illustrations.</p>
          </div>
          {/* Presentation Coaching */}
          <div className="border p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="font-bold text-2xl mb-4">Presentation Coaching</h2>
            <p>Nail your pitching skills. Get custom guidance on delivery, body language and handling Q&A confidently. We'll ensure you connect with investors.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
        <p className="mb-8 mx-auto max-w-xl">Schedule a free 30-minute consultation to get started on your winning pitch deck today.</p>
        <button className="bg-white text-green-500 px-8 py-3 font-bold rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300">Schedule a Consultation</button>
      </section>
    </div>
  );
}

export default Home;
