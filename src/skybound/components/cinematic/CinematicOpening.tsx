import React, { useState, useEffect } from 'react';
import { FastForward, Volume2, VolumeX, Sparkles, Plane } from 'lucide-react';
import CartoonAircraft3D from '../aircraft/CartoonAircraft3D';
import SoundManager from '../../../utils/audio';

interface CinematicOpeningProps {
  onComplete: () => void;
}

export default function CinematicOpening({ onComplete }: CinematicOpeningProps) {
  // 6 Cinematic Shots from the Master Directive
  // 1: Silence Before Flight
  // 2: First Light
  // 3: The Aircraft & Propeller Start
  // 4: Takeoff Roll & Climb
  // 5: Into the Volumetric Clouds
  // 6: Majestic Title Reveal
  const [shot, setShot] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isMuted, setIsMuted] = useState(SoundManager.getMuted());

  useEffect(() => {
    // Shot timings:
    // 0s - 1.1s: Shot 1 (Silence Before Flight)
    // 1.1s - 2.2s: Shot 2 (First Light across runway)
    // 2.2s - 3.6s: Shot 3 (Propeller startup & runway lights)
    // 3.6s - 4.9s: Shot 4 (Acceleration & low tracking takeoff)
    // 4.9s - 6.0s: Shot 5 (Into bright white clouds)
    // 6.0s - 7.5s: Shot 6 (Title reveal over golden morning sun)
    const t1 = setTimeout(() => {
      setShot(2);
      SoundManager.playHover();
    }, 1100);

    const t2 = setTimeout(() => {
      setShot(3);
      SoundManager.playClick();
    }, 2200);

    const t3 = setTimeout(() => {
      setShot(4);
      SoundManager.playSuccess();
    }, 3600);

    const t4 = setTimeout(() => {
      setShot(5);
    }, 4900);

    const t5 = setTimeout(() => {
      setShot(6);
    }, 6000);

    const t6 = setTimeout(() => {
      sessionStorage.setItem('skybound_intro_seen', 'true');
      onComplete();
    }, 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    SoundManager.playClick();
    sessionStorage.setItem('skybound_intro_seen', 'true');
    onComplete();
  };

  const toggleSound = () => {
    const muted = SoundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      SoundManager.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans bg-black flex flex-col items-center justify-center transition-colors duration-1000">
      
      {/* Top Controls: Skip & Audio */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSound}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
          title={isMuted ? 'Sound Muted' : 'Sound Active'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-amber-300" />}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-mono text-xs font-bold tracking-wider backdrop-blur-md border border-white/30 transition-all hover:scale-105 cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <FastForward size={14} className="text-amber-300" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SHOT 1: SILENCE BEFORE FLIGHT (Dark screen with faint horizon light)      */}
      {/* ========================================================================= */}
      {shot === 1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
          <div className="w-96 h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-sm mb-4" />
          <p className="font-mono text-xs text-slate-400 uppercase tracking-[0.3em]">
            BEFORE THE FLIGHT
          </p>
          <span className="font-sans text-sm text-slate-500 mt-2">
            A quiet morning at the airfield...
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOT 2: FIRST LIGHT (Golden sunlight illuminating rolling hills)          */}
      {/* ========================================================================= */}
      {shot === 2 && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#475569] to-[#FDE68A]/60 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000">
          <div className="absolute -bottom-10 inset-x-0 h-40 bg-gradient-to-t from-amber-400/30 to-transparent blur-2xl" />
          <div className="space-y-2 z-10">
            <span className="font-mono text-[11px] font-bold text-amber-300 uppercase tracking-[0.25em] bg-black/40 px-3 py-1 rounded-full border border-amber-400/30">
              SHOT 02 // FIRST LIGHT
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Dawn breaks over the runway.
            </h2>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOT 3: THE AIRCRAFT & PROPELLER START (Close-up tracking, runway lights)  */}
      {/* ========================================================================= */}
      {shot === 3 && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
          <div className="w-80 h-52 relative">
            <CartoonAircraft3D flightState="taxi" pitchAngle={0} rollAngle={0} />
          </div>

          {/* Runway Lights */}
          <div className="flex items-center gap-6 my-3">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400 animate-ping" style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-sky-800 tracking-wider">
              RUNWAY 09L // ENGINES SPOOLING UP
            </span>
            <h2 className="font-display font-bold text-2xl text-slate-900">
              The propeller catches the morning sunlight.
            </h2>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOT 4: TAKEOFF ROLL & CLIMB (Camera tracking smooth ascent)              */}
      {/* ========================================================================= */}
      {shot === 4 && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
          <div className="w-96 h-56 relative transform -translate-y-8 rotate-3 transition-transform duration-1000">
            <CartoonAircraft3D flightState="takeoff" pitchAngle={15} rollAngle={-4} />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              AIRBORNE // ROTATION COMPLETE
            </span>
            <h2 className="font-display font-bold text-2xl text-slate-900">
              Lifting off into the open sky!
            </h2>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOT 5: INTO THE VOLUMETRIC CLOUDS (Pure white cloud immersion)           */}
      {/* ========================================================================= */}
      {shot === 5 && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
          <div className="w-80 h-48 opacity-40 blur-xs">
            <CartoonAircraft3D flightState="cruising" pitchAngle={8} rollAngle={2} />
          </div>
          <p className="font-mono text-xs text-sky-700 uppercase tracking-[0.25em] mt-4 font-bold">
            SURGING THROUGH THE CLOUD LAYER...
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOT 6: MAJESTIC TITLE REVEAL (Emerging above sea of clouds)              */}
      {/* ========================================================================= */}
      {shot === 6 && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#A7D8F5] via-[#E0F2FE] to-[#FFFDF7] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in-95 duration-1000">
          
          <div className="w-72 h-44 relative -mb-2">
            <CartoonAircraft3D flightState="cruising" pitchAngle={3} rollAngle={5} />
          </div>

          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-sky-700 bg-white/80 px-4 py-1.5 rounded-full border border-sky-300 shadow-sm inline-block">
              A FILM JOURNEY THROUGH FLIGHT, DESIGN & SPACE
            </span>

            <h1 className="font-display font-black text-5xl sm:text-6xl text-slate-900 tracking-tight leading-none">
              SKYBOUND
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-700 font-semibold">
              The Journey of an Aerospace Engineer
            </p>

            <p className="font-mono text-xs text-slate-500">
              Ayushman Srivastava • B.Tech Aeronautical Engineering (2023–2027)
            </p>
          </div>

        </div>
      )}

      {/* Progress Bar along bottom */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
        <div 
          className="h-full bg-amber-400 transition-all duration-700" 
          style={{ width: `${(shot / 6) * 100}%` }} 
        />
      </div>

    </div>
  );
}
