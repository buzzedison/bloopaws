import Posts from "./insight/components/NewPost"
import { cachedClient } from "../sanity/lib/client";
import { postsQuery } from "../sanity/lib/queries";
import GoalsSection from "./components/Goals";
import Hero from "./components/Hero";
// import HomePage from "./components/HeroHead";
import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";
import BlogGrid from "./components/BlogPage";
// import ProductsSection from "./components/Products";
import NewsletterCTA from "./components/Cta"

export default async function Home() {
  const posts = await cachedClient(postsQuery);
  return (
    
   <>
    <Posts posts={posts} />
   <div>

   <Hero/>

    {/* <HomePage/> */}

  <Logo/>

<IdeaToCompanySection/>
<GoalsSection/>
{/* <ProductsSection/> */}

<BlogGrid/>
<NewsletterCTA/>
   </div>
   </>
  )
}
