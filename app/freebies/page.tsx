
import { client } from "../../sanity/lib/client";
import { postsQuery, categoriesQuery } from "../../sanity/lib/queries";
import PlaybookClient from "./PlaybookClient";

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