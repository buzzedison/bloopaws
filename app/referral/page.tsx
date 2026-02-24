"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Users,
  Search,
  MessageSquare,
  Banknote,
  Globe,
  Smartphone,
  Cpu,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Layers,
  Layout,
  PieChart,
  Quote as QuoteIcon,
  CheckCircle2,
} from "lucide-react";

type TierId = "SCOUT" | "OPERATIVE" | "FIELD_AGENT" | "ELITE_OPERATIVE";
type TierMode = "auto" | TierId;
type CalculatorServiceId = "WEBSITE" | "WEB_APP" | "MOBILE_APP" | "AI_AUTOMATION" | "FRACTIONAL_CTO";

type Tier = {
  id: TierId;
  name: string;
  title: string;
  bracket: string;
  rate: number;
  perks: string;
};

const tiers: Tier[] = [
  {
    id: "SCOUT",
    name: "SCOUT",
    title: "[ TIER 1 ]",
    bracket: "1–2 successful client referrals",
    rate: 0.08,
    perks: "30-day payout cycle | Referral kit included | WhatsApp partner support",
  },
  {
    id: "OPERATIVE",
    name: "OPERATIVE",
    title: "[ TIER 2 ]",
    bracket: "3–5 successful client referrals",
    rate: 0.1,
    perks: "21-day payout cycle | Co-branded referral page | Monthly strategy call with Edison",
  },
  {
    id: "FIELD_AGENT",
    name: "FIELD AGENT",
    title: "[ TIER 3 ]",
    bracket: "6–10 successful client referrals",
    rate: 0.12,
    perks: "14-day payout cycle | Partner directory listing | Quarterly bonus pool entry",
  },
  {
    id: "ELITE_OPERATIVE",
    name: "ELITE OPERATIVE",
    title: "[ TIER 4 ]",
    bracket: "11+ successful client referrals",
    rate: 0.15,
    perks: "7-day payout cycle | Named on bloopglobal.com | Equity conversation eligible",
  },
];

const serviceRates: Record<CalculatorServiceId, { label: string; dealSizeGhs: number }> = {
  WEBSITE: { label: "Website", dealSizeGhs: 3000 },
  WEB_APP: { label: "Web App", dealSizeGhs: 20000 },
  MOBILE_APP: { label: "Mobile App", dealSizeGhs: 25000 },
  AI_AUTOMATION: { label: "AI Automation", dealSizeGhs: 10000 },
  FRACTIONAL_CTO: { label: "Fractional CTO", dealSizeGhs: 8000 },
};

const resolveTierByReferrals = (totalReferrals: number): Tier => {
  if (totalReferrals >= 11) return tiers[3];
  if (totalReferrals >= 6) return tiers[2];
  if (totalReferrals >= 3) return tiers[1];
  return tiers[0];
};

const getTier = (mode: TierMode, cumulativeReferrals: number): Tier => {
  if (mode === "auto") {
    return resolveTierByReferrals(cumulativeReferrals);
  }

  return tiers.find((tier) => tier.id === mode) ?? tiers[0];
};

type ApplicationFormData = {
  fullName: string;
  emailAddress: string;
  accountPassword: string;
  phoneNumber: string;
  cityCountry: string;
  industry: string;
  network: string;
  motivation: string;
};

const initialFormData: ApplicationFormData = {
  fullName: "",
  emailAddress: "",
  accountPassword: "",
  phoneNumber: "",
  cityCountry: "",
  industry: "",
  network: "",
  motivation: "",
};

const pillars = [
  {
    title: "01. PRECISION OVER VOLUME",
    body: "We don't want you spamming your contact list. We want one well-targeted introduction per month that closes. Quality referrals move through our pipeline faster, meaning you get paid faster.",
    icon: Target,
  },
  {
    title: "02. SKIN IN THE GAME",
    body: "The more clients you close, the higher your tier climbs — and the higher your cut grows. You start at 8%. You can reach 15% plus a 3% sub-referral bonus. Your earning rate is in your hands.",
    icon: TrendingUp,
  },
  {
    title: "03. INTELLIGENCE SUPPORT",
    body: "You get a co-branded referral landing page, a pitch deck you can share, email and WhatsApp templates, and direct access to a Bloop team member who will support every introduction you make.",
    icon: ShieldCheck,
  },
];

