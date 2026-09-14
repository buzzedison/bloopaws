"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import {
  Download,
  Plus,
  Trash2,
  ArrowUpRight,
  FileText,
  Check,
  MessageCircle,
} from "lucide-react";
import {
  blankQuote,
  Quote,
  totals,
  money,
  validateQuote,
  cents,
} from "./model";
import { whatsappText } from "./model";
import { track, trackVisit } from "./analytics";
import s from "./quote.module.css";
import { prepareLogo } from "./logo";
const KEY = "bloop:quotes:v1";
const input = (
  label: string,
  value: string | number,
  onChange: (value: string) => void,
  props: Record<string, unknown> = {},
) => (
  <label className={s.field}>
    {label}
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  </label>
);
export default function QuoteBuilder() {
  const [q, setQ] = useState<Quote>(() => ({
    ...blankQuote(),
    reference: "",
    date: "",
  }));
  const [saved, setSaved] = useState<Quote[]>([]);
  const [ready, setReady] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [logoBusy, setLogoBusy] = useState(false);
  const [logoMessage, setLogoMessage] = useState("");
  const logoVersion = useRef(0);
  const [showLead, setShowLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [leadBusy, setLeadBusy] = useState(false);
  const quoteForm = useRef<HTMLFormElement>(null);
  const visited = useRef(false);
  useEffect(() => {
    if (visited.current) return;
    visited.current = true;
    trackVisit();
    setQ(blankQuote());
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === 1 && data.draft && Array.isArray(data.quotes)) {
          // Preserve incomplete drafts while rejecting malformed storage data.
          if (!validateQuote(data.draft, true)) setQ(data.draft);
          setSaved(
            data.quotes
              .filter((item: unknown) => !validateQuote(item))
              .slice(0, 10),
          );
          setRemember(true);
        }
      }
    } catch {
      setMessage(
        "Saved details could not be loaded. You can still create a new quote.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready || !remember) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ version: 1, draft: q, quotes: saved }),
      );
    } catch {
      setMessage(
        "This browser could not save your details. Download your PDF before leaving.",
      );
    }
  }, [q, saved, remember, ready]);
  const update = (key: keyof Quote, value: unknown) =>
    setQ((old) => ({ ...old, [key]: value }));
  const valid = () => {
    if (!quoteForm.current?.reportValidity()) return false;
    const error = validateQuote(q);
    if (error) {
      setMessage(error);
      return false;
    }
    return true;
  };
  function rememberQuote() {
    if (remember)
      setSaved((old) =>
        [q, ...old.filter((item) => item.reference !== q.reference)].slice(
          0,
          10,
        ),
      );
  }
  async function download() {
    if (!valid() || busy || logoBusy) return;
    setBusy(true);
    setMessage("Creating your PDF…");
    try {
      const res = await fetch("/api/quote-builder/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      if (!res.ok)
        throw new Error(
          (await res.json()).error || "Could not create PDF. Please try again.",
        );
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = `${q.reference.replace(/[^a-zA-Z0-9_-]/g, "-")}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      rememberQuote();
      track("quote_pdf_download", { item_count: q.items.length });
      setMessage("PDF downloaded. You can attach it to your WhatsApp message.");
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Download failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  function share() {
    if (busy || logoBusy || !valid()) return;
    const w = window.open(
      `https://wa.me/?text=${encodeURIComponent(whatsappText(q))}`,
      "_blank",
      "noopener,noreferrer",
    );
    void w;
    rememberQuote();
    track("quote_whatsapp_open", { item_count: q.items.length });
    setMessage(
      "Choose a recipient in WhatsApp and review before sending. Attach your downloaded PDF separately. If no tab opens, allow pop-ups for this site and try again.",
    );
  }
  function newQuote() {
    if (busy || logoBusy) return;
    if (!validateQuote(q)) rememberQuote();
    const fresh = blankQuote();
    setQ({
      ...fresh,
      business: q.business,
      contact: q.contact,
      logo: q.logo,
      deposit: q.deposit,
      notes: q.notes,
    });
    setMessage("New quote started. Your business details are kept.");
  }
  async function logo(file?: File) {
    if (!file) return;
    const version = ++logoVersion.current;
    setLogoBusy(true);
    setLogoMessage("Preparing your logo…");
    try {
      const result = await prepareLogo(file);
      if (version !== logoVersion.current) return;
      update("logo", result);
      setLogoMessage("Logo added. It will appear on your downloaded PDF.");
    } catch (error) {
      if (version === logoVersion.current)
        setLogoMessage(
          error instanceof Error
            ? error.message
            : "Could not add this logo. Please try again.",
        );
    } finally {
      if (version === logoVersion.current) setLogoBusy(false);
    }
  }
  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (leadBusy) return;
    setLeadBusy(true);
    setLeadStatus("Sending your enquiry…");
    const data = Object.fromEntries(
      Array.from(new FormData(event.currentTarget).entries()).map(
        ([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ],
      ),
    );
    try {
      const res = await fetch("/api/quote-builder/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || "Could not send your enquiry.");
      track("quote_enquiry_submitted");
      if (result.candidate) track("quote_enquiry_candidate");
      setLeadStatus(
        "Your enquiry has been received. Bloop will review your needs and contact you.",
      );
    } catch (e) {
      setLeadStatus(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setLeadBusy(false);
    }
  }
  const t = totals(q);
  return (
    <div className={s.page}>
      <header className={s.hero}>
        <p className={s.eyebrow}>BLOOP TOOLS / FREE TO USE</p>
        <h1>
          Good business.
          <br />
          <span>Great first impression.</span>
        </h1>
        <p>
          Turn a customer enquiry into a professional quote.
          <br />
          Create it here. Download a PDF. Share it on WhatsApp.
        </p>
        <div className={s.pills}>
          <span>
            <Check size={14} /> No signup
          </span>
          <span>
            <Check size={14} /> Prices in GHS
          </span>
          <span>
            <Check size={14} /> Built for your next sale
          </span>
        </div>
      </header>
      <div className={s.workspace}>
        <section className={s.editor} aria-label="Quote editor">
          <div className={s.sectionTitle}>
            <h2>Your quotation</h2>
            <button type="button" onClick={newQuote}>
              New quote <Plus size={16} />
            </button>
          </div>
          <form
            ref={quoteForm}
            onSubmit={(e) => {
              e.preventDefault();
              download();
            }}
          >
            <fieldset disabled={!ready || busy}>
              <h3>
                <span>01</span> Your business
              </h3>
              <div className={s.two}>
                {input(
                  "Business name *",
                  q.business,
                  (v) => update("business", v),
                  {
                    required: true,
                    maxLength: 120,
                    placeholder: "e.g. Ama’s Kitchen",
                  },
                )}
                {input(
                  "Phone / email / address",
                  q.contact,
                  (v) => update("contact", v),
                  {
                    maxLength: 200,
                    placeholder: "How your customer can reach you",
                  },
                )}
              </div>
              <label className={s.upload}>
                Business logo{" "}
                <span>
                  PNG, JPG or WebP · up to 10 MB · resized automatically
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                  aria-describedby="logo-feedback"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    void logo(file);
                  }}
                />
              </label>
              <p id="logo-feedback" role="status" className={s.hint}>
                {logoMessage}
              </p>
              {q.logo && (
                <div className={s.logoPreview}>
                  <img src={q.logo} alt="Uploaded logo" />
                  <button
                    type="button"
                    onClick={() => {
                      logoVersion.current++;
                      setLogoBusy(false);
                      update("logo", "");
                      setLogoMessage("Logo removed.");
                    }}
                  >
                    Remove logo
                  </button>
                </div>
              )}
              <h3>
                <span>02</span> The customer & dates
              </h3>
              <div className={s.two}>
                {input(
                  "Customer name *",
                  q.customer,
                  (v) => update("customer", v),
                  {
                    required: true,
                    maxLength: 120,
                    placeholder: "Who is this quote for?",
                  },
                )}
                {input(
                  "Quote reference *",
                  q.reference,
                  (v) => update("reference", v),
                  { required: true, maxLength: 60 },
                )}
                {input("Quote date *", q.date, (v) => update("date", v), {
                  type: "date",
                  required: true,
                })}
                {input(
                  "Valid until (optional)",
                  q.validUntil,
                  (v) => update("validUntil", v),
                  { type: "date", min: q.date },
                )}
              </div>
              <h3>
                <span>03</span> What are you quoting?
              </h3>
              {q.items.map((item, index) => (
                <div className={s.item} key={index}>
                  {input(
                    `Item ${index + 1} *`,
                    item.description,
                    (v) =>
                      update(
                        "items",
                        q.items.map((i, n) =>
                          n === index ? { ...i, description: v } : i,
                        ),
                      ),
                    {
                      required: true,
                      maxLength: 180,
                      placeholder: "Product or service",
                    },
                  )}
                  {input(
                    "Quantity *",
                    item.quantity,
                    (v) =>
                      update(
                        "items",
                        q.items.map((i, n) =>
                          n === index ? { ...i, quantity: Number(v) } : i,
                        ),
                      ),
                    {
                      type: "number",
                      min: 0.01,
                      max: 100000,
                      step: 0.01,
                      required: true,
                    },
                  )}
                  {input(
                    "Unit price (GHS) *",
                    item.price,
                    (v) =>
                      update(
                        "items",
                        q.items.map((i, n) =>
                          n === index ? { ...i, price: Number(v) } : i,
                        ),
                      ),
                    {
                      type: "number",
                      min: 0,
                      max: 10000000,
                      step: 0.01,
                      required: true,
                    },
                  )}
                  <button
                    className={s.remove}
                    type="button"
                    disabled={q.items.length === 1}
                    aria-label={`Remove item ${index + 1}`}
                    onClick={() =>
                      update(
                        "items",
                        q.items.filter((_, n) => n !== index),
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={s.add}
                disabled={q.items.length >= 30}
                onClick={() =>
                  update("items", [
                    ...q.items,
                    { description: "", quantity: 1, price: 0 },
                  ])
                }
              >
                <Plus size={16} /> Add an item
              </button>
              <div className={s.two}>
                {input(
                  "Delivery / additional charge (GHS)",
                  q.delivery,
                  (v) => update("delivery", Number(v)),
                  { type: "number", min: 0, max: 10000000, step: 0.01 },
                )}
                {input(
                  "Deposit required (%)",
                  q.deposit,
                  (v) => update("deposit", Number(v)),
                  { type: "number", min: 0, max: 100, step: 0.01 },
                )}
              </div>
              <p className={s.hint}>
                No tax is added automatically. Include any applicable tax in
                your prices and explain it below.
              </p>
              <label className={s.field}>
                Notes / payment instructions
                <textarea
                  rows={3}
                  maxLength={1000}
                  value={q.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Delivery arrangements, payment details or terms for this quote"
                />
              </label>
              <div className={s.save}>
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => {
                      setRemember(e.target.checked);
                      if (!e.target.checked) {
                        try {
                          localStorage.removeItem(KEY);
                        } catch {}
                        setSaved([]);
                      }
                    }}
                  />{" "}
                  Save my details and last 10 quotes on this device
                </label>
                <p>
                  Use your own device. No account or cloud backup. Uncheck to
                  remove saved details. Quotes are sent to our server only when
                  you download a PDF and are not stored there.
                </p>
              </div>
              <button type="submit" className={s.primary} disabled={logoBusy}>
                <Download size={18} /> {busy ? "Creating PDF…" : "Download PDF"}
              </button>
              <button type="button" className={s.whatsapp} onClick={share}>
                <MessageCircle size={18} /> Share quote text on WhatsApp
              </button>
            </fieldset>
          </form>
          <p className={s.status} role="status">
            {message}
          </p>
          {saved.length > 0 && (
            <div className={s.history}>
              <h3>Recent quotes</h3>
              <p className={s.hint}>
                Load a quote to edit it, or duplicate it with a new reference
                and date.
              </p>
              {saved.map((item, i) => (
                <div key={i}>
                  <span>
                    {item.customer}
                    <small>{item.reference}</small>
                  </span>
                  <button
                    onClick={() => {
                      setQ(item);
                      setMessage("Saved quote loaded.");
                    }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => {
                      const fresh = blankQuote();
                      setQ({
                        ...item,
                        reference: fresh.reference,
                        date: fresh.date,
                        validUntil: "",
                      });
                      setMessage("Quote duplicated with a new reference.");
                    }}
                  >
                    Duplicate
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        <aside className={s.side}>
          <div className={s.previewLabel}>
            <FileText size={15} /> LIVE PREVIEW <span>GHS</span>
          </div>
          <div className={s.paper}>
            <div className={s.paperHead}>
              <div>
                <p>QUOTATION</p>
                <h2>{q.business || "Your business"}</h2>
              </div>
              {q.logo && <img src={q.logo} alt="Your business logo" />}
            </div>
            <p className={s.contact}>{q.contact || "Your contact details"}</p>
            <div className={s.meta}>
              <div>
                <small>PREPARED FOR</small>
                <strong>{q.customer || "Your customer"}</strong>
              </div>
              <div>
                <small>{q.reference}</small>
                <span>{q.date}</span>
                {q.validUntil && <small>Valid until {q.validUntil}</small>}
              </div>
            </div>
            <div className={s.previewItems}>
              {q.items.map((item, i) => (
                <div key={i}>
                  <span>
                    {item.description || `Item ${i + 1}`}
                    <small>
                      {item.quantity} × {money(item.price)}
                    </small>
                  </span>
                  <strong>
                    {money(Math.round(cents(item.price) * item.quantity) / 100)}
                  </strong>
                </div>
              ))}
            </div>
            <div className={s.totals}>
              <p>
                <span>Subtotal</span>
                {money(t.subtotal)}
              </p>
              <p>
                <span>Delivery / additional charge</span>
                {money(q.delivery)}
              </p>
              <p className={s.grand}>
                <span>Total</span>
                {money(t.total)}
              </p>
              <p>
                <span>Deposit ({q.deposit}%)</span>
                {money(t.deposit)}
              </p>
              <p>
                <span>Balance after deposit</span>
                {money(t.balance)}
              </p>
            </div>
            {q.notes && (
              <div className={s.notes}>
                <small>NOTES / PAYMENT</small>
                <p>{q.notes}</p>
              </div>
            )}
            <div className={s.paperFooter}>Ready for your next sale.</div>
          </div>
          <div className={s.offer}>
            <p className={s.eyebrow}>TAKE THE NEXT STEP</p>
            <h2>
              Let customers order
              <br />
              on your own website.
            </h2>
            <p>
              Bloop builds websites and automations that help you spend less
              time handling each enquiry.
            </p>
            <button
              onClick={() => {
                setShowLead(!showLead);
                if (!showLead) track("quote_enquiry_open");
              }}
            >
              Talk to Bloop <ArrowUpRight size={18} />
            </button>
            {showLead && (
              <form onSubmit={submitLead} className={s.lead}>
                <p>Tell us about your business and what you need.</p>
                <fieldset
                  disabled={
                    leadBusy || leadStatus.startsWith("Your enquiry has")
                  }
                >
                  <label>
                    Your name *
                    <input
                      name="name"
                      required
                      maxLength={120}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Business name *
                    <input
                      name="business"
                      required
                      maxLength={120}
                      defaultValue={q.business}
                    />
                  </label>
                  <label>
                    Email *
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    Phone (optional)
                    <input name="phone" type="tel" maxLength={40} />
                  </label>
                  <label>
                    What do you need? *
                    <select name="service" required>
                      <option value="">Choose a service</option>
                      <option>Website / online shop</option>
                      <option>Mobile app</option>
                      <option>Business automation</option>
                    </select>
                  </label>
                  <label>
                    Your role *
                    <select name="role" required>
                      <option value="">Choose your role</option>
                      <option>Owner / decision-maker</option>
                      <option>Researching for my team</option>
                    </select>
                  </label>
                  <label>
                    Project budget (GHS) *
                    <input
                      name="budget"
                      type="number"
                      min="0"
                      max="100000000"
                      step="1"
                      required
                      placeholder="Enter 0 if undecided"
                    />
                  </label>
                  <label>
                    When would you like to start? *
                    <select name="timeline" required>
                      <option value="">Choose a timeframe</option>
                      <option>Within 1 month</option>
                      <option>Within 3 months</option>
                      <option>Later / exploring</option>
                    </select>
                  </label>
                  <label>
                    What should it help you do? *
                    <textarea
                      name="need"
                      required
                      minLength={15}
                      maxLength={1500}
                      rows={3}
                    />
                  </label>
                  <input
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    className={s.honeypot}
                    aria-hidden="true"
                  />
                  <label className={s.consent}>
                    <input
                      type="checkbox"
                      name="consent"
                      value="yes"
                      required
                    />{" "}
                    I agree that Bloop can contact me about this enquiry.{" "}
                    <a href="/privacy-policy">Privacy policy</a>
                  </label>
                  <button type="submit">
                    {leadBusy ? "Sending…" : "Send my enquiry"}{" "}
                    <ArrowUpRight size={16} />
                  </button>
                </fieldset>
                <p role="status">{leadStatus}</p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
