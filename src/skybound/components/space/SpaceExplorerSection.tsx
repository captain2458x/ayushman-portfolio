import React, { useState } from 'react';
import { Globe2, Orbit, ArrowRight } from 'lucide-react';
import OrbitVisualizer3D from '../../../components/3d/OrbitVisualizer3D';
import SoundManager from '../../../utils/audio';

interface SpaceExplorerSectionProps {
  onOpenProject: (slug: string) => void;
}

export default function SpaceExplorerSection({ onOpenProject }: SpaceExplorerSectionProps) {
  const [altitudeKm, setAltitudeKm] = useState<number>(500);
  const [inclinationDeg, setInclinationDeg] = useState<number>(51.6);

  // Orbital physics
  const mu = 398600.4418;
  const rEarth = 6378.137;
  const rOrbit = rEarth + altitudeKm;
  const vOrbitKmS = Math.sqrt(mu / rOrbit);
  const periodSec = 2 * Math.PI * Math.sqrt(Math.pow(rOrbit, 3) / mu);
  const periodMin = periodSec / 60;
  const orbitsPerDay = (86400 / periodSec).toFixed(1);

  return (
    <div className="relative py-8 px-4 sm:px-6 rounded-2xl bg-[#0B132B] text-slate-100 border border-indigo-900/50 shadow-xl overflow-hidden font-sans space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-900/40 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800">
            CHAPTER 4 // ORBITAL MECHANICS & SIMULATION
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
            Satellite Trajectory Simulator
          </h3>
          <p className="font-sans text-xs text-slate-300 mt-0.5">
            Simulate Low Earth Orbit parameters derived from NASA GMAT mission planning.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            SoundManager.playClick();
            onOpenProject('satellite-orbital-simulation');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>1U CubeSat Dossier</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Grid: 3D Globe + Compact Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Left: 3D Canvas (compact height) */}
        <div className="lg:col-span-7 h-56 sm:h-64 rounded-xl overflow-hidden bg-[#070C1B] border border-indigo-950">
          <OrbitVisualizer3D altitudeKm={altitudeKm} inclinationDeg={inclinationDeg} />
        </div>

        {/* Right: Telemetry & Interactive Sliders */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          
          {/* Sliders */}
          <div className="space-y-3 bg-[#070C1B] p-3.5 rounded-xl border border-indigo-950">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Altitude (h)</span>
                <strong className="text-sky-400">{altitudeKm} km</strong>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={altitudeKm}
                onChange={(e) => setAltitudeKm(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Inclination (i)</span>
                <strong className="text-sky-400">{inclinationDeg.toFixed(1)}°</strong>
              </div>
              <input
                type="range"
                min="0"
                max="98"
                step="2"
                value={inclinationDeg}
                onChange={(e) => setInclinationDeg(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400"
              />
            </div>
          </div>

          {/* Computed metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#070C1B] border border-indigo-950 text-center">
              <span className="text-[9px] text-slate-400 uppercase block">Velocity</span>
              <strong className="text-white text-xs">{vOrbitKmS.toFixed(2)} km/s</strong>
            </div>
            <div className="p-2 rounded-lg bg-[#070C1B] border border-indigo-950 text-center">
              <span className="text-[9px] text-slate-400 uppercase block">Period</span>
              <strong className="text-white text-xs">{periodMin.toFixed(1)} m</strong>
            </div>
            <div className="p-2 rounded-lg bg-[#070C1B] border border-indigo-950 text-center">
              <span className="text-[9px] text-slate-400 uppercase block">Orbits/Day</span>
              <strong className="text-sky-400 text-xs">{orbitsPerDay}</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
