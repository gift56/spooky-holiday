import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExplosionEffect } from "./components/intro/ExplosionEffect";
import { HalloweenIntro } from "./components/intro/HalloweenIntro";
import { Navbar } from "./components/layout/Navbar";
import { SoundToggle } from "./components/layout/SoundToggle";
import { SpiderWeb } from "./components/layout/SpiderWeb";
import { Hero } from "./components/sections/Hero";
import { PumpkinSkinfall } from "./components/sections/PumpkinSkinfall";
import { useHalloweenAudio } from "./hooks/useHalloweenAudio";

type IntroStage = "pumpkin-scene" | "explosion" | "revealing" | "revealed";

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [introStage, setIntroStage] = useState<IntroStage>("pumpkin-scene");
  const { isEnabled, toggleSound, playLaugh, playExplosion } =
    useHalloweenAudio();

  const handlePumpkinSceneComplete = useCallback(() => {
    setIntroStage("explosion");
  }, []);

  const handleExplosionReveal = useCallback(() => {
    setIntroStage("revealing");
  }, []);

  const handlePumpkinSceneError = useCallback(() => {
    setIntroStage("revealed");
  }, []);

  const handleExplosionComplete = useCallback(() => {
    setIntroStage("revealed");
  }, []);

  const handleReplayIntro = useCallback(() => {
    setIntroStage("pumpkin-scene");
  }, []);

  const isRevealed =
    introStage === "revealing" ||
    introStage === "revealed" ||
    shouldReduceMotion === true;

  useEffect(() => {
    if (isRevealed) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isRevealed]);

  return (
    <>
      <SoundToggle isEnabled={isEnabled} onToggle={toggleSound} />
      <motion.main
        className={`landing-page${isRevealed ? "" : " landing-page--concealed"}`}
        id="event"
        aria-hidden={!isRevealed}
        inert={!isRevealed}
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: isRevealed ? 0.45 : 0, ease: "easeOut" }}
      >
        <SpiderWeb className="spider-web spider-web--left" />
        <SpiderWeb className="spider-web spider-web--right" />
        <div className="page-content">
          <Navbar isRevealed={isRevealed} />
          <Hero isRevealed={isRevealed} onReplayIntro={handleReplayIntro} />
        </div>
        <PumpkinSkinfall
          isActive={isRevealed && shouldReduceMotion !== true}
        />
      </motion.main>
      <AnimatePresence>
        {introStage === "pumpkin-scene" && shouldReduceMotion !== true && (
          <HalloweenIntro
            onComplete={handlePumpkinSceneComplete}
            onError={handlePumpkinSceneError}
            onCollision={playLaugh}
          />
        )}
        {(introStage === "explosion" || introStage === "revealing") &&
          shouldReduceMotion !== true && (
          <ExplosionEffect
            onReveal={handleExplosionReveal}
            onComplete={handleExplosionComplete}
            onExplode={playExplosion}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
