import type { GetStaticProps, GetStaticPaths } from 'next/types';
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { format } from 'date-fns';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import type { Metadata } from 'next/types';

const builder = imageUrlBuilder(client);

interface PostPageProps {
  post: SanityDocument;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      mainImage,
      "slug": slug.current
    }
  `, { slug });

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    };
  }

  const seoTitle = post.title || "Blog Post";
  const seoDescription = post.excerpt || "Read our latest blog post";
  const seoImage = post.mainImage ? builder.image(post.mainImage).width(1200).height(630).url() : "";
  const canonicalUrl = `https://bloopglobal.com/insight/${post.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Post({ post }: PostPageProps) {
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading article...</p>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-24">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4 pt-4 md:pt-12">{post.title}</h1>
          <div className="flex items-start mb-4">
            {post.author && post.author.image && (
              <Image
                src={builder.image(post.author.image).width(40).height(40).url()}
                width={40}
                height={40}
                alt={post.author.name}
                className="rounded-full mr-4"
              />
            )}
            <div>
              {post.author && (
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              )}
              {post.publishedAt && (
                <time className="text-sm text-gray-500" dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              )}
              {post.author && post.author.bio && (
                <div className="prose prose-sm mt-2">
                  <PortableText value={post.author.bio} />
                </div>
              )}
            </div>
          </div>
        </header>
        {post.mainImage && (
          <div className="mb-12">
            <Image
              src={builder.image(post.mainImage).width(1200).height(675).url()}
              width={1200}
              height={675}
              alt={post?.mainImage?.alt || post.title}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none">
          {post.body ? <PortableText value={post.body} /> : null}
        </div>
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug = "" } = context.params as { slug: string };
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      ...,
      author->,
      categories[]->
    }
  `, { slug });

  return {
    props: {
      post,
    },
  };
}