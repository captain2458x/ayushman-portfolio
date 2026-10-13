import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { SkillCategory } from '../../types';
import SoundManager from '../../utils/audio';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export default function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 relative overflow-hidden technical-corner flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        {/* Category Header */}
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg text-text-primary">
            {category.title}
          </h3>
          <p className="text-text-secondary text-xs font-sans leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Skill Tags */}
        <div className="space-y-2">
          {category.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated/70 border border-border font-mono text-xs text-text-primary"
            >
              <CheckCircle2 size={13} className="text-primary shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Applied In Projects Links */}
      {category.exampleProjects && category.exampleProjects.length > 0 && (
        <div className="pt-3 border-t border-border space-y-1.5 font-mono text-[11px]">
          <span className="text-text-secondary text-[10px] uppercase tracking-wider block">
            Applied In Projects:
          </span>
          <div className="flex flex-wrap gap-2">
            {category.exampleProjects.map((proj) => (
              <Link
                key={proj.slug}
                to={`/projects/${proj.slug}`}
                onClick={() => SoundManager.playClick()}
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <span>{proj.title}</span>
                <ArrowRight size={10} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
