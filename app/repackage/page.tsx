"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Loader2,
  MessageCircle,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react"

const deadline = new Date("2026-09-30T23:59:59+00:00").getTime()

const websiteBenefits = [
  "A clear, credible home for your brand",
  "Responsive design for phone and desktop",
  "Pages shaped around your offer",
  "Enquiry, booking, or payment pathways",
  "A foundation you can grow from",
]

const appIdeas = [
  "Bookings",
  "Learning",
  "Marketplaces",
  "Communities",
  "Memberships",
  "Payments",
  "Operations",
  "Customer management",
]

const inputClass =
  "mt-2.5 h-16 w-full rounded-xl border border-[#cfc3d0] bg-white px-5 text-base text-[#241028] shadow-[0_1px_0_rgba(36,16,40,0.04)] outline-none transition placeholder:text-[#9b8d9c] hover:border-[#a897aa] focus:border-[#ef5b48] focus:ring-4 focus:ring-[#ef5b48]/10"

const labelClass = "block text-sm font-semibold leading-6 text-[#38243c]"

const steps = [
  ["Complete the form", "Tell us what you want to build. A rough idea is enough."],
  ["Upload what you have", "Share your logo, images, documents, links, or references."],
  ["Skip what you don’t", "Missing content will not prevent you from submitting."],
  ["We review your request", "Our team assesses the project and contacts you."],
  ["We plan your build", "Together, we confirm scope, timeline, and deliverables."],
  ["We start creating", "Your idea moves from conversation to something people can use."],
]

