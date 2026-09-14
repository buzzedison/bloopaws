import { cache } from "react";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { projects } from "./agency-content";

// Keep established CMS project URLs available alongside curated, source-backed work.
export const getProjects = cache(async () => {
  try {
    const stories =
      await client.fetch(`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
      title, slug, subtitle, description, mainImage, category, technologies, challenge, solution, impact, content
    }`);
    const curatedSlugs = new Set(projects.map((project) => project.slug));
    const additional = (stories || [])
      .filter((story) => !curatedSlugs.has(story.slug.current))
      .map((story) => ({
        slug: story.slug.current,
        title: story.title,
        category: story.category || "Digital project",
        relationship: "Project showcase",
        summary:
          story.description || story.subtitle || "Explore this Bloop project.",
        image: story.mainImage?.asset
          ? urlForImage(story.mainImage).width(1400).url()
          : null,
        alt: story.mainImage?.alt || story.title,
        scope: story.technologies || [],
        challenge: story.challenge,
        approach: story.solution,
        delivery: story.impact,
        content: story.content,
      }));
    return [...projects, ...additional];
  } catch (error) {
    console.error("Unable to load additional portfolio projects");
    return projects;
  }
});
