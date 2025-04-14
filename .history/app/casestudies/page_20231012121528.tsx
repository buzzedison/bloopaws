import React from 'react'
import CategoryPostsGrid from '../components/Case'
import { cachedClient } from "../../sanity/lib/client"

import { postsByCategoryQuery } from "../../sanity/lib/queries";



export default async function page() {
  const categoryTitle = 'Entrepreneurship';
  const categoryQuery = postsByCategoryQuery('9687cd11-5441-4a21-ac04-2054101d2872');

  const posts = await cachedClient(categoryQuery);
  
  console.log(posts);

  return (
    <div>

<CategoryPostsGrid posts={posts} category={categoryTitle} />
    </div>
  )
}

