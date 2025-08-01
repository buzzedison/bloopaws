"use client"
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useResizeObserver } from 'embla-carousel-react/hooks';

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
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });
  const [resizeObserver] = useResizeObserver();

  useEffect(() => {
    getPost().then(data => setBlog(data)).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (embla) {
      // do something with embla instance here if needed
    }
  }, [embla]);

  useEffect(() => {
    if (resizeObserver && embla) {
      resizeObserver.observe(viewportRef.current);
    }
  }, [resizeObserver, viewportRef, embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => {
      // do something when slide index changes here if needed
    };
    embla.on("select", onSelect);
    return () => embla.off("select", onSelect);
  }, [embla]);

  return (
    <div className="embla w-full h-96 overflow-hidden">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container flex h-full">
          {blog.map((post) => (
            <div key={post.id} className="embla__slide relative w-full h-full">
              {post.featuredImage?.node?.sourceUrl && (
                <img src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText} className="w-full h-full object-cover" />
              )}
              <div className="hero-content absolute bottom-0 left-0 right-0 p-5 bg-black bg-opacity-50 text-white">
                <h2 className="m-0 text-xl" dangerouslySetInnerHTML={{ __html: post.title }} />
                <a href={`/blog/${post.uri}`} className="inline-block mt-2 px-5 py-2 bg-white text-black no-underline">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => embla.scrollPrev()} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-white text-black">Prev</button>
      <button onClick={() => embla.scrollNext()} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-white text-black">Next</button>
    </div>
  );
}
