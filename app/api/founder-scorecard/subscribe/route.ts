import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type CategoryScores = Record<string, number>;

type Submission = {
  name?: string;
  email?: string;
  newsletterConsent?: boolean;
  source?: string;
  score?: number;
  scoreBand?: string;
  primaryConstraint?: string;
  categoryScores?: CategoryScores;
};

const categoryLabels: Record<string, string> = {
  decisions: "Decision flow",
  ownership: "Team ownership",
  systems: "Operating systems",
  focus: "Strategic focus",
  capacity: "Founder capacity",
};

const constraintActions: Record<string, string[]> = {
  decisions: [
    "List the five decisions that most often return to you.",
    "Give each decision a clear owner and escalation trigger.",
    "Review decision quality weekly instead of approving everything in advance.",
  ],
  ownership: [
    "Replace task lists with one measurable outcome for each role.",
    "Ask owners to propose a next move before bringing you a problem.",
    "Review outcomes, obstacles, and next commitments each week.",
  ],
  systems: [
    "Document the recurring process creating the most rework.",
    "Choose one source of truth for priorities, owners, and deadlines.",
    "Turn repeated explanations into a checklist or standard.",
  ],
  focus: [
    "Name one company constraint and one 90-day outcome.",
    "Pause work that does not directly support that outcome.",
    "Make one stop-doing decision every week.",
  ],
  capacity: [
    "Mark the work on your calendar that only you can do.",
    "Delegate one recurring rescue pattern with a success standard.",
    "Protect two weekly blocks for thinking and future bets.",
  ],
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function subscribeToKit(submission: Submission) {
  if (!submission.newsletterConsent) return false;

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_MASTER_SYSTEM_FORM_ID || process.env.CONVERTKIT_BUILD_SHEET_FORM_ID;
  if (!apiKey || !formId) return false;

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email: submission.email,
      first_name: submission.name,
      fields: {
        source: submission.source || "founder_bottleneck_scorecard",
        founder_score: submission.score?.toString() || "",
        score_band: submission.scoreBand || "",
        primary_constraint: submission.primaryConstraint || "",
      },
      tags: ["master_the_system", submission.source || "founder_scorecard"],
    }),
  });

  if (!response.ok) {
    console.error("Kit subscription failed", await response.text());
    return false;
  }
  return true;
}

function buildResultEmail(submission: Submission) {
  const name = escapeHtml(submission.name || "Founder");
  const constraintKey = submission.primaryConstraint || "decisions";
  const constraint = categoryLabels[constraintKey] || "Operating constraint";
  const scores = Object.entries(submission.categoryScores || {});
  const actions = constraintActions[constraintKey] || constraintActions.decisions;

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f4f1e8;color:#171712;font-family:Arial,sans-serif;line-height:1.6">
        <div style="max-width:640px;margin:0 auto;padding:36px 20px">
          <p style="font-size:18px;font-weight:800;margin:0 0 40px">BuzzEdison<span style="color:#e84a2f">.</span></p>
          <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e84a2f">Founder Bottleneck Scorecard</p>
          <h1 style="font-size:44px;line-height:1;margin:12px 0 18px;letter-spacing:-2px">${name}, your score is ${submission.score ?? "—"}/100.</h1>
          <p style="font-size:20px;color:#5f5b52">${escapeHtml(submission.scoreBand || "Your operating result")}</p>
          <div style="margin:32px 0;padding:24px;background:#171712;color:#fff;border-radius:18px">
            <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ff7b61;margin:0">Primary constraint</p>
            <h2 style="font-size:28px;margin:8px 0 0">${escapeHtml(constraint)}</h2>
          </div>
          ${scores.length ? `
            <h2 style="font-size:22px;margin-top:36px">Your five operating areas</h2>
            <table style="width:100%;border-collapse:collapse">
              ${scores.map(([key, score]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #d9d7d0">${escapeHtml(categoryLabels[key] || key)}</td><td style="padding:10px 0;border-bottom:1px solid #d9d7d0;text-align:right;font-weight:700">${score}/100</td></tr>`).join("")}
            </table>
            <h2 style="font-size:22px;margin-top:36px">Three moves for the next seven days</h2>
            <ol style="padding-left:22px">
              ${actions.map((action) => `<li style="margin:12px 0">${escapeHtml(action)}</li>`).join("")}
            </ol>
          ` : ""}
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #d9d7d0">
            <p>If you want help finding the decision underneath the noise, reply to this email with the messy version.</p>
            <p style="margin-top:28px"><strong>Edison Ade</strong><br><span style="color:#777267">Founder and strategy partner</span></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildWelcomeEmail(submission: Submission) {
  const name = escapeHtml(submission.name || "there");
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f4f1e8;color:#171712;font-family:Arial,sans-serif;line-height:1.65">
        <div style="max-width:620px;margin:0 auto;padding:40px 20px">
          <p style="font-size:18px;font-weight:800;margin:0 0 44px">BuzzEdison<span style="color:#e84a2f">.</span></p>
          <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e84a2f">Master the System</p>
          <h1 style="font-size:42px;line-height:1.05;letter-spacing:-2px">Welcome, ${name}.</h1>
          <p style="font-size:19px;color:#5f5b52">Each week, I’ll send one precise idea for building a company that can think, sell, and move without waiting for you.</p>
          <p>No motivational theatre. No universal playbook. One constraint, the principle underneath it, and one move you can use.</p>
          <p style="margin-top:32px">Until the next issue,<br><strong>Edison</strong></p>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const submission = (await request.json()) as Submission;
    const name = submission.name?.trim();
    const email = submission.email?.trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (submission.score !== undefined && (submission.score < 0 || submission.score > 100)) {
      return NextResponse.json({ error: "Invalid score." }, { status: 400 });
    }

    submission.name = name;
    submission.email = email;

    const resendKey = process.env.RESEND_API_KEY;
    const kitConfigured = Boolean(
      process.env.CONVERTKIT_API_KEY &&
      (process.env.CONVERTKIT_MASTER_SYSTEM_FORM_ID || process.env.CONVERTKIT_BUILD_SHEET_FORM_ID)
    );

    if (!resendKey && !kitConfigured) {
      return NextResponse.json(
        { error: "Email delivery is being configured. Please try again shortly." },
        { status: 503 }
      );
    }

    const kitAdded = await subscribeToKit(submission);
    let emailSent = false;

    if (resendKey) {
      const resend = new Resend(resendKey);
      const isScorecard = typeof submission.score === "number";
      const result = await resend.emails.send({
        from: process.env.BUZZEDISON_FROM_EMAIL || "BuzzEdison <noreply@updates.bloopglobal.com>",
        to: [email],
        replyTo: process.env.BUZZEDISON_REPLY_TO || "ask@buzzedison.com",
        subject: isScorecard
          ? `Your Founder Bottleneck Score: ${submission.score}/100`
          : "Welcome to Master the System",
        html: isScorecard ? buildResultEmail(submission) : buildWelcomeEmail(submission),
      });
      emailSent = !result.error;
      if (result.error) console.error("Resend delivery failed", result.error);
    }

    if (!emailSent && !kitAdded) {
      return NextResponse.json({ error: "We could not complete the signup. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true, emailSent, newsletterAdded: kitAdded });
  } catch (error) {
    console.error("Founder scorecard signup failed", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

