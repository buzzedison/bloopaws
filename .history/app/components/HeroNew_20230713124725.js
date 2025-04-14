"use client"
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
SwiperCore.use([Navigation, Pagination, Autoplay]);

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

  export function PostsSlider() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      getPosts().then(setPosts);
    }, []);
  
    return (
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {posts.slice(0, 5).map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative h-[500px] md:h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${post.featuredImage.node.sourceUrl})` }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
              <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-white z-10">{post.title}</h2>
                <Link href={`/blog/${post.uri}`}>
                  <a className="text-xl text-white underline z-10">Learn More</a>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }