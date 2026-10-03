import type { Metadata } from "next";
import BenefitCard from "@/components/BenefitCard";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("Why Formul8", "Gut health without the guesswork. See why Formul8 is built around simplicity, consistency, transparency, and a premium daily experience.", "/why-formul8");

const PILLARS = [
  { title: "Simplicity", text: "Wellness products shouldn't require an overflowing supplement cabinet." },
  { title: "Consistency", text: "Products only fit into people's lives when they're easy to use consistently." },
  { title: "Transparency", text: "Customers deserve to understand what they're putting into their bodies." },
  { title: "Experience", text: "Formul8 should taste good, mix easily, look premium, and fit naturally into a daily routine." },
];
const OLD = ["Many separate products to remember", "Long, confusing ingredient lists", "Complicated steps that are hard to keep up", "Products that don't fit into a busy day"];
const NEW = ["One daily powder", "Purposeful ingredients, clearly explained", "Scoop, mix, done", "Designed to fit naturally into your routine"];

export default function WhyFormul8() {
  return (
    <>
      <PageHero eyebrow="Why Formul8" title="Gut Health Without The Guesswork.">
        Formul8 is built on a simple belief: supporting your wellness shouldn&apos;t feel confusing, complicated, or like another full-time job.
      </PageHero>

      <section className="bg-warm section">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="What we believe" title="Four Ideas Behind Everything." /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => <Reveal key={p.title} delay={(i % 2) * 80}><BenefitCard title={p.title}>{p.text}</BenefitCard></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-cream section">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="The difference" title="A Simpler Way To Think About It." center /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-sage/60 bg-warm p-8">
                <h3 className="font-display text-2xl text-forest/70">Traditional complicated wellness routine</h3>
                <ul className="mt-6 space-y-4">{OLD.map((t) => <li key={t} className="flex gap-3 text-forest/70"><span aria-hidden className="mt-0.5 text-forest/40">×</span>{t}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-forest p-8 text-cream">
                <h3 className="font-display text-2xl">The Formul8 Approach</h3>
                <ul className="mt-6 space-y-4">{NEW.map((t) => <li key={t} className="flex gap-3 text-cream/90"><span aria-hidden className="mt-0.5 text-sage">✓</span>{t}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand source="why-cta" title="Ready for a simpler routine?" />
    </>
  );
}
