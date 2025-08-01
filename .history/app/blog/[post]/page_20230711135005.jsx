import Image from 'next/image';

export default function BlogPost({ post }) {
  // Render the blog post
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      {post.featuredImage && post.featuredImage.node ? (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || 'Featured image'}
          className="w-full h-48 object-cover mb-4 rounded"
          width={200}
          height={100}
        />
      ) : null}
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
