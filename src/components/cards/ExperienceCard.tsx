import React from 'react';
import { Calendar, MapPin, Compass } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface ExperienceCardProps {
  key?: React.Key;
  experience: ExperienceItem;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 relative overflow-hidden technical-corner space-y-5">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <span className="font-mono text-xs font-bold text-primary tracking-wider uppercase block">
            {experience.role}
          </span>
          <h3 className="font-display font-bold text-xl text-text-primary mt-0.5">
            {experience.organisation}
            {experience.programme && (
              <span className="text-text-secondary font-normal text-sm ml-2 font-mono">
                ({experience.programme})
              </span>
            )}
          </h3>
        </div>

        <div className="font-mono text-xs text-text-secondary flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 bg-surface-elevated px-2.5 py-1 rounded border border-border">
            <Calendar size={13} className="text-primary" />
            <span>{experience.startDate} – {experience.endDate}</span>
          </span>
          <span className="flex items-center gap-1.5 bg-surface-elevated px-2.5 py-1 rounded border border-border">
            <MapPin size={13} className="text-primary" />
            <span>{experience.location}</span>
          </span>
        </div>
      </div>

      {/* Verified Context Badge */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-primary/90 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
        <Compass size={14} className="shrink-0" />
        <span>{experience.verifiedContext}</span>
      </div>

      {/* Description Bullets */}
      <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
        {experience.description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="text-primary font-mono text-sm leading-none mt-0.5 select-none">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Tool Tags */}
      <div className="pt-3 border-t border-border flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className="text-text-secondary text-[10px] uppercase tracking-wider mr-1">
          Technical Stack:
        </span>
        {experience.tools.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 rounded-md bg-surface-elevated border border-border text-text-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
