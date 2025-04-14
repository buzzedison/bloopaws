import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function getPosts() {
  // Move useRouter inside the component function
  const router = useRouter();
  // Use useEffect to wait for the router to be ready
  useEffect(async () => {
    // Check if the router is ready
    if (router.isReady) {
      // Get the slug from the query object
      const { category } = router.query;

      // Fetch the data from WordPress using the category
      const query = `
        query ($category: String!) {
          postsByCategory(category: $category) {
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories{
                nodes{
                  id
                  link
                  
                }
              }"
        
          }
        }
      `;

      const response = await fetch('https://bloopinsight.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { category }, // Pass the category as a variable to the query
        }),
      });

      const jsonResponse = await response.json();
      const posts = jsonResponse.data.postsByCategory;

      // Create a slider of posts
      const sliderItems = posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <Link href={`/blog/${post.slug}`}>Learn More</Link>
        </div>
      ));

      // Render the slider
      return (
        <div className="container mx-auto px-4">
          <h1>Posts in the "use client" category</h1>
          <div className="flex flex-wrap justify-content-center">
            {sliderItems}
          </div>
        </div>
      );
    }
  }, [router.isReady, router.query]); // Use router.isReady as a dependency
}
