# Hero Section — Video Spec

Two hero video clips have been produced (same concept, different shots) so we can
A/B them and keep the stronger one. Build the hero to take EITHER clip via a
single variable, so swapping is a one-line change.

## The two clips

Both are the same 8-second story: filthy mud-covered black Range Rover Sport →
pressure wash → hand wash → machine polish → pristine glossy reveal. Dark premium
detailing studio, high contrast, empty black wall space in the upper corners.

- **Clip 1** — final shot is a front three-quarter reveal facing right.
  Note: slightly soft geometry around the front lower bumper in the final frame,
  more noticeable at hero size.
- **Clip 2** — opens on a wide static full side profile of the mud-covered car
  (the stronger "before"), ends on a clean full side profile facing left. This is
  the better single choice if we only ship one.

Default to **Clip 2** unless told otherwise. Wire it so the active clip is one
variable/constant, not hardcoded in markup.

## Critical: these do NOT loop

Each clip starts filthy and ends clean. A standard `loop` attribute will hard-cut
from pristine back to muddy every 8 seconds and look broken.

**Required behaviour: play once, then freeze on the final clean frame.**
- `autoplay muted playsinline` (muted is required for autoplay), NO `loop`.
- On `ended`, hold the last frame (the clean reveal). Simplest robust approach:
  let the video pause on its final frame; back it with a poster image of the clean
  final frame so there's never a flash of empty space before playback starts.
- Do NOT ping-pong (car un-cleaning looks absurd) and do NOT crossfade back to the
  dirty start (re-dirtying the car is the wrong message).

## Compression (mandatory — source files are 63–72 MB)

Source is 3838×2204, 24fps, 8s, no audio, ~65 Mb/s. Far too heavy for web. Target
roughly 2–4 MB per clip.

- H.264 MP4: `-c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart`
- Provide a WebM/AV1 alternate for smaller size where supported.
- Downscale to the hero's actual display size — no need to ship 3838px wide.
- Generate a poster frame (the clean final frame) for instant paint and as the
  freeze target.
- `-an` strips audio (there's none anyway).

## Aspect ratio

Clips are 1.74:1 — close to 16:9 but slightly taller. Crop to the hero slot's
ratio (16:9 is fine) using object-fit: cover; keep the car centred. There's dead
black wall top-left and top-right, so a light crop won't hurt the subject.

## Text over video

Both clips are dark and low-key with genuinely empty black wall in the upper
corners — light hero text (H1, review line, buttons) will sit there without a
heavy scrim. A very subtle gradient behind the text is fine for legibility; a
full dark overlay is not needed and would dull the premium look.

## Mobile fallback (per CLAUDE.md hero rules)

- Desktop: the compressed video, autoplay muted, freeze on clean frame.
- Mobile / reduced-data / `prefers-reduced-motion`: serve the poster still (the
  clean reveal frame) instead of the video. Do not autoplay a heavy video on
  phones — most of the traffic is mobile and the SEO ranking depends on speed.
- The hero must not drop Lighthouse mobile performance below 90.

## Branding flag (decision, not a blocker)

The car is an identifiable, legibly-badged Range Rover, AI-generated. Using a
specific manufacturer's vehicle in the client's own marketing is a deliberate
decision that has been signed off separately. When compressing, soften/blur the
"RANGE ROVER" bonnet lettering and grille badge unless told otherwise. Do not
present a specific manufacturer's branding prominently without that sign-off.
