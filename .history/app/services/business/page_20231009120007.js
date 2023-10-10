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
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center text-center bg-black overflow-hidden">
                <Image src="/images/hero-bg.jpg" layout="fill" objectFit="cover" alt="Business Development" className="absolute z-0" />
                <div className="relative z-10">
                    <h1 className="text-6xl font-extrabold text-white mb-4">Business Development, Funding, and Advisory Services</h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">We help ambitious companies scale and accelerate growth through tailored business strategy, funding advisory, and Leadership development.</p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
                    {services.map((service, i) => (
                        <div key={i} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105">
                            <div className="flex justify-center py-6 bg-gray-100">
                                <Image src={service.icon} alt={service.title} width={64} height={64} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-center mb-4">{service.title}</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    {service.items.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-lg text-gray-600 text-center pb-10">
                    Our team has decades of experience supporting high-growth companies across industries. 
                    <Link href="/services">
                        <a className="text-red-600 underline">Learn more about our services</a>
                    </Link> 
                    or 
                    <Link href="/contact">
                        <a className="text-red-600 underline">schedule a consultation</a>
                    </Link> 
                    to discuss how we can help take your business to the next level.
                </p>

                <CallToAction>
                    <div className="text-2xl pb-2">Ready to Grow?</div>
                    <div className="text-lg pb-4">Schedule a consultation today.</div>
                    <Link href="/contact"className="btn btn-primary bg-white text-red-500 px-3 py-2 rounded-lg hover:bg-black hover:text-white">Contact Us
                    </Link>
                </CallToAction>

            </section>
        </div>
    );
}
