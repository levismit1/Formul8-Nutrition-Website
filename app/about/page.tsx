import type { Metadata } from "next";
import BenefitCard from "@/components/BenefitCard";
import CTABand from "@/components/CTABand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta("About", "Formul8 Nutrition was created around a simple observation: wellness can become unnecessarily complicated. Meet the brand building gut health differently.", "/about");

const VALUES = [
  { title: "Keep It Simple", text: "Fewer steps, clearer choices, and a routine that's easy to keep." },
  { title: "Be Transparent", text: "We'll tell you what's in the product and why, before you're ever asked to buy." },
  { title: "Build With Purpose", text: "Every decision, from ingredients to packaging, has to earn its place." },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="We're Building Gut Health Differently.">
        Formul8 Nutrition is an early-stage brand, and we&apos;re being upfront about it. Here&apos;s why we&apos;re building it.
      </PageHero>

      <section className="bg-warm section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal><p className="eyebrow mb-4">Our story</p><h2 className="h-section">It started with a simple observation.</h2></Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-forest/75">
            <p><strong className="font-semibold text-forest">Wellness can become unnecessarily complicated.</strong></p>
            <p>Consumers are often faced with countless supplements, complicated routines, confusing ingredient lists, and products that don&apos;t fit naturally into everyday life.</p>
            <p>Formul8 is being built around simplicity. Our mission is to create approachable daily nutrition products people actually look forward to using.</p>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-forest section">
        <div className="container-x">
          <Reveal><SectionHeader dark eyebrow="Our values" title="What We Stand For." /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => <Reveal key={v.title} delay={i * 80}><BenefitCard dark title={v.title}>{v.text}</BenefitCard></Reveal>)}
          </div>
        </div>
      </section>

      <section className="bg-cream section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal><p className="eyebrow mb-4">The name</p><h2 className="h-section">Why the name Formul8?</h2></Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-forest/75">
            <p>The name brings together three ideas: <strong className="font-semibold text-forest">thoughtful formulation</strong>, <strong className="font-semibold text-forest">optimization</strong>, and the repeatable daily routine that turns good intentions into habits.</p>
            <p>The 8 is a nod to the loop of a daily routine: something you come back to, again and again.</p>
          </Reveal>
        </div>
      </section>

      <CTABand source="about-cta" title="We're just getting started.">Join the Formul8 community before launch.</CTABand>
    </>
  );
}
