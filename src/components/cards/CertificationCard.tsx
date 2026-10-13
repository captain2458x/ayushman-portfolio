import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { CertificationItem } from '../../types';

interface CertificationCardProps {
  certification: CertificationItem;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 relative overflow-hidden technical-corner flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header Icon + Date */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Award size={20} />
          </div>
          <span className="font-mono text-[11px] text-text-secondary bg-surface-elevated px-2.5 py-0.5 rounded border border-border">
            {certification.date}
          </span>
        </div>

        {/* Title & Issuer */}
        <div>
          <h3 className="font-display font-bold text-base text-text-primary leading-snug">
            {certification.title}
          </h3>
          <span className="font-mono text-xs text-primary font-semibold block mt-0.5">
            {certification.issuer}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-xs font-sans leading-relaxed">
          {certification.description}
        </p>
      </div>

      {/* Verification Action */}
      <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-xs">
        {certification.verifyUrl ? (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
          >
            <span>Verify Credential</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-[10px] text-text-secondary italic">
            Certificate verified internally · On file
          </span>
        )}
      </div>
    </div>
  );
}
