import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Types for referral data
interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  referrerEmail: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  companyName: string | null;
  message: string | null;
  status: string;
  dateReferred: string;
  potentialValue: number;
  actualValue: number | null;
  commissionRate: number;
  commissionAmount: number | null;
  commissionPaid: boolean;
  commissionPaidDate: string | null;
}

// Supabase will be used for persistent storage; no in-memory storage needed.

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    // Validate required fields
    if (!data.clientName || !data.clientEmail) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    // Prepare referral data for Supabase
    const referralRow = {
      referrer_id: session.user.id,
      referrer_name: session.user.name,
      referrer_email: session.user.email,
      client_name: data.clientName,
      client_email: data.clientEmail,
      client_phone: data.clientPhone || null,
      company_name: data.companyName || null,
      message: data.message || null,
      status: "PENDING",
      date_referred: new Date().toISOString(),
      potential_value: data.potentialValue || 0,
      actual_value: null,
      commission_rate: data.commissionType === "close" ? 0.15 : 0.05,
      commission_amount: null,
      commission_paid: false,
      commission_paid_date: null
    };
    const supabase = createClient();
    const { data: inserted, error } = await supabase.from('referrals').insert([referralRow]).select().single();
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ message: "Failed to save referral" }, { status: 500 });
    }
    // Send admin notification email
    try {
      await resend.emails.send({
        from: 'Referrals <noreply@updates.bloopglobal.com>',
        to: ['ask@bloopglobal.com'],
        subject: `New Referral Submitted: ${referralRow.client_name}`,
        html: `
          <h2>New Referral Submitted</h2>
          <p><strong>Referrer:</strong> ${referralRow.referrer_name} (${referralRow.referrer_email})</p>
          <p><strong>Client:</strong> ${referralRow.client_name} (${referralRow.client_email})</p>
          <p><strong>Phone:</strong> ${referralRow.client_phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${referralRow.company_name || 'N/A'}</p>
          <p><strong>Message:</strong> ${referralRow.message || 'N/A'}</p>
          <p><strong>Date Referred:</strong> ${referralRow.date_referred}</p>
        `,
      });
    } catch (mailErr) {
      console.error("Failed to send admin email:", mailErr);
    }
    return NextResponse.json({ message: "Referral created successfully", referral: inserted }, { status: 201 });
  } catch (error) {
    console.error("Error creating referral:", error);
    return NextResponse.json({ message: "Failed to create referral" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const supabase = createClient();
    const { data: userReferrals, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', session.user.id)
      .order('date_referred', { ascending: false });
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ message: "Failed to fetch referrals" }, { status: 500 });
    }
    // Calculate stats
    const totalReferrals = userReferrals.length;
    const pendingReferrals = userReferrals.filter(
      (referral: any) => ["PENDING", "CONTACTED", "MEETING_SCHEDULED", "PROPOSAL_SENT"].includes(referral.status)
    ).length;
    const closedReferrals = userReferrals.filter(
      (referral: any) => referral.status === "CLOSED_WON"
    ).length;
    const totalEarnings = userReferrals
      .filter((referral: any) => referral.commission_paid)
      .reduce((total: number, referral: any) => total + (referral.commission_amount || 0), 0);
    return NextResponse.json({
      referrals: userReferrals,
      stats: {
        totalReferrals,
        pendingReferrals,
        closedReferrals,
        totalEarnings
      }
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json({ message: "Failed to fetch referrals" }, { status: 500 });
  }
}
