"use client"

import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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
        'Cache-Control': 'no-cache' 
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
  const { emblaRef, embla } = useEmblaCarousel({ loop: false });
  const [autoPlayInterval, setAutoPlayInterval] = useState(3000); // 3 seconds

  useEffect(() => {
    getPost().then(data => setBlog(data)).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (embla) {
      // do something with embla instance here if needed
    }
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    let timer = setInterval(() => embla.scrollNext(), autoPlayInterval);
    return () => clearInterval(timer);
  }, [embla, autoPlayInterval]);

  return (
    <div className="embla w-full h-96 overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {blog.map((post) => (
            <div key={post.id} className="embla__slide relative flex-shrink-0 flex-grow-0 min-w-full h-full">
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
      <button onClick={() => embla && embla.scrollPrev()} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-white text-black">Prev</button>
<button onClick={() => embla && embla.scrollNext()} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-white text-black">Next</button>


      <style jsx>{`
        .embla {
          width: 100%;
          height: 500px;
          overflow: hidden;
        }

        .embla__viewport {
          width: 100%;
          height: 100%;
        }

        .embla__container {
          display: flex;
          height: 100%;
        }

        .embla__slide {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .embla__slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
        }

        .hero-content h2 {
          margin: 0;
          font-size: 24px;
        }

        .hero-content a {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 20px;
          background: white;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
