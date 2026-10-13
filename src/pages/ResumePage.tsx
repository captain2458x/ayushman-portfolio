import React from 'react';
import { Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { profileData } from '../data/profile';
import { educationData } from '../data/education';
import { experienceData } from '../data/experience';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { certificationsData } from '../data/certifications';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

export default function ResumePage() {
  useDocumentTitle('Resume', 'Curriculum Vitae and engineering credentials of Ayushman Srivastava.');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
            CURRICULUM VITAE // CREDENTIALS DOSSIER
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mt-1">
            Technical Resume
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profileData.resumeUrl}
            download="Ayushman_Srivastava_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => SoundManager.playClick()}
            className="px-5 py-2.5 rounded-xl bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Download size={15} />
            <span>Download Official PDF</span>
          </a>

          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl border border-border bg-surface hover:text-primary transition-colors text-text-secondary"
            title="Open PDF directly in browser"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border technical-corner shadow-2xl space-y-10 font-sans text-text-secondary">
        
        {/* Header Block */}
        <div className="border-b border-border pb-8 space-y-3">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight">
            {profileData.name}
          </h2>
          <p className="font-mono text-sm text-primary font-semibold">
            {profileData.profession} · B.Tech {profileData.classYear}
          </p>
          <p className="text-xs text-text-secondary">
            {profileData.institution}, {profileData.location}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs text-text-primary">
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-primary" />
              <span>{profileData.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-primary" />
              <span>{profileData.phone}</span>
            </span>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-primary"
            >
              <Linkedin size={13} className="text-primary" />
              <span>LinkedIn</span>
            </a>
            {profileData.github && (
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-primary"
              >
                <Github size={13} className="text-primary" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border/80 pb-1.5">
            01 // Education
          </h3>
          <div className="space-y-4 font-sans text-xs sm:text-sm">
            {educationData.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-text-primary font-semibold">
                  <span>{edu.degree}</span>
                  <span className="font-mono text-xs text-text-secondary font-normal">{edu.duration}</span>
                </div>
                <div className="text-primary font-mono text-xs">{edu.institution}</div>
                {edu.score && <div className="font-mono text-xs text-text-secondary">{edu.score}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border/80 pb-1.5">
            02 // Experience & Internships
          </h3>
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-text-primary font-semibold text-sm">
                  <span>{exp.role} — <span className="text-primary">{exp.organisation}</span></span>
                  <span className="font-mono text-xs text-text-secondary font-normal">
                    {exp.startDate} – {exp.endDate} · {exp.location}
                  </span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs leading-relaxed">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects Section */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border/80 pb-1.5">
            03 // Selected Engineering Projects
          </h3>
          <div className="space-y-5">
            {projectsData.slice(0, 4).map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-text-primary font-semibold text-sm">
                  <span>{p.title}</span>
                  <span className="font-mono text-xs text-text-secondary font-normal">{p.date}</span>
                </div>
                <p className="text-xs leading-relaxed">{p.shortDescription}</p>
                <div className="font-mono text-[10px] text-text-secondary flex flex-wrap gap-1.5">
                  <span className="text-primary font-semibold">Tools:</span>
                  {p.tools.map((t) => (
                    <span key={t} className="bg-surface-elevated px-1.5 py-0.5 rounded border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border/80 pb-1.5">
            04 // Technical Toolkit
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {skillsData.map((s, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-elevated border border-border space-y-1">
                <strong className="text-text-primary text-[11px] uppercase block">{s.title}</strong>
                <p className="text-[11px] text-text-secondary">{s.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary border-b border-border/80 pb-1.5">
            05 // Certifications
          </h3>
          <ul className="space-y-2 font-mono text-xs">
            {certificationsData.map((c) => (
              <li key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-text-primary">
                  {c.title} — <span className="text-primary">{c.issuer}</span>
                </span>
                <span className="text-text-secondary">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
