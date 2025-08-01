"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Pricing = () => {
  const [userCurrency, setUserCurrency] = useState('USD');
  const [pricingInfo, setPricingInfo] = useState({
    One_Time_Package: { price: 1200, currency: 'USD' },
    Monthly_Retainer: { price: 2000, currency: 'USD' },
  });

  useEffect(() => {
    // Fetch user's location based on IP address
    fetch('https://api.geoapify.com/v1/ipinfo?apiKey=804d4e83a85d425abd321a50550d4c0e')
      .then(response => response.json())
      .then(data => {
        const userCountry = data.country.iso_code;
        const currencyMap: { [key: string]: string } = {
          GH: 'GHC',
          NG: 'NGN',
          GB: 'GBP',
          US: 'USD',
          CA: 'CAD',
          EU: 'EUR',
        };
        const currency = currencyMap[userCountry] || 'USD';
        setUserCurrency(currency);

        // Update pricing based on user's currency
        const conversionRates: { [key: string]: { [key: string]: number } } = {
          USD: { GHC: 12, NGN: 1200, GBP: 0.75 },
        };
        const updatedPricingInfo = { ...pricingInfo };
        for (const packageName in updatedPricingInfo) {
          if (Object.prototype.hasOwnProperty.call(updatedPricingInfo, packageName)) {
            const conversionRate = conversionRates[updatedPricingInfo[packageName as keyof typeof updatedPricingInfo].currency]?.[currency] || 1;
            updatedPricingInfo[packageName as keyof typeof updatedPricingInfo].price = Math.round(updatedPricingInfo[packageName as keyof typeof updatedPricingInfo].price * conversionRate);
            updatedPricingInfo[packageName as keyof typeof updatedPricingInfo].currency = currency;
          }
        }
        setPricingInfo(updatedPricingInfo);
      })
      .catch(error => {
        console.error('Error fetching geolocation data:', error);
      });
  }, []);

  const calculateDiscountedPrice = (price: number) => Math.round(price * 0.6);

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
              <p className="text-5xl font-bold line-through text-gray-500">{pricingInfo.One_Time_Package.currency} {pricingInfo.One_Time_Package.price}</p>
              <p className="text-5xl font-bold text-green-600 ml-4">{pricingInfo.One_Time_Package.currency} {calculateDiscountedPrice(pricingInfo.One_Time_Package.price)}</p>
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
              <p className="text-5xl font-bold line-through text-gray-500">{pricingInfo.Monthly_Retainer.currency} {pricingInfo.Monthly_Retainer.price}/mo</p>
              <p className="text-5xl font-bold text-green-600 ml-4">{pricingInfo.Monthly_Retainer.currency} {calculateDiscountedPrice(pricingInfo.Monthly_Retainer.price)}/mo</p>
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
          After your one-off project, upgrade to our Monthly Retainer within 3 months for just {userCurrency} {Math.round(calculateDiscountedPrice(pricingInfo.Monthly_Retainer.price) - calculateDiscountedPrice(pricingInfo.One_Time_Package.price))} more.<br />
          Upgrade now and save {userCurrency} {Math.round(calculateDiscountedPrice(pricingInfo.Monthly_Retainer.price) - (calculateDiscountedPrice(pricingInfo.Monthly_Retainer.price) - calculateDiscountedPrice(pricingInfo.One_Time_Package.price)))}!
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Pricing;