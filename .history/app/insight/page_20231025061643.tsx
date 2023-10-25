// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

import HeroPost from "../insight/components/HeroPost"; // Importing the HeroPost component

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];

  return (
   // Inside your Home function

<div className="flex flex-col items-center justify-center bg-gray-100">
  <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-lg">
    <div className="mt-8 grid grid-cols-5 gap-4"> {/* Updated Line */}
      <div className="col-span-3 w-1/2">
        <HeroPost post={heroPost} /> 
      </div>
      <div className="col-span-2">
        <Posts posts={posts.slice(1)} />
      </div>
    </div>
  </div>
</div>

  );
}