const operationSteps = [
  {
    title: "STEP 1 — ENLIST",
    body: "Fill out the Kazi application. You'll receive your unique referral code, your co-branded partner kit, and access to your personal dashboard within 48 hours.",
    icon: Users,
  },
  {
    title: "STEP 2 — IDENTIFY",
    body: "Think about your network. Who is building something? Who is frustrated with their current tech agency? Who just raised funding and needs to build fast? That person is your target. One name. One introduction. That is all it takes.",
    icon: Search,
  },
  {
    title: "STEP 3 — INTRODUCE",
    body: "Submit the referral through your dashboard, forward our co-branded deck, or simply connect us on WhatsApp. We take it from there. Our team will follow up, present, and close — so you never have to play salesperson.",
    icon: MessageSquare,
  },
  {
    title: "STEP 4 — EARN",
    body: "When the client signs and makes their first payment, your commission is triggered. Paid to your bank account within your tier's payout window. No chasing. No paperwork. Clean transfer.",
    icon: Banknote,
  },
];

const services = [
  {
    name: "Website Design & Development",
    audience: "For: Startups, SMEs, corporates who need a strong digital presence",
    price: "Starting from GHS 3,000 / £300",
    cut: "Your cut: GHS 240–450 / £24–45 per deal",
    icon: Globe,
  },
  {
    name: "Web Application Development",
    audience: "For: Founders building their first SaaS, companies digitising operations",
    price: "Starting from GHS 20,000 / £2,000",
    cut: "Your cut: GHS 1,600–3,000 / £160–300 per deal",
    icon: Layout,
  },
  {
    name: "Mobile App Development",
    audience: "For: Businesses going mobile-first, field ops, consumer apps",
    price: "Starting from GHS 25,000 / £2,500",
    cut: "Your cut: GHS 2,000–3,750 / £200–375 per deal",
    icon: Smartphone,
  },
  {
    name: "AI & Workflow Automation",
    audience: "For: Companies drowning in manual processes, operations teams",
    price: "Starting from GHS 10,000 / £1,200",
    cut: "Your cut: GHS 800–1,500 / £96–180 per deal",
    icon: Cpu,
  },
  {
    name: "Fractional CTO Services",
    audience: "For: Non-technical founders, CEOs who need a technical voice",
    price: "From GHS 8,000/mo / £800/mo",
    cut: "Your cut: up to GHS 1,200/mo / £120/mo RECURRING",
    icon: Layers,
  },
  {
    name: "Pitch Deck & Financial Modeling",
    audience: "For: Founders going into fundraising rounds",
    price: "From GHS 5,000 / £500",
    cut: "Your cut: GHS 400–750 / £40–75 per deal",
    icon: PieChart,
  },
  {
    name: "Market Research & Strategy",
    audience: "For: Founders pre-launch, companies entering new markets",
    price: "From GHS 8,000 / £800",
    cut: "Your cut: GHS 640–1,200 / £64–120 per deal",
    icon: Briefcase,
  },
  {
    name: "TaskWit Training Programs",
    audience: "For: Corporate teams, accelerators, executive programmes",
    price: "From GHS 10,000 / £1,000",
    cut: "Your cut: GHS 800–1,500 / £80–150 per deal",
    icon: GraduationCap,
  },
];

const faqs = [
  {
    q: "Do I need to be a salesperson to participate?",
    a: "No. Your only job is to make the introduction. Once you connect a potential client to Bloop — through your dashboard, a WhatsApp forward, or a direct email intro — our team takes the conversation forward. We qualify, present, and close. You earn when the deal lands.",
  },
  {
    q: "What counts as a 'closed' referral?",
    a: "A referral is closed when the client signs their service agreement and makes their first payment (the deposit). That is the trigger for your commission. Submitted leads that do not close do not generate commissions.",
  },
  {
    q: "How exactly does the tier system work?",
    a: "Your tier is based on your total cumulative successful referrals since joining. You start as a Scout. Close 3 deals and you're an Operative. Close 6 and you're a Field Agent. Hit 11 and you're Elite. Your rate is locked in at each tier and never goes backwards.",
  },
  {
    q: "Can I refer internationally?",
    a: "Yes. Bloop serves clients in Ghana, Nigeria, the UK, and globally. If you know a founder or business owner anywhere in the world who needs what we build, you can refer them. Commissions are paid in GHS, GBP, or USD depending on your preference and the client's contract currency.",
  },
  {
    q: "What if I refer someone and they come back 6 months later?",
    a: "If your referred client returns and signs a second project within 12 months of their first deal, you earn 50% of your standard commission on that second deal — automatically. Your relationship with your clients works in your favour.",
  },
  {
    q: "Is there a minimum before I get paid?",
    a: "No minimum. One successful referral, one commission payment. Payouts begin on the deal's first collected payment.",
  },
  {
    q: "How do I track my referrals?",
    a: "Every Kazi partner receives access to a personal dashboard showing submitted leads, lead status, closed deals, pending commissions, and total lifetime earnings. The dashboard also shows your current tier and how many closed deals you need to reach the next level.",
  },
];

