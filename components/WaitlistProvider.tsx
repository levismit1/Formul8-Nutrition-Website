"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import WaitlistForm from "./WaitlistForm";
import { track } from "@/lib/analytics";

type Ctx = { open: (source: string) => void };
const WaitlistCtx = createContext<Ctx>({ open: () => {} });
export const useWaitlist = () => useContext(WaitlistCtx);

/**
 * Handles every "Join the Waitlist" button: smooth-scrolls to the on-page form (#waitlist)
 * when one exists, otherwise opens the modal.
 */
export default function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [source, setSource] = useState("modal");
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const open = useCallback((src: string) => {
    track("WaitlistButtonClick", { source: src });
    const target = document.getElementById("waitlist");
    if (target) {
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      window.setTimeout(() => target.querySelector<HTMLInputElement>("input[name=email]")?.focus({ preventScroll: true }), 600);
      return;
    }
    lastFocus.current = document.activeElement as HTMLElement;
    setSource(src);
    setOpen(true);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("input[name=firstName]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button, input:not([tabindex='-1']), a[href]");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; lastFocus.current?.focus(); };
  }, [isOpen]);

  return (
    <WaitlistCtx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-forest/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="waitlist-title" className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-warm p-7 shadow-soft sm:rounded-3xl sm:p-9">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-forest hover:bg-forest/10">×</button>
            <p className="eyebrow">Coming soon</p>
            <h2 id="waitlist-title" className="mt-2 font-display text-3xl text-forest">Be First In Line.</h2>
            <p className="mb-6 mt-3 text-forest/75">Join the waitlist for launch updates, early access, and introductory offers.</p>
            <WaitlistForm source={source} variant="light" />
          </div>
        </div>
      )}
    </WaitlistCtx.Provider>
  );
}
