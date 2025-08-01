import { groq } from 'next-sanity';
import { client } from '../../../../sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

interface Post {
  _id: string;
  mainImage: any;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    image: any;
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Function to format the category title
const formatCategoryTitle = (slug: string): string => {
  // Convert slug to title case but keep original spacing
  const words = slug.split('-');
  if (words[0].toLowerCase() === 'entrepreneurship') {
    return 'Entrepreneurship '; // Note the space at the end to match Sanity
  }
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;
  const categoryTitle = formatCategoryTitle(slug);

  // Add console log for debugging
  console.log('Category title being searched:', categoryTitle);

  const query = groq`*[_type == "post"] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author->,
    categories[]->
  } | order(publishedAt desc)`;

  const allPosts = await client.fetch(query);
  
  // Filter posts for the specific category
  const posts = allPosts.filter((post: any) => 
    post.categories?.some((category: any) => 
      category.title.trim() === categoryTitle.trim()
    )
  );

  // Debug: Log found posts
  console.log('Found posts for category:', posts.length);
  console.log('First post categories:', posts[0]?.categories?.map((c: any) => c.title));

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 pt-24">
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-600">
            Latest insights and articles about {categoryTitle.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post: Post) => (
            <div 
              key={post._id} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 group"
            >
              <div className="relative h-44">
                {post.mainImage ? (
                  <Image
                    src={builder.image(post.mainImage).width(400).height(250).url()}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <Link 
                  href={`/insight/${post.slug.current}`}
                  className="block text-lg font-serif font-bold text-gray-900 hover:text-red-700 transition-colors duration-300 line-clamp-2 mb-2"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 line-clamp-2 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/insight/${post.slug.current}`}
                    className="inline-flex items-center text-red-700 hover:text-red-900 font-semibold text-sm transition-colors duration-300"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {post.publishedAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">
              No posts found in this category
            </h2>
            <p className="mt-2 text-gray-600">
              Check back later for new content
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
