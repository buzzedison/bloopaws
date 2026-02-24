import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Anonymise IP — keep only first 3 octets (e.g. 192.168.1.xxx)
function anonymiseIp(ip: string | null): string | null {
  if (!ip) return null;
  const parts = ip.split('.');
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  return null; // IPv6 — skip for now
}

function getIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;
  return anonymiseIp(ip);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, code, sessionId, landingPage, path, conversionType, metadata } = body;

    if (!type || !code) {
      return NextResponse.json({ message: 'Missing type or code' }, { status: 400 });
    }

    const supabase = createClient();

    // Verify the referral code actually exists to prevent spam
    const { data: codeRow } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('code', code)
      .single();

    if (!codeRow) {
      return NextResponse.json({ message: 'Invalid referral code' }, { status: 404 });
    }

    // ── VISIT ──────────────────────────────────────────────────────
    if (type === 'visit') {
      if (!sessionId || !landingPage) {
        return NextResponse.json({ message: 'Missing sessionId or landingPage' }, { status: 400 });
      }

      // Upsert so duplicate session IDs are silently ignored
      const { data: visit, error } = await supabase
        .from('referral_visits')
        .upsert(
          {
            referral_code: code,
            session_id:    sessionId,
            ip:            getIp(request),
            user_agent:    request.headers.get('user-agent') ?? null,
            landing_page:  landingPage,
          },
          { onConflict: 'session_id', ignoreDuplicates: true }
        )
        .select('id')
        .single();

      if (error && error.code !== '23505') { // ignore unique-violation
        console.error('Error recording visit:', error);
        return NextResponse.json({ message: 'Failed to record visit' }, { status: 500 });
      }

      return NextResponse.json({ success: true, visitId: visit?.id ?? null });
    }

    // ── PAGE VIEW ──────────────────────────────────────────────────
    if (type === 'page_view') {
      if (!sessionId || !path) {
        return NextResponse.json({ message: 'Missing sessionId or path' }, { status: 400 });
      }

      // Look up the visit for this session
      const { data: visit } = await supabase
        .from('referral_visits')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (!visit) {
        return NextResponse.json({ message: 'Visit not found' }, { status: 404 });
      }

      await supabase.from('referral_events').insert({
        visit_id:      visit.id,
        referral_code: code,
        event_type:    'page_view',
        page_path:     path,
        metadata:      metadata ?? null,
      });

      return NextResponse.json({ success: true });
    }

    // ── CONVERSION ─────────────────────────────────────────────────
    if (type === 'conversion') {
      if (!sessionId) {
        return NextResponse.json({ message: 'Missing sessionId' }, { status: 400 });
      }

      const { data: visit } = await supabase
        .from('referral_visits')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (!visit) {
        return NextResponse.json({ message: 'Visit not found' }, { status: 404 });
      }

      // Mark the visit as converted
      await supabase
        .from('referral_visits')
        .update({
          converted_at:    new Date().toISOString(),
          conversion_type: conversionType ?? 'unknown',
        })
        .eq('id', visit.id);

      // Also log the conversion as an event
      await supabase.from('referral_events').insert({
        visit_id:      visit.id,
        referral_code: code,
        event_type:    conversionType ?? 'conversion',
        page_path:     path ?? '/',
        metadata:      metadata ?? null,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: 'Unknown event type' }, { status: 400 });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
