"use client";

import { useEffect } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const PROTECTED = [
  "/api/anniversary", "/api/build-sheet/subscribe", "/api/chat", "/api/claim-offer",
  "/api/contact", "/api/diagnostic/send-report", "/api/diagnostic/submit",
  "/api/founder-scorecard/subscribe", "/api/funding", "/api/market-fit/send-report",
  "/api/mediabrain/waitlist", "/api/quiz/invite", "/api/quiz/submit",
  "/api/quote-builder/enquiry", "/api/repackage", "/api/save-contact",
  "/api/send-email", "/api/send-followup", "/api/vanguard/apply",
];

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (id: string) => void;
  reset: (id: string) => void;
};

/**
 * Loads Cloudflare Turnstile (invisible unless Cloudflare needs an interaction)
 * and attaches a fresh single-use token to every POST to a protected API route,
 * so individual forms need no changes.
 */
export default function TurnstileGate() {
  useEffect(() => {
    if (!SITE_KEY) return;
    const originalFetch = window.fetch;
    let widgetId: string | null = null;
    let pending: ((token: string) => void) | null = null;
    let container: HTMLDivElement | null = null;

    const ts = () => (window as unknown as { turnstile?: Turnstile }).turnstile;

    const ensureWidget = () =>
      new Promise<void>((resolve) => {
        const init = () => {
          const t = ts();
          if (!t) return;
          if (!container) {
            container = document.createElement("div");
            container.style.cssText = "position:fixed;bottom:16px;right:16px;z-index:9999";
            document.body.appendChild(container);
          }
          if (widgetId === null) {
            widgetId = t.render(container, {
              sitekey: SITE_KEY,
              execution: "execute",
              appearance: "interaction-only",
              callback: (token: string) => pending?.(token),
            });
          }
          resolve();
        };
        if (ts()) return init();
        if (!document.getElementById("cf-turnstile-script")) {
          const s = document.createElement("script");
          s.id = "cf-turnstile-script";
          s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          s.async = true;
          s.onload = init;
          document.head.appendChild(s);
        } else {
          const iv = setInterval(() => {
            if (ts()) { clearInterval(iv); init(); }
          }, 100);
        }
      });

    let queue: Promise<unknown> = Promise.resolve();
    const getToken = () => {
      const run = async () => {
        await ensureWidget();
        const t = ts()!;
        return new Promise<string>((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error("turnstile timeout")), 30000);
          pending = (tok) => { clearTimeout(timer); resolve(tok); };
          t.reset(widgetId!);
          t.execute(widgetId!);
        });
      };
      const p = queue.then(run, run);
      queue = p.catch(() => undefined);
      return p;
    };

    window.fetch = async (input, init) => {
      try {
        const url = new URL(
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url,
          window.location.origin,
        );
        const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
        if (method === "POST" && url.origin === window.location.origin && PROTECTED.includes(url.pathname)) {
          const token = await getToken();
          const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
          headers.set("x-turnstile-token", token);
          return originalFetch(input, { ...init, headers });
        }
      } catch {
        /* fall through: server will reject if a token was required */
      }
      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
