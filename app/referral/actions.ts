"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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

// In a real implementation, this would interact with a database
// For demo purposes, we'll use a simple implementation
export async function createReferral(formData: ReferralFormData) {
  try {
    // In a real implementation, we would save this to a database
    console.log("Referral submitted:", formData);
    
    // For demo purposes, we'll just return a success message
    // In a real implementation, we would return the created referral
    return { success: true, message: "Referral submitted successfully" };
  } catch (error) {
    console.error("Error creating referral:", error);
    throw new Error("Failed to create referral");
  }
}

export async function getReferralStats(): Promise<ReferralStats> {
  try {
    // In a real implementation, we would fetch this from a database
    // For demo purposes, we'll return mock data
    return {
      totalReferrals: 12,
      pendingReferrals: 8,
      closedReferrals: 4,
      totalEarnings: 1250.00
    };
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    throw new Error("Failed to fetch referral stats");
  }
}

export async function getReferrals() {
  try {
    // In a real implementation, we would fetch this from a database
    // For demo purposes, we'll return mock data
    return [
      {
        id: "ref1",
        clientName: "Jane Smith",
        clientEmail: "jane@example.com",
        companyName: "Acme Inc.",
        status: "pending",
        dateReferred: "2025-03-15",
        potentialValue: 5000
      },
      {
        id: "ref2",
        clientName: "John Doe",
        clientEmail: "john@example.com",
        companyName: "XYZ Corp",
        status: "closed",
        dateReferred: "2025-02-20",
        potentialValue: 8000,
        actualValue: 8000,
        commission: 1200
      },
      {
        id: "ref3",
        clientName: "Alice Johnson",
        clientEmail: "alice@example.com",
        companyName: "Tech Solutions",
        status: "closed",
        dateReferred: "2025-01-10",
        potentialValue: 3000,
        actualValue: 3000,
        commission: 150
      },
      {
        id: "ref4",
        clientName: "Bob Williams",
        clientEmail: "bob@example.com",
        companyName: "Global Services",
        status: "pending",
        dateReferred: "2025-04-05",
        potentialValue: 10000
      }
    ];
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw new Error("Failed to fetch referrals");
  }
}

export async function updateReferralStatus(referralId: string, status: string) {
  try {
    // In a real implementation, we would update this in a database
    console.log(`Updating referral ${referralId} to status: ${status}`);
    
    // For demo purposes, we'll just return a success message
    revalidatePath("/referral/dashboard");
    return { success: true, message: "Referral status updated successfully" };
  } catch (error) {
    console.error("Error updating referral status:", error);
    throw new Error("Failed to update referral status");
  }
}

export async function saveReferralCode(referralCode: string) {
  try {
    // Save the referral code to a cookie
    cookies().set("referralCode", referralCode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/"
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error saving referral code:", error);
    throw new Error("Failed to save referral code");
  }
}

export async function getReferralCode() {
  try {
    const referralCode = cookies().get("referralCode")?.value;
    return referralCode || null;
  } catch (error) {
    console.error("Error getting referral code:", error);
    return null;
  }
}
