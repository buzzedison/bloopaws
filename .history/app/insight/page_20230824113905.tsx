// // ./nextjs-app/app/pages/index.tsx

// import Posts from "../insight/components/Posts";
// import { cachedClient } from "../../sanity/lib/client";
// import { postsQuery } from "../../sanity/lib/queries";

// export default async function Home() {
//   const posts = await cachedClient(postsQuery);

//   return <Posts posts={posts} />
// }  

// ./nextjs-app/pages/index.tsx

import React from "react";
import Hero from "../insight/components/Hero"; // Import Hero component
import { cachedClient } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  const posts = await cachedClient(postsQuery);

  return <Hero posts={posts} /> // Use Hero component and pass posts as prop
}



