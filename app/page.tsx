import type { Metadata } from "next";
import Botanicals from "@/components/Botanicals";
import BenefitCard from "@/components/BenefitCard";
import Button from "@/components/Button";
import { DigestiveIcon, GutIcon, LoopIcon, MixIcon, RoutineIcon, ScoopIcon, SkinIcon } from "@/components/Icons";
import ProductMockup from "@/components/ProductMockup";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import WaitlistButton from "@/components/WaitlistButton";
import WaitlistSection from "@/components/WaitlistSection";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMeta("Formul8 Nutrition | Your Gut. Your Health. Your Formula.", "A simple daily gut-health powder designed to support digestion, everyday wellness, and healthy-looking skin from within. Join the Formul8 waitlist for early access.", "/"),
  title: { absolute: "Formul8 Nutrition | Your Gut. Your Health. Your Formula." },
};

const BENEFITS = [
  { icon: <DigestiveIcon />, title: "Digestive Support", text: "Designed to complement a healthy digestive routine." },
  { icon: <GutIcon />, title: "Gut Wellness", text: "A convenient daily addition to your overall wellness routine." },
  { icon: <SkinIcon />, title: "Skin From Within", text: "Nutrition and wellness designed with healthy-looking skin in mind." },
  { icon: <RoutineIcon />, title: "Simple Daily Routine", text: "One easy powder designed to fit naturally into your day." },
];
const STEPS = [
  { n: "01", icon: <ScoopIcon />, title: "Scoop", text: "Add your daily serving." },
  { n: "02", icon: <MixIcon />, title: "Mix", text: "Mix Formul8 into water or your preferred beverage." },
  { n: "03", icon: <LoopIcon />, title: "Make It Routine", text: "Build Formul8 into your everyday wellness routine." },
];
const PRINCIPLES = [
  { title: "Thoughtful Formulation", text: "Built around purposeful ingredients rather than unnecessary complexity." },
  { title: "Easy Daily Use", text: "Designed to make consistency easier." },
  { title: "Made For Real Life", text: "A wellness routine shouldn't feel like another full-time job." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="on-dark relative overflow-hidden bg-forest pb-16 pt-28 sm:pb-24 sm:pt-36">
        <Botanicals className="pointer-events-none absolute -left-20 top-24 w-80 opacity-15" color="#A9BDA8" />
        <Botanicals className="pointer-events-none absolute -right-24 bottom-0 w-96 -scale-x-100 opacity-15" color="#A9BDA8" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-5">Daily gut-health powder · Coming soon</p>
            <h1 className="h-display text-cream">Your Gut. Your Health. Your Formula.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">A simple daily gut-health powder designed to support digestion, everyday wellness, and healthy-looking skin from within.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <WaitlistButton source="hero" variant="light">Join the Waitlist</WaitlistButton>
              <Button href="/our-formula" variant="ghost-dark">Discover Formul8</Button>
            </div>
            <p className="mt-5 text-sm text-cream/70">Be the first to know when Formul8 launches.</p>
          </div>
          <div className="relative mx-auto flex w-full max-w-sm justify-center lg:max-w-none">
            <div aria-hidden className="absolute inset-6 rounded-full bg-natural/30 blur-3xl" />
            <ProductMockup tone="dark" className="float relative w-56 sm:w-72 lg:w-80" />
          </div>
        </div>
      </section>

      {/* LAUNCH BAR */}
      <div className="bg-sage py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-forest sm:text-sm">
        <p className="container-x">Formul8 is coming soon — join the waitlist for early access</p>
      </div>

      {/* BENEFITS */}
      <section className="bg-warm section">
        <div className="container-x">
          <Reveal><SectionHeader eyebrow="Why it matters" title="Wellness Starts Within." center>Your gut plays an important role in everyday wellness. Formul8 is being created to make supporting your daily routine simple.</SectionHeader></Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => <Reveal key={b.title} delay={i * 80}><BenefitCard icon={b.icon} title={b.title}>{b.text}</BenefitCard></Reveal>)}
          </div>
        </div>
      </section>

      {/* PRODUCT SPLIT */}
      <section className="bg-cream section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative flex justify-center rounded-3xl bg-sage/40 py-14">
            <Botanicals className="pointer-events-none absolute -bottom-6 -left-6 w-48 opacity-40" />
            <ProductMockup className="relative w-56 sm:w-72" />
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-4">Meet Formul8</p>
            <h2 className="h-section">One Simple Daily Formula.</h2>
            <p className="mt-5 text-lg leading-relaxed text-forest/75">Formul8 Nutrition is being developed as a convenient daily gut-health powder for people who want a simpler approach to supporting their wellness routine.</p>
            <div className="mt-8"><WaitlistButton source="product-section">Join the Waitlist</WaitlistButton></div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-warm section">
        <div className="container-x">
          <Reveal><SectionHeader title="Simple By Design." center eyebrow="How it works" /></Reveal>
          <ol className="relative mt-16 grid gap-10 md:grid-cols-3">
            <div aria-hidden className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-sage md:block" />
            {STEPS.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 100} className="relative text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-sage bg-warm text-natural">{s.icon}</div>
                  <p className="mt-5 font-display text-sm tracking-widest text-natural">{s.n}</p>
                  <h3 className="mt-1 font-display text-2xl">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-forest/75">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY FORMUL8 */}
      <section className="on-dark bg-forest section">
        <div className="container-x">
          <Reveal><SectionHeader dark eyebrow="Why Formul8" title="We Think Gut Health Should Be Simple." /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => <Reveal key={p.title} delay={i * 80}><BenefitCard dark title={p.title}>{p.text}</BenefitCard></Reveal>)}
          </div>
          <Reveal className="mt-12"><Button href="/why-formul8" variant="ghost-dark">Learn About Formul8</Button></Reveal>
        </div>
      </section>

      <WaitlistSection source="home-waitlist" />
    </>
  );
}
