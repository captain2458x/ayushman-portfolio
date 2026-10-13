import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Wind, HelpCircle, Activity } from 'lucide-react';
import SoundManager from '../utils/audio';

export default function FlightSimulator() {
  // Simulator tuning parameters
  const [kp, setKp] = useState(0.12);
  const [kd, setKd] = useState(0.45);
  const [turbulence, setTurbulence] = useState('low'); // 'none', 'low', 'high'
  const [isStable, setIsStable] = useState(true);
  const [stabilityScore, setStabilityScore] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Simulation physics state
  const stateRef = useRef({
    droneY: 250, // Starts on ground
    droneVy: 0,
    targetY: 120, // Initial target height
    history: [] as number[], // For telemetry chart plotting
    frame: 0
  });

  const isDraggingRef = useRef(false);

  // Set up mouse listeners to drag-to-set target altitude
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Constraint target height to safe margins
    if (mouseY > 20 && mouseY < 260) {
      stateRef.current.targetY = mouseY;
      isDraggingRef.current = true;
      SoundManager.playClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    if (mouseY > 20 && mouseY < 260) {
      stateRef.current.targetY = mouseY;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetDrone = () => {
    SoundManager.playClick();
    stateRef.current.droneY = 250;
    stateRef.current.droneVy = 0;
    stateRef.current.history = [];
  };

  const dropDrone = () => {
    SoundManager.playClick();
    stateRef.current.droneY = 30;
    stateRef.current.droneVy = 0;
    SoundManager.playWarning();
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;

    const render = () => {
      const state = stateRef.current;
      state.frame += 1;

      // 1. Run Physics & PID calculation
      const gravity = 0.15;
      
      // Error = target position - current position
      // In canvas, y goes downwards, so height above ground is negative displacement.
      // To keep standard PID signs: Error = TargetY - DroneY
      const error = state.targetY - state.droneY;
      
      // Control input: Thrust thrust = Kp * error - Kd * velocity
      // Note the signs: positive error means drone is too low (target is above, i.e. smaller Y)
      // So thrust force pushes drone up (negative Y direction)
      const thrust = (kp * error) - (kd * state.droneVy);
      
      // Clamp thrust output to realistic limits
      const maxThrust = -0.55;
      const minThrust = 0.05;
      const clampedThrust = Math.max(maxThrust, Math.min(minThrust, thrust));

      // Wind Turbulence Noise
      let windImpulse = 0;
      if (turbulence === 'low') {
        windImpulse = (Math.random() - 0.5) * 0.18;
      } else if (turbulence === 'high') {
        windImpulse = (Math.random() - 0.5) * 0.55;
      }

      // Net Acceleration = Gravity (pushing down) + Thrust (pushing up) + Wind
      const accel = gravity + clampedThrust + windImpulse;

      // Update velocity and position
      state.droneVy += accel;
      state.droneY += state.droneVy;

      // Collision boundary with ground
      const groundY = 250;
      if (state.droneY >= groundY) {
        state.droneY = groundY;
        state.droneVy = 0;
      }
      // Collision boundary with ceiling
      if (state.droneY <= 20) {
        state.droneY = 20;
        state.droneVy = 0;
      }

      // Log history (Telemetry data array)
      if (state.frame % 3 === 0) {
        state.history.push(state.droneY);
        if (state.history.length > 80) {
          state.history.shift();
        }

        // Assess stability metrics
        const historySlice = state.history.slice(-20);
        if (historySlice.length >= 20) {
          const devs = historySlice.map(y => Math.abs(y - state.targetY));
          const maxDev = Math.max(...devs);
          const isDroneStable = maxDev < 8 && state.droneY < groundY;
          setIsStable(isDroneStable);

          // Stability score log
          const score = Math.max(0, Math.min(100, Math.round(100 - maxDev * 2.5)));
          setStabilityScore(score);
        }
      }

      // 2. CANVAS DRAWING
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Accent color theme check
      const styles = getComputedStyle(document.documentElement);
      const accentColor = styles.getPropertyValue('--accent-color').trim() || '#00e5ff';
      const accentDark = styles.getPropertyValue('--accent-color-dark').trim() || '#00b0ff';

      // Draw Grid Lines (Aeronautical display style)
      ctx.strokeStyle = 'rgba(15, 30, 54, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Flight Sandbox Ground
      ctx.fillStyle = '#0f1e36';
      ctx.fillRect(0, groundY + 12, canvas.width, 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 12);
      ctx.lineTo(canvas.width, groundY + 12);
      ctx.stroke();

      // Draw Target Altitude (Dotted active line)
      ctx.strokeStyle = accentColor;
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, state.targetY);
      ctx.lineTo(canvas.width, state.targetY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Target Altitude Label
      ctx.fillStyle = accentColor;
      ctx.font = '9px monospace';
      ctx.fillText(`TARGET: ${Math.round(250 - state.targetY)}m`, 10, state.targetY - 5);

      // Draw Running Telemetry Waveform Plot overlay in background
      if (state.history.length > 1) {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
        if (accentColor !== '#00e5ff') {
          ctx.strokeStyle = accentColor.replace('rgb', 'rgba').replace(')', ', 0.08)');
        }
        ctx.lineWidth = 2;
        ctx.beginPath();
        const startX = canvas.width - 90;
        state.history.forEach((hY, index) => {
          const plotX = startX + index * 1.1;
          if (index === 0) ctx.moveTo(plotX, hY);
          else ctx.lineTo(plotX, hY);
        });
        ctx.stroke();
      }

      // Draw Quadcopter Vector representation
      const dx = canvas.width / 2.5; // Horizontal center
      const dy = state.droneY;

      // Jet exhaust trails (firing particles downwards if thrust is high)
      if (dy < groundY) {
        const jetStrength = Math.abs(clampedThrust) * 25;
        const grad = ctx.createLinearGradient(dx, dy, dx, dy + jetStrength);
        grad.addColorStop(0, accentColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        
        // Left and Right motors nozzle firing
        ctx.beginPath();
        ctx.ellipse(dx - 18, dy + 2, 3, jetStrength, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(dx + 18, dy + 2, 3, jetStrength, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main structural arms (Carbon Fiber bars)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(dx - 22, dy);
      ctx.lineTo(dx + 22, dy);
      ctx.stroke();

      // Vertical motor hubs
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(dx - 22, dy - 6, 4, 8);
      ctx.fillRect(dx + 18, dy - 6, 4, 8);

      // Center payload body (CFRP hub)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(dx, dy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center status light blinking
      ctx.fillStyle = state.frame % 30 < 15 ? accentColor : '#1e293b';
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fill();

      // Spin propellers (short rotating line segments based on time/thrust)
      const propSpeed = Math.abs(clampedThrust) * 0.8;
      const angle = (state.frame * propSpeed);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;

      // Left propeller
      ctx.beginPath();
      ctx.moveTo(dx - 20 - Math.cos(angle) * 12, dy - 6 - Math.sin(angle) * 2);
      ctx.lineTo(dx - 20 + Math.cos(angle) * 12, dy - 6 + Math.sin(angle) * 2);
      ctx.stroke();

      // Right propeller
      ctx.beginPath();
      ctx.moveTo(dx + 20 - Math.cos(angle + Math.PI/3) * 12, dy - 6 - Math.sin(angle + Math.PI/3) * 2);
      ctx.lineTo(dx + 20 + Math.cos(angle + Math.PI/3) * 12, dy - 6 + Math.sin(angle + Math.PI/3) * 2);
      ctx.stroke();

      // Telemetry diagnostics overlay HUD text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '8px monospace';
      ctx.fillText(`ALT: ${Math.round(250 - state.droneY)}m`, canvas.width - 80, 20);
      ctx.fillText(`VEL: ${(state.droneVy * -10).toFixed(1)}m/s`, canvas.width - 80, 32);

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrameId);
  }, [kp, kd, turbulence]);

  return (
    <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs w-full text-left font-mono">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
            <Activity className="animate-pulse" size={16} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">
            Interactive PID Flight Controller // Simulation Sandbox
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          Drag in viewport to adjust target altitude
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Console Panel (Left) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-4">
            
            {/* Proportional slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">PROPORTIONAL GAIN (Kp)</span>
                <span className="text-sky-600 font-bold">{kp.toFixed(3)}</span>
              </div>
              <input 
                type="range" 
                min="0.01" 
                max="0.4" 
                step="0.005"
                value={kp}
                onChange={(e) => {
                  setKp(parseFloat(e.target.value));
                  SoundManager.playHover();
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <p className="text-[10px] text-slate-500 font-sans leading-tight">
                Controls thrust force directly matching current altitude error. High values cause oscillations.
              </p>
            </div>

            {/* Derivative slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">DERIVATIVE GAIN (Kd)</span>
                <span className="text-sky-600 font-bold">{kd.toFixed(3)}</span>
              </div>
              <input 
                type="range" 
                min="0.05" 
                max="1.2" 
                step="0.01"
                value={kd}
                onChange={(e) => {
                  setKd(parseFloat(e.target.value));
                  SoundManager.playHover();
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <p className="text-[10px] text-slate-500 font-sans leading-tight">
                Damps vertical velocity. Adds stability friction to prevent persistent overshoot.
              </p>
            </div>

            {/* Turbulence selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-bold">WIND TURBULENCE</span>
                <span className="text-amber-600 font-bold uppercase">{turbulence}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['none', 'low', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => {
                      SoundManager.playClick();
                      setTurbulence(level);
                    }}
                    className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      turbulence === level 
                        ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Diagnostics readout HUD */}
          <div className="bg-slate-900 text-slate-300 border border-slate-800 p-4 rounded-xl text-[10px] leading-relaxed space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">// AUTOPILOT STATUS REPORT</span>
              <span className={isStable ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold animate-pulse'}>
                {isStable ? 'STABLE_HOVER' : 'UNSTABLE_OSCILLATION'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-400">Stability Confidence:</span>
              <span className={stabilityScore > 75 ? 'text-emerald-400 font-bold' : stabilityScore > 40 ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold'}>
                {stabilityScore}%
              </span>
            </div>

            <div className="space-y-1 pt-1.5 border-t border-slate-800 font-sans text-slate-400">
              <div className="flex gap-1.5 items-start">
                <span className="text-sky-400 font-mono font-bold">1.</span>
                <span>Click & drag vertically inside the flight radar to command new target altitude.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Canvas Viewport (Right) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center shadow-md group">
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-sky-400/40 z-20 m-2"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sky-400/40 z-20 m-2"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sky-400/40 z-20 m-2"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-sky-400/40 z-20 m-2"></div>

            <canvas
              ref={canvasRef}
              width={400}
              height={260}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full cursor-crosshair block relative z-10"
            />
          </div>

          {/* Quick flight reset inputs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={resetDrone}
              className="py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-all flex items-center justify-center gap-2 text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCcw size={14} className="text-sky-500" />
              <span>Reset to Ground</span>
            </button>
            
            <button
              onClick={dropDrone}
              className="py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 transition-all flex items-center justify-center gap-2 text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
            >
              <Play size={14} className="rotate-90 text-rose-500" />
              <span>Gravity Test Drop</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
