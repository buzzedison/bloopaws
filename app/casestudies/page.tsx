// import React from 'react'
// import CategoryPostsGrid from '../components/Case'
// import { cachedClient } from "../../sanity/lib/client"

// import { postsByCategoryQuery } from "../../sanity/lib/queries";



// export default async function page() {
//   const categoryTitle = 'Case Studies';
//   const categoryQuery = postsByCategoryQuery('9687cd11-5441-4a21-ac04-2054101d2872');

//   const posts = await cachedClient(categoryQuery);
  
//   console.log(posts);

//   return (
//     <div>

// <CategoryPostsGrid posts={posts} category={categoryTitle} />
//     </div>
//   )
// }

import CaseStudies from "./components/Hero"
import FeaturedContent from "./components/FeaturedContent"

import Image from "next/image";
import Link from "next/link";
import { cachedClient } from "../../sanity/lib/client";
import { caseStudiesQuery } from "../../sanity/lib/caseStudyQueries";
import { urlForImage } from "../../sanity/lib/image";

// Define TypeScript interfaces for our data structures
interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface CaseStudy {
  _id?: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  result?: string;
  description?: string;
  mainImage?: SanityImage;
  fallbackImage?: string;
  tags?: string[];
  excerpt?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default async function CaseStudiesPage() {
  const caseStudies = await cachedClient(caseStudiesQuery);
  
  // If no case studies, use fallback data
  const hasCaseStudies = caseStudies && caseStudies.length > 0;
  
  // Featured case study (first one or fallback)
  const featuredCaseStudy = hasCaseStudies ? caseStudies[0] : {
    title: "Special Homes",
    subtitle: "Real Estate Website",
    result: "300% increase in leads",
    slug: { current: "specialgardens" },
    fallbackImage: "/images/specialhomes.png"
  };
  
  // Extract unique tags from case studies to use as categories
  const allTags = hasCaseStudies 
    ? Array.from(new Set(caseStudies.flatMap((study: CaseStudy) => study.tags || [])))
    : [];

  // Explicitly cast allTags to string[]
  const allTagsString: string[] = allTags as string[];
    
  // Map tags to category objects with icons
  const categoryIcons: {[key: string]: string} = {
    "web": "🌐",
    "mobile": "📱",
    "branding": "✨",
    "marketing": "📈",
    "ecommerce": "🛒",
    "design": "🎨",
    "strategy": "🧠",
    "development": "💻"
  };
  
  const categories: Category[] = allTagsString.map((tag: string) => ({
    id: tag.toLowerCase().replace(/\s+/g, '-'),
    name: tag,
    icon: categoryIcons[tag.toLowerCase()] || "🔍"
  }));
  
  // If no categories found, use fallback categories
  if (categories.length === 0) {
    categories.push(
      { id: "web", name: "Web Development", icon: "🌐" },
      { id: "mobile", name: "Mobile Apps", icon: "📱" },
      { id: "branding", name: "Branding", icon: "✨" },
      { id: "marketing", name: "Digital Marketing", icon: "📈" }
    );
  }
  
  // Helper function to get image URL safely
  const getImageUrl = (caseStudy: CaseStudy): string => {
    // Check if it has a valid Sanity image
    if (caseStudy.mainImage && 
        caseStudy.mainImage._type === 'image' && 
        caseStudy.mainImage.asset && 
        caseStudy.mainImage.asset._ref && 
        caseStudy.mainImage.asset._ref.startsWith('image-')) {
      try {
        return urlForImage(caseStudy.mainImage).width(800).height(600).url();
      } catch (error) {
        console.error('Error generating image URL:', error);
        // Fall back to fallbackImage or placeholder if urlForImage fails
      }
    }
    
    // Return fallback image or default placeholder
    return caseStudy.fallbackImage || '/images/placeholder.svg';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[70vh] overflow-hidden flex items-center">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/casestudies-hero.jpg" 
            alt="Case Studies Hero" 
            fill 
            priority
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Success Stories</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">Discover how we've helped businesses transform their digital presence and achieve measurable results.</p>
            <Link 
              href="#featured" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <Image 
                  src={getImageUrl(featuredCaseStudy)}
                  alt={featuredCaseStudy.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium uppercase tracking-wider mb-1">{featuredCaseStudy.subtitle}</p>
                    <h3 className="text-2xl font-bold">{featuredCaseStudy.title}</h3>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured Project</h2>
              <div className="bg-red-600 h-1 w-20 mb-8"></div>
              
              <h3 className="text-3xl font-bold mb-4 text-gray-800">{featuredCaseStudy.title}</h3>
              <p className="text-xl text-gray-600 mb-6">{featuredCaseStudy.subtitle}</p>
              
              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <p className="text-2xl font-bold text-red-600">{featuredCaseStudy.result}</p>
                <p className="text-gray-600">Measurable Impact</p>
              </div>
              
              <p className="text-gray-700 mb-8">
                {featuredCaseStudy.description || "We partnered with this client to transform their digital presence and deliver exceptional results. Through strategic planning and innovative solutions, we helped them achieve significant growth and ROI."}
              </p>
              
              <Link 
                href={`/casestudies/${featuredCaseStudy.slug.current}`}
                className="inline-flex items-center text-red-600 font-bold hover:text-red-800 transition-colors"
              >
                View Case Study
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Other Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore more of our successful projects across different industries and technologies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hasCaseStudies && caseStudies.length > 1 ? (
              caseStudies.slice(1).map((caseStudy: CaseStudy, index: number) => (
                <Link 
                  key={caseStudy._id || index}
                  href={`/casestudies/${caseStudy.slug.current}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={getImageUrl(caseStudy)}
                        alt={caseStudy.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-medium text-red-600 uppercase tracking-wider mb-2">{caseStudy.subtitle}</p>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">{caseStudy.title}</h3>
                      <p className="text-gray-600 mb-4">{caseStudy.excerpt || "A successful project that delivered exceptional results and client satisfaction."}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-red-600">{caseStudy.result}</span>
                        <span className="text-gray-500 group-hover:text-red-600 transition-colors">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback case studies if none from Sanity or only one exists
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Industries/Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Solutions By Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We deliver exceptional results across various industries and technology domains.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category: Category) => (
              <div key={category.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.name}</h3>
                <p className="text-gray-600 mb-6">Innovative solutions tailored for {String(category.name).toLowerCase()} projects.</p>
                <Link 
                  href={`#${category.id}`}
                  className="inline-flex items-center text-red-600 font-medium hover:text-red-800 transition-colors"
                >
                  View Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl max-w-3xl mx-auto">Don't just take our word for it. Here's what our clients have to say.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-6">"Bloop transformed our digital presence completely. The new website not only looks amazing but has significantly increased our conversion rates."</p>
              <div>
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-white text-opacity-80">Marketing Director, Special Homes</p>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-6">"Working with Bloop was a game-changer for our business. Their strategic approach and technical expertise delivered results beyond our expectations."</p>
              <div>
                <p className="font-bold">Michael Chen</p>
                <p className="text-white text-opacity-80">CEO, TechVision Inc.</p>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-6">"The team at Bloop understood our vision from day one. They delivered a solution that perfectly captures our brand and engages our audience."</p>
              <div>
                <p className="font-bold">Amanda Rodriguez</p>
                <p className="text-white text-opacity-80">Founder, Crowdpen</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Let's discuss how we can help you achieve exceptional results with innovative digital solutions.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}