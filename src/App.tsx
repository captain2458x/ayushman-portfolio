/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import SkyBackground from './components/SkyBackground';

function HomeView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to hash target if present when returning from /projects
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 space-y-24 md:space-y-32">
      <Hero />
      <About />
      
      {/* Experience & Education Side-by-Side */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        <Experience />
        <Education />
      </div>

      <Skills />

      {/* Featured Projects Showcase with real preview images & redirect links */}
      <Projects 
        viewMode="teaser"
        onViewProject={(projectId) => {
          navigate(`/projects?id=${projectId}`);
        }}
        onViewAll={() => {
          navigate('/projects');
        }}
      />

      <Certifications />
      <Contact />
    </main>
  );
}

function ProjectsView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top or specific project target on page enter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetId = params.get('id') || location.hash.replace('#', '').replace('project-', '');
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(`project-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full overflow-hidden">
      <Projects 
        viewMode="full"
        onBack={() => {
          navigate('/#projects');
        }}
      />
    </main>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-[#F8FBFF] text-slate-800 selection:bg-sky-500/20 selection:text-sky-900 overflow-x-hidden relative font-sans flex flex-col justify-between">
      {/* Minimal Sky Atmospheric Background */}
      <SkyBackground />

      {/* Sticky Clean Frosted Navigation */}
      <Navbar />

      {/* Page Routing Stream */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="*" element={<HomeView />} />
        </Routes>
      </div>

      {/* Clean Minimalist Footer */}
      <footer className="py-8 text-center text-slate-500 text-xs font-mono border-t border-slate-200/80 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Ayushman Srivastava · Aeronautical Engineering</span>
          <span className="text-slate-400">FGIET Rae Bareli (AKTU) · Minimal Sky Edition ✈️</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
