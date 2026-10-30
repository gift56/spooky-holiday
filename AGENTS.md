# AGENTS.md — Spooky Holiday Halloween Landing Page

## Project goal

Build a polished, responsive Halloween event landing page inspired by the supplied reference image.

The key interaction is a short cinematic intro:
1. A large pale jack-o'-lantern appears in its own intro scene.
2. Seven small pumpkins enter from different directions and move into the large pumpkin.
3. The large pumpkin progressively gains its orange color, reacts and glows brighter.
4. The pumpkin bursts into an orange screen-covering flash, particles and smoke.
5. The explosion clears to reveal the finished Halloween event hero page.
6. Small pieces of pumpkin skin drift down over the revealed hero.

The finished site should feel like a premium Halloween event campaign, not a generic dashboard.

## Non-negotiable design direction

- Use the supplied reference image as the visual direction for the revealed hero.
- Main background: deep purple / midnight violet, approximately `#21153F` or `#241743`.
- Main accent: pumpkin orange, approximately `#FF8048`.
- Supporting colors: warm cream white, dark aubergine, subtle red-orange glow.
- Use large, confident typography and generous spacing.
- Add delicate spider-web decorations in the top corners.
- The hero should use a split layout: copy and CTAs on the left, large glowing pumpkin artwork on the right.
- Include a compact logo/brand at top left and navigation at top right.
- Include a small date/social area near the bottom of the hero.
- Avoid clutter, excessive gradients, random glass cards, and generic template styling.
- Do not put text inside generated images. All website text must be real HTML.

## Recommended stack

- React + TypeScript + Vite
- Tailwind CSS for layout and styling
- Framer Motion for intro sequencing and UI transitions
- Lucide React for interface icons
- CSS keyframes for small ambient effects and particles

Do not add extra animation libraries unless a real requirement cannot be met cleanly with Framer Motion and CSS.

## Project structure

Keep components small and responsibilities clear. Suggested structure:

```text
src/
  assets/
  components/
    intro/
      HalloweenIntro.tsx
      PumpkinScene.tsx
      ExplosionEffect.tsx
    layout/
      Navbar.tsx
      SocialLinks.tsx
    sections/
      Hero.tsx
  hooks/
    useIntroSequence.ts
  styles/
    globals.css
  App.tsx
  main.tsx
src/
  assets/
    giant-pumpkin.png
    small-pumpkin.png
    explosion.png
    spider-web-left.png
    spider-web-right.png
```

Adjust this structure if the existing project already has a sensible convention. Do not reorganize unrelated files.

## Asset requirements

Use separately generated assets so each object can be animated independently.

Expected assets:
- `giant-pumpkin.png`: large front-facing or slight three-quarter jack-o'-lantern, rich orange ridged skin, sinister carved face, bright warm glow inside the eyes and mouth, transparent background.
- `small-pumpkin.png`: smaller playful/mischievous jack-o'-lantern character, transparent background, visually consistent lighting and material with the giant pumpkin.
- `explosion.png` (optional): radial orange/gold magical burst with sparks, smoke and a few pumpkin fragments, transparent background. Prefer CSS particles for extra motion.
- `spider-web-left.png` and `spider-web-right.png`: delicate thin white/silver spider-web corner decorations, transparent background.

Do not assume generated images have transparency. Inspect the exported files. If an image has a solid background, remove it with an appropriate free tool or use a CSS blend/mask approach only if it looks clean.

Never use a generated image as the entire website screenshot. Keep all copy, buttons, navigation and layout as HTML/CSS.

## Animation sequence

Implement a deterministic sequence with a clear state machine:

`pumpkin-scene -> explosion -> revealing -> revealed`

Suggested timing (adjust after testing):
- 0.0–0.6s: fade in the dark pumpkin scene and subtle ambient glow.
- 0.6–7.8s: seven small pumpkins enter from distinct directions, turn orange in flight and move into the giant pumpkin's mouth; pause briefly before the fifth entry.
- With each collision: giant pumpkin progressively gains color, shakes and glows brighter.
- 7.8–8.8s: bright flash and explosion expand over the full screen in orange.
- 8.8s onward: hero elements reveal underneath as the orange cover, particles and smoke clear.

The sequence should feel quick and intentional. Aim for approximately 5–7 seconds total.

### Animation implementation rules

