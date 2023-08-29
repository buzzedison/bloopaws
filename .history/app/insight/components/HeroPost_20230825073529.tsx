// HeroPost.tsx
import Link from "next/link";
import type { SanityDocument } from "@sanity/client";

interface HeroPostProps {
  post: SanityDocument;
}

export default function HeroPost({ post }: HeroPostProps) {
  const imageUrl = post.image?.url || ''; // Adjust this path based on your data structure

  return (
    <div className="relative h-[400px] overflow-hidden rounded-md">
      <img src={imageUrl} alt="" className="absolute h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8 space-y-4">
        <Link 
          href={post.slug.current} 
          className="text-4xl font-bold text-white hover:text-blue-300 transition ease-in-out duration-200 text-center"
        >
          {post.title}
        </Link>
        <Link 
          href={post.slug.current} 
          className="text-lg text-white underline hover:text-blue-300 transition ease-in-out duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
