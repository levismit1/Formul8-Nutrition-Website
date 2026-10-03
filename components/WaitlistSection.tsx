import Botanicals from "./Botanicals";
import ProductMockup from "./ProductMockup";
import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";

/** The on-page waitlist form. Its id="waitlist" is what WaitlistButton scrolls to. */
export default function WaitlistSection({ source = "waitlist-section", eyebrow = "Coming soon", title = "Be First In Line.", children = "Formul8 Nutrition is coming soon. Join the waitlist for launch updates, early access, and introductory offers." }: { source?: string; eyebrow?: string; title?: string; children?: React.ReactNode }) {
  return (
    <section id="waitlist" className="on-dark relative scroll-mt-24 overflow-hidden bg-forest section" aria-labelledby="waitlist-heading">
      <Botanicals className="pointer-events-none absolute -left-16 top-10 hidden w-72 opacity-20 lg:block" color="#A9BDA8" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 id="waitlist-heading" className="h-display text-cream">{title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/80">{children}</p>
          <div className="mt-8 max-w-md">
            <WaitlistForm source={source} variant="dark" />
            <p className="mt-4 text-sm text-cream/65">No spam. Just Formul8 launch updates and early-access announcements.</p>
          </div>
        </Reveal>
        <Reveal delay={150} className="hidden justify-center lg:flex">
          <ProductMockup tone="dark" className="float w-72" />
        </Reveal>
      </div>
    </section>
  );
}
