"use client";

import { useState } from "react";
import {
  Wrench,
  Hammer,
  Cog,
  Users,
  ArrowRight,
  CheckCircle2,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  Zap
} from "lucide-react";
import * as tracking from "../lib/tracking";

const structureItems = [
  {
    number: "1",
    title: "The Blueprint",
    description: "A story that feels familiar: the project that went wrong before it went right, the rebuild that made everything better, the decision that changed how a team worked.",
    icon: BookOpen
  },
  {
    number: "2",
    title: "The Toolbox",
    description: "One thing you can use this week. A guide, template, or framework that saves time or makes things clearer.",
    icon: Wrench
  },
  {
    number: "3",
    title: "What's Working",
    description: "Tools and systems that have actually helped us build better. No promotion, no trends—just what's proven useful.",
    icon: CheckCircle2
  },
  {
    number: "4",
    title: "The Crew",
    description: "Highlights from readers and builders who share smart ideas, lessons, or breakthroughs.",
    icon: Users
  },
  {
    number: "5",
    title: "Next Steps",
    description: "One small, practical action to take before the next issue arrives.",
    icon: Target
  }
];

const principles = [
  "Clarity beats complexity",
  "Doing beats planning forever",
  "Learning beats pretending to know everything"
];

const themes = [
  "Foundation: checking if your idea makes sense",
  "Build: turning it into something that works",
  "Growth: figuring out what actually helps it grow",
  "Scale: building teams that care about the outcome"
];

