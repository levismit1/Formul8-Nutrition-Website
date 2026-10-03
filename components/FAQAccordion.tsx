"use client";
import { useState } from "react";

export default function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-sage/60 border-y border-sage/60">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl text-forest transition-colors hover:text-natural sm:text-2xl"
              >
                {it.q}
                <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest/30 text-xl leading-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-lg leading-relaxed text-forest/75">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
