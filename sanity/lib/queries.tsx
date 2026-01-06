import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id, title, slug, mainImage, excerpt, publishedAt,
    categories[]->{
      _id,
      title
    }
  }`;

// Get all categories
export const categoriesQuery = groq`*[_type == "category"]{
    _id, title
  }`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
    title, 
    excerpt,
    mainImage, 
    body,
    publishedAt,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title
    }
  }`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

export function postsByCategoryQuery(categoryId: string) {
  return groq`
    *[_type == "post" && defined(slug.current) && categories[]._ref == ${JSON.stringify(categoryId)}]{
      _id, title, slug, mainImage, excerpt
    }
  `;
}