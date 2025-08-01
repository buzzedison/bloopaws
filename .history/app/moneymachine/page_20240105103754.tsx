// pages/index.tsx
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Business Growth Services</title>
        <meta name="description" content="Turn Your Business Into A Money-Making Machine" />
      </Head>

      <main >
        {/* Hero Section */}
        <div className=" pt-24">
        <section className="bg-red-200 text-black text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold  mb-4">
              Turn Your Business Into A Money-Making Machine
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              10X Your Service Business in the First Quarter!
            </p>
            <p className="mb-2 text-lg">
              Imagine a high-converting website that attracts your ideal customers like a magnet. 
             
            </p>
            <p className="mb-6"> We have got you covered - from stunning design, compelling copywriting that triggers action, to technical development, engaging sales funnels,
               social media marketing, and advanced SEO optimization.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
                I’m Interested in the offer
              </button>
              <button className="bg-transparent hover:bg-red-600 text-black hover:text-white border border-red-600 font-bold py-3 px-6 rounded">
                Tell me more
              </button>
            </div>
          </div>
        </section>


        <section className="py-12 px-4 text-center bg-white">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Exclusive Benefits Within 60 Days
    </h2>
    <ul className="text-lg text-gray-600 mb-8">
      <li className="mb-4">A high-converting website that pulls in your ideal customers like a magnet.</li>
      <li className="mb-4">A flood of 50,000 targeted visitors to your new site.</li>
      <li className="mb-4">Your phone ringing off the hook with hot leads.</li>
      <li className="mb-4">A sales pipeline overflowing with your perfect customers.</li>
    </ul>
    <div className="bg-black p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-red-300 mb-4">Our Guarantee</h3>
      <p className="text-gray-800">
        We’re so confident in our services that we guarantee 10 paying clients. If we fall short, you get another month free, no questions asked.
      </p>
    </div>
  </div>
</section>
        </div>

        {/* Additional sections will go here */}

      </main>
    </>
  );
};

export default HomePage;
