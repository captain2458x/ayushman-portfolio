import React, { useState, useEffect } from 'react';

interface TelemetryOverlayProps {
  stressMax?: string;
  forceName?: string;
  thrustVal?: string;
}

export default function TelemetryOverlay({ stressMax = '4.296 MPa', forceName = 'THRUST', thrustVal = '14.0 N' }: TelemetryOverlayProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [viscous, setViscous] = useState(0.095);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate ticking values
      setCoords({
        x: Number((Math.random() * 100).toFixed(4)),
        y: Number((Math.random() * 100).toFixed(4)),
      });
      setViscous(Number((0.08 + Math.random() * 0.03).toFixed(4)));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 flex flex-col justify-between p-3 select-none">
      
      {/* 1. Dynamic Scanner Line */}
      <div className="absolute inset-x-0 h-[2px] bg-sky-400/30 opacity-70 -translate-y-full animate-[scan_2s_linear_infinite]" />

      {/* 2. Top HUD Bar */}
      <div className="flex justify-between items-start font-mono text-[8px] text-sky-400">
        <div className="bg-slate-950/80 px-1.5 py-0.5 border border-sky-500/20 rounded backdrop-blur-[1px] flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping"></span>
          <span>SYS_SCAN: ACTIVE // ACCURACY: 99.8%</span>
        </div>
        <div className="bg-slate-950/80 px-1.5 py-0.5 border border-sky-500/20 rounded backdrop-blur-[1px]">
          SENS_TRK: LOCKED
        </div>
      </div>

      {/* 3. Center Crosshair Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-12 h-12 border border-dashed border-sky-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute w-6 h-6 border border-sky-400/40 rounded-full"></div>
        <div className="absolute w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
        
        {/* Reticle Lines */}
        <div className="absolute w-[20px] h-[1px] bg-sky-400/50"></div>
        <div className="absolute h-[20px] w-[1px] bg-sky-400/50"></div>
      </div>

      {/* 4. Bottom Telemetry readouts */}
      <div className="flex justify-between items-end font-mono text-[8px] text-sky-400">
        <div className="bg-slate-950/80 p-1.5 border border-sky-500/20 rounded backdrop-blur-[1px] space-y-0.5 leading-none">
          <div>COORDS: X_{coords.x} / Y_{coords.y}</div>
          <div>VISC_DRAG: {viscous} Cd</div>
        </div>
        
        <div className="bg-slate-950/80 p-1.5 border border-sky-500/20 rounded backdrop-blur-[1px] space-y-0.5 leading-none text-right">
          <div>MAX_STRESS: {stressMax}</div>
          <div>NET_{forceName}: {thrustVal}</div>
        </div>
      </div>
    </div>
  );
}
