'use client';

import { Check, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import PurchaseModal from './PurchaseModal';

interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
  suggestions?: string[];
}

export default function DomainResults({ results }: { results: DomainResult }) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>(results.domain);
  const [selectedPrice, setSelectedPrice] = useState<number>(results.price);

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedDomain(suggestion);
    setSelectedPrice(results.price); // You might want to adjust price based on the suggestion
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {results.available ? (
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">{results.domain}</h3>
              <p className="text-lg text-gray-600">
                {results.available ? 'Available for registration' : 'Already registered'}
              </p>
            </div>
          </div>
          
          {results.available && (
            <div className="flex items-center space-x-6">
              <p className="text-2xl font-bold text-gray-900">${results.price}</p>
              <button
                onClick={() => {
                  setSelectedDomain(results.domain);
                  setSelectedPrice(results.price);
                  setIsPurchaseModalOpen(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Purchase</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {!results.available && results.suggestions && results.suggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-50">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Alternative Suggestions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-6 border-2 border-gray-100 rounded-xl hover:border-red-500 cursor-pointer transition-all duration-200 hover:shadow-md text-left"
              >
                <p className="text-lg font-medium text-gray-900">{suggestion}</p>
                <p className="text-sm text-gray-500 mt-1">Available for registration</p>
                <p className="text-lg font-semibold text-red-600 mt-2">${results.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        domain={selectedDomain}
        price={selectedPrice}
      />
    </div>
  );
} 