- Use Framer Motion controls or `useAnimate` to orchestrate the sequence.
- Keep the animation sequence in a dedicated hook or intro component, not inside the main page component.
- Use `AnimatePresence` for clean enter/exit transitions.
- Avoid arbitrary long delays and excessive bouncing.
- Use transform and opacity animations wherever possible for smooth performance.
- Use a short screen flash to hide the transition between the pumpkin and the revealed hero.
- Use CSS-generated particles if practical; avoid hundreds of DOM elements.
- Do not block the page forever if an asset fails to load. Add a fallback that reveals the hero.
- Respect `prefers-reduced-motion`: skip or greatly shorten the intro and reveal the page immediately.
- Provide a replay intro control after the first run.
- Prevent scroll locking or layout jumps during the intro.

## Revealed hero content

Use this copy as a starting point; it can be refined without changing the overall design:

Eyebrow:
“DON’T MISS THE SCARIEST HOLIDAY OF THE YEAR”

Headline:
“HALLOWEEN”
“NIGHT PARTY”

Description:
“Step into a night of costumes, spooky surprises, music and unforgettable Halloween memories.”

Primary CTA:
“Get a Ticket”

Secondary CTA:
“Rules”

Navigation:
“About Event”, “Rules”, “Gallery”, “Prices”, “Contact Us”

Date:
“October 31”

Brand:
“Spooky Holiday”

Do not invent ticket prices, venue, event time, contact details or sponsor claims. If those details are not supplied, use clearly editable placeholders or omit them.

## Responsive requirements

- Desktop: preserve the reference's split hero composition and generous spacing.
- Tablet: reduce pumpkin size and navigation spacing; keep text readable.
- Mobile: stack copy and pumpkin artwork, simplify navigation into a mobile menu, and ensure the pumpkin does not cover the headline or CTAs.
- Intro animation must remain legible and correctly positioned on narrow screens.
- Avoid horizontal overflow at all viewport widths.

## Accessibility and quality

- Use semantic HTML landmarks and heading hierarchy.
- All buttons and links must be keyboard accessible.
- Provide visible focus states.
- Give meaningful alt text to informative images; mark decorative webs and particles as decorative.
- Ensure readable contrast.
- Respect reduced-motion preferences.
- Add loading/error fallbacks for visual assets.
- Keep the console free of errors and warnings.

## Implementation workflow

Work in small, verifiable stages. Do not attempt the entire project in one giant edit.

### Stage 1 — Inspect and plan
- Inspect the existing repository, package scripts and installed dependencies.
- Check whether Tailwind is already configured before changing configuration.
- Confirm the available assets and their dimensions/transparency.
- Summarize the implementation plan before making broad changes.

### Stage 2 — Build the static hero
- Implement the revealed landing page first, without animation.
- Match the reference layout, colors, typography, pumpkin placement and decorative webs.
- Add responsive desktop/tablet/mobile layouts.
- Verify the page looks good at common viewport widths.

### Stage 3 — Build the intro scene
- Add the giant pumpkin and small pumpkin as independent image layers.
- Position the small pumpkin's travel path so it visibly enters the large pumpkin.
- Add the collision shake and glow response.
- Add the explosion flash, particles and fade-out.

### Stage 4 — Orchestrate the sequence
- Implement the intro state machine and timing.
- Reveal the hero after the explosion clears.
- Add replay functionality.
- Add reduced-motion and asset-failure fallbacks.

### Stage 5 — Polish
- Tune easing, timing, glow, shadows and responsive positions.
- Check for jank and excessive layout shifts.
- Ensure the intro does not replay unexpectedly on every React render.
- Verify navigation and CTAs have meaningful destinations or clearly marked placeholders.

### Stage 6 — Verify and document
- Run the project's lint, typecheck and build scripts if available.
- Fix errors introduced by the implementation.
- Test desktop and mobile layouts.
- Report what was built, which assets are still missing, and the commands used to verify the project.

## Definition of done

- The static hero closely follows the supplied visual reference.
- The small pumpkin visibly enters the large pumpkin.
- The large pumpkin reacts before bursting.
- The explosion transitions cleanly into the hero page.
- The intro plays once and can be replayed.
- Reduced-motion users can access the page without a long animation.
- The page is responsive and has no horizontal overflow.
- No important text is baked into images.
- The project passes its available typecheck/build/lint checks.

## Agent behavior

- Inspect before editing; do not overwrite existing project conventions blindly.
- Ask only when a missing real-world detail is essential. Otherwise use editable placeholders.
- Do not invent event logistics, prices, contact information or ticket links.
- Prefer simple, maintainable implementations over unnecessary dependencies.
- After each stage, summarize changed files and any manual action still required.
