import CallToAction from './components/CallToAction'

export default function Services() {
  return (
    <section id="services" className="py-20">
      <h2 className="text-3xl font-bold">Business Development, Funding, and Advisory Services</h2>

      <p className="mt-4 text-gray-600">
        We help you grow your business with the right strategies, funding sources, and partnerships. Our services include:
      </p>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-medium">Business Strategy and Planning</h3>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Market research and analysis to identify growth opportunities</li>
          <li>Development of strategic business plans and roadmaps</li>
          <li>Building financial models and projections</li>
          <li>Competitive analysis and positioning strategy</li>
          <li>Go-to-market and expansion strategy</li>
        </ul>

        <h3 className="text-xl font-medium">Fundraising and Investor Relations</h3>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Preparing pitch decks and investment memorandums</li>
          <li>Introductions to investors, VCs, and other funding sources</li>
          <li>Support on deal negotiation and closing</li>
          <li>Ongoing investor relations and reporting</li>
        </ul>

        <h3 className="text-xl font-medium">Partnerships and Channel Development</h3>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Identifying and vetting potential partners and channels</li>
          <li>Structuring and negotiating partnerships and channel deals</li>
          <li>Managing and optimizing partner relationships</li>
          <li>Developing joint go-to-market strategies</li>
        </ul>

        <h3 className="text-xl font-medium">Advisory Services</h3>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Mergers and acquisitions advisory</li>
          <li>Due diligence and valuation services</li>
          <li>Post-merger integration support</li>
          <li>Executive coaching and leadership development</li>
        </ul>
      </div>

      <p className="mt-4 text-gray-600">
        Our team has decades of experience supporting high-growth companies across industries. <a href="/services" className="text-blue-600 underline">Learn more about our services</a> or <a href="/contact" className="text-blue-600 underline">schedule a consultation</a> to discuss how we can help take your business to the next level.
      </p>

      <CallToAction>
        Ready to Grow? 
        Schedule a consultation today.
        <a href="/contact" className="btn btn-primary">Contact Us</a>
      </CallToAction>

    </section>
  )
}