import './globals.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import ChatBot from './components/ChatBot';
import GoogleAnalytics from "../app/components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";
import ReferralTracker from "./components/ReferralTracker";
// Metadata is imported via the export const metadata object below

export const metadata = {
  title: {
    default: 'Bloop Global LLC | Turning Ideas into Businesses',
    template: '%s | Bloop Global LLC'
  },
  description: 'Bloop Global is an elite product development studio. We provide the capital, code, and strategy to turn ambitious ideas into market-leading businesses.',
  keywords: ['Product Development', 'Software Engineering', 'Venture Studio', 'AI Automation', 'Startup Funding', 'Bloop Global'],
  authors: [{ name: 'Bloop Team' }],
  creator: 'Bloop Global LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloopglobal.com',
    siteName: 'Bloop Global',
    title: 'Bloop Global LLC',
    description: 'Turning Ideas into Businesses through elite engineering and aggressive strategy.',
    images: [
      {
        url: '/images/aboutbloop.png',
        width: 1200,
        height: 630,
        alt: 'Bloop Global - Turning Ideas into Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloop Global LLC',
    description: 'Turning Ideas into Businesses through elite engineering and aggressive strategy.',
    images: ['/images/aboutbloop.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
