# Formul8 build handoff

Branch: claude/clever-babbage-gm33th. Site folder: formul8/. Copy and decisions: review/design-package.md (section 12 describes the current simple design). Skill folder: 10k-websites/ (its cinematic scroll pipeline is no longer used for this site).

## Current state

Simple static site: formul8/index.html, assets/site.css, assets/site.js (forms, FAQ, phone menu only), self-hosted fonts, webp logos, product.webp, hero-kitchen.jpg (desktop) and hero-kitchen-mobile.jpg (phone), three step photos. About 620 KB for everything on desktop. No video.

Hero image: a generated white kitchen (Higgsfield job cdd678c3-319f-43e8-8f7a-69a2b0d7f121, https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_212826_cdd678c3-319f-43e8-8f7a-69a2b0d7f121.png) with the owner's own product photo placed on the counter. Source photo: review/product-original.jpg. Cutout: review/product-cutout.png. Placement script: review/tools/compose-hero.py (usage: python compose-hero.py CENTER_X BASE_Y SCALE OUTPUT; the final used 1960 1335 0.72). Raw kitchen and composite are gitignored under review/kitchen/.

Signup: both forms post to https://formspree.io/f/xppwgeba (hidden source field says hero or bottom). Formspree may ask to confirm the first submission.

Verified: text over the hero passes (worst small text 6.5:1), both forms (mocked), phone menu, FAQ, keyboard order, no sideways scroll from 320 to 1920 px, copy gate. Everything was tested in headless Chromium only.

## Open

1. Owner reviews review/previews/ and gives notes.
2. Legal read of the health sentences before launch.
3. Hosting only when the owner says ready (Phase 10). After launch: one real test signup, real-phone test, speed measured on the live URL.
4. Higgsfield credits left: check with the balance tool (about 74).

## Notes

- The headless test browser cannot decode H.264. Not relevant now that the site has no video.
- The scrolling cinematic version (hero video, vine, stir) is in git history at commit 85b7f41, with its video assets.
