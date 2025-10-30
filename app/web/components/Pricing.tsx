"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

type PlanKey = 'One_Time_Package' | 'Monthly_Retainer';

interface PlanPricing {
  price: number;
  discountedPrice: number;
  currency: string;
}

const BASE_PRICING: Record<PlanKey, number> = {
  One_Time_Package: 1200,
  Monthly_Retainer: 2000,
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  GH: 'GHS',
  NG: 'NGN',
  GB: 'GBP',
  US: 'USD',
  CA: 'CAD',
  EU: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  IE: 'EUR',
  AU: 'AUD',
  NZ: 'NZD',
  ZA: 'ZAR',
  KE: 'KES',
  IN: 'INR',
};

const CURRENCY_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.37,
  AUD: 1.53,
  NZD: 1.67,
  NGN: 1500,
  GHS: 13.5,
  ZAR: 18.5,
  KES: 135,
  INR: 83,
};

const CURRENCY_PRECISION: Record<string, number> = {
  USD: 0,
  EUR: 0,
  GBP: 0,
  CAD: 0,
  AUD: 0,
  NZD: 0,
  NGN: 0,
  GHS: 0,
  ZAR: 0,
  KES: 0,
  INR: 0,
};

const CURRENCY_FALLBACK_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  NZD: 'NZ$',
  NGN: '₦',
  GHS: '₵',
  ZAR: 'R',
  KES: 'KSh',
  INR: '₹',
};

const convertPricing = (currency: string): Record<PlanKey, PlanPricing> => {
  const rate = CURRENCY_RATES[currency] ?? 1;
  const precision = CURRENCY_PRECISION[currency] ?? 0;
  const multiplier = Math.pow(10, precision);

  return Object.entries(BASE_PRICING).reduce((acc, [plan, basePrice]) => {
    const converted = basePrice * rate;
    const price = Math.round(converted * multiplier) / multiplier;
    const discounted = Math.round(converted * 0.6 * multiplier) / multiplier;

    acc[plan as PlanKey] = {
      price,
      discountedPrice: discounted,
      currency,
    };

    return acc;
  }, {} as Record<PlanKey, PlanPricing>);
};

const formatCurrency = (value: number, currency: string) => {
  try {
    const precision = CURRENCY_PRECISION[currency] ?? 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    }).format(value);
  } catch {
    const symbol = CURRENCY_FALLBACK_SYMBOL[currency] || '';
    return `${symbol}${value.toFixed(CURRENCY_PRECISION[currency] ?? 0)}`.trim();
  }
};

