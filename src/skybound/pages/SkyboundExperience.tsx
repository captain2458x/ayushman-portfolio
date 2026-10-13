import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Compass, MapPin, Calendar, ExternalLink, 
  Send, Download, CheckCircle, Github, Linkedin, Mail, FileText, 
  Layers, ArrowRight, ChevronRight, ChevronLeft, Wind, ShieldCheck, 
  Award, Cpu, Orbit, Sparkles, Volume2, VolumeX, Clapperboard
} from 'lucide-react';
import CinematicMovieStage from '../components/cinema/CinematicMovieStage';
import CinematicOpening from '../components/cinematic/CinematicOpening';
import SkyboundProjectModal from '../components/modals/SkyboundProjectModal';
import { projectsData } from '../../data/projects';
import { experienceData } from '../../data/experience';
import { certificationsData } from '../../data/certifications';
import { Project } from '../../types';
import SoundManager from '../../utils/audio';

interface SkyboundExperienceProps {
  onSwitchMode?: () => void;
}

interface CommonScene {
  id: number;
  label: string;
  sectionTitle: string;
  subtitle: string;
  route: string;
}

// 6 Core Requested Headings: About Me, Experience, Projects, Skills, Certifications, Contact & Resume
const COMMON_SCENES: CommonScene[] = [
  { 
    id: 1, 
    label: 'About Me', 
    sectionTitle: 'ABOUT ME', 
    subtitle: 'B.Tech Aeronautical Engineering (2023–2027) • FGIET Rae Bareli, AKTU',
    route: '/about'
  },
  { 
    id: 2, 
    label: 'Experience', 
    sectionTitle: 'EXPERIENCE', 
    subtitle: 'Aerospace Engineering Internships & Industry Fellowships (STAR Surat & MakeX)',
    route: '/experience'
  },
  { 
    id: 3, 
    label: 'Projects', 
    sectionTitle: 'PROJECTS', 
    subtitle: 'Computational CFD, SolidWorks CAD Assemblies, CubeSat Orbits & Telemetry',
    route: '/projects'
  },
  { 
    id: 4, 
    label: 'Skills', 
    sectionTitle: 'SKILLS', 
    subtitle: 'Aerodynamics, CAD/CAM, Space Flight Mechanics & Programming Solvers',
    route: '/skills'
  },
  { 
    id: 5, 
    label: 'Certifications', 
    sectionTitle: 'CERTIFICATIONS', 
    subtitle: 'Verified ISRO/IIRS Remote Sensing, NPTEL Drones, AutoCAD & Rocketry Credentials',
    route: '/certifications'
  },
  { 
    id: 6, 
    label: 'Contact & Resume', 
    sectionTitle: 'CONTACT & RESUME', 
    subtitle: 'Direct Frequency Transmission, Verified Resume Download & Career Profiles',
    route: '/contact'
  }
];

