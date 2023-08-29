// ./nextjs-app/app/pages/index.tsx

import Posts from "../insight/components/Posts";
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";
import Slider from "./components/Slider"; // import Slider component from _components folder


export default async function Home() {
  const posts = await cachedClient(postsQuery);

  return (
    <>
      <Posts posts={posts} />
      <Slider posts={posts} /> {/* use Slider component and pass posts prop */}
    </>
  );
}
