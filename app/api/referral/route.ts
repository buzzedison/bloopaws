import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function isReferralPartnerApproved(
  supabase: ReturnType<typeof createClient>,
  email?: string | null
) {
  if (!email) return false;
  const { data, error } = await supabase
    .from("referral_partner_applications")
    .select("status")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  if (error) {
    console.error("Error checking referral partner approval:", error);
    return false;
  }
  return data?.status === "approved";
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const approved = await isReferralPartnerApproved(supabase, user.email);
    if (!approved) {
      return NextResponse.json(
        { message: "Your Kazi account is pending admin approval. You cannot submit referrals yet." },
        { status: 403 }
      );
    }

    const data = await request.json();
    if (!data.clientName || !data.clientEmail) {
      return NextResponse.json({ message: "Missing required fields: clientName, clientEmail" }, { status: 400 });
    }

    // Fetch referrer profile name
    const { data: profileData } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single();

    const referralRow = {
      referrer_id:          user.id,
      referrer_name:        profileData?.name ?? null,
      referrer_email:       user.email,
      client_name:          data.clientName,
      client_email:         data.clientEmail,
      client_phone:         data.clientPhone   ?? null,
      company_name:         data.companyName   ?? null,
      message:              data.message       ?? null,
      status:               "pending",
      potential_value:      data.potentialValue ?? 0,
      actual_value:         null,
      commission_rate:      data.commissionType === "close" ? 0.15 : 0.05,
      commission:           null,
      commission_paid:      false,
      commission_paid_date: null,
    };

    const { data: inserted, error } = await supabase
      .from("referrals")
      .insert([referralRow])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ message: "Failed to save referral" }, { status: 500 });
    }

    // Admin notification email
    try {
      await resend.emails.send({
        from: "Referrals <noreply@updates.bloopglobal.com>",
        to: ["ask@bloopglobal.com"],
        subject: `New Referral: ${referralRow.client_name}`,
        html: `
          <h2>New Referral Submitted</h2>
          <p><strong>Referrer:</strong> ${referralRow.referrer_name} (${referralRow.referrer_email})</p>
          <p><strong>Client:</strong> ${referralRow.client_name} (${referralRow.client_email})</p>
          <p><strong>Phone:</strong> ${referralRow.client_phone ?? "N/A"}</p>
          <p><strong>Company:</strong> ${referralRow.company_name ?? "N/A"}</p>
          <p><strong>Message:</strong> ${referralRow.message ?? "N/A"}</p>
        `,
      });
    } catch (mailErr) {
      console.error("Failed to send admin email:", mailErr);
    }

    return NextResponse.json(
      { message: "Referral created successfully", referral: inserted },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating referral:", error);
    return NextResponse.json({ message: "Failed to create referral" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Admins see all referrals; partners see only their own
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    const isAdmin = profile?.is_admin === true;

    if (!isAdmin) {
      const approved = await isReferralPartnerApproved(supabase, user.email);
      if (!approved) {
        return NextResponse.json(
          { message: "Your Kazi account is pending admin approval." },
          { status: 403 }
        );
      }
    }

    let query = supabase
      .from("referrals")
      .select("*")
      .order("created_at", { ascending: false });

    if (!isAdmin) {
      query = query.eq("referrer_id", user.id);
    }

    const { data: referrals, error } = await query;

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ message: "Failed to fetch referrals" }, { status: 500 });
    }

    const list = referrals ?? [];
    const stats = {
      totalReferrals:   list.length,
      pendingReferrals: list.filter(r => !["closed_won", "closed_lost"].includes(r.status)).length,
      closedReferrals:  list.filter(r => r.status === "closed_won").length,
      totalEarnings:    list
        .filter(r => r.commission_paid)
        .reduce((sum, r) => sum + (r.commission ?? 0), 0),
    };

    return NextResponse.json({ referrals: list, stats });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json({ message: "Failed to fetch referrals" }, { status: 500 });
  }
}
