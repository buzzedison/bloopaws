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
          <h1>{post.title}</h1>
          <div className="relative w-full h-96">
            <div className="absolute z-[-1] inset-0">
              {post.mainImage ? (
                <Image
                  src={builder.image(post.mainImage).width(300).height(300).url()}
         
                 width={500}
                 height={400}
                  alt={post?.mainImage?.alt}
                />
              ) : null}
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
