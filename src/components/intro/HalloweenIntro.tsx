import { motion } from "motion/react";
import giantPumpkinImage from "../../assets/giant-pumpkin-cutout.png";
import smallPumpkinImage from "../../assets/small-pumpkin-cutout.png";
import { useIntroSequence } from "../../hooks/useIntroSequence";

type HalloweenIntroProps = {
  onComplete: () => void;
  onError: () => void;
};

export function HalloweenIntro({ onComplete, onError }: HalloweenIntroProps) {
  const introScope = useIntroSequence({ onComplete, onError });

  return (
    <motion.div
      className="pumpkin-intro"
      ref={introScope}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pumpkin-intro__web pumpkin-intro__web--left" />
      <div className="pumpkin-intro__web pumpkin-intro__web--right" />
      <header className="pumpkin-intro__header">
        <span className="pumpkin-intro__brand">Spooky Holiday</span>
        <span className="pumpkin-intro__chapter">The night awakens</span>
      </header>
      <div className="pumpkin-intro__center">
        <div className="pumpkin-intro__aura" />
        <div className="pumpkin-intro__pumpkin-stage">
          <img className="pumpkin-intro__pumpkin" src={giantPumpkinImage} alt="" />
        </div>
        <div className="pumpkin-intro__visitor">
          <div className="pumpkin-intro__visitor-glow" />
          <img
            className="pumpkin-intro__visitor-image"
            src={smallPumpkinImage}
            alt=""
            draggable={false}
          />
        </div>
      </div>
      <p className="pumpkin-intro__caption">A little magic is brewing</p>
    </motion.div>
  );
}
