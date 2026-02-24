'use server';

import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
// Import server client directly
import { createClient } from '@/lib/supabase/server';
// TODO: Uncomment and provide correct path for isAdmin helper
// import { isAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

// Types
interface ReferralFormData {
  name: string;
  email: string;
  phone: string;
  referralName: string;
  referralEmail: string;
  referralPhone: string;
  companyName: string;
  message: string;
  referrerCode: string | null;
}

interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  closedReferrals: number;
  totalEarnings: number;
}

interface Referral {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  status: string;
  dateReferred: string;
  potentialValue: number;
  actualValue: number;
  commission: number;
}

async function assertReferralPartnerApproved(
  supabase: ReturnType<typeof createClient>,
  email?: string | null
) {
  if (!email) {
    throw new Error("Missing user email for approval check");
  }

  const { data, error } = await supabase
    .from("referral_partner_applications")
    .select("status")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("Error checking referral partner approval:", error);
    throw new Error("Failed to verify referral partner approval");
  }

  if (!data || data.status !== "approved") {
    throw new Error("Your Kazi account is pending admin approval.");
  }
}

export async function createReferral(formData: ReferralFormData) {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Get user using server client
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication Error:", userError);
      throw new Error("User not authenticated");
    }
    await assertReferralPartnerApproved(supabase, user.email);
    const referrerId = user.id;

    // Validate form data (add more specific validation as needed)
    if (!formData.name || !formData.email || !formData.phone || !formData.referralName || !formData.referralEmail || !formData.referralPhone || !formData.companyName || !formData.message) {
      throw new Error("Invalid form data");
    }

    // Insert the referral into Supabase
    const { data: referral, error } = await supabase
      .from("referrals")
      .insert({
        id: uuidv4(),
        referrer_id: referrerId,
        referrer_name: formData.name,
        referrer_email: formData.email,
        referrer_phone: formData.phone,
        client_name: formData.referralName,
        client_email: formData.referralEmail,
        client_phone: formData.referralPhone,
        company_name: formData.companyName,
        message: formData.message,
        status: "pending",
        potential_value: 0, // This would be determined later by an admin
        commission_rate: 0.05, // Default to 5%, can be updated to 15% if they help close
        referrer_code: formData.referrerCode
      })
      .select()
      .single();

    if (error) throw error;

    // Send notification email to admin
    await resend.emails.send({
      from: "Referral Program <no-reply@updates.bloopglobal.com>",
      to: "ask@bloopglobal.com",
      subject: `New Referral: ${formData.referralName} from ${formData.name}`,
      html: `
        <h1>New Referral Submission</h1>
        <h2>Referrer Information:</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>

        <h2>Referred Client Information:</h2>
        <p><strong>Name:</strong> ${formData.referralName}</p>
        <p><strong>Email:</strong> ${formData.referralEmail}</p>
        <p><strong>Phone:</strong> ${formData.referralPhone}</p>
        <p><strong>Company:</strong> ${formData.companyName}</p>

        <h2>Additional Information:</h2>
        <p>${formData.message}</p>

        <p><strong>Referrer Code:</strong> ${formData.referrerCode || "No code used"}</p>
      `,
    });

    // Send confirmation email to referrer
    await resend.emails.send({
      from: "Bloop Referral Program <no-reply@updates.bloopglobal.com>",
      to: formData.email,
      subject: "Thank you for your referral!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #DC2626; text-align: center;">Referral Received!</h1>

          <p>Hi ${formData.name},</p>

          <p>Thank you for referring ${formData.referralName} to Bloop. We've received your referral and our team will be in touch with them soon.</p>

          <p>Remember, you'll earn:</p>
          <ul>
            <li><strong>5%</strong> commission for recommending our services</li>
            <li><strong>15%</strong> commission if you help close the deal</li>
          </ul>

          <p>You can track the status of your referrals in your <a href="${process.env.NEXT_PUBLIC_BASE_URL}/referral/dashboard" style="color: #DC2626;">referral dashboard</a>.</p>

          <p>If you have any questions, please don't hesitate to contact us.</p>

          <p>Best regards,<br>The Bloop Team</p>
        </div>
      `,
    });

    return { success: true, message: "Referral submitted successfully", referral };
  } catch (error) {
    console.error('Error creating referral:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error creating referral';
    throw new Error(errorMessage);
  }
}

export async function getReferralStats(): Promise<ReferralStats> {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication Error:", userError);
      throw new Error("User not authenticated");
    }

    // Get total referrals count
    const { count: totalReferrals, error: countError } = await supabase
      .from("referrals")
      .select("*", { count: "exact", head: true })
      .eq("referrer_id", user.id);

    if (countError) throw countError;

    // Get pending referrals count
    const { count: pendingReferrals, error: pendingError } = await supabase
      .from("referrals")
      .select("*", { count: "exact", head: true })
      .eq("referrer_id", user.id)
      .eq("status", "pending");

    if (pendingError) throw pendingError;

    // Get closed referrals count
    const { count: closedReferrals, error: closedError } = await supabase
      .from("referrals")
      .select("*", { count: "exact", head: true })
      .eq("referrer_id", user.id)
      .eq("status", "closed");

    if (closedError) throw closedError;

    // Get total earnings
    const { data: earningsData, error: earningsError } = await supabase
      .from("referrals")
      .select("commission")
      .eq("referrer_id", user.id)
      .eq("status", "closed");

    if (earningsError) throw earningsError;

    const totalEarnings = earningsData.reduce((sum, referral) => sum + (referral.commission || 0), 0);

    return {
      totalReferrals: totalReferrals || 0,
      pendingReferrals: pendingReferrals || 0,
      closedReferrals: closedReferrals || 0,
      totalEarnings: totalEarnings
    };
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error fetching referral stats';
    throw new Error(errorMessage);
  }
}

export async function getReferrals(): Promise<Referral[]> {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication Error:", userError);
      throw new Error("User not authenticated");
    }

    // Fetch referrals from Supabase
    const { data, error } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform the data to match the expected format
    return data.map((referral) => ({
      id: referral.id,
      clientName: referral.client_name,
      clientEmail: referral.client_email,
      companyName: referral.company_name,
      status: referral.status,
      dateReferred: new Date(referral.created_at).toISOString().split("T")[0],
      potentialValue: referral.potential_value,
      actualValue: referral.actual_value,
      commission: referral.commission
    }));
  } catch (error) {
    console.error('Error fetching referrals:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error fetching referrals';
    throw new Error(errorMessage);
  }
}

export async function updateReferralStatus(referralId: string, status: string) {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication Error:", userError);
      throw new Error("User not authenticated");
    }
    await assertReferralPartnerApproved(supabase, user.email);

    // First check if the referral belongs to the current user
    const { data: referral, error: fetchError } = await supabase
      .from("referrals")
      .select("*")
      .eq("id", referralId)
      .eq("referrer_id", user.id)
      .single();

    if (fetchError) throw fetchError;
    if (!referral) throw new Error("Referral not found or you don't have permission to update it");

    // Update the referral status
    const { error: updateError } = await supabase
      .from("referrals")
      .update({ status })
      .eq("id", referralId);

    if (updateError) throw updateError;

    revalidatePath("/referral/dashboard");
    return { success: true, message: "Referral status updated successfully" };
  } catch (error) {
    console.error('Error updating referral status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error updating referral status';
    throw new Error(errorMessage);
  }
}

export async function saveReferralCode(referralCode: string) {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Save the referral code to a cookie
    cookies().set("referralCode", referralCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/"
    });

    // Increment the uses count in the database (read-then-write avoids needing a custom RPC)
    const { data: existing } = await supabase
      .from("referral_codes")
      .select("uses")
      .eq("code", referralCode)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("referral_codes")
        .update({ uses: (existing.uses ?? 0) + 1 })
        .eq("code", referralCode);
      if (error) console.error("Error incrementing referral code uses:", error);
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving referral code:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error saving referral code';
    throw new Error(errorMessage);
  }
}

export async function getReferralCode() {
  try {
    const referralCode = cookies().get("referralCode")?.value;
    return referralCode || null;
  } catch (error) {
    console.error('Error getting referral code:', error);
    return null;
  }
}

export async function generateReferralCode(): Promise<{ code: string }> {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  try {
    // Get user using server client
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication Error in generateReferralCode:", userError);
      throw new Error("User not authenticated");
    }
    const userId = user.id;

    // Check if user already has a code
    const { data: existingCode, error: fetchError } = await supabase
      .from("referral_codes")
      .select("code")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Supabase fetchError in generateReferralCode:", fetchError);
    }

    if (existingCode) {
      return { code: existingCode.code };
    }

    // Generate a new unique code
    const userEmail = user.email || `user-${user.id}`;
    const code = `${userEmail.split("@")[0]}-${Math.random().toString(36).substring(2, 7)}`.toLowerCase();

    // Save the new code
    const { error: insertError } = await supabase
      .from("referral_codes")
      .insert({
        user_id: userId,
        code,
        uses: 0
      });

    if (insertError) {
      console.error("Supabase insertError in generateReferralCode:", insertError);
      throw insertError;
    }

    return { code };
  } catch (error) {
    console.error('Error generating referral code (outer catch):', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error generating referral code';
    throw new Error(errorMessage);
  }
}

export async function getReferrerUsers() {
  // No need to get cookieStore, the server client handles it internally
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Verify the caller is an admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("Unauthorized: Admin access required");
  }

  // First, try to join with profiles table to get names
  try {
    const { data: referrersWithProfiles, error: joinError } = await supabase
      .from("referral_codes")
      .select(`
        user_id,
        code,
        created_at,
        uses,
        profiles!referral_codes_user_id_fkey (name, email)
      `)
      .order("created_at", { ascending: false });

    if (!joinError && referrersWithProfiles) {
      // Format the data to include profile information
      return referrersWithProfiles.map(referrer => {
        // Safely access profile data - it could be null or an array with one element
        const profile = Array.isArray(referrer.profiles)
          ? referrer.profiles[0]
          : (referrer.profiles || {});

        return {
          user_id: referrer.user_id,
          code: referrer.code,
          created_at: referrer.created_at,
          uses: referrer.uses || 0,
          name: profile.name || 'Unknown',
          email: profile.email || ''
        };
      });
    }
  } catch (joinError) {
    console.log('Error joining with profiles, falling back to basic query:', joinError);
  }

  // Fallback: Just get referral codes without profile information
  const { data: referrers, error } = await supabase
    .from("referral_codes")
    .select(`
      user_id,
      code,
      created_at,
      uses
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error fetching referrer users:", error);
    throw new Error(`Failed to fetch referrer users: ${error.message}`);
  }

  // Return basic data if we couldn't get profiles
  return (referrers || []).map(referrer => ({
    user_id: referrer.user_id,
    code: referrer.code,
    created_at: referrer.created_at,
    uses: referrer.uses || 0,
    name: 'Unknown',
    email: ''
  }));
}

