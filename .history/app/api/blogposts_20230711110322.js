// app/api/blogposts.js
const wordpressUrl = "https://bloopinsight.com/wp-json/wp/v2/posts";

export async function GET(request) {
  // Fetch the blog posts from WordPress
  const res = await fetch(wordpressUrl);
  // Check for errors
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  // Parse the JSON data
  const data = await res.json();
  // Return a response object with the data
  return new Response(data);
}
