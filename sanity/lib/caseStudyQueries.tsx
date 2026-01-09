import { groq } from "next-sanity";

// Get all case studies
export const caseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)]{
    _id, 
    title, 
    subtitle,
    slug, 
    result,
    description,
    quote,
    author,
    metrics,
    mainImage,
    logo,
    tags,
    publishedAt,
    _createdAt
  }`;

// Get a single case study by its slug
export const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{ 
    title, 
    subtitle,
    result,
    description,
    quote,
    author,
    metrics,
    mainImage, 
    logo,
    tags,
    content,
    publishedAt
  }`;

// Get all case study slugs
export const caseStudyPathsQuery = groq`*[_type == "caseStudy" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get featured case studies (limit to 4)
export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)][0...4]{
    _id, 
    title, 
    subtitle,
    slug, 
    result,
    description,
    quote,
    author,
    metrics,
    mainImage,
    logo,
    tags
  }`;
