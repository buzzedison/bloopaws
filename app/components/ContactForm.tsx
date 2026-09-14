"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import * as tracking from "../lib/tracking";

export const CONTACT_SERVICES = [
  "AI & Automation",
  "Web App Development",
  "Mobile App Development",
  "Website Design",
  "Product Design (UI/UX)",
  "Funding & Pitch Strategy",
  "Consulting & Strategy",
  "Other",
];
const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  referral: "",
  promo: "",
};
const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent";

export default function ContactForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const [form, setForm] = useState({
    ...emptyForm,
    service: CONTACT_SERVICES.includes(initialService) ? initialService : "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const update = (name: keyof typeof emptyForm, value: string) =>
    setForm((previous) => ({ ...previous, [name]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request not accepted");
      setStatus("success");
      // Analytics failure must never turn an accepted enquiry into an error state.
      try {
        tracking.event("Contact", {
          content_name: "Contact Form",
          content_category: form.service,
        });
        tracking.ga_event("contact_form_submit", "engagement", form.service);
      } catch {
        /* Enquiry delivery is independent of optional analytics. */
      }
    } catch {
      setStatus("error");
    }
  }
  return (
    <div className="bg-[#f8f6f2] text-zinc-900 pt-32 pb-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-[10px] font-bold tracking-[.18em] uppercase text-red-700 mb-6">
            Start a conversation
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            What do you want
            <br />
            to build or
            <br />
            <span className="text-red-700">make work better?</span>
          </h1>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            Tell us about your product, your business, or the task you want to
            improve. A short brief is enough to start.
          </p>
          <div className="mt-10 border-t border-zinc-300 pt-7">
            <h2 className="font-semibold text-lg mb-5">What happens next</h2>
            <ol className="space-y-4 text-sm text-zinc-600 list-decimal pl-5">
              <li>We review your brief and check whether we can help.</li>
              <li>We follow up with questions or arrange a conversation.</li>
              <li>
                We agree the scope, next steps, and costs before work starts.
              </li>
            </ol>
          </div>
          <div className="mt-9 space-y-3 text-sm">
            <a
              className="flex items-center gap-3 hover:underline"
              href="mailto:ask@bloopglobal.com"
            >
              <Mail size={18} />
              ask@bloopglobal.com
            </a>
            <a
              className="flex items-center gap-3 hover:underline"
              href="tel:+233503874448"
            >
              <Phone size={18} />
              +233 503 874 448
            </a>
            <p className="text-zinc-500 pt-3">NDA available on request.</p>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-9 shadow-sm">
          {status === "success" ? (
            <div role="status" className="py-12">
              <CheckCircle2 className="text-green-700 mb-6" size={42} />
              <h2 className="text-3xl font-bold mb-4">
                Your brief is with us.
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                Thank you. We’ll review what you shared and follow up by email
                with the next step.
              </p>
              <Link
                href="/launchpad"
                className="inline-flex items-center gap-3 mt-8 text-red-700 font-semibold"
              >
                Explore our work <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} aria-busy={status === "sending"}>
              <h2 className="text-2xl font-semibold mb-2">
                Tell us a little about it.
              </h2>
              <p className="text-sm text-zinc-500 mb-7">
                Fields marked * are required.
              </p>
              <fieldset
                disabled={status === "sending"}
                className="space-y-5 disabled:opacity-70"
              >
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Your name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={150}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-service"
                    className="text-sm font-medium"
                  >
                    What do you need help with? *
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    required
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choose a service</option>
                    {CONTACT_SERVICES.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    A little about your project *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="What are you trying to do? Include existing tools, timing, or a budget range if you know them."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-sm font-medium"
                  >
                    Phone{" "}
                    <span className="text-zinc-500 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <details className="text-sm">
                  <summary className="cursor-pointer text-zinc-600 py-2">
                    Referral or promo code?
                  </summary>
                  <div className="space-y-4 pt-3">
                    <div>
                      <label htmlFor="contact-referral">
                        How did you hear about us?
                      </label>
                      <input
                        id="contact-referral"
                        name="referral"
                        maxLength={200}
                        value={form.referral}
                        onChange={(e) => update("referral", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-promo">Promo code</label>
                      <input
                        id="contact-promo"
                        name="promo"
                        maxLength={100}
                        value={form.promo}
                        onChange={(e) => update("promo", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </details>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  We’ll use these details to respond to your enquiry. Read our{" "}
                  <Link href="/privacy-policy" className="underline">
                    privacy policy
                  </Link>
                  .
                </p>
                {status === "error" && (
                  <p
                    role="alert"
                    className="p-4 bg-red-50 text-red-800 rounded-lg text-sm"
                  >
                    We couldn’t confirm your enquiry. Please try again or{" "}
                    <a className="underline" href="mailto:ask@bloopglobal.com">
                      email us directly
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white px-6 py-4 rounded-lg font-semibold inline-flex gap-3 justify-center items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
                >
                  {status === "sending"
                    ? "Sending your brief…"
                    : "Send your brief"}
                  <ArrowRight size={18} />
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
