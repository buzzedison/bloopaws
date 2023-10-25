

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

import HeroPost from "../insight/components/HeroPostInsight"; // Importing the HeroPost component

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];

  return (
    <>
      <div className="py-16 bg-red-700"> {/* Updated Line */}
        <h1 className='text-center text-white text-3xl md:text-5xl mt-2 md:mt-24 mb-12'>Insight</h1> {/* Updated Line */}
        <div className="container mx-auto"> {/* Updated Line */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-8 bg-white rounded-lg shadow-lg"> {/* Updated Line */}
            <div className="col-span-1 md:col-span-3"> {/* Updated Line */}
              <HeroPost post={heroPost} />
            </div>
            <div className="col-span-1 md:col-span-2"> {/* Updated Line */}
              <Posts posts={posts.slice(1)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
