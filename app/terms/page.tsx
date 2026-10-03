import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("Terms of Service", "Terms of Service for Formul8 Nutrition.", "/terms");

/* EDITABLE PLACEHOLDER: have final legal text reviewed by a qualified professional before launch. */
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Formul8 Nutrition" title="Terms of Service">Last updated: placeholder, pending review.</PageHero>
      <section className="bg-warm section"><div className="container-x max-w-3xl space-y-5 text-lg leading-relaxed text-forest/75"><p>This website provides information about an upcoming product. Nothing on this site is an offer to sell, and no purchases can be made yet. Content is for general information only and is not medical advice.</p></div></section>
    </>
  );
}
