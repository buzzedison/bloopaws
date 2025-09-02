import Link from "next/link";
import Image from "next/image";
import FundingForm from "./FundingForm";

export const metadata = {
  title: "Funding for Startups & Entrepreneurs | Bloop Global",
  description: "Get funding for your startup with Bloop Global. Access equity, grants, micro-funding, and build credits through our partners: EV Venture Studio, Crowdpen Creators Fund, Pitch Perfect, and Agripro Micro Funding.",
  keywords: [
    "startup funding",
    "entrepreneur funding",
    "venture capital",
    "startup grants",
    "micro-funding",
    "build credits",
    "startup loans",
    "pitch perfect",
    "EV Venture Studio",
    "Crowdpen Creators Fund",
    "Agripro Micro Funding",
    "funding for creators",
    "funding for agribusiness",
    "funding for tech startups"
  ],
  authors: [{ name: "Bloop Global" }],
  creator: "Bloop Global",
  publisher: "Bloop Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bloopglobal.com'),
  alternates: {
    canonical: '/funding',
  },
  openGraph: {
    title: "Funding for Startups & Entrepreneurs | Bloop Global",
    description: "Get funding for your startup with Bloop Global. Access equity, grants, micro-funding, and build credits through our partners: EV Venture Studio, Crowdpen Creators Fund, Pitch Perfect, and Agripro Micro Funding.",
    url: "https://bloopglobal.com/funding",
    siteName: "Bloop Global",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/funding.png",
        width: 1200,
        height: 630,
        alt: "Bloop Global Funding Pathways",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Funding for Startups & Entrepreneurs | Bloop Global",
    description: "Get funding for your startup with Bloop Global. Access equity, grants, micro-funding, and build credits through our partners.",
    images: ["/images/funding.png"],
    creator: "@bloopglobal",
    site: "@bloopglobal",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200/40 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-200">
      {children}
    </span>
  );
}

