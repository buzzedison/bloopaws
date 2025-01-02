import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import NextImage from 'next/legacy/image';
import NextLink from 'next/link';
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

interface Post {
  _id: string;
  title: string;
  mainImage: any;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  categories: Array<{
    _id: string;
    title: string;
  }>;
}

interface RelatedPostsProps {
  currentPost: Post;
}

const RelatedPosts = async ({ currentPost }: RelatedPostsProps) => {
  // Query to find posts that share categories with the current post
  const query = groq`
    *[_type == "post" && _id != $currentId && count((categories[]->title)[@ in $categories]) > 0] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      categories[]->
    }
  `;

  const relatedPosts = await client.fetch(query, {
    currentId: currentPost._id,
    categories: currentPost.categories.map(cat => cat.title)
  });

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post: Post) => (
            <article 
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300"
            >
              <div className="relative h-48">
                {post.mainImage && (
                  <NextImage
                    src={builder.image(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <NextLink href={`/insight/${post.slug.current}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                </NextLink>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <NextLink 
                    href={`/insight/${post.slug.current}`}
                    className="text-red-700 hover:text-red-900 font-semibold text-sm inline-flex items-center transition-colors duration-300"
                  >
                    Read More
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
