
import { client } from "../../sanity/lib/client";
import { postsQuery, categoriesQuery } from "../../sanity/lib/queries";
import PlaybookClient from "./PlaybookClient";
export const metadata = {
  title: "Bloop Playbook: Insights, Strategies, and Templates | Bloop Global",
  description:
    "World-class insights for builders and teams. Explore strategies, mistakes, and templates for product, funding, and growth.",
  alternates: { canonical: "/playbook" },
  openGraph: {
    title: "Bloop Playbook: Insights, Strategies, and Templates | Bloop Global",
    description:
      "World-class insights for builders and teams. Explore strategies, mistakes, and templates for product, funding, and growth.",
    url: "https://bloopglobal.com/playbook",
    siteName: "Bloop Global",
    type: "website",
    images: [
      { url: "/images/partners.svg", width: 1200, height: 630, alt: "Bloop Playbook" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloop Playbook: Insights, Strategies, and Templates | Bloop Global",
    description:
      "World-class insights for builders and teams. Explore strategies, mistakes, and templates for product, funding, and growth.",
    images: ["/images/partners.svg"],
  },
};

export default async function PlaybookPage() {
  // Fetch blog posts and categories from Sanity
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery)
  ]);

  const cornerstoneArticles = posts.slice(0, 3); // First 3 as cornerstone
  const latestPosts = posts.slice(3, 9); // Next 6 as latest posts

  return (
    <>
    <section className="bg-[#f7f5f0] pt-32 pb-8 px-6"><div className="max-w-6xl mx-auto rounded-xl border border-stone-300 p-7 flex flex-wrap items-center justify-between gap-6"><div><p className="text-xs tracking-widest text-red-700 font-bold mb-2">FREE BUSINESS TOOL</p><h2 className="text-2xl font-bold text-stone-900">Your next quotation, ready to send.</h2><p className="text-stone-600 mt-2">Create a quote in GHS. Download a PDF. Share on WhatsApp.</p></div><a href="/quote-builder" className="rounded-lg bg-red-700 text-white px-6 py-3 font-semibold">Open Quote Builder →</a></div></section>
    <PlaybookClient
      cornerstoneArticles={cornerstoneArticles}
      latestPosts={latestPosts}
      allPosts={posts}
      categories={categories}
    />
    </>
  );
} 