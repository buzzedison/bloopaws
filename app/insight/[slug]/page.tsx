
import { cachedClient } from "../../../sanity/lib/client";
import Post from "../components/NewPost";
import { postPathsQuery, postQuery } from "../../../sanity/lib/queries";
import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import { Metadata } from "next";

const builder = imageUrlBuilder(client);

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  const posts = await cachedClient(postPathsQuery);
  return posts;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await cachedClient(postQuery, params);

  if (!post) {
    return {
      title: 'Post Not Found | Bloop',
      description: 'The requested analysis could not be found.',
    };
  }

  const seoTitle = `${post.title} | Bloop Playbook`;
  const seoDescription = post.excerpt || "Strategy and insights for scaling high-growth ventures.";
  const seoImage = post.mainImage ? builder.image(post.mainImage).width(1200).height(630).url() : "";
  const canonicalUrl = `https://bloopglobal.com/insight/${params.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Bloop Global',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@bloopglobal',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await cachedClient(postQuery, params);

  // Fetch related posts (latest 3 posts excluding the current one)
  const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug && defined(slug.current)] | order(publishedAt desc)[0...3]{
    _id, title, slug, mainImage, excerpt, publishedAt,
    categories[]->{
      _id,
      title
    }
  }`;
  
  const relatedPosts = await cachedClient(relatedPostsQuery, params);

  return <Post post={post} relatedPosts={relatedPosts} />;
}
