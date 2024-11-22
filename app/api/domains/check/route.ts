import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { domain, extension } = await req.json();
    const fullDomain = `${domain}.${extension}`;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // List of common taken domains
    const takenDomains = [
      'google',
      'facebook',
      'amazon',
      'microsoft',
      'apple',
      'twitter',
      'github',
      'netflix',
      'spotify',
    ];

    // Check if domain is taken
    const isDomainTaken = takenDomains.includes(domain.toLowerCase()) || 
                         domain.length <= 3 ||
                         Math.random() > 0.7; // 30% chance domain is taken

    return NextResponse.json({
      domain: fullDomain,
      available: !isDomainTaken,
      price: !isDomainTaken ? getPrice(extension) : 0,
      suggestions: isDomainTaken ? generateSuggestions(domain, extension) : [],
    });

  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { 
        error: 'Error checking domain availability',
        domain: '',
        available: false,
        price: 0,
        suggestions: [],
      },
      { status: 500 }
    );
  }
}

function getPrice(extension: string) {
  const prices: { [key: string]: number } = {
    com: 12.99,
    co: 24.99,
    net: 11.99,
    org: 13.99,
    io: 39.99,
    ai: 79.99,
  };
  return prices[extension] || 14.99;
}

function generateSuggestions(domain: string, extension: string) {
  const currentYear = new Date().getFullYear();
  return [
    `${domain}${currentYear}.${extension}`,
    `my${domain}.${extension}`,
    `get${domain}.${extension}`,
    `${domain}-${Math.floor(Math.random() * 100)}.${extension}`,
  ];
} 