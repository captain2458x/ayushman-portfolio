import React from 'react';
import { motion } from 'motion/react';

interface AirplaneTransitionProps {
  isActive: boolean;
}

export default function AirplaneTransition({ isActive }: AirplaneTransitionProps) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Wipe Banner overlay */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ 
          x: ['-100%', '0%', '100%']
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
          times: [0, 0.45, 1]
        }}
        className="absolute inset-0 bg-slate-950 border-r-4 border-cyan-400/80 shadow-[20px_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center pointer-events-auto"
      >
        {/* Supersonic vapor cone / speed streaks behind the plane */}
        <div className="absolute inset-y-0 left-0 right-10 bg-gradient-to-r from-transparent via-cyan-950/20 to-cyan-500/10 pointer-events-none"></div>
        
        {/* Sleek Jet Silhouette at the leading edge */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center text-cyan-400 select-none pointer-events-none"
          initial={{ rotate: 90, scale: 0.8 }}
          animate={{
            scale: [0.8, 1.2, 1.2, 0.8],
          }}
          transition={{
            duration: 1.6,
            ease: 'easeInOut'
          }}
        >
          {/* Jet fighter SVG Icon */}
          <svg viewBox="0 0 24 24" className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_#00e5ff] rotate-90">
            <path fill="currentColor" d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
          </svg>
          
          {/* Sonic boom condensation cloud (glow rings) */}
          <div className="absolute -left-8 w-16 h-16 border border-cyan-400/30 rounded-full animate-ping opacity-60"></div>
          <div className="absolute -left-12 w-24 h-24 border border-cyan-500/10 rounded-full animate-ping opacity-30"></div>
        </motion.div>

        {/* Center Cockpit HUD warning message while transitioning */}
        <div className="font-mono text-center select-none pointer-events-none">
          <h2 className="text-cyan-400 text-lg font-bold tracking-[0.3em] uppercase animate-pulse">
            SUPERSONIC FLYBY // TRANSIENT_RELOAD
          </h2>
          <p className="text-slate-500 text-xs mt-1.5 tracking-wider font-semibold">
            HANGAR DECK DEPLOYING...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
