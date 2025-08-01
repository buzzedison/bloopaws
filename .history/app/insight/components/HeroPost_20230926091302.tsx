// HeroPost.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../../sanity/lib/client"; // Adjust this import to your file structure

interface HeroPostProps {
  post: SanityDocument;
}

export default function HeroPost({ post }: HeroPostProps) {
  const { title, excerpt, slug, mainImage } = post;

  const builder = imageUrlBuilder({
    projectId: "your-project-id",
    dataset: "your-dataset",
  });
  const imageUrl = builder.image(mainImage);

  return (
    <header className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {mainImage && (
          <Image
            className="h-full w-full object-cover"
            src={imageUrl.toString()} // Convert imageUrl to string
            alt={mainImage?.alt}
          />
        )}
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 p-8">
        <h1 className="text-5xl font-bold text-white hover:text-red-300">
          <Link href={slug.current}>{title}</Link>
        </h1>
        <p className="mt-4 text-xl text-white max-w-2xl text-center">
          {excerpt}
        </p>
        <Link
          href={slug.current}
          className="mt-8 flex items-center text-xl text-white hover:text-red-300"
        >
          Read More
          <svg
            className="h-6 w-6 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}