import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  const stats = [
    { num: '7.8', label: 'CGPA · B.Tech' },
    { num: '2', label: 'Internships' },
    { num: '5', label: 'Certifications' },
    { num: '4+', label: 'Projects' }
  ];

  return (
    <motion.section 
      id="about" 
      className="scroll-mt-24 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">01.</span> About Me
        </h2>
        <div className="h-px bg-slate-800 flex-grow max-w-xs"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4 text-slate-400 leading-relaxed font-sans text-base">
          <p>
            I'm Ayushman Srivastava — an Aeronautical Engineering student driven by curiosity for flight, space, and smart systems. My focus is on bridging theoretical aerospace concepts with real-world applications.
          </p>
          <p>
            I've worked on aerospace component design using SolidWorks, Onshape, and AutoCAD; performed CFD analysis in ANSYS Fluent; and developed satellite orbit trajectories using NASA's GMAT during my internship at STAR. My IoT project, CardioGuard, combined ESP8266, MAX30102, and cloud dashboards into a real-time health monitoring system.
          </p>
          <p>
            Certified in MATLAB, Remote Sensing (ISRO), Drone Systems (NPTEL), and AutoCAD. Committed to continuous learning in CubeSat design, propulsion systems, and AI/ML for aerospace.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 relative overflow-hidden group hover:border-cyan-400/20 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
              <div className="font-display text-4xl font-extrabold text-cyan-400 group-hover:scale-105 transition-transform origin-left">{stat.num}</div>
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
