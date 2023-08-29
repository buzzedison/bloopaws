// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  const posts = await cachedClient(postsQuery);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Next.js with Sanity</h1>
        <p className="mt-4 text-lg text-center text-gray-600">This is a simple blog app built with Next.js and Sanity.io. You can create, edit, and delete posts using the Sanity Studio.</p>
        <div className="mt-8 flex justify-center">
          <a href="/posts" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Learn more</a>
        </div>
      </div>
      <Posts posts={posts} />
    </div>
  )
}
