"use client";
import type { ReactNode } from "react";
import { btnClass } from "./Button";
import { ArrowIcon } from "./Icons";
import { useWaitlist } from "./WaitlistProvider";

/** Every Join the Waitlist CTA. `source` identifies the placement in analytics. */
export default function WaitlistButton({ source, children = "Join the Waitlist", variant = "primary", className = "" }: { source: string; children?: ReactNode; variant?: "primary" | "light" | "secondary" | "ghost-dark"; className?: string }) {
  const { open } = useWaitlist();
  return (
    <button type="button" onClick={() => open(source)} className={btnClass(variant, className)}>
      {children}<ArrowIcon />
    </button>
  );
}
