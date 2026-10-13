import React from 'react';

export default function SkyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Soft atmospheric gradient meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-100/60 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-80" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-2/3 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-sky-100/40 via-cyan-50/30 to-transparent rounded-full blur-3xl" />

      {/* Aerodynamic wind streamlines (subtle SVG lines) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-35" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="streamline-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="streamline-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path 
          d="M -100 220 C 300 180, 800 260, 1600 200" 
          fill="none" 
          stroke="url(#streamline-grad-1)" 
          strokeWidth="1.5" 
          strokeDasharray="8 12"
        />
        <path 
          d="M -100 240 C 350 200, 750 280, 1600 220" 
          fill="none" 
          stroke="url(#streamline-grad-1)" 
          strokeWidth="1" 
        />
        <path 
          d="M -50 480 C 400 440, 900 520, 1700 460" 
          fill="none" 
          stroke="url(#streamline-grad-2)" 
          strokeWidth="1" 
          strokeDasharray="6 14"
        />
        <path 
          d="M -100 850 C 450 780, 950 890, 1800 820" 
          fill="none" 
          stroke="url(#streamline-grad-1)" 
          strokeWidth="1.2" 
        />
      </svg>

      {/* Subtle floating glider silhouette in distant sky */}
      <div 
        className="absolute top-24 right-12 md:right-32 text-sky-400/20"
        style={{
          animation: 'gentle-float 6s ease-in-out infinite'
        }}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>
    </div>
  );
}
