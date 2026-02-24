"use client";

import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { format } from "date-fns";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Share2,
  ChevronLeft,
  Clock,
  User,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const builder = imageUrlBuilder(client);

interface PostPageProps {
  post: SanityDocument;
}

const ShareBar = ({ url, title }: { url: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-[#1DA1F2]"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: "hover:text-[#0077b5]"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:text-[#4267B2]"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 items-center py-8 border-y border-zinc-100 lg:border-none lg:fixed lg:left-8 lg:top-1/2 lg:-translate-y-1/2 z-50">
      <span className="text-[10px] font-jakarta font-extrabold uppercase tracking-widest text-zinc-400 rotate-0 lg:-rotate-90 lg:mb-12">Share</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-zinc-400 ${link.color} transition-all duration-300 hover:scale-110`}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="text-zinc-400 hover:text-red-600 transition-all duration-300 hover:scale-110 relative"
        title="Copy Link"
      >
        {copied ? <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">Copied!</div> : null}
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Post({ post }: PostPageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen font-jakarta">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xl text-zinc-600 font-medium">Assembling analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen selection:bg-red-600 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
        }

        .prose h2, .prose h3, .prose h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #111827;
        }

        .prose p {
          color: #374151;
          line-height: 1.8;
        }

        .prose blockquote {
          border-left-color: #dc2626;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-style: italic;
          font-weight: 500;
          color: #111827;
        }
      `}</style>

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Back Button */}
      <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 lg:border-none">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/playbook"
            className="inline-flex items-center gap-2 text-xs font-jakarta font-extrabold uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Playbook
          </Link>
        </div>
      </div>

      <article className="relative">
        {/* Header Section */}
        <header className="pt-12 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {post.categories?.length ? (
                <div className="flex items-center gap-4 mb-8 font-jakarta">
                  <span className="text-red-600 font-extrabold text-xs uppercase tracking-[0.4em]">
                    {post.categories[0].title}
                  </span>
                  <div className="h-px w-12 bg-zinc-200" />
                </div>
              ) : null}

              <h1 className="text-5xl md:text-7xl font-jakarta font-extrabold text-black mb-10 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 py-8 border-t border-zinc-100">
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.image ? (
                      <Image
                        src={builder.image(post.author.image).width(48).height(48).url()}
                        width={48}
                        height={48}
                        alt={post.author.name}
                        className="rounded-full grayscale"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-zinc-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 mb-0.5">Author</p>
                      <p className="text-sm font-bold text-black">{post.author.name}</p>
                    </div>
                  </div>
                )}

                {post.publishedAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 mb-0.5">Published</p>
                      <time className="text-sm font-bold text-black" dateTime={post.publishedAt}>
                        {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                      </time>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 mb-0.5">Reading Time</p>
                    <p className="text-sm font-bold text-black">8 min read</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Hero Image */}
        {post.mainImage && (
          <motion.div
            className="px-6 mb-20"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="max-w-6xl mx-auto relative aspect-[21/9] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src={builder.image(post.mainImage).width(1600).height(685).url()}
                alt={post?.mainImage?.alt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
          {/* Share Bar Sidebar */}
          <div className="lg:col-span-1">
            <ShareBar url={currentUrl} title={post.title} />
          </div>

          {/* Article Body */}
          <div className="lg:col-span-8 lg:col-start-2">
            <div className="prose prose-xl prose-gray max-w-none">
              {post.body ? <PortableText value={post.body} /> : (
                <p className="text-xl text-zinc-400 italic">No content available for this analysis.</p>
              )}
            </div>

            {/* Author Bio Footer */}
            {post.author && post.author.bio && (
              <div className="mt-20 p-10 bg-zinc-50 rounded-3xl border border-zinc-100 font-jakarta">
                <div className="flex items-center gap-6 mb-6">
                  {post.author.image && (
                    <Image
                      src={builder.image(post.author.image).width(80).height(80).url()}
                      width={80}
                      height={80}
                      alt={post.author.name}
                      className="rounded-full grayscale"
                    />
                  )}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-600 mb-1">About the Author</p>
                    <h3 className="text-2xl font-extrabold text-black">{post.author.name}</h3>
                  </div>
                </div>
                <div className="prose prose-sm text-zinc-600 leading-relaxed font-jakarta">
                  <PortableText value={post.author.bio} />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Newsletter CTA */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32">
              <div className="p-8 border-t-4 border-red-600 bg-black text-white rounded-b-3xl">
                <h4 className="text-2xl font-jakarta italic font-bold mb-4">Master the Systems.</h4>
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">Join 12,000+ founders getting field-tested business frameworks every week.</p>
                <Link prefetch={false} href="#newsletter" className="inline-block w-full text-center py-4 bg-white text-black text-[10px] font-jakarta font-extrabold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                  Get the Build Sheet
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}