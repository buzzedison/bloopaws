// pages/fundlab.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
          <p className="text-2xl mb-8">
            FundLab is the investment arm of Bloop Global.  Elevating African startups
through investment, guidance, and resources.</p>
          <Link href="#contact"className="bg-red-300 hover:bg-red-400 text-black font-bold py-3 px-6 rounded">
              Connect With Us
            
          </Link>
        </div>
      </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="container mx-auto px-6 py-16">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Why Partner With FundLab</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-800">
            <li>Backed by Bloop Global’s proven expertise and resources.</li>
            <li>Robust network of industry connections.</li>
            <li>Dedicated fund for venture investments.</li>
          </ul>
        </div>
      </div>
      </section>

      {/* Focus Areas Section */}
      <section className="bg-gray-100">
      <div className="bg-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Investment & Donation Focus Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ... Repeat for each focus area ... */}
              <div className="bg-white p-6 rounded shadow">
                <Image src="/icons/tech.svg" width={50} height={50} alt="Technology Startups" />
                <h3 className="font-bold mt-4">Technology Startups</h3>
                <p className="mt-2">Investing in cutting-edge technology ventures.</p>
              </div>
              {/* ... Other focus areas ... */}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Investment Criteria Section */}
      <section className="container mx-auto px-6 py-16">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Investment Criteria</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-800">
            {/* ... Criteria list ... */}
          </ul>
        </div>
      </div>
      </section>

      {/* Offerings Section */}
      <section className="bg-blue-100">
      <div className="bg-blue-100">
        <div className="container mx-auto px-6 py-16">
          <div className="md:grid grid-cols-2 gap-10">
            {/* For Investors */}
            <div className="bg-white p-6 rounded shadow text-center mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">For Investors</h3>
              {/* ... Investor details ... */}
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
