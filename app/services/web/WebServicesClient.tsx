"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Layers, 
  Code, 
  Palette,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Star,
  Target,
  Rocket
} from "lucide-react";

export default function WebServicesClient() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Custom Websites",
      subtitle: "That Actually Work",
      problem: "Your website is your digital storefront. A slow, confusing, or ugly site turns visitors away before they even understand what you do.",
      approach: "We build websites that load fast, look great, and guide visitors toward taking action. Every pixel serves a purpose.",
      deliverables: [
        "Mobile-first responsive design",
        "Lightning-fast page speeds",
        "SEO optimization built-in",
        "Content management system",
        "Analytics integration",
        "Ongoing maintenance"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Applications",
      subtitle: "That Users Love",
      problem: "Most mobile apps feel clunky, drain batteries, or get deleted after one use. You need an app that people actually want to keep on their phone.",
      approach: "We build native iOS and Android apps that feel smooth, work offline, and solve real problems. From React Native to native development, we choose the right approach for your goals.",
      deliverables: [
        "iOS & Android development",
        "Native performance optimization",
        "Offline functionality",
        "Push notifications & deep linking",
        "App store optimization",
        "User onboarding & retention"
      ],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Stores",
      subtitle: "That Drive Sales",
      problem: "Most online stores look like everyone else's. Generic templates, confusing checkouts, and zero personality kill conversions.",
      approach: "We create custom e-commerce experiences that reflect your brand and make buying effortless. From browse to purchase in record time.",
      deliverables: [
        "Custom shopping experience",
        "Secure payment processing",
        "Inventory management system",
        "Order tracking & fulfillment",
        "Customer account portal",
        "Sales analytics dashboard"
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Web Applications",
      subtitle: "That Scale",
      problem: "Your business processes are stuck in spreadsheets and emails. You need a system that grows with you, not against you.",
      approach: "We build web apps that automate your workflows, organize your data, and give you the tools to scale without the chaos.",
      deliverables: [
        "Custom business logic",
        "User authentication & roles",
        "Database architecture",
        "API integrations",
        "Real-time updates",
        "Cloud hosting & scaling"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Progressive Web Apps",
      subtitle: "Best of Both Worlds",
      problem: "You want the reach of a website and the engagement of a mobile app, but building both is expensive and complicated.",
      approach: "PWAs give you native app features (offline access, push notifications, home screen install) with the simplicity of a website.",
      deliverables: [
        "App-like user experience",
        "Offline functionality",
        "Push notifications",
        "Home screen installation",
        "Native device features",
        "Cross-platform compatibility"
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We dig deep into your business, audience, and goals. No assumptions, just facts.",
      duration: "1-2 weeks"
    },
    {
      step: "02", 
      title: "Strategy & Design",
      description: "We map out the user journey and create designs that convert visitors into customers.",
      duration: "2-3 weeks"
    },
    {
      step: "03",
      title: "Development",
      description: "We build your site with clean code, fast performance, and bulletproof security.",
      duration: "4-8 weeks"
    },
    {
      step: "04",
      title: "Launch & Growth",
      description: "We launch, monitor, and optimize. Your success is our success.",
      duration: "Ongoing"
    }
  ];

  const techCategories = [
    {
      title: "Frontend",
      description: "Beautiful, fast user interfaces",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Backend",
      description: "Robust, scalable server architecture",
      icon: <Shield className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      technologies: ["Node.js", "Express", "Supabase", "PostgreSQL", "API Design"]
    },
    {
      title: "Tools & Platforms",
      description: "Modern development and deployment",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      technologies: ["Vercel", "AWS", "Stripe", "Analytics", "Performance Monitoring"]
    },
    {
      title: "Design & UX",
      description: "User-centered design approach",
      icon: <Palette className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      technologies: ["Figma", "User Research", "Prototyping", "A/B Testing", "Conversion Optimization"]
    }
  ];

  const portfolio = [
    {
      title: "CrowdPen",
      description: "From idea to 2000+ beta users",
      category: "SaaS Platform",
      image: "/images/crowdpenweb.png"
    },
    {
      title: "TaskWit",
      description: "All-in-one learning platform",
      category: "E-learning Platform",
      image: "/images/taskwit.png"
    },
    {
      title: "Special Gardens",
      description: "Premium landscaping showcase",
      category: "Business Website",
      image: "/images/special2.png"
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-30 blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-10 w-2 h-48 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12"></div>
          <div className="absolute top-1/3 right-10 w-2 h-32 bg-gradient-to-b from-pink-200 to-transparent transform rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[90vh]">
          <div className="text-center max-w-5xl">
            <motion.h1 
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-black mb-6 leading-tight tracking-tight" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              Websites That{" "}
              <span className="text-red-600">Actually Work</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-black max-w-4xl mx-auto mb-12 leading-relaxed" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              We build websites that look great, load fast, and turn visitors into customers. No fluff, no excuses—just results.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            >
              <Link prefetch={false} 
                href="#services"
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 hover:-translate-y-1"
              >
                See What We Build
              </Link>
              <Link prefetch={false} 
                href="/contact"
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-red-600 hover:bg-red-50 transition-all duration-300"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section id="services" className="py-24 px-4 bg-gradient-to-br from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              What We <span className="text-red-600">Build</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Every project is different, but our approach is the same: understand the problem, build the solution, deliver results.
            </p>
          </motion.div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-black border border-pink-200 hover:bg-red-50 hover:border-red-200'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <motion.div
            key={activeService}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-200/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left side - Content */}
              <div className="p-12">
                <div className={`w-16 h-16 bg-gradient-to-br ${services[activeService].color} rounded-2xl flex items-center justify-center mb-6`}>
                  <div className="text-white">
                    {services[activeService].icon}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-black mb-2">
                  {services[activeService].title}
                </h3>
                <p className="text-xl text-red-600 font-medium mb-6">
                  {services[activeService].subtitle}
                </p>

                {/* Problem */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-black mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    The Problem
                  </h4>
                  <p className="text-black leading-relaxed">
                    {services[activeService].problem}
                  </p>
                </div>

                {/* Approach */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-black mb-3 flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-red-600" />
                    Our Approach
                  </h4>
                  <p className="text-black leading-relaxed">
                    {services[activeService].approach}
                  </p>
                </div>
              </div>

              {/* Right side - Deliverables */}
              <div className={`${services[activeService].bgColor} p-12 flex flex-col justify-center`}>
                <h4 className="text-lg font-bold text-black mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-red-600" />
                  What You Get
                </h4>
                <div className="grid gap-4">
                  {services[activeService].deliverables.map((deliverable, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-white/80 rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-black font-medium">{deliverable}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              We've refined this process over 100+ projects. It works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200/50">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <div className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                    {step.duration}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-black leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Built With <span className="text-red-600">Modern Tech</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              We don't chase trends—we use proven technologies that deliver results. Fast, secure, and built to scale with your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 overflow-hidden hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1, ease: "easeOut" }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Technologies List */}
                <div className={`${category.bgColor} p-6`}>
                  <div className="space-y-3">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        className="flex items-center bg-white/80 rounded-lg p-3 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-br ${category.color} rounded-full mr-3 flex-shrink-0`}></div>
                        <span className="text-black font-medium text-sm">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Tech Stack Info */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 border border-pink-200/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">Lightning Fast</h4>
                  <p className="text-black text-sm">Sub-second load times with optimized performance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">Bank-Level Security</h4>
                  <p className="text-black text-sm">Enterprise-grade security and data protection</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">Built to Scale</h4>
                  <p className="text-black text-sm">Architecture that grows with your business</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Recent <span className="text-red-600">Projects</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Real projects, real results. Here's some of our recent work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 overflow-hidden hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-black">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-black mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors duration-300">
                    View Case Study
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something Great?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Let's turn your idea into a website that works. Fast loading, great looking, built to convert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} 
                href="/contact"
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link prefetch={false} 
                href="/casestudies"
                className="bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-red-600 transition-all duration-300"
              >
                See Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
