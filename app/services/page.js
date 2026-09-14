import {
  Action,
  ServicePaths,
  ProjectCards,
  ClosingCTA,
} from "../components/agency/AgencySections";
import s from "../components/agency/agency.module.css";
export const metadata = {
  title: "Product Development & Automation Services",
  description:
    "Build a digital product or automate your business with Bloop. Explore development, AI, strategy, and training services.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <p className={s.eyebrow}>WHAT WE CAN HELP YOU BUILD</p>
          <h1>
            A better product.
            <br />
            <em>A better way to work.</em>
          </h1>
          <p className={s.intro}>
            Bring us the problem, the idea, or the process that needs improving.
            We’ll help you define the scope and build the right solution.
          </p>
          <div className={s.actions}>
            <Action />
            <Action href="/how-it-works" secondary>
              See how we work
            </Action>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <ServicePaths />
      </section>
      <section className={s.workSection}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>SUPPORT AROUND THE BUILD</p>
              <h2>
                Make the right decisions.
                <br />
                Bring your team with you.
              </h2>
            </div>
          </div>
          <div className={s.pathGrid}>
            <article className={s.smallCard}>
              <h3>Strategy & project planning</h3>
              <p>
                Shape the product, business model, or go-to-market plan before
                committing to a larger build. We also support pitch materials
                and investor preparation.
              </p>
              <Action href="/services/strategy" secondary>
                Explore strategy support
              </Action>
            </article>
            <article className={s.smallCard}>
              <h3>Training & handover</h3>
              <p>
                Help your team use and manage what we build. Agree on
                documentation, walkthroughs, workshops, and any ongoing support
                your project needs.
              </p>
              <Action href="/services/training" secondary>
                Explore training
              </Action>
            </article>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <h2>
            See the work behind
            <br />
            the services.
          </h2>
          <Action href="/launchpad" secondary>
            Explore our work
          </Action>
        </div>
        <ProjectCards />
      </section>
      <ClosingCTA />
    </div>
  );
}
