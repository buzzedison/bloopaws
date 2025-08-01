"use client"

import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface Post {
  _id: string;
  mainImage: any;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
}

interface CategoryPostsProps {
  category: string;
  posts: Post[];
}

export default function CategoryPosts({ category, posts }: CategoryPostsProps) {
  if (category === "Featured Posts") return null;
  
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {category}
        </h2>
        <Link 
          href={`/insight/category/${category.toLowerCase().trim().replace(/\s+/g, '-')}`}
          className="text-red-700 hover:text-red-900 font-semibold text-sm transition-colors duration-300"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 group"
          >
            <div className="relative h-44">
              {post.mainImage ? (
                <Image
                  src={builder.image(post.mainImage).width(400).height(250).url()}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <Link 
                href={`/insight/${post.slug.current}`}
                className="block text-lg font-serif font-bold text-gray-900 hover:text-red-700 transition-colors duration-300 line-clamp-2 mb-2"
              >
                {post.title}
              </Link>
              <p className="text-gray-600 line-clamp-2 text-sm mb-4">{post.excerpt}</p>
              <Link 
                href={`/insight/${post.slug.current}`}
                className="inline-flex items-center text-red-700 hover:text-red-900 font-semibold text-sm transition-colors duration-300"
              >
                Read Article
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
