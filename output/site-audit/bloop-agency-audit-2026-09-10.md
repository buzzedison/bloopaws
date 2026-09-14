# Bloop Global: website and agency positioning review

Reviewed 10 September 2026.

**Recommendation:** Make Bloop easier to choose through a clearer offer, inspectable work, visible senior people, and a dependable enquiry journey. The largest opportunity is to strengthen proof and commercial clarity before expanding the site or spending more on traffic.

## Scope and limits

Reviewed the live homepage, About, portfolio listing and published AgriPro detail, contact, How It Works, Playbook, web services, strategy services, current AI services, and legacy MVP offer. Inspected the homepage at desktop and 390px mobile width and checked mobile navigation. Inspected the repository's public route inventory, service pages, contact handling, content routing, metadata, and analytics implementation. Ran response/title checks against 31 public routes; results are in `route-checks.json` alongside this report.

This is a commercial, content, and sampled usability review. It is not an exhaustive audit of every article, campaign, device, or private account. No analytics, CRM outcomes, project records, testimonials, or contract data were available to verify performance claims. No contact forms were submitted and no emails were sent. HTTP 200 alone was not treated as evidence that a page works. No Lighthouse or field Core Web Vitals score was measured.

The updated AI page from the preceding task is local only. The live site still serves the previous page with ROI guarantees. Findings below distinguish those versions. No website code was changed during this review.

The recommendations provisionally retain both AI automation and product development, pending the owner's preferred commercial focus. This is an information architecture proposal, not a conclusion that both services have equal margins or demand.

## What is already worth keeping

