import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Code, PenTool, Radio } from 'lucide-react';
import FlightSimulator from './FlightSimulator';

const skillCategories = [
  {
    title: 'CAD & Design',
    icon: <PenTool className="text-cyan-400 mb-4" size={32} />,
    skills: ['AutoCAD', 'SolidWorks', 'Onshape', 'Autodesk Fusion 360', 'Tinkercad', 'ANSYS CFD']
  },
  {
    title: 'Programming',
    icon: <Code className="text-cyan-400 mb-4" size={32} />,
    skills: ['MATLAB / Simulink', 'Python', 'C / C++', 'HTML / CSS', 'Ansys Fluent']
  },
  {
    title: 'IoT & Embedded',
    icon: <Cpu className="text-cyan-400 mb-4" size={32} />,
    skills: ['ESP8266', 'Arduino IDE', 'ThingSpeak', 'Embedded Systems', '3D Printing']
  },
  {
    title: 'Aerospace & Data',
    icon: <Radio className="text-cyan-400 mb-4" size={32} />,
    skills: ['NASA GMAT', 'Remote Sensing', 'Flight Dynamics', 'Propulsion', 'Satellite Orbits']
  }
];

export default function Skills() {
  return (
    <motion.section 
      id="skills" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">04.</span> Technical Skills
        </h2>
        <div className="h-px bg-slate-800 flex-grow max-w-xs"></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/80 hover:border-cyan-400/30 transition-all group relative overflow-hidden"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/0 group-hover:border-cyan-500/50 transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/0 group-hover:border-cyan-500/50 transition-colors"></div>
            
            <div className="transform group-hover:scale-110 transition-transform duration-300 origin-left">
              {category.icon}
            </div>
            <h3 className="text-lg font-display font-bold text-slate-200 mb-4 group-hover:text-cyan-400 transition-colors">{category.title}</h3>
            <ul className="space-y-2">
              {category.skills.map(skill => (
                <li key={skill} className="flex items-center gap-2 text-sm text-slate-400 font-mono">
                  <span className="text-cyan-400 text-xs">▹</span> {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <FlightSimulator />
    </motion.section>
  );
}
