// CardPosts.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client";  // Adjust this import based on your file structure

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
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-lg">
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
          </div>
        ))}
      </div>
    </div>
  );
}
