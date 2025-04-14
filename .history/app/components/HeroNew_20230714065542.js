"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from 'react-slick';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    getPost().then(data => setBlog(data)).catch(error => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {blog.map((post) => (
        <div key={post.id} className="hero-slide h-5">
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
    </Slider>
  );
}