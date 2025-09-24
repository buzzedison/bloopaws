"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Trophy,
  Users,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Handshake,
  Rocket,
  ChevronDown
} from "lucide-react";

const eventMeta = [
  {
    icon: CalendarDays,
    label: "November 1st, 2025",
    helper: "Applications close October 25th"
  },
  {
    icon: Clock,
    label: "11:30 AM – 2:30 PM",
    helper: "Doors open at 11:00 AM"
  },
  {
    icon: MapPin,
    label: "The Enterprise Village, Dzorwulu",
    helper: "Accra, Ghana"
  },
  {
    icon: Ticket,
    label: "FREE – Earn Your Spot",
    helper: "Limited seats available"
  }
];

const headlineHighlights = [
  { value: "3", label: "Minutes to change everything" },
  { value: "15", label: "Investors ready to deploy capital" },
  { value: "12", label: "Curated agribusiness founders" },
  { value: "1", label: "Shot at Venture Studio fast-track" }
];

const rewards = [
  {
    title: "₵1,500 + Venture Studio Fast-Track",
    description: "First place winner unlocks funding support, expert mentorship, and a direct interview for our Q1 2026 acceleration program.",
    accent: "bg-white border-light-white-200"
  },
  {
    title: "Direct Access to Agri-Investors",
    description: "Meet investors who understand agriculture and are actively deploying capital into grounded solutions.",
    accent: "bg-white border-light-white-200"
  },
  {
    title: "Candid, Useful Feedback",
    description: "Walk away with actionable insights from operators who have built, funded, and scaled agribusiness across Africa.",
    accent: "bg-white border-light-white-200"
  },
  {
    title: "Momentum into 2026",
    description: "Position your venture for partnerships, pilots, and expansion with the Enterprise Village ecosystem.",
    accent: "bg-white border-light-white-200"
  }
];

const differentiators = [
  {
    title: "Clarity over Clout",
    description: "We prioritise grounded execution and traction, not flashy decks.",
    icon: Lightbulb
  },
  {
    title: "Sector-Specific Feedback",
    description: "Every voice in the room is rooted in agriculture and rural market realities.",
    icon: Users
  },
  {
    title: "Community over Competition",
    description: "Collaborate with founders solving the same gritty problems you are tackling.",
    icon: Handshake
  },
  {
    title: "Actionable Playbooks",
    description: "Leave with frameworks, templates, and next steps tailored to your stage.",
    icon: Rocket
  }
];

const ventureTypes = [
  "Agriculture & food systems solutions",
  "Agri-tech platforms and tools",
  "Agri-finance and embedded credit",
  "Aquaculture ventures",
  "Processing & value addition",
  "Cooperative-focused solutions",
  "Climate-smart agriculture"
];

const requirements = [
  "A clearly defined problem validated with real farmers or customers",
  "An innovative approach or technology that can scale",
  "Evidence that your solution works – traction, pilots, or measurable results",
  "Alignment with themes: value chains, cold chain, market access, agri-fintech, processing, export enablement"
];

const agenda = [
  {
    title: "Your 3-Minute Moment",
    duration: "Pitch",
    description: "Deliver a high-conviction story focused on the problem, solution, traction, and why now."
  },
  {
    title: "2 Minutes of Truth",
    duration: "Feedback",
    description: "Receive candid, actionable guidance from investors and operators who understand agribusiness."
  },
  {
    title: "Power Sessions",
    duration: "Workshops",
    description: "Deep dives on funding pathways, cooperative strategies, scaling across Africa, and export readiness."
  },
  {
    title: "Real Networking",
    duration: "Connections",
    description: "Build relationships with investors, ecosystem builders, NGOs, and policy makers ready to collaborate."
  }
];

const prizes = [
  {
    place: "1st Place",
    reward: "₵1,500 + Venture Studio Fast-Track",
    highlight: "Direct path into EV Venture Studio + investor follow-ups"
  },
  {
    place: "2nd Place",
    reward: "₵750",
    highlight: "Investor matchmaking + mentorship sprint"
  },
  {
    place: "3rd Place",
    reward: "₵500",
    highlight: "Advisory session + ecosystem introductions"
  }
];

const outcomes = [
  "Clarity on the exact next steps to fund and scale",
  "Sector-specific feedback you can apply immediately",
  "Relationships with investors, partners, and peers",
  "Playbooks, templates, and frameworks tailored to African markets",
  "Confidence to scale – or the wisdom to pivot fast"
];

const audiences = [
  "Agri-focused investors deploying smart capital",
  "Impact funds and DFIs backing scalable solutions",
  "Experienced agripreneurs turning prototypes into growth",
  "NGOs and development partners with market access",
  "Policy makers eager for bottom-up innovation"
];

const faqs = [
  {
    question: "What if I'm too early-stage?",
    answer:
      "If you have a prototype, MVP, or early traction, you're exactly who we want. If it's still an idea on paper, prep now and join us next time."
  },
  {
    question: "Do I need a polished pitch deck?",
    answer:
      "No. A simple one-pager or lean deck that captures the essentials is enough. Substance beats animation."
  },
  {
    question: "Who are the investors in the room?",
    answer:
      "Expect agri-focused VCs, impact funds, angels with sector expertise, and development finance partners who understand agriculture's realities."
  },
  {
    question: "Can I attend without pitching?",
    answer:
      "Absolutely. Select the 'Attend & Learn' track to experience the full program without the pressure of a pitch."
  }
];

