import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Linkedin, Sparkles, Compass, Cpu, Layers } from 'lucide-react';
import AerospaceHeroCanvas from '../components/3d/AerospaceHeroCanvas';
import ProjectCard from '../components/cards/ProjectCard';
import AerospaceUnitConverter from '../components/widgets/AerospaceUnitConverter';
import AtmosphericExplorer from '../components/widgets/AtmosphericExplorer';
import OrbitVisualizerWidget from '../components/widgets/OrbitVisualizerWidget';
import PidFlightWidget from '../components/widgets/PidFlightWidget';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

export default function HomePage() {
  useDocumentTitle('Home', 'Designing the Future of Flight — Aeronautical Engineering portfolio of Ayushman Srivastava.');

  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        {/* Subtle, non-intrusive background technical grid */}
        <div className="absolute inset-0 aerospace-grid-bg opacity-15 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography and CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Eyebrow & Availability Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                  {profileData.hero.eyebrow}
                </span>

                {profileData.isAvailableForOpportunities && (
                  <span className="font-mono text-[11px] text-text-secondary bg-surface border border-border px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span>{profileData.availabilityLabel}</span>
                  </span>
                )}
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-text-primary tracking-tight leading-[1.08]">
                  {profileData.hero.headline}
                </h1>
                <p className="font-display font-medium text-xl sm:text-2xl text-primary/90">
                  {profileData.hero.secondaryLine}
                </p>
              </div>

              {/* Introduction Copy */}
              <p className="font-sans text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
                {profileData.hero.introduction}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/projects"
                  onClick={() => SoundManager.playClick()}
                  className="px-6 py-3.5 rounded-xl bg-primary text-background font-mono text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <span>Explore Engineering Projects</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={profileData.resumeUrl}
                  download="Ayushman_Srivastava_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => SoundManager.playClick()}
                  className="px-6 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary/50 text-text-primary font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} className="text-primary" />
                  <span>Download Resume</span>
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-elevated hover:text-primary text-text-secondary font-mono text-xs transition-colors flex items-center gap-2"
                  title="Connect on LinkedIn"
                >
                  <Linkedin size={15} />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </div>

              {/* Technical Telemetry Metadata */}
              <div className="pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Discipline</span>
                  <strong className="text-text-primary font-semibold">Aeronautical Eng.</strong>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Core CAE</span>
                  <strong className="text-text-primary font-semibold">ANSYS · Fusion 360</strong>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Computation</span>
                  <strong className="text-text-primary font-semibold">MATLAB · GMAT</strong>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">Academic SGPA</span>
                  <strong className="text-primary font-bold">7.8 / 10.0</strong>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Aerospace 3D Canvas */}
            <div className="lg:col-span-5 relative">
              <AerospaceHeroCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED ENGINEERING PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6 mb-12">
          <div>
            <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase mb-1">
              01 // CORE CONTRIBUTIONS
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
              Featured Engineering Projects
            </h2>
          </div>
          <Link
            to="/projects"
            onClick={() => SoundManager.playClick()}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline font-semibold"
          >
            <span>View All Engineering Projects ({projectsData.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE AEROSPACE SIMULATION WIDGETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
            02 // INTERACTIVE SIMULATION LAB
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
            Engineering Visualisation Widgets
          </h2>
          <p className="text-text-secondary text-sm font-sans">
            Hands-on educational engineering computation tools demonstrating closed-loop dynamics, atmospheric physics, orbital mechanics, and aeronautical conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PidFlightWidget />
          <OrbitVisualizerWidget />
          <AtmosphericExplorer />
          <AerospaceUnitConverter />
        </div>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border relative overflow-hidden technical-corner text-center space-y-6">
          <div className="absolute inset-0 aerospace-grid-bg opacity-10 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              MISSION INQUIRY
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
              Have an Aerospace Project or Opportunity?
            </h2>
            <p className="text-text-secondary text-sm font-sans leading-relaxed">
              Open to technical internships, research collaborations, UAV design challenges, and aerodynamic simulation projects. Let's discuss engineering solutions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                onClick={() => SoundManager.playClick()}
                className="px-6 py-3 rounded-xl bg-primary text-background font-mono text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Initiate Contact
              </Link>
              <Link
                to="/about"
                onClick={() => SoundManager.playClick()}
                className="px-6 py-3 rounded-xl border border-border bg-surface-elevated hover:text-primary text-text-primary font-mono text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Read Engineering Bio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
