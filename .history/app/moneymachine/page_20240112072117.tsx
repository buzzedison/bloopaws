// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
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
            <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/s/6SCzru9ZGUeB8XFL-qW1Uw2">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
                I’m Interested in the offer
              </button>
              </Link>
              <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/s/6SCzru9ZGUeB8XFL-qW1Uw2">
              <button className="bg-transparent hover:bg-red-600 text-black hover:text-white border border-red-600 font-bold py-3 px-6 rounded">
                Tell me more
              </button>
              </Link>
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
      We’re so confident in our services that we guarantee sales-ready clients. If we fall short, 
      you get another month free, no questions asked.
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
      Let us set the ball rolling with a free consultation. No pressure, just a chance to chat about your business goals and see how we can help you achieve them.
    </p>
    <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/s/6SCzru9ZGUeB8XFL-qW1Uw2">
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
      Schedule Your Free Consultation
    </button>
    </Link>
  </div>
</section>



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



{/* Call to Action - Claim Your Spot Section */}
<section className="py-12 px-4 text-center bg-red-100">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Act Fast to Secure Your Growth
    </h2>
    <p className="text-lg text-gray-600 mb-8">
      This is your golden ticket to 10X your business almost overnight. But you have to act fast, because at this low price we can only accept the first 5 qualified clients who respond.
    </p>
    <p className="text-lg text-gray-600 mb-8">
      Claim Your Business Growth Package Today before someone else takes your spot! This is your chance. Get your business growth started now!
    </p>
    <Link href="https://outlook.office365.com/owa/calendar/BloopGlobalMeetings@bloopglobal.com/bookings/s/6SCzru9ZGUeB8XFL-qW1Uw2">
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
      Schedule Consultation
    </button>
    </Link>
  </div>
  
</section>


        {/* Additional sections will go here */}

      </main>
    </>
  );
};

export default HomePage;
