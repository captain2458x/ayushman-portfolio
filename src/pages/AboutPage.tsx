import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, GraduationCap, Award, Wrench, FileText, ArrowRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { educationData } from '../data/education';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

export default function AboutPage() {
  useDocumentTitle('About', 'Engineering Curiosity into Capability — Aeronautical engineering background of Ayushman Srivastava.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* 1. EDITORIAL HEADER & TWO-COLUMN OVERVIEW */}
      <section className="space-y-8">
        <div className="border-b border-border pb-6">
          <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block mb-1">
            ABOUT // PROFILE & PHILOSOPHY
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
            {profileData.about.headline}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-6 text-text-secondary font-sans text-base sm:text-lg leading-relaxed">
            {profileData.about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            <div className="pt-4 space-y-3 font-mono text-xs">
              <h3 className="text-text-primary font-bold uppercase tracking-wider text-xs">
                Technical Focus Disciplines:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profileData.careerInterests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-surface border border-border text-text-primary"
                  >
                    <span className="text-primary">▹</span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                onClick={() => SoundManager.playClick()}
                className="px-5 py-3 rounded-xl bg-primary text-background font-mono text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>View Engineering Work</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/resume"
                onClick={() => SoundManager.playClick()}
                className="px-5 py-3 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-text-primary font-mono text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <FileText size={14} className="text-primary" />
                <span>Examine Technical Resume</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Blueprint Aerospace Silhouette Visual & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-surface border border-border technical-corner relative overflow-hidden shadow-xl space-y-6">
              <div className="absolute inset-0 aerospace-grid-subtle opacity-15 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                  BLUEPRINT // VEHICLE SCHEMATICS
                </span>
                <span className="font-mono text-[10px] text-text-secondary">
                  SCALE: 1:24
                </span>
              </div>

              {/* Blueprint Graphic */}
              <div className="relative h-56 rounded-xl bg-surface-elevated/80 border border-border/80 flex items-center justify-center p-4 overflow-hidden">
                <svg viewBox="0 0 200 120" className="w-full h-full text-primary/70 stroke-current fill-none stroke-[1.2]">
                  {/* Fuselage center line */}
                  <line x1="10" y1="60" x2="190" y2="60" strokeDasharray="3 3" opacity="0.4" />
                  {/* Delta Wing Planform */}
                  <polygon points="175,60 125,25 60,10 65,60 60,110 125,95" fill="currentColor" fillOpacity="0.05" />
                  {/* Canopy / Nose */}
                  <path d="M175,60 Q160,52 140,52 Q120,52 110,60 Q120,68 140,68 Q160,68 175,60" />
                  {/* Twin vertical tails */}
                  <line x1="60" y1="35" x2="45" y2="20" />
                  <line x1="60" y1="85" x2="45" y2="100" />
                  {/* Coordinate dimension markers */}
                  <circle cx="100" cy="60" r="2" fill="currentColor" />
                  <circle cx="100" cy="60" r="14" strokeDasharray="2 2" opacity="0.3" />
                </svg>

                <div className="absolute bottom-2 left-3 font-mono text-[9px] text-text-secondary">
                  CAD ID: AS-AERO-2027
                </div>
              </div>

              {/* Verified Profile Stats */}
              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-3 rounded-xl bg-surface-elevated border border-border">
                  <span className="text-2xl font-bold text-primary block">7.8</span>
                  <span className="text-[10px] text-text-secondary uppercase">B.Tech CGPA / SGPA</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-elevated border border-border">
                  <span className="text-2xl font-bold text-text-primary block">2027</span>
                  <span className="text-[10px] text-text-secondary uppercase">Graduation Class</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-elevated border border-border">
                  <span className="text-2xl font-bold text-text-primary block">2</span>
                  <span className="text-[10px] text-text-secondary uppercase">Verified Internships</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-elevated border border-border">
                  <span className="text-2xl font-bold text-text-primary block">6</span>
                  <span className="text-[10px] text-text-secondary uppercase">Certifications</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. ACADEMIC EDUCATION TIMELINE */}
      <section className="space-y-8 pt-8 border-t border-border">
        <div className="space-y-1">
          <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
            EDUCATION // ACCREDITATION
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            Academic Background
          </h2>
        </div>

        <div className="space-y-6">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-colors technical-corner space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary">
                    {edu.degree}
                  </h3>
                  <div className="font-mono text-xs text-primary font-semibold mt-0.5">
                    {edu.institution}
                  </div>
                </div>
                <div className="font-mono text-xs text-text-secondary flex items-center gap-3">
                  <span className="bg-surface-elevated px-2.5 py-1 rounded border border-border">
                    {edu.duration}
                  </span>
                  {edu.score && (
                    <span className="bg-primary/10 text-primary font-bold px-2.5 py-1 rounded border border-primary/20">
                      {edu.score}
                    </span>
                  )}
                </div>
              </div>

              {edu.coursework && (
                <div className="space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider block">
                    Key Aeronautical Coursework:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-text-secondary text-[11px]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.highlights && (
                <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-text-secondary">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-primary font-mono select-none">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
