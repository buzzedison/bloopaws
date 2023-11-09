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
      <section className="bg-blue-100">
      <div className="bg-blue-100">
        <div className="container mx-auto px-6 py-16">
          <div className="md:grid grid-cols-2 gap-10">
            {/* For Investors */}
          <div className="bg-white p-6 rounded shadow text-center mb-6 md:mb-0">
  <h3 className="text-2xl font-bold mb-4">For Investors</h3>
  <p className="text-gray-700 mb-4">
    If you're an investor looking to partner with us, here's what you can expect:
  </p>
  <ul className="text-left text-gray-700">
    <li className="mb-2">
      <span className="text-red-500 font-semibold">Investment Size:</span> Flexible
    </li>
    <li className="mb-2">
      <span className="text-red-500 font-semibold">Investment Structure:</span> Equity or convertible notes
    </li>
    <li className="mb-2">
      <span className="text-red-500 font-semibold">Terms:</span> Custom agreements to fit both parties
    </li>
  </ul>
  <p className="mt-6 text-gray-700">
    We believe in creating mutually beneficial partnerships and tailor agreements to ensure both parties' success.
  </p>
</div>

            {/* For Donors */}
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-2xl font-bold mb-4">For Donors</h3>
              {/* ... Donor details ... */}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Value-Added Services Section */}
      {/* ... Similar structure to the sections above ... */}

      {/* Financial Commitment Section */}
      {/* ... Similar structure to the sections above ... */}

      {/* Contact Section */}
      <section id="contact" className="bg-gray-800 text-white py-20">
        {/* ... Your contact section code here ... */}
      </section>

      {/* Footer Section */}
      {/* ... Your footer code here ... */}
    </>
  );
};

export default FundLab;
