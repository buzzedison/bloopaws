# Agency refresh — implementation notes

Implemented locally on 10 September 2026. Not deployed.

- Rebuilt homepage with two service paths, existing project imagery, selected work, practical process, accessible FAQs, and a consistent enquiry action.
- Unified services overview, web development, strategy, training, and About. Mobile service URL now redirects to the combined development page.
- Added four project showcases using existing site descriptions and assets. My Centre Office and Special Homes are labelled client work; TaskWit is labelled a Bloop venture; AgriPro remains a project showcase. Quantified outcomes and testimonial quotes were not copied into the new stories.
- Preserved additional CMS projects in the portfolio. Curated content for the four known slugs is held in app/lib/agency-content.js; CMS changes to those slugs do not overwrite that curated copy. Their original CMS records were not modified.
- Updated navigation/footer wording while preserving the pre-existing founder funnel visibility rules.
- Simplified contact form, retained the existing API payload, added service preselection, optional phone, explicit field labels, browser validation, and status/error announcements. Referral/promo inputs are in an optional disclosure.
- Added real robots.txt and sitemap.xml, missing-content 404 handling, legacy project redirects, and canonical article redirection. Renamed the legacy landing-page offer to clarify scope; its price remains unchanged.

Validation: production build passed; TypeScript passed; changed-file lint passed with the existing Navbar supabase dependency warning. Build retains existing content/client-rendering and styling warnings. Verified core route responses, four project routes, missing-page/project/article 404s, valid sitemap XML (38 URLs), robots output, mobile navigation, FAQ expansion, contact service selection and required-field validation. No real enquiry was submitted; CRM/email delivery was not tested or changed. Desktop and 390px mobile previews showed no horizontal overflow or failed images on the homepage.

Still needed: approved real team biographies/portraits, permission-backed client quotes, and evidence for measurable outcomes. Additional campaign pages and the broader article archive have not been redesigned in this pass. The contact backend's delivery/retry behaviour remains a separate item from the preceding audit.
