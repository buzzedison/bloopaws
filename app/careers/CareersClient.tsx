"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Target, Rocket, Heart, Users, TrendingUp, ArrowRight, MapPin, Clock, Briefcase, Search, Filter } from "lucide-react";
import ModernCareerCard from "./components/ModernCareerCard";

interface Career {
  _id: string;
  title: string;
  slug: { current: string };
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
}

interface CareersClientProps {
  careers: Career[];
  careersByDepartment: Record<string, Career[]>;
}

export default function CareersClient({ careers, careersByDepartment }: CareersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Get unique departments and types for filters
  const departments = ["All", ...Object.keys(careersByDepartment)];
  const types = ["All", ...Array.from(new Set(careers.map(career => career.type)))];

  // Filter careers based on search and filters
  const filteredCareers = careers.filter(career => {
    const matchesSearch = 
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || career.department === selectedDepartment;
    const matchesType = selectedType === "All" || career.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-30 blur-lg"></div>
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
              Join the{" "}
              <span className="text-red-600">Crew</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-black max-w-4xl mx-auto mb-12 leading-relaxed" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              Ready to build something incredible? Join our team of builders, dreamers, and problem-solvers who turn big ideas into reality.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            >
              <Link prefetch={false} 
                href="#positions"
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 hover:-translate-y-1"
              >
                View Open Positions
              </Link>
              <Link prefetch={false} 
                href="/contact"
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-red-600 hover:bg-red-50 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture Values Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-pink-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-1 h-40 bg-gradient-to-b from-red-200 to-transparent transform rotate-45"></div>
          <div className="absolute bottom-10 right-1/4 w-1 h-40 bg-gradient-to-b from-pink-200 to-transparent transform -rotate-45"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              What Makes Us <span className="text-red-600">Different</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              We're not just building products—we're building the future. Here's what drives us every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Mission-Driven",
                description: "Every project has purpose. We're not just building features—we're solving real problems.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Move Fast",
                description: "Ideas become reality quickly here. No bureaucracy, no endless meetings—just building.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "People First",
                description: "Your growth matters. We invest in you because great people build great things.",
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Own Your Work",
                description: "Take ownership, make decisions, see your impact. You're not just a cog in the machine.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Learn & Grow",
                description: "Continuous learning isn't just encouraged—it's essential. Stay curious, stay growing.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Results Matter",
                description: "We measure success by impact, not hours. Deliver results that move the needle.",
                color: "from-orange-500 to-orange-600"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 p-8 hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-4 leading-tight">
                  {value.title}
                </h3>
                <p className="text-black leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Open <span className="text-red-600">Positions</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed mb-8">
              Find your next opportunity. We're always looking for exceptional people to join our mission.
            </p>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-pink-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/80 backdrop-blur-sm text-lg"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Department:</span>
                </div>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedDepartment === dept
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white/80 text-black border border-pink-200 hover:bg-red-50 hover:border-red-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                </div>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white/80 text-black border border-pink-200 hover:bg-red-50 hover:border-red-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              {(searchTerm || selectedDepartment !== "All" || selectedType !== "All") && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {filteredCareers.length === 0 
                      ? "No positions found matching your criteria" 
                      : `Showing ${filteredCareers.length} position${filteredCareers.length === 1 ? '' : 's'}`
                    }
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Career Cards */}
          <div className="space-y-6">
            {filteredCareers.length === 0 && !searchTerm && selectedDepartment === "All" && selectedType === "All" ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No open positions</h3>
                <p className="text-gray-500 mb-6">We're not hiring right now, but we're always interested in talking to exceptional people.</p>
                <Link prefetch={false} 
                  href="/contact"
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            ) : filteredCareers.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No positions found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("All");
                    setSelectedType("All");
                  }}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredCareers.map((career, index) => (
                <ModernCareerCard 
                  key={career._id} 
                  career={career} 
                  index={index}
                />
              ))
            )}
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
              Don't See Your Perfect Role?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              We're always looking for exceptional people. If you think you'd be a great fit for our team, we'd love to hear from you.
            </p>
            <Link prefetch={false} 
              href="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center"
            >
              Send Us Your CV
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
