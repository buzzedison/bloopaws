import { client } from "../../sanity/lib/client";
import { groq } from 'next-sanity';
import HeroPost from "../insight/components/HeroPostInsight";
import FeaturedPosts from "./components/FeaturedPosts";
import CategoryPosts from "./components/CategoryPosts";

export const revalidate = 0;

const postsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  author->,
  categories[]->
}`;

const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title
}`;

// Add debug query for Web3 categories
const web3Query = groq`*[_type == "category" && title match "web3" || title match "Web3" || title match "WEB3"] {
  _id,
  title
}`;

export default async function Home() {
  const [posts, allCategories, web3Categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
    client.fetch(web3Query)
  ]);
  
  // Log all available categories
  console.log('All categories in Sanity:', allCategories.map((cat: any) => cat.title));
  
  // Debug: Log Web3 categories
  console.log('Found Web3 categories:', web3Categories);

  // Debug: Log all categories from all posts
  posts.forEach((post: any) => {
    if (post.categories) {
      console.log('Post:', post.title);
      console.log('Categories:', post.categories.map((cat: any) => cat.title));
    }
  });

  const heroPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const remainingPosts = posts.slice(4);

  // Debug: Check hero and featured posts for web3 category
  console.log('Checking hero post for web3:', 
    heroPost.categories?.some((cat: any) => cat.title.toLowerCase() === 'web3') ? 'Yes' : 'No'
  );
  
  console.log('Checking featured posts for web3:');
  featuredPosts.forEach((post: any, index: number) => {
    if (post.categories?.some((cat: any) => cat.title.toLowerCase() === 'web3')) {
      console.log(`Featured post ${index + 1} has web3:`, post.title);
    }
  });

  // Debug: Check all posts for web3 category
  console.log('Checking all posts for web3:');
  remainingPosts.forEach((post: any) => {
    if (post.categories?.some((cat: any) => cat.title.toLowerCase() === 'web3')) {
      console.log('Found web3 post:', {
        title: post.title,
        categories: post.categories.map((c: any) => c.title)
      });
    }
  });

  // Initialize categories with all available categories
  const postsByCategory = allCategories.reduce((acc: { [key: string]: any[] }, category: any) => {
    acc[category.title] = [];
    return acc;
  }, {});

  // Add ALL posts to their categories (including featured posts)
  posts.forEach((post: any) => {
    post.categories?.forEach((category: any) => {
      if (category && category.title && postsByCategory[category.title] !== undefined) {
        postsByCategory[category.title].push(post);
      }
    });
  });

  // Debug: Check final categories
  console.log('All category titles:', Object.keys(postsByCategory));
  console.log('Categories with posts:', Object.keys(postsByCategory));

  // Debug: Log final categories
  console.log('Final categories:', Object.keys(postsByCategory));
  if (postsByCategory['Web3']) {
    console.log('Web3 posts count:', postsByCategory['Web3'].length);
  }

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

        {/* Category-based content */}
        <div className="space-y-24">
          {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
            category !== "Featured Posts" && categoryPosts.length > 0 && (
              <CategoryPosts 
                key={category} 
                category={category} 
                posts={categoryPosts as Array<{
                  _id: string;
                  mainImage: any;
                  title: string;
                  slug: { current: string };
                  excerpt: string;
                }>} 
              />
            )
          ))}
        </div>
      </main>

   
    </div>
  );
}
