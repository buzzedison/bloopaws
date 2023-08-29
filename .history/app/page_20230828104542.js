import Posts from "./insight/components/Posts";
import { cachedClient } from "../sanity/lib/client"
import { postsQuery } from "../sanity/lib/queries";
import HeroPost from "./insight/components/HeroPost"; 

import MajorPostsGrid from "./insight/components/MajorPostsGrid";
import GoalsSection from "./components/Goals";
// import Hero from "./components/Hero";
// import HomePage from "./components/HeroHead";
import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";

// import ProductsSection from "./components/Products";
import NewsletterCTA from "./components/Cta"

export default async function Home() {

  const posts = await cachedClient(postsQuery);
  const heroPost = posts[0];
  const majorPosts = posts.slice(0, 2); // Only taking two major posts
  return (
    
   <>
     <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="w-full p-8 mx-auto bg-transparent rounded-lg shadow-lg">
       
        <div className="mt-8">
          <HeroPost post={heroPost} /> {/* Sending a single post object */}
          {/* <Posts posts={posts.slice(1)} /> */}
        </div>
      </div>


    {/* <HomePage/> */}

  {/* <Logo/> */}

<IdeaToCompanySection/>
<GoalsSection/>
{/* <ProductsSection/> */}
<div className="container my-24">
  <h1 className="text-2xl"> Insight </h1>
<MajorPostsGrid posts={majorPosts} /> {/* Displaying the two major posts */}
      {/* Skip the two major posts */}
          </div>
<NewsletterCTA/>
   </div>
   </>
  )
}
