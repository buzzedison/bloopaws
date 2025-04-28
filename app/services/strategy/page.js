'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LineChart, TrendingUp, Target, PieChart, Briefcase, Compass } from 'lucide-react';

export default function StrategyServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax and animation values
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const opacitySection1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const opacitySection3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  const strategyServices = [
    {
      icon: <Target size={32} className="text-amber-600" />,
      title: "Go-to-Market Strategy",
      description: "Develop a comprehensive plan to bring your product or service to market effectively and efficiently.",
      deliverables: [
        "Market analysis & segmentation",
        "Competitive positioning",
        "Channel strategy",
        "Launch roadmap & timeline"
      ]
    },
    {
      icon: <PieChart size={32} className="text-amber-600" />,
      title: "Pricing & Monetization",
      description: "Create optimal pricing models that maximize revenue while delivering customer value and supporting growth.",
      deliverables: [
        "Value-based pricing analysis",
        "Pricing structure optimization",
        "Revenue model development",
        "Competitive pricing strategy"
      ]
    },
    {
      icon: <Briefcase size={32} className="text-amber-600" />,
      title: "Investor Readiness",
      description: "Prepare your business for fundraising with compelling materials and a solid strategy to attract investors.",
      deliverables: [
        "Pitch deck development",
        "Financial model creation",
        "Investor targeting strategy",
        "Due diligence preparation"
      ]
    },
    {
      icon: <TrendingUp size={32} className="text-amber-600" />,
      title: "Growth Strategy",
      description: "Identify and prioritize growth opportunities to scale your business efficiently and sustainably.",
      deliverables: [
        "Growth opportunity assessment",
        "Customer acquisition strategy",
        "Retention & expansion planning",
        "Growth metrics framework"
      ]
    },
    {
      icon: <LineChart size={32} className="text-amber-600" />,
      title: "Business Model Innovation",
      description: "Reimagine your business model to create new value, reach new markets, or respond to changing conditions.",
      deliverables: [
        "Business model canvas",
        "Value proposition design",
        "Revenue stream diversification",
        "Implementation roadmap"
      ]
    },
    {
      icon: <Compass size={32} className="text-amber-600" />,
      title: "Strategic Advisory",
      description: "Ongoing guidance and support to navigate complex business challenges and capitalize on opportunities.",
      deliverables: [
        "Regular strategy sessions",
        "Decision-making frameworks",
        "Performance monitoring",
        "Strategic pivots & adjustments"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Animated Graph Elements */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-800 via-amber-700 to-orange-800">
        {/* Animated Graph/Chart Background */}
        <div className="absolute inset-0 opacity-20">
          {/* Horizontal grid lines */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`h-line-${i}`}
              className="absolute h-[1px] w-full bg-white opacity-30"
              style={{ top: `${i * 10 + 5}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
          
          {/* Vertical grid lines */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="absolute w-[1px] h-full bg-white opacity-30"
              style={{ left: `${i * 5 + 2.5}%` }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.05, ease: "easeOut" }}
            />
          ))}
          
          {/* Animated trend line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,80 Q20,70 30,60 T50,40 T70,30 T100,10"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Data points */}
          {[
            { x: 30, y: 60 },
            { x: 50, y: 40 },
            { x: 70, y: 30 },
          ].map((point, i) => (
            <motion.div
              key={`point-${i}`}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 2 + i * 0.2 }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Strategic Guidance for <br className="hidden md:block" />
              <span className="text-amber-300">Ambitious Growth</span>
            </h1>
            <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Data-driven strategies and expert advisory to help your business 
              navigate complexity, seize opportunities, and achieve sustainable growth.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/contact">
                <button className="bg-white text-amber-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-amber-100 transition-colors shadow-lg">
                  Start Your Strategic Journey
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <motion.section 
        className="py-24 px-6 bg-white"
        style={{ opacity: opacitySection1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Strategic Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive strategic solutions to address your most pressing business challenges.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {strategyServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                variants={itemVariants}
              >
                <div className="bg-amber-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">Key Deliverables:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Approach Section with Interactive Elements */}
      <motion.section 
        className="py-24 px-6 bg-amber-50"
        style={{ opacity: opacitySection2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Strategic Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that combines data-driven insights with strategic expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Approach steps */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Discover & Diagnose",
                  description: "We conduct a thorough analysis of your business, market, and competitive landscape to identify key challenges and opportunities.",
                  delay: 0.1
                },
                {
                  number: "02",
                  title: "Develop Strategic Options",
                  description: "Based on our analysis, we develop multiple strategic pathways and evaluate them against your business objectives and constraints.",
                  delay: 0.3
                },
                {
                  number: "03",
                  title: "Design Action Plan",
                  description: "We create a detailed implementation roadmap with clear milestones, resource requirements, and success metrics.",
                  delay: 0.5
                },
                {
                  number: "04",
                  title: "Deploy & Execute",
                  description: "We support you through implementation, providing guidance, tools, and frameworks to ensure successful execution.",
                  delay: 0.7
                },
                {
                  number: "05",
                  title: "Measure & Refine",
                  description: "We continuously monitor progress, measure results against key metrics, and refine the strategy as needed to optimize outcomes.",
                  delay: 0.9
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: step.delay, duration: 0.6 }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-amber-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Right side: Interactive visual */}
            <motion.div 
              className="relative h-[500px] bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 opacity-50"></div>
              
              {/* Strategic framework visualization */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {/* Central hub */}
                <motion.circle 
                  cx="200" cy="200" r="40" 
                  fill="#B45309" 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
                <motion.text 
                  x="200" y="200" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill="white"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  STRATEGY
                </motion.text>
                
                {/* Connecting lines and nodes */}
                {[
                  { angle: 0, label: "MARKET" },
                  { angle: 72, label: "PRODUCT" },
                  { angle: 144, label: "OPERATIONS" },
                  { angle: 216, label: "FINANCE" },
                  { angle: 288, label: "TALENT" }
                ].map((item, i) => {
                  const radians = (item.angle - 90) * Math.PI / 180;
                  const x1 = 200 + 40 * Math.cos(radians);
                  const y1 = 200 + 40 * Math.sin(radians);
                  const x2 = 200 + 120 * Math.cos(radians);
                  const y2 = 200 + 120 * Math.sin(radians);
                  
                  return (
                    <g key={i}>
                      <motion.line 
                        x1={x1} y1={y1} x2={x2} y2={y2} 
                        stroke="#D97706" 
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                      <motion.circle 
                        cx={x2} cy={y2} r="25" 
                        fill="#FDE68A"
                        stroke="#D97706"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                      />
                      <motion.text 
                        x={x2} y={y2} 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#92400E"
                        fontSize="10"
                        fontWeight="bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 + i * 0.1, duration: 0.3 }}
                      >
                        {item.label}
                      </motion.text>
                    </g>
                  );
                })}
              </svg>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
                <p className="text-amber-900 font-medium text-center">
                  Our holistic framework ensures all aspects of your business are strategically aligned.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Client Success Stories */}
      <motion.section 
        className="py-24 px-6 bg-white"
        style={{ opacity: opacitySection3 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from our strategic partnerships across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "SaaS Startup Growth Strategy",
                challenge: "A B2B SaaS startup needed to accelerate growth after initial product-market fit.",
                solution: "We developed a multi-channel acquisition strategy and optimized their pricing model.",
                result: "3.2x revenue growth within 12 months and successful Series A funding.",
                color: "bg-amber-700"
              },
              {
                title: "E-commerce Expansion Plan",
                challenge: "An established e-commerce brand wanted to enter new international markets.",
                solution: "We created a phased market entry strategy with localized positioning and partnerships.",
                result: "Successful expansion to 3 new markets with 40% lower CAC than projected.",
                color: "bg-amber-800"
              },
              {
                title: "Healthcare Innovation Strategy",
                challenge: "A healthcare provider needed to innovate their service delivery model.",
                solution: "We designed a digital transformation roadmap with clear prioritization framework.",
                result: "15% increase in patient satisfaction and 22% operational efficiency improvement.",
                color: "bg-amber-900"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={`${story.color} py-4 px-6`}>
                  <h3 className="text-xl font-bold text-white">{story.title}</h3>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Challenge:</h4>
                    <p className="text-gray-600">{story.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Solution:</h4>
                    <p className="text-gray-600">{story.solution}</p>
                  </div>
                  <div className="mt-auto pt-4 bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">Result:</h4>
                    <p className="text-amber-700">{story.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-800 to-amber-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Growth?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Let's discuss how our strategic advisory services can help you overcome challenges and capitalize on opportunities.
            </p>
            <Link href="/contact">
              <button className="bg-white text-amber-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-amber-100 transition-colors shadow-lg">
                Schedule a Strategy Session
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
