import { useEffect } from "react";
import { useAnimate } from "motion/react";
import type { Timeline } from "motion/react";

type UseIntroSequenceOptions = {
  onComplete: () => void;
  onError: () => void;
};

const entries = [
  { x: -0.68, y: 0.27, arcX: -0.35, arcY: 0.12, rotate: 14 },
  { x: 0.68, y: -0.29, arcX: 0.36, arcY: -0.2, rotate: -14 },
  { x: 0.7, y: 0.3, arcX: 0.37, arcY: 0.16, rotate: -10 },
  { x: -0.68, y: -0.32, arcX: -0.37, arcY: -0.18, rotate: 11 },
  { x: 0.7, y: -0.28, arcX: 0.39, arcY: -0.12, rotate: -12 },
  { x: -0.68, y: 0.32, arcX: -0.36, arcY: 0.18, rotate: 13 },
  { x: 0.68, y: 0.29, arcX: 0.35, arcY: 0.15, rotate: -11 },
] as const;

const pumpkinColors = [
  "grayscale(0.9) brightness(1.42) saturate(0.28)",
  "grayscale(0.76) brightness(1.35) saturate(0.42)",
  "grayscale(0.62) brightness(1.28) saturate(0.58)",
  "grayscale(0.46) brightness(1.2) saturate(0.74)",
  "grayscale(0.3) brightness(1.14) saturate(0.88)",
  "grayscale(0.14) brightness(1.1) saturate(1.02)",
  "grayscale(0) brightness(1.08) saturate(1.18)",
] as const;

