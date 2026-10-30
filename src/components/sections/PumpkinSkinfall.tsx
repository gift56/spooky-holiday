import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type PumpkinSkinfallProps = {
  isActive: boolean;
};

const fragments = [
  { left: "4%", size: "12px", duration: "3.6s", delay: "0s", drift: "35px", spin: "300deg", opacity: 0.42 },
  { left: "12%", size: "8px", duration: "3.4s", delay: "0.5s", drift: "-28px", spin: "240deg", opacity: 0.34 },
  { left: "21%", size: "15px", duration: "3.8s", delay: "0.9s", drift: "44px", spin: "390deg", opacity: 0.38 },
  { left: "30%", size: "9px", duration: "3.5s", delay: "0.2s", drift: "-36px", spin: "280deg", opacity: 0.3 },
  { left: "41%", size: "13px", duration: "3.7s", delay: "1s", drift: "30px", spin: "340deg", opacity: 0.4 },
  { left: "52%", size: "8px", duration: "3.4s", delay: "0.4s", drift: "-42px", spin: "270deg", opacity: 0.34 },
  { left: "63%", size: "14px", duration: "3.8s", delay: "0.7s", drift: "34px", spin: "360deg", opacity: 0.4 },
  { left: "73%", size: "10px", duration: "3.5s", delay: "0.1s", drift: "-30px", spin: "300deg", opacity: 0.32 },
  { left: "84%", size: "15px", duration: "3.8s", delay: "0.8s", drift: "42px", spin: "380deg", opacity: 0.38 },
  { left: "94%", size: "9px", duration: "3.4s", delay: "0.3s", drift: "-34px", spin: "260deg", opacity: 0.36 },
] as const;

type FragmentStyle = CSSProperties & {
  "--fragment-left": string;
  "--fragment-size": string;
  "--fragment-duration": string;
  "--fragment-delay": string;
  "--fragment-drift": string;
  "--fragment-spin": string;
  "--fragment-opacity": number;
};

export function PumpkinSkinfall({ isActive }: PumpkinSkinfallProps) {
  const [isFalling, setIsFalling] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const timer = window.setTimeout(() => setIsFalling(false), 5000);
    return () => window.clearTimeout(timer);
  }, [isActive]);

  if (!isActive || !isFalling) return null;

  return (
    <div className="pumpkin-skinfall" aria-hidden="true">
      {fragments.map((fragment, index) => {
        const style: FragmentStyle = {
          "--fragment-left": fragment.left,
          "--fragment-size": fragment.size,
          "--fragment-duration": fragment.duration,
          "--fragment-delay": fragment.delay,
          "--fragment-drift": fragment.drift,
          "--fragment-spin": fragment.spin,
          "--fragment-opacity": fragment.opacity,
        };

        return <i className="pumpkin-skinfall__fragment" key={index} style={style} />;
      })}
    </div>
  );
}
