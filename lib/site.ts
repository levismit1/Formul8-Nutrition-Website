export const SITE = {
  name: "Formul8 Nutrition",
  tagline: "Your Gut. Your Health. Your Formula.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/our-formula", label: "Our Formula" },
  { href: "/why-formul8", label: "Why Formul8" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/** EDITABLE: final regulatory language should be reviewed before launch. */
export const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.";

/** EDITABLE: add real URLs when the accounts exist. Items without an href render as non-links. */
export const SOCIALS: { name: string; href?: string }[] = [
  { name: "Instagram" },
  { name: "TikTok" },
  { name: "Facebook" },
];

export const FAQS = [
  { q: "What is Formul8 Nutrition?", a: "Formul8 Nutrition is an upcoming wellness brand developing a convenient daily gut-health powder designed to complement a healthy lifestyle." },
  { q: "When does Formul8 launch?", a: "We're currently preparing Formul8 for launch. Join the waitlist to receive updates and early-access information." },
  { q: "How do I join the waitlist?", a: "Enter your email into any Join the Waitlist form throughout the website." },
  { q: "What will Formul8 taste like?", a: "Flavor details will be announced closer to launch." },
  { q: "What ingredients are in Formul8?", a: "The final formula and complete ingredient information will be published before the product becomes available for purchase." },
  { q: "Will Formul8 be available as a subscription?", a: "Subscription and purchasing options will be announced before launch." },
  { q: "Where will Formul8 ship?", a: "Shipping availability will be announced before launch." },
  { q: "How will I know when Formul8 launches?", a: "Waitlist members will receive launch announcements and early-access information by email." },
];
