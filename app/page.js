import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import {
  Action,
  ServicePaths,
  ProjectCards,
  Questions,
  ClosingCTA,
} from "./components/agency/AgencySections";
import { projects } from "./lib/agency-content";
import s from "./components/agency/agency.module.css";

export const metadata = {
  title: { absolute: "Bloop Global | Digital Products & AI Automation" },
  description:
    "We help founders build digital products and growing teams automate everyday work. Web and mobile development, AI assistants, and connected business workflows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Digital products. Better ways of working. | Bloop Global",
    description: "Build a product. Automate your business. Work with Bloop.",
    url: "/",
    images: [
      {
        url: "/images/portfolio/stride-dashboard.png",
        alt: "Stride workspace and AI planning dashboard",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={`${s.container} ${s.heroGrid}`}>
          <div>
            <p className={s.eyebrow}>
              <span /> YOUR PRODUCT & AUTOMATION PARTNER
            </p>
            <h1>
              Digital products.
              <br />
              Better ways
              <br />
              <em>of working.</em>
            </h1>
            <p className={s.heroCopy}>
              We help founders build web and mobile products, and growing teams
              automate the work that slows them down.
            </p>
            <div className={s.actions}>
              <Action />
              <Action secondary href="/launchpad">
                Explore our work
              </Action>
            </div>
            <p className={s.heroNote}>
              Clear scope. Working demos. A team you can talk to.
            </p>
          </div>
          <Link
            prefetch={false}
            href="/launchpad/stride"
            className={s.heroProject}
            aria-label="Explore the Stride workspace platform"
          >
            <div className={s.browserBar}>
              <span>
                <i />
                <i />
                <i />
              </span>
              <span>SELECTED WORK / STRIDE</span>
              <ArrowUpRight size={18} />
            </div>
            <div className={s.heroScreen}>
              <Image
                src="/images/portfolio/stride-dashboard.png"
                alt="Stride dashboard with projects, quick actions, and AI weekly planning."
                width={1140}
                height={720}
                priority
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </div>
            <div className={s.heroProjectCaption}>
              <div>
                <span className={s.label}>WORKSPACE & AI PLATFORM</span>
                <strong>One workspace. Connected work.</strong>
              </div>
              <span className={s.roundArrow}>
                <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <div className={s.principles}>
        <div className={s.container}>
          {[
            "Built around your business",
            "A clear plan before the build",
            "Your team involved throughout",
          ].map((text) => (
            <span key={text}>
              <Check size={16} aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>
      </div>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>TWO WAYS WE CAN HELP</p>
            <h2>
              What needs to
              <br />
              work better?
            </h2>
          </div>
          <p>
            Start with the problem you want to solve.
            <br />
            We’ll help define the right build.
          </p>
        </div>
        <ServicePaths />
      </section>
      <section className={s.workSection}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>WORK YOU CAN EXPLORE</p>
              <h2>
                From the brief
                <br />
                to the browser.
              </h2>
            </div>
            <Action href="/launchpad" secondary>
              See selected work
            </Action>
          </div>
          <ProjectCards
            items={["stride", "taskwit", "agripro-hub-or-ai-knowledge-hub"].map(
              (slug) => projects.find((project) => project.slug === slug),
            )}
          />
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>A CLEAR WAY TO WORK TOGETHER</p>
            <h2>
              You see the plan.
              <br />
              Then the progress.
            </h2>
          </div>
          <Action href="/how-it-works" secondary>
            See how we work
          </Action>
        </div>
        <ol className={s.steps}>
          {[
            [
              "Understand the job",
              "We explore your goals, existing tools, and constraints, then agree what success should look like.",
            ],
            [
              "Define and build",
              "We set out the scope and milestones. You review designs and working demos as the project develops.",
            ],
            [
              "Launch and hand over",
              "We test, launch, and equip your team with the agreed documentation, training, and support.",
            ],
          ].map(([title, copy], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.studio}>
        <div className={`${s.container} ${s.studioGrid}`}>
          <div>
            <p className={s.eyebrow}>BUILDERS WHO UNDERSTAND THE BUSINESS</p>
            <h2>
              Practical thinking.
              <br />
              Hands-on delivery.
            </h2>
          </div>
          <div>
            <p>
              We build products of our own as well as work for clients. That
              keeps us close to the decisions behind a launch: what to
              prioritise, what to simplify, and what a team needs next.
            </p>
            <p>
              From the first conversation to handover, we connect the technical
              work to the business it serves.
            </p>
            <Action href="/about" secondary>
              Meet Bloop
            </Action>
          </div>
        </div>
      </section>
      <Questions />
      <section className={`${s.container} ${s.resource}`}>
        <div>
          <p className={s.eyebrow}>THE BLOOP PLAYBOOK</p>
          <h2>
            A useful perspective
            <br />
            before you build.
          </h2>
          <p>
            Explore our writing on product decisions, business strategy, and
            practical uses of AI.
          </p>
        </div>
        <Link prefetch={false} href="/playbook" className={s.resourceLink}>
          <span>
            Ideas, experience,
            <br />
            and things worth asking.
          </span>
          <span>
            Read the Playbook <ArrowRight size={20} />
          </span>
        </Link>
      </section>
      <section className={`${s.container} ${s.resource}`}><div><p className={s.eyebrow}>FREE BUSINESS TOOL</p><h2>From enquiry<br />to quotation.</h2><p>Create a quote in GHS, download a PDF and share it on WhatsApp. Save your details for the next customer.</p></div><Link prefetch={false} href="/quote-builder" className={s.resourceLink}><span>A professional quote.<br />No signup needed.</span><span>Open Quote Builder <ArrowRight size={20} /></span></Link></section>
      <ClosingCTA />
    </div>
  );
}
