import React from 'react';
import SkillCategoryCard from '../components/cards/SkillCategoryCard';
import { skillsData } from '../data/skills';
import { useDocumentTitle } from '../utils/seo';

export default function SkillsPage() {
  useDocumentTitle('Skills & Tools', 'Technical toolkit and engineering competencies of Ayushman Srivastava.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          ENGINEERING TOOLKIT // SOFTWARE & METHODS
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Technical Skills & Engineering Toolkit
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Software proficiencies, simulation packages, programming languages, and fabrication methods applied across practical academic and internship projects.
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((cat, idx) => (
          <SkillCategoryCard key={idx} category={cat} />
        ))}
      </div>

      {/* Honest Engineering Disclosure */}
      <div className="p-4 rounded-xl bg-surface border border-border text-xs font-mono text-text-secondary">
        <span>NOTE: Tools are listed based on verified hands-on usage in completed engineering models and simulations. Arbitrary proficiency percentage bars are intentionally omitted in favor of genuine case-study demonstrations.</span>
      </div>

    </div>
  );
}
