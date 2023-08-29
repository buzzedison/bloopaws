// ./nextjs-app/sanity/lib/queries.js

// Get all posts
export const postsQuery = `*[_type == "post" && defined(slug.current)]{ 
    _id, 
    title, 
    slug 
  }`
  
  // Get a single post by its slug  
  export const postQuery = `*[_type == "post" && slug.current == $slug]{
    title,
    mainImage,
    body
  }`
  
  // Get all post slugs
  export const postPathsQuery = `*[_type == "post" && defined(slug.current)][]{
    "params": {
      "slug": slug.current
    }
  }`