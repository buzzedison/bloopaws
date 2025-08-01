'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  price: number;
}

const USD_TO_GHS_RATE = 12.50; // Keep in sync with the API rate

export default function PurchaseModal({
  isOpen,
  onClose,
  domain,
  price,
}: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/domains/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          price,
          email: formData.email,
          name: formData.name,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) throw new Error(error);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) throw new Error(stripeError.message);

    } catch (error) {
      console.error('Stripe payment error:', error);
      toast.error('Error processing Stripe payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaystackPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/domains/paystack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          price,
          email: formData.email,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.authorization_url) {
        throw new Error('No payment URL received');
      }

      // Redirect to Paystack payment page
      window.location.href = data.authorization_url;

    } catch (error: any) {
      console.error('Paystack payment error:', error);
      toast.error(error.message || 'Error processing Paystack payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X />
          </button>

          <Dialog.Title className="text-xl font-semibold mb-4">
            Purchase Domain
          </Dialog.Title>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">Domain: <span className="font-semibold text-gray-900">{domain}</span></p>
            <p className="text-gray-600">Price: <span className="font-semibold text-gray-900">${price}</span></p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleStripePayment}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay with Stripe</span>
                    <span className="text-sm">({price} USD)</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePaystackPayment}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay with Paystack</span>
                    <span className="text-sm">
                      (GH₵{(price * USD_TO_GHS_RATE).toLocaleString()} GHS)
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
} 