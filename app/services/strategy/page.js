import { Action, ClosingCTA } from "../../components/agency/AgencySections";
import s from "../../components/agency/agency.module.css";
export const metadata = {
  title: "Business & Product Strategy",
  description:
    "Clarify your product, go-to-market plan, business model, and investor materials with practical strategy support from Bloop.",
};
export default function StrategyPage() {
  return (
    <div className={s.page}>
      <section className={s.pageHero}>
        <div className={s.container}>
          <p className={s.eyebrow}>STRATEGY & PROJECT PLANNING</p>
          <h1>
            Make the next decision
            <br />
            <em>with a clearer plan.</em>
          </h1>
          <p className={s.intro}>
            Define the product, the offer, and the path to market before
            committing more time and money. We help turn the questions around
            your business into a practical plan.
          </p>
          <div className={s.actions}>
            <Action href="/contact?service=Consulting%20%26%20Strategy">
              Discuss your challenge
            </Action>
          </div>
        </div>
      </section>
      <section className={`${s.container} ${s.section}`}>
        <div className={s.smallGrid}>
          {[
            [
              "Product & business model",
              "Clarify the customer, the problem, and the first useful version of your solution.",
              [
                "Customer and problem definition",
                "Value proposition and business model",
                "Product priorities and roadmap",
              ],
            ],
            [
              "Go-to-market & growth",
              "Decide how to reach customers and test your assumptions.",
              [
                "Positioning and audience priorities",
                "Pricing and channel options",
                "Launch plan and measurement",
              ],
            ],
            [
              "Investor preparation",
              "Explain your business clearly and prepare for investor conversations.",
              [
                "Pitch narrative and deck",
                "Financial model and assumptions",
                "Investor targeting and pitch preparation",
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
            A defined question.
            <br />A useful deliverable.
          </h2>
          <div>
            <p>
              We agree the decisions to support, the information available, and
              the output you need. That could be a product roadmap, a
              go-to-market plan, or a set of investor materials.
            </p>
            <p>
              Your proposal sets out the scope, review points, and costs.
              Strategy can be a standalone engagement or part of a product
              build.
            </p>
            <Action href="/services/web" secondary>
              Explore product development
            </Action>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
