# Spooky Holiday

A responsive Halloween event landing page with a cinematic, replayable intro. A pale jack-o'-lantern is gradually filled with color as seven small pumpkins fly into it, then bursts into an orange flash that clears to reveal the event hero.

## Features

- Responsive Halloween hero with the Spooky Holiday brand, navigation, social links, event date, and a replay button.
- Intro animation orchestrated with Motion:
  1. The pale giant pumpkin appears.
  2. Seven small pumpkins enter from different directions. The fifth pauses briefly before entering.
  3. Each collision makes the giant pumpkin gain color, glow, and react.
  4. A full-screen orange explosion clears to reveal the hero.
- Optional sound, controlled by the persistent **Sound on / Sound off** button:
  - Low-volume background ambience loops while sound is enabled.
  - A laugh plays on each small-pumpkin collision.
  - An explosion cue plays when the giant pumpkin bursts.
  - Replay keeps the sound preference and background audio state.
- Pumpkin-skin fragments drift down for five seconds after the hero is revealed.
- Reduced-motion support: users who prefer less motion skip the intro and see the hero.
- Keyboard-accessible controls, visible focus states, and a mobile navigation menu.

## Tech stack

- React 19 and TypeScript
- Vite 8
- Motion (`motion/react`) for animation sequencing and transitions
- Tailwind CSS 4 through the Vite plugin, with project-specific styles in `src/index.css`
- Lucide React for interface icons and React Icons for social icons
- Fredoka variable font loaded from Google Fonts, with a sans-serif fallback

## Requirements

- Node.js and npm versions supported by the installed Vite release.
- A modern browser with JavaScript enabled.
- Internet access is needed to load Fredoka from Google Fonts. The page falls back to a system sans-serif font if it is unavailable.

## Getting started

From the project root:

```sh
npm ci
npm run dev
```

Vite prints a local development URL (usually `http://localhost:5173`). Open it in a browser. The pumpkin intro starts immediately; once it finishes, use **Replay intro** on the hero to play it again without refreshing.

On Windows PowerShell, if the `npm` PowerShell script is blocked, run the same commands with `npm.cmd`:

```powershell
npm.cmd ci
npm.cmd run dev
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Run the TypeScript project build, then create the production bundle in `dist/`. |
| `npm run lint` | Run ESLint across the project. |
| `npm run preview` | Serve the built `dist/` output locally for a production-preview check. |

There is no test script configured in `package.json`.

To check a production build:

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static host. No API server, database, environment variables, or runtime secrets are required by the current application.

## Project structure

```text
src/
  App.tsx                           Intro state machine and page composition
  main.tsx                          React application entry point
  index.css                         Global styles, responsive layout, and CSS effects
  assets/
    audio/
      background-sound.mp3          Optional looping ambience
      laugh.mp3                     Pumpkin collision sound
      explosion-sound.mp3           Explosion sound
    giant-pumpkin-cutout.png        Transparent giant pumpkin used in intro and hero
    small-pumpkin-cutout.png        Transparent pumpkin reused for each arrival
    explosion-cutout.png            Transparent explosion artwork
    hero-design.png                 Supplied hero design reference
    giant-pumpkin.png               Original giant-pumpkin artwork
    small-pumpkin.png               Original small-pumpkin artwork
    explosion.png                   Original explosion artwork
    spider-web.png                  Supplied web artwork
  components/
    intro/
      HalloweenIntro.tsx            Intro scene markup
      ExplosionEffect.tsx           Explosion, flash, smoke, and particle effect
    layout/
      Navbar.tsx                    Responsive navigation and brand
      SocialLinks.tsx               Social media links
      SoundToggle.tsx               Persistent sound control
      SpiderWeb.tsx                  Decorative web SVG component
    sections/
      Hero.tsx                      Event hero and replay button
      PumpkinSkinfall.tsx            Short post-reveal fragment effect
  hooks/
    useHalloweenAudio.ts            Audio creation, playback, and mute state
    useIntroSequence.ts             Pumpkin flight, collision, and color timeline
```

`AGENTS.md` contains the project's design direction and implementation requirements. `index.html` holds the document metadata and Fredoka font links. `vite.config.ts` configures React and Tailwind CSS for Vite.

## Intro and replay flow

The app's intro state is managed in `src/App.tsx`:

```text
pumpkin-scene -> explosion -> revealing -> revealed
```

The animation timeline is kept in `src/hooks/useIntroSequence.ts`, separate from the page component. The giant pumpkin is a transparent image layer, so its color filter can progress without tinting an opaque background. The same small-pumpkin cutout is animated along seven entry paths. The fifth arrival has a longer pause before flight.

When the final arrival finishes, `ExplosionEffect` covers the viewport in orange, then fades away while the hero elements reveal beneath it. Once revealed, the hero's **Replay intro** button returns the app to `pumpkin-scene`; it does not reload the page.

The landing page respects the browser's reduced-motion preference and shows the hero immediately instead of running the intro. Body scrolling is suppressed while the full-screen intro is active.

## Sound behavior

Audio is opt-in. The sound toggle starts in the **Sound off** state, so no sound plays automatically. The visitor must press **Sound on** to start audio; browsers require this interaction to permit playback.

Background sound plays at 10% volume and loops. Collision laughs and the explosion cue are only played while sound is enabled. Turning sound off pauses and resets the background and effects. The button remains available during the intro and after the hero appears.

To change sound levels or swap tracks, update `src/hooks/useHalloweenAudio.ts` and the imported assets in `src/assets/audio/`. Audio files are bundled by Vite from the source tree.

## Editing the page

- **Hero copy and replay label:** `src/components/sections/Hero.tsx`
- **Navigation labels and destinations:** `src/components/layout/Navbar.tsx`
- **Social URLs and labels:** `src/components/layout/SocialLinks.tsx`
- **Animation paths, timing, and color progression:** `src/hooks/useIntroSequence.ts`
- **Explosion timing and appearance:** `src/components/intro/ExplosionEffect.tsx` and `src/index.css`
- **Sound volume and sound assets:** `src/hooks/useHalloweenAudio.ts`
- **Colors, layout, responsive breakpoints, and ambient effects:** `src/index.css`
- **Page title, description, theme color, and font import:** `index.html`

The navigation and hero currently use placeholder hash destinations for sections that are not implemented. Replace those links when the corresponding event pages or real destinations are available. No venue, ticket price, event time, or contact details are supplied by the project.

## Accessibility and responsive behavior

- The desktop hero uses a split copy-and-artwork layout and fits the viewport.
- At smaller widths, navigation becomes a menu and the hero content stacks to avoid covering its text with the pumpkin.
- The sound toggle and replay control are native buttons with keyboard support and accessible labels.
- Decorative webs, particles, and pumpkin artwork are hidden from assistive technology where appropriate.
- Focus indicators are visible, and the intro is skipped for reduced-motion preferences.

## Troubleshooting

### No sound after opening the site

Sound is off by default. Press **Sound on**. Check the browser tab and device volume if playback is still inaudible. Browser autoplay restrictions are expected and do not indicate an error.

### Fredoka does not load

The font is requested from Google Fonts in `index.html`; check network access. The page uses a sans-serif fallback when the external font cannot be reached.

### The production page is blank or assets are missing

Reinstall dependencies with `npm ci`, then run `npm run build` and review any reported errors. When deploying under a subpath, configure the Vite `base` option in `vite.config.ts` to match the deployment path.