export default function ReferralPage() {
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const [isDark, setIsDark] = useState(false);
  const [referralsPerMonth, setReferralsPerMonth] = useState(1);
  const [serviceType, setServiceType] = useState<CalculatorServiceId>("WEBSITE");
  const [tierMode, setTierMode] = useState<TierMode>("auto");
  const [cumulativeReferrals, setCumulativeReferrals] = useState(0);
  const [applicationForm, setApplicationForm] = useState<ApplicationFormData>(initialFormData);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [applicationSubmitMessage, setApplicationSubmitMessage] = useState("");
  const [applicationSubmitError, setApplicationSubmitError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("referral-theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      setCurrentUser(data.user);

      setApplicationForm((prev) => ({
        ...prev,
        fullName: prev.fullName || data.user.user_metadata?.name || "",
        emailAddress: prev.emailAddress || data.user.email || "",
        phoneNumber: prev.phoneNumber || data.user.user_metadata?.phone || "",
      }));
    };

    loadCurrentUser();
  }, [supabase]);

  const toggleTheme = () => {
    setIsDark((previous) => {
      const next = !previous;
      window.localStorage.setItem("referral-theme", next ? "dark" : "light");
      return next;
    });
  };

  const effectiveTier = useMemo(() => getTier(tierMode, cumulativeReferrals), [tierMode, cumulativeReferrals]);

  const calculatorResults = useMemo(() => {
    const monthlyCommission = referralsPerMonth * serviceRates[serviceType].dealSizeGhs * effectiveTier.rate;
    const annualCommission = monthlyCommission * 12;
    const tierInSixMonths = resolveTierByReferrals(cumulativeReferrals + referralsPerMonth * 6);

    return {
      monthlyCommission,
      annualCommission,
      tierInSixMonths,
    };
  }, [referralsPerMonth, serviceType, effectiveTier, cumulativeReferrals]);

  const handleApplicationInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplicationSubmitError("");
    setApplicationSubmitMessage("");
    setIsSubmittingApplication(true);

    try {
      const normalizedEmail = (currentUser?.email || applicationForm.emailAddress).trim().toLowerCase();
      let userId: string | null = currentUser?.id || null;
      let requiresEmailVerification = false;

      if (!currentUser) {
        if (!applicationForm.accountPassword || applicationForm.accountPassword.length < 6) {
          throw new Error("Set a password with at least 6 characters.");
        }

        const signUpResult = await supabase.auth.signUp({
          email: normalizedEmail,
          password: applicationForm.accountPassword,
          options: {
            data: {
              name: applicationForm.fullName,
              phone: applicationForm.phoneNumber,
              city_country: applicationForm.cityCountry,
            },
          },
        });

        if (signUpResult.error) {
          const maybeExistingUser = signUpResult.error.message.toLowerCase().includes("already");
          if (!maybeExistingUser) {
            throw signUpResult.error;
          }

          const signInResult = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: applicationForm.accountPassword,
          });

          if (signInResult.error) {
            throw new Error("Account exists. Use the correct password to continue your Kazi application.");
          }

          userId = signInResult.data.user?.id || null;
          setCurrentUser(signInResult.data.user || null);
        } else {
          userId = signUpResult.data.user?.id || null;
          requiresEmailVerification = !signUpResult.data.session;
          if (signUpResult.data.user) {
            setCurrentUser(signUpResult.data.user);
          }
        }
      }

      const { data: existingApplication, error: existingError } = await supabase
        .from("referral_partner_applications")
        .select("id, status")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (existingError) {
        throw existingError;
      }

      if (existingApplication?.status === "approved") {
        setApplicationSubmitMessage("Your Kazi account is already approved. Access your dashboard now.");
        setIsApplicationSubmitted(true);
        return;
      }

      if (existingApplication?.status === "pending") {
        setApplicationSubmitMessage("Your Kazi application is already pending admin approval.");
        setIsApplicationSubmitted(true);
        return;
      }

      if (existingApplication?.status === "rejected") {
        setApplicationSubmitMessage("Your previous application was rejected. Contact support before reapplying.");
        setIsApplicationSubmitted(true);
        return;
      }

      const payload = {
        user_id: userId,
        full_name: applicationForm.fullName.trim(),
        email: normalizedEmail,
        phone_number: applicationForm.phoneNumber.trim(),
        city_country: applicationForm.cityCountry.trim(),
        industry: applicationForm.industry,
        network: applicationForm.network,
        motivation: applicationForm.motivation.trim() || null,
        status: "pending" as const,
      };

      const { error: insertError } = await supabase
        .from("referral_partner_applications")
        .insert(payload);

      if (insertError) throw insertError;

      setApplicationSubmitMessage(
        requiresEmailVerification
          ? "Account created. Verify your email, then wait for admin approval."
          : "Account created and application submitted. We will review and approve from the admin dashboard."
      );
      setIsApplicationSubmitted(true);
      setApplicationForm((prev) => ({
        ...initialFormData,
        emailAddress: prev.emailAddress,
        fullName: prev.fullName,
      }));
    } catch (error: any) {
      console.error("Error submitting Kazi application:", error);
      setApplicationSubmitError(error?.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const ghsCurrency = (value: number) =>
    new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(value);

  const mainClass = isDark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900";
  const heroSectionClass = isDark ? "border-b border-neutral-800" : "border-b border-neutral-200";
  const sectionClass = isDark ? "border-b border-neutral-900 px-4 py-16" : "border-b border-neutral-200 px-4 py-16";
  const heroGlow = isDark
    ? "bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.2),transparent_40%)]"
    : "bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_45%)]";

  const headingText = isDark ? "text-white" : "text-neutral-900";
  const bodyText = isDark ? "text-neutral-300" : "text-neutral-700";
  const mutedText = isDark ? "text-neutral-400" : "text-neutral-500";
  const sectionLabelClass = isDark
    ? "inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-red-300"
    : "inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-red-700";

  const surfaceCard = isDark
    ? "rounded-xl border border-neutral-800 bg-neutral-900"
    : "rounded-xl border border-neutral-200 bg-white shadow-sm";
  const subtleCard = isDark
    ? "rounded-xl border border-neutral-800 bg-neutral-900/60"
    : "rounded-xl border border-neutral-200 bg-white";

  const primaryButton =
    "inline-flex items-center justify-center rounded-md border border-red-500 bg-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-600";
  const ghostButton = isDark
    ? "inline-flex items-center justify-center rounded-md border border-neutral-600 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-neutral-100 transition hover:border-red-500 hover:text-red-200"
    : "inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wide text-neutral-800 transition hover:border-red-600 hover:text-red-700";

  const inputClass = isDark
    ? "w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-500 focus:bg-neutral-900 focus:outline-none transition-colors"
    : "w-full rounded-lg border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none transition-colors";

  const pendingApprovalFromRedirect = searchParams.get("approval") === "pending";

  const notionSpring = { type: "spring", stiffness: 400, damping: 30 };
  const cardHover = { scale: 1.01, y: -2 };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fcfcfc]'} overflow-x-hidden selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black`}>
      {pendingApprovalFromRedirect && (
        <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-3 text-center text-sm font-medium text-yellow-800 z-50 relative">
          Your Kazi account is pending admin approval. Submit or update your application below.
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative min-h-[90vh] flex items-center pt-24 pb-20 px-6 lg:px-20 overflow-hidden`}>
        {/* Abstract minimalistic background grid */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: isDark ? 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)' : 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-semibold ${isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 shadow-sm text-neutral-700'} self-start`}>
              <span className="flex h-2 w-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse"></span>
              The Kazi Program
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Turn connections <br className="hidden md:block" />
              into <span className="text-neutral-400">capital.</span>
            </h1>

            <p className={`text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'} max-w-lg`}>
              A streamlined partnership alliance for founders and professionals. Refer deals, track them in your dashboard, and earn up to 15% commission with automated payouts.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={notionSpring}
                href="#application"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-sm ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
              >
                Apply Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={notionSpring}
                href="#calculator"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border transition-all ${isDark ? 'border-neutral-800 hover:bg-neutral-800 text-white' : 'border-neutral-200 hover:bg-neutral-50 text-neutral-900 shadow-sm'}`}
              >
                Calculate Earnings
              </motion.a>
            </div>

            <div className={`mt-6 flex gap-10 pt-8 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>15%</h4>
                <p className={`text-sm mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Max Commission</p>
              </div>
              <div>
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>7 Days</h4>
                <p className={`text-sm mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Payout Cycle</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ...notionSpring }}
            className="relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ${isDark ? 'shadow-white/5 border border-neutral-800' : 'shadow-zinc-900/10 border border-neutral-200/50'}`}
            >
              <Image src="/images/appealing_referral_hero.png" alt="People connecting" fill className="object-cover" />

              {/* Subtle overlay to make UI elements pop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent z-0 pointer-events-none"></div>

              {/* Minimal Dashboard Floating Element */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className={`absolute bottom-6 left-6 flex items-center gap-4 p-4 rounded-xl border shadow-lg backdrop-blur-md z-10 ${isDark ? 'bg-neutral-900/80 border-neutral-700/50 text-white' : 'bg-white/90 border-neutral-200/50 text-neutral-900'}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-inner ${isDark ? 'bg-neutral-800/80 border border-neutral-700' : 'bg-neutral-100/80 border border-neutral-200/50'}`}>
                  <CheckCircle2 size={20} className={isDark ? "text-green-400" : "text-green-600"} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Deal Closed</p>
                  <p className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>Commission transfer initiated</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Mission Brief Section */}
      <section className={`py-32 px-6 lg:px-20 ${isDark ? 'bg-[#0f0f0f] border-y border-neutral-900' : 'bg-neutral-50/50 border-y border-neutral-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { ...notionSpring } }
              }}
              className="flex flex-col justify-center"
            >
              <div className={`mb-4 inline-flex items-center px-2 py-1 rounded bg-neutral-200/50 dark:bg-neutral-800 text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Program Architecture
              </div>
              <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                More than an affiliate link. <br />
                <span className="text-neutral-400">An operational alliance.</span>
              </h2>
              <div className={`space-y-4 text-[15px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'} max-w-md`}>
                <p>
                  We treat our partners like extended team members. Instead of a generic 5% cut and a delayed monthly payout, we've built a structured dashboard and clear career progression.
                </p>
                <p>
                  Your goal is simple: identify teams needing tech talent. Provide the introduction. We handle the discovery, the presentations, and the execution.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-col gap-4"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: notionSpring }
                  }}
                  whileHover={cardHover}
                  transition={notionSpring}
                  className={`p-6 rounded-xl border flex gap-6 ${isDark ? 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'} transition-colors`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <pillar.icon className={`w-5 h-5 ${isDark ? "text-neutral-300" : "text-neutral-700"}`} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{pillar.title}</h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{pillar.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Operations Flow with Image Background */}
      <section className={`relative py-32 px-6 lg:px-20 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              The standard operating procedure
            </h2>
            <p className={`text-[15px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Four steps from joining to receiving your first commission. Clean, predictable execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operationSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={cardHover}
                transition={notionSpring}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { ...notionSpring, delay: idx * 0.1 } }
                }}
                className={`p-6 rounded-xl border flex flex-col ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50/50 border-neutral-200 shadow-sm'} transition-colors`}
              >
                <div className={`w-8 h-8 rounded-md mb-6 flex items-center justify-center font-bold text-xs ${isDark ? 'bg-white text-black' : 'bg-neutral-900 text-white'}`}>
                  {idx + 1}
                </div>
                <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{step.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className={`py-32 px-6 lg:px-20 ${isDark ? 'bg-[#0f0f0f] border-t border-neutral-900' : 'bg-[#fafafa] border-t border-neutral-200/50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className={`text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Earning Tiers
            </h2>
            <p className={`text-[15px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'} max-w-xl`}>
              Every successful referral moves you closer to Elite status. Your rate is locked in at each tier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={cardHover}
                transition={{ ...notionSpring, delay: idx * 0.1 }}
                className={`p-6 rounded-xl border relative overflow-hidden flex flex-col ${idx === 3 ? 'border-neutral-900 shadow-md ring-1 ring-neutral-900 dark:ring-white dark:border-white' : isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`}
              >
                {idx === 3 && <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-white' : 'bg-black'} pointer-events-none`}></div>}

                <p className="text-[10px] font-semibold tracking-wider text-neutral-500 mb-2 uppercase">{tier.title}</p>
                <h3 className={`text-lg font-bold tracking-tight mb-1 ${idx === 3 ? (isDark ? 'text-white' : 'text-black') : (isDark ? 'text-white' : 'text-neutral-900')}`}>{tier.name}</h3>
                <p className={`text-xs font-medium mb-6 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{tier.bracket}</p>

                <div className="py-4 border-y border-neutral-200 dark:border-neutral-800 mb-6">
                  <p className={`text-3xl font-bold tracking-tighter ${headingText}`}>{Math.round(tier.rate * 100)}%</p>
                  <p className={`text-[11px] font-medium uppercase tracking-wider mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Commission Rate</p>
                </div>

                <ul className="space-y-3 mt-auto">
                  {tier.perks.split(" | ").map((perk, i) => (
                    <li key={i} className={`text-xs flex items-start gap-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${idx === 3 ? (isDark ? 'text-white' : 'text-black') : 'text-neutral-400'}`} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section with SaaS Feel */}
      <section id="calculator" className={`py-32 px-6 lg:px-20 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Earnings Simulator
            </h2>
            <p className={`text-[15px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Calculate your potential monthly and annual revenue based on referral volume.
            </p>
          </div>

          <div className={`grid md:grid-cols-5 rounded-2xl overflow-hidden border shadow-sm ${isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-white'}`}>
            {/* Controls */}
            <div className="p-8 md:col-span-3 flex flex-col justify-center border-r border-neutral-200 dark:border-neutral-800">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label htmlFor="referralsPerMonth" className={`text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      Referrals per month
                    </label>
                    <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>{referralsPerMonth}</span>
                  </div>
                  <input
                    id="referralsPerMonth"
                    type="range"
                    min={1}
                    max={10}
                    value={referralsPerMonth}
                    onChange={(event) => setReferralsPerMonth(Number(event.target.value))}
                    className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="serviceType" className={`block mb-2 text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      Avg Service Type
                    </label>
                    <select
                      id="serviceType"
                      value={serviceType}
                      onChange={(event) => setServiceType(event.target.value as CalculatorServiceId)}
                      className={`w-full p-2.5 rounded-lg border text-sm font-medium focus:border-neutral-500 outline-none transition-colors ${isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50/50 border-neutral-200 text-neutral-900'}`}
                    >
                      {Object.entries(serviceRates).map(([key, service]) => (
                        <option key={key} value={key}>{service.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cumulativeReferrals" className={`block mb-2 text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      Past Successful
                    </label>
                    <input
                      id="cumulativeReferrals"
                      type="number"
                      min={0}
                      value={cumulativeReferrals}
                      onChange={(event) => setCumulativeReferrals(Math.max(0, Number(event.target.value) || 0))}
                      className={`w-full p-2.5 rounded-lg border text-sm font-medium focus:border-neutral-500 outline-none transition-colors ${isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50/50 border-neutral-200 text-neutral-900'}`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tierMode" className={`block mb-2 text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                    Tier Simulation Mode
                  </label>
                  <select
                    id="tierMode"
                    value={tierMode}
                    onChange={(event) => setTierMode(event.target.value as TierMode)}
                    className={`w-full p-2.5 rounded-lg border text-sm font-medium focus:border-neutral-500 outline-none transition-colors ${isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50/50 border-neutral-200 text-neutral-900'}`}
                  >
                    <option value="auto">Auto (based on cumulative referrals)</option>
                    <option value="SCOUT">Scout (8%)</option>
                    <option value="OPERATIVE">Operative (10%)</option>
                    <option value="FIELD_AGENT">Field Agent (12%)</option>
                    <option value="ELITE_OPERATIVE">Elite Operative (15%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className={`p-8 md:col-span-2 flex flex-col justify-center ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-50/50'}`}>
              <div className="space-y-8">
                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Monthly Outlook</p>
                  <p className={`text-4xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {ghsCurrency(calculatorResults.monthlyCommission)}
                  </p>
                </div>

                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Annual Trajectory</p>
                  <p className={`text-2xl font-semibold tracking-tight ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    {ghsCurrency(calculatorResults.annualCommission)}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <p className={`text-[11px] font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>6-Month Tier Projection</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-md border text-xs font-semibold ${isDark ? 'bg-white text-black border-white' : 'bg-neutral-900 text-white border-neutral-900'}`}>
                    {calculatorResults.tierInSixMonths.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Application Form Section */}
      <section id="application" className={`py-32 px-6 lg:px-20 ${isDark ? 'bg-neutral-950 border-t border-neutral-900' : 'bg-white border-t border-neutral-200'}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Apply for Kazi</h2>
            <p className={`text-[15px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Takes 2 minutes. Acceptance within 48 hours. No cost to join.
            </p>
          </div>

          {!isApplicationSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={notionSpring}
              className={`p-8 rounded-2xl border shadow-sm ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'}`}
              onSubmit={handleApplicationSubmit}
            >
              <div className="space-y-6">
                <div>
                  <h4 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Profile Identity</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      name="fullName"
                      required
                      value={applicationForm.fullName}
                      onChange={handleApplicationInput}
                      placeholder="Full Name"
                      className={inputClass}
                    />
                    <input
                      name="emailAddress"
                      type="email"
                      required
                      value={applicationForm.emailAddress}
                      onChange={handleApplicationInput}
                      placeholder="Email Address"
                      readOnly={Boolean(currentUser?.email)}
                      className={`${inputClass} ${currentUser?.email ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {!currentUser && (
                      <input
                        name="accountPassword"
                        type="password"
                        required
                        minLength={6}
                        value={applicationForm.accountPassword}
                        onChange={handleApplicationInput}
                        placeholder="Create Password"
                        className={inputClass}
                      />
                    )}
                    <input
                      name="phoneNumber"
                      required
                      value={applicationForm.phoneNumber}
                      onChange={handleApplicationInput}
                      placeholder="Phone (+123...)"
                      className={inputClass}
                    />
                    <input
                      name="cityCountry"
                      required
                      value={applicationForm.cityCountry}
                      onChange={handleApplicationInput}
                      placeholder="City / Country"
                      className={`${inputClass} sm:col-span-2`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Professional Territory</h4>
                  <select
                    name="industry"
                    required
                    value={applicationForm.industry}
                    onChange={handleApplicationInput}
                    className={inputClass}
                  >
                    <option value="">Select industry category</option>
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="pt-2">
                  <h4 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Network Footprint</h4>
                  <select
                    name="network"
                    required
                    value={applicationForm.network}
                    onChange={handleApplicationInput}
                    className={inputClass}
                  >
                    <option value="">Select network persona</option>
                    <option value="Startup founders">Startup founders</option>
                    <option value="SME owners">SME owners</option>
                    <option value="Corporate executives">Corporate executives</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <div className="pt-2">
                  <h4 className={`text-xs font-semibold tracking-wider uppercase mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Details (Optional)</h4>
                  <textarea
                    name="motivation"
                    rows={3}
                    value={applicationForm.motivation}
                    onChange={handleApplicationInput}
                    placeholder="How do you plan to refer clients?"
                    className={inputClass}
                  />
                </div>

                {applicationSubmitError && (
                  <p className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium">{applicationSubmitError}</p>
                )}

                <button type="submit" disabled={isSubmittingApplication} className={`w-full py-4 rounded-lg font-medium text-sm transition-all shadow-sm ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                  {isSubmittingApplication ? "Processing submission..." : "Submit Application"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={notionSpring}
              className="p-10 rounded-2xl border bg-green-500/5 border-green-500/20 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>Application Received</h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{applicationSubmitMessage || "We will review your submission and respond within 48 hours."}</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setIsApplicationSubmitted(false)} className={`px-4 py-2 rounded-lg border text-sm font-medium ${isDark ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-50 text-neutral-900'}`}>
                  Submit Another
                </button>
                <Link prefetch={false} href="/referral/dashboard" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}>
                  View Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

    </main>
  );
}
