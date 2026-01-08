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

// Email Signup Section Component - Redesigned for Editorial Feel
function EmailSignupSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Newsletter signup:", email);
      setEmail("");
      alert("Thanks for subscribing!");
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-[#0f0f0f] text-white relative overflow-hidden border-t-8 border-red-600">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-jakarta font-extrabold italic mb-6">
              The Build Sheet.
            </h2>
            <p className="text-lg opacity-70 leading-relaxed font-light">
              Strategic intelligence for founders, delivered every Friday. No fluff. Just the systems that work.
            </p>
          </div>
          <div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-0 border-b border-white/30 focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder="Professional Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent px-0 py-4 text-xl focus:outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="py-4 px-8 text-black bg-white hover:bg-red-600 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
                >
                  {loading ? '...' : "Subscribe"}
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">By subscribing you agree to our privacy policy.</p>
            </form>
          </div>
        </div>
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
    <main className="flex flex-col min-h-screen bg-white">
      {/* Inject Plus Jakarta Sans font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-32" />

      {/* HBR-Style Editorial Header */}
      <section className="bg-white pt-12 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-4 font-jakarta">
                  <span className="text-red-600 font-extrabold text-sm uppercase tracking-[0.3em]">Insights & Strategy</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h1 className="text-7xl md:text-8xl font-jakarta font-extrabold text-black mb-6 -ml-1">
                  The <span className="italic">Playbook</span>
                </h1>
                <p className="text-2xl text-zinc-600 font-light max-w-2xl leading-relaxed">
                  Rigorous analysis and field-tested systems for high-growth ventures.
                </p>
              </motion.div>
            </div>

            <div className="w-full md:w-96">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search the archive..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-gray-100 focus:border-black focus:outline-none transition-all text-lg font-light placeholder:text-gray-300 font-jakarta"
                />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 font-jakarta">
                {['funding', 'strategy', 'product'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-[10px] uppercase font-black tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                  >
                    #{term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section - Appears when searching */}
      {searchQuery && (
        <section className="bg-gray-50/50 py-20 px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Results header */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Results for <span className="text-red-600 italic">"{searchQuery}"</span>
                </h2>
                <p className="text-zinc-500 font-medium tracking-wide text-sm">
                  {filteredPosts.length === 0
                    ? `NO ARTICLES FOUND`
                    : `${filteredPosts.length} ARTICLE${filteredPosts.length === 1 ? '' : 's'} UNCOVERED`
                  }
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                Clear Search
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                  <span className="text-lg">×</span>
                </div>
              </button>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(0, 12).map((post, index) => (
                  <motion.article
                    key={post._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-red-100 transition-all duration-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {post.mainImage && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <Image
                          src={builder.image(post.mainImage).width(600).height(400).url()}
                          alt={post?.mainImage?.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      {post.categories?.length ? (
                        <span className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-600 mb-4">
                          {post.categories[0].title}
                        </span>
                      ) : null}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors leading-tight">
                        <Link href={`/insight/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-zinc-600 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt || 'Discover actionable insights and proven strategies.'}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Void Detected</h3>
                <p className="text-zinc-500 mb-10 max-w-sm mx-auto leading-relaxed">We haven't written that manual yet. Try another keyword or browse our latest works below.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  View All Manuals
                </button>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* Featured Content Section - Shows when not searching */}
      {!searchQuery && (
        <>
          {/* Editorial Featured Section */}
          <section id="featured" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Feature 1: Large Editorial Spread */}
              <div className="lg:col-span-8">
                {featured && (
                  <motion.article
                    className="group"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-8 font-jakarta">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-red-600">The Cover Story</span>
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>

                    <Link href={`/insight/${featured.slug.current}`} className="block relative overflow-hidden bg-gray-100 aspect-[16/9] mb-10">
                      {featured.mainImage && (
                        <Image
                          src={builder.image(featured.mainImage).width(1200).height(675).url()}
                          alt={featured?.mainImage?.alt || featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
                        />
                      )}
                    </Link>

                    <h2 className="text-5xl md:text-6xl font-jakarta font-extrabold leading-tight text-black mb-8 group-hover:text-red-700 transition-colors">
                      <Link href={`/insight/${featured.slug.current}`}>
                        {featured.title}
                      </Link>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="md:col-span-2 font-jakarta">
                        <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
                          {featured.excerpt || 'An in-depth analysis of field-tested systems for high-growth ventures.'}
                        </p>
                        <Link
                          href={`/insight/${featured.slug.current}`}
                          className="inline-flex items-center group/link text-xs font-extrabold uppercase tracking-[0.3em] text-gray-900 pb-1 border-b-2 border-red-600"
                        >
                          Read Full Investigation
                          <ArrowRight className="w-3 h-3 ml-4 group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                      <div className="border-l border-gray-100 pl-8 space-y-4 font-jakarta">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Inside the Play</p>
                        <ul className="text-sm font-bold text-black space-y-2">
                          <li>• Market Dynamics</li>
                          <li>• Execution Framework</li>
                          <li>• Strategic Pitfalls</li>
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                )}
              </div>

              {/* Sidebar: The List */}
              <aside className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="flex items-center gap-2 mb-10 font-jakarta">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-red-600">Critical Reading</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  <div className="space-y-12 font-jakarta">
                    {allPosts.slice(1, 6).map((p, index) => (
                      <article key={p._id} className="group flex gap-8 py-2 items-start border-b border-gray-50 pb-8 last:border-0">
                        <span className="text-4xl font-jakarta italic font-extrabold text-gray-100 group-hover:text-red-100 transition-colors leading-none">
                          0{index + 1}
                        </span>
                        <div>
                          {p.categories?.length ? (
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-600 mb-2 block">
                              {p.categories[0].title}
                            </span>
                          ) : null}
                          <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors">
                            <Link href={`/insight/${p.slug.current}`}>
                              {p.title}
                            </Link>
                          </h3>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* High quality mini CTA */}
                  <div className="mt-20 p-8 border-t-4 border-black bg-gray-50 rounded-b-xl font-jakarta">
                    <h4 className="text-xl font-jakarta italic font-bold mb-4 text-gray-900">The Founder's Brief</h4>
                    <p className="text-sm text-zinc-600 mb-6 font-light">Join 12,000+ executives getting our weekly strategic synthesis.</p>
                    <Link href="#newsletter" className="inline-block w-full text-center py-4 bg-black text-white text-[10px] font-extrabold uppercase tracking-widest hover:bg-red-600 transition-colors">
                      Join the Network
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* Editorial Repository Section */}
          <section className="py-32 px-4 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 border-b border-gray-200 pb-12 font-jakarta">
                <div className="mb-10 md:mb-0">
                  <h2 className="text-[11px] font-extrabold uppercase tracking-[0.5em] text-red-600 mb-6 font-jakarta">Archive Repository</h2>
                  <h3 className="text-4xl md:text-5xl font-jakarta font-extrabold text-black tracking-tight">The Collected Works</h3>
                </div>

                <div className="flex gap-x-8 gap-y-4 flex-wrap font-jakarta">
                  {filters.slice(0, 6).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`text-[10px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 ${activeFilter === filter
                        ? 'text-red-600 border-red-600'
                        : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-900'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 font-jakarta">
                {filteredPosts.slice(0, 12).map((post, idx) => (
                  <motion.article
                    key={post._id}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx % 3 * 0.1 }}
                  >
                    {post.mainImage && (
                      <Link href={`/insight/${post.slug.current}`} className="block relative aspect-[4/3] mb-8 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gray-100">
                        <Image
                          src={builder.image(post.mainImage).width(800).height(600).url()}
                          alt={post?.mainImage?.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </Link>
                    )}
                    <div className="space-y-4">
                      {post.categories?.length ? (
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-600">
                          {post.categories[0].title}
                        </span>
                      ) : null}
                      <h4 className="text-2xl font-jakarta font-extrabold text-black leading-tight group-hover:text-red-700 transition-colors">
                        <Link href={`/insight/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-zinc-500 font-light leading-relaxed line-clamp-2">
                        {post.excerpt || 'Research-backed strategy for scaling high-growth ventures.'}
                      </p>
                      <div className="pt-4 font-jakarta">
                        <Link
                          href={`/insight/${post.slug.current}`}
                          className="group/link flex items-center text-[10px] font-extrabold uppercase tracking-widest text-gray-900 group-hover:text-red-600 transition-colors"
                        >
                          Access Case Study
                          <div className="ml-4 w-6 h-px bg-gray-200 group-hover:bg-red-600 transition-all group-hover:w-10" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Email CTA Section - Only one at the bottom */}
      <EmailSignupSection />
    </main>
  );
}
