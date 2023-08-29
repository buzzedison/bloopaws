// HeroPost.tsx
import Link from "next/link";
import type { SanityDocument } from "@sanity/client";

interface HeroPostProps {
  post: SanityDocument;
}

export default function HeroPost({ post }: HeroPostProps) {
  return (
    <div className="hero-container p-8 hover:bg-blue-50">
      <Link href={post.slug.current}>
        <h2 className="text-4xl">{post.title}</h2>
      </Link>
      <Link href={post.slug.current}>Read More</Link>
    </div>
  );
}
