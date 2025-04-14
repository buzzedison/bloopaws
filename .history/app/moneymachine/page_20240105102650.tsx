// pages/index.tsx
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Business Growth Services</title>
        <meta name="description" content="Turn Your Business Into A Money-Making Machine" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-red-300 text-white text-center py-20 px-4 mt-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Turn Your Business Into A Money-Making Machine
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              10X Your Service Business in the First Quarter!
            </p>
            <p className="mb-6">
              Imagine a high-converting website that attracts your ideal customers like a magnet. We’ve got you covered - from stunning design, compelling copywriting that triggers action, to technical development, engaging sales funnels, social media marketing, and advanced SEO optimization.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
                I’m Interested in the offer
              </button>
              <button className="bg-transparent hover:bg-red-600 text-white hover:text-white border border-red-600 font-bold py-3 px-6 rounded">
                Tell me more
              </button>
            </div>
          </div>
        </section>

        {/* Additional sections will go here */}

      </main>
    </>
  );
};

export default HomePage;