function Countdown() {
  const [remaining, setRemaining] = useState(Math.max(0, deadline - Date.now()))

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, deadline - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining / 3600000) % 24)
  const minutes = Math.floor((remaining / 60000) % 60)
  const seconds = Math.floor((remaining / 1000) % 60)

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-label="Time remaining until the offer ends">
      {[
        [days, "Days"],
        [hours, "Hours"],
        [minutes, "Mins"],
        [seconds, "Secs"],
      ].map(([value, label]) => (
        <div key={label} className="border border-white/20 bg-white/[0.06] px-2 py-4 text-center sm:px-5 sm:py-5">
          <div className="text-2xl font-semibold tabular-nums text-[#fff8ee] sm:text-4xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#cbbdce] sm:text-xs">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function RepackagePage() {
  const [service, setService] = useState("website")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const chooseService = (value: string) => {
    setService(value)
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setMessage("")
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch("/api/repackage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "We could not submit your request.")
      setStatus("success")
      setMessage("Your promo slot request is in. We’ll review it and contact you shortly.")
      form.reset()
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="overflow-hidden bg-[#fff8ee] text-[#241028] selection:bg-[#ef5b48] selection:text-white">
      <section className="relative border-b border-[#241028]/10 px-5 pb-20 pt-32 sm:px-8 lg:min-h-[790px] lg:pb-24 lg:pt-40">
        <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(#7b617e_1px,transparent_1px),linear-gradient(90deg,#7b617e_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 border border-[#ef5b48]/30 bg-[#ffe7db] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#b52f24]">
              <Sparkles className="h-4 w-4" /> Digital Launch Promo · 2026
            </div>
            <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Your business should be <span className="text-[#ef5b48]">online.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f4a62] sm:text-xl">
              Your customers are searching, comparing, and deciding who looks credible enough to trust. Let’s build the digital product that helps them choose you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => chooseService("website")} className="group inline-flex min-h-14 items-center justify-center gap-2 bg-[#ef5b48] px-7 font-semibold text-white transition hover:bg-[#d94535]">
                Claim my promo slot <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a href="#offers" className="inline-flex min-h-14 items-center justify-center border border-[#241028]/25 bg-[#fff8ee] px-7 font-semibold transition hover:border-[#241028]">
                See what’s included
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#705c72]">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ef5b48]" /> No perfect brief needed</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#ef5b48]" /> Ends September 30, 2026</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -left-6 -top-6 h-28 w-28 bg-[#ef5b48]" />
            <div className="relative border border-[#241028]/15 bg-[#241028] p-3 shadow-[18px_18px_0_#d9c4da] sm:p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef5b48]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f4b87a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#b99ec0]" />
                <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-white/45">Your next launch</span>
              </div>
              <div className="grid min-h-[420px] gap-3 sm:grid-cols-[1.15fr_.85fr]">
                <div className="flex flex-col justify-between bg-[#fff8ee] p-6">
                  <div>
                    <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#ef5b48] text-white"><Code2 className="h-5 w-5" /></div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ef5b48]">Built for action</p>
                    <p className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">Look credible.<br />Get chosen.<br />Grow.</p>
                  </div>
                  <div className="mt-8 border-t border-[#241028]/15 pt-5 text-sm leading-6 text-[#6b576d]">One clear place to explain your offer, build trust, and turn attention into action.</div>
                </div>
                <div className="grid gap-3">
                  <div className="flex flex-col justify-between bg-[#ef5b48] p-5 text-white">
                    <MonitorSmartphone className="h-7 w-7" />
                    <div><div className="text-xs uppercase tracking-widest text-white/70">Websites from</div><div className="mt-1 text-3xl font-semibold">GHC 1,999</div></div>
                  </div>
                  <div className="flex flex-col justify-between bg-[#d9c4da] p-5">
                    <Smartphone className="h-7 w-7" />
                    <div><div className="text-xs uppercase tracking-widest text-[#6b576d]">Apps from</div><div className="mt-1 text-3xl font-semibold">GHC 5,999</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#241028] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ef8c7e]">The honest choice</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Keep postponing—or start building.</h2>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              <div className="bg-[#301535] p-7 sm:p-9">
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/50">Keep saying</p>
                <div className="space-y-4 text-lg leading-7 text-white/70">
                  <p>“Our website is coming soon.”</p><p>“We’re still working on the app.”</p><p>“Send us a WhatsApp message.”</p>
                </div>
                <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-[#cbbdce]">Every week you wait gives competitors more time to look established and capture attention.</p>
              </div>
              <div className="bg-[#ef5b48] p-7 sm:p-9">
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Start doing</p>
                <div className="space-y-4 text-lg leading-7">
                  <p>Explain your offer clearly.</p><p>Build trust beyond social media.</p><p>Make it easy to book, buy, or enquire.</p>
                </div>
                <p className="mt-8 border-t border-white/25 pt-6 text-sm leading-6 text-white/85">You do not need a perfect plan. You need to start.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ef5b48]">The Digital Launch Promo</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Pick the right starting point.</h2>
            <p className="mt-5 text-lg leading-8 text-[#6b576d]">Built for businesses, creators, startups, churches, nonprofits, and organizations ready to move from “soon” to live.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col border border-[#241028]/15 bg-white p-7 shadow-[8px_8px_0_#ef5b48] sm:p-10">
              <div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center bg-[#ffe7db] text-[#ef5b48]"><MonitorSmartphone /></div><span className="bg-[#241028] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white">Most popular</span></div>
              <h3 className="mt-9 text-3xl font-semibold tracking-[-0.04em]">Professional Website</h3>
              <div className="mt-3 flex items-end gap-2"><span className="text-sm text-[#6b576d]">from</span><span className="text-5xl font-semibold tracking-[-0.06em]">GHC 1,999</span></div>
              <p className="mt-5 leading-7 text-[#6b576d]">The online home your business should already have—designed to make a stronger first impression and turn visits into action.</p>
              <ul className="mt-7 grid gap-3 text-sm">
                {websiteBenefits.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ef5b48]" />{item}</li>)}
              </ul>
              <button onClick={() => chooseService("website")} className="group mt-9 inline-flex min-h-14 items-center justify-center gap-2 bg-[#241028] px-6 font-semibold text-white transition hover:bg-[#ef5b48]">I want the website promo <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></button>
            </article>

            <article className="flex flex-col border border-[#241028]/15 bg-[#d9c4da] p-7 shadow-[8px_8px_0_#241028] sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center bg-[#241028] text-white"><Smartphone /></div>
              <h3 className="mt-9 text-3xl font-semibold tracking-[-0.04em]">App Development</h3>
              <div className="mt-3 flex items-end gap-2"><span className="text-sm text-[#6b576d]">from</span><span className="text-5xl font-semibold tracking-[-0.06em]">GHC 5,999</span></div>
              <p className="mt-5 leading-7 text-[#59455b]">Turn the idea in your notebook, messages, or imagination into a useful digital product for your customers, team, or community.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {appIdeas.map((item) => <span key={item} className="border border-[#241028]/20 bg-white/50 px-3 py-2 text-sm">{item}</span>)}
              </div>
              <button onClick={() => chooseService("app")} className="group mt-auto pt-9"><span className="inline-flex min-h-14 w-full items-center justify-center gap-2 bg-[#ef5b48] px-6 font-semibold text-white transition hover:bg-[#241028]">I want the app promo <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span></button>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#ef5b48] px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">This is not a “later” offer</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">The deadline is real.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">Submit your project through this page before September 30, 2026 to access promotional pricing. After the deadline, regular rates may apply.</p>
          </div>
          <Countdown />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ef5b48]">Come as you are</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Missing pieces should not stop the launch.</h2></div>
            <p className="text-lg leading-8 text-[#6b576d]">No domain? Incomplete content? No professional images? Not sure which pages or features you need? Submit anyway. We’ll help clarify what should be built.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [FileText, "Copy & messaging", "Website copy, service descriptions, product details, and About pages."],
              [ImageIcon, "Images & visuals", "Professional images, product visuals, and social graphics."],
              [Lightbulb, "Scope clarity", "Help choosing the right pages, features, and launch priorities."],
              [Users, "A human review", "A team that listens, asks the right questions, and helps you move."],
            ].map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof FileText
              return <div key={title as string} className="border border-[#241028]/15 bg-white p-6"><IconComponent className="h-7 w-7 text-[#ef5b48]" /><h3 className="mt-8 text-lg font-semibold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#6b576d]">{body as string}</p></div>
            })}
          </div>
          <p className="mt-5 text-sm text-[#7b697d]">Content and image support is available at an additional charge and will always be discussed before it is added.</p>
        </div>
      </section>

      <section className="border-y border-[#241028]/10 bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ef5b48]">From idea to live</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Here’s what happens after you claim a slot.</h2>
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([title, body], index) => <div key={title} className="border-t border-[#241028]/20 pt-6"><div className="flex items-start gap-5"><span className="text-4xl font-semibold text-[#ef5b48]">0{index + 1}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6b576d]">{body}</p></div></div></div>)}
          </div>
        </div>
      </section>

      <section id="claim" className="scroll-mt-24 bg-[#241028] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ef8c7e]">Claim your promo slot</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Enough “soon.” Let’s start.</h2>
            <p className="mt-6 text-lg leading-8 text-[#cbbdce]">Tell us what you want to build. You can skip the details you do not have and send missing information later.</p>
            <div className="mt-9 space-y-4 text-sm text-[#e8dfe9]">
              <p className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#ef5b48]" />Submission secures access to the promo—not a final project quote.</p>
              <p className="flex gap-3"><MessageCircle className="h-5 w-5 shrink-0 text-[#ef5b48]" />Our team will review your needs and contact you.</p>
              <p className="flex gap-3"><UploadCloud className="h-5 w-5 shrink-0 text-[#ef5b48]" />You can share files and references during follow-up.</p>
            </div>
          </div>

          <form onSubmit={submit} className="border border-[#241028]/10 bg-[#fff8ee] p-7 text-[#241028] shadow-[12px_12px_0_rgba(239,91,72,0.9)] sm:p-10 lg:p-12">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#241028]/10 pb-6">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">Tell us about your project</h3>
                <p className="mt-1 text-sm text-[#7b697d]">Fields marked * are required.</p>
              </div>
              <span className="hidden bg-[#ffe7db] px-3 py-2 text-xs font-semibold text-[#b52f24] sm:block">2–3 minutes</span>
            </div>

            <fieldset>
              <legend className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ef5b48]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ef5b48] text-white">1</span>Your details</legend>
              <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
                <label className={labelClass}>Full name *<input required name="name" autoComplete="name" placeholder="e.g. Ama Mensah" className={inputClass} /></label>
                <label className={labelClass}>Phone / WhatsApp *<input required name="phone" autoComplete="tel" placeholder="e.g. +233 24 000 0000" className={inputClass} /></label>
                <label className={`${labelClass} md:col-span-2`}>Email address *<input required type="email" name="email" autoComplete="email" placeholder="you@business.com" className={inputClass} /></label>
              </div>
            </fieldset>

            <fieldset className="mt-10 border-t border-[#241028]/10 pt-9">
              <legend className="flex items-center gap-3 bg-[#fff8ee] pr-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#ef5b48]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ef5b48] text-white">2</span>Your project</legend>
              <div className="mt-6 grid gap-x-6 gap-y-7 md:grid-cols-2">
                <label className={`${labelClass} md:col-span-2`}>What do you want to build? *<select required name="service" value={service} onChange={(event) => setService(event.target.value)} className={inputClass}><option value="website">Professional website — from GHC 1,999</option><option value="app">App / digital product — from GHC 5,999</option><option value="unsure">I’m not sure yet</option></select></label>
                <label className={`${labelClass} md:col-span-2`}>Tell us about the idea *<textarea required name="project" rows={6} placeholder="What should it help people do? Who is it for? A rough description is completely fine." className="mt-2.5 min-h-[180px] w-full resize-y rounded-xl border border-[#cfc3d0] bg-white p-5 text-base leading-7 text-[#241028] shadow-[0_1px_0_rgba(36,16,40,0.04)] outline-none transition placeholder:text-[#9b8d9c] hover:border-[#a897aa] focus:border-[#ef5b48] focus:ring-4 focus:ring-[#ef5b48]/10" /></label>
                <label className={labelClass}>Preferred timeline<select name="timeline" className={inputClass}><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3 months</option><option>Still exploring</option></select></label>
                <label className={labelClass}>How did you hear about us?<select name="source" className={inputClass}><option>Social media</option><option>Referral</option><option>Google search</option><option>Event or community</option><option>Other</option></select></label>
              </div>
            </fieldset>

            <button disabled={status === "sending" || status === "success"} className="mt-9 inline-flex min-h-16 w-full items-center justify-center gap-2 rounded-xl bg-[#ef5b48] px-6 text-base font-semibold text-white shadow-[0_8px_20px_rgba(239,91,72,0.22)] transition hover:-translate-y-0.5 hover:bg-[#d94535] disabled:cursor-not-allowed disabled:opacity-70">
              {status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin" /> Submitting…</> : status === "success" ? <><CheckCircle2 className="h-5 w-5" /> Slot requested</> : <>Claim my promo slot <ArrowRight className="h-5 w-5" /></>}
            </button>
            {message && <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-green-700"}`}>{message}</p>}
            <p className="mt-5 text-xs leading-5 text-[#7b697d]">Promo access is only available to projects submitted through this page. By submitting, you agree that Bloop Global may contact you about your project.</p>
          </form>
        </div>
      </section>

      <section className="bg-[#fff8ee] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Do not let another year pass with the same excuse.</h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-[#6b576d]">Your business needs a digital product that helps people find you, understand you, and take action. The promo ends September 30, 2026.</p>
          <button onClick={() => chooseService("website")} className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 bg-[#241028] px-7 font-semibold text-white transition hover:bg-[#ef5b48]">Claim my slot before September 30 <ArrowRight className="h-5 w-5" /></button>
          <p className="mx-auto mt-8 max-w-4xl text-xs leading-5 text-[#857386]">Promotional prices are starting rates. Additional services, integrations, hosting, domains, content, images, maintenance, and third-party tools may attract separate charges. Final scope, timeline, and deliverables are confirmed after project review.</p>
        </div>
      </section>
    </div>
  )
}
