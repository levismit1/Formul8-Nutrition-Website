import type { Metadata } from "next";
import BenefitCard from "@/components/BenefitCard";
import CTABand from "@/components/CTABand";
import { LeafIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("Our Formula", "Formul8 is being developed around a simple philosophy: a convenient daily gut-health powder made with thoughtfully selected ingredients. Join the waitlist.", "/our-formula");

/**
 * EDITABLE CONTENT: placeholder ingredient cards.
 * Replace `name` and `text` once the manufacturer and final formula are confirmed.
 * Do not add quantities, Supplement Facts, certifications, or claims until they are verified.
 */
const INGREDIENT_PLACEHOLDERS = [
  { name: "Ingredient 01", text: "Ingredient name and purpose will be published once the formula is finalized." },
  { name: "Ingredient 02", text: "Ingredient name and purpose will be published once the formula is finalized." },
  { name: "Ingredient 03", text: "Ingredient name and purpose will be published once the formula is finalized." },
  { name: "Ingredient 04", text: "Ingredient name and purpose will be published once the formula is finalized." },
  { name: "Ingredient 05", text: "Ingredient name and purpose will be published once the formula is finalized." },
  { name: "Ingredient 06", text: "Ingredient name and purpose will be published once the formula is finalized." },
];

export default function OurFormula() {
  return (
    <>
      <PageHero eyebrow="Our Formula" title="Purposeful Nutrition. Nothing Complicated.">
        Formul8 is being developed around a simple philosophy: create a convenient daily gut-health product with thoughtfully selected ingredients.
      </PageHero>

      <section className="bg-warm section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Our Formulation Philosophy</p>
            <h2 className="h-section">Fewer Steps. More Purpose.</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-forest/75">
            <p>We believe a good wellness product starts with intention. Every ingredient we consider has to earn its place, rather than padding out a long label.</p>
            <p>The goal is a formula that is easy to understand, easy to use, and easy to stay consistent with.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">What We&apos;re Building</p>
            <h2 className="h-section">A Daily Gut-Health Powder.</h2>
            <p className="mt-5 text-lg leading-relaxed text-forest/75">Formul8 Nutrition is a daily powder designed to support digestive health, overall wellness, and healthy-looking skin from within. It&apos;s still in development, and we&apos;ll share more as the formula is finalized.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl bg-forest p-8 text-cream sm:p-10">
              <p className="eyebrow mb-3 !text-sage">How To Use Formul8</p>
              <ol className="space-y-5">
                {[["Scoop", "Add your daily serving."], ["Mix", "Mix Formul8 into water or your preferred beverage."], ["Make It Routine", "Build Formul8 into your everyday wellness routine."]].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-display text-xl text-sage">0{i + 1}</span>
                    <div><p className="font-display text-xl">{t}</p><p className="text-cream/75">{d}</p></div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-cream/60">Final directions will be confirmed on the product label.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-warm section">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="Ingredient Transparency" title="Clear Labels, Coming Soon." center>We believe you deserve to know what you&apos;re putting into your body. The final formula and complete ingredient information will be published before the product becomes available for purchase.</SectionHeader></Reveal>
          {/* EDITABLE: swap placeholders below for real ingredient cards once the formula is final */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-editable="ingredient-cards">
            {INGREDIENT_PLACEHOLDERS.map((it, i) => (
              <Reveal key={it.name} delay={(i % 3) * 80}><BenefitCard icon={<LeafIcon />} title={it.name}>{it.text}</BenefitCard></Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand source="formula-cta" title="Want to know when the formula drops?" />
    </>
  );
}
