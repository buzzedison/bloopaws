import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ref = searchParams.get('ref');

  const response = NextResponse.next();

  if (ref) {
    // Store the partner code for 90 days (non-httpOnly so the client tracker can read it)
    response.cookies.set('ref_code', ref, {
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Run on all page routes; skip API, static assets, and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
