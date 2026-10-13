import React, { useState, useEffect } from 'react';
import { Plane, Compass, Menu, X, FileText, ArrowRight, Volume2, VolumeX, BookOpen, ExternalLink } from 'lucide-react';
import SoundManager from '../../../utils/audio';

export interface Destination {
  id: string;
  num: string;
  shortLabel: string;
  label: string;
}

export const JOURNEY_DESTINATIONS: Destination[] = [
  { id: 'ch1-pilot', num: '01', shortLabel: 'The Beginning', label: 'Chapter 01: The Beginning' },
  { id: 'ch2-hangar', num: '02', shortLabel: 'The Hangar', label: 'Chapter 02: The Hangar' },
  { id: 'ch3-projects', num: '03', shortLabel: 'Missions & Machines', label: 'Chapter 03: Missions & Machines' },
  { id: 'ch4-space', num: '04', shortLabel: 'Beyond the Sky', label: 'Chapter 04: Beyond the Sky' },
  { id: 'ch5-experience', num: '05', shortLabel: 'The Journey So Far', label: 'Chapter 05: The Journey So Far' },
  { id: 'ch6-contact', num: '06', shortLabel: 'The Next Destination', label: 'Chapter 06: The Next Destination' }
];

interface JourneyNavBarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onSwitchMode?: () => void;
  onReplayIntro?: () => void;
}

export default function JourneyNavBar({
  activeSection,
  onNavigate,
  onSwitchMode,
  onReplayIntro
}: JourneyNavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(SoundManager.getMuted());

  useEffect(() => {
    setIsMuted(SoundManager.getMuted());
  }, []);

  const handleAudioToggle = () => {
    const muted = SoundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      setTimeout(() => SoundManager.playClick(), 50);
    }
  };

  const activeIndex = JOURNEY_DESTINATIONS.findIndex((d) => d.id === activeSection);
  const progressPercent = activeIndex !== -1 ? ((activeIndex + 1) / JOURNEY_DESTINATIONS.length) * 100 : 16;

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Logo / Mascot Title */}
          <div 
            onClick={() => {
              SoundManager.playClick();
              onNavigate('ch1-pilot');
            }}
            className="flex items-center gap-2 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Plane size={16} className="-rotate-45" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-slate-900 tracking-tight block leading-tight">
                SKYBOUND
              </span>
              <span className="font-mono text-[9px] uppercase text-sky-700 font-semibold flex items-center gap-1">
                <span>AYUSHMAN SRIVASTAVA</span>
                <span>•</span>
                <span className="text-slate-500">CH {activeIndex >= 0 ? activeIndex + 1 : 1} OF 6</span>
              </span>
            </div>
          </div>

          {/* Desktop Journey Map Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px]">
            {JOURNEY_DESTINATIONS.map((dest) => {
              const isActive = activeSection === dest.id;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => {
                    SoundManager.playClick();
                    onNavigate(dest.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="opacity-70 text-[9px]">{dest.num}</span>
                  <span>{dest.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Replay Film Intro Button */}
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-mono text-[10px] font-semibold transition-colors cursor-pointer"
                title="Replay cinematic movie opening"
              >
                <span>🎬 REPLAY INTRO</span>
              </button>
            )}

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleAudioToggle}
              title={isMuted ? 'Sound Muted' : 'Sound Active'}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-sky-600" />}
            </button>

            {/* Resume Button */}
            <a
              href="/resume/resume.pdf"
              download="Ayushman_Srivastava_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => SoundManager.playClick()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold shadow-sm transition-all"
            >
              <FileText size={12} />
              <span>RESUME</span>
            </a>

            {/* Persistent Shortcut: SKIP THE JOURNEY → VIEW PORTFOLIO */}
            {onSwitchMode && (
              <button
                type="button"
                onClick={onSwitchMode}
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-mono text-[11px] font-bold transition-colors cursor-pointer"
                title="Open conventional technical overview"
              >
                <span>VIEW PORTFOLIO</span>
                <ArrowRight size={11} className="text-sky-600" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

          </div>

        </div>

        {/* Continuous Flight Progress Track */}
        <div className="w-full bg-slate-100 h-[2px] mt-1.5">
          <div 
            className="h-full bg-sky-600 transition-all duration-300" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-14 z-30 bg-white border-b border-slate-200 shadow-xl p-4 lg:hidden animate-in slide-in-from-top-2 duration-150 font-mono text-xs space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 px-2 pb-1 border-b border-slate-100 flex justify-between items-center">
            <span>JOURNEY MAP DESTINATIONS</span>
            {onReplayIntro && (
              <button 
                onClick={() => { setMobileOpen(false); onReplayIntro(); }}
                className="text-sky-600 underline font-semibold"
              >
                Replay Intro
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {JOURNEY_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  onNavigate(dest.id);
                  setMobileOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                  activeSection === dest.id
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{dest.label}</span>
                <ArrowRight size={12} className="opacity-50" />
              </button>
            ))}
          </div>

          {onSwitchMode && (
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onSwitchMode();
                }}
                className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 text-center font-bold"
              >
                SKIP THE JOURNEY → VIEW PORTFOLIO
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
