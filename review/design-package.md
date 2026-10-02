# Formul8 Design Package (Tier 1, single journey)

Written before any generation. Every line of copy below ships verbatim. Numbers are starting points, validated later by the flick test.

## 0. Facts used, and facts NOT known

Known (from the owner): Formul8 is a powder for gut health. Contains probiotics, prebiotic fiber, and digestive enzymes. Mostly for women 18 to 35 (middle class and above), men welcome. Pre-launch, so the one action is joining the waitlist. The 8 is wordplay on "formulate". Imagery is generated now and real photos get swapped in later, so the site carries no AI disclosure line. Feeling: fresh and energetic. Reference: Seed (bright, clean, proof-forward). Logo supplied (forest green wordmark, rose gold 8, small leaf, tagline).

NOT known, so the copy makes no claim about them: strains, CFU counts, amounts, flavor, powder color, packaging, price, launch date, serving size, how it is mixed, third-party testing, allergens, any promise about labeling.

CONFIRM LIST (owner must check before launch): "stir into water" (steps 2 and 3), the waitlist email destination, and a legal or regulatory read of every health sentence. The only benefit sentence is in section 3 and carries the FDA disclaimer.

## 1. The brand premise

**Tend.** A gut is a garden of trillions of tiny residents, and a garden does better with a little regular care. Formul8 is the tending: three working parts in one powder. The hero is a descent into a living garden. The page grows a vine as you scroll. The interactive moment is a stir you perform. The close is the vine looping into the brand's 8. Anything that does not serve "tend" does not belong.

Voice: a bright, plain-spoken friend. Short lines. A little playful, never cute at the expense of clarity. No jargon, no hype, no disease claims.

## 2. The palette as CSS tokens

