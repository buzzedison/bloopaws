import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Workflow,
  ChevronDown,
} from "lucide-react";
import { projects, agencyFaqs } from "../../lib/agency-content";
import s from "./agency.module.css";

export function Action({
  children = "Discuss your project",
  href = "/contact",
  secondary = false,
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={secondary ? s.textLink : s.button}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function ProjectCards({ items = projects.slice(0, 3) }) {
  return (
    <div className={s.projectGrid}>
      {items.map((project) => (
        <Link
          prefetch={false}
          href={`/launchpad/${project.slug}`}
          className={s.projectCard}
          key={project.slug}
        >
          <div className={s.projectImage}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
            ) : (
              <span className={s.imageFallback}>{project.title}</span>
            )}
          </div>
          <div className={s.projectInfo}>
            <span className={s.label}>
              {project.relationship} · {project.category}
            </span>
            <h3>
              {project.title}
              <ArrowUpRight size={22} aria-hidden="true" />
            </h3>
            <p>{project.summary}</p>
            <span className={s.projectAction}>
              Explore the project <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function ServicePaths() {
  return (
    <div className={s.pathGrid}>
      <article className={s.pathCard}>
        <Code2 size={28} aria-hidden="true" />
        <span className={s.label}>FOR FOUNDERS & PRODUCT TEAMS</span>
        <h3>Build a product.</h3>
        <p>
          Turn a business idea into a website, web application, or mobile
          experience people can use.
        </p>
        <ul>
          <li>
            <Check size={16} /> Product design and prototyping
          </li>
          <li>
            <Check size={16} /> Websites, web apps, and mobile apps
          </li>
          <li>
            <Check size={16} /> Launch, documentation, and handover
          </li>
        </ul>
        <Action href="/services/web" secondary>
          Explore product development
        </Action>
      </article>
      <article className={`${s.pathCard} ${s.darkCard}`}>
        <Workflow size={28} aria-hidden="true" />
        <span className={s.label}>FOR BUSINESS OWNERS & OPERATIONS TEAMS</span>
        <h3>Automate your business.</h3>
        <p>
          Connect conversations, customer information, and everyday tasks so
          your team can keep work moving.
        </p>
        <ul>
          <li>
            <Check size={16} /> Website and WhatsApp assistants
          </li>
          <li>
            <Check size={16} /> Lead capture and follow-up
          </li>
          <li>
            <Check size={16} /> Connected business workflows
          </li>
        </ul>
        <Action href="/services/ai" secondary>
          Explore AI & automation
        </Action>
      </article>
    </div>
  );
}
export function Questions() {
  return (
    <section className={`${s.container} ${s.faq}`}>
      <div>
        <p className={s.eyebrow}>BEFORE WE GET STARTED</p>
        <h2>
          Good questions.
          <br />
          Clear answers.
        </h2>
        <Action secondary>Ask us about your project</Action>
      </div>
      <div>
        {agencyFaqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <ChevronDown size={19} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function ClosingCTA() {
  return (
    <section className={s.closing}>
      <div className={s.container}>
        <p className={s.eyebrow}>LET’S MAKE IT WORK</p>
        <h2>
          A product to build.
          <br />A process to improve.
          <br />
          <em>Let’s talk.</em>
        </h2>
        <p>
          Tell us where you are, what you need, and what’s getting in the way.
          <br />
          We’ll help you work out the next step.
        </p>
        <Action />
        <a className={s.email} href="mailto:ask@bloopglobal.com">
          ask@bloopglobal.com
        </a>
      </div>
    </section>
  );
}
