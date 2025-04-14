// MajorPostsGrid.tsx
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../../sanity/lib/client"; // Adjust this import based on your file structure

const builder = imageUrlBuilder(client);
// const category = 'Case Studies';


interface CategoryPostsGridProps {
  posts: SanityDocument[];
  category: string;
}



export default function CategoryPostsGrid({ posts,category }: CategoryPostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div key={post._id} className="rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-[300px] w-full">
            {post.mainImage && (
              <Image
                src={builder.image(post.mainImage).url()}
                fill={true}
                objectFit="cover"
                alt={post?.mainImage?.alt || 'Post image'}
              />
            )}
          </div>
          <div className="p-6">
            <Link href={post.slug.current}className="text-2xl font-bold hover:text-blue-600 transition duration-300">
                {post.title}
    
            </Link>
            <p className="mt-2 text-gray-600">
              {/* Add the excerpt here */}
              {post.excerpt}
            </p>
            <p>{category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
