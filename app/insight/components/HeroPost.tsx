import Image from 'next/image';
import Link from 'next/link';

interface Post {
  mainImage: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
}

export default function HeroPost({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src={post.mainImage}
            alt={post.title}
            width={600}
            height={400}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Featured
          </div>
          <Link href={`/posts/${post.slug.current}`} className="block mt-1 text-2xl leading-tight font-medium text-black hover:underline">
            {post.title}
          </Link>
          <p className="mt-2 text-gray-500">{post.excerpt}</p>
          <Link href={`/posts/${post.slug.current}`} className="mt-4 inline-block px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors duration-200">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}