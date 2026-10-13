import React, { useState } from 'react';
import { X, ArrowLeft, Download, Github, CheckCircle2, ChevronDown, ChevronUp, Layers, Calendar, ExternalLink } from 'lucide-react';
import { Project } from '../../../types';
import SoundManager from '../../../utils/audio';

interface SkyboundProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function SkyboundProjectModal({ project, onClose }: SkyboundProjectModalProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#18253F]/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFFDF7] text-[#24364B] rounded-3xl shadow-2xl border-2 border-[#4D91C6]/30 p-6 sm:p-10 font-sans space-y-8">
        
        {/* Top Navigation & Close Actions */}
        <div className="flex items-center justify-between border-b border-[#4D91C6]/20 pb-4">
          <button
            type="button"
            onClick={() => {
              SoundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 font-mono text-xs font-bold text-[#4D91C6] hover:text-[#24364B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>BACK TO JOURNEY</span>
          </button>

          <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#A7D8F5]/30 text-[#24364B] font-semibold uppercase">
            {project.categoryLabel}
          </span>
        </div>

        {/* Header Block */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#4D91C6] text-white font-bold">
              {project.status}
            </span>
            <span className="flex items-center gap-1.5 text-[#24364B]/70">
              <Calendar size={13} className="text-[#4D91C6]" />
              <span>{project.date}</span>
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#24364B] tracking-tight">
            {project.title}
          </h2>

          <p className="text-base sm:text-lg text-[#24364B]/80 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.reportUrl && (
              <a
                href={project.reportUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4D91C6] text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-sm"
              >
                <Download size={14} />
                <span>Download Report (PDF)</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#4D91C6]/30 bg-white text-[#24364B] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#DFF0FA]"
              >
                <Github size={14} />
                <span>View Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Featured Image Viewer */}
        {project.images.length > 0 && (
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-[#24364B] border border-[#4D91C6]/20 shadow-md">
              <img
                src={project.images[activeImageIdx]?.src || project.images[0].src}
                alt={project.images[activeImageIdx]?.alt || project.title}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  if (project.images[0].placeholder) {
                    e.currentTarget.src = project.images[0].placeholder;
                  }
                }}
              />
              <div className="absolute bottom-3 left-3 bg-[#24364B]/85 text-white font-mono text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {project.images[activeImageIdx]?.title || 'Visual Evidence'}
              </div>
            </div>

            {/* Thumbnail selector */}
            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`h-16 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIdx === i ? 'border-[#4D91C6] scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Telemetry Metrics Grid */}
        {project.telemetry && project.telemetry.length > 0 && (
          <div className="p-5 rounded-2xl bg-[#DFF0FA] border border-[#4D91C6]/25 font-mono text-xs space-y-2">
            <span className="text-[10px] text-[#4D91C6] uppercase font-bold tracking-widest block">
              VERIFIED FLIGHT & SIMULATION METRICS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.telemetry.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#4D91C6]/15">
                  <span className="text-[10px] text-[#24364B]/60 uppercase block truncate">{t.label}</span>
                  <strong className="text-sm text-[#4D91C6] block truncate">{t.value}</strong>
                  {t.sub && <span className="text-[9px] text-[#24364B]/50 block">{t.sub}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Objectives & Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#4D91C6]/20 space-y-3">
            <h3 className="font-display font-bold text-lg text-[#24364B]">
              Engineering Objectives
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#24364B]/80">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#4D91C6] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF7] border border-[#4D91C6]/20 space-y-3">
            <h3 className="font-display font-bold text-lg text-[#24364B]">
              Validated Results & Findings
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#24364B]/80">
              {project.results.map((res, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold font-mono">✓</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Collapsible Technical Details Section */}
        <div className="border border-[#4D91C6]/20 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => {
              SoundManager.playClick();
              setShowTechnicalDetails(!showTechnicalDetails);
            }}
            className="w-full flex items-center justify-between p-4 bg-[#DFF0FA]/60 hover:bg-[#DFF0FA] font-mono text-xs font-bold text-[#24364B] transition-colors cursor-pointer"
          >
            <span>{showTechnicalDetails ? 'HIDE TECHNICAL METHODOLOGY & LIMITATIONS' : 'VIEW TECHNICAL DETAILS & METHODOLOGY'}</span>
            {showTechnicalDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showTechnicalDetails && (
            <div className="p-6 bg-white space-y-6 font-sans text-xs sm:text-sm text-[#24364B]/80 border-t border-[#4D91C6]/20 animate-in fade-in">
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-[#4D91C6]">
                  Methodology & Mathematical Formulation:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc">
                  {project.methodology.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-amber-600">
                  Engineering Limitations & Assumptions:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc">
                  {project.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold uppercase text-[#4D91C6]">
                  Future Research & Improvements:
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc">
                  {project.futureWork.map((fw, i) => (
                    <li key={i}>{fw}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Back Button */}
        <div className="pt-4 border-t border-[#4D91C6]/20 flex justify-end">
          <button
            type="button"
            onClick={() => {
              SoundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#4D91C6] text-white font-mono text-xs font-bold tracking-wider uppercase hover:brightness-105 cursor-pointer shadow-md"
          >
            Back to Flight Deck
          </button>
        </div>

      </div>
    </div>
  );
}
