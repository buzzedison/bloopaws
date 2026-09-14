// No quote text, customer details, prices or email addresses belong in analytics.
export function track(
  name: string,
  details: Record<string, string | number | boolean> = {},
) {
  try {
    const w = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    const payload = { tool: "quote_builder", ...details };
    if (w.gtag) w.gtag("event", name, payload);
    else {
      w.dataLayer = w.dataLayer || [];
      const enqueue = function (..._args: unknown[]) {
        w.dataLayer!.push(arguments);
      };
      enqueue("event", name, payload);
    }
  } catch {
    /* Optional analytics must not stop quote creation. */
  }
}
export function trackVisit() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const previous = localStorage.getItem("bloop:quote:last-visit");
    if (previous && previous !== today)
      track("quote_builder_return", {
        days_since_previous_use: Math.max(
          1,
          Math.floor((Date.parse(today) - Date.parse(previous)) / 86400000),
        ),
      });
    localStorage.setItem("bloop:quote:last-visit", today);
  } catch {
    /* Works without storage. */
  }
}
