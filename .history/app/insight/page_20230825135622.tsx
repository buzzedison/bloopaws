// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

import HeroPost from "../insight/components/HeroPost"; // Importing the HeroPost component

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-lg">
       
        <div className="mt-8">
          <HeroPost post={heroPost} /> {/* Sending a single post object */}
          <Posts posts={posts.slice(1)} />
        </div>
      </div>
    </div>
  );
}






