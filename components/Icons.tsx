import type { ReactNode } from "react";

const base = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const make = (children: ReactNode) => function Icon({ className }: { className?: string }) { return <svg {...base} className={className}>{children}</svg>; };

export const DigestiveIcon = make(<><path d="M9 7c6-3 14 0 14 6s-8 5-8 9 5 4 8 3" /><circle cx="9" cy="7" r="1.5" /></>);
export const GutIcon = make(<><path d="M16 27C8 22 5 15 8 9c3-4 8-2 8 3 0-5 5-7 8-3 3 6 0 13-8 18Z" /></>);
export const SkinIcon = make(<><path d="M16 4c5 6 8 9.5 8 14a8 8 0 0 1-16 0c0-4.500 3-8 8-14Z" /><path d="M12.500 19c.5 2 2 3 3.500 3" /></>);
export const RoutineIcon = make(<><circle cx="16" cy="16" r="11" /><path d="M16 9v7l4.500 3" /></>);
export const ScoopIcon = make(<><path d="M5 12h16a0 0 0 0 1 0 0 8 8 0 0 1-8 8h0a8 8 0 0 1-8-8Z" /><path d="m20 14 7 9" /></>);
export const MixIcon = make(<><path d="M9 6h14l-2 20H11L9 6Z" /><path d="M10 13c2 1.500 4-1.500 6 0s4 1.500 6 0" /></>);
export const LoopIcon = make(<><path d="M24 12a9 9 0 0 0-16-2M8 20a9 9 0 0 0 16 2" /><path d="M8 5v5h5M24 27v-5h-5" /></>);
export const LeafIcon = make(<><path d="M6 26C6 12 14 6 27 5c0 13-6 21-19 21Z" /><path d="M6 26 18 14" /></>);

export function ArrowIcon({ className }: { className?: string }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
}
