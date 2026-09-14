import { client } from "../sanity/lib/client";
import { projects } from "./lib/agency-content";
const base = "https://www.bloopglobal.com";
export const revalidate = 3600;
export default async function sitemap() {
  const paths = [
    "/",
    "/services",
    "/services/ai",
    "/services/web",
    "/services/mobile",
    "/services/strategy",
    "/services/training",
    "/about",
    "/how-it-works",
    "/contact",
    "/launchpad",
    "/playbook",
    "/quote-builder",
    "/insight",
    "/privacy-policy",
    "/terms",
  ];
  const entries = paths.map((path) => ({ url: base + path }));
  projects.forEach((project) =>
    entries.push({ url: `${base}/launchpad/${project.slug}` }),
  );
  try {
    const documents = await client.fetch(
      `*[_type in ["post", "caseStudy"] && defined(slug.current)]{_type, "slug": slug.current, _updatedAt}`,
    );
    for (const doc of documents) {
      const url = `${base}/${doc._type === "post" ? "insight" : "launchpad"}/${doc.slug}`;
      if (!entries.some((entry) => entry.url === url))
        entries.push({ url, lastModified: doc._updatedAt });
    }
  } catch {
    console.error("Sitemap: unable to load additional content URLs");
  }
  return entries;
}
