import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("Contact", "Contact for Formul8 Nutrition.", "/contact");

/* EDITABLE PLACEHOLDER: have final legal text reviewed by a qualified professional before launch. */
export default function Page() {
  return (
    <>
      <PageHero eyebrow="Formul8 Nutrition" title="Contact">Last updated: placeholder, pending review.</PageHero>
      <section className="bg-warm section"><div className="container-x max-w-3xl space-y-5 text-lg leading-relaxed text-forest/75"><p>Questions about Formul8? Contact details will be published here before launch.</p></div></section>
    </>
  );
}
