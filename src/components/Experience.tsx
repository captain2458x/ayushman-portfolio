import React from 'react';
import { motion } from 'motion/react';
import { Plane, MapPin, Calendar, Compass, ExternalLink } from 'lucide-react';
import SoundManager from '../utils/audio';

const experiences = [
  {
    id: 'kalam',
    company: 'Kalam Pragati (MakeX · ERA Foundation · AKTU)',
    role: 'UAV Airframe & Rapid Prototyping Intern',
    date: 'Aug 2025 – Sep 2025',
    location: 'Lucknow, UP, India',
    coords: '26.8467° N, 80.9462° E',
    flightAlt: 'ALT: 120m (Flight Arena Testing)',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: [
      'Engineered modular drone chassis components and aerodynamic motor mount brackets in Onshape, optimizing strength-to-weight ratios.',
      'Fabricated lightweight airframe brackets via additive manufacturing (FDM 3D printing) and laser-cut structural plates for rapid flight test cycles.',
      'Integrated onboard avionics telemetry modules using ESP8266 and sensor arrays for real-time vibration and operational parameter streaming.',
      'Collaborated within an agile engineering sprint team to iterate airframe geometry from CAD concept to bench and ground-tested hardware.'
    ]
  },
  {
    id: 'star',
    company: 'Space Technology & Aeronautical Rocketry (STAR)',
    role: 'Astrodynamics & Spacecraft Trajectory Intern',
    date: 'Aug 2024 – Sep 2024',
    location: 'Surat, Gujarat, India',
    coords: '21.1702° N, 72.8311° E',
    flightAlt: 'ALT: 450km (LEO Orbital Insertion)',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: [
      'Modeled and propagated satellite orbital trajectories in Low Earth Orbit (LEO) using NASA\'s General Mission Analysis Tool (GMAT).',
      'Configured Keplerian orbital elements (semi-major axis, eccentricity, inclination) under Earth gravitational harmonic field models (J2 perturbations).',
      'Computed orbital transfer delta-V budgets, ground track coverage footprints, and eclipse cycle solar exposure windows for mission planning.'
    ]
  }
];

export default function Experience() {
  return (
    <motion.section 
      id="experience" 
      className="scroll-mt-24 w-full select-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          02.
        </span>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Experience & Flight Paths
        </h2>
      </div>

      {/* Trajectory Timeline Layout (Clean left-aligned timeline for side-by-side grid) */}
      <div className="relative pl-6 sm:pl-7 border-l-2 border-dashed border-sky-200 space-y-5 ml-2 sm:ml-3">
        {experiences.map((exp) => (
          <div 
            key={exp.id}
            onClick={() => SoundManager.playClick()}
            className="relative group cursor-pointer"
          >
            {/* Timeline Beacon Node on the line */}
            <div className="absolute -left-[31px] sm:-left-[35px] top-5 w-4 h-4 rounded-full bg-white border-2 border-sky-500 group-hover:scale-125 z-10 transition-all duration-300 shadow-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
            </div>

            {/* Main Experience Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs group-hover:border-sky-300 group-hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-sky-600">
                  {exp.role}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {exp.date}
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-slate-900 leading-snug mb-2">
                {exp.company}
              </h3>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${exp.badgeColor}`}>
                  {exp.coords}
                </span>
                <span className="text-[10px] text-slate-600 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                  {exp.flightAlt}
                </span>
              </div>

              <ul className="space-y-1.5 pt-2.5 border-t border-slate-100">
                {exp.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs text-slate-600 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-sky-500 font-bold text-sm leading-none">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
