'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import DomainResults from './DomainResults';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { DomainResult } from '../types/domain';

interface DomainExtension {
  id: string;
  name: string;
  price: number;
}

const domainExtensions: DomainExtension[] = [
  { id: 'com', name: '.com', price: 19.99 },
  { id: 'co', name: '.co', price: 34.99 },
  { id: 'net', name: '.net', price: 19.99 },
  { id: 'org', name: '.org', price: 138.99 },
  { id: 'io', name: '.io', price: 59.99 },
  { id: 'ai', name: '.ai', price: 99.99 },
];

export default function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExtension, setSelectedExtension] = useState('com');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DomainResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm) {
      toast.error('Please enter a domain name');
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API call - replace with actual API integration
      const response = await fetch('/api/domains/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: searchTerm,
          extension: selectedExtension,
        }),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      toast.error('Error checking domain availability');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              placeholder="Enter your domain name"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-lg"
            />
            <Search className="absolute right-4 top-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          </div>
          
          <select
            value={selectedExtension}
            onChange={(e) => setSelectedExtension(e.target.value)}
            className="px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white text-lg cursor-pointer hover:border-blue-500 transition-all duration-200"
          >
            {domainExtensions.map((ext) => (
              <option key={ext.id} value={ext.id}>
                {ext.name} (${ext.price})
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-lg font-medium flex items-center justify-center min-w-[140px] shadow-lg hover:shadow-xl"
          >
            {isSearching ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-12"
          >
            <DomainResults results={searchResults} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 