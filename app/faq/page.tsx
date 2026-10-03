import type { Metadata } from "next";
import CTABand from "@/components/CTABand";
import FAQAccordion from "@/components/FAQAccordion";
import PageHero from "@/components/PageHero";
import { FAQS } from "@/lib/site";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("FAQ", "Answers about Formul8 Nutrition: what it is, when it launches, how to join the waitlist, ingredients, shipping, and more.", "/faq");

export default function FAQ() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, Answered.">Everything we can share about Formul8 right now.</PageHero>
      <section className="bg-warm section">
        <div className="container-x max-w-3xl"><FAQAccordion items={FAQS} /></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </section>
      <CTABand source="faq-cta" title="Still curious?">Be among the first to experience Formul8.</CTABand>
    </>
  );
}
