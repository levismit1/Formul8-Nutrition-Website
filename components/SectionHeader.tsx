export default function SectionHeader({ eyebrow, title, children, center = false, dark = false }: { eyebrow?: string; title: string; children?: React.ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${dark ? "on-dark" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={`h-section ${dark ? "text-cream" : "text-forest"}`}>{title}</h2>
      {children && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-cream/80" : "text-forest/75"}`}>{children}</p>}
    </div>
  );
}
