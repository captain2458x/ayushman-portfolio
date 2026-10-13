import React from 'react';
import { motion } from 'motion/react';
import { Wind, PenTool, Layers, Compass } from 'lucide-react';
import FlightSimulator from './FlightSimulator';

const skillCategories = [
  {
    title: 'Aerodynamics & CFD',
    badge: 'Flow Dynamics',
    theme: {
      card: 'border-sky-200 hover:border-sky-300',
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      iconBg: 'bg-sky-100 text-sky-600',
      dot: 'text-sky-500'
    },
    icon: <Wind size={22} />,
    skills: [
      'ANSYS Fluent (k-ω SST)',
      'CFD-Post Vector Modeling',
      'Airfoil Pressure Contours',
      'Lift & Drag (Cl / Cd)',
      'Boundary Layer & Wake',
      'Subsonic & Transonic Flow'
    ]
  },
  {
    title: 'Aerospace CAD & Modeling',
    badge: 'CAD & Fab',
    theme: {
      card: 'border-indigo-200 hover:border-indigo-300',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-100 text-indigo-600',
      dot: 'text-indigo-500'
    },
    icon: <PenTool size={22} />,
    skills: [
      'SolidWorks Aerospace CAD',
      'Autodesk Fusion 360',
      'Onshape Parametric',
      'AutoCAD Technical Drafting',
      'Airframe Surface Lofting',
      'Additive Prototyping / 3D'
    ]
  },
  {
    title: 'Structural Analysis & FEA',
    badge: 'Stress & Yield',
    theme: {
      card: 'border-emerald-200 hover:border-emerald-300',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-600',
      dot: 'text-emerald-500'
    },
    icon: <Layers size={22} />,
    skills: [
      'ANSYS Static Structural',
      'Von Mises Stress Limits',
      'CFRP Composite Frames',
      'Total Deformation Plots',
      '10g Launch Acceleration',
      'Factor of Safety (FoS)'
    ]
  },
  {
    title: 'Flight Dynamics & Space',
    badge: 'Orbits & Control',
    theme: {
      card: 'border-purple-200 hover:border-purple-300',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-100 text-purple-600',
      dot: 'text-purple-500'
    },
    icon: <Compass size={22} />,
    skills: [
      'MATLAB & Simulink',
      'PID Flight Altitude Loops',
      'NASA GMAT Orbit Modeling',
      'Keplerian Orbit Trajectories',
      'Delta-V Budget Calculations',
      'Avionics Sensor Telemetry'
    ]
  }
];

export default function Skills() {
  return (
    <motion.section 
      id="skills" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          04.
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
          Technical Skills & Tooling
        </h2>
        <div className="h-px bg-slate-200 flex-grow max-w-xs"></div>
      </div>

      {/* 4 Colored Category Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skillCategories.map((category, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`bg-white border rounded-2xl p-5 shadow-xs transition-all hover:shadow-md ${category.theme.card} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.theme.iconBg}`}>
                  {category.icon}
                </div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${category.theme.badge}`}>
                  {category.badge}
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-slate-900 mb-3.5">
                {category.title}
              </h3>

              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-xs text-slate-600 font-sans leading-relaxed">
                    <span className={`${category.theme.dot} font-bold text-sm leading-none`}>•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive PID Simulator */}
      <FlightSimulator />
    </motion.section>
  );
}
