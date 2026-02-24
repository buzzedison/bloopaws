"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client"; // Updated import
const supabase = createClient();

type KaziStatus = "pending" | "approved" | "rejected" | null;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [kaziStatus, setKaziStatus] = useState<KaziStatus>(null);
  // Check if signup=1 is in the URL
  const signup = searchParams.get("signup") === "1";
  const [isSignUp, setIsSignUp] = useState(signup);
  const [name, setName] = useState("");
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      // Only redirect if user is logged in AND not trying to sign up
      if (data.session && !signup) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.session.user.id)
          .single();
        router.push(profile?.is_admin ? '/admin' : redirect);
      }
    };

    checkSession();
  }, [redirect, router, signup]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setKaziStatus(null);
    
    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          try {
            // Use upsert to handle duplicate emails
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                name,
                email
              }, {
                onConflict: 'email', // Specify which column has the unique constraint
                ignoreDuplicates: false // Update the record if it exists
              });
              
            if (profileError) {
              console.error('Profile error:', profileError);
              // Continue with sign-up process even if profile creation fails
              // We don't want to block the user from signing up
            }
          } catch (err) {
            console.error('Error creating profile:', err);
            // Continue with sign-up process
          }
        }
        
        // Show confirmation message
        setError("Please check your email to confirm your account.");
        setLoading(false);
      } else {
        // Sign in
        const { data: signInData, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        // Check if user is admin — redirect to admin dashboard if so
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', signInData.user!.id)
          .single();

        if (profile?.is_admin) {
          setSuccess("Signed in successfully.");
          setLoading(false);
          setTimeout(() => { router.push('/admin'); }, 500);
          return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const { data: application, error: appError } = await supabase
          .from("referral_partner_applications")
          .select("status")
          .eq("email", normalizedEmail)
          .maybeSingle();

        if (appError) {
          console.error("Error fetching Kazi status:", appError);
        }

        const status = (application?.status as KaziStatus) || null;
        setKaziStatus(status);
        setSuccess("Signed in successfully.");
        setLoading(false);

        const redirectPath =
          redirect.startsWith("/referral/") && status !== "approved"
            ? "/referral?approval=pending"
            : redirect;

        setTimeout(() => {
          router.push(redirectPath);
        }, status ? 1400 : 500);

        return;
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during authentication");
      setLoading(false);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link prefetch={false} href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-red-600">Bloop</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isSignUp 
              ? "Already have an account?" 
              : "Don't have an account?"} 
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="ml-1 text-red-600 hover:text-red-800 font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {kaziStatus && (
          <div className={`mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            kaziStatus === "approved"
              ? "bg-green-100 text-green-800 border border-green-300"
              : kaziStatus === "rejected"
              ? "bg-red-100 text-red-800 border border-red-300"
              : "bg-yellow-100 text-yellow-800 border border-yellow-300"
          }`}>
            Kazi Status: {kaziStatus}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
              placeholder="••••••••"
              minLength={6}
            />
            <p className="text-gray-500 text-xs mt-1">
              {isSignUp ? "Password must be at least 6 characters" : ""}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading 
                ? "Processing..." 
                : isSignUp 
                  ? "Create Account" 
                  : "Sign In"
              }
            </button>
          </div>
          
          {!isSignUp && (
            <div className="text-center mt-4">
              <Link prefetch={false} 
                href="/forgot-password" 
                className="text-sm text-red-600 hover:text-red-800"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </form>
        
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            By signing in, you agree to our{" "}
            <Link prefetch={false} href="/terms" className="text-red-600 hover:text-red-800">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link prefetch={false} href="/privacy" className="text-red-600 hover:text-red-800">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
