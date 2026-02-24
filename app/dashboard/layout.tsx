"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";
import '../globals.css';

const supabase = createClient();

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Redirect to login if not authenticated
        router.push("/login?redirect=/dashboard");
        return;
      }
      
      // Get user profile
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);

      // Referral pages require admin-approved Kazi partner access.
      if (pathname.startsWith("/referral/")) {
        const userEmail = userData.user?.email?.toLowerCase();

        if (!userEmail) {
          router.push("/referral");
          return;
        }

        const { data: partnerApplication, error: partnerError } = await supabase
          .from("referral_partner_applications")
          .select("status")
          .eq("email", userEmail)
          .maybeSingle();

        if (partnerError) {
          console.error("Error checking referral partner status:", partnerError);
          router.push("/referral?approval=pending");
          return;
        }

        if (!partnerApplication || partnerApplication.status !== "approved") {
          router.push("/referral?approval=pending");
          return;
        }
      }

      setLoading(false);
    };
    
    checkAuth();
  }, [pathname, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link prefetch={false} href="/" className="flex items-center">
                <Image
                  width={120}
                  height={30}
                  src="/images/blooplogo2.png"
                  alt="Bloop logo"
                />
              </Link>
              <span className="ml-4 text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <Link prefetch={false} 
                  href="/dashboard" 
                  className={`text-sm font-medium ${
                    activeSection === "dashboard" ? "text-red-600" : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveSection("dashboard")}
                >
                  Dashboard
                </Link>
                <Link prefetch={false} 
                  href="/referral/dashboard" 
                  className={`text-sm font-medium ${
                    activeSection === "referrals" ? "text-red-600" : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveSection("referrals")}
                >
                  Referrals
                </Link>
                <Link prefetch={false} 
                  href="/referral" 
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Refer Someone
                </Link>
              </nav>
              
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline text-sm text-gray-600">
                  {user?.user_metadata?.name || user?.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
    </div>
  );
}
