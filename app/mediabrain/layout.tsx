import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MediaBrain | Turn Any Landing Page Into 16 Meta Ads',
  description: 'MediaBrain is a Claude Code skill that extracts your brand, interviews you, roleplays as your buyer, researches Reddit, and outputs 16 battle-ready Meta ad creatives in 30 minutes.',
  openGraph: {
    title: 'MediaBrain — AI-Powered Meta Ad Creative Generator',
    description: 'From landing page URL to 16 ad creatives in 30 minutes. No agency. No weeks of waiting.',
    type: 'website',
  },
}

export default function MediaBrainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
