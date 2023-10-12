import React from 'react'
import CategoryPostsGrid from '../components/Case'
import { cachedClient } from "../../sanity/lib/client"

import { postsByCategoryQuery } from "../../sanity/lib/queries";



export default async function page() {
  const categoryTitle = 'Entrepreneurship';
  const categoryQuery = postsByCategoryQuery(categoryTitle);
  const posts = await cachedClient(categoryQuery);
  

  return (
    <div>

<CategoryPostsGrid posts={posts} category={categoryTitle} />
    </div>
  )
}

