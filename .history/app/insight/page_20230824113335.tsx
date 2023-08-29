// // ./nextjs-app/app/pages/index.tsx

// import Posts from "../insight/components/Posts";
// import { cachedClient } from "../../sanity/lib/client";
// import { postsQuery } from "../../sanity/lib/queries";

// export default async function Home() {
//   const posts = await cachedClient(postsQuery);

//   return <Posts posts={posts} />
// }  

// ./nextjs-app/app/_components/Hero.tsx

import React from "react";
import SlickSlider from "../insight/components/Slider";
import { SanityDocument } from "@sanity/client";

export default function Hero({ posts }: { posts: SanityDocument[] }) {
  return (
    <div className="container mx-auto prose prose-lg p-4">
      <h1 className="text-center text-4xl font-bold">Welcome to my blog</h1>
      <p className="text-center text-xl">Here are some of my latest posts</p>
      <SlickSlider posts={posts} />
    </div>
  );
}
