// ./nextjs-app/app/_components/Post.tsx

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/lib/client";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <main className="container mx-auto prose prose-lg p-4">
      {post ? (
        <>
          <div className="relative w-full h-96">
            <div className="absolute z-[-1] inset-0">
              {post.mainImage ? (
                <Image
                  src={builder.image(post.mainImage).width(300).height(300).url()}
                  layout="fill"
                  objectFit="cover"
                  alt={post?.mainImage?.alt}
                />
              ) : null}
            </div>
            <div className="relative flex items-center justify-center h-full">
              <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
                {post.title}
              </h1>
            </div>
          </div>
          {post.body ? <PortableText value={post.body} /> : null}
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </main>
  );
}