- A recognisable red, black, and white identity and a short primary navigation.
- A clear appeal to non-technical founders on the homepage.
- The claim to have built Bloop-owned products, which can become a compelling demonstration of practical experience once supported with accessible work.
- A detailed [How It Works page](https://www.bloopglobal.com/how-it-works): deliverables, client time, milestones, demos, and handover reduce buyer uncertainty.
- A substantial content archive. Editorial activity already exists; it needs a closer connection to buying decisions.
- Existing contact automation in the repository: Stride contact/deal/activity creation, acknowledgement, internal notification, and scheduled qualification email. Improve and verify this flow instead of commissioning another disconnected lead system.
- The locally updated AI page explains specific business tasks, human handovers, and examples in useful language.

## Priority findings

| Priority | Observed evidence | Buyer implication | Recommended action |
|---|---|---|---|
| P0 | Homepage service cards show “Learn more” as text inside divs. The homepage FAQ's “Get in Touch” button has no navigation/action. | Visitors encounter apparent actions that do nothing. | Use accessible links to the relevant services and contact page; test mouse, touch, and keyboard activation. |
| P0 | Homepage “See how it works” links to `/contact`. | The destination does not match the promise. | Link to `/how-it-works`. |
| P0 | [Web services](https://www.bloopglobal.com/services/web) has “View Case Study” text without links, and empty gradient image panels. | The most important evidence cannot be inspected. | Add real project imagery and functioning project links; remove incomplete cards until ready. |
| P0 | [About](https://www.bloopglobal.com/about) claims 100+ products shipped; [Launchpad](https://www.bloopglobal.com/launchpad) currently lists one project. CrowdPen, TaskWit, and Strideos from the homepage are not represented there. | The site does not substantiate the breadth it claims. This does not establish that the claim is false. | Publish three complete flagship stories first, with permission and evidence. Reconcile the aggregate count and define what counts as a shipped product. |
| P0 | The public AgriPro detail shows metrics including 94% verified accuracy, but little explanatory narrative; the listing falls back to “The Founders / Founder(s)”. | Buyers cannot see who was served, what Bloop did, or how outcomes were measured. | Complete the story, add real attribution or explicitly explained anonymity, measurement period/method, screenshots, and scope. Suppress empty sections and duplicate footer. |
| P0 | The live [AI page](https://www.bloopglobal.com/services/ai) still promises ROI within 90 days and free work until then. The local replacement removes that language. | Public claims remain broader than the new intended offer. | Review and publish the replacement in the normal release process; reconcile other pages that advertise AI pricing or outcomes. |
| P1 | Homepage/About target founders building products, while AI services address established teams' operating work. Strategy and training add more buyer needs. | Prospects have to decide whether Bloop understands their situation. | Organise the site into two obvious paths: Build a product; Automate your business. Lead with the path supported by the strongest profitable work. |
| P1 | [Contact](https://www.bloopglobal.com/contact) is labelled “Book a Call” in navigation but presents a message form with no scheduling interface. Phone is required; a promo field is prominently available. | A promised booking becomes a different task, and discount language competes with premium positioning. | Either call it “Discuss your project” or add an actual scheduling step. Keep the brief short, make phone optional unless operationally necessary, and show promo entry only in relevant campaigns. |
| P1 | Contact promises a response within two hours without visible working hours/time zone. | A commitment may be interpreted as continuous coverage. | Publish the response window that the team can consistently meet and state the coverage hours. Measure actual response times. |
| P1 | [Legacy MVP offer](https://www.bloopglobal.com/web/mvp) sells a landing page/brainstorming/domain/hosting package for GHC 2,500; main process describes software MVPs at $15,000–$50,000. | The same term describes very different scopes and price levels. | Rename the first offer “Idea Validation Landing Page” or equivalent. Define the scope boundary and identify active, expired, and campaign-only offers. Do not simply raise or erase pricing without checking business intent. |
| P1 | About has no named team profiles. Placeholder team data exists in code but is not rendered. | A buyer cannot identify the people accountable for delivery. | Add the real founder and delivery leads, portraits, relevant experience, roles, and professional profile links. Remove unused placeholder bios from code. |
| P1 | Strategy has unnamed success examples with precise growth percentages; homepage FAQs include statistics and outcome assertions without supporting links. | High specificity without verification can undermine trust. | Create a claims register. Substantiate, contextualise, clearly label illustrations, or remove each claim. Do not replace them with invented testimonials. |
| P1 | Homepage promises templates/models/checklists through the Playbook, but the destination is primarily articles and newsletter signup. Article cards say “Access Case Study” even for general opinion pieces. | Resource labels and destinations do not match expectations. | Provide direct access to promised assets or rewrite the teaser. Separate Articles, Templates, and Client Stories with accurate labels. |
| P1 | `/robots.txt` and `/sitemap.xml` respond with HTML, not their intended formats; footer points to `/sitemap`. Catch-all post handling shows a loading state when no post exists. | Missing content can appear as a successful, perpetually loading page; discovery infrastructure is incomplete. | Implement actual robots/sitemap routes, proper not-found responses, and a working footer destination. Validate content type and body, not only status. |
| P2 | Several services inherit “Elite Services”; some titles duplicate Bloop Global. Homepage source includes a placeholder telephone and verification value. Articles have both root-slug and `/insight/slug` paths. | Search/snippet identity and URL ownership are inconsistent. | Unique service metadata, verified organisation data, one canonical article route with redirects from alternatives, and a sitemap containing intended public URLs. |
| P2 | Web, strategy, mobile, resources, and legacy offer pages use different palettes/layout conventions. The mobile homepage is roughly 13,500 CSS pixels tall in the sampled viewport. | The experience feels assembled from separate revisions; proof requires considerable scrolling. | Establish shared page styles, reduce repeated introductory copy and decorative blocks, and place relevant work much earlier. |

### Implementation pointers

- `app/components/HeroInnovative.tsx:168`: process CTA destination.
- `app/components/ServicesInnovative.tsx:251`: service-card action is a div/span.
- `app/components/FAQInnovative.tsx:157`: inert contact button.
- `app/services/web/WebServicesClient.tsx:530`: empty project visual panel; line 549 contains the non-link case-study label.
- `app/about/page.jsx:31`: unused team placeholders; line 54 contains the product-count claim.
- `app/launchpad/[slug]/page.tsx`: client-side content fetch, empty optional sections, and page-specific footer need review.
- `app/components/ContactForm.tsx`: label associations, service-selection semantics, short brief, and correct CTA language.
- `app/api/contact/route.ts:22`: CRM errors are logged but callers proceed without checking `ok`. Email send results also need explicit checking. Consequently, success does not establish that every downstream delivery succeeded. This is a code finding; no real lost lead was demonstrated.
- `app/[slug]/page.tsx` and `app/insight/components/NewPost.tsx:103`: missing-post handling.
- `app/page.js:52` and `app/page.js:129`: placeholder metadata.
- `app/services/layout.js:2`: generic inherited title.

## Commercial positioning

Bloop's most promising differentiator is the combination of building products and applying those skills to business operations. Make that specific and demonstrate it. “Fast”, “scalable”, “modern”, and “results-driven” are easy for any agency to claim.

Suggested umbrella language to test:

> We build digital products and automate the work around them.
>
> Bloop helps founders launch web and mobile products, and helps growing teams connect enquiries, customers, and operations—with a clear scope, working demos, and a team you can speak to.

Two prominent paths:

| Path | Buyer | Buying problem | Evidence to show |
|---|---|---|---|
| Build a product | A founder or product owner with a defined problem and realistic delivery budget | Turn an idea or existing product into usable software | Shipped screens, live demo, Bloop's role, milestones, handover, adoption evidence |
| Automate your business | An owner or operations lead with recurring work across existing tools | Improve lead response, customer service, handovers, or internal processing | Before/after process, working demonstration, human approval points, measured time/error/response changes |

Give strategy and training a clear supporting role in each path. Preserve standalone services only where there is a defined buyer, repeatable scope, profitable delivery, and evidence. Select any industry specialism using actual wins and profitability; do not invent expertise or open ten thin industry pages.

Before choosing the homepage's dominant path, review the last 10–20 projects: fee, gross margin, sales cycle, delivery difficulty, repeat work, client satisfaction, and permission to publish evidence. That decision should be informed by Bloop's business records.

## What to add

**1. Three complete flagship case studies.** Each should contain the client/product context, original constraint, Bloop's precise role, delivery period, meaningful product images, a short walkthrough, decisions and tradeoffs, a measurable outcome with its source/period, and an approved named quote where available. Clearly distinguish Bloop-owned ventures from external client engagements. An internal product proves building ability; client delivery also needs evidence of collaboration and accountability.

**2. One interactive or recorded automation demonstration.** Use a small example: enquiry → qualification → CRM → human follow-up. Let buyers inspect both the automated steps and escalation behaviour. Label demo data and sample conversations. The new AI page's vector examples explain the offer, but do not yet prove a delivered system.

**3. Real people and delivery artefacts.** Show who leads discovery, design, engineering, and support. Add an anonymised sample brief, scope outline, sprint update, and handover checklist. Use genuine team photography here. The generated image on the new AI page is illustrative and must not become evidence of Bloop's staff or office.

**4. Clearly defined ways to engage.** A paid discovery/scope engagement; a fixed-scope product build or automation implementation; and an ongoing improvement/support agreement. Each needs fit criteria, deliverables, exclusions, client inputs, realistic timeline guidance, and commercial structure. Publish starting prices only when they are approved and consistently supportable. Avoid making each service another unrelated package catalogue.

**5. A concise fit guide.** Explain the projects Bloop can serve well, what clients need ready, what happens on the first conversation, and when a smaller solution is appropriate. “Technical co-founder” should clarify what the engagement includes and whether it is an ordinary fee-based service.

## Proposed site structure and homepage

Primary navigation: **Work · Services · How We Work · About · Insights · Discuss Your Project**. “Work” or “Case Studies” communicates the destination more directly than “Launchpad”; the existing URL can remain if migration adds no value.

Homepage sequence:

1. Specific promise, two buyer paths, one primary enquiry action and a secondary work link.
2. A featured project immediately, with real screens and a verifiable outcome or quote.
3. Two focused service paths and the situations they serve.
4. Two more selected projects; distinguish client work and Bloop ventures.
5. Short delivery process with a link to the existing detailed page.
6. Named people and an example of how collaboration works.
7. Ways to engage and qualification guidance.
8. Useful FAQs about scope, ownership, costs, changes, and ongoing support.
9. One relevant resource and final enquiry action.

Keep the red/black identity. Replace the large abstract homepage orb with product evidence or a genuine working demonstration. Keep vectors for explaining processes and use screenshots for proving work. Standardise typography, spacing, buttons, section widths, and motion. Respect reduced-motion preferences and keyboard navigation. Avoid adding animation merely to make the site look expensive.

## Turning the site into demand

A stronger site can improve buyer confidence; being sought after also requires a repeatable source of reputation and introductions.

- After every successful delivery, capture baseline/end-state evidence, request permission for a story, and ask the client for a specific introduction when appropriate.
- Publish one practical delivery note each week and one deeper case study or teardown each month. These are proposed operating cadences, not claims about an algorithm.
- Cover buying decisions: what a WhatsApp-to-CRM implementation includes; the limits of a chatbot; landing page versus software MVP; maintaining an automation after launch; what clients receive at handover.
- Connect each article to the relevant service and example. Keep general opinion content, but give buyers concrete implementation evidence and author experience.
- Develop a few referral relationships with complementary agencies, fractional operators, and founder communities. Give each partner a precise description of a suitable introduction and a relevant proof page.
- Use existing products as demonstrations of judgement and delivery; explain ownership transparently.
- Expand paid acquisition once the destination, offer, follow-up, and qualification measurement work reliably.

For reference, [thoughtbot's homepage](https://thoughtbot.com/) puts a named case study and an attributed client quote close to its opening proposition. [Work & Co](https://work.co/) makes recent work, outcomes, process, and leadership readily accessible. The applicable principle is to make expertise inspectable; neither their scale nor their wording needs to be copied.

## Proposed 90-day sequence

| When | Work | Suggested accountable role | Definition of done |
|---|---|---|---|
| Days 1–7 | Repair inert/misdirected links; fix missing-route/robots/sitemap behaviour; remove placeholder metadata; audit public claims and active offers; verify contact error handling using an isolated test destination | Engineering lead + commercial owner | All core CTAs reach the promised destination; missing routes behave correctly; intended crawl endpoints have correct bodies; lead failures are visible and recoverable |
| Days 8–21 | Decide lead positioning using project economics; gather three proof packs; complete one flagship story; replace About gaps; define service and pricing terminology | Founder/commercial owner + project leads | Approved proposition and claims; real named people; first complete evidence-rich story with publication permission |
| Days 22–45 | Rebuild homepage hierarchy; unify core services; complete remaining two stories; clarify enquiry/scheduling; connect approved pricing and scopes | Design/content + engineering + sales | Two buyer paths, three linked case studies, coherent core page styles, accessible enquiry flow, tested CRM attribution |
| Days 46–90 | Publish demonstrations and decision-support content; distribute through founder and partner channels; establish referral asks and post-project reviews; improve based on qualified leads | Founder + content + client lead | Regular publishing/distribution process, attributable introductions, monthly lead-quality review, documented improvements |

The schedule depends on access to authentic project evidence and available delivery capacity. Publishing incomplete or invented proof would defeat the purpose.

## Measurement

Preserve the existing analytics and CRM investments. The repository includes GA/Meta event helpers and contact submission tracking; their presence does not establish live configuration or data quality.

Use a single journey: relevant service/work view → enquiry started → enquiry accepted → qualified lead → call booked → proposal → won project → repeat work/referral. Define a qualified lead as a project matching an offered service, an acceptable budget, a feasible timing window, and a reachable decision-maker; refine that definition with the owner.

Report monthly:

- Qualified enquiries by landing page, service, and acquisition source.
- Qualified-enquiry rate, with the same agreed denominator each month.
- Time to first human response within the stated coverage window.
- Qualified lead → call → proposal → win conversion.
- Average project value and gross margin by service.
- Returning-client and referral contribution.
- Which case studies are viewed before enquiries.

Record a baseline before setting growth targets. A lower volume of enquiries can be an improvement if fit, win rate, margin, and client outcomes rise. No uplift percentage can responsibly be predicted from this website review alone.

## Evidence to gather next

Actual client/project roster; which ventures Bloop owns; approved outcomes and measurement methods; client publication permissions; real team roles and biographies; approved current offers and pricing; delivery capacity and response coverage; and current CRM/analytics funnel data.

The first investment should be a coordinated homepage, portfolio, About, and enquiry improvement. Those four surfaces carry the clearest opportunity to help a serious buyer understand Bloop, verify its work, and start a suitable project.
