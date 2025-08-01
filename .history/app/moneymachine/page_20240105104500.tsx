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
    <div className="bg-black p-6 rounded-lg px-10 py-10">
      <h3 className="text-2xl font-semibold text-red-300 mb-4">Our Guarantee</h3>
      <p className="text-white text-lg">
        We are so confident in our services that we guarantee 10 paying clients. If we fall short, you get another month free, no questions asked.
      </p>
    </div>
  </div>
</section>




{/* Visitor Increase and Support Services Section */}
<section className="py-12 px-4 bg-gray-50 text-center">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Expect a Flood of 50,000 Targeted Visitors
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      Within 60 days, expect your new site to be flooded with 50,000 targeted visitors. Your phone won’t stop ringing with hot leads. We’ll even coach you on how to close the best deals. No recurring costs. You only need to set a budget for promotion, but don't pay us for it. You only pay us when you get paying customers.
    </p>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Comprehensive Marketing and Sales Support
    </h3>
    <ul className="text-lg text-gray-600">
      <li className="mb-4">Stunning design that makes a lasting impression.</li>
      <li className="mb-4">Compelling copywriting that triggers action. ✍️</li>
      <li className="mb-4">Technical development that ensures a seamless experience.</li>
      <li className="mb-4">Engaging sales funnels that convert visitors into customers.</li>
      <li className="mb-4">Social media marketing that amplifies your reach.</li>
      <li>Advanced SEO optimization that gets you found online.</li>
    </ul>
  </div>
</section>

        </div>

        
{/* Free Consultation Offer Section */}
<section className="py-12 px-4 text-center bg-black text-white">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Free Consultation to Kickstart Your Growth
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      Let’s set the ball rolling with a free consultation. No pressure, just a chance to chat about your business goals and see how we can help you achieve them.
    </p>
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
      Schedule Your Free Consultation
    </button>
  </div>
</section>

// Add this section after the Free Consultation Offer Section in your HomePage component

{/* Ultimate Business Growth Package Section */}
<section className="py-12 px-4 bg-gray-50 text-center">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Ultimate Business Growth Package
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      For a one-time setup fee, you get the ultimate business growth package that fills your sales pipeline with your perfect customers. No recurring costs. You only need to set a budget for promotion, but don’t pay us for it. You only pay us when you get paying customers.
    </p>
  </div>
</section>

        {/* Additional sections will go here */}

      </main>
    </>
  );
};

export default HomePage;
