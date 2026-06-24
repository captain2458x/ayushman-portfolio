import React from 'react';
import { motion } from 'motion/react';
import { Plane, MapPin, Calendar, Compass } from 'lucide-react';
import SoundManager from '../utils/audio';

const experiences = [
  {
    id: 'kalam',
    company: 'Kalam Pragati',
    role: 'Rapid Prototyping Intern',
    date: 'Aug 2025 - Sep 2025',
    location: 'Lucknow, UP, India',
    coords: '26.8467° N, 80.9462° E',
    flightAlt: 'ALT: 120m (Ground Test)',
    description: [
      'Kalam Pragati MakeX internship program powered by ERA Foundation in Association with AKTU, Lucknow.',
      'Gained hands-on exposure to CAD engineering tools and rapid prototyping methods including 3D printing and laser cutting.',
      'Supported IoT-based avionics projects using Arduino IDE and ESP8266 for automated parameter logging.',
      'Collaborated closely in a sprint team environment to brainstorm, design-test, and refine physical components.'
    ]
  },
  {
    id: 'star',
    company: 'Space Technology & Aeronautical Rocketry (STAR)',
    role: 'Spacecraft Trajectory Intern',
    date: 'Aug 2024 - Sep 2024',
    location: 'Surat, Gujarat, India',
    coords: '21.1702° N, 72.8311° E',
    flightAlt: 'ALT: 450km (LEO Simulation)',
    description: [
      'Developed and simulated satellite orbit trajectories using NASA\'s General Mission Analysis Tool (GMAT).',
      'Configured precise spacecraft parameters and gravitational force equations to analyze Keplerian orbital structures.',
      'Executed detailed Keplerian trajectory models to compute delta-v budgets and orbit stability envelopes.'
    ]
  }
];

export default function Experience() {
  return (
    <motion.section 
      id="experience" 
      className="scroll-mt-24 w-full select-none"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">02.</span> Where I've Worked
        </h2>
        <div className="h-px bg-slate-800 flex-grow max-w-xs"></div>
      </div>

      {/* Trajectory Timeline Layout */}
      <div className="relative max-w-4xl mx-auto px-4 font-mono">
        
        {/* Central Vertical Flight Path (Dotted route line) */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px border-l border-dashed border-slate-800 pointer-events-none md:-translate-x-1/2"></div>
        
        {/* Animated Flying Airplane Icon moving along the flight path */}
        <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
          <Plane className="text-cyan-400 rotate-90 w-4.5 h-4.5" />
        </div>

        <div className="space-y-16">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div 
                key={exp.id}
                onClick={() => SoundManager.playClick()}
                className="relative flex flex-col md:flex-row items-start md:justify-between group cursor-pointer"
              >
                {/* Timeline center glowing beacon node */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-950 border border-slate-800 group-hover:border-cyan-400 -translate-x-1/2 z-10 transition-all duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-cyan-400 transition-colors"></div>
                </div>

                {/* Left spacer for wide layouts */}
                <div className={`hidden md:block w-[45%] ${isLeft ? 'order-1 text-right' : 'order-3'}`}>
                  {isLeft && (
                    <div className="pr-8 space-y-2">
                      <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-500/10">
                        GPS: {exp.coords}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono leading-none">
                        {exp.flightAlt}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right spacer for wide layouts */}
                <div className={`hidden md:block w-[45%] ${isLeft ? 'order-3' : 'order-1 text-left'}`}>
                  {!isLeft && (
                    <div className="pl-8 space-y-2">
                      <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-500/10">
                        GPS: {exp.coords}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono leading-none">
                        {exp.flightAlt}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Details Card */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 order-2 ${isLeft ? 'md:text-left md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-slate-900/40 border border-slate-850 p-6 rounded-xl relative overflow-hidden group-hover:bg-slate-900/60 group-hover:border-cyan-500/20 transition-all"
                  >
                    {/* Top neon indicator stripe */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-cyan-400/20 group-hover:bg-cyan-400 transition-all"></div>

                    {/* Metadata Header */}
                    <div className="flex flex-col gap-1 mb-4 text-left">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-lg font-display font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-tight">
                          {exp.role}
                        </h3>
                      </div>
                      <h4 className="text-sm font-mono text-cyan-500 font-semibold uppercase tracking-wider">
                        @ {exp.company}
                      </h4>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {exp.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description bullet summaries */}
                    <ul className="space-y-3.5 text-left border-t border-slate-800/80 pt-4">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2.5 items-start text-xs font-sans text-slate-450 leading-relaxed text-slate-400">
                          <span className="text-cyan-400 select-none font-bold shrink-0 mt-0.5">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile GPS reading HUD */}
                    <div className="mt-4 pt-3 border-t border-slate-850/40 md:hidden flex justify-between items-center text-[9px] text-slate-500">
                      <span>GPS: {exp.coords}</span>
                      <span>{exp.flightAlt}</span>
                    </div>

                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
