import { Metadata } from 'next'
import { Suspense } from 'react'
import VanguardClient from './VanguardClient'

export const metadata: Metadata = {
  title: 'Bloop Global On-Site Internship (Dzorwulu): Mobile · BD/Sales · Investment Analyst',
  description: 'Join Bloop Global\'s elite, on-site internship in Accra—ship real products, close real deals, and build investor-grade analysis. The Vanguard Program.',
  keywords: ['internship', 'Accra', 'Dzorwulu', 'mobile development', 'business development', 'investment analyst', 'Bloop Global', 'Vanguard Program'],
  openGraph: {
    title: 'Bloop Global On-Site Internship (Dzorwulu): Mobile · BD/Sales · Investment Analyst',
    description: 'Join Bloop Global\'s elite, on-site internship in Accra—ship real products, close real deals, and build investor-grade analysis.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloop Global On-Site Internship (Dzorwulu)',
    description: 'Join Bloop Global\'s elite, on-site internship in Accra—ship real products, close real deals, and build investor-grade analysis.',
  },
}

export default function VanguardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VanguardClient />
    </Suspense>
  )
}

