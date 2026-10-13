import React, { useState } from 'react';
import { Compass, BookOpen, Clock, Rocket, ArrowRight } from 'lucide-react';
import { researchInterestsData } from '../data/research';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

type ResearchTypeFilter = 'all' | 'Completed Project' | 'Current Learning Activity' | 'Future Research Interest';

export default function ResearchPage() {
  useDocumentTitle('Research & Technical Interests', 'Academic research roadmap and technical interests of Ayushman Srivastava.');

  const [filter, setFilter] = useState<ResearchTypeFilter>('all');

  const filteredTopics = researchInterestsData.filter(
    (item) => filter === 'all' || item.type === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          ACADEMIC INQUIRY // TECHNICAL ROADMAP
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Research & Technical Interests
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Exploration across computational fluid dynamics, flight dynamics control architectures, satellite orbital mechanics, and future high-speed aerodynamic systems.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {(
          [
            { id: 'all', label: 'All Research Areas' },
            { id: 'Completed Project', label: 'Completed Studies' },
            { id: 'Current Learning Activity', label: 'Active Learning' },
            { id: 'Future Research Interest', label: 'Future Horizons' }
          ] as const
        ).map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                SoundManager.playClick();
                setFilter(tab.id);
              }}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                  : 'border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Research Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 technical-corner space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Type Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border font-semibold ${
                    topic.type === 'Completed Project'
                      ? 'border-success/30 bg-success/10 text-success'
                      : topic.type === 'Current Learning Activity'
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-secondary/30 bg-secondary/10 text-secondary'
                  }`}
                >
                  {topic.type}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-text-primary">
                  {topic.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm font-sans leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              {/* Key Focal Areas */}
              <div className="space-y-2 pt-2 border-t border-border font-mono text-xs">
                <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                  Core Scientific Inquiries:
                </span>
                <ul className="space-y-1.5 pl-3 border-l border-primary/20">
                  {topic.keyTopics.map((kt, i) => (
                    <li key={i} className="text-text-secondary text-xs font-sans">
                      {kt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Applicable Tools Footer */}
            <div className="pt-3 border-t border-border flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              <span className="text-text-secondary text-[10px] uppercase tracking-wider mr-1">
                Methods:
              </span>
              {topic.applicableTools.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-primary text-[10px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
