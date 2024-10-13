// MajorPostsGrid.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client";
import { ArrowRight } from "lucide-react";

const builder = imageUrlBuilder(client);

interface MajorPostsGridProps {
  posts: SanityDocument[];
}

export default function MajorPostsGrid({ posts }: MajorPostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-[250px] w-full">
            {post.mainImage && (
              <Image
                src={builder.image(post.mainImage).url()}
                fill={true}
                style={{ objectFit: "cover" }}
                alt={post?.mainImage?.alt || 'Post image'}
                className="transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
          <div className="p-6">
            <Link href={`/${post.slug.current}`} className="block">
              <h2 className="text-2xl font-bold text-gray-800 hover:text-red-600 transition duration-300 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center text-red-600 font-semibold group">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