export default function SkyboundExperience({ onSwitchMode }: SkyboundExperienceProps) {
  const [showFilmIntro, setShowFilmIntro] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMuted, setIsMuted] = useState(SoundManager.getMuted());
  
  // Interactive Orbit Controls for Scene 4
  const [altitudeKm, setAltitudeKm] = useState<number>(500);
  const [inclinationDeg, setInclinationDeg] = useState<number>(51.6);

  // Contact Form State for Scene 6
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Physics calculations for Scene 4
  const mu = 398600.4418;
  const rEarth = 6378.137;
  const rOrbit = rEarth + altitudeKm;
  const vOrbitKmS = Math.sqrt(mu / rOrbit);
  const periodMin = (2 * Math.PI * Math.sqrt(Math.pow(rOrbit, 3) / mu)) / 60;
  const orbitsPerDay = (1440 / periodMin).toFixed(1);

  // Projects shortcuts
  const propellerProject = projectsData.find(p => p.slug === 'uav-propeller-cfd') || projectsData[0];
  const cadProject = projectsData.find(p => p.slug === 'aerospace-cad-modelling') || projectsData[1];
  const orbitProject = projectsData.find(p => p.slug === 'satellite-orbital-simulation') || projectsData[2];

  // Track scroll position across the 6 sections with requestAnimationFrame throttling for butter-smooth 60/120fps UI
  useEffect(() => {
    let ticking = false;
    let cachedMaxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight || 1) - window.innerHeight);

    const updateMax = () => {
      cachedMaxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight || 1) - window.innerHeight);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const progress = Math.min(5.0, Math.max(0.0, (scrollY / cachedMaxScroll) * 5.0)); // 0.0 to 5.0
          setScrollProgress(progress);

          // Only trigger state updates when active section actually changes (eliminates unnecessary React re-renders)
          const sceneNum = Math.min(6, Math.max(1, Math.round(progress) + 1));
          setCurrentScene((prev) => (prev !== sceneNum ? sceneNum : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    updateMax();
    handleScroll(); // Initial sync
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => { updateMax(); handleScroll(); }, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Snappy 400ms high-performance custom smooth scroll (fast start, soft landing, zero lag)
  const scrollToScene = (sceneNum: number) => {
    SoundManager.playClick();
    const targetEl = document.getElementById(`scene-${sceneNum}`);
    if (targetEl) {
      const navOffset = 52;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const targetY = Math.max(0, elementPosition + (window.scrollY || window.pageYOffset || 0) - navOffset);
      const startY = window.scrollY || window.pageYOffset || 0;
      const diff = targetY - startY;

      if (Math.abs(diff) < 2) return;

      const duration = 400; // 400ms snappy transition
      const startTime = performance.now();
      const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        window.scrollTo(0, startY + diff * easeOutCubic(progress));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentScene < 6) scrollToScene(currentScene + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentScene > 1) scrollToScene(currentScene - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  // Audio Toggle
  const handleToggleSound = () => {
    const muted = SoundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      SoundManager.playSuccess();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in your name, email, and message.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
    SoundManager.playSuccess();
  };

  const activeSceneInfo = COMMON_SCENES[currentScene - 1];

  return (
    <div className="relative min-h-screen bg-[#040711] text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      
      {/* 6-Shot Hollywood Opening Sequence Overlay (Triggered by user or replay) */}
      {showFilmIntro && (
        <CinematicOpening onComplete={() => setShowFilmIntro(false)} />
      )}

      {/* 1. Full-Screen 3D Continuous Flight Stage (Fixed background canvas) */}
      <CinematicMovieStage scrollProgress={scrollProgress} />

      {/* ========================================================================= */}
      {/* TOP BAR: FIXED CLEAN COMPACT HEADER                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-3 sm:px-6 py-2 bg-[#020617]/85 backdrop-blur-md border-b border-slate-800/80 shadow-md">
        
        {/* Left: Branding & Role */}
        <div 
          onClick={() => scrollToScene(1)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform">
            <Plane size={14} className="-rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs sm:text-sm tracking-wider text-white">
                AYUSHMAN SRIVASTAVA
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                CLASS 2027
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 tracking-wider block">
              B.TECH AERONAUTICAL ENGINEERING • FGIET RAE BARELI
            </span>
          </div>
        </div>

        {/* Center: Common Section Indicator with Direct Link to Details Page */}
        <Link 
          to={activeSceneInfo.route}
          onClick={() => SoundManager.playClick()}
          className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-slate-400 bg-slate-900/90 hover:bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60 shadow backdrop-blur-md transition-all group cursor-pointer"
          title={`Open ${activeSceneInfo.label} details page`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold">SEC {currentScene}/06:</span>
          <span className="text-sky-300 font-semibold">{activeSceneInfo.label}</span>
          <span className="text-slate-500 group-hover:text-sky-300 text-[9px] flex items-center gap-0.5 ml-0.5">
            <span>(DETAILS)</span>
            <ExternalLink size={9} />
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Watch Intro */}
          <button
            type="button"
            onClick={() => {
              SoundManager.playClick();
              setShowFilmIntro(true);
            }}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[10px] font-semibold transition-all cursor-pointer shadow"
            title="Watch the 6-shot cinematic opening sequence"
          >
            <Clapperboard size={11} className="text-amber-400" />
            <span>INTRO</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-sky-400" />}
          </button>

          {/* Resume PDF */}
          <a
            href="/resume/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundManager.playClick()}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-[11px] font-bold shadow transition-all"
          >
            <Download size={11} />
            <span>RESUME</span>
          </a>

          {/* Switch to Conventional Technical Portfolio */}
          {onSwitchMode && (
            <button
              type="button"
              onClick={onSwitchMode}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-[11px] font-semibold transition-all cursor-pointer"
              title="Switch to conventional document portfolio overview"
            >
              <span>TECH LAB</span>
              <ArrowRight size={10} className="text-sky-400" />
            </button>
          )}

        </div>

      </header>

      {/* ========================================================================= */}
      {/* CONTINUOUS SCROLL TRACK: 6 SCENES THAT FLY THE AIRPLANE ON SCROLL         */}
      {/* ========================================================================= */}
      <main className="relative z-20 pt-14 pb-20">

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 01: ABOUT ME (COMMON HEADING)                                     */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-1" 
          className="min-h-screen flex items-center justify-start px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5 animate-in fade-in duration-300 ml-0 mr-auto lg:ml-6">
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800/50 inline-block">
                  SECTION 01 // ABOUT ME
                </span>
                <Link
                  to="/about"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  title="Open full detailed About Me page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link 
                to="/about"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h1 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-sky-300 transition-colors tracking-tight leading-tight">
                  AYUSHMAN SRIVASTAVA
                </h1>
              </Link>

              <p className="font-sans text-xs font-semibold text-sky-300">
                B.Tech Aeronautical Engineering Student (2023–2027)
              </p>

              <p className="font-sans text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin size={11} className="text-sky-400 flex-shrink-0" />
                <span>FGIET Rae Bareli, AKTU</span>
              </p>
            </div>

            <p className="font-sans text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Aeronautical engineering undergraduate passionate about computational aerodynamics, parametric CAD assembly design, and satellite orbital trajectory analysis. Scroll down to fly with my aircraft through my engineering journey.
            </p>

            {/* Quick 3-card summary */}
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <span className="font-mono text-[8px] text-slate-400 uppercase block">STATUS</span>
                <strong className="font-display text-[11px] text-white block mt-0.5">Class 2027</strong>
                <span className="font-sans text-[9px] text-slate-400">Aeronautical</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <span className="font-mono text-[8px] text-slate-400 uppercase block">INTERNSHIPS</span>
                <strong className="font-display text-[11px] text-sky-300 block mt-0.5">STAR & MakeX</strong>
                <span className="font-sans text-[9px] text-slate-400">Orbits & CAD</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-left">
                <span className="font-mono text-[8px] text-slate-400 uppercase block">CREDENTIALS</span>
                <strong className="font-display text-[11px] text-amber-300 block mt-0.5">ISRO & NPTEL</strong>
                <span className="font-sans text-[9px] text-slate-400">Remote Sensing</span>
              </div>
            </div>

            {/* Primary Details Link */}
            <Link
              to="/about"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>EXPLORE FULL ABOUT ME DETAILS & BACKGROUND</span>
              <ExternalLink size={12} />
            </Link>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => SoundManager.playClick()}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-mono text-[11px] font-semibold transition-colors"
              >
                <Download size={11} />
                <span>RESUME PDF</span>
              </a>

              <button
                type="button"
                onClick={() => scrollToScene(2)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-400 font-mono text-[11px] font-bold cursor-pointer"
              >
                <span>SECTION 2: EXPERIENCE</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 02: EXPERIENCE (COMMON HEADING)                                   */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-2" 
          className="min-h-screen flex items-center justify-end px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 animate-in fade-in duration-300 ml-auto mr-0 lg:mr-6">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800/50 inline-block">
                  SECTION 02 // EXPERIENCE
                </span>
                <Link
                  to="/experience"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  title="Open full detailed Experience page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link
                to="/experience"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors tracking-tight">
                  EXPERIENCE (EXP)
                </h2>
              </Link>

              <p className="font-sans text-[11px] text-slate-300 leading-normal">
                Verified aerospace engineering internships, research fellowships, and industry roles.
              </p>
            </div>

            {/* Core Internships List */}
            <div className="space-y-2">
              {experienceData.map((exp) => (
                <div key={exp.id} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-left">
                  <div className="flex justify-between items-start gap-1.5">
                    <div>
                      <strong className="font-display font-bold text-xs text-white block">
                        {exp.role}
                      </strong>
                      <span className="font-sans text-[10px] text-sky-400 font-medium">
                        {exp.organisation} • {exp.location}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-amber-300 font-semibold bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-800/40 whitespace-nowrap">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-300 line-clamp-2 leading-tight">
                    {exp.verifiedContext}
                  </p>
                  <div className="flex flex-wrap gap-1 font-mono text-[8px] pt-0.5">
                    {(exp.tools || []).slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Details Link */}
            <Link
              to="/experience"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>EXPLORE FULL EXPERIENCE & RECOMMENDATIONS</span>
              <ExternalLink size={12} />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollToScene(1)}
                className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>ABOUT ME</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToScene(3)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-400 font-mono text-[11px] font-bold cursor-pointer"
              >
                <span>SECTION 3: PROJECTS</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 03: PROJECTS (COMMON HEADING)                                     */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-3" 
          className="min-h-screen flex items-center justify-start px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 animate-in fade-in duration-300 ml-0 mr-auto lg:ml-6">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/50 inline-block">
                  SECTION 03 // PROJECTS
                </span>
                <Link
                  to="/projects"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  title="Open full detailed Projects page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link
                to="/projects"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  PROJECTS
                </h2>
              </Link>

              <p className="font-sans text-[11px] text-slate-300 leading-normal">
                Rotating reference frame CFD simulations in ANSYS Fluent, parametric CAD, and orbital mechanics.
              </p>
            </div>

            {/* Quick 2 Featured Project Cards */}
            <div className="space-y-2">
              {/* Project 1: CFD */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-sky-400 font-bold uppercase">
                    AERODYNAMICS & CFD
                  </span>
                  <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                    {propellerProject.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xs text-white">
                  {propellerProject.title}
                </h3>
                <p className="font-sans text-[11px] text-slate-300 line-clamp-1">
                  {propellerProject.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex gap-1 font-mono text-[8px]">
                    <span className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">ANSYS Fluent</span>
                    <span className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">MRF Meshing</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      SoundManager.playClick();
                      setSelectedProject(propellerProject);
                    }}
                    className="font-mono text-[9px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>QUICK BLUEPRINT</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>

              {/* Project 2: CAD Assembly */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-amber-400 font-bold uppercase">
                    SOLIDWORKS 3D CAD
                  </span>
                  <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                    {cadProject.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xs text-white">
                  {cadProject.title}
                </h3>
                <p className="font-sans text-[11px] text-slate-300 line-clamp-1">
                  {cadProject.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex gap-1 font-mono text-[8px]">
                    <span className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">SolidWorks</span>
                    <span className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Parametric CAM</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      SoundManager.playClick();
                      setSelectedProject(cadProject);
                    }}
                    className="font-mono text-[9px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>QUICK BLUEPRINT</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Details Link */}
            <Link
              to="/projects"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>EXPLORE ALL 6 PROJECTS & CAD BLUEPRINTS</span>
              <ExternalLink size={12} />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollToScene(2)}
                className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>EXPERIENCE</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToScene(4)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-mono text-[11px] font-bold cursor-pointer"
              >
                <span>SECTION 4: SKILLS</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 04: SKILLS (COMMON HEADING)                                       */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-4" 
          className="min-h-screen flex items-center justify-end px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 animate-in fade-in duration-300 ml-auto mr-0 lg:mr-6">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800/50 inline-block">
                  SECTION 04 // SKILLS
                </span>
                <Link
                  to="/skills"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors"
                  title="Open full detailed Skills page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link
                to="/skills"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-purple-300 transition-colors tracking-tight">
                  SKILLS
                </h2>
              </Link>

              <p className="font-sans text-[11px] text-slate-300 leading-normal">
                Aerodynamics simulation, CAD/CAM prototyping, orbital mechanics, and scientific programming.
              </p>
            </div>

            {/* 4 Tooling Categories */}
            <div className="grid grid-cols-2 gap-1.5 text-left font-mono text-[11px]">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-sky-400 font-bold block text-[9px]">AERODYNAMICS & CFD</span>
                <span className="text-white text-[10px]">ANSYS Fluent • XFoil</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 font-bold block text-[9px]">CAD / CAM MODELLING</span>
                <span className="text-white text-[10px]">SolidWorks • AutoCAD</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-purple-400 font-bold block text-[9px]">SPACE & PROPULSION</span>
                <span className="text-white text-[10px]">NASA GMAT • Orbits</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-[9px]">PROGRAMMING & IOT</span>
                <span className="text-white text-[10px]">MATLAB • Python • C++</span>
              </div>
            </div>

            {/* Interactive Keplerian Flight Computer */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">Altitude (h):</span>
                <strong className="text-sky-300">{altitudeKm} km</strong>
              </div>
              <input 
                type="range"
                min="200"
                max="1200"
                step="50"
                value={altitudeKm}
                onChange={(e) => setAltitudeKm(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400"
              />

              <div className="grid grid-cols-3 gap-1.5 pt-0.5 text-center">
                <div className="p-1 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[8px] text-slate-400 uppercase block">Speed</span>
                  <strong className="text-white text-[10px]">{vOrbitKmS.toFixed(2)} km/s</strong>
                </div>
                <div className="p-1 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[8px] text-slate-400 uppercase block">Period</span>
                  <strong className="text-white text-[10px]">{periodMin.toFixed(1)} min</strong>
                </div>
                <div className="p-1 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[8px] text-purple-300 uppercase block">Revs/Day</span>
                  <strong className="text-purple-300 text-[10px]">{orbitsPerDay}</strong>
                </div>
              </div>
            </div>

            {/* Primary Details Link */}
            <Link
              to="/skills"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-purple-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>VIEW FULL TECHNICAL SKILLS INVENTORY & MATRIX</span>
              <ExternalLink size={12} />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollToScene(3)}
                className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>PROJECTS</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToScene(5)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-purple-400 font-mono text-[11px] font-bold cursor-pointer"
              >
                <span>SECTION 5: CERTS</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 05: CERTIFICATIONS (COMMON HEADING)                               */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-5" 
          className="min-h-screen flex items-center justify-start px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 animate-in fade-in duration-300 ml-0 mr-auto lg:ml-6">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/50 inline-block">
                  SECTION 05 // CERTIFICATIONS
                </span>
                <Link
                  to="/certifications"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  title="Open full detailed Certifications page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link
                to="/certifications"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  CERTIFICATIONS
                </h2>
              </Link>

              <p className="font-sans text-[11px] text-slate-300 leading-normal">
                Institutional credentials and verified technical achievements from ISRO/IIRS, NPTEL, and Autodesk.
              </p>
            </div>

            {/* Verified Certifications List */}
            <div className="space-y-1.5 text-left">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="font-display font-bold text-[11px] text-white block leading-tight">
                    ISRO / IIRS: Remote Sensing & Geocomputation
                  </strong>
                  <span className="font-sans text-[9px] text-slate-400 leading-tight">Indian Institute of Remote Sensing (EDUSAT)</span>
                </div>
                <span className="font-mono text-[8px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap">
                  VERIFIED
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="font-display font-bold text-[11px] text-white block leading-tight">
                    ISRO / IIRS: Disaster Management using GIS
                  </strong>
                  <span className="font-sans text-[9px] text-slate-400 leading-tight">Satellite geospatial tracking & disaster analysis</span>
                </div>
                <span className="font-mono text-[8px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap">
                  VERIFIED
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="font-display font-bold text-[11px] text-white block leading-tight">
                    NPTEL / IIT: Introduction to Drones & UAVs
                  </strong>
                  <span className="font-sans text-[9px] text-slate-400 leading-tight">Elite Certification in autonomous aerial vehicle systems</span>
                </div>
                <span className="font-mono text-[8px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap">
                  ELITE
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="font-display font-bold text-[11px] text-white block leading-tight">
                    Autodesk AutoCAD & Mechanical CAD Specialist
                  </strong>
                  <span className="font-sans text-[9px] text-slate-400 leading-tight">2D drafts, 3D parametric solids & drafting</span>
                </div>
                <span className="font-mono text-[8px] text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-800/40 whitespace-nowrap">
                  CERTIFIED
                </span>
              </div>
            </div>

            {/* Primary Details Link */}
            <Link
              to="/certifications"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>VIEW & VERIFY ALL CERTIFICATES & CREDENTIALS</span>
              <ExternalLink size={12} />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollToScene(4)}
                className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>SKILLS</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToScene(6)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-mono text-[11px] font-bold cursor-pointer"
              >
                <span>SECTION 6: CONTACT</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* SCENE 06: CONTACT & RESUME (COMMON HEADING)                             */}
        {/* ----------------------------------------------------------------------- */}
        <section 
          id="scene-6" 
          className="min-h-screen flex items-center justify-end px-3 sm:px-8 lg:px-12 py-8 scroll-mt-14"
        >
          <div className="w-full max-w-[440px] bg-slate-950/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 animate-in fade-in duration-300 ml-auto mr-0 lg:mr-6">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50 inline-block">
                  SECTION 06 // CONTACT & RESUME
                </span>
                <Link
                  to="/contact"
                  onClick={() => SoundManager.playClick()}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  title="Open full detailed Contact page"
                >
                  <span>OPEN DETAILS</span>
                  <ExternalLink size={10} />
                </Link>
              </div>

              <Link
                to="/contact"
                onClick={() => SoundManager.playClick()}
                className="group block"
              >
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                  CONTACT & RESUME
                </h2>
              </Link>

              <p className="font-sans text-[11px] text-slate-300 leading-normal">
                The aircraft has touched down! Available for aerospace internships, CAD contracts, and research collaborations.
              </p>
            </div>

            {/* Connect links */}
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] text-center">
              <a 
                href="https://www.linkedin.com/in/ayushman-srivastava-1b777a290/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 text-white font-bold transition-all block"
              >
                <Linkedin size={14} className="mx-auto text-[#0A66C2] mb-0.5" />
                <span>LINKEDIN</span>
              </a>

              <a 
                href="https://github.com/ayushman-srivastava" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 text-white font-bold transition-all block"
              >
                <Github size={14} className="mx-auto text-white mb-0.5" />
                <span>GITHUB</span>
              </a>

              <a 
                href="/resume/resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 text-white font-bold transition-all block"
              >
                <Download size={14} className="mx-auto text-emerald-400 mb-0.5" />
                <span>RESUME</span>
              </a>
            </div>

            {/* Direct Message Form */}
            {formSubmitted ? (
              <div className="py-2.5 text-center space-y-1 bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3">
                <CheckCircle size={20} className="text-emerald-400 mx-auto" />
                <h4 className="font-display font-bold text-xs text-white">Message Transmitted!</h4>
                <p className="font-sans text-[10px] text-slate-300">Ayushman will reply to your frequency promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-1.5 font-sans text-xs">
                {formError && <div className="text-red-400 font-mono text-[10px]">{formError}</div>}
                <div className="grid grid-cols-2 gap-1.5">
                  <input 
                    type="text" 
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none focus:border-sky-400"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none focus:border-sky-400"
                  />
                </div>
                <textarea 
                  rows={2}
                  placeholder="Transmission message details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] focus:outline-none focus:border-sky-400 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-1"
                >
                  <Send size={11} />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}

            {/* Primary Details Link */}
            <Link
              to="/contact"
              onClick={() => SoundManager.playClick()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-[11px] font-bold tracking-wider shadow-md shadow-emerald-500/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>OPEN FULL CONTACT & INQUIRY PAGE</span>
              <ExternalLink size={12} />
            </Link>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => scrollToScene(5)}
                className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft size={12} />
                <span>CERTS</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToScene(1)}
                className="font-mono text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>TOP ↺</span>
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* FIXED BOTTOM BAR: CLEAN COMMON SCRUBBER TIMELINE CONTROLLER               */}
      {/* ========================================================================= */}
      <footer className="fixed bottom-0 inset-x-0 z-40 px-3 sm:px-6 py-2 bg-[#020617]/85 backdrop-blur-md border-t border-slate-800/80 shadow-2xl">
        
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Stepper Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollToScene(currentScene - 1)}
              disabled={currentScene === 1}
              className={`p-1.5 rounded-lg border border-slate-700 font-mono text-xs font-bold transition-all cursor-pointer ${
                currentScene === 1 ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title="Previous Section"
            >
              <ChevronLeft size={14} />
            </button>

            <span className="font-mono text-[11px] font-bold text-white px-1.5">
              SEC {currentScene} / 06
            </span>

            <button
              type="button"
              onClick={() => scrollToScene(currentScene + 1)}
              disabled={currentScene === 6}
              className={`p-1.5 rounded-lg border border-slate-700 font-mono text-xs font-bold transition-all cursor-pointer ${
                currentScene === 6 ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title="Next Section"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Clean Common Scrubber Pills */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full py-0.5">
            {COMMON_SCENES.map((scene) => {
              const isActive = currentScene === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => scrollToScene(scene.id)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 flex-shrink-0 ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20 scale-105'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="opacity-70 text-[8px]">0{scene.id}</span>
                  <span>{scene.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Live Flight Telemetry Tag */}
          <div className="hidden xl:flex items-center gap-1.5 font-mono text-[9px] text-slate-500">
            <span>FLIGHT: {Math.round((scrollProgress / 5) * 100)}%</span>
            <span>•</span>
            <span>SMOOTH 60FPS</span>
          </div>

        </div>

      </footer>

      {/* Full Technical Project Case Study Modal */}
      <SkyboundProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

    </div>
  );
}
