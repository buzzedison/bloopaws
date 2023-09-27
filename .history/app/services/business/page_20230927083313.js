import Image from 'next/image';
import CallToAction from './components/CallToAction'

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
      icon: '/images/StrategyIcon.svg',
    },
    {
      title: 'Fundraising and Investor Relations',
      items: [
        'Preparing pitch decks and investment memorandums',
        'Introductions to investors, VCs, and other funding sources',
        'Support on deal negotiation and closing',
        'Ongoing investor relations and reporting',
      ],
      icon: '/images/FundraisingIcon.svg',
    },
    {
      title: 'Partnerships and Channel Development',
      items: [
        'Identifying and vetting potential partners and channels',
        'Structuring and negotiating partnerships and channel deals',
        'Managing and optimizing partner relationships',
        'Developing joint go-to-market strategies',
      ],
      icon: '/images/PartnershipsIcon.svg',
    },
    {
      title: 'Advisory Services',
      items: [
        'Mergers and acquisitions advisory',
        'Due diligence and valuation services',
        'Post-merger integration support',
        'Executive coaching and leadership development',
      ],
      icon: '/images/AdvisoryIcon.svg',
    },
  ];

  return (
    <section id="services" className="container mx-auto p-10">
      <h2 className="text-4xl font-bold text-center pb-5 pt-24">Business Development, Funding, and Advisory Services</h2>

      <p className="text-lg text-gray-600 text-center pb-10">
        We help you grow your business with the right strategies, funding sources, and partnerships. Our services include:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        {services.map((service, i) => (
          <div key={i} className="flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105">
            <div className="flex justify-center py-6">
              <Image src={service.icon} alt={service.title} width={64} height={64} />
            </div>
            <h3 className="text-xl font-semibold text-center">{service.title}</h3>
            <ul className="list-disc list-inside text-gray-600 p-6">
              {service.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-lg text-gray-600 text-center pb-10">
        Our team has decades of experience supporting high-growth companies across industries. <a href="/services" className="text-blue-600 underline">Learn more about our services</a> or <a href="/contact" className="text-blue-600 underline">schedule a consultation</a> to discuss how we can help take your business to the next level.
      </p>

      <CallToAction>
        <div className="text-2xl pb-2">Ready to Grow?</div>
        <div className="text-lg pb-4">Schedule a consultation today.</div>
        <a href="/contact" className="btn btn-primary">Contact Us</a>
      </CallToAction>

    </section>
  )
}