const Pricing = () => {
  const [userCurrency, setUserCurrency] = useState('USD');
  const [pricingInfo, setPricingInfo] = useState<Record<PlanKey, PlanPricing>>(
    () => convertPricing('USD')
  );

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=804d4e83a85d425abd321a50550d4c0e');
        if (!response.ok) throw new Error('Failed to detect location');
        const data = await response.json();
        const userCountry = data?.country?.iso_code;
        const detectedCurrency = COUNTRY_TO_CURRENCY[userCountry] || 'USD';

        setUserCurrency(detectedCurrency);
        setPricingInfo(convertPricing(detectedCurrency));
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
        setUserCurrency('USD');
        setPricingInfo(convertPricing('USD'));
      }
    };

    detectCurrency();
  }, []);

  const currencyLabel = useMemo(() => userCurrency, [userCurrency]);

  const upgradeDifference = useMemo(() => {
    const diff =
      pricingInfo.Monthly_Retainer.discountedPrice -
      pricingInfo.One_Time_Package.discountedPrice;
    return diff > 0 ? diff : 0;
  }, [pricingInfo]);

  const retainerSavings = useMemo(() => {
    const diff = pricingInfo.Monthly_Retainer.price - pricingInfo.Monthly_Retainer.discountedPrice;
    return diff > 0 ? diff : 0;
  }, [pricingInfo]);

  const oneTimePlan = pricingInfo.One_Time_Package;
  const retainerPlan = pricingInfo.Monthly_Retainer;

  const formattedOneTimePrice = formatCurrency(oneTimePlan.price, oneTimePlan.currency);
  const formattedOneTimeDiscount = formatCurrency(oneTimePlan.discountedPrice, oneTimePlan.currency);
  const formattedRetainerPrice = formatCurrency(retainerPlan.price, retainerPlan.currency);
  const formattedRetainerDiscount = formatCurrency(retainerPlan.discountedPrice, retainerPlan.currency);
  const formattedUpgradeDiff = formatCurrency(upgradeDifference, retainerPlan.currency);
  const formattedRetainerSavings = formatCurrency(retainerSavings, retainerPlan.currency);

  return (
    <motion.section 
      className="bg-gradient-to-r from-red-900 to-red-700 text-white py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold mb-10 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Pricing
        </motion.h2>
        
        <p className="text-xl md:text-2xl text-center mb-20">
          Ready to boost your conversions with Bloop?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="bg-white text-red-900 p-10 rounded-lg shadow-lg"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-5">One-Time Package</h3>
            <div className="flex items-center mb-5">
              <p className="text-5xl font-bold line-through text-gray-500">{formattedOneTimePrice}</p>
              <p className="text-5xl font-bold text-green-600 ml-4">{formattedOneTimeDiscount}</p>
            </div>
            <p className="text-xl font-semibold text-green-600 mb-5">Limited Time Offer!</p>
            <p className="text-lg mb-8">
              Launch your high-impact website in just 7 days!
              Perfect for businesses who want results, conversion-focused website that gets results.
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-700 transition duration-300">
              Get started today
            </button>

            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-5">What's Included:</h4>
              <ul className="text-lg space-y-2">
                <li>Branding</li>
                <li>Copywriting</li>
                <li className="opacity-50">Pitch Decks</li>
                <li className="opacity-50">Custom Graphics / Illustrations</li>
                <li className="opacity-50">Development (Web/Mobile Apps)</li>
                <li className="opacity-50">Multipage Websites</li>
                <li className="opacity-50">Social Media Assets</li>
              </ul>
              <p className="mt-5 text-sm text-red-600">* Only available in the Monthly Retainer.</p>
            </div>

            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-5">Features:</h4>
              <ul className="text-lg space-y-2">
                <li>2 Revisions</li>
                <li>24/5 Support</li>
                <li>Delivered in Figma or code</li>
                <li>Updates every 48 hours</li>
                <li>Communication via Asana</li>
                <li className="opacity-50">Full Team Access</li>
                <li className="opacity-50">Bi-Weekly Progress Meetings</li>
                <li className="opacity-50">Unlimited Brands / Users</li>
                <li className="opacity-50">Expert Project Management</li>
              </ul>
              <p className="mt-5 text-sm text-red-600">* Only available in the Monthly Retainer.</p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white text-red-900 p-10 rounded-lg shadow-lg"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-5">Monthly Retainer</h3>
            <div className="flex items-center mb-5">
              <p className="text-5xl font-bold line-through text-gray-500">{formattedRetainerPrice}/mo</p>
              <p className="text-5xl font-bold text-green-600 ml-4">{formattedRetainerDiscount}/mo</p>
            </div>
            <p className="text-xl font-semibold text-green-600 mb-5">Limited Time Offer!</p>
            <p className="text-lg mb-8">
              Pause or cancel anytime!
              Ideal for businesses needing ongoing design and development support.
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-700 transition duration-300">
              Get started today
            </button>

            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-5">What's Included:</h4>
              <ul className="text-lg space-y-2">
                <li>Branding</li>
                <li>Copywriting</li>
                <li>Creative Strategy</li>
                <li>Landing Pages</li>
                <li>Custom Graphics / Illustrations</li>
                <li>Pitch Decks</li>
                <li>Development (Web/Mobile Apps)</li>
                <li>Multipage Websites</li>
                <li>Social Media Assets</li>
              </ul>
            </div>

            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-5">Features:</h4>
              <ul className="text-lg space-y-2">
                <li>24/5 Support</li>
                <li>Unlimited Revisions</li>
                <li>Access to Figma and code files</li>
                <li>Updates every 48 hours</li>
                <li>Communication via Asana</li>
                <li>Full Team Access</li>
                <li>Bi-Weekly Progress Meetings</li>
                <li>Unlimited Brands / Users</li>
                <li>Expert Project Management</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p 
          className="text-center text-lg mt-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          After your one-off project, upgrade to our Monthly Retainer within 3 months for just {formattedUpgradeDiff} more per month.<br />
          Upgrade now and save {formattedRetainerSavings} every month you stay on retainer.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Pricing;