import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { Timeline } from "motion/react";
import explosionImage from "../../assets/explosion-cutout.png";

type ExplosionEffectProps = {
  onReveal: () => void;
  onComplete: () => void;
};

const particles = [
  [-235, -150],
  [-180, -235],
  [-110, -196],
  [-35, -260],
  [42, -224],
  [138, -235],
  [220, -158],
  [264, -72],
  [244, 30],
  [202, 132],
  [128, 218],
  [36, 245],
  [-61, 222],
  [-154, 190],
  [-236, 112],
  [-267, 10],
  [-220, -44],
  [183, 66],
  [-90, 92],
  [100, -90],
] as const;

type ParticleStyle = CSSProperties & {
  "--particle-x": string;
  "--particle-y": string;
  "--particle-delay": string;
  "--particle-hue": string;
};

const particleStyles = particles.map(([x, y], index) => ({
  "--particle-x": `${x}px`,
  "--particle-y": `${y}px`,
  "--particle-delay": `${(index % 5) * 0.035}s`,
  "--particle-hue": index % 4 === 0 ? "#fff2c0" : "#ff8048",
}) satisfies ParticleStyle);

export function ExplosionEffect({
  onReveal,
  onComplete,
}: ExplosionEffectProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const explosion = root.querySelector<HTMLImageElement>(".explosion__art");
    let isCancelled = false;
    let activeAnimations: Timeline[] = [];
    let revealTimer = 0;
    let releaseReveal: (() => void) | undefined;

    const pause = (duration: number) =>
      new Promise<void>((resolve) => {
        releaseReveal = resolve;
        revealTimer = window.setTimeout(() => {
          releaseReveal = undefined;
          resolve();
        }, duration);
      });

    const playExplosion = async () => {
      if (explosion) {
        try {
          await explosion.decode();
        } catch (error) {
          console.error("Unable to load the explosion artwork.", error);
        }
      }

      if (isCancelled) return;

      const coverAnimation = animate(
        root,
        { opacity: [0, 1] },
        { duration: 0.28, ease: "easeOut" },
      );
      const animations = [
        animate(
          ".explosion__flash",
          { opacity: [0, 1, 0.4, 0] },
          { duration: 0.82, times: [0, 0.2, 0.5, 1], ease: "easeOut" },
        ),
      ];

      if (explosion) {
        animations.push(
          animate(explosion, {
            opacity: [0, 1, 0.92, 0],
            scale: [0.12, 1.12, 1.42, 1.75],
            rotate: [-5, 0, 2, 0],
          }, {
            duration: 1.48,
            times: [0, 0.32, 0.68, 1],
            ease: [0.16, 0.84, 0.28, 1] as const,
          }),
        );
      }
      animations.push(
        animate(
          ".explosion__smoke",
          {
            opacity: [0, 0.66, 0.5, 0],
            scale: [0.4, 1.3, 1.8, 2.45],
            y: [24, -12, -54, -118],
          },
          {
            duration: 2.1,
            times: [0, 0.26, 0.58, 1],
            ease: "easeOut",
          },
        ),
      );
      activeAnimations = [coverAnimation, ...animations];

      await Promise.all([coverAnimation, pause(1.05)]);
      if (isCancelled) return;
      onReveal();
      const clearingAnimation = animate(
        root,
        { opacity: 0 },
        { duration: 1.5, ease: [0.16, 0.84, 0.28, 1] as const },
      );
      activeAnimations = [...animations, clearingAnimation];
      await Promise.all([...animations, clearingAnimation]);
      activeAnimations = [];

      if (!isCancelled) onComplete();
    };

    void playExplosion().catch((error: unknown) => {
      console.error("The explosion transition failed.", error);
      if (!isCancelled) onComplete();
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(revealTimer);
      releaseReveal?.();
      activeAnimations.forEach((animation) => animation.cancel());
    };
  }, [animate, onComplete, onReveal, scope, shouldReduceMotion]);

  return (
    <div
      className="explosion-overlay"
      ref={scope}
      aria-hidden="true"
    >
      <div className="explosion__flash" />
      <div className="explosion__smoke explosion__smoke--one" />
      <div className="explosion__smoke explosion__smoke--two" />
      <div className="explosion__particles">
        {particleStyles.map((style, index) => (
          <i
            className="explosion__particle"
            key={index}
            style={style as CSSProperties}
          />
        ))}
      </div>
      <img className="explosion__art" src={explosionImage} alt="" />
    </div>
  );
}
