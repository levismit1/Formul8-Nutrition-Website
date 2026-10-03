import Reveal from "./Reveal";
import WaitlistButton from "./WaitlistButton";

/** Closing call to action used at the end of inner pages. */
export default function CTABand({ source, title, children, buttonLabel = "Join the Waitlist" }: { source: string; title: string; children?: React.ReactNode; buttonLabel?: string }) {
  return (
    <section className="bg-cream section">
      <Reveal className="container-x text-center">
        <h2 className="h-section mx-auto max-w-2xl">{title}</h2>
        {children && <p className="mx-auto mt-5 max-w-xl text-lg text-forest/75">{children}</p>}
        <div className="mt-9"><WaitlistButton source={source}>{buttonLabel}</WaitlistButton></div>
      </Reveal>
    </section>
  );
}
