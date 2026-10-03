# Formul8 Nutrition: waitlist site

Next.js 14 + TypeScript + Tailwind. Five pages (Home, Our Formula, Why Formul8, About, FAQ) plus placeholder Privacy, Terms and Contact pages.

    npm install
    npm run dev

## Connect the waitlist
Set `WAITLIST_WEBHOOK_URL` (see `.env.example`) to any endpoint that accepts a JSON POST (Zapier, Make, Formspree, your own API). The handler is `app/api/waitlist/route.ts`. Until it is set, the form shows an honest error and nothing is faked.

## Analytics
All events go through `lib/analytics.ts` (PageView, WaitlistButtonClick, WaitlistFormStart, WaitlistSubmit, WaitlistSuccess). Set `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable Meta Pixel / GA4.

## Editable content
- Ingredient placeholders: `app/our-formula/page.tsx`
- FDA disclaimer, FAQ, socials: `lib/site.ts`
- Product render (SVG placeholder): `components/ProductMockup.tsx`
- Legal pages are placeholders pending professional review.
