# Quote Builder

Route: `/quote-builder`. Entry points: homepage and Playbook.

## What ships
- GHS quotes with logo, line items, delivery, deposit and notes.
- PDF download, including multiple pages; WhatsApp opens prefilled text for the user to review and send. PDFs must be attached separately.
- Optional browser storage for the current draft and last ten exported/shared quotes. Load, duplicate, start a new quote, or uncheck saving to delete stored quotes. No login or cross-device sync.
- Quote details go to the PDF endpoint for generation, are not persisted there, and are never included in analytics.
- An optional enquiry form writes a contact to the existing Stride integration with source **Bloop Quote Builder**, including business, need, role, budget and timeline. No automatic customer emails.

## Measurement
Uses the site's existing `NEXT_PUBLIC_GA_ID`. No additional tracking service.

| Event | Meaning |
| --- | --- |
| `quote_builder_return` | The browser used the tool on a previous UTC day; at most once per day. Use distinct GA users, not event count, for returning users. Device/storage clearing affects accuracy. |
| `quote_pdf_download` | PDF generation succeeded and a browser download was initiated. |
| `quote_whatsapp_open` | User opened the WhatsApp sharing flow; this is not a sent message or enquiry. |
| `quote_enquiry_open` | User opened the Bloop form; not a lead. |
| `quote_enquiry_submitted` | Stride returned a confirmed contact ID. |
| `quote_enquiry_candidate` | Submitted form self-reports decision authority, positive GHS budget and a start within three months. Requires human qualification. |

Weekly: compare distinct returning tool users, distinct PDF users, confirmed enquiries and the number of those contacts subsequently verified as qualified in Stride. A qualified conversation requires a two-way exchange and verified fit, authority, budget and timing. Candidate events must not be reported as qualified conversations.

Stride: filter contacts by source **Bloop Quote Builder** / tag `quote-builder`; verify candidates tagged `qualification-pending`. Existing `STRIDE_API_KEY` and optional `STRIDE_BASE_URL` are used. A failed or unconfirmed CRM write displays an error and produces no lead event. The in-process throttle is a basic safeguard, not a distributed rate limit.

## Validation
`node tests/quote-builder/check.cjs` checks amounts, malformed data, WhatsApp content and a mocked CRM integration. It does not send emails or write live leads.

`node tests/quote-builder/browser.cjs` uses Playwright and a local server on port 3098. The CRM call is mocked. Checks PDF download, saved quote restore, duplicate, WhatsApp URL, enquiry success, returning-use event, data deletion and mobile overflow. Set `PLAYWRIGHT_MODULE` to a locally installed Playwright module if needed.

PDF visual checks: one-item quotation and 30-item quotation, with wrapped descriptions and long notes. Bundled DejaVu fonts retain their license in `public/fonts/quote/LICENSE`.

Publication requires approval. No live enquiry or production deployment was performed while building this feature.
