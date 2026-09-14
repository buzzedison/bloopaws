import { notFound, redirect } from "next/navigation";
import { cachedClient } from "../../sanity/lib/client";
export default async function LegacyArticle({
  params,
}: {
  params: { slug: string };
}) {
  const post = await cachedClient(
    '*[_type == "post" && slug.current == $slug][0]{_id}',
    { slug: params.slug },
  );
  if (!post) notFound();
  redirect(`/insight/${params.slug}`);
}
