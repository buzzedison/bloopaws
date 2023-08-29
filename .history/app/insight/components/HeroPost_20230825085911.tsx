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
  const imageUrl = post.mainImage
    ? builder.image(post.mainImage).width(1000).height(600).url()
    : null;

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="absolute inset-0"> {/* Image Container */}
        {imageUrl ? (
          <Image src={imageUrl} alt={post?.mainImage?.alt} width={1200} height={400} objectFit="cover" />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8 space-y-4"> {/* Overlay and Content */}
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
