import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

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

// In a real implementation, this would interact with a database
// For demo purposes, we'll use in-memory storage
let referrals: Referral[] = [];

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.clientName || !data.clientEmail) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create a new referral
    const newReferral = {
      id: `ref_${Date.now()}`,
      referrerId: session.user.id,
      referrerName: session.user.name,
      referrerEmail: session.user.email,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone || null,
      companyName: data.companyName || null,
      message: data.message || null,
      status: "PENDING",
      dateReferred: new Date().toISOString(),
      potentialValue: data.potentialValue || 0,
      actualValue: null,
      commissionRate: data.commissionType === "close" ? 0.15 : 0.05,
      commissionAmount: null,
      commissionPaid: false,
      commissionPaidDate: null
    };
    
    // In a real implementation, this would be saved to a database
    referrals.push(newReferral);
    
    return NextResponse.json(
      { 
        message: "Referral created successfully", 
        referral: newReferral 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating referral:", error);
    return NextResponse.json(
      { message: "Failed to create referral" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getCurrentUser();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get referrals for the current user
    const userReferrals = referrals.filter(
      referral => referral.referrerId === session.user.id
    );
    
    // Calculate stats
    const totalReferrals = userReferrals.length;
    const pendingReferrals = userReferrals.filter(
      referral => referral.status === "PENDING" || 
                 referral.status === "CONTACTED" || 
                 referral.status === "MEETING_SCHEDULED" || 
                 referral.status === "PROPOSAL_SENT"
    ).length;
    const closedReferrals = userReferrals.filter(
      referral => referral.status === "CLOSED_WON"
    ).length;
    const totalEarnings = userReferrals
      .filter(referral => referral.commissionPaid)
      .reduce((total, referral) => total + (referral.commissionAmount || 0), 0);
    
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
    return NextResponse.json(
      { message: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}
