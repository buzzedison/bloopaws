import {
  Action,
  ProjectCards,
  Questions,
  ClosingCTA,
} from "../../components/agency/AgencySections";
import { projects } from "../../lib/agency-content";
import s from "../../components/agency/agency.module.css";
export const metadata = {
  title: "Websites, Web Apps & Mobile Development",
  description:
    "Product design and development for founders and growing businesses. Websites, web applications, mobile apps, and practical handover.",
  alternates: { canonical: "/services/web" },
};
export default function WebServicesPage() {
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <p className={s.eyebrow}>FOR FOUNDERS & PRODUCT TEAMS</p>
          <h1>
            From a useful idea
            <br />
            <em>to a working product.</em>
          </h1>
          <p className={s.intro}>
            We design and build websites, web applications, and mobile
            experiences around the people who use them—and the business behind
            them.
          </p>
          <div className={s.actions}>
            <Action href="/contact?service=Web%20App%20Development">
              Discuss your build
            </Action>
            <Action href="#work" secondary>
              Explore relevant work
            </Action>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <h2>
            Start with what
            <br />
            your users need.
          </h2>
        </div>
        <div className={s.smallGrid}>
          {[
            [
              "Websites & e-commerce",
              "Help people understand your business, explore your offer, and enquire or buy.",
              [
                "Content structure and design",
                "Responsive development",
                "Enquiry, booking, or payment integrations",
              ],
            ],
            [
              "Web applications",
              "Give customers or staff a useful place to complete the work they came to do.",
              [
                "Product flows and interface design",
                "Accounts, data, and integrations",
                "Testing and deployment",
              ],
            ],
            [
              "Mobile applications",
              "Build a focused experience for people using your product on the move.",
              [
                "iOS and Android planning",
                "Interface and application development",
                "Release preparation and handover",
              ],
            ],
          ].map(([title, desc, items]) => (
            <article className={s.smallCard} key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className={s.workSection} id="work">
        <div className={s.container}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>SELECTED PROJECTS</p>
              <h2>Explore the work.</h2>
            </div>
            <Action href="/launchpad" secondary>
              All selected projects
            </Action>
          </div>
          <ProjectCards
            items={["stride", "myco", "taskwit"].map((slug) =>
              projects.find((project) => project.slug === slug),
            )}
          />
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.sectionHead}>
          <h2>
            A clear scope.
            <br />A shared view of progress.
          </h2>
          <Action href="/how-it-works" secondary>
            Our delivery process
          </Action>
        </div>
        <ol className={s.steps}>
          {[
            [
              "Plan the first useful version",
              "We prioritise the jobs your product must do and define scope, milestones, and costs.",
            ],
            [
              "Design, build, and review",
              "You review flows and working builds throughout the project, with agreed feedback points.",
            ],
            [
              "Launch and equip your team",
              "We test the agreed journeys and provide the access, documentation, and training set out in your proposal.",
            ],
          ].map(([title, desc], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
      </section>
      <Questions />
      <ClosingCTA />
    </div>
  );
}
