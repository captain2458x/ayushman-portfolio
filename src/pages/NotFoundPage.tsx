import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

export default function NotFoundPage() {
  useDocumentTitle('404 Not Found', 'Requested trajectory waypoint not found.');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 relative">
      <div className="absolute inset-0 aerospace-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6 p-8 rounded-3xl bg-surface border border-border technical-corner shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-warning/10 border border-warning/30 flex items-center justify-center mx-auto text-warning">
          <Compass size={32} className="animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="space-y-2 font-mono">
          <span className="text-xs text-warning uppercase font-bold tracking-widest block">
            ERROR: 404 // TRAJECTORY_DEVIATION
          </span>
          <h1 className="font-display font-extrabold text-3xl text-text-primary">
            Waypoint Not Found
          </h1>
          <p className="text-xs text-text-secondary font-sans leading-relaxed">
            The requested aerospace route or document parameter is not mapped in current orbital coordinates.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            onClick={() => SoundManager.playClick()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Home size={14} />
            <span>Return to Base</span>
          </Link>
          <Link
            to="/projects"
            onClick={() => SoundManager.playClick()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border bg-surface-elevated text-text-primary font-mono text-xs font-semibold uppercase tracking-wider hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} />
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
