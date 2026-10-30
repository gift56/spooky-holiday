import { Volume2, VolumeX } from "lucide-react";

type SoundToggleProps = {
  isEnabled: boolean;
  onToggle: () => void;
};

export function SoundToggle({ isEnabled, onToggle }: SoundToggleProps) {
  return (
    <button
      className="sound-toggle"
      type="button"
      aria-label={isEnabled ? "Turn sound off" : "Turn sound on"}
      aria-pressed={isEnabled}
      onClick={onToggle}
    >
      {isEnabled ? (
        <Volume2 aria-hidden="true" />
      ) : (
        <VolumeX aria-hidden="true" />
      )}
      <span>{isEnabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
