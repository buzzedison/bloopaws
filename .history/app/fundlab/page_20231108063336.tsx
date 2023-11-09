// pages/fundlab.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import WhyPartnerWithUs from './components/WhyPartnerWithUs';
import FocusAreas from './components/FocusArea';
import InvestmentCriteria from './components/InvestmentCriteria';

const FundLab: NextPage = () => {
  return (
    <>
      <Head>
        <title>FundLab - Investment Arm of Bloop Global</title>
        <meta name="description" content="Elevating visionary startups with a focus on African-led ventures." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-red-900 text-white text-center py-20">
      <div className="bg-red-900 text-white text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl mb-8">
            FundLab is the investment arm of Bloop Global.<br/>  Elevating African startups
through investment, guidance, and resources.</p>
          <Link href="#contact"className="bg-red-300 hover:bg-red-400 text-black font-bold py-3 px-6 rounded">
              Connect With Us
            
          </Link>
        </div>
      </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="container mx-auto px-6 py-16">
      <WhyPartnerWithUs />
      </section>

      {/* Focus Areas Section */}
      <section className="bg-gray-100">
      <FocusAreas />
      </section>

      {/* Investment Criteria Section */}
      <section className="bg-red-100 px-6 py-16">
      <InvestmentCriteria/>
      </section>

      {/* Offerings Section */}
      <section className="bg-purple-100">
      <div className="bg-rose-200">
        <div className="container mx-auto px-6 py-16">
          <div className="md:grid grid-cols-2 gap-10">
            {/* For Investors */}
          <div className="bg-white p-6 rounded shadow text-center mb-6 md:mb-0">
  <h3 className="text-2xl font-bold mb-4">For Investors</h3>
  <div className="text-left text-gray-700">
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Investment Size:</span> Flexible
    </p>
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Investment Structure:</span> Equity or convertible notes
    </p>
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Terms:</span> Custom agreements to fit both parties
    </p>
  </div>
  <p className="mt-4 text-left text-gray-700 pr-0 md:pr-12">
    At FundLab, we value partnerships and strive to create customized agreements that ensure the success of both parties.
  </p>
</div>

            {/* For Donors */}
<div className="bg-white p-6 rounded shadow text-center">
  <h3 className="text-2xl font-bold mb-4">For Donors</h3>
  <div className="text-left text-gray-700">
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Transparent use of funds</span>
    </p>
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Regular updates on the impact of your donation</span>
    </p>
    <p className="mb-2">
      <span className="text-red-500 font-semibold">Tax-deductible options (subject to jurisdiction)</span>
    </p>
  </div>
  <p className="text-left mr-0 md:mr-12 mt-4 text-gray-700">
    Your donation has a direct and measurable impact. We provide transparency and updates, and in certain jurisdictions, your donation may be tax-deductible.
  </p>
</div>

          </div>
        </div>
      </div>
      </section>

      {/* Value-Added Services Section */}
<section className="bg-red-900">
  <div className="container mx-auto px-6 py-16">
    <div className="text-center">
      <h2 className="text-3xl text-white font-bold mb-6">Value-Added Services for Startups</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Join Fundesk Community */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-2xl font-bold mb-4">Join Fundesk Community</h3>
          <p className="text-gray-700 mb-4">
            Connect with investors and startups to get the latest info and network.
          </p>
          <a href="#fundesk-community" className="text-red-700 font-bold">
            Learn More
          </a>
        </div>
        {/* Pitch Deck Coaching */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-2xl font-bold mb-4">Pitch Deck Coaching</h3>
          <p className="text-gray-700 mb-4">
            Get professional coaching to create a winning pitch deck.
          </p>
          <a href="#pitch-deck-coaching" className="text-red-700 font-bold">
            Learn More
          </a>
        </div>
        {/* Pitch Perfect Event */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-2xl font-bold mb-4">Pitch Perfect Event</h3>
          <p className="text-gray-700 mb-4">
            Test your startup ideas and win $100 at our Pitch Perfect event.
          </p>
          <a href="#pitch-perfect" className="text-red-700 font-bold">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Financial Commitment Section */}
      {/* ... Similar structure to the sections above ... */}

{/* Contact Section */}
<section id="contact" className="bg-red-800 text-white py-20">
  <div className="container mx-auto">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
      <p className="text-lg mb-8">
        To discuss investment or donation opportunities, please fill out the form below:
      </p>
      <form className="mx-auto max-w-md">
        {/* Form fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-xl font-semibold">Your Name</label>
          <input type="text" id="name" name="name" className="w-full p-3 border border-gray-400 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl font-semibold">Email Address</label>
          <input type="email" id="email" name="email" className="w-full p-3 border border-gray-400 rounded" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-xl font-semibold">Message</label>
          <textarea id="message" name="message" rows={4} className="w-full p-3 border border-gray-400 rounded"></textarea>
        </div>
        {/* Submit button */}
        <div className="text-center">
          <button type="submit" className="px-6 py-3 bg-red-700 text-white font-semibold rounded hover:bg-red-800">Send Message</button>
        </div>
      </form>
    </div>
  </div>
</section>


      
    </>
  );
};

export default FundLab;
