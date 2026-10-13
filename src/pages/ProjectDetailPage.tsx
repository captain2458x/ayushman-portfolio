import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Github, ExternalLink, Calendar, CheckCircle2, AlertTriangle, Layers, Maximize2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LightboxModal from '../components/widgets/LightboxModal';
import { projectsData } from '../data/projects';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectIndex !== -1 ? projectsData[projectIndex] : null;

  useDocumentTitle(
    project ? project.title : 'Project Details',
    project ? project.shortDescription : 'Aerospace engineering case study.'
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  const openLightbox = (idx: number) => {
    SoundManager.playClick();
    setCurrentImageIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* 1. BREADCRUMB & BACK NAV */}
      <div className="flex items-center justify-between font-mono text-xs text-text-secondary border-b border-border pb-4">
        <Link
          to="/projects"
          onClick={() => SoundManager.playClick()}
          className="inline-flex items-center gap-2 hover:text-primary transition-colors font-semibold"
        >
          <ArrowLeft size={14} />
          <span>BACK TO ALL PROJECTS</span>
        </Link>
        <span className="bg-surface-elevated px-2.5 py-0.5 rounded border border-border uppercase">
          {project.categoryLabel}
        </span>
      </div>

      {/* 2. HEADER BANNER */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-md border border-primary/20">
            {project.status}
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <Calendar size={13} className="text-primary" />
            <span>{project.date}</span>
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="font-sans text-text-secondary text-base sm:text-lg leading-relaxed">
          {project.detailedOverview}
        </p>

        {/* Action buttons (Report / Github) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.reportUrl && (
            <a
              href={project.reportUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => SoundManager.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              <span>Download Technical Report (PDF)</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => SoundManager.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface hover:text-primary text-text-primary font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Github size={14} />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* 3. TELEMETRY STRIP (IF APPLICABLE) */}
      {project.telemetry && project.telemetry.length > 0 && (
        <div className="p-6 rounded-2xl bg-surface border border-border technical-corner font-mono space-y-4">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest block">
            VERIFIED TELEMETRY & BOUNDARY CONDITIONS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.telemetry.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-elevated border border-border">
                <span className="text-[10px] text-text-secondary uppercase block mb-1">
                  {t.label}
                </span>
                <span className="text-lg font-bold text-primary block">
                  {t.value}
                </span>
                {t.sub && (
                  <span className="text-[10px] text-text-secondary block mt-0.5 opacity-80">
                    {t.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PRIMARY IMAGE HERO & LIGHTBOX TRIGGER */}
      {project.images.length > 0 && (
        <div className="space-y-3">
          <div
            onClick={() => openLightbox(0)}
            className="group relative h-[380px] sm:h-[480px] rounded-2xl bg-surface border border-border overflow-hidden cursor-pointer technical-corner shadow-2xl"
          >
            <img
              src={project.images[0].src}
              alt={project.images[0].alt}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (project.images[0].placeholder) {
                  e.currentTarget.src = project.images[0].placeholder;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-text-primary">
              <span className="bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border font-semibold">
                {project.images[0].title}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-1.5 rounded-lg border border-primary/30 font-semibold">
                <Maximize2 size={13} />
                <span>Click to expand high-res</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. CORE METHODOLOGY & OBJECTIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Objectives */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner space-y-4">
          <h2 className="font-display font-bold text-xl text-text-primary">
            Engineering Objectives
          </h2>
          <ul className="space-y-3 font-sans text-sm text-text-secondary leading-relaxed">
            {project.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner space-y-4">
          <h2 className="font-display font-bold text-xl text-text-primary">
            Technical Methodology & Formulation
          </h2>
          <ul className="space-y-3 font-sans text-sm text-text-secondary leading-relaxed">
            {project.methodology.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-primary font-mono select-none">▸</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 6. NUMERICAL SIMULATION CHART (IF AVAILABLE) */}
      {project.chartData && project.chartData.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <h2 className="font-display font-bold text-lg text-text-primary">
              {project.chartTitle || 'Numerical Solver Convergence'}
            </h2>
            <span className="font-mono text-[10px] text-text-secondary uppercase">
              {project.isIllustrativeData ? 'Illustrative Numerical Benchmark' : 'Fluent / Simulink Solver Monitor'}
            </span>
          </div>

          <div className="h-64 sm:h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={project.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis 
                  dataKey={project.chartData[0].iteration !== undefined ? 'iteration' : 'time'} 
                  stroke="#94A3B8" 
                  fontSize={11}
                  fontFamily="IBM Plex Mono"
                />
                <YAxis stroke="#94A3B8" fontSize={11} fontFamily="IBM Plex Mono" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0D1B2A', 
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: '11px',
                    color: '#F8FAFC'
                  }} 
                />
                <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '11px' }} />
                {project.chartData[0].lift !== undefined && (
                  <Line type="monotone" dataKey="lift" stroke="#38BDF8" strokeWidth={2} name="Lift Coefficient (Cl)" />
                )}
                {project.chartData[0].drag !== undefined && (
                  <Line type="monotone" dataKey="drag" stroke="#FBBF24" strokeWidth={2} name="Drag Coefficient (Cd)" />
                )}
                {project.chartData[0].altitude !== undefined && (
                  <Line type="monotone" dataKey="altitude" stroke="#38BDF8" strokeWidth={2} name="Current Altitude (m)" />
                )}
                {project.chartData[0].target !== undefined && (
                  <Line type="step" dataKey="target" stroke="#34D399" strokeWidth={1.5} strokeDasharray="4 4" name="Target Command (m)" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 7. VERIFIED RESULTS & LIMITATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Results */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner space-y-4">
          <h2 className="font-display font-bold text-xl text-text-primary">
            Key Results & Conclusions
          </h2>
          <ul className="space-y-3 font-sans text-sm text-text-secondary leading-relaxed">
            {project.results.map((res, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-success font-mono font-bold select-none">✓</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations & Future Work */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner space-y-4">
          <h2 className="font-display font-bold text-xl text-text-primary">
            Model Limitations & Future Iterations
          </h2>
          <div className="space-y-4 font-sans text-sm text-text-secondary leading-relaxed">
            <div>
              <strong className="text-warning font-mono text-xs uppercase block mb-1">
                Limitations:
              </strong>
              <ul className="space-y-1.5 pl-4 list-disc text-xs">
                {project.limitations.map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-primary font-mono text-xs uppercase block mb-1">
                Future Improvements:
              </strong>
              <ul className="space-y-1.5 pl-4 list-disc text-xs">
                {project.futureWork.map((fw, i) => (
                  <li key={i}>{fw}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* 8. COMPLETE IMAGE GALLERY (WITH LIGHTBOX) */}
      {project.images.length > 1 && (
        <div className="space-y-6 pt-4 border-t border-border">
          <div className="space-y-1">
            <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
              GALLERY // TECHNICAL DRAWINGS & CFD PLOTS
            </span>
            <h2 className="font-display font-bold text-2xl text-text-primary">
              Engineering Evidence Dossier
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group p-3 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all cursor-pointer technical-corner shadow-md flex flex-col justify-between"
              >
                <div className="h-48 rounded-xl overflow-hidden bg-surface-elevated mb-3 relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      if (img.placeholder) {
                        e.currentTarget.src = img.placeholder;
                      }
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-lg border border-border text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </div>
                </div>

                <div className="space-y-1 font-mono">
                  <h4 className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    {img.title}
                  </h4>
                  {img.caption && (
                    <p className="text-[11px] text-text-secondary font-sans line-clamp-2">
                      {img.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. ENGINEERING / MEDICAL DISCLAIMER (IF PRESENT) */}
      {project.disclaimer && (
        <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border text-xs font-sans text-text-secondary flex items-start gap-3">
          <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Engineering Disclaimer:</strong> {project.disclaimer}
          </p>
        </div>
      )}

      {/* 10. PREVIOUS / NEXT PROJECT NAVIGATION */}
      <div className="pt-8 border-t border-border flex items-center justify-between font-mono text-xs">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            onClick={() => SoundManager.playClick()}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">PREVIOUS:</span>
            <span className="font-bold text-text-primary">{prevProject.title.slice(0, 24)}...</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => SoundManager.playClick()}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-right"
          >
            <span className="hidden sm:inline">NEXT:</span>
            <span className="font-bold text-text-primary">{nextProject.title.slice(0, 24)}...</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* LIGHTBOX MODAL COMPONENT */}
      <LightboxModal
        images={project.images}
        currentIndex={currentImageIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))}
        onNext={() => setCurrentImageIdx((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))}
      />

    </div>
  );
}
