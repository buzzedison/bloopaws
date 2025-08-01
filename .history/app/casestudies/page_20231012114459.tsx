import React from 'react'
import CategoryPostsGrid from '../components/Case'
import { cachedClient } from "../../sanity/lib/client"

import { postsByCategoryQuery } from "../../sanity/lib/queries";



export default async function page() {
  const categoryTitle = 'Case Studies';
  const categoryQuery = postsByCategoryQuery(categoryTitle);
  const posts = await cachedClient(categoryQuery);
  
  const heroPost = posts[0];
  const majorPosts = posts.slice(0, 2);
  return (
    <div>

<CategoryPostsGrid posts={majorPosts} category={categoryTitle} />
    </div>
  )
}

