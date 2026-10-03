import Link from "next/link";
import { DISCLAIMER, NAV, SITE, SOCIALS } from "@/lib/site";
import WaitlistForm from "./WaitlistForm";
import { Wordmark } from "./Navbar";

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="on-dark bg-forest pb-10 pt-20 text-cream">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-xs text-cream/75">{SITE.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/70">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  {s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream">{s.name}</a> : <span title="Coming soon">{s.name}</span>}
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-3">{NAV.map((n) => <li key={n.href}><Link href={n.href} className="text-cream/80 hover:text-cream">{n.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Legal">
            <p className="eyebrow mb-4">Company</p>
            <ul className="space-y-3">{LEGAL.map((n) => <li key={n.href}><Link href={n.href} className="text-cream/80 hover:text-cream">{n.label}</Link></li>)}</ul>
          </nav>
          <div>
            <p className="eyebrow mb-4">Get Formul8 Updates</p>
            <WaitlistForm source="footer" variant="compact" />
          </div>
        </div>
        <div className="mt-16 border-t border-cream/15 pt-8 text-sm text-cream/60">
          {/* EDITABLE: final regulatory language should be reviewed before launch (lib/site.ts) */}
          <p className="max-w-3xl leading-relaxed">{DISCLAIMER}</p>
          <p className="mt-4">© {new Date().getFullYear()} Formul8 Nutrition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
