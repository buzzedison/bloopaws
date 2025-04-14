// ./nextjs-app/app/[slug]/page.tsx

import { SanityDocument } from "@sanity/client";
import Post from "../insight/components/NewPost";

import { postPathsQuery, postQuery } from "../../sanity/lib/queries";
import { cachedClient } from "../../sanity/lib/client";

// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  const posts = await cachedClient(postPathsQuery);

  return posts;
}

export default async function Page({ params }: { params: any }) {
  const post = await cachedClient<SanityDocument>(postQuery, params);

  return <Post post={post} />;
}

