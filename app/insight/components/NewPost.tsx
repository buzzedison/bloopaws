import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/lib/client";
import { format } from 'date-fns';

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  const seoTitle = post?.title || "Blog Post";
  const seoDescription = post?.excerpt || "Read our latest blog post";
  const seoImage = post?.mainImage ? builder.image(post.mainImage).width(1200).height(630).url() : "";
  const canonicalUrl = `https://bloopglobal.com/insight/${post?.slug?.current}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={seoImage} />
      </Head>

      <main className="bg-white min-h-screen">
        {post ? (
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
                  {/* Render Author's Bio Here */}
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
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-gray-600">Loading article...</p>
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug = "" } = context.params;
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