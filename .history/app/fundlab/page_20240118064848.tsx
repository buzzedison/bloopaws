// pages/fundlab.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import WhyPartnerWithUs from './components/WhyPartnerWithUs';
import FocusAreas from './components/FocusArea';
import InvestmentCriteria from './components/InvestmentCriteria';
import ContactForm from './components/Contact';
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
<div className="bg-white p-6 rounded-xl shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1">
  <h3 className="text-2xl font-bold mb-4 text-gray-800">For Investors</h3>
  <div className="text-left text-gray-600 space-y-2">
    <p>
      <span className="text-red-600 font-semibold">Investment Size:</span> Flexible
    </p>
    <p>
      <span className="text-red-600 font-semibold">Investment Structure:</span> Equity or convertible notes
    </p>
    <p>
      <span className="text-red-600 font-semibold">Terms:</span> Custom agreements to fit both parties
    </p>
  </div>
  <p className="mt-6 text-left text-gray-600">
    At FundLab, we value partnerships and strive to create customized agreements that ensure the success of both parties.
  </p>
</div>

{/* For Donors */}
<div className="bg-white p-6 rounded-xl shadow-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1">
  <h3 className="text-2xl font-bold mb-4 text-gray-800">For Donors</h3>
  <div className="text-left text-gray-600 space-y-2">
    <p>
      <span className="text-red-600 font-semibold">Transparent use of funds</span>
    </p>
    <p>
      <span className="text-red-600 font-semibold">Regular updates on the impact of your donation</span>
    </p>
    <p>
      <span className="text-red-600 font-semibold">Tax-deductible options (subject to jurisdiction)</span>
    </p>
  </div>
  <p className="mt-6 text-left text-gray-600">
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
          <Link href="https://discord.gg/5Ckd5M3Az5" className="text-red-700 font-bold">
          Join Discord Channel
          </Link>
        </div>
        {/* Pitch Deck Coaching */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-2xl font-bold mb-4">Pitch Deck Coaching</h3>
          <p className="text-gray-700 mb-4">
            Get professional coaching to create a winning pitch deck.
          </p>
          <Link href="/fundlab/pitchdeck" className="text-red-700 font-bold">
            Learn More
          </Link>
        </div>
        {/* Pitch Perfect Event */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="text-2xl font-bold mb-4">Pitch Perfect Event</h3>
          <p className="text-gray-700 mb-4">
            Test your startup ideas and win $200 at our Pitch Perfect event.
          </p>
          <Link href="/fundlab/pitchperfect" className="text-red-700 font-bold">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Financial Commitment Section */}
      {/* ... Similar structure to the sections above ... */}

{/* Contact Section */}
<section id="contact" className="bg-rose-200 text-white py-20">
 <ContactForm/>
</section>


      
    </>
  );
};

export default FundLab;
