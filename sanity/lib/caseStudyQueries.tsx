import { groq } from "next-sanity";

// Get all launchpad stories (formerly case studies)
export const caseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    category,
    stage,
    outcomeType,
    result,
    description,
    backstory,
    founderName,
    founderRole,
    founderPhoto,
    quote,
    author,
    clientAvatar,
    metrics,
    mainImage,
    logo,
    tags,
    technologies,
    publishedAt,
    _createdAt
  }`;

// Alias for Launchpad
export const launchpadStoriesQuery = caseStudiesQuery;

// Get a single launchpad story by its slug (with full details)
export const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    subtitle,
    category,
    stage,
    outcomeType,
    result,
    description,
    backstory,
    founderName,
    founderRole,
    founderBio,
    founderPhoto,
    challenge,
    solution,
    impact,
    technicalChallenges,
    stackDecisions,
    buildTimeline,
    pivots,
    quote,
    author,
    clientAvatar,
    videoTestimonialUrl,
    technologies,
    techStackDetails,
    lessonsLearned,
    relatedResources,
    projectUrl,
    updates,
    whatsNext,
    metrics,
    mainImage,
    logo,
    tags,
    gallery,
    content,
    publishedAt
  }`;

// Alias for Launchpad
export const launchpadStoryQuery = caseStudyQuery;

// Get all case study slugs
export const caseStudyPathsQuery = groq`*[_type == "caseStudy" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get featured launchpad stories (limit to 4)
export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) [0...4]{
    _id,
    title,
    subtitle,
    slug,
    category,
    stage,
    result,
    description,
    backstory,
    founderName,
    founderRole,
    founderPhoto,
    quote,
    author,
    metrics,
    mainImage,
    logo,
    tags,
    technologies
  }`;

// Alias for Launchpad
export const featuredLaunchpadStoriesQuery = featuredCaseStudiesQuery;
