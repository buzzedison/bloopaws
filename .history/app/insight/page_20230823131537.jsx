// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { getCachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  const posts = await getCachedClient(postsQuery);

  return <Posts posts={posts} />
}