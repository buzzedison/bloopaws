import { Action, ClosingCTA } from "../../components/agency/AgencySections";
import s from "../../components/agency/agency.module.css";
export const metadata = {
  title: "Team Training & Handover",
  description:
    "Practical training, documentation, and handover to help your team use and manage digital products and AI workflows.",
};
export default function TrainingPage() {
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <p className={s.eyebrow}>TRAINING & HANDOVER</p>
          <h1>
            Build your team’s
            <br />
            <em>confidence with the tools.</em>
          </h1>
          <p className={s.intro}>
            A useful system needs people who can work with it. We help your team
            understand the product, manage everyday tasks, and know when to ask
            for support.
          </p>
          <div className={s.actions}>
            <Action href="/contact?service=Other">
              Discuss your training needs
            </Action>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.smallGrid}>
          {[
            [
              "Product handover",
              "Walk through what was built, how to use it, and how the team will manage it.",
              [
                "Product walkthroughs",
                "Agreed documentation and access",
                "Questions and follow-up actions",
              ],
            ],
            [
              "AI tools & workflows",
              "Help staff use AI in the context of their actual work.",
              [
                "Practical use cases and exercises",
                "Review and human handover steps",
                "Day-to-day workflow guidance",
              ],
            ],
            [
              "Team workshops",
              "Shape a session around the decisions and skills your team needs.",
              [
                "Product and operational workflows",
                "Hands-on sessions for your team",
                "Materials and agreed next steps",
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
      <section className={s.studio}>
        <div className={`${s.container} ${s.studioGrid}`}>
          <h2>
            Start with the team
            <br />
            and the job to be done.
          </h2>
          <div>
            <p>
              We agree the audience, learning goals, format, and materials
              before the session. Training can accompany a Bloop build or be
              scoped as a separate engagement.
            </p>
            <Action href="/how-it-works" secondary>
              See our delivery process
            </Action>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