export function useIntroSequence({ onComplete, onError }: UseIntroSequenceOptions) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const giantPumpkin = root.querySelector<HTMLImageElement>(
      ".pumpkin-intro__pumpkin",
    );
    const smallPumpkin = root.querySelector<HTMLImageElement>(
      ".pumpkin-intro__visitor-image",
    );
    const visitor = root.querySelector<HTMLElement>(".pumpkin-intro__visitor");
    const visitorGlow = root.querySelector<HTMLElement>(
      ".pumpkin-intro__visitor-glow",
    );
    const giantGlow = root.querySelector<HTMLElement>(
      ".pumpkin-intro__aura",
    );
    const giantStage = root.querySelector<HTMLElement>(
      ".pumpkin-intro__pumpkin-stage",
    );

    if (
      !giantPumpkin ||
      !smallPumpkin ||
      !visitor ||
      !visitorGlow ||
      !giantGlow ||
      !giantStage
    ) {
      console.error("The pumpkin intro could not find its artwork layers.");
      onError();
      return;
    }

    let isCancelled = false;
    let activeAnimations: Timeline[] = [];
    let delayTimer = 0;
    let releaseDelay: (() => void) | undefined;

    const playTogether = async (...timelines: Timeline[]) => {
      activeAnimations = timelines;
      await Promise.all(timelines);
      activeAnimations = [];
    };

    const pause = (duration: number) =>
      new Promise<void>((resolve) => {
        releaseDelay = resolve;
        delayTimer = window.setTimeout(() => {
          releaseDelay = undefined;
          resolve();
        }, duration);
      });

    const playSequence = async () => {
      try {
        await Promise.all([
          giantPumpkin.decode(),
          smallPumpkin.decode(),
        ]);
      } catch (error) {
        console.error("Unable to load the pumpkin intro artwork.", error);
        onError();
        return;
      }

      if (isCancelled) return;

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (isCancelled) return;

      const giantBounds = giantPumpkin.getBoundingClientRect();
      const sceneBounds = root.getBoundingClientRect();
      const originX = sceneBounds.left + sceneBounds.width / 2;
      const originY = sceneBounds.top + sceneBounds.height / 2;
      const targetX = giantBounds.left + giantBounds.width / 2 - originX;
      const targetY = giantBounds.top + giantBounds.height * 0.79 - originY;
      const viewportWidth = sceneBounds.width;
      const viewportHeight = sceneBounds.height;
      const shake = Math.min(13, giantBounds.width * 0.018);

      await playTogether(
        animate(
          giantStage,
          { opacity: 1, scale: [0.96, 1] },
          { duration: 0.6, ease: [0.2, 0.75, 0.25, 1] },
        ),
        animate(
          giantGlow,
          { opacity: 0.34, scale: 1.05 },
          { duration: 0.6, ease: [0.2, 0.75, 0.25, 1] },
        ),
      );
      if (isCancelled) return;

      for (const [index, entry] of entries.entries()) {
        const startX = entry.x * viewportWidth;
        const startY = entry.y * viewportHeight;
        const arcX = entry.arcX * viewportWidth;
        const arcY = entry.arcY * viewportHeight;

        if (index === 4) {
          await pause(680);
          if (isCancelled) return;
        }

        await playTogether(
          animate(
            visitor,
            {
              x: startX,
              y: startY,
              rotate: entry.rotate * 1.6,
              scale: 0.7,
              opacity: 0,
            },
            { duration: 0 },
          ),
          animate(
            smallPumpkin,
            { filter: "grayscale(1) saturate(0.2) brightness(1.08)" },
            { duration: 0 },
          ),
          animate(visitorGlow, { opacity: 0, scale: 0.5 }, { duration: 0 }),
        );
        if (isCancelled) return;

        await playTogether(
          animate(
            visitor,
            {
              x: [startX, arcX, targetX],
              y: [startY, arcY, targetY],
              rotate: [entry.rotate * 1.6, entry.rotate * -0.5, entry.rotate * 0.15],
              scale: [0.7, 0.94, 1.08],
              opacity: [0, 1, 1],
            },
            { duration: 0.56, times: [0, 0.65, 1], ease: "easeInOut" },
          ),
          animate(
            smallPumpkin,
            {
              filter: [
                "grayscale(1) saturate(0.2) brightness(1.08)",
                "grayscale(0.55) saturate(0.6)",
                "grayscale(0) saturate(1.15)",
              ],
            },
            { duration: 0.56, ease: "easeInOut" },
          ),
          animate(
            visitorGlow,
            { opacity: [0, 0.4, 0.95], scale: [0.5, 0.8, 1.2] },
            { duration: 0.56, ease: "easeOut" },
          ),
        );
        if (isCancelled) return;

        await playTogether(
          animate(
            visitor,
            {
              x: [targetX, targetX - shake * 0.2, targetX],
              y: [targetY, targetY - shake * 0.15, targetY],
              scale: [1.08, 1.2, 0],
              rotate: [0, -4, 6],
              opacity: [1, 1, 0],
            },
            { duration: 0.36, ease: "easeIn" },
          ),
          animate(
            visitorGlow,
            { opacity: [0.95, 1, 0], scale: [1.2, 1.7, 0.2] },
            { duration: 0.36, ease: "easeIn" },
          ),
          animate(
            giantStage,
            {
              x: [0, -shake, shake * 0.75, 0],
              y: [0, -shake * 0.3, shake * 0.2, 0],
              rotate: [0, -1.2, 1, 0],
              scale: [1, 1.035, 0.985, 1],
            },
            { duration: 0.32, ease: "easeInOut" },
          ),
          animate(
            giantPumpkin,
            { filter: pumpkinColors[index] },
            { duration: 0.32, ease: [0.2, 0.75, 0.25, 1] },
          ),
          animate(
            giantGlow,
            {
              opacity: [0.34 + index * 0.2, 1, 0.58 + index * 0.18],
              scale: [1.05 + index * 0.12, 1.5, 1.1 + index * 0.12],
            },
            { duration: 0.32, ease: "easeInOut" },
          ),
        );
        if (isCancelled) return;

        if (index < entries.length - 1) {
          await pause(100);
          if (isCancelled) return;
        }
      }

      await playTogether(
        animate(
          giantStage,
          { scale: 1.12, opacity: 0, filter: "brightness(1.8)" },
          { duration: 0.25, ease: "easeIn" },
        ),
        animate(giantGlow, { opacity: 1, scale: 1.8 }, { duration: 0.25 }),
      );
      if (!isCancelled) onComplete();
    };

    void playSequence().catch((error: unknown) => {
      console.error("The pumpkin intro animation failed.", error);
      if (!isCancelled) onError();
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(delayTimer);
      releaseDelay?.();
      activeAnimations.forEach((animation) => animation.cancel());
    };
  }, [
    animate,
    onComplete,
    onError,
    scope,
  ]);

  return scope;
}
