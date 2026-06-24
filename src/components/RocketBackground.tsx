import React, { useState, useEffect, useMemo } from 'react';

export default function RocketBackground() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
    
    // Config rootMargin so it triggers when section is comfortably in view
    const observerOptions = {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, observerOptions);

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  // Generate random coordinates/speeds once for performance
  const takeoffStars = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 1.2 + 0.4}s`,
      delay: `${Math.random() * 2}s`,
      height: `${Math.random() * 50 + 20}px`,
      opacity: Math.random() * 0.35 + 0.05
    }));
  }, []);

  const flowLines = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 2.5 + 1.2}s`,
      delay: `${Math.random() * 3}s`,
      width: `${Math.random() * 120 + 40}px`,
      opacity: Math.random() * 0.25 + 0.05
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950 pointer-events-none transition-colors duration-1000">
      
      {/* 1. BASE COORDINATE HUD GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff06_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff06_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
      
      {/* 2. DYNAMIC CORNER CORNER MARKINGS (CAD blueprint style) */}
      <div className="absolute inset-6 border border-cyan-500/[0.03] rounded-lg">
        <div className="absolute top-0 left-0 w-4 h-[1px] bg-cyan-400/20"></div>
        <div className="absolute top-0 left-0 w-[1px] h-4 bg-cyan-400/20"></div>
        <div className="absolute top-0 right-0 w-4 h-[1px] bg-cyan-400/20"></div>
        <div className="absolute top-0 right-0 w-[1px] h-4 bg-cyan-400/20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-cyan-400/20"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-cyan-400/20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-cyan-400/20"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-cyan-400/20"></div>
      </div>

      {/* 3. DYNAMIC AMBIENT NEON GLOW */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-15 transition-all duration-1000 ${
          activeSection === 'hero' ? 'bg-cyan-500 scale-100' :
          activeSection === 'about' ? 'bg-blue-600 scale-90' :
          activeSection === 'experience' ? 'bg-indigo-500 scale-105' :
          activeSection === 'projects' ? 'bg-teal-500 scale-110' :
          activeSection === 'skills' ? 'bg-sky-500 scale-95' :
          'bg-emerald-500 scale-100'
        }`}
      />

      {/* ========================================================
          THEME 1: HERO -> TAKEOFF / LAUNCH SPEED STEAK LINES
          ======================================================== */}
      {activeSection === 'hero' && (
        <div className="absolute inset-0">
          {takeoffStars.map((star, i) => (
            <div
              key={`star-${i}`}
              className="absolute top-[-100px] w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent rounded-full animate-[launch-streak_linear_infinite]"
              style={{
                left: star.left,
                height: star.height,
                opacity: star.opacity,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            />
          ))}
          {/* Engine Boost Fire Glow at Bottom */}
          <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/25 blur-[100px] rounded-full animate-pulse"></div>
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-blue-500/20 blur-[80px] rounded-full animate-pulse"></div>
        </div>
      )}

      {/* ========================================================
          THEME 2: ABOUT -> CAD BLUEPRINT / DRAFTING HUD
          ======================================================== */}
      {activeSection === 'about' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-40 animate-[fade-in_1s_ease-out]">
          {/* Compass grid lines */}
          <div className="w-[500px] h-[500px] border border-cyan-500/10 rounded-full relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
            <div className="absolute w-full h-[1px] bg-cyan-500/10"></div>
            <div className="absolute h-full w-[1px] bg-cyan-500/10"></div>
            <div className="w-[300px] h-[300px] border border-dashed border-cyan-500/10 rounded-full"></div>
            <div className="w-[100px] h-[100px] border border-cyan-500/10 rounded-full"></div>
            {/* Degree ticks */}
            <span className="absolute top-2 font-mono text-[8px] text-cyan-400/50">000°N</span>
            <span className="absolute right-2 font-mono text-[8px] text-cyan-400/50">090°E</span>
            <span className="absolute bottom-2 font-mono text-[8px] text-cyan-400/50">180°S</span>
            <span className="absolute left-2 font-mono text-[8px] text-cyan-400/50">270°W</span>
          </div>
        </div>
      )}

      {/* ========================================================
          THEME 3: EXPERIENCE -> FLIGHT ROUTE / TRAJECTORY PATH
          ======================================================== */}
      {activeSection === 'experience' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-[fade-in_1s_ease-out]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Draw a curved flight route across the screen */}
            <path 
              d="M -100,500 Q 400,200 900,450 T 2000,100" 
              fill="transparent" 
              stroke="rgba(6, 182, 212, 0.15)" 
              strokeWidth="2" 
              strokeDasharray="8,6" 
            />
            {/* Moving route marker (airplane beacon) */}
            <circle r="4" fill="#00e5ff" className="animate-[ping_2s_infinite]">
              <animateMotion 
                path="M -100,500 Q 400,200 900,450 T 2000,100" 
                dur="15s" 
                repeatCount="indefinite" 
              />
            </circle>
            <circle r="2.5" fill="#ffffff">
              <animateMotion 
                path="M -100,500 Q 400,200 900,450 T 2000,100" 
                dur="15s" 
                repeatCount="indefinite" 
              />
            </circle>
          </svg>
        </div>
      )}

      {/* ========================================================
          THEME 4: PROJECTS -> RADAR SWEEPER / SCOPE TELEMETRY
          ======================================================== */}
      {activeSection === 'projects' && (
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] opacity-40 animate-[fade-in_1s_ease-out]">
          {/* Radial radar boundary */}
          <div className="w-full h-full border border-cyan-500/10 rounded-full relative flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px]">
            <div className="absolute inset-10 border border-cyan-500/10 rounded-full"></div>
            <div className="absolute inset-24 border border-dashed border-cyan-500/10 rounded-full"></div>
            <div className="absolute inset-40 border border-cyan-500/5 rounded-full"></div>
            {/* Diagonal axis crosshairs */}
            <div className="absolute w-full h-[1px] bg-cyan-500/10 rotate-45"></div>
            <div className="absolute w-full h-[1px] bg-cyan-500/10 -rotate-45"></div>
            
            {/* 360 Degree Radar Sweep Hand */}
            <div className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2 animate-[spin_6s_linear_infinite]"></div>

            {/* Target nodes pulsing */}
            <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400/80 animate-ping"></div>
            <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-400/90"></div>
            
            <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-emerald-400/80 animate-ping" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-emerald-400/90"></div>
          </div>
        </div>
      )}

      {/* ========================================================
          THEME 5: SKILLS -> WIND TUNNEL FLOW / AERODYNAMIC VECTOR STREAMLINES
          ======================================================== */}
      {activeSection === 'skills' && (
        <div className="absolute inset-0">
          {flowLines.map((line, i) => (
            <div
              key={`flow-${i}`}
              className="absolute left-[-200px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-[flow-streak_linear_infinite]"
              style={{
                top: line.top,
                width: line.width,
                opacity: line.opacity,
                animationDuration: line.duration,
                animationDelay: line.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ========================================================
          THEME 6: CONTACT -> RUNWAY PERSPECTIVE APPROACH LANDING LIGHTS
          ======================================================== */}
      {activeSection === 'contact' && (
        <div className="absolute inset-0 flex justify-center opacity-30 animate-[fade-in_1s_ease-out]">
          {/* Perspective converging runway borders */}
          <svg className="absolute bottom-0 w-[600px] h-[300px] text-cyan-500/20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="10" y1="100" x2="45" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="90" y1="100" x2="55" y2="0" stroke="currentColor" strokeWidth="0.5" />
            
            {/* Dotted runway center line */}
            <line x1="50" y1="100" x2="50" y2="0" stroke="currentColor" strokeWidth="0.75" strokeDasharray="5,10" />

            {/* Alternating landing guide lights */}
            <circle cx="27.5" cy="50" r="1.5" fill="#ff3366" className="animate-pulse" />
            <circle cx="72.5" cy="50" r="1.5" fill="#ff3366" className="animate-pulse" />
            <circle cx="18.5" cy="80" r="2" fill="#00ffcc" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="81.5" cy="80" r="2" fill="#00ffcc" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          </svg>
          {/* Approach lighting pad at the very bottom */}
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
        </div>
      )}

    </div>
  );
}
