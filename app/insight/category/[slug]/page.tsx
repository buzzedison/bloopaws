import { groq } from 'next-sanity';
import { client } from '../../../../sanity/lib/client';
import NextImage from 'next/legacy/image';
import NextLink from 'next/link';
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

interface Category {
  _id: string;
  title: string;
}

interface Author {
  name: string;
  image: any;
}

interface Post {
  _id: string;
  title: string;
  mainImage: any;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  author: Author;
  categories: Category[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Function to format the category title
const formatCategoryTitle = (slug: string): string => {
  // Special cases with exact matches from Sanity
  const specialCases: { [key: string]: string } = {
    'entrepreneurship': 'Entrepreneurship ',  // Note the space at the end
    'management': 'Management',
    'web3': 'web3',
    'future-of-work': 'Future of work',
    'startups': 'startups'
  };

  // First try exact match
  const normalizedSlug = slug.toLowerCase();
  if (specialCases[normalizedSlug]) {
    return specialCases[normalizedSlug];
  }

  // If no exact match, try to match with different formats
  const slugWithSpaces = slug.replace(/-/g, ' ');
  const titleCase = slugWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return titleCase;
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
  
  // Debug: Log all categories from all posts
  const allCategories = allPosts.flatMap((post: Post) => 
    post.categories?.map((cat: Category) => cat.title) || []
  ).filter((title: string) => title);
  console.log('All categories in posts:', allCategories);

  // Filter posts for the specific category
  const posts = allPosts.filter((post: Post) => {
    const postCategories = post.categories?.map((cat: Category) => cat.title) || [];
    console.log('Post categories:', postCategories, 'Looking for:', categoryTitle);
    return postCategories.some((cat: string) => 
      // Try different matching approaches
      cat === categoryTitle || // Exact match
      cat.trim() === categoryTitle.trim() || // Trimmed match
      cat.toLowerCase().trim() === categoryTitle.toLowerCase().trim() // Case-insensitive match
    );
  });

  // Debug: Log found posts
  console.log('Found posts for category:', posts.length);
  if (posts.length > 0) {
    console.log('First post categories:', posts[0].categories?.map((c: Category) => c.title));
  }

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
                  <NextImage
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
                <NextLink 
                  href={`/insight/${post.slug.current}`}
                  className="block text-lg font-serif font-bold text-gray-900 hover:text-red-700 transition-colors duration-300 line-clamp-2 mb-2"
                >
                  {post.title}
                </NextLink>
                <p className="text-gray-600 line-clamp-2 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <NextLink 
                    href={`/insight/${post.slug.current}`}
                    className="inline-flex items-center text-red-700 hover:text-red-900 font-semibold text-sm transition-colors duration-300"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </NextLink>
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
