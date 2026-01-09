import { client } from "../../sanity/lib/client";
import { categoriesQuery, postsQuery, careersQuery } from "../../sanity/lib/queries";
import { caseStudiesQuery } from "../../sanity/lib/caseStudyQueries";
import LinksClient from "./LinksClient";

export const metadata = {
    title: "Bloop Global | Links & Results",
    description: "Recent investigations, major results, and strategic resources from the Bloop Global ecosystem.",
};

export default async function LinksPage() {
    const [posts, caseStudies, categories, careers] = await Promise.all([
        client.fetch(postsQuery),
        client.fetch(caseStudiesQuery),
        client.fetch(categoriesQuery),
        client.fetch(careersQuery)
    ]);

    return <LinksClient posts={posts} caseStudies={caseStudies} categories={categories} careers={careers} />;
}
