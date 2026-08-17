export interface BudgetTier {
  label: string
  value: string
}

export interface RegionConfig {
  currency: string
  symbol: string
  tiers: BudgetTier[]
  calendlyUrl: string
}

// Map Vercel x-vercel-ip-country codes → pricing config
const REGION_MAP: Record<string, RegionConfig> = {
  GH: {
    currency: 'GHS',
    symbol: 'GHS',
    tiers: [
      { label: 'Under GHS 3,000',        value: 'under-3k-ghs' },
      { label: 'GHS 3,000 – 5,000',      value: '3k-5k-ghs' },
      { label: 'GHS 5,000 – 10,000',     value: '5k-10k-ghs' },
      { label: 'GHS 10,000+',            value: '10k-plus-ghs' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  NG: {
    currency: 'NGN',
    symbol: '₦',
    tiers: [
      { label: 'Under ₦500,000',         value: 'under-500k-ngn' },
      { label: '₦500,000 – ₦1,500,000',  value: '500k-1.5m-ngn' },
      { label: '₦1,500,000 – ₦3,000,000',value: '1.5m-3m-ngn' },
      { label: '₦3,000,000+',            value: '3m-plus-ngn' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  GB: {
    currency: 'GBP',
    symbol: '£',
    tiers: [
      { label: 'Under £3,000',           value: 'under-3k-gbp' },
      { label: '£3,000 – £8,000',        value: '3k-8k-gbp' },
      { label: '£8,000 – £20,000',       value: '8k-20k-gbp' },
      { label: '£20,000+',               value: '20k-plus-gbp' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  CA: {
    currency: 'CAD',
    symbol: 'CA$',
    tiers: [
      { label: 'Under CA$5,000',         value: 'under-5k-cad' },
      { label: 'CA$5,000 – CA$15,000',   value: '5k-15k-cad' },
      { label: 'CA$15,000 – CA$40,000',  value: '15k-40k-cad' },
      { label: 'CA$40,000+',             value: '40k-plus-cad' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  AU: {
    currency: 'AUD',
    symbol: 'A$',
    tiers: [
      { label: 'Under A$5,000',          value: 'under-5k-aud' },
      { label: 'A$5,000 – A$15,000',     value: '5k-15k-aud' },
      { label: 'A$15,000 – A$40,000',    value: '15k-40k-aud' },
      { label: 'A$40,000+',              value: '40k-plus-aud' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  KE: {
    currency: 'KES',
    symbol: 'KSh',
    tiers: [
      { label: 'Under KSh 50,000',       value: 'under-50k-kes' },
      { label: 'KSh 50,000 – 150,000',   value: '50k-150k-kes' },
      { label: 'KSh 150,000 – 400,000',  value: '150k-400k-kes' },
      { label: 'KSh 400,000+',           value: '400k-plus-kes' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
  ZA: {
    currency: 'ZAR',
    symbol: 'R',
    tiers: [
      { label: 'Under R30,000',          value: 'under-30k-zar' },
      { label: 'R30,000 – R80,000',      value: '30k-80k-zar' },
      { label: 'R80,000 – R200,000',     value: '80k-200k-zar' },
      { label: 'R200,000+',              value: '200k-plus-zar' },
    ],
    calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
  },
}

// Default (US + everyone else) in USD
const DEFAULT_REGION: RegionConfig = {
  currency: 'USD',
  symbol: '$',
  tiers: [
    { label: 'Under $5,000',            value: 'under-5k-usd' },
    { label: '$5,000 – $15,000',        value: '5k-15k-usd' },
    { label: '$15,000 – $40,000',       value: '15k-40k-usd' },
    { label: '$40,000+',                value: '40k-plus-usd' },
  ],
  calendlyUrl: 'https://calendly.com/bloopglobal/discovery',
}

export function getRegionConfig(countryCode: string | null): RegionConfig {
  return REGION_MAP[countryCode?.toUpperCase() ?? ''] ?? DEFAULT_REGION
}

// Which budget tiers count as "high intent" (route straight to Calendly)
export const HIGH_INTENT_TIERS = new Set([
  '5k-10k-ghs', '10k-plus-ghs',
  '1.5m-3m-ngn', '3m-plus-ngn',
  '8k-20k-gbp', '20k-plus-gbp',
  '15k-40k-cad', '40k-plus-cad',
  '15k-40k-aud', '40k-plus-aud',
  '150k-400k-kes', '400k-plus-kes',
  '80k-200k-zar', '200k-plus-zar',
  '15k-40k-usd', '40k-plus-usd',
])
