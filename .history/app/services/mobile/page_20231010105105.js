import Image from 'next/image';
import Link from 'next/link';

export default function MobileProdDevServices() {
  const services = [
    'iOS App Development',
    'Android App Development',
    'Cross-Platform App Development',
    'UI/UX Design',
    'Mobile App Testing',
    'Product Strategy',
    'Product Roadmapping',
    'MVP Development'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center bg-purple-900">
        {/* <Image src="/images/mobile-prod-hero.jpg" layout="fill" objectFit="cover" alt="Mobile and Product Development" className="absolute z-0" /> */}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white px-2 md:px-24">Mobile + Product Development</h1>
          <p className="mt-4 text-lg  max-w-2xl mx-auto text-white">We deliver exceptional mobile + product development solutions tailored to your unique needs.</p>
        </div>
      </section>

      {/* Services Subsection */}
      <section id="services" className="container mx-auto my-16 p-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Mobile + Product Development Services</h2>
        <ul className="text-gray-700 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <li key={i} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out hover:bg-purple-100">
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-900 text-white p-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Next Big Thing?</h2>
        <p className="text-lg mb-8">Let's turn your mobile and product ideas into reality.</p>
        <Link href="/contact">
          <button className="bg-white text-purple-900 px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-300">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}
