import { cachedClient } from "../../../sanity/lib/client";
import { caseStudyQuery } from "../../../sanity/lib/caseStudyQueries";
import { urlForImage } from "../../../sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ExternalLink, Share2, Tag } from "lucide-react";

// Define TypeScript interfaces
interface CaseStudyParams {
  params: {
    slug: string;
  };
}

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface CaseStudy {
  title: string;
  subtitle?: string;
  result?: string;
  description?: string;
  quote?: string;
  author?: string;
  metrics?: Array<{
    label: string;
    value: string;
    period?: string;
  }>;
  mainImage?: SanityImage;
  logo?: SanityImage;
  tags?: string[];
  content?: any[];
  publishedAt?: string;
}

export default async function CaseStudyPage({ params }: CaseStudyParams) {
  const { slug } = params;
  
  // Fetch the case study data from Sanity
  const caseStudy: CaseStudy = await cachedClient(caseStudyQuery, { slug });
  
  // If no case study is found, show 404
  if (!caseStudy) {
    notFound();
  }
  
  // Helper function to get image URL
  const getImageUrl = (image?: SanityImage): string => {
    if (image && image._type === 'image' && image.asset && image.asset._ref) {
      try {
        return urlForImage(image).width(1200).height(800).url();
      } catch (error) {
        console.error('Error generating image URL:', error);
      }
    }
    return '/images/placeholder.svg';
  };
  
  // Format metrics for display
  const formattedResults = caseStudy.metrics 
    ? caseStudy.metrics.map(metric => ({
        label: metric.label,
        value: metric.value,
        period: metric.period
      }))
    : [{ 
        label: "Result", 
        value: caseStudy.result || "Successful completion",
        period: ""
      }];

  // Format date if available
  const formattedDate = caseStudy.publishedAt 
    ? new Date(caseStudy.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/casestudies" className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Case Studies</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
              <Share2 className="w-5 h-5 mr-1" />
              <span className="hidden md:inline">Share</span>
            </button>
            
            <Link 
              href="https://www.bloopglobal.com/contact" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl(caseStudy.mainImage)}
            alt={caseStudy.title}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <div className="max-w-3xl text-white">
            {caseStudy.subtitle && (
              <p className="text-red-400 font-medium text-lg mb-2">{caseStudy.subtitle}</p>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{caseStudy.title}</h1>
            
            {caseStudy.result && (
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg mb-6">
                {caseStudy.result}
              </div>
            )}
            
            {caseStudy.description && (
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">{caseStudy.description}</p>
            )}
            
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudy.tags.map((tag, index) => (
                  <span key={index} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {formattedDate && (
              <div className="flex items-center text-gray-300 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {formattedResults.map((result, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-3xl font-bold text-red-600 mb-1">{result.value}</p>
                    <p className="text-gray-600">{result.label}{result.period ? ` ${result.period}` : ''}</p>
                  </div>
                ))}
              </div>
              
              {/* Challenge Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div className="bg-red-600 h-8 w-2 mr-4 rounded-full"></div>
                  The Challenge
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700">
                    {caseStudy.quote || "Our client faced significant challenges in their industry that required innovative solutions and strategic thinking."}
                  </p>
                </div>
              </div>
              
              {/* Solution Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div className="bg-red-600 h-8 w-2 mr-4 rounded-full"></div>
                  Our Solution
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700">
                    {caseStudy.author || "We developed a comprehensive strategy and implemented cutting-edge technology to address the client's needs and exceed their expectations."}
                  </p>
                </div>
                
                {/* Solution Image */}
                <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={getImageUrl(caseStudy.logo || caseStudy.mainImage)}
                    alt="Solution visualization"
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Results Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div className="bg-red-600 h-8 w-2 mr-4 rounded-full"></div>
                  The Results
                </h2>
                
                <div className="space-y-4">
                  {formattedResults.map((result, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-green-500 mt-1 mr-3">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-bold">{result.value}</span> {result.label}{result.period ? ` ${result.period}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content Blocks - If you have structured content */}
              {caseStudy.content && caseStudy.content.length > 0 && (
                <div className="prose prose-lg max-w-none mb-16">
                  {/* This would need a proper Portable Text renderer */}
                  <p className="text-gray-700">Additional content would be rendered here using a Portable Text component.</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Project Details</h3>
                
                {/* Client Info */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Client</p>
                  <p className="font-medium text-gray-900">{caseStudy.title.split(' ')[0]}</p>
                </div>
                
                {/* Industry */}
                {caseStudy.tags && caseStudy.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                    <p className="font-medium text-gray-900">{caseStudy.tags[0]}</p>
                  </div>
                )}
                
                {/* Services Provided */}
                {caseStudy.tags && caseStudy.tags.length > 1 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Services Provided</p>
                    <div className="space-y-1">
                      {caseStudy.tags.slice(1).map((tag, index) => (
                        <p key={index} className="font-medium text-gray-900">{tag}</p>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* CTA */}
                <div className="mt-8">
                  <Link 
                    href="https://www.bloopglobal.com/contact" 
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    Start Your Project
                  </Link>
                  
                  <Link 
                    href="#" 
                    className="block w-full mt-4 border border-gray-300 hover:border-red-600 hover:text-red-600 text-gray-700 text-center py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Case Studies - Could be implemented if you have related case studies */}
      
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

// Generate static paths for all case studies
export async function generateStaticParams() {
  const paths = await cachedClient(`*[_type == "caseStudy" && defined(slug.current)][].slug.current`);
  
  return paths.map((slug: string) => ({
    slug,
  }));
}
