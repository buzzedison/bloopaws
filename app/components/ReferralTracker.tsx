'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Read a browser cookie by name
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// Get or create a session ID (lives in sessionStorage — cleared when tab closes)
function getSessionId(): string {
  const key = 'ref_session_id';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const newId = crypto.randomUUID();
  sessionStorage.setItem(key, newId);
  return newId;
}

async function track(payload: object) {
  try {
    await fetch('/api/referral/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Tracking should never break the page
  }
}

export default function ReferralTracker() {
  const pathname  = usePathname();
  const searchParams = useSearchParams();
  const sessionRef   = useRef<string | null>(null);
  const codeRef      = useRef<string | null>(null);
  const visitedRef   = useRef(false);

  // On mount — record the initial visit
  useEffect(() => {
    // Resolve ref code: prefer URL param, fall back to cookie
    const urlRef = searchParams.get('ref');
    const code   = urlRef ?? getCookie('ref_code');
    if (!code) return;

    codeRef.current = code;
    const sessionId  = getSessionId();
    sessionRef.current = sessionId;

    if (visitedRef.current) return; // already recorded for this session
    visitedRef.current = true;

    track({
      type:        'visit',
      code,
      sessionId,
      landingPage: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every route change — record a page view
  useEffect(() => {
    const code      = codeRef.current ?? getCookie('ref_code');
    const sessionId = sessionRef.current ?? sessionStorage.getItem('ref_session_id');
    if (!code || !sessionId) return;

    track({
      type:      'page_view',
      code,
      sessionId,
      path:      pathname,
    });
  }, [pathname]);

  return null; // purely logical, renders nothing
}
