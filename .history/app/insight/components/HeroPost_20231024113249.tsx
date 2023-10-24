// HeroPost.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client"; // Adjust this import to your file structure

const builder = imageUrlBuilder(client);

interface HeroPostProps {
  post: SanityDocument;
}

export default function HeroPost({ post }: HeroPostProps) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        {post.mainImage ? (
          <Image
            src={builder.image(post.mainImage).width(1200).height(650).url()}
          fill={true}
            style={{objectFit: "cover"}}
            alt={post?.mainImage?.alt}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8 space-y-8 transition-all ease-in-out duration-500 transform translate-y-4 hover:translate-y-0">
        <Link href={post.slug.current} className="text-3xl md:text-4xl font-bold text-white hover:text-red-300 transition ease-in-out duration-300 text-center">
          {post.title}
        </Link>
        <p className="text-xl text-white max-w-2xl text-center">
          {post.excerpt} {/* Displaying the excerpt */}
        </p>
        <Link href={post.slug.current} className="flex items-center text-xl text-white hover:text-red-300 transition ease-in-out duration-300">
          Read More 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
