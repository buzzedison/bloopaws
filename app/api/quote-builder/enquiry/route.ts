import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
export async function POST(request: NextRequest) {
  if (
    request.headers.get("origin") &&
    request.headers.get("origin") !== new URL(request.url).origin
  )
    return NextResponse.json(
      { error: "Please submit from the Bloop website." },
      { status: 403 },
    );
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  attempts.forEach((entry, key) => {
    if (entry.expires < now) attempts.delete(key);
  });
  const entry = attempts.get(ip) || { count: 0, expires: now + 600000 };
  if (entry.count >= 5)
    return NextResponse.json(
      { error: "Please wait a few minutes before trying again." },
      { status: 429 },
    );
  entry.count++;
  attempts.set(ip, entry);
  try {
    const raw = await request.text();
    if (raw.length > 6000)
      return NextResponse.json(
        { error: "Enquiry is too long." },
        { status: 413 },
      );
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid enquiry. Please check the form and try again." },
        { status: 400 },
      );
    }
    if (!data || typeof data !== "object" || Array.isArray(data))
      return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") data[key] = data[key].trim();
    });
    if (data.website_url)
      return NextResponse.json(
        { error: "Unable to accept this enquiry." },
        { status: 400 },
      );
    for (const [key, max] of Object.entries({
      name: 120,
      business: 120,
      email: 200,
      phone: 40,
      service: 50,
      role: 50,
      budget: 12,
      timeline: 50,
      need: 1500,
      consent: 3,
    })) {
      if (
        typeof data[key] !== "string" ||
        data[key].length > max ||
        (key !== "phone" && !data[key].trim())
      )
        return NextResponse.json(
          { error: "Complete the required fields." },
          { status: 400 },
        );
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      data.consent !== "yes" ||
      data.need.trim().length < 15 ||
      !Number.isFinite(Number(data.budget)) ||
      Number(data.budget) < 0 ||
      Number(data.budget) > 100000000 ||
      !["Website / online shop", "Mobile app", "Business automation"].includes(
        data.service,
      ) ||
      !["Owner / decision-maker", "Researching for my team"].includes(
        data.role,
      ) ||
      !["Within 1 month", "Within 3 months", "Later / exploring"].includes(
        data.timeline,
      )
    )
      return NextResponse.json(
        { error: "Check your email, budget and project details." },
        { status: 400 },
      );
    if (!process.env.STRIDE_API_KEY)
      return NextResponse.json(
        {
          error:
            "Enquiries are temporarily unavailable. Please email ask@bloopglobal.com.",
        },
        { status: 503 },
      );
    const candidate =
      data.role === "Owner / decision-maker" &&
      Number(data.budget) > 0 &&
      data.timeline !== "Later / exploring";
    const parts = data.name.trim().split(/\s+/);
    const res = await fetch(
      `${process.env.STRIDE_BASE_URL || "https://strideos.cloud/api/v1"}/contacts`,
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.STRIDE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: parts[0],
          last_name: parts.slice(1).join(" "),
          email: data.email.trim(),
          phone: data.phone,
          source: "Bloop Quote Builder",
          tags: [
            "inbound",
            "quote-builder",
            candidate ? "qualification-pending" : "enquiry",
          ],
          custom_fields: {
            business: data.business,
            service: data.service,
            role: data.role,
            budget_ghs: data.budget,
            timeline: data.timeline,
            message: data.need,
            consent: "Contact about this enquiry",
            submitted_at: new Date().toISOString(),
            qualification_status: "Unverified — requires human review",
          },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.data?.id)
      return NextResponse.json(
        {
          error:
            "We could not confirm receipt. Please email ask@bloopglobal.com before resubmitting.",
        },
        { status: 502 },
      );
    // A candidate is self-reported, not a qualified sales conversation. No automated prospect emails.
    return NextResponse.json({ success: true, candidate });
  } catch {
    return NextResponse.json(
      { error: "Could not confirm receipt. Please email ask@bloopglobal.com." },
      { status: 500 },
    );
  }
}
