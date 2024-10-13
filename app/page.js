// import Posts from "./insight/components/Posts";
import Link from "next/link"
import { cachedClient } from "../sanity/lib/client"
import { postsQuery } from "../sanity/lib/queries";
import HeroPost from "./insight/components/HeroPost"; 

import MajorPostsGrid from "./insight/components/MajorPostsGrid";
import GoalsSection from "./components/Goals";
// import Hero from "./components/Hero";
// import HomePage from "./components/HeroHead";
// import IdeaToCompanySection from "./components/Idea";
import Logo from "./components/LogoSection";

// import ProductsSection from "./components/Products";
// // import NewsletterCTAB from "./components/CtaNew"
// // import CourseCard from "./components/CourseCard"
// import CoursesIntro from "./courses/components/CourseIntro";
// import HeroSection from "./components/HeroDigital";
import HeroMain from "./components/HeroMain";
// import HeroOffer from "./components/HeroOffer"
import ProductShowcase from "./components/ProductShowcase";

export default async function Home() {

  const courses = [
    { title: 'AI for Business Growth', 
    subtitle: 'The Complete Guide to Transforming Your Business with Generative AI', 
    description: 'We will guide you step-by-step to transform how you innovate, operate, and make decisions using AI. You will learn hands-on with tools like GPT and DALL-E 2 and other amazing tools from real-world case studies.', 
    imageSrc: '/images/aibusiness.png',
    link:'/courses/aicourse'
  
  },
    { title: 'Investment Readiness Masterclass',
     subtitle: 'Walk you through what it takes to get the funding you need', 
     description: 'Looking for funding? This course will guide you through the process of securing the capital you need to start or grow your business. We will cover creating a solid business plan, identifying funding sources, perfecting your pitch, and navigating the legalities.', 
     imageSrc: '/images/fundingclass.png',
     link:'/courses/investment'
    },
    { title: 'Mental Models for Business Growth',
     subtitle: 'Learn how to make intelligent decisions', 
     description: 'Learn how to tap into mental models to enhance your decision making skills. In this course, you will discover how the brightest minds leverage mental models - conceptual frameworks that help understand the world and resolve problems - to make robust decisions under uncertainty. ', 
     imageSrc: '/images/mental.png',
     link:'/courses/mentalmodel' 
    },
  ];


  const posts = await cachedClient(postsQuery);
  const heroPost = posts[1];
  const majorPosts = posts.slice(0, 3); // Only taking two major posts

return (
  <>
<div className="flex flex-col items-center justify-center ">
  <HeroMain/>
  <ProductShowcase />
{/* <IdeaToCompanySection/> */}
<GoalsSection/>

<div className="w-full px-4 py-16 bg-gradient-to-b from-white to-red-100">
  <div className="container mx-auto">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
      Unlock Explosive Business Growth
    </span>
    <br />
    <span className="text-2xl md:text-3xl font-semibold text-gray-600">
      With Insight From Bloop
    </span>
  </h1>
  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
    <MajorPostsGrid posts={majorPosts} />
  </div>
  <div className="mt-8 text-center">
    <Link href="/insight">
    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
      Explore More Insights
    </button>
    </Link>
  </div>
  </div>
</div>
{/* <div className="bg-red-200 w-screen">
          <div className="container mx-auto p-4 mb-12">
          <CoursesIntro />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        </div>
        </div> */}
{/* <NewsletterCTAB/> */}
   </div>
   </>
  )
}
