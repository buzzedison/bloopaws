import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Launch Promo — Websites & Apps",
  description:
    "Launch a professional website from GHC 1,999 or an app from GHC 5,999 with Bloop Global. Promo ends September 30, 2026.",
  openGraph: {
    title: "Your Business Should Be Online — Bloop Global",
    description:
      "Websites from GHC 1,999. Apps from GHC 5,999. Claim the Digital Launch Promo before September 30, 2026.",
    url: "https://bloopglobal.com/repackage",
    images: [{ url: "/repackage-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Business Should Be Online — Bloop Global",
    description: "Websites from GHC 1,999. Apps from GHC 5,999. Ends September 30, 2026.",
    images: ["/repackage-og.png"],
  },
}

export default function RepackageLayout({ children }: { children: React.ReactNode }) {
  return children
}
