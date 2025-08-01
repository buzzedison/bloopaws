import Image from "next/image";
import Link from "next/link";
import Slider from 'react-slick';

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

  export default async function HeroNew() {
    const blog = await getPost();

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
  
    // Render the blog posts
    return (
        <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="hero-slide">
            {post.featuredImage && post.featuredImage.node ? (
              <img src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText} />
            ) : null}
            <div className="hero-content">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`/blog/${post.uri}`}>Learn More</a>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
