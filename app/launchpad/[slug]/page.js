import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { getProjects } from "../../lib/agency-projects";
import {
  Action,
  ProjectCards,
  ClosingCTA,
} from "../../components/agency/AgencySections";
import s from "../../components/agency/agency.module.css";
export const revalidate = 300;
export async function generateMetadata({ params }) {
  const project = (await getProjects()).find(
    (item) => item.slug === params.slug,
  );
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Selected Work`,
    description: project.summary,
    alternates: { canonical: `/launchpad/${project.slug}` },
    openGraph: {
      title: `${project.title} | Bloop Global`,
      description: project.summary,
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}
function StoryText({ value }) {
  if (typeof value === "string") return <p>{value}</p>;
  if (Array.isArray(value)) return <PortableText value={value} />;
  return null;
}
export default async function ProjectPage({ params }) {
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <Link prefetch={false} href="/launchpad" className={s.backLink}>
            <ArrowLeft size={16} /> All selected work
          </Link>
          <p className={s.eyebrow}>
            {project.relationship} / {project.category}
          </p>
          <h1>{project.title}</h1>
          <p className={s.intro}>{project.summary}</p>
          {project.scope.length > 0 && (
            <div className={s.tagRow}>
              {project.scope.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        {project.image && (
          <figure className={s.storyImage}>
            <Image
              src={project.image}
              alt={project.alt}
              width={1600}
              height={1000}
              sizes="(max-width: 800px) 100vw, 1200px"
              priority
            />
            <figcaption>
              {project.title} —{" "}
              {project.website
                ? "public product screenshot"
                : "project imagery"}
              .
            </figcaption>
          </figure>
        )}
        <div className={s.storyBody}>
          <aside>
            <p className={s.eyebrow}>THE PROJECT</p>
            <h3>{project.title}</h3>
            <p>{project.relationship}</p>
            <p>{project.category}</p>
            <div className={s.actions}>
              {project.website && (
                <Action secondary href={project.website}>
                  Visit {project.title}
                </Action>
              )}
              <Action secondary href="/contact">
                Discuss a similar project
              </Action>
            </div>
          </aside>
          <div>
            {[
              ["The brief", project.challenge],
              ["The approach", project.approach],
              ["What was built", project.delivery],
            ].map(
              ([heading, copy]) =>
                copy && (
                  <article key={heading}>
                    <h2>{heading}</h2>
                    <StoryText value={copy} />
                  </article>
                ),
            )}
            {project.content && (
              <article>
                <StoryText value={project.content} />
              </article>
            )}
          </div>
        </div>
        <div className={s.moreWork}>
          <h2>Explore more work.</h2>
          <ProjectCards
            items={projects
              .filter((item) => item.slug !== project.slug)
              .slice(0, 3)}
          />
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
