import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist endpoint. Forwards { email, firstName, consent, source, submittedAt }
 * as JSON to WAITLIST_WEBHOOK_URL (Zapier, Make, Formspree, Mailchimp/Klaviyo proxy, etc).
 * To connect an email platform directly, replace the fetch below.
 * If no backend is configured we return 503 so the UI shows an honest error:
 * emails are never silently discarded and success is never faked.
 */
export async function POST(req: Request) {
  let body: { email?: string; firstName?: string; consent?: boolean; source?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend nothing happened.
  if (body.website) return NextResponse.json({ ok: true });

  const email = (body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!body.consent) {
    return NextResponse.json({ error: "Please agree to receive launch emails." }, { status: 400 });
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) {
    console.warn("[waitlist] WAITLIST_WEBHOOK_URL is not set. Signup NOT stored:", email);
    return NextResponse.json(
      { error: "The waitlist isn't connected yet. Your email was not saved. Please try again soon." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WAITLIST_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.WAITLIST_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        email,
        firstName: (body.firstName || "").trim().slice(0, 80),
        consent: true,
        source: body.source || "unknown",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] upstream failure", err);
    return NextResponse.json({ error: "Something went wrong saving your email. Please try again." }, { status: 502 });
  }
}
