# Formul8 build handoff

Branch: claude/clever-babbage-gm33th. Site folder: formul8/. Design package with all copy: review/design-package.md. Skill: 10k-websites/.

## Approved assets waiting on download (Higgsfield, all approved by the owner)

Host to allow in the cloud environment's Network access: d8j0ntlcm91z4.cloudfront.net

| Asset | Job id | URL |
|---|---|---|
| Hero start image (2688x1520) | e0e0050a-3cf4-4822-aaa4-a727a8a37e59 | https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_195527_e0e0050a-3cf4-4822-aaa4-a727a8a37e59.png |
| Hero video, Kling v3.0 pro, 1920x1080, 6s, silent | 347a7f60-465b-4f04-aeb7-a17f77af6465 | https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_195831_347a7f60-465b-4f04-aeb7-a17f77af6465.mp4 |
| Step 1, scoop (2048x1360) | f36aeab7-bed8-4fc7-acf3-c032922d2302 | https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_200431_f36aeab7-bed8-4fc7-acf3-c032922d2302.png |
| Step 2, stir (2048x1360) | bfd8517a-3661-4c0a-befd-a18ad85371b0 | https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_200431_bfd8517a-3661-4c0a-befd-a18ad85371b0.png |
| Step 3, sip (2048x1360) | 08ea579a-6902-486b-b812-a11718382e41 | https://d8j0ntlcm91z4.cloudfront.net/user_3AhUWJbM1wOEFFwglyhxjC5xBlD/hf_20261002_200430_08ea579a-6902-486b-b812-a11718382e41.png |

Credits left on the account: 86.

## Status (updated)

DONE: all five files downloaded (network host allowed), inspected, processed. hero-scrub.mp4 (5.1 MB, -g 8, crf 26), hero-poster.jpg, hero-ending.jpg and the three step stills are in formul8/assets/. VIDEO_BYTES is set. Worst-frame legibility audit passes on every band at 1024, 1280, 1440 and 1920 wide (worst 4.78:1) and on the static phone hero (worst 5.7:1). Flick test, phone, tablet rotation, reduced motion (live both ways), video-missing and form tests all pass on the real assets. Copy gate passes.

OPEN: (1) the hero ending lands on a brown, dried-looking leaf, not the fresh green glossy leaf in the plan; owner decides keep or re-roll (9 credits on Kling pro, 86 credits left). Phones see this frame as their whole hero. (2) Owner sends one real test signup after launch. (3) Legal read of the health sentences. (4) Hosting only when the owner says ready.

## Original next steps (all done except the open items above)

1. Save raws OUTSIDE formul8/ (review/hero/ and review/stills/).
2. Scrub encode per 10k-websites/references/ffmpeg-recipes.md (-g 8). Poster = first frame, ending = last frame.
3. Stills: scale to 1920 wide, one JPEG pass, save as formul8/assets/step-scoop.jpg, step-stir.jpg, step-sip.jpg.
4. Set CONFIG.VIDEO_BYTES in formul8/assets/site.js to the real byte size of hero-scrub.mp4.
5. Worst-frame legibility audit on every hero band (3.5:1 minimum), tune scrims and the band ranges.
6. Re-run the flick test, the phone and reduced-motion checks, and the copy gate on the real build.
7. Check the ending frame with the header mocked over it, at wide and short windows.
8. Hosting and going live happen only when the owner says they are ready.

## Notes

- The headless test browser cannot decode H.264. For testing only, serve a VP9 copy under the same URL. Never ship it.
- The waitlist form posts to https://formspree.io/f/xppwgeba. Ask the owner to send one real test signup after launch.
- Imagery is generated now. The owner will swap in real photos later, so the site carries no AI disclosure line.