// ─────────────────────────────────────────────────────────────
// Link Analytics — per-partner tracking stats
// ─────────────────────────────────────────────────────────────
export interface LinkAnalytics {
  totalVisits:    number;
  totalPageViews: number;
  conversions:    number;
  topPages:       { path: string; count: number }[];
  recentVisits:   { id: string; created_at: string; landing_page: string; converted: boolean }[];
}

export async function getLinkAnalytics(code: string): Promise<LinkAnalytics> {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('User not authenticated');

  // Confirm the code belongs to this user (or they are an admin)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    const { data: codeRow } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('code', code)
      .eq('user_id', user.id)
      .single();

    if (!codeRow) throw new Error('Referral code not found or not owned by you');
  }

  // Total visits
  const { count: totalVisits } = await supabase
    .from('referral_visits')
    .select('*', { count: 'exact', head: true })
    .eq('referral_code', code);

  // Conversions
  const { count: conversions } = await supabase
    .from('referral_visits')
    .select('*', { count: 'exact', head: true })
    .eq('referral_code', code)
    .not('converted_at', 'is', null);

  // Total page views
  const { count: totalPageViews } = await supabase
    .from('referral_events')
    .select('*', { count: 'exact', head: true })
    .eq('referral_code', code)
    .eq('event_type', 'page_view');

  // Top pages
  const { data: eventsData } = await supabase
    .from('referral_events')
    .select('page_path')
    .eq('referral_code', code)
    .eq('event_type', 'page_view');

  const pageCounts: Record<string, number> = {};
  for (const e of eventsData ?? []) {
    pageCounts[e.page_path] = (pageCounts[e.page_path] ?? 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Recent visits
  const { data: recentData } = await supabase
    .from('referral_visits')
    .select('id, created_at, landing_page, converted_at')
    .eq('referral_code', code)
    .order('created_at', { ascending: false })
    .limit(10);

  const recentVisits = (recentData ?? []).map(v => ({
    id:           v.id,
    created_at:   v.created_at,
    landing_page: v.landing_page,
    converted:    !!v.converted_at,
  }));

  return {
    totalVisits:    totalVisits    ?? 0,
    totalPageViews: totalPageViews ?? 0,
    conversions:    conversions    ?? 0,
    topPages,
    recentVisits,
  };
}
