"use client";
import { useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "dark" | "light" | "compact";

/**
 * The one waitlist form used everywhere. Posts to /api/waitlist (see app/api/waitlist/route.ts),
 * which forwards to WAITLIST_WEBHOOK_URL. Success is only shown when the server confirms.
 */
export default function WaitlistForm({ source, variant = "light", showName = true, onSuccess }: { source: string; variant?: Variant; showName?: boolean; onSuccess?: () => void }) {
  const id = useId();
  const started = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dark = variant === "dark" || variant === "compact";
  const compact = variant === "compact";

  const input = `w-full rounded-xl border px-4 py-3.5 text-base outline-none transition-colors placeholder:opacity-60 focus:ring-2 focus:ring-sage ${dark ? "border-cream/30 bg-cream/10 text-cream focus:border-cream" : "border-forest/25 bg-white text-forest focus:border-forest"}`;
  const label = `mb-1.5 block text-sm font-medium ${dark ? "text-cream/90" : "text-forest"}`;

  function onStart() {
    if (!started.current) { started.current = true; track("WaitlistFormStart", { source }); }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setStatus("error"); setError("Please enter a valid email address."); return; }
    if (!compact && !fd.get("consent")) { setStatus("error"); setError("Please tick the box so we can email you launch updates."); return; }
    setStatus("submitting"); setError("");
    track("WaitlistSubmit", { source });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: fd.get("firstName") || "", consent: true, source, website: fd.get("website") || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      track("WaitlistSuccess", { source });
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={`rounded-2xl p-8 text-center ${dark ? "bg-cream/10 text-cream" : "border border-sage/60 bg-cream text-forest"}`}>
        <p className="font-display text-3xl">YOU&apos;RE ON THE LIST.</p>
        <p className={`mt-3 ${dark ? "text-cream/80" : "text-forest/75"}`}>Welcome to Formul8. We&apos;ll let you know when it&apos;s time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={onStart} noValidate className="w-full text-left" aria-label="Join the Formul8 waitlist">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-4"}>
        {showName && !compact && (
          <div>
            <label htmlFor={`${id}-name`} className={label}>First name <span className="opacity-60">(optional)</span></label>
            <input id={`${id}-name`} name="firstName" type="text" autoComplete="given-name" className={input} placeholder="First name" />
          </div>
        )}
        <div className={compact ? "flex-1" : ""}>
          <label htmlFor={`${id}-email`} className={compact ? "sr-only" : label}>Email address</label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className={input} placeholder="Enter your email" aria-describedby={status === "error" ? `${id}-err` : undefined} aria-invalid={status === "error" || undefined} />
        </div>
        {compact ? (
          <button type="submit" disabled={status === "submitting"} className="rounded-xl bg-cream px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-forest transition-colors hover:bg-white disabled:opacity-60">
            {status === "submitting" ? "Joining…" : "Join"}
          </button>
        ) : (
          <>
            <label className={`flex items-start gap-3 text-sm leading-snug ${dark ? "text-cream/80" : "text-forest/75"}`}>
              <input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-natural" />
              <span>I agree to receive Formul8 launch updates and early-access emails. I can unsubscribe at any time. See our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.</span>
            </label>
            <button type="submit" disabled={status === "submitting"} className={`w-full rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-60 ${dark ? "bg-cream text-forest hover:bg-white" : "bg-forest text-cream hover:bg-deep"}`}>
              {status === "submitting" ? "Joining…" : "Join the Waitlist"}
            </button>
          </>
        )}
      </div>
      {compact && <p className="mt-2 text-xs text-cream/60">By joining you agree to receive Formul8 emails. Unsubscribe anytime.</p>}
      <p id={`${id}-err`} role="alert" className={`mt-3 text-sm ${dark ? "text-[#ffd9c9]" : "text-[#9b2c1a]"}`}>{status === "error" ? error : ""}</p>
    </form>
  );
}
