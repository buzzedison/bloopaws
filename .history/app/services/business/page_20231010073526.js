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
          {/* Hero Section remains the same */}
          
          {/* Services Section */}
          <section id="services" className="container mx-auto my-16 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <div key={i} className="flex flex-col bg-white border-2 border-gray-200 shadow-lg rounded-lg p-6 hover:border-indigo-500 transition-all duration-300 ease-in-out">
                  <Image src={service.icon} alt={service.title} width={64} height={64} className="self-center mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-gray-600 text-center my-10">
              Our team has decades of experience supporting high-growth companies across industries.
              <Link href="/services">
                <span className="cursor-pointer text-blue-600 hover:underline">Learn more about our services</span>
              </Link> 
              or 
              <Link href="/contact">
                <span className="cursor-pointer text-blue-600 hover:underline">schedule a consultation</span>
              </Link> 
              to discuss how we can help take your business to the next level.
            </p>
    
            <CallToAction>
              Ready to Grow? Schedule a consultation today.
            </CallToAction>
          </section>
        </div>
      );
    }