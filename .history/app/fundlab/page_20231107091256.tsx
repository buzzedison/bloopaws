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
      <section className="bg-blue-900 text-white text-center py-20">
      <div className="bg-blue-900 text-white text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl mb-8">
            FundLab is the investment arm of Bloop Global, committed to elevating visionary startups with a special focus on empowering African-led ventures.
          </p>
          <Link href="#contact"className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
              Connect With Us
            
          </Link>
        </div>
      </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="container mx-auto px-6 py-16">
        {/* ... Your partner section code here ... */}
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
