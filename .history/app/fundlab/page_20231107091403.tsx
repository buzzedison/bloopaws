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
          <p className="text-xl mb-8">
            FundLab is the investment arm of Bloop Global, committed to elevating visionary startups with a special focus on empowering African-led ventures.
          </p>
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
        {/* ... Your focus areas code here ... */}
      </section>

      {/* Investment Criteria Section */}
      <section className="container mx-auto px-6 py-16">
        {/* ... Your investment criteria code here ... */}
      </section>

      {/* Offerings Section */}
      <section className="bg-blue-100">
        {/* ... Your offerings code here ... */}
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
