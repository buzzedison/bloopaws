import { groq } from 'next-sanity';
import { cachedClient } from '../../../sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import { client } from '../../../sanity/lib/client';

const builder = imageUrlBuilder(client);

const RelatedPosts = async ({ post }) => {
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

  const relatedPosts = await cachedClient(query, {
    currentId: post._id,
    categories: post.categories?.map(cat => cat.title) || []
  });

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <article 
              key={relatedPost._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300"
            >
              <div className="relative h-48">
                {relatedPost.mainImage && (
                  <Image
                    src={builder.image(relatedPost.mainImage).width(400).height(300).url()}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <Link prefetch={false} href={`/insight/${relatedPost.slug.current}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-700 transition-colors duration-300">
                    {relatedPost.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <Link prefetch={false} 
                    href={`/insight/${relatedPost.slug.current}`}
                    className="text-red-700 hover:text-red-900 font-semibold text-sm inline-flex items-center transition-colors duration-300"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {relatedPost.publishedAt && (
                    <span className="text-sm text-gray-500">
                      {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
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
