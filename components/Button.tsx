import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";

type Variant = "primary" | "secondary" | "ghost-dark" | "light";
const styles: Record<Variant, string> = {
  primary: "bg-forest text-cream hover:bg-deep",
  light: "bg-cream text-forest hover:bg-white",
  secondary: "border border-forest/30 text-forest hover:border-forest hover:bg-forest/5",
  "ghost-dark": "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
};
export const btnClass = (v: Variant = "primary", extra = "") =>
  `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${styles[v]} ${extra}`;

/** Link-styled CTA for non-waitlist navigation. For waitlist CTAs use <WaitlistButton />. */
export default function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  return <Link href={href} className={btnClass(variant, className)}>{children}<ArrowIcon /></Link>;
}
