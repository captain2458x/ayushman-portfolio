import React from 'react';
import ExperienceCard from '../components/cards/ExperienceCard';
import { experienceData } from '../data/experience';
import { useDocumentTitle } from '../utils/seo';

export default function ExperiencePage() {
  useDocumentTitle('Experience', 'Aerospace and engineering internships of Ayushman Srivastava.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          CAREER TRACK // PRACTICAL INTERNSHIPS
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Professional Experience
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Engineering internships and technical prototyping programs focusing on rapid fabrication, spacecraft orbital mechanics in NASA GMAT, and avionics telemetry.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-8">
        {experienceData.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>

      {/* Verification Notice */}
      <div className="p-4 rounded-xl bg-surface border border-border text-xs font-mono text-text-secondary">
        <span>NOTE: All internship dates, institutions, and software competencies are verified from institutional certificates and offer letters.</span>
      </div>

    </div>
  );
}
