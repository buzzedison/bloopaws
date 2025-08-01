import Image from 'next/image';
import CallToAction from './components/CallToAction';
import Link from 'next/link';

export default function Services() {
    const services = [
        {
            title: 'Business Strategy and Planning',
            items: [
                'Market research and analysis to identify growth opportunities',
                'Development of strategic business plans and roadmaps',
                'Building financial models and projections',
                'Competitive analysis and positioning strategy',
                'Go-to-market and expansion strategy',
            ],
            icon: '/images/strategy.svg',
        },
        {
            title: 'Fundraising and Investor Relations',
            items: [
                'Preparing pitch decks and investment memorandums',
                'Introductions to investors, VCs, and other funding sources',
                'Support on deal negotiation and closing',
                'Ongoing investor relations and reporting',
            ],
            icon: '/images/fundraising.svg',
        },
        {
            title: 'Partnerships and Channel Development',
            items: [
                'Identifying and vetting potential partners and channels',
                'Structuring and negotiating partnerships and channel deals',
                'Managing and optimizing partner relationships',
                'Developing joint go-to-market strategies',
            ],
            icon: '/images/partners.svg',
        },
        {
            title: 'Training & Advisory Services',
            items: [
                'Employee onboarding and training',
                'Due diligence and valuation services',
                'Curriculum review and development',
                'Executive coaching and leadership development',
            ],
            icon: '/images/advice.svg',
        },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="relative h-[600px] flex items-center justify-center text-center bg-red-400">
              <Image src="/images/hero-bg.jpg" layout="fill" objectFit="cover" alt="Business Development" className="absolute z-0" />
              <div className="relative z-10">
                  <h1 className="text-5xl font-extrabold text-white px-2 md:px-24">Business Development, Funding,<br /> and Advisory Services</h1>
                  <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">We help ambitious companies scale and accelerate growth through tailored business strategy, funding advisory, and Leadership development.</p>
              </div>
          </section>

           {/* Services Section */}
      <section id="services" className="container mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          {services.map((service, i) => (
            <div key={i} className="flex flex-col bg-red-50 shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center py-6">
                <Image src={service.icon} alt={service.title} width={64} height={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-center mb-4">{service.title}</h3>
                <ul className="text-gray-600 px-10 text-left">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-gray-600 text-center pb-10">
          Our team has decades of experience supporting high-growth companies across industries. 
          <Link href="/services">
            <button className="text-red-600 underline">Learn more about our services</button>
          </Link> 
          or 
          <Link href="/contact">
            <button className="text-red-600 underline">schedule a consultation</button>
          </Link> 
          to discuss how we can help take your business to the next level.
        </p>
      </section>

          <CallToAction>
          Ready to Grow? Schedule a consultation today.
        </CallToAction>
      </div>
  );
}