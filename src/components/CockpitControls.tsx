import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldAlert, Cpu } from 'lucide-react';
import SoundManager from '../utils/audio';

const themes = [
  { id: 'cyan', label: 'CYAN', color: 'bg-[#00e5ff]', textColor: 'text-[#00e5ff]' },
  { id: 'green', label: 'VERT', color: 'bg-[#39ff14]', textColor: 'text-[#39ff14]' },
  { id: 'amber', label: 'AMBR', color: 'bg-[#ffb000]', textColor: 'text-[#ffb000]' },
  { id: 'red', label: 'ALRT', color: 'bg-[#ff3366]', textColor: 'text-[#ff3366]' }
];

export default function CockpitControls() {
  const [activeTheme, setActiveTheme] = useState('cyan');
  const [isMuted, setIsMuted] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // Sync mute state on start
    setIsMuted(SoundManager.getMuted());
    
    // Sync theme on start
    try {
      const savedTheme = localStorage.getItem('hud_color_theme');
      if (savedTheme) {
        setActiveTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    } catch (e) {
      // Ignored
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    try {
      localStorage.setItem('hud_color_theme', themeId);
    } catch (e) {
      // Ignored
    }
    SoundManager.playClick();
  };

  const handleMuteToggle = () => {
    const muted = SoundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      // Play a verification chime when unmuted
      setTimeout(() => SoundManager.playClick(), 100);
    }
  };

  const handlePanelToggle = () => {
    SoundManager.playClick();
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Console Panel */}
      {isPanelOpen && (
        <div className="bg-slate-950/90 border border-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-2xl w-64 text-left font-mono animate-[fade-in_0.2s_ease-out] relative">
          {/* Diagnostic Accent Divider */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold">
              <Cpu size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>COCKPIT_HUD_CONSOLE</span>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          {/* Color theme selectors */}
          <div className="space-y-2 mb-4">
            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">// HUD COCKPIT LIGHTS</label>
            <div className="grid grid-cols-4 gap-1.5">
              {themes.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`py-1.5 rounded border transition-all cursor-pointer text-center text-[9px] font-bold ${
                      isActive 
                        ? `border-cyan-400 bg-cyan-400/10 ${theme.textColor} font-extrabold`
                        : 'border-slate-900 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                    }`}
                  >
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio controls */}
          <div className="space-y-2 mb-2">
            <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">// VOL_TELEMETRY</label>
            <button
              onClick={handleMuteToggle}
              className={`w-full flex items-center justify-between py-2 px-3 rounded border transition-all cursor-pointer text-[10px] font-bold ${
                isMuted 
                  ? 'border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10'
                  : 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              <div className="flex items-center gap-2">
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>HUD SYNTH CHIPS</span>
              </div>
              <span className="text-[9px] font-semibold">{isMuted ? '[MUTED]' : '[ONLINE]'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Action floating Toggle Button */}
      <button
        onClick={handlePanelToggle}
        className="w-12 h-12 rounded-full bg-slate-950/90 border border-slate-800 hover:border-cyan-400/40 transition-all flex items-center justify-center text-cyan-400 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105"
        title="Toggle HUD Cockpit Settings"
      >
        <ShieldAlert size={20} className={isPanelOpen ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'} />
      </button>

    </div>
  );
}
