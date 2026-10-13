import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SoundManager from '../../utils/audio';

export default function CockpitAudioControl() {
  const [isMuted, setIsMuted] = useState(SoundManager.getMuted());

  useEffect(() => {
    setIsMuted(SoundManager.getMuted());
  }, []);

  const handleToggle = () => {
    const muted = SoundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      setTimeout(() => SoundManager.playClick(), 50);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isMuted ? 'Telemetry Audio: Muted (Click to enable)' : 'Telemetry Audio: Online (Click to mute)'}
      aria-label={isMuted ? 'Enable telemetry audio' : 'Mute telemetry audio'}
      className="p-2 rounded-lg border border-border bg-surface hover:bg-surface-elevated hover:border-primary/50 text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-primary animate-pulse" />}
    </button>
  );
}
