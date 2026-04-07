import { client } from "../../sanity/lib/client";
import LaunchpadClient from "./LaunchpadClient";

// Fetch all launchpad stories
async function getLaunchpadStories() {
  const query = `*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
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
    mainImage,
    logo,
    technologies,
    metrics,
    tags,
    publishedAt
  }`;

  try {
    const stories = await client.fetch(query);
    return stories || [];
  } catch (error) {
    console.error("Error fetching launchpad stories:", error);
    return [];
  }
}

export default async function LaunchpadPage() {
  const stories = await getLaunchpadStories();

  return <LaunchpadClient stories={stories} />;
}

export const metadata = {
  title: "Products We've Built | Bloop Global",
  description: "Real products, real founders, real results. Browse the web apps, mobile platforms, and AI tools we've shipped — and the founders we built them with.",
  openGraph: {
    title: "Products We've Built | Bloop Global",
    description: "Real products, real founders, real results. Browse the web apps, mobile platforms, and AI tools we've shipped — and the founders we built them with.",
  },
};
