import {
  Action,
  ProjectCards,
  ClosingCTA,
} from "../components/agency/AgencySections";
import s from "../components/agency/agency.module.css";
export default function AboutPage() {
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <p className={s.eyebrow}>ABOUT BLOOP</p>
          <h1>
            We connect the build
            <br />
            <em>to the business.</em>
          </h1>
          <p className={s.intro}>
            Bloop Global is a product development and automation studio. We work
            with founders launching digital products and teams improving how
            their business runs.
          </p>
          <div className={s.actions}>
            <Action />
            <Action href="/launchpad" secondary>
              Explore our work
            </Action>
          </div>
        </div>
      </section>
      <section className={s.studio}>
        <div className={`${s.container} ${s.studioGrid}`}>
          <h2>
            We build for clients.
            <br />
            We build ventures
            <br />
            of our own.
          </h2>
          <div>
            <p>
              Our experience includes products such as CrowdPen and TaskWit,
              alongside work for businesses with their own customers, teams, and
              goals.
            </p>
            <p>
              That gives us a practical interest in what happens beyond the
              screen: how someone finds the product, how they use it, and how
              the team behind it keeps it working.
            </p>
            <Action href="/how-it-works" secondary>
              How we work with you
            </Action>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>WHAT YOU CAN EXPECT</p>
            <h2>
              A working relationship
              <br />
              with a clear plan.
            </h2>
          </div>
        </div>
        <div className={s.values}>
          {[
            [
              "Business context first",
              "We start with the problem and the people involved. A simpler solution may be the right one; we discuss the options before committing to a build.",
            ],
            [
              "Decisions you can follow",
              "We explain the scope, tradeoffs, and next steps in plain language, and agree changes with you as the project develops.",
            ],
            [
              "Progress you can review",
              "Design reviews and working demos give you a way to see the project taking shape and contribute useful feedback.",
            ],
            [
              "A practical handover",
              "We agree the access, documentation, and training your team needs, along with any support after launch.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.workSection}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <h2>
              Get to know us
              <br />
              through the work.
            </h2>
            <Action href="/launchpad" secondary>
              Selected projects
            </Action>
          </div>
          <ProjectCards />
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
