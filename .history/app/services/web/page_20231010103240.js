import Image from 'next/image';
import Link from 'next/link';

export default function WebDevServices() {
  const techStacks = ['WordPress','React', 'Node.js', 'NextJs', 'GraphQL', 'Svelte', 'MongoDB','PostGres', 'AWS', 'Docker'];
  
  const services = [
    'Frontend Development',
    'Website Design',
    'Backend Development',
    'Progressive Web Apps',
    'E-commerce Solutions',
    'Custom CMS Development',
    'API Integration and Development',
    'Website Maintenance and Support'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center bg-blue-400">
        <Image src="/images/web-dev-hero.jpg" layout="fill" objectFit="cover" alt="Web Development" className="absolute z-0" />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white px-2 md:px-24">Create a Stunning Online Presence<br /> with Your Website & Web Apps</h1>
        </div>
      </section>

      {/* Services Subsection */}
      <section id="services" className="container mx-auto my-16 p-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Web Development Services</h2>
        <ul className="text-gray-700 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <li key={i} className="p-6 bg-white rounded-lg shadow-md">
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Stack Showcase */}
      <section className="bg-gray-200 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Technology Stack</h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {techStacks.map((tech, i) => (
            <span key={i} className="bg-white p-2 rounded-full text-black shadow-md">
              {tech}
            </span>
          ))}
        </div>
      </section>

     {/* CTA Section */}
<section className="bg-blue-500 text-white p-16 text-center">
  <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
  <p className="text-lg mb-8">Contact us now and let's turn your dream project into reality.</p>
  <Link href="/contact">
    <button className="bg-white text-blue-500 px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-300">
      Get Started
    </button>
  </Link>
</section>
    </div>
  );
}
