import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client";

const builder = imageUrlBuilder(client);

interface HeroPostProps {
  post: SanityDocument;
}

export default function HeroPost({ post }: HeroPostProps) {
  return (
    <div className="relative overflow-hidden bg-white shadow-lg rounded-lg">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          {post.mainImage ? (
            <Image
              src={builder.image(post.mainImage).width(800).height(600).url()}
              width={800}
              height={600}
              alt={post?.mainImage?.alt || post.title}
              className="w-full h-64 md:h-full object-cover"
            />
          ) : null}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-red-600 font-semibold mb-2">
            Featured Article
          </div>
          <Link prefetch={false} 
            href={`/insight/${post.slug.current}`}
            className="block mt-1 text-3xl md:text-4xl leading-tight font-serif font-bold text-gray-900 hover:underline transition duration-300 ease-in-out"
          >
            {post.title}
          </Link>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
          <Link prefetch={false} 
            href={`/insight/${post.slug.current}`}
            className="mt-6 inline-flex items-center text-lg font-semibold text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
          >
            Read Full Article
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}