Sampled from the logo (forest #2C4227, leaf #8A9B65, rose gold #D3A993) and pushed toward the footage's morning light. Exact values get re-finalized from the approved footage.

```css
:root{
  --canvas:#EEF3E2;         /* sunlit pale green-ivory, never white, never the logo's cream */
  --panel:#F8FAEF;          /* raised cards */
  --forest:#1F3A24;         /* deep sections, the doubt panel */
  --accent:#D49A83;         /* the CTA and the closing 8: rose gold */
  --accent-hover:#C98669;
  --accent-muted:#D3A993;   /* whisper level: glows, particles */
  --leaf:#7D9A55;           /* the vine, living details */
  --text-secondary:#4A5E47;
  --text-primary:#17301C;
  --text-on-dark:#F6F8EC;
}
```

Deviation said out loud: the logo sits on cream, but the page canvas is a sunlit green-ivory, because "fresh and energetic" is not a cream card. Rose gold is spent only on the CTA, focus states, and the final 8.

## 3. The type trio

- Display: **Marcellus** 400. Its flared strokes echo the wordmark. Headlines only, large.
- Body: **Figtree** 400, 500, 600. Friendly, clear, quiet.
- Labels: **DM Mono** 400. Small caps-style labels and step numbers.

Verify in the build that Marcellus really sits next to the logo well. If it does not, swap before the user sees it.

## 4. The band map (hero, about 500vh)

| Band | Range (starting point) | Footage moment | Copy (verbatim) | Entrance |
|---|---|---|---|---|
| 1 | 0.00 to 0.22 | High above the canopy, sun flaring through leaves, the descent begins | "Good morning, gut." | Drift-down (echoes the fall) |
| 2 | 0.26 to 0.48 | Dropping through layers of leaves, light shafts, floating pollen | "Trillions of tiny residents live down here." | Approach-from-depth (echoes the forward push) |
| 3 | 0.52 to 0.74 | Dew sprays the lens, a beat of blur, the last leaf layer passes | "Tried a probiotic. Felt nothing." (emphasis: Felt nothing) | Word-punch with overshoot (echoes the dew landing) |
| 4 | 0.78 to 1.00 | Camera settles in a bright clearing, one leaf in rose-gold light at rest | Headline "Meet your formula." Subline "Probiotics, prebiotic fiber, and digestive enzymes in one powder." Button "Join the waitlist" | Word-by-word rise into a staged settle |

Layout: the action runs down the center lane. Bands 1 to 3 sit left and right of the lane (two-sided scrim, center left clear). Band 4 is one centered block in the calm upper area above the resting leaf (upper-centered scrim).

## 5. The static-hero copy block (phones, reduced motion)

Over the ending frame:
- Headline: "Meet your formula."
- Subline: "Probiotics, prebiotic fiber, and digestive enzymes in one powder."
- Button: "Join the waitlist"
- Small line above the headline: "Good morning, gut."

## 6. The below-fold outline

Every section funnels to the waitlist form. No two neighbors share a skeleton.

**A. Nav.** Logo left. Links: "How it works", "What's inside", "Questions". Button: "Join the waitlist".

**B. The doubt (deep forest panel, big stacked type, left aligned).**
- Kicker: "Sound familiar?"
- Four lines, large, arriving one at a time:
  - "One blend for every gut? Doubtful."
  - "Felt worse after the so-called fix."
  - "Pricey for something you cannot feel."
  - "A label nobody explains."
- Turn line: "Fair. Here is how we see it."

**C. The ritual (split layout, left sticky, right three step cards, the interactive moment).**
- Heading: "Scoop. Stir. Sip."
- Lede: "A gut does best with a little regular care. This is the care."
- INTERACTIVE MOMENT (lives here): a press-and-hold button, "Hold to stir". Progress builds while held and eases back if released early. On completion the three step cards light up in sequence. Reduced motion: all three lit, no hold needed.
- Step 1, "Scoop." "Add a scoop of Formul8 to a glass."
- Step 2, "Stir." "Stir it into water."
- Step 3, "Sip." "Drink it down. No pills to line up."
- Each step has its own generated still, same world as the hero.

**D. What is inside (three columns, SVG lines drawing between them).**
- Heading: "Three parts. One powder."
- Column 1, "Live probiotics". "Friendly bacteria, added to the crowd already living in your gut."
- Column 2, "Prebiotic fiber". "Food for the good bacteria, so they have something to work with."
- Column 3, "Digestive enzymes". "Little helpers that break your meals down."
- Benefit line: "Made to support everyday digestive health.*"
- Honest note: "Full ingredient list and amounts will be on the label at launch."

**E. Questions (narrow single-column accordion).**
- Heading: "Questions, answered straight."
- "What is in it?" "Probiotics, prebiotic fiber, and digestive enzymes. The full ingredient list and amounts will be on the label and on this site at launch."
- "Will it work for me?" "Every gut is different, and we will not promise a miracle. Join the waitlist and we will share what is in it, how to use it, and what to expect."
- "How do I take it?" "Stir a scoop into water."
- "Is it for men too?" "Yes. We start with women in mind, and everyone is welcome."
- "I take other supplements. Is that okay?" "Ask your doctor or pharmacist before you add or change anything, especially if you are pregnant, nursing, on medication, or managing a health condition."
- "What will it cost?" "Pricing arrives with the launch email."
- "When does it launch?" "We will email the moment it is ready."

**F. The waitlist (centered card over the reused hero ending frame, the vine closes into the 8).**
- Heading: "Be first in line."
- Line: "Leave your email and we will tell you the day Formul8 is ready."
- Label: "Your email"
- Placeholder: "you@email.com"
- Button: "Join the waitlist"
- Success state: "You are on the list. We will email you when Formul8 is ready."
- Error state: "That email looks off. Mind checking it?"
- Handling choice (decide with owner): mailto, a free form service, or a JS-only success state. Say plainly where the email goes.
- Testimonials: none. Pre-launch, nothing invented.

**G. Footer.** Logo and tagline "Your gut. Your health. Your formula." Links to the three anchors. "(c) 2026 Formul8" and the TM mark.
Required line: "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."

## 7. The vector layer plan

- **Signature: the vine.** A thin leaf-green line grows down the left gutter as the page scrolls (desktop), unfurling a small leaf (the logo's leaf) at sections B, C, D, E. At section F it sweeps out and loops into a rose-gold figure 8 around the form heading. If the vine were removed the page would lose its thread, so it earns the title.
- Self-drawing lines between the three columns in D.
- Whisper-level pollen and dew sparkles in the fixed background layer.
- One fixed background environment: soft green and warm gold glows drifting on a 60 second cycle, with fine grain, behind the light sections.
- Reduced motion: the vine is fully drawn, the 8 is closed, particles are still.

## 8. The engineering list

Full standard in `10k-websites/references/scrub-pipeline.md`: Blob fetch with loading ring (if the video is over about 8 MB), dt-normalized lerp that rests, gated seeks, delta-gated DOM writes, band pacing and the flick test, the four-layer legibility system (scrims tinted deep green, not black), the five static-hero gates live with change listeners, complete-without-video, and the quality floor. Plus the whole-site-animated standard.

## 9. Prompts (written before generating)

**Start frame (image, 16:9, 2k, high quality):**
Looking straight down from high above a lush, sunlit forest canopy at early morning, composed as the first moment of a slow vertical descent through the leaves. Broad glossy leaves in fresh leaf green and deep forest green fill the frame edge to edge, with warm golden shafts of sunlight falling through gaps and dew droplets glittering on the leaf edges. A few leaves catch a faint rose-gold glow where the light hits them. The center of the frame is a softly lit gap in the leaves where the descent will pass, and the left and right thirds are calmer, softer-focus foliage in gentle shadow, all one continuous living canopy. Fresh, luminous, energetic morning mood. Cinematic, photorealistic, shallow depth of field on the nearest leaves, 16:9. No text, no logos, no lettering anywhere.

**Video (image-to-video, 1080p, 6 seconds, no audio):**
One continuous shot, no cuts. The camera descends slowly and steadily straight down through a sunlit forest canopy, passing through layers of glossy green leaves heavy with dew, along the vertical center of the frame. The leaves sway and shimmer gently as the camera passes, and golden light shafts drift through the scene with floating pollen and dew sparkles. As the camera slips past the last layer of leaves, a spray of dew droplets hits the lens with a quick beat of soft blur, then clears. The shot ends at rest: the camera settles low above a bright, calm forest clearing, where a single glossy leaf lit by soft rose-gold light rests in the lower center of the frame on fresh moss, dew beads on its surface, surrounded by gentle soft-focus greenery, with generous calm space above it. No text or lettering anywhere.

**Brand-coherence list (inspect every asset against it):** forest green and leaf green foliage, rose-gold light as the only warm accent, morning freshness. No real-world logos or marks. No human hands or faces. Powder and any product stills stay pale and unflavored-looking so nothing contradicts the real product, and show no packaging.

**Supporting stills (after the video passes the gate, all in the hero's world):** three ritual stills, one per step: a scoop of pale powder on a ceramic dish among leaves, a glass of water with powder swirling in morning light, a finished glass resting on stone beside a leaf. Same palette, light, and grade. No hands.

## 10. The copy gate line

Every viewer-facing line above ships verbatim. The built page must pass the Phase 9 grep gate (zero em dashes, zero stock words, plus the body-copy sweep for AI tells) before anyone sees it. Deliberate brand devices here (the triplet "Scoop. Stir. Sip.", the staccato "Tried a probiotic. Felt nothing.") are craft and stay.

## 11. Amendments made during the build

- Hero length is 650vh, not 500vh, so each caption gets a full reading plateau (the flick test passes: 6 to 8 steps at 120px, no skippable beat at 360px).
- Stir button states: "Hold to stir", then "Stirring", then "Stirred."
- Screen reader hint for the stir button: "Press and hold to stir. If you use a keyboard or screen reader, press Enter or Space."
- Form failure state: "Something went wrong on our side. Please try again in a moment."
- The closing 8 sits beside the waitlist card (not behind it) and grows the logo's leaf once drawn.
- Section D icons: cells (probiotics), a wheat sprig (prebiotic fiber), a pie broken apart (enzymes). No pill shapes, since the product is a powder.
