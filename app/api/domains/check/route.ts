import { NextResponse } from 'next/server';

const WHOISXML_API_KEY = process.env.WHOISXML_API_KEY;

export async function POST(req: Request) {
  try {
    const { domain, extension } = await req.json();
    const fullDomain = `${domain}.${extension}`;

    try {
      // Check domain availability using WHOISXML API
      const response = await fetch(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${WHOISXML_API_KEY}&domainName=${fullDomain}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      console.log('WHOISXML API Response:', data); // For debugging

      // Check if we have a valid response
      if (!data.DomainInfo) {
        throw new Error('Invalid API response');
      }

      // WHOISXML API returns "UNAVAILABLE" for registered domains
      const isAvailable = data.DomainInfo.domainAvailability === "AVAILABLE";

      return NextResponse.json({
        domain: fullDomain,
        available: isAvailable,
        price: isAvailable ? getPrice(extension) : 0,
        suggestions: !isAvailable ? generateSuggestions(domain, extension) : [],
      });

    } catch (apiError) {
      console.error('WHOISXML API error:', apiError);
      throw apiError;
    }

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
    com: 19.99,
    co: 34.99,
    net: 18.99,
    org: 18.99,
    io: 59.99,
    ai: 99.99,
  };
  return prices[extension] || 18.99;
}

function generateSuggestions(domain: string, extension: string) {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 999) + 1;
  
  return [
    `${domain}${currentYear}.${extension}`,
    `my${domain}.${extension}`,
    `${domain}${randomNum}.${extension}`,
    `get${domain}.${extension}`,
  ];
} 