import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ClosingCTA } from "../components/agency/AgencySections";
import { getProjects } from "../lib/agency-projects";
import shared from "../components/agency/agency.module.css";
import s from "./work.module.css";

export const metadata = {
  title: "Selected Work",
  description:
    "Explore Stride, TaskWit, and more digital products, websites, and AI experiences from Bloop Global.",
  alternates: { canonical: "/launchpad" },
};
export const revalidate = 300;

export default async function WorkPage() {
  const projects = await getProjects();
  const featured = projects.find((project) => project.slug === "stride");
  const order = [
    "taskwit",
    "agripro-hub-or-ai-knowledge-hub",
    "myco",
    "specialgardens",
  ];
  const remaining = projects
    .filter((project) => project.slug !== "stride")
    .sort((a, b) => {
      const rank = (slug: string) =>
        order.includes(slug) ? order.indexOf(slug) : order.length;
      return rank(a.slug) - rank(b.slug);
    });
  return (
    <div className={`${shared.page} ${s.work}`}>
      <header className={s.intro}>
        <div className={s.topline}>
          <span>
            <i /> THE BLOOP PORTFOLIO
          </span>
          <span>PRODUCTS / PLATFORMS / POSSIBILITIES</span>
        </div>
        <div className={s.introGrid}>
          <h1>
            Good ideas.
            <br />
            <em>Real, working things.</em>
          </h1>
          <div className={s.introNote}>
            <p>
              From a first digital presence to the platform a team runs on.
              Explore what we’ve brought to life.
            </p>
            <a href="#selected-projects">
              Take a closer look <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <div className={s.indexLine}>
          <span>SELECTED WORK</span>
          <span>
            {String(projects.length).padStart(2, "0")} PROJECTS TO EXPLORE
          </span>
        </div>
      </header>

      <section
        id="selected-projects"
        className={s.collection}
        aria-label="Selected projects"
      >
        {featured && (
          <Link
            href={`/launchpad/${featured.slug}`}
            prefetch={false}
            className={s.feature}
          >
            <div className={s.featureCopy}>
              <div className={s.featureLabel}>
                <span>01 / IN FOCUS</span>
                <span className={s.liveDot}>STRIDE</span>
              </div>
              <div>
                <h2>
                  Work together.
                  <br />
                  In one place.
                </h2>
                <p>{featured.summary}</p>
              </div>
              <div className={s.featureBottom}>
                <span>EXPLORE STRIDE</span>
                <span className={s.circle}>
                  <ArrowUpRight size={24} />
                </span>
              </div>
            </div>
            <div className={s.featureVisual}>
              <div className={s.orbit} aria-hidden="true" />
              <div className={s.productWindow}>
                <div className={s.windowTop}>
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>Stride / Your workspace</span>
                  <ArrowUpRight size={13} />
                </div>
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  width={1140}
                  height={720}
                  priority
                  sizes="(max-width: 760px) 100vw, 65vw"
                />
              </div>
              <div className={s.featureTags}>
                <span>Connected workflows</span>
                <span>AI planning</span>
                <span>CRM & finance</span>
              </div>
            </div>
          </Link>
        )}

        <div className={s.gallery}>
          {remaining.map((project, index) => (
            <Link
              href={`/launchpad/${project.slug}`}
              prefetch={false}
              key={project.slug}
              className={`${s.project} ${s[project.slug === "taskwit" ? "wine" : project.slug === "agripro-hub-or-ai-knowledge-hub" ? "sage" : project.slug === "myco" ? "lilac" : "sand"]}`}
            >
              <div className={s.projectVisual}>
                <div className={s.visualTop}>
                  <span>
                    {String(index + 2).padStart(2, "0")} / {project.title}
                  </span>
                  <ArrowUpRight size={21} />
                </div>
                <div className={s.imageFrame}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={1400}
                      height={900}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  ) : (
                    <span className={s.placeholder}>{project.title}</span>
                  )}
                </div>
                <span className={s.viewProject}>
                  Explore the project <ArrowUpRight size={16} />
                </span>
              </div>
              <div className={s.projectCaption}>
                <div>
                  <span className={s.category}>{project.category}</span>
                  <h2>{project.title}</h2>
                </div>
                <span className={s.relationship}>{project.relationship}</span>
              </div>
              <p className={s.summary}>{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className={s.bridge}>
        <span className={s.bridgeMark} aria-hidden="true">
          b.
        </span>
        <div>
          <p>DIFFERENT BUSINESSES. THE SAME CARE.</p>
          <h2>
            Thought through.
            <br />
            Built to be used.
          </h2>
        </div>
        <Link href="/how-it-works">
          Get to know our process <ArrowUpRight size={20} />
        </Link>
      </section>
      <ClosingCTA />
    </div>
  );
}
