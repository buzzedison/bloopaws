"use client"

import { useState, useEffect, useRef } from 'react';
import { useEmblaCarousel } from 'embla-carousel-react';
import Image from "next/image";

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

export default function HeroNew() {
  const [blog, setBlog] = useState([]);
  const { embla, containerRef } = useEmblaCarousel({ loop: false });

  useEffect(() => {
    getPost().then(data => setBlog(data)).catch(error => console.error(error));
  }, []);

  return (
    <div className="embla" ref={containerRef}>
      <div className="embla__container">
        {blog.map((post) => (
          <div key={post.id} className="embla__slide">
            {post.featuredImage?.node?.sourceUrl && (
              <img src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText} />
            )}
            <div className="hero-content">
              <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <a href={`/blog/${post.uri}`}>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}