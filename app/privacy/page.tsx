import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("Privacy Policy", "Privacy Policy for Formul8 Nutrition.", "/privacy");

/* EDITABLE PLACEHOLDER: have final legal text reviewed by a qualified professional before launch. */
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Formul8 Nutrition" title="Privacy Policy">Last updated: placeholder, pending review.</PageHero>
      <section className="bg-warm section"><div className="container-x max-w-3xl space-y-5 text-lg leading-relaxed text-forest/75"><p>Formul8 Nutrition collects your email address and, optionally, your first name when you join the waitlist. We use it only to send launch updates and early-access announcements, and you can unsubscribe at any time.</p><p>We do not sell your information.</p></div></section>
    </>
  );
}