export default function BuildSheetPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/build-sheet/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      // Track Newsletter Signup
      tracking.trackNewsletterSignup('Build Sheet');

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-black-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-light-white-100 to-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="max-w-4xl space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                <Hammer className="h-4 w-4" />
                Newsletter for Builders
              </span>

              <div className="space-y-6">
                <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  The <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Build Sheet</span>
                </h1>
                <p className="text-xl text-gray">
                  A newsletter for people who build things
                </p>
                <p className="text-lg text-gray">
                  Your Friday morning plan for turning ideas into real projects. Honest lessons and practical guidance from people who've made mistakes, learned from them, and kept building.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 rounded-2xl border border-light-white-200 bg-white p-4 shadow-sm">
                  <Mail className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-black-100">Every Friday at 8 AM</p>
                    <p className="text-xs text-gray">One email. Five minutes. Real value.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-light-white-200 bg-white p-4 shadow-sm">
                  <Clock className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-black-100">Short & Practical</p>
                    <p className="text-xs text-gray">No filler. No noise.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex-shrink-0">
              <div className="rounded-3xl border border-light-white-200 bg-white p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-black-100 mb-6">Subscribe to The Build Sheet</h3>

                {isSubmitted ? (
                  <div className="text-center space-y-4">
                    <div className="rounded-full bg-green-100 p-3 w-fit mx-auto">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black-100">Welcome aboard! 🎉</h4>
                      <p className="text-sm text-gray mt-2">
                        Check your email for a welcome message. Your first Build Sheet arrives this Friday at 8 AM.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-xl border border-light-white-300 px-4 py-3 text-base focus:border-red-500 focus:outline-none disabled:opacity-50"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                <p className="mt-4 text-xs text-gray">
                  Join 100+ builders who get practical insights every Friday. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">What It Is</span>
            <h2 className="text-4xl font-black text-black-100 sm:text-5xl">
              Honest lessons from the front lines of building
            </h2>
            <div className="space-y-6 text-lg text-gray">
              <p>
                The Build Sheet is your Friday morning plan for turning ideas into real projects.
                It shares honest lessons and practical guidance from people who've made mistakes, learned from them, and kept building.
              </p>
              <p>
                It's written by builders, for builders. Designed like real blueprints. Focused on one goal: helping you create something that works and matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Exists */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Why It Exists</span>
              <h2 className="text-4xl font-black text-black-100 sm:text-5xl">
                Most advice skips the hard parts
              </h2>
              <div className="space-y-4 text-lg text-gray">
                <p>
                  Most business advice skips the hard parts—the setbacks, the wrong turns, the rebuilds.
                </p>
                <p>
                  We've lived through those moments. We know what it's like to fix broken products, rebuild from scratch, and keep going when things fall apart.
                </p>
                <p>
                  The Build Sheet is a collection of what we've learned along the way—shared so you don't have to learn it the hardest way possible.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-light-white-200 bg-light-white-100 p-8 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-black-100">The hard truths we share:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                    <span className="text-gray">Projects that failed before they succeeded</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                    <span className="text-gray">Decisions that cost time and money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                    <span className="text-gray">Systems that broke before they worked</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-red-500" />
                    <span className="text-gray">Teams that struggled before they thrived</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">The Structure</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">
              Five sections. Five minutes. Real value.
            </h2>
            <p className="mt-4 text-lg text-gray">
              Each issue follows five short sections—simple, useful, and straight to the point.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {structureItems.map(({ number, title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-light-white-200 bg-white p-6 shadow-sm transition hover:border-red-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="mb-2 text-2xl font-black text-red-500">{number}</div>
                    <h3 className="text-xl font-semibold text-black-100">{title}</h3>
                    <p className="mt-3 text-base text-gray">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice & Philosophy */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-24 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">The Voice</span>
              <h2 className="text-4xl font-black text-black-100 sm:text-5xl">
                Honest. Clear. Useful.
              </h2>
              <div className="space-y-4 text-lg text-gray">
                <p>
                  We write the way we build—honestly, clearly, and without dressing things up.
                </p>
                <p>
                  Every sentence aims to be useful. No buzzwords. No fluff. Just practical insights from people who've been in the trenches.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">How We Think</span>
              <div className="space-y-4">
                {principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-3 rounded-2xl border border-light-white-200 bg-light-white-100 p-4">
                    <Lightbulb className="mt-1 h-5 w-5 text-red-500" />
                    <span className="font-medium text-black-100">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-light-white-200 bg-light-white-100 p-8">
            <h3 className="text-xl font-semibold text-black-100 mb-6">Monthly Themes</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {themes.map((theme) => (
                <div key={theme} className="flex items-center gap-3 rounded-xl border border-light-white-200 bg-white p-4">
                  <Cog className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-black-100">{theme}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-base text-gray">
              We don't chase trends. We focus on what's true and useful for people building things today.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-light-white-100">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">The Experience</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">One email. Real impact.</h2>
            <p className="mt-4 text-lg text-gray">
              Every Friday at 8 AM, one email lands in your inbox. It's short. It's practical. It gives you something worth thinking about before the day starts.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-light-white-200 bg-white p-6 text-center shadow-sm">
              <Calendar className="mx-auto h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-black-100">Every Friday</h3>
              <p className="mt-2 text-sm text-gray">Consistent schedule you can rely on</p>
            </div>
            <div className="rounded-3xl border border-light-white-200 bg-white p-6 text-center shadow-sm">
              <Clock className="mx-auto h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-black-100">5 Minutes</h3>
              <p className="mt-2 text-sm text-gray">Quick read that fits your morning routine</p>
            </div>
            <div className="rounded-3xl border border-light-white-200 bg-white p-6 text-center shadow-sm">
              <Zap className="mx-auto h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-black-100">Actionable</h3>
              <p className="mt-2 text-sm text-gray">Something you can apply immediately</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray">
              No filler. No noise. Just ideas and tools that help you keep building.
            </p>
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-12 px-6 py-24 sm:px-10">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">The Principle</span>
            <h2 className="mt-4 text-4xl font-black text-black-100 sm:text-5xl">Good builders share what they know</h2>
            <p className="mt-4 text-lg text-gray">
              The Build Sheet exists to make that easier—one story, one tool, one idea at a time.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-light-white-200 bg-light-white-100 p-8 text-center shadow-sm">
            <p className="text-lg text-gray">
              The Build Sheet is written by the team at Bloop Global—people who build, teach, and help others do the same.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="mx-auto max-w-5xl space-y-8 px-6 py-20 sm:px-10">
          <div className="text-center">
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Ready to build better?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join builders who get practical insights every Friday morning.
            </p>
          </div>

          <div className="mx-auto max-w-md">
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3 w-fit mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Welcome aboard! 🎉</h4>
                  <p className="text-sm text-white/80 mt-2">
                    Check your email for a welcome message. Your first Build Sheet arrives this Friday at 8 AM.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-base text-white placeholder-white/70 focus:border-white focus:outline-none disabled:opacity-50"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-black-100 transition hover:bg-light-white-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-black-100/30 border-t-black-100 rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe to The Build Sheet
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="text-center text-sm text-white/80">
            <p>Free newsletter • No spam • Unsubscribe anytime</p>
          </div>
        </div>
      </section>
    </main>
  );
}