export default function PitchPerfectPage() {
  const [selectedPath, setSelectedPath] = useState<"pitch" | "learn" | null>(null);

  return (
    <main className="bg-white text-black-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-light-white-100 to-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                Pitch Perfect: Green Ventures
              </span>

              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Turn Your Agribusiness Idea Into <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Investment-Ready Reality</span>
                </h1>
                <p className="text-lg text-gray">
                  What if three minutes could change everything for your agribusiness? On November 1st, Ghana's most promising agripreneurs will pitch to investors who actually understand agriculture. Will you be one of them?
                </p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {eventMeta.map(({ icon: Icon, label, helper }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-2xl border border-light-white-200 bg-white p-4 shadow-sm"
                  >
                    <div className="rounded-xl bg-red-100 p-2 text-red-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  <div>
                      <p className="font-semibold text-black-100">{label}</p>
                      <p className="text-sm text-gray">{helper}</p>
                </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <a 
                  href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-red-700"
                >
                  Apply to Pitch
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#why-this-matters"
                  className="inline-flex items-center gap-2 rounded-xl border border-light-white-300 px-6 py-4 text-base font-semibold text-black-100 transition hover:border-red-300"
                >
                  Learn More
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="grid gap-4 rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:flex lg:flex-col">
              {headlineHighlights.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-light-white-200 bg-light-white-100 p-4 text-center">
                  <span className="block text-3xl font-black text-black-100 sm:text-4xl">{value}</span>
                  <span className="block text-sm font-medium uppercase tracking-wide text-gray">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-red-100 bg-red-50 p-6 text-center sm:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-500">Deadline Alert</p>
              <h2 className="text-2xl font-bold text-black-100 sm:text-3xl">
                Applications close October 25th – don't miss your shot.
              </h2>
            </div>
            <a
              href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black-100 transition hover:bg-light-white-100"
            >
              Start Application
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section id="why-this-matters" className="bg-light-white-100">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">What's Waiting For You</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">
              Outcomes designed for founders building in the real world.
            </h2>
                </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rewards.map(({ title, description, accent }) => (
              <div
                key={title}
                className={`rounded-3xl border ${accent} p-6 transition hover:border-red-200 hover:shadow-lg`}
              >
                <h3 className="text-2xl font-semibold text-black-100">{title}</h3>
                <p className="mt-3 text-base text-gray">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-24 sm:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-black text-black-100 sm:text-5xl">
                This isn't another glossy pitch competition.
            </h2>
              <p className="text-lg text-gray">
                Think Shark Tank meets actual agriculture expertise. No buzzwords. No fluff. Just direct feedback, smart capital, and people who know what it takes to build in the field.
            </p>
            </div>
            <div className="rounded-3xl border border-light-white-200 bg-light-white-100 p-5 text-sm text-gray">
              <p className="uppercase tracking-[0.2em] text-red-500">We focus on</p>
              <p className="text-base font-semibold text-black-100">Real solutions. Real numbers. Real traction.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex gap-4 rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-red-100 p-3 text-red-600">
                  <Icon className="h-full w-full" />
              </div>
                <div>
                  <h3 className="text-xl font-semibold text-black-100">{title}</h3>
                  <p className="mt-2 text-base text-gray">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Gets to Pitch */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Limited Spots Available</span>
              <h2 className="text-4xl font-black text-black-100 sm:text-5xl">Who gets to pitch?</h2>
              <p className="text-lg text-gray">
                We curate founders building tangible solutions across the agribusiness value chain. If you're putting real tools in farmers' hands, this room is for you.
              </p>
              <ul className="space-y-3">
                {ventureTypes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Minimum requirement: at least a prototype, MVP, or early traction. This is not for idea-only pitches.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black-100">What we're looking for</h3>
              <ul className="space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray">
                    <Sparkles className="mt-1 h-5 w-5 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-black-100">You should apply if:</h4>
                <p className="mt-2 text-base text-gray">
                  You're building for value chains, cold chain logistics, market access, agri-fintech, processing or export enablement – and you have proof it works on the ground.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">The 2.5 Hour Experience</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">
              What happens when we put founders, investors, and operators together.
          </h2>
          </div>

          <div className="space-y-6">
            {agenda.map(({ title, duration, description }) => (
              <div key={title} className="flex flex-col gap-4 rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="flex-shrink-0 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                  {duration}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-black-100">{title}</h3>
                  <p className="mt-2 text-base text-gray">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-5xl space-y-12 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Prize Pool</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">More than cash. It's momentum.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {prizes.map(({ place, reward, highlight }) => (
              <div key={place} className="rounded-3xl border border-light-white-200 bg-white p-6 text-center shadow-sm">
                <Trophy className="mx-auto h-10 w-10 text-red-500" />
                <h3 className="mt-4 text-xl font-semibold text-black-100">{place}</h3>
                <p className="mt-2 text-lg font-bold text-black-100">{reward}</p>
                <p className="mt-3 text-sm text-gray">{highlight}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-gray">
            The real win? Investors in your corner, mentors on speed dial, and clarity on what unlocks your next funding round.
          </p>
        </div>
      </section>

      {/* Participation Paths */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Two Ways In</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">Choose your experience.</h2>
            <p className="mt-4 text-lg text-gray">Both tracks unlock workshops, investor Q&A, and curated networking.</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div
              className={`relative overflow-hidden rounded-3xl border ${selectedPath === "pitch" ? "border-red-400" : "border-light-white-200"} bg-white p-8 shadow-lg transition`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black-100">Pitch to Win</h3>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                  Limited
            </span>
              </div>
              <p className="mt-4 text-base text-gray">
                Submit by October 25th. Take the stage for three minutes, earn direct feedback, and compete for the prize pool plus Venture Studio access.
              </p>
              <ul className="mt-6 space-y-3 text-gray">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                  <span>Investor follow-ups pre-scheduled for shortlisted teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                  <span>Fast-track interview for the Q1 2026 acceleration program</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                  <span>Comprehensive feedback dossier post-event</span>
                </li>
              </ul>
                <button 
                onClick={() => setSelectedPath("pitch")}
                className={`mt-8 w-full rounded-xl border px-6 py-3 text-base font-semibold transition ${
                  selectedPath === "pitch"
                    ? "border-red-500 bg-red-600 text-white"
                    : "border-light-white-300 bg-light-white-100 text-black-100 hover:border-red-300"
                  }`}
                >
                  I Want to Pitch
                </button>
              </div>

            <div
              className={`relative overflow-hidden rounded-3xl border ${selectedPath === "learn" ? "border-red-400" : "border-light-white-200"} bg-white p-8 shadow-lg transition`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-black-100">Attend & Learn</h3>
                <span className="rounded-full bg-light-white-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray">
                  Open
                </span>
            </div>
              <p className="mt-4 text-base text-gray">
                Experience every session without the pressure of pitching. Learn from the room, network deeply, and prepare for your moment.
              </p>
              <ul className="mt-6 space-y-3 text-gray">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-400" />
                  <span>Front-row access to investor feedback and workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-400" />
                  <span>Networking with agripreneurs at every stage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-red-400" />
                  <span>Actionable playbooks and templates to take home</span>
                </li>
              </ul>
                <button 
                onClick={() => setSelectedPath("learn")}
                className={`mt-8 w-full rounded-xl border px-6 py-3 text-base font-semibold transition ${
                  selectedPath === "learn"
                    ? "border-red-500 bg-red-600 text-white"
                    : "border-light-white-300 bg-light-white-100 text-black-100 hover:border-red-300"
                }`}
              >
                I Want to Attend
                </button>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray">
            Whichever track you choose, you'll leave with connections, clarity, and a roadmap designed for African agribusiness.
          </p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">What You'll Walk Away With</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">Practical advantages that shift your trajectory.</h2>
              </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-3xl border border-light-white-200 bg-white p-5 text-gray shadow-sm">
                <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
            </div>
      </section>

      {/* Audience */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Who You'll Meet</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">The ecosystem gathering in one room.</h2>
              </div>
          <div className="grid gap-6 md:grid-cols-2">
            {audiences.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-3xl border border-light-white-200 bg-white p-5 text-gray shadow-sm">
                <Users className="mt-1 h-5 w-5 text-red-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-5xl space-y-10 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">FAQ</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">The real questions founders ask.</h2>
              </div>

          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm transition hover:border-red-200"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-black-100">
                  {question}
                  <span className="text-sm font-normal text-gray group-open:rotate-180">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </summary>
                <p className="mt-4 text-base text-gray">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-20 sm:px-10">
          <h2 className="text-center text-4xl font-black leading-tight sm:text-5xl">
            🔥 Only Qualified Ventures Get to Pitch – Apply Now
          </h2>
          <p className="mx-auto max-w-3xl text-center text-lg text-white/90">
            Applications close October 25th. Limited spots. Don't let this be the opportunity you wish you'd taken.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-black-100 transition hover:bg-light-white-100"
            >
              Apply to Pitch (Deadline: Oct 25)
              <ArrowRight className="h-5 w-5" />
            </a>
              <a
                href="https://airtable.com/app7rzeBLQmXIiBQ5/pagizk846OC11kbiX/form"
                target="_blank"
                rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
              Attend & Learn (Free Registration)
              </a>
            </div>

          <div className="rounded-3xl border border-white/40 bg-white/10 p-6 text-center text-sm text-white/80">
            Organized by The Enterprise Village – where ideas become ventures.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-16 text-center text-gray sm:px-10">
          <p className="text-xl font-semibold text-black-100">
            "We're not here for pretty decks. We're here for founders building real solutions for real farmers."
          </p>
          <div className="h-px w-full bg-light-white-200" />
          <p className="text-sm text-gray">
            The Enterprise Village • Pitch Perfect: Green Ventures • November 1st, 2025
          </p>
        </div>
      </footer>
    </main>
  );
} 