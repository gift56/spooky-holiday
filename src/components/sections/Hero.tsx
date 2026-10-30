import pumpkinImage from "../../assets/giant-pumpkin-cutout.png";
import { motion } from "motion/react";
import { SocialLinks } from "../layout/SocialLinks";

type HeroProps = {
  isRevealed: boolean;
};

const textTransition = {
  duration: 0.65,
  ease: [0.2, 0.75, 0.25, 1] as const,
};

export function Hero({ isRevealed }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 14,
          }}
          transition={{ ...textTransition, delay: isRevealed ? 0.12 : 0 }}
        >
          Don’t miss the scariest holiday of the year
        </motion.p>
        <motion.h1
          className="hero__title"
          id="hero-title"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 42 }}
          transition={{ ...textTransition, delay: isRevealed ? 0.17 : 0 }}
        >
          <span>Halloween</span>
          <span>Night Party</span>
        </motion.h1>
        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 12 }}
          transition={{ ...textTransition, delay: isRevealed ? 0.36 : 0 }}
        >
          The tradition originated with the ancient Celtic festival of Samhain,
          when people would light bonfires and wear costumes to ward off ghosts.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 0.48, staggerChildren: 0.14 },
            },
          }}
        >
          <motion.a
            className="button button--primary"
            href="#contact"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={textTransition}
          >
            Get a ticket
          </motion.a>
          <motion.a
            className="button button--secondary"
            href="#rules"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={textTransition}
          >
            Rules
          </motion.a>
        </motion.div>
        <div className="hero__footer">
          <SocialLinks isRevealed={isRevealed} />
          <motion.p
            className="hero__date"
            initial={{ opacity: 0 }}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            transition={{ ...textTransition, delay: isRevealed ? 0.92 : 0 }}
          >
            <span className="hero__date-dot" aria-hidden="true" />
            October 31
          </motion.p>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true">
        <div className="hero__glow" />
        <motion.div
          className="hero__pumpkin-stage"
          initial={false}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.88,
          }}
          transition={{
            duration: 0.9,
            delay: isRevealed ? 0.12 : 0,
            ease: [0.16, 0.84, 0.28, 1] as const,
          }}
        >
          <img
            className="hero__pumpkin"
            src={pumpkinImage}
            alt=""
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
