"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, Target, DollarSign, TrendingUp, ArrowRight, Mail } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  excerpt?: string;
  slug: { current: string };
  publishedAt?: string;
  categories?: Category[];
}

interface Category {
  _id: string;
  title: string;
}

interface PlaybookClientProps {
  cornerstoneArticles: Article[];
  latestPosts: Article[];
  allPosts: Article[];
  categories: Category[];
}

// Email Signup Section Component
function EmailSignupSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Handle newsletter signup
      console.log("Newsletter signup:", email);
      setEmail("");
      alert("Thanks for subscribing!");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("There was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <Mail className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get the Best Plays, <span className="text-pink-200">Weekly.</span>
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join "The Build Sheet." Every Friday morning, we send one actionable idea, one tool we're loving, and zero hype. It might just be the most valuable five-minute read in your inbox.
          </p>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-full text-black focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 disabled:opacity-70"
            >
              {loading ? '...' : "I'm In"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default function PlaybookClient({ 
  cornerstoneArticles, 
  latestPosts,
  allPosts,
  categories
}: PlaybookClientProps) {
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Create filter options from actual categories
  const filters = ["All Posts", ...categories.map(cat => cat.title)];

  // Filter posts based on search and category for the filtering section
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeFilter === "All Posts" || 
      (post.categories && post.categories.some(cat => cat.title === activeFilter));
    
    return matchesSearch && matchesCategory;
  });

  // Get the latest posts for the "Fresh From the Trenches" section (separate from filtering)
  const freshPosts = allPosts.slice(0, 12); // Latest 12 posts regardless of filters
  
  // Icon mapping for cornerstone articles
  const getArticleIcon = (index: number) => {
    const icons = [
      { icon: <Target className="w-8 h-8" />, color: "from-red-500 to-red-600" },
      { icon: <DollarSign className="w-8 h-8" />, color: "from-purple-500 to-purple-600" },
      { icon: <TrendingUp className="w-8 h-8" />, color: "from-pink-500 to-pink-600" }
    ];
    return icons[index % icons.length];
  };

  // Get category for post (you might want to add this to your Sanity schema)
  const getPostCategory = (index: number) => {
    const categories = ["Zero-to-One", "The Money Question", "Bits & Bytes", "Finding Your People", "Growing Pains"];
    return categories[index % categories.length];
  };

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
              Your Idea Is Worth More{" "}
              <span className="text-red-600">Than a Guess.</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-black max-w-4xl mx-auto mb-12 leading-relaxed" 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              We've launched products, chased funding, and learned countless lessons the hard way. This is where we share everything. The strategies, the mistakes, the templates—all of it. No fluff, no gatekeeping. Just real-world advice from the trenches to help you build something that lasts.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured "Start Here" Section */}
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
              New Here? <span className="text-red-600">Start With These.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cornerstoneArticles.map((article, index) => {
              const articleIcon = getArticleIcon(index);
              // Truncate title if too long
              const shortTitle = article.title.length > 60 
                ? article.title.substring(0, 60) + "..." 
                : article.title;
              // Create short excerpt (limit to ~100 chars)
              const shortExcerpt = article.excerpt 
                ? (article.excerpt.length > 100 ? article.excerpt.substring(0, 100) + "..." : article.excerpt)
                : "Discover actionable insights and proven strategies from our experience.";
              
              return (
                <motion.div
                  key={article._id}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 p-8 hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${articleIcon.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {articleIcon.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4 leading-tight">
                    {shortTitle}
                  </h3>
                  <p className="text-black leading-relaxed mb-6">
                    {shortExcerpt}
                  </p>
                  <Link href={`/insight/${article.slug.current}`} className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Hub / Filtering Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Find Your <span className="text-red-600">Play</span>
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed mb-8">
              Dive into our full library of insights. Use the filters to find exactly what you need for the challenge you're facing today.
            </p>
            
            {(searchQuery || activeFilter !== "All Posts") && (
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  {filteredPosts.length === 0 
                    ? "No posts found matching your criteria" 
                    : `Showing ${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'}`
                  }
                  {searchQuery && ` for "${searchQuery}"`}
                  {activeFilter !== "All Posts" && ` in ${activeFilter}`}
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search all insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-pink-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/80 backdrop-blur-sm text-lg"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white/80 text-black border border-pink-200 hover:bg-red-50 hover:border-red-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Display filtered results when there are active filters */}
          {(searchQuery || activeFilter !== "All Posts") && (
            <div className="mt-12">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or selecting a different category</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("All Posts");
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(0, 12).map((post, index) => (
                    <motion.div
                      key={post._id}
                      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 p-6 hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    >
                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                            {post.categories[0].title}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-black leading-relaxed mb-4">
                        {post.excerpt || "Discover actionable insights and proven strategies from our experience."}
                      </p>
                      <Link href={`/insight/${post.slug.current}`} className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors duration-300">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Email CTA Section */}
      <EmailSignupSection />

      {/* Latest Posts Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Fresh From the <span className="text-red-600">Trenches</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freshPosts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 p-6 hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                      {post.categories[0].title}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-black leading-relaxed mb-4">
                  {post.excerpt || "Discover actionable insights and proven strategies from our experience."}
                </p>
                <Link href={`/insight/${post.slug.current}`} className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors duration-300">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
