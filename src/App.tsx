/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import RocketBackground from './components/RocketBackground';
import CockpitControls from './components/CockpitControls';
import AirplaneTransition from './components/AirplaneTransition';
import SoundManager from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'hangar'>('home');
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const triggerTransition = (targetView: 'home' | 'hangar') => {
    if (isTransitioning) return;
    SoundManager.playFlyby();
    setIsTransitioning(true);

    // Swap views halfway through the transition animation (at 700ms)
    setTimeout(() => {
      setCurrentView(targetView);
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }, 700);

    // Complete the transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden">
      <RocketBackground />
      <AirplaneTransition isActive={isTransitioning} />

      {currentView === 'home' ? (
        <>
          <Navbar />
          <CockpitControls />
          
          <main className="w-full px-6 md:px-12 lg:px-24 py-24 space-y-32">
            <Hero />
            <About />
            <Experience />
            <Projects viewMode="teaser" onViewAll={() => triggerTransition('hangar')} />
            <Skills />
            <div className="grid md:grid-cols-2 gap-12">
              <Education />
              <Certifications />
            </div>
            <Contact />
          </main>
        </>
      ) : (
        <main className="w-full px-6 md:px-12 lg:px-24 py-24 min-h-[85vh]">
          <Projects viewMode="full" onBack={() => triggerTransition('home')} />
        </main>
      )}
      
      <footer className="py-8 text-center text-slate-500 text-sm font-mono border-t border-slate-800/50">
        <p>© {new Date().getFullYear()} Ayushman Srivastava. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

