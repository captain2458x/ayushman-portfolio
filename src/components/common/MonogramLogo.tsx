import React from 'react';
import { Link } from 'react-router-dom';
import SoundManager from '../../utils/audio';

interface MonogramLogoProps {
  compact?: boolean;
}

export default function MonogramLogo({ compact = false }: MonogramLogoProps) {
  return (
    <Link 
      to="/" 
      onClick={() => SoundManager.playClick()}
      className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
    >
      {/* Aerospace Monogram Delta Badge */}
      <div className="relative w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]">
        <svg 
          viewBox="0 0 32 32" 
          className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Stylized Delta Wing Interceptor + 'A' profile */}
          <path d="M16 4 L26 25 L16 20 L6 25 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M16 4 L26 25 L16 20 L6 25 Z" />
          <circle cx="16" cy="15" r="1.5" fill="currentColor" />
          <line x1="11" y1="21" x2="21" y2="21" />
        </svg>
        <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </div>

      {!compact && (
        <div className="flex flex-col text-left">
          <span className="font-display font-bold tracking-tight text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">
            AYUSHMAN SRIVASTAVA
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary">
            Aeronautical Eng.
          </span>
        </div>
      )}
    </Link>
  );
}
