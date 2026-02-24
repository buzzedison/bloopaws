import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Check admin status
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    const isAdmin = profile?.is_admin === true;

    // Only allow updating safe fields
    const allowed = [
      "status",
      "potential_value",
      "actual_value",
      "commission_rate",
      "commission",
      "commission_paid",
      "commission_paid_date",
      "message",
    ];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
    }

    // Admins update any referral; partners only update their own
    let query = supabase.from("referrals").update(updates).eq("id", id);
    if (!isAdmin) query = query.eq("referrer_id", user.id);

    const { data: updated, error } = await query.select().single();

    if (error) {
      console.error("Error updating referral:", error);
      return NextResponse.json({ message: "Failed to update referral" }, { status: 500 });
    }
    if (!updated) {
      return NextResponse.json(
        { message: "Referral not found or permission denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Referral updated successfully", referral: updated });
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json({ message: "Failed to update referral" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check admin status
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    const isAdmin = profile?.is_admin === true;

    // Admins delete any referral; partners only delete their own
    let query = supabase.from("referrals").delete().eq("id", id);
    if (!isAdmin) query = query.eq("referrer_id", user.id);

    const { error } = await query;

    if (error) {
      console.error("Error deleting referral:", error);
      return NextResponse.json({ message: "Failed to delete referral" }, { status: 500 });
    }

    return NextResponse.json({ message: "Referral deleted successfully", deletedId: id });
  } catch (error) {
    console.error("Error deleting referral:", error);
    return NextResponse.json({ message: "Failed to delete referral" }, { status: 500 });
  }
}
