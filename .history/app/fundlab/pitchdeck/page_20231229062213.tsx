// pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Perfect Pitch Decks</title>
      </Head>

      <header className="bg-blue-500 text-white">
        <div className="max-w-3xl mx-auto p-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Perfect Pitch Decks</h1> 
          <p className="text-xl mb-6">One-on-One Coaching to Create Winning Presentations</p>
          <p className="mb-6">Craft a compelling pitch deck that hooks investors and gets funded. Work 1:1 with our expert coaches to build visually stunning decks that tell your startup's story.</p>
          
          <button className="bg-white text-blue-500 px-6 py-2 font-bold rounded">
            Schedule a Consultation
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border p-6">
              <h3 className="font-bold text-lg mb-3">Pitch Deck Audits</h3>
              <p>Get objective feedback on your existing deck from our presentation pros. We'll assess your content, story flow, visuals and help identify areas for improvement.</p>
            </div>
            
            <div className="border p-6">
              <h3 className="font-bold text-lg mb-3">Pitch Deck Development</h3>
              <p>Don't start from scratch alone. Partner with our coaches to create an effective pitch deck tailored to your business goals and audience. We'll guide you each step.</p> 
            </div>
            
            <div className="border p-6">
              <h3 className="font-bold text-lg mb-3">Slide Design Services</h3>
              <p>Make your deck visually memorable with professional graphic design help. Our team can create or enhance slides, infographics, charts, illustrations.</p>
            </div>
            
            <div className="border p-6">
              <h3 className="font-bold text-lg mb-3">Presentation Coaching</h3>
              <p>Nail your pitching skills. Get custom guidance on delivery, body language and handling Q&A confidently. We'll ensure you connect with investors.</p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
          <p className="mb-6">Schedule a free 30-minute consultation to get started on your winning pitch deck today.</p>
          
          <button className="bg-white text-blue-500 px-6 py-2 font-bold rounded">
            Schedule a Consultation  
          </button>
        </section>
      </main>
    </>
  )
}