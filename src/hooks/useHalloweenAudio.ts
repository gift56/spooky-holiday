import { useCallback, useEffect, useRef, useState } from "react";
import backgroundSound from "../assets/audio/background-sound.mp3";
import explosionSound from "../assets/audio/explosion-sound.mp3";
import laughSound from "../assets/audio/laugh.mp3";

type HalloweenSounds = {
  background: HTMLAudioElement;
  explosion: HTMLAudioElement;
  laughs: HTMLAudioElement[];
};

const laughVoiceCount = 7;

function isExpectedPlaybackError(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" || error.name === "AbortError")
  );
}

function playFromStart(audio: HTMLAudioElement, sound: string) {
  audio.pause();
  if (audio.readyState > 0) audio.currentTime = 0;
  void audio.play().catch((error: unknown) => {
    if (!isExpectedPlaybackError(error)) {
      console.error(`Unable to play the Halloween ${sound} sound.`, error);
    }
  });
}

export function useHalloweenAudio() {
  const soundsRef = useRef<HalloweenSounds | null>(null);
  const laughIndexRef = useRef(0);
  const isEnabledRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const background = new Audio(backgroundSound);
    background.loop = true;
    background.volume = 0.1;
    background.preload = "auto";

    const laughs = Array.from({ length: laughVoiceCount }, () => {
      const audio = new Audio(laughSound);
      audio.volume = 0.38;
      audio.preload = "auto";
      return audio;
    });

    const explosion = new Audio(explosionSound);
    explosion.volume = 0.68;
    explosion.preload = "auto";

    const sounds = { background, laughs, explosion };
    soundsRef.current = sounds;
    const audioElements = [background, ...laughs, explosion];

    const handleAudioError = (event: Event) => {
      const audio = event.currentTarget;
      if (audio instanceof HTMLAudioElement) {
        console.error(`Unable to load audio asset: ${audio.currentSrc || audio.src}`);
      }
    };

    audioElements.forEach((audio) => {
      audio.addEventListener("error", handleAudioError);
    });

    return () => {
      audioElements.forEach((audio) => {
        audio.pause();
        audio.removeEventListener("error", handleAudioError);
      });
      if (soundsRef.current === sounds) soundsRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(() => {
    const sounds = soundsRef.current;
    const shouldEnable = !isEnabledRef.current;
    isEnabledRef.current = shouldEnable;
    setIsEnabled(shouldEnable);
    if (!sounds) return;

    if (shouldEnable) {
      void sounds.background.play().catch((error: unknown) => {
        if (!isExpectedPlaybackError(error)) {
          console.error("Unable to start the Halloween background sound.", error);
        }
      });
      return;
    }

    [sounds.background, ...sounds.laughs, sounds.explosion].forEach((audio) => {
      audio.pause();
      if (audio.readyState > 0) audio.currentTime = 0;
    });
  }, []);

  const playSound = useCallback(
    (sound: "laugh" | "explosion") => {
      if (!isEnabledRef.current) return;
      const sounds = soundsRef.current;
      if (!sounds) return;
      const laughIndex = laughIndexRef.current;
      const audio = sound === "laugh" ? sounds.laughs[laughIndex] : sounds.explosion;
      if (sound === "laugh") {
        laughIndexRef.current = (laughIndex + 1) % sounds.laughs.length;
      }
      if (!audio) return;

      playFromStart(audio, sound);
    },
    [],
  );

  const playLaugh = useCallback(() => playSound("laugh"), [playSound]);
  const playExplosion = useCallback(() => playSound("explosion"), [playSound]);

  return { isEnabled, toggleSound, playLaugh, playExplosion };
}
