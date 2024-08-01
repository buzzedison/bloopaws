// import Posts from "./insight/components/Posts";
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
import NewsletterCTAB from "./components/CtaNew"
import CourseCard from "./components/CourseCard"
import CoursesIntro from "./courses/components/CourseIntro";
// import HeroSection from "./components/HeroDigital";
import HeroOffer from "./components/HeroOffer"
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
  // return (
    
  //  <>
  //    <div className="flex flex-col items-center justify-center  bg-gray-50">
  //     <div className="w-full p-0 mx-auto bg-transparent rounded-lg shadow-lg">
       
  //       <div className="mt-0">
  //         <HeroPost post={heroPost} /> {/* Sending a single post object */}
  //         {/* <Posts posts={posts.slice(1)} /> */}
  //       </div>
  //     </div>

return (
  <>
<div className="flex flex-col items-center justify-center  bg-gray-50">
 <HeroOffer/>
  {/* <HeroSection/> */}
<IdeaToCompanySection/>

<GoalsSection/>
{/* <ProductsSection/> */}
<div className="container my-24">
  <h1 className="md: px-5 md:px-24 text-lg md:text-3xl font-bold text-gray-500 text-center justify-items-center my-10"> 
  Unlock Explosive Business Growth <br/> With Insight From Bloop </h1>
<MajorPostsGrid posts={majorPosts} /> {/* Displaying the two major posts */}
      {/* Skip the two major posts */}
          </div>
<div className="bg-red-200 w-screen">
          <div className="container mx-auto p-4 mb-12">
          <CoursesIntro />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        </div>
        </div>
<NewsletterCTAB/>
   </div>
   </>
  )
}
