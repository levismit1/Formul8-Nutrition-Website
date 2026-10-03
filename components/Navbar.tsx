"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import WaitlistButton from "./WaitlistButton";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`font-display text-2xl leading-none tracking-tight ${light ? "text-cream" : "text-forest"}`}>
      Formul<span className="text-natural">8</span>
      <span className={`ml-1.5 hidden align-middle font-sans text-[10px] font-semibold uppercase tracking-[0.25em] sm:inline ${light ? "text-sage" : "text-natural"}`}>Nutrition</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sage/40 bg-warm/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" aria-label="Formul8 Nutrition home"><Wordmark /></Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined} className={`text-sm font-medium transition-colors hover:text-natural ${pathname === n.href ? "text-natural" : "text-forest"}`}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <WaitlistButton source="nav" className="!px-4 !py-2.5 !text-xs sm:!px-6 sm:!text-sm">Join the Waitlist</WaitlistButton>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            <span aria-hidden className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-forest transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-forest transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-forest transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-forest px-5 py-8 lg:hidden">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="block border-b border-cream/15 py-4 font-display text-3xl text-cream">{n.label}</Link></li>
            ))}
          </ul>
          <div className="mt-8"><WaitlistButton source="mobile-menu" variant="light" className="w-full">Join the Waitlist</WaitlistButton></div>
        </nav>
      )}
    </header>
  );
}
