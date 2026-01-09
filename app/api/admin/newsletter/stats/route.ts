import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
        const convertKitApiSecret = process.env.CONVERTKIT_API_SECRET; // We likely need this for stats

        if (!convertKitApiSecret) {
            // Fallback or error if missing
            return NextResponse.json(
                { error: 'ConvertKit API Secret not configured' },
                { status: 500 }
            );
        }

        // Fetch total subscribers count (simplified example)
        const response = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${convertKitApiSecret}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch ConvertKit stats' },
                { status: response.status }
            );
        }

        const data = await response.json();

        // ConvertKit returns total_subscribers in the response
        return NextResponse.json({
            totalSubscribers: data.total_subscribers || 0,
            recentSubscribers: data.subscribers?.slice(0, 5).map((s: any) => ({
                id: s.id,
                email: s.email_address,
                createdAt: s.created_at
            })) || []
        });
    } catch (error) {
        console.error('Newsletter stats error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
