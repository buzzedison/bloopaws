import './globals.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import ChatBot from './components/ChatBot';
import GoogleAnalytics from "../app/components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";
import ReferralTracker from "./components/ReferralTracker";

export const metadata = {
  metadataBase: new URL('https://bloopglobal.com'),
  title: {
    default: 'Bloop Global | Your Technical Co-Founder',
    template: '%s | Bloop Global'
  },
  description: 'Bloop Global is a product development studio for non-technical founders. We build web apps, mobile platforms, and AI automation — shipped fast, built to scale, and designed to raise funding.',
  keywords: [
    'technical co-founder',
    'MVP development',
    'AI automation agency',
    'web app development for startups',
    'mobile app development agency',
    'product development studio',
    'startup software development',
    'SaaS MVP builder',
    'software agency Ghana',
    'software agency Nigeria',
    'software agency UK',
    'non-technical founder',
    'Bloop Global',
  ],
  authors: [{ name: 'Bloop Global' }],
  creator: 'Bloop Global LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloopglobal.com',
    siteName: 'Bloop Global',
    title: 'Bloop Global — Your Technical Co-Founder',
    description: 'We build the product while you build the business. AI automation, web apps, and mobile platforms — shipped fast, built to scale, and designed to raise funding.',
    images: [
      {
        url: '/images/aboutbloop.png',
        width: 1200,
        height: 630,
        alt: 'Bloop Global — Product Development Studio for Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloop Global — Your Technical Co-Founder',
    description: 'We build the product while you build the business. AI automation, web apps, and mobile platforms — shipped fast, built to scale, and designed to raise funding.',
    images: ['/images/aboutbloop.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bloop Global",
              "url": "https://bloopglobal.com",
              "logo": "https://bloopglobal.com/images/blooplogo2.png",
              "description": "Product development studio for non-technical founders. We build web apps, mobile platforms, and AI automation.",
              "sameAs": [
                "https://www.linkedin.com/company/bloopglobal",
                "https://twitter.com/bloopglobal",
                "https://www.instagram.com/bloopglobal",
                "https://www.facebook.com/bloopglobal"
              ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+233500002994",
                "contactType": "sales",
                "areaServed": ["US", "GB", "GH", "CA", "NG"],
                "availableLanguage": "English"
              }],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Product Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Automation",
                      "description": "Custom AI workflows and automation systems that eliminate repetitive work."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web & Mobile App Development",
                      "description": "Full-stack web and mobile applications built for scale and designed to raise funding."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MVP Development",
                      "description": "Launch-ready MVPs in 8–12 weeks with fixed pricing and weekly demos."
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ? (
          <MetaPixel pixel_id={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID} />
        ) : null}
        <ReferralTracker />
        <Navbar />
        <main>
          <ChatBot />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
