// instead of ./nextjs-app/app/[slug]/page.jsx
//how can i make this route 
//./nextjs-app/app/insightt/[slug]/page.jsx
import { cachedClient } from "../../../sanity/lib/client";
import Post from "../insight/components/NewPost";
import { postPathsQuery, postQuery } from "../../../sanity/lib/queries";


// Prepare Next.js to know which routes already exist
export async function generateStaticParams() {
  const posts = await cachedClient(postPathsQuery);

  return posts;
}

export default async function Page({ params }) {
  const post = await cachedClient(postQuery, params);

  return <Post post={post} />;
}
