
import { client } from "../../sanity/lib/client";
import { postsQuery, categoriesQuery } from "../../sanity/lib/queries";
import PlaybookClient from "./PlaybookClient";
export const metadata = {
  title: "Bloop Playbook: Insights, Strategies, and Templates | Bloop Global",
  description:
    "World-class insights for builders and teams. Explore strategies, mistakes, and templates for product, funding, and growth.",
  alternates: { canonical: "/freebies" },
  openGraph: {
    title: "Bloop Playbook: Insights, Strategies, and Templates | Bloop Global",
    description:
      "World-class insights for builders and teams. Explore strategies, mistakes, and templates for product, funding, and growth.",
    url: "https://bloopglobal.com/freebies",
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
    <PlaybookClient 
      cornerstoneArticles={cornerstoneArticles}
      latestPosts={latestPosts}
      allPosts={posts}
      categories={categories}
    />
  );
} 