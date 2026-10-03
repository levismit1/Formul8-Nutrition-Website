import Botanicals from "./Botanicals";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="on-dark relative overflow-hidden bg-forest pb-20 pt-32 sm:pb-28 sm:pt-40">
      <Botanicals className="pointer-events-none absolute -right-12 bottom-0 w-80 opacity-20" color="#A9BDA8" />
      <div className="container-x relative">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="h-display max-w-3xl text-cream">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">{children}</p>
      </div>
    </section>
  );
}
