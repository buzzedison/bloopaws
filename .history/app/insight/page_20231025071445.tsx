// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

import HeroPost from "../insight/components/HeroPostInsight"; // Importing the HeroPost component

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];

  return (
    <>
      <div className="py-16 bg-gray-100"> {/* Updated Line */}
        <h1 className='text-center text-red-700 text-3xl md:text-5xl mb-12'>Insight</h1> {/* Updated Line */}
        <div className="container mx-auto"> {/* Updated Line */}
          <div className="grid grid-cols-5 gap-4 p-8 bg-white rounded-lg shadow-lg"> {/* Updated Line */}
            <div className="col-span-3">
              <HeroPost post={heroPost} />
            </div>
            <div className="col-span-2">
              <Posts posts={posts.slice(1)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
