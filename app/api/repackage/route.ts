import { NextResponse } from "next/server"
import { Resend } from "resend"

const clean = (value: unknown) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[char] || char))

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = clean(body.name)
    const email = clean(body.email)
    const phone = clean(body.phone)
    const service = clean(body.service)
    const project = clean(body.project)
    const timeline = clean(body.timeline)
    const source = clean(body.source)

    if (!name || !email || !phone || !service || !project) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email delivery is not configured yet. Please contact ask@bloopglobal.com." }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const serviceLabel = service === "app" ? "App / digital product — from GHC 5,999" : service === "website" ? "Professional website — from GHC 1,999" : "Needs guidance"

    await resend.emails.send({
      from: "Bloop Global <noreply@updates.bloopglobal.com>",
      to: ["ask@bloopglobal.com"],
      replyTo: email,
      subject: `Digital Launch Promo request — ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#241028"><div style="background:#241028;color:#fff8ee;padding:28px"><p style="color:#ef8c7e;text-transform:uppercase;letter-spacing:2px;font-size:12px">Digital Launch Promo</p><h1 style="margin:8px 0 0">New project request</h1></div><div style="padding:28px;border:1px solid #e4d9e5"><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Service:</strong> ${serviceLabel}</p><p><strong>Timeline:</strong> ${timeline}</p><p><strong>Source:</strong> ${source}</p><p><strong>Project:</strong></p><p style="background:#fff8ee;padding:16px;line-height:1.6">${project}</p></div></div>`,
    })

    await resend.emails.send({
      from: "Bloop Global <noreply@updates.bloopglobal.com>",
      to: email,
      subject: "We received your Digital Launch Promo request",
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#241028"><div style="background:#241028;color:#fff8ee;padding:28px"><p style="color:#ef8c7e;text-transform:uppercase;letter-spacing:2px;font-size:12px">Bloop Global</p><h1 style="margin:8px 0 0">Your request is in.</h1></div><div style="padding:28px;border:1px solid #e4d9e5"><p>Hi ${name},</p><p>Thanks for claiming a Digital Launch Promo slot for <strong>${serviceLabel}</strong>.</p><p>Our team will review your idea and contact you to clarify the scope, timeline, and next steps. You can share any missing content or files during that conversation.</p><p>The promotional offer ends September 30, 2026. Final pricing is confirmed after project review.</p><p>— The Bloop Global team</p></div></div>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Digital Launch Promo submission failed:", error)
    return NextResponse.json({ error: "We could not submit your request. Please try again." }, { status: 500 })
  }
}
