import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";
import HeroPost from "../insight/components/HeroPostInsight";
import FeaturedPosts from "./components/FeaturedPosts";
import CardPosts from "./components/CardPosts";

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const remainingPosts = posts.slice(4);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-10 px-4 pt-12 md:pt-24 ">
          <h1 className="text-center text-5xl md:text-6xl font-bold text-gray-900 tracking-tight pt-6 md:pt-12">
            Insights
          </h1>
          <p className="text-center text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
       Leading research and ideas shaping the future of business, technology and management
          </p>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20 my-8">
          <HeroPost post={heroPost} />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            Featured Insights
          </h2>
          <FeaturedPosts posts={featuredPosts} />
        </section>

        {/* <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            More Insights
          </h2>
          <CardPosts posts={remainingPosts} />
        </section> */}
      </main>

   
    </div>
  );
}