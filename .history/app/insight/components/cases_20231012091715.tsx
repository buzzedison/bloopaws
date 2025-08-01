"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityDocument } from '@sanity/client';
import { client } from '../../../sanity/lib/client'; // Adjust this import based on your file structure
import { postsByCategoryQuery } from '../../../sanity/lib/queries'; // Import your query function

const builder = imageUrlBuilder(client);

interface CategoryProps {
  posts: SanityDocument[];
}

export default function CategoryProps({ posts: initialPosts }: CategoryProps) {
  const [posts, setPosts] = useState<SanityDocument[]>(initialPosts || []);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = postsByCategoryQuery('Case Studies');
      const fetchedPosts = await client.fetch(query);
      setPosts(fetchedPosts);
    };

    // If no initial posts are provided, fetch them
    if (!initialPosts || initialPosts.length === 0) {
      fetchPosts();
    }
  }, [initialPosts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div key={post._id} className="rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-[300px] w-full">
            {post.mainImage && (
              <Image
                src={builder.image(post.mainImage).url()}
                fill={true}
                objectFit="cover"
                alt={post?.mainImage?.alt || 'Post image'}
              />
            )}
          </div>
          <div className="p-6">
            <Link href={post.slug.current}>
              <a className="text-2xl font-bold hover:text-blue-600 transition duration-300">
                {post.title}
              </a>
            </Link>
            <p className="mt-2 text-gray-600">
              {post.excerpt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
