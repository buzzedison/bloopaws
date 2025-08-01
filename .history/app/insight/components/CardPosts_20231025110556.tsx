"use client"
// CardPosts.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface CardPostsProps {
  posts: SanityDocument[];
}

export default function CardPosts({ posts }: CardPostsProps) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
      <p className="mb-8">Explore the latest insights and trends.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[200px]">
              {post.mainImage && (
                <Image
                  src={builder.image(post.mainImage).url()}
                  layout="fill"
                  objectFit="cover"
                  alt={post?.mainImage?.alt || 'Post image'}
                />
              )}
            </div>
            <h3 className="mt-4 text-xl font-bold">
              <Link href={post.slug.current}>
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-gray-600">
              {post.excerpt}
            </p>
            <div className="mt-1">
              <Link href={post.slug.current}className="flex items-center text-blue-500 hover:text-blue-700 transition ease-in-out duration-300">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
