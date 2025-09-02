"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, Target, DollarSign, TrendingUp, ArrowRight, Mail } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface Article {
  _id: string;
  title: string;
  excerpt?: string;
  slug: { current: string };
  publishedAt?: string;
  categories?: Category[];
  mainImage?: {
    asset: { _id: string };
    alt: string;
  };
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

  // Select featured post (first of allPosts)
  const featured = allPosts[0];

  return (
    <main className="flex flex-col min-h-screen bg-white pt-8">
      {/* Featured lead article (Big Think-style) - now first */}
      <section id="featured" className="py-12 px-4 bg-white">

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Lead feature */}
          <div className="lg:col-span-2">
            {featured && (
              <motion.article
                className="group relative overflow-hidden rounded-3xl border border-pink-200/60 bg-white shadow-sm hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {featured.mainImage && (
                  <div className="relative h-56 md:h-72 w-full overflow-hidden">
                    <Image
                      src={builder.image(featured.mainImage).width(1200).height(675).url()}
                      alt={featured?.mainImage?.alt || featured.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 66vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10">
                  {featured.categories?.length ? (
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 text-xs px-3 py-1 mb-4">
                      {featured.categories[0].title}
                    </span>
                  ) : null}
                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                    <Link href={`/insight/${featured.slug.current}`} className="hover:text-red-600 transition-colors">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-700 mb-6">{featured.excerpt || 'Actionable insight from the trenches.'}</p>
                  <Link href={`/insight/${featured.slug.current}`} className="inline-flex items-center text-red-600 font-medium">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            )}
          </div>

          {/* Side rail: newsletter + trending */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl border border-pink-200/60 bg-white p-6">
              <h3 className="text-lg font-semibold mb-2">Subscribe to The Build Sheet</h3>
              <p className="text-sm text-neutral-600 mb-4">Weekly ideas, tools, and zero hype.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input className="flex-1 rounded-xl border border-pink-200 px-3 py-2" placeholder="you@company.com"/>
                <button className="rounded-xl bg-red-600 px-4 py-2 text-white">Subscribe</button>
              </form>
            </div>

            <div className="rounded-3xl border border-pink-200/60 bg-white p-6">
              <h3 className="text-lg font-semibold mb-3">Trending</h3>
              <ul className="space-y-3">
                {allPosts.slice(1,6).map((p) => (
                  <li key={p._id} className="flex items-start gap-3">
                    {p.mainImage ? (
                      <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={builder.image(p.mainImage).width(160).height(120).url()}
                          alt={p?.mainImage?.alt || p.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : null}
                    <Link href={`/insight/${p.slug.current}`} className="text-sm hover:text-red-600 leading-snug">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

            {/* Hero with integrated search - Big Think style */}
      <section className="relative bg-gradient-to-b from-white to-pink-50/60 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-black mb-8 leading-tight tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              Your Idea Is Worth More{" "}
              <span className="text-red-600">Than a Guess.</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-black max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              We've launched products, chased funding, and learned countless lessons the hard way. This is where we share everything. The strategies, the mistakes, the templates—all of it. No fluff, no gatekeeping. Just real-world advice from the trenches to help you build something that lasts.
            </motion.p>

            {/* Premium Big Think-style search area */}
          <motion.div
              className="max-w-6xl mx-auto mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              {/* Elegant search container with premium styling */}
              <div className="relative">
                {/* Sophisticated background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/40 via-white to-pink-50/40 rounded-3xl blur-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-red-50/30 to-pink-50/30 rounded-3xl"></div>

                {/* Main search card with luxury styling */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl border border-red-100/50 shadow-2xl shadow-red-100/30 p-12">
                  {/* Premium header */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                      <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Search & Discover</span>
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">Find the Perfect Insight</h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated collection of strategies, case studies, and actionable advice from seasoned builders</p>
                  </div>

                  {/* Elegant search input */}
                  <div className="relative mb-10">
                    <div className="relative group">
                      {/* Premium search icon */}
                      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 p-4 rounded-2xl shadow-lg shadow-red-200/50 group-hover:shadow-red-300/50 transition-all duration-300">
                          <Search className="w-7 h-7 text-white" />
          </div>
        </div>

              <input
                type="text"
                        placeholder="What challenge are you facing today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-24 pr-8 py-6 text-xl border-0 focus:ring-0 focus:outline-none placeholder-gray-400 bg-gradient-to-r from-white to-red-50/30 rounded-2xl hover:from-red-50/50 hover:to-pink-50/50 transition-all duration-300 shadow-inner border border-red-100/30 focus:border-red-200 focus:shadow-lg focus:shadow-red-100/50"
                      />

                      {/* Subtle focus ring effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>

                  {/* Premium popular searches */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="text-red-600 font-semibold text-sm px-4 py-2 rounded-full bg-red-50 border border-red-100">
                      Trending searches
            </div>

                    {[
                      { term: 'startup funding', color: 'from-red-500 to-red-600' },
                      { term: 'product strategy', color: 'from-red-500 to-red-600' },
                      { term: 'team building', color: 'from-red-500 to-red-600' },
                      { term: 'market validation', color: 'from-red-500 to-red-600' }
                    ].map(({ term, color }) => (
                <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="group relative px-6 py-3 rounded-full bg-white text-gray-700 hover:text-white transition-all duration-300 font-medium text-sm border border-red-100 hover:border-transparent hover:shadow-lg hover:shadow-red-200/50 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative">
                          {term}
                        </div>
                </button>
              ))}
                  </div>

                  {/* Elegant decorative elements */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-70 shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-70 shadow-lg"></div>
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-gradient-to-br from-red-300 to-pink-300 rounded-full opacity-50"></div>
                  <div className="absolute top-1/4 -left-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-red-300 rounded-full opacity-50"></div>
                </div>
            </div>
          </motion.div>

            {/* Search Results - HBR Style Professional Layout */}
            {searchQuery && (
              <motion.div
                className="max-w-7xl mx-auto mt-16 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* HBR-style header */}
                <div className="border-b border-gray-200 pb-8 mb-12">
                  <div className="flex items-center justify-between">
                    <div>
                                              <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>
                          Search Results
                        </h2>
                      <p className="text-gray-600 font-medium">
                        {filteredPosts.length === 0
                          ? `No articles found for "${searchQuery}"`
                          : `${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-500 hover:text-gray-700 font-medium text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>

                {filteredPosts.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main content area - HBR magazine style */}
                    <div className="lg:col-span-3">
                      <div className="space-y-8">
                  {filteredPosts.slice(0, 12).map((post, index) => (
                          <motion.article
                      key={post._id}
                            className="group border-b border-gray-100 pb-8 last:border-b-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className="flex gap-6">
                              {/* Article image - HBR style */}
                              {post.mainImage && (
                                <div className="flex-shrink-0">
                                  <div className="relative w-32 h-32 overflow-hidden rounded-md bg-gray-100">
                                    <Image
                                      src={builder.image(post.mainImage).width(160).height(160).url()}
                                      alt={post?.mainImage?.alt || post.title}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      sizes="128px"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Article content */}
                              <div className="flex-1 min-w-0">
                                {post.categories?.length ? (
                                  <div className="mb-3">
                                    <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-sm uppercase tracking-wide">
                            {post.categories[0].title}
                          </span>
                        </div>
                                ) : null}

                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors" style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>
                                  <Link href={`/insight/${post.slug.current}`}>
                        {post.title}
                                  </Link>
                      </h3>

                                <p className="text-gray-600 mb-4 leading-relaxed" style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}>
                                  {post.excerpt || 'Discover actionable insights and proven strategies from our experience.'}
                                </p>

                                <div className="flex items-center justify-between">
                                  <Link
                                    href={`/insight/${post.slug.current}`}
                                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors group"
                                  >
                                    Read Article
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>

                                  {post.publishedAt && (
                                    <time className="text-sm text-gray-500 font-medium">
                                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </time>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </div>

                    {/* HBR-style sidebar */}
                    <aside className="lg:col-span-1">
                      <div className="sticky top-8 space-y-8">
                        {/* Related searches - HBR style */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-4" style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>Related Searches</h4>
                          <div className="space-y-3">
                            {['product development', 'startup growth', 'market fit', 'customer acquisition'].map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => setSearchQuery(suggestion)}
                                className="w-full text-left p-3 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-gray-200"
                              >
                                <span className="text-sm font-medium text-gray-700">{suggestion}</span>
                              </button>
                  ))}
                </div>
                        </div>

                        {/* Search tips - HBR style */}
                        <div className="bg-white border border-gray-200 p-6 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-4" style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>Search Tips</h4>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                              Use specific keywords for better results
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                              Try synonyms if you don't find what you're looking for
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                              Browse categories for broader discovery
                            </li>
                          </ul>
                        </div>
                      </div>
                    </aside>
            </div>
          )}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-20">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-gray-400" />
        </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Georgia, "Times New Roman", Times, serif'}}>No Results Found</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      We couldn't find any articles matching "{searchQuery}".
                      Try refining your search terms or explore our categories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setSearchQuery("")}
                        className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
                      >
                        Browse All Articles
                      </button>
                      <button
                        onClick={() => setActiveFilter("All Posts")}
                        className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                      >
                        View Categories
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}


          </div>
        </div>
      </section>

      {/* Email CTA Section */}
      <EmailSignupSection />
    </main>
  );
}
