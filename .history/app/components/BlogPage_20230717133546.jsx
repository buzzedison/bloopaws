import React from 'react'
import Link from "next/link"
import Image from "next/image"

async function getPost() {
  
    const query = `
      query {
        posts {
          nodes {
            categories {
              nodes {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            id
            title
            excerpt
            uri
          }
        }
      }
    `;
  
    try {
      const response = await fetch('https://bloopinsight.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        console.error('Error fetching data:', response.status, response.statusText);
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      console.log('Received data:', jsonResponse);
  
      if (!jsonResponse.data) {
        console.error('Error: Data object is undefined');
        throw new Error('Data object is undefined');
      }
  
      return jsonResponse.data.posts.nodes;
    } catch (error) {
      console.error('Error in getPost:', error);
      throw error;
    }
  }
  
export default async function BlogGrid () {
    const blog = await getPost();
  
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blog.slice(0, 3).map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-md p-0 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex flex-col"
                    >
                        {post.featuredImage && post.featuredImage.node ? (
                            <div className="w-full h-48 mb-4 rounded overflow-hidden">
                                <Image
                                    src={post.featuredImage.node.sourceUrl}
                                    alt={post.featuredImage.node.altText || "Featured image"}
                                    className="object-cover"
                                    width={950}
                                    height={550}
                                 
                                />
                            </div>
                        ) : null}
                        <div className="p-6 flex flex-col space-y-4">
                        <h2 className="text-xl font-semibold mb-4 flex-grow">{post.title}</h2>
                        <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.substring(0, 100) }}
                        />
                        <Link href={`/blog/${post.uri}`}>
                            <span className="text-blue-500 hover:text-blue-700 font-semibold inline-flex items-center">
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                        {post.categories.nodes.length > 0 ? (
                            <div className="text-gray-500 text-sm mb-2">
                                {post.categories.nodes.map((category) => category.name).join(", ")}
                            </div>
                          
                        ) : null}
                          </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