export default function FundingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Startup Funding Services",
    "description": "Get funding for your startup with Bloop Global. Access equity, grants, micro-funding, and build credits through our partners.",
    "provider": {
      "@type": "Organization",
      "name": "Bloop Global",
      "url": "https://bloopglobal.com",
      "logo": "https://bloopglobal.com/logo.svg"
    },
    "serviceType": "Financial Services",
    "areaServed": "Global",
    "offers": [
      {
        "@type": "Offer",
        "name": "EV Venture Studio",
        "description": "Build-with-you capital with product, design, and go-to-market support plus milestone-based funding."
      },
      {
        "@type": "Offer",
        "name": "Crowdpen Creators Fund",
        "description": "Micro-grants and distribution for writers and creators building audiences and products."
      },
      {
        "@type": "Offer",
        "name": "Pitch Perfect",
        "description": "Investor-readiness program to sharpen your story and get warm introductions at showcases."
      },
      {
        "@type": "Offer",
        "name": "Agripro Micro Funding",
        "description": "Micro-capital for agribusiness and climate-smart ventures with field support."
      }
    ],
    "potentialAction": {
      "@type": "ApplyAction",
      "target": "https://bloopglobal.com/funding#apply",
      "description": "Apply for funding through Bloop Global"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative isolate">
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Pill>Equity</Pill>
                <Pill>Grants</Pill>
                <Pill>Micro‑funding</Pill>
                <Pill>Build credits</Pill>
                <Pill>Distribution</Pill>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Funding that meets you where you are.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
                We've partnered with <strong>EV Venture Studio</strong>, the <strong>Crowdpen Creators Fund</strong>, <strong>Pitch Perfect</strong>, and <strong>Agripro Micro Funding</strong> to unlock capital, build support, and distribution for builders, creators, and agripreneurs.
              </p>
              <p className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                Need help with <Link href="/services" className="text-red-600 hover:text-red-700 underline">product development</Link> or <Link href="/services/training" className="text-red-600 hover:text-red-700 underline">team training</Link> before applying for funding?
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Apply once — we match you
                </Link>
                <Link
                  href="#tracks"
                  className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-5 py-3 text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800/50"
                >
                  Explore pathways
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500"/> Rolling reviews</div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500"/> Global applicants welcome</div>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.12),transparent_60%)]" />
              <Image
                src="/images/funding.png"
                alt="Bloop Global funding pathways: EV Venture Studio, Crowdpen Creators Fund, Pitch Perfect, and Agripro Micro Funding - startup funding options for entrepreneurs"
                width={900}
                height={700}
                className="mx-auto h-auto w-full max-w-xl rounded-3xl shadow-2xl ring-1 ring-black/5"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Tracks */}
      <section id="tracks" className="bg-white py-16 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Choose your pathway</h2>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-300">
              One application. We route you to the best‑fit partner(s) for your stage and goals.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* EV Venture Studio */}
            <article id="ev-studio" className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Image src="/images/evlogosmall.png" alt="EV Venture Studio - Build-with-you capital and milestone-based funding for startups" width={40} height={40} />
                <h3 className="text-lg font-semibold">EV Venture Studio</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Build‑with‑you capital. We co‑create your <span className="font-medium">MVP → traction</span> with product, design, and go‑to‑market support plus milestone‑based funding.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Studio support</Pill>
                <Pill>Equity</Pill>
                <Pill>Build credits</Pill>
              </div>
              <div className="mt-5">
                <Link href="#apply" className="text-red-600 underline-offset-4 hover:underline">Apply via Bloop</Link>
              </div>
            </article>

            {/* Crowdpen Creators Fund */}
            <article id="creators-fund" className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Image src="/images/crowdpen.png" alt="Crowdpen Creators Fund - Micro-grants and distribution for writers and creators" width={40} height={40} />
                <h3 className="text-lg font-semibold">Crowdpen Creators Fund</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Micro‑grants and distribution for writers and creators building audiences and products on Crowdpen. Includes editorial support and growth experiments.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Grant</Pill>
                <Pill>Distribution</Pill>
                <Pill>Creator growth</Pill>
              </div>
              <div className="mt-5">
                <Link href="#apply" className="text-red-600 underline-offset-4 hover:underline">Apply via Bloop</Link>
              </div>
            </article>

            {/* Pitch Perfect */}
            <article id="pitch-perfect" className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Image src="/logos/pitch-perfect.svg" alt="Pitch Perfect - Investor-readiness program for startup founders" width={40} height={40} />
                <h3 className="text-lg font-semibold">Pitch Perfect</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Investor‑readiness program: sharpen your story, craft a winning deck, rehearse the pitch, and get warm introductions at showcases and demo days.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Non‑dilutive</Pill>
                <Pill>Training</Pill>
                <Pill>Warm intros</Pill>
              </div>
              <div className="mt-5">
                <Link href="#apply" className="text-red-600 underline-offset-4 hover:underline">Apply via Bloop</Link>
              </div>
            </article>

            {/* Agripro Micro Funding */}
            <article id="agripro" className="group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <Image src="/images/agripro.png" alt="Agripro Micro Funding - Micro-capital for agribusiness and climate-smart ventures" width={40} height={40} />
                <h3 className="text-lg font-semibold">Agripro Micro Funding</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Micro‑capital for agribusiness and climate‑smart ventures. Pair funding with field support via Ayeeko and the Agripro network where relevant.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Micro‑funding</Pill>
                <Pill>Sector‑focused</Pill>
                <Pill>Advisory</Pill>
              </div>
              <div className="mt-5">
                <Link href="#apply" className="text-red-600 underline-offset-4 hover:underline">Apply via Bloop</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Apply once",
                d: "Tell us about your product, traction, and goals. One form covers all pathways.",
              },
              {
                n: "02",
                t: "We match you",
                d: "Our team routes your application to the best‑fit partner(s) for your stage and sector.",
              },
              {
                n: "03",
                t: "Review & decision",
                d: "You may be invited to a short call, product demo, or pitch review.",
              },
              {
                n: "04",
                t: "Build & grow",
                d: "Access capital, build credits, coaching, and distribution. Execute milestones together.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="text-sm font-mono text-neutral-400">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">What you get with Bloop + partners</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Practical support designed for momentum.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Capital that fits",
                d: "From micro‑grants and micro‑funding to studio equity. Terms vary by pathway.",
              },
              {
                t: "Build credits",
                d: "Hands‑on product, design, and engineering support from the Bloop team.",
              },
              {
                t: "Go‑to‑market",
                d: "Positioning, pricing, landing pages, funnels, and creative assets that convert.",
              },
              {
                t: "Distribution",
                d: "Audience growth via Crowdpen, partner showcases, and community spotlights.",
              },
              {
                t: "Coaching & mentors",
                d: "Pitch practice, office hours, and access to operators who've built before.",
              },
              {
                t: "Community & space",
                d: "Events, peer circles, and access to the Enterprise Village hub (where available).",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <h3 className="text-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Who this is for</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Idea‑to‑MVP founders and product teams",
              "Post‑MVP teams seeking early traction",
              "Writers and creators building on Crowdpen",
              "Agribusiness and climate‑smart ventures",
              "Non‑technical founders who need a build partner",
              "Teams ready to pitch investors in the next 3–6 months",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">FAQs</h2>
          <div className="mt-6 space-y-6">
            {[
              {
                q: "Is the funding equity, grants, or loans?",
                a: "It depends on the pathway. EV Venture Studio typically involves equity and build credits. Crowdpen Creators Fund focuses on grants and distribution. Agripro Micro Funding may use micro‑loans or revenue‑share models. Pitch Perfect is a non‑dilutive investor‑readiness program.",
              },
              {
                q: "Can I be considered for more than one pathway?",
                a: "Yes. Apply once and indicate your priorities—our team will route your application to all relevant partners.",
              },
              {
                q: "Do I need to be in a specific country?",
                a: "No. We welcome global applicants. Some benefits (like workspace access) are location‑dependent.",
              },
              {
                q: "What stage is the best fit?",
                a: "From idea to early traction. If you're pre‑product, we'll assess studio fit. If you're a creator, we'll look at your content plan and momentum. For agribusiness, we focus on practicality and community impact.",
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
                <summary className="cursor-pointer list-none text-base font-semibold">
                  <span className="mr-2 inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">FAQ</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA & Form stub */}
      <section id="apply" className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 py-16 text-white">
        <div className="absolute inset-0 -z-10 opacity-20" style={{backgroundImage: "radial-gradient(ellipse at 20% 20%, #fff 0, transparent 50%), radial-gradient(ellipse at 80% 80%, #fff 0, transparent 50%)"}}/>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Apply once. We do the routing.</h2>
              <p className="mt-3 max-w-xl text-white/90">
                Share your stage, goals, and timeline. We'll match you to EV Venture Studio, Crowdpen Creators Fund, Pitch Perfect, and/or Agripro Micro Funding.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/apply" className="rounded-2xl bg-white px-5 py-3 text-red-700 shadow-sm transition hover:bg-neutral-50">
                  Start application
                </Link>
                <Link href="/contact" className="rounded-2xl border border-white/30 px-5 py-3 text-white backdrop-blur-sm transition hover:bg-white/10">
                  Talk to the team
                </Link>
              </div>
              <p className="mt-3 text-xs text-white/80">By applying, you agree that your information may be shared with partner programs for the purpose of evaluation.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <FundingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className="bg-white py-10 text-sm text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
        <div className="mx-auto max-w-7xl px-6">
          Partnerships are subject to due diligence and availability. Funding is not guaranteed. Terms and instruments vary by partner.
        </div>
      </section>
      </main>
    </>
  );
}
