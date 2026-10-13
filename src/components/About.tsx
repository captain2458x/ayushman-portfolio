import React from 'react';
import { motion } from 'motion/react';
import { Wind, Compass, Layers, Cpu, Award, Briefcase, GraduationCap, FolderKanban } from 'lucide-react';

export default function About() {
  const stats = [
    { num: '7.8', label: 'SGPA · Aeronautical', icon: <GraduationCap size={18} />, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { num: '2', label: 'Aerospace Internships', icon: <Briefcase size={18} />, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { num: '6', label: 'Flight & Space Certs', icon: <Award size={18} />, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { num: '6+', label: 'CFD & Aero Projects', icon: <FolderKanban size={18} />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  ];

  const focusAreas = [
    { 
      title: 'Aerodynamics & CFD', 
      desc: 'ANSYS Fluent, k-ω SST turbulence modeling, pressure gradients, and rotor downwash.',
      icon: <Wind size={16} className="text-sky-600" />,
      tagColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    { 
      title: 'Aircraft Structures & FEA', 
      desc: 'Von Mises stress, CFRP composites, structural factor of safety & 10g launch acceleration loads.',
      icon: <Layers size={16} className="text-emerald-600" />,
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    { 
      title: 'Flight Controls & PID', 
      desc: 'Simulink multi-body models, attitude control loops & drone flight dynamics simulation.',
      icon: <Cpu size={16} className="text-amber-600" />,
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    { 
      title: 'Spacecraft Astrodynamics', 
      desc: 'NASA GMAT trajectory modeling, Keplerian orbital elements & Hohmann transfer Delta-V budgets.',
      icon: <Compass size={16} className="text-purple-600" />,
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <motion.section 
      id="about" 
      className="scroll-mt-24 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          01.
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
          About Me
        </h2>
        <div className="h-px bg-slate-200 flex-grow max-w-xs"></div>
      </div>
      
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        {/* Narrative Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-slate-700 leading-relaxed font-sans text-sm md:text-base">
          <p>
            I'm <span className="text-slate-900 font-semibold">Ayushman Srivastava</span> — an Aeronautical Engineering undergraduate at <span className="text-sky-600 font-medium">Feroze Gandhi Institute of Engineering & Technology (FGIET, AKTU)</span>, Class of 2027. My engineering foundation is built around fluid dynamics, aircraft structures, and high-performance flight systems.
          </p>
          <p>
            I specialize in <span className="text-slate-900 font-semibold">Computational Fluid Dynamics (CFD)</span> and <span className="text-slate-900 font-semibold">Finite Element Analysis (FEA)</span> using ANSYS Fluent and Static Structural. From analyzing twisted aerofoil rotor wakes at 6000 RPM (yielding Cl 0.35 & Cd 0.095) to computing satellite launch stresses under 10g acceleration in Low Earth Orbit, I transform mathematical equations of motion into validated aerospace hardware designs.
          </p>
          <p>
            My experience spans spacecraft trajectory simulation using <span className="text-purple-600 font-mono text-xs px-1.5 py-0.5 bg-purple-50 rounded border border-purple-200">NASA GMAT</span> at STAR, rapid drone frame prototyping during my MakeX internship, and tuning closed-loop PID altitude controllers in MATLAB Simulink. Certified by ISRO IIRS in Remote Sensing and NPTEL in Drone Systems.
          </p>
        </div>
        
        {/* Stats & Focus Pillars */}
        <div className="space-y-6">
          {/* 4 Colorful Stats Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className={`p-4 rounded-xl border ${stat.color} transition-all hover:shadow-sm`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">{stat.num}</span>
                  <div className="opacity-80">{stat.icon}</div>
                </div>
                <div className="font-mono text-[11px] font-semibold tracking-wide text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* 4 Core Aerospace Domain Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusAreas.map((area, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-sky-300 hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-slate-50 border border-slate-100">
                    {area.icon}
                  </div>
                  <span className="text-xs font-display font-bold text-slate-800">
                    {area.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-sans">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
