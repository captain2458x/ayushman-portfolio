import React, { useState } from 'react';
import { Globe2, Info, Compass } from 'lucide-react';
import OrbitVisualizer3D from '../3d/OrbitVisualizer3D';
import SoundManager from '../../utils/audio';

export default function OrbitVisualizerWidget() {
  const [altitudeKm, setAltitudeKm] = useState<number>(500);
  const [inclinationDeg, setInclinationDeg] = useState<number>(51.6); // ISS / LEO standard

  // Orbital mechanics calculations for Earth:
  // mu = G * M_earth = 398600.4418 km^3/s^2
  // R_earth = 6378.137 km
  const mu = 398600.4418;
  const rEarth = 6378.137;
  const rOrbit = rEarth + altitudeKm;

  // Circular orbital speed: v = sqrt(mu / r)
  const vOrbitKmS = Math.sqrt(mu / rOrbit);

  // Period: T = 2 * pi * sqrt(r^3 / mu) in seconds
  const periodSec = 2 * Math.PI * Math.sqrt(Math.pow(rOrbit, 3) / mu);
  const periodMin = periodSec / 60;
  const orbitsPerDay = (86400 / periodSec).toFixed(1);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border shadow-xl relative overflow-hidden technical-corner">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Globe2 size={18} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-wide text-text-primary uppercase">
            LEO Satellite Orbital Mechanics Visualizer
          </h3>
        </div>
        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          KEPLERIAN_2BODY
        </span>
      </div>

      {/* 3D Scene View */}
      <div className="mb-5">
        <OrbitVisualizer3D inclinationDeg={inclinationDeg} altitudeKm={altitudeKm} />
      </div>

      {/* Sliders for Inclination & Altitude */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 font-mono">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary text-[10px] uppercase">Orbit Altitude</span>
            <strong className="text-primary">{altitudeKm} km (LEO)</strong>
          </div>
          <input
            type="range"
            min="200"
            max="1200"
            step="50"
            value={altitudeKm}
            onChange={(e) => setAltitudeKm(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary text-[10px] uppercase">Inclination (i)</span>
            <strong className="text-primary">{inclinationDeg.toFixed(1)}°</strong>
          </div>
          <input
            type="range"
            min="0"
            max="98"
            step="2"
            value={inclinationDeg}
            onChange={(e) => setInclinationDeg(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Telemetry Output Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5 font-mono">
        <div className="p-3 rounded-xl bg-surface-elevated border border-border text-center">
          <span className="text-[9px] uppercase tracking-wider text-text-secondary block mb-1">
            Orbital Velocity
          </span>
          <span className="text-sm font-bold text-text-primary">
            {vOrbitKmS.toFixed(2)} <span className="text-xs text-text-secondary">km/s</span>
          </span>
        </div>

        <div className="p-3 rounded-xl bg-surface-elevated border border-border text-center">
          <span className="text-[9px] uppercase tracking-wider text-text-secondary block mb-1">
            Orbital Period
          </span>
          <span className="text-sm font-bold text-text-primary">
            {periodMin.toFixed(1)} <span className="text-xs text-text-secondary">min</span>
          </span>
        </div>

        <div className="p-3 rounded-xl bg-surface-elevated border border-border text-center">
          <span className="text-[9px] uppercase tracking-wider text-text-secondary block mb-1">
            Orbits / Day
          </span>
          <span className="text-sm font-bold text-primary">
            {orbitsPerDay} <span className="text-xs text-primary/70">revs</span>
          </span>
        </div>
      </div>

      {/* Notice */}
      <div className="p-3 rounded-lg bg-surface-elevated/60 border border-border text-[11px] font-sans text-text-secondary flex items-start gap-2">
        <Info size={14} className="text-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Illustrative Simulation:</strong> Displays a 2-body Keplerian circular orbit model. High-precision mission trajectories in NASA GMAT incorporate J2/J4 gravitational harmonics, lunar-solar third-body perturbations, and solar radiation pressure.
        </p>
      </div>
    </div>
  );
}
