/**
 * Analytics hooks. Every event in the site goes through track().
 * To add Meta Pixel / GA, set the env IDs (see .env.example); components/Analytics.tsx
 * loads the scripts only when an ID exists, and track() forwards to whatever is loaded.
 */
export type AnalyticsEvent =
  | "PageView"
  | "WaitlistButtonClick"
  | "WaitlistFormStart"
  | "WaitlistSubmit"
  | "WaitlistSuccess";

type Win = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, params);
  // Meta Pixel: standard events where one exists, custom otherwise.
  if (w.fbq) {
    if (event === "PageView") w.fbq("track", "PageView");
    else if (event === "WaitlistSuccess") w.fbq("track", "Lead", params);
    else w.fbq("trackCustom", event, params);
  }
  // Google Analytics 4
  if (w.gtag) w.gtag("event", event, params);
  // Custom listeners (e.g. GTM): window.addEventListener("formul8:track", ...)
  window.dispatchEvent(new CustomEvent("formul8:track", { detail: { event, params } }));
}
