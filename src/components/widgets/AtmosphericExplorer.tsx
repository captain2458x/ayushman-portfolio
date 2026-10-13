import React, { useState } from 'react';
import { Wind, Info, Gauge } from 'lucide-react';
import SoundManager from '../../utils/audio';

// ICAO International Standard Atmosphere (ISA) Model
function calculateAtmosphere(altitudeKm: number) {
  const h = Math.max(0, Math.min(20, altitudeKm)); // Limit 0 to 20 km
  const T0 = 288.15; // Sea level temperature in K (15°C)
  const P0 = 101.325; // Sea level pressure in kPa
  const rho0 = 1.225; // Sea level density in kg/m^3
  const g = 9.80665; // m/s^2
  const R = 287.05; // J/(kg*K)
  const gamma = 1.4; // Ratio of specific heats for air

  let T_K = 0;
  let P_kPa = 0;

  if (h <= 11) {
    // Troposphere: linear temperature lapse rate L = 6.5 K/km = 0.0065 K/m
    const L = 0.0065;
    T_K = T0 - L * (h * 1000);
    // P = P0 * (T/T0)^(g / (R * L))
    const exponent = g / (R * L);
    P_kPa = P0 * Math.pow(T_K / T0, exponent);
  } else {
    // Lower Stratosphere (11 to 20 km): Isothermal at 216.65 K (-56.5°C)
    const T11 = 216.65;
    const P11 = 22.632; // kPa at 11 km
    T_K = T11;
    // P = P11 * exp(-g * (h - 11000) / (R * T11))
    const deltaH = (h - 11) * 1000;
    P_kPa = P11 * Math.exp((-g * deltaH) / (R * T11));
  }

  // Ideal Gas Law: rho = P / (R * T) (P in Pa = kPa * 1000)
  const rho = (P_kPa * 1000) / (R * T_K);

  // Speed of sound: a = sqrt(gamma * R * T)
  const speedOfSound = Math.sqrt(gamma * R * T_K);

  const T_C = T_K - 273.15;

  return {
    altitudeKm: h,
    tempK: T_K.toFixed(1),
    tempC: T_C.toFixed(1),
    pressureKPa: P_kPa.toFixed(2),
    densityKgM3: rho.toFixed(3),
    densityRatio: (rho / rho0).toFixed(3),
    speedOfSoundMs: speedOfSound.toFixed(1)
  };
}

export default function AtmosphericExplorer() {
  const [altitude, setAltitude] = useState<number>(3.5);

  const data = calculateAtmosphere(altitude);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltitude(parseFloat(e.target.value));
  };

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border shadow-xl relative overflow-hidden technical-corner">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Wind size={18} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-wide text-text-primary uppercase">
            Atmospheric Density & Air Properties Explorer
          </h3>
        </div>
        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          ICAO_ISA_1993
        </span>
      </div>

      {/* Altitude Slider Control */}
      <div className="space-y-2 mb-6 font-mono">
        <div className="flex items-center justify-between text-xs">
          <label className="text-text-secondary uppercase tracking-wider text-[10px]">
            Geopotential Altitude:
          </label>
          <span className="text-primary font-bold bg-surface-elevated px-2 py-0.5 rounded border border-border">
            {altitude.toFixed(1)} km ({Math.round(altitude * 3280.84).toLocaleString()} ft)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={altitude}
          onChange={handleSliderChange}
          className="w-full h-2 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-text-secondary opacity-60">
          <span>Sea Level (0 km)</span>
          <span>Troposphere (11 km)</span>
          <span>Stratosphere (20 km)</span>
        </div>
      </div>

      {/* Atmospheric Properties Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 font-mono">
        <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-1">
            Temperature
          </span>
          <div className="font-bold text-text-primary text-base">
            {data.tempC} <span className="text-xs text-text-secondary">°C</span>
          </div>
          <span className="text-[9px] text-text-secondary mt-0.5 block">{data.tempK} K</span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-1">
            Static Pressure
          </span>
          <div className="font-bold text-text-primary text-base">
            {data.pressureKPa} <span className="text-xs text-text-secondary">kPa</span>
          </div>
          <span className="text-[9px] text-text-secondary mt-0.5 block">
            {(parseFloat(data.pressureKPa) * 10).toFixed(1)} mbar
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-1">
            Air Density (ρ)
          </span>
          <div className="font-bold text-primary text-base">
            {data.densityKgM3} <span className="text-xs text-primary/70">kg/m³</span>
          </div>
          <span className="text-[9px] text-text-secondary mt-0.5 block">
            {data.densityRatio} × ρ₀
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider block mb-1">
            Speed of Sound
          </span>
          <div className="font-bold text-text-primary text-base">
            {data.speedOfSoundMs} <span className="text-xs text-text-secondary">m/s</span>
          </div>
          <span className="text-[9px] text-text-secondary mt-0.5 block">
            {(parseFloat(data.speedOfSoundMs) * 3.6).toFixed(0)} km/h
          </span>
        </div>
      </div>

      {/* Educational Model Disclaimer */}
      <div className="p-3 rounded-lg bg-surface-elevated/60 border border-border text-[11px] font-sans text-text-secondary flex items-start gap-2">
        <Info size={14} className="text-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Educational Model:</strong> Computations employ the ICAO International Standard Atmosphere (ISA) equations for the dry troposphere and lower stratosphere. Actual weather conditions vary with humidity and local barometric anomalies.
        </p>
      </div>
    </div>
  );
}
