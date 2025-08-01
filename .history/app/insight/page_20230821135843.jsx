// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/post";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  const posts = await cachedClient(postsQuery);

  return <Posts posts={posts} />
}