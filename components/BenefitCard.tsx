import type { ReactNode } from "react";

export default function BenefitCard({ icon, title, children, dark = false }: { icon?: ReactNode; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className={`h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${dark ? "border border-cream/15 bg-cream/5" : "border border-sage/50 bg-warm"}`}>
      {icon && <div className={`mb-5 ${dark ? "text-sage" : "text-natural"}`}>{icon}</div>}
      <h3 className={`font-display text-xl ${dark ? "text-cream" : "text-forest"}`}>{title}</h3>
      <p className={`mt-3 leading-relaxed ${dark ? "text-cream/75" : "text-forest/75"}`}>{children}</p>
    </div>
  );
}
