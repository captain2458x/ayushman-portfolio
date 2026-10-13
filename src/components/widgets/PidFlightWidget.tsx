import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Wind, Activity } from 'lucide-react';
import SoundManager from '../../utils/audio';

export default function PidFlightWidget() {
  const [kp, setKp] = useState(0.12);
  const [kd, setKd] = useState(0.45);
  const [turbulence, setTurbulence] = useState<'none' | 'low' | 'high'>('low');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    droneY: 210, // Canvas coordinates (Y down)
    droneVy: 0,
    targetY: 90, // Setpoint height
    history: [] as number[],
    frame: 0
  });

  const isDraggingRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY > 20 && mouseY < 220) {
      stateRef.current.targetY = mouseY;
      isDraggingRef.current = true;
      SoundManager.playClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY > 20 && mouseY < 220) {
      stateRef.current.targetY = mouseY;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetDrone = () => {
    SoundManager.playClick();
    stateRef.current.droneY = 210;
    stateRef.current.droneVy = 0;
    stateRef.current.history = [];
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const state = stateRef.current;
      state.frame += 1;

      // 1. Run Physics & PID calculation
      const gravity = 0.16;
      const error = state.targetY - state.droneY;
      const thrust = kp * error - kd * state.droneVy;

      const clampedThrust = Math.max(-0.55, Math.min(0.05, thrust));

      let windImpulse = 0;
      if (turbulence === 'low') {
        windImpulse = (Math.sin(state.frame * 0.15) * 0.08 + (Math.random() - 0.5) * 0.06);
      } else if (turbulence === 'high') {
        windImpulse = (Math.sin(state.frame * 0.3) * 0.22 + (Math.random() - 0.5) * 0.2);
      }

      state.droneVy += gravity + clampedThrust + windImpulse;
      state.droneVy *= 0.98; // Air resistance damping
      state.droneY += state.droneVy;

      // Ground constraint
      if (state.droneY > 220) {
        state.droneY = 220;
        state.droneVy = 0;
      }
      if (state.droneY < 15) {
        state.droneY = 15;
        state.droneVy = 0;
      }

      // History
      if (state.frame % 3 === 0) {
        state.history.push(state.droneY);
        if (state.history.length > 70) state.history.shift();
      }

      // 2. Render Screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;
      for (let y = 30; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Target Altitude Line (Green dashed)
      ctx.strokeStyle = '#34D399';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, state.targetY);
      ctx.lineTo(canvas.width, state.targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#34D399';
      ctx.font = '10px monospace';
      ctx.fillText(`TARGET SETPOINT: ${(240 - state.targetY).toFixed(0)}m`, 10, state.targetY - 5);

      // Historical flight path
      if (state.history.length > 1) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        state.history.forEach((hY, idx) => {
          const hX = (canvas.width - 150) + (idx / 70) * 140;
          if (idx === 0) ctx.moveTo(hX, hY);
          else ctx.lineTo(hX, hY);
        });
        ctx.stroke();
      }

      // Draw Drone Model
      const dX = canvas.width * 0.4;
      const dY = state.droneY;

      // Central Body
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(dX, dY, 7, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dX - 25, dY);
      ctx.lineTo(dX + 25, dY);
      ctx.stroke();

      // Rotors
      [-25, 25].forEach((offset) => {
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(dX + offset - 4, dY - 4, 8, 2);
        // Spinning rotor disk blur
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(dX + offset, dY - 5, 12, 2.5, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Ground line
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 230);
      ctx.lineTo(canvas.width, 230);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [kp, kd, turbulence]);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border shadow-xl relative overflow-hidden technical-corner">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-wide text-text-primary uppercase">
            Closed-Loop PID Altitude Flight Controller
          </h3>
        </div>
        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          MATLAB_SIMULINK_PID
        </span>
      </div>

      {/* Canvas */}
      <div className="relative mb-5 rounded-xl overflow-hidden border border-border bg-background">
        <canvas
          ref={canvasRef}
          width={600}
          height={240}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-[220px] cursor-crosshair block"
          title="Click to set desired target altitude setpoint"
        />
        <div className="absolute top-2 right-2 font-mono text-[9px] text-text-secondary bg-surface/80 px-2 py-1 rounded border border-border">
          CLICK CANVAS TO COMMAND SETPOINT
        </div>
      </div>

      {/* PID Tuning Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-[10px] text-text-secondary">PROPORTIONAL (Kp)</span>
            <strong className="text-primary">{kp.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min="0.02"
            max="0.30"
            step="0.01"
            value={kp}
            onChange={(e) => setKp(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-[10px] text-text-secondary">DERIVATIVE (Kd)</span>
            <strong className="text-primary">{kd.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.90"
            step="0.02"
            value={kd}
            onChange={(e) => setKd(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-text-secondary block">WIND TURBULENCE</span>
          <div className="grid grid-cols-3 gap-1">
            {(['none', 'low', 'high'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  setTurbulence(lvl);
                }}
                className={`py-1 rounded text-[10px] uppercase font-bold border transition-colors cursor-pointer ${
                  turbulence === lvl
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border bg-surface-elevated text-text-secondary hover:text-text-primary'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={resetDrone}
          className="flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>Reset Flight State</span>
        </button>
      </div>
    </div>
  );
}
