"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function getPost() {
  // Move useRouter inside the component function
  const router = useRouter();
  // Use useEffect to wait for the router to be ready
  useEffect(async () => {
    // Check if the router is ready
    if (router.isReady) {
      // Get the slug from the query object
      const { slug } = router.query;

      // Fetch the data from WordPress using the slug
      const query = `
        query ($slug: String!) {
          postBy(uri: $slug) {
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
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
          variables: { slug }, // Pass the slug as a variable to the query
        }),
      });

      const jsonResponse = await response.json();
      const post = jsonResponse.data.postBy;

      // Render the page content using the post data
      return (
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          {post.featuredImage && post.featuredImage.node ? (
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || 'Featured image'}
              className="w-full h-48 object-cover mb-4 rounded"
              width={200}
              height={100}
            />
          ) : null}
          <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link href="/blog">Back to blog</Link>
        </div>
      );
    }
  }, [router.isReady, router.query]); // Use router.isReady as a dependency
}