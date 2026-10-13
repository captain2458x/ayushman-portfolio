import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { Project } from '../../types';
import SoundManager from '../../utils/audio';

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryImage = project.images[0];

  return (
    <div className="group rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden relative shadow-lg hover:shadow-2xl hover:-translate-y-1 technical-corner">
      {/* Top Image Preview */}
      <div className="relative h-52 sm:h-56 w-full bg-surface-elevated overflow-hidden border-b border-border">
        {primaryImage ? (
          <img
            src={primaryImage.src}
            alt={primaryImage.alt}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              if (primaryImage.placeholder) {
                e.currentTarget.src = primaryImage.placeholder;
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center aerospace-grid-bg text-text-secondary font-mono text-xs">
            CAD_DRAWING_AVAILABLE
          </div>
        )}

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="font-mono text-[10px] tracking-wider uppercase bg-background/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-primary font-semibold">
            {project.categoryLabel}
          </span>
          <span className="font-mono text-[10px] tracking-wider uppercase bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded border border-border text-text-secondary">
            {project.status}
          </span>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="font-mono text-[11px] text-text-secondary">
            {project.date}
          </div>

          <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-primary transition-colors leading-snug">
            <Link
              to={`/projects/${project.slug}`}
              onClick={() => SoundManager.playClick()}
              className="focus:outline-none focus-visible:underline"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-text-secondary text-xs font-sans leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Telemetry Snapshot (if available) */}
        {project.telemetry && project.telemetry.length > 0 && (
          <div className="pt-2 border-t border-border grid grid-cols-2 gap-2 font-mono text-[10px]">
            {project.telemetry.slice(0, 2).map((item, i) => (
              <div key={i} className="bg-surface-elevated/70 px-2 py-1 rounded border border-border">
                <span className="text-text-secondary block text-[9px] truncate">{item.label}</span>
                <strong className="text-primary truncate block">{item.value}</strong>
              </div>
            ))}
          </div>
        )}

        {/* Tools and Action */}
        <div className="pt-3 border-t border-border flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-secondary"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-text-secondary">
                +{project.tools.length - 4}
              </span>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            onClick={() => SoundManager.playClick()}
            className="flex items-center justify-between font-mono text-xs text-primary font-semibold group-hover:text-primary transition-colors pt-1"
          >
            <span>View Technical Case Study</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
