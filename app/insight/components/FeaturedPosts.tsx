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

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative h-48">
            {post.mainImage ? (
              <Image
                src={builder.image(post.mainImage).width(400).height(250).url()}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <Link 
              href={`/insight/${post.slug.current}`}
              className="block text-xl font-serif font-bold text-gray-900 hover:text-red-700 transition-colors duration-300"
            >
              {post.title}
            </Link>
            <p className="mt-3 text-gray-700 line-clamp-3 text-sm">{post.excerpt}</p>
            <div className="mt-4 flex justify-between items-center">
              <Link 
                href={`/insight/${post.slug.current}`}
                className="text-red-700 hover:text-red-900 font-semibold text-sm transition-colors duration-300"
              >
                Read More
              </Link>
              <span className="text-gray-500 text-sm">5 min read</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}