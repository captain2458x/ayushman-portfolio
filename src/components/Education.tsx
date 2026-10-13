import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  const education = [
    {
      school: 'Feroze Gandhi Institute of Engg & Technology (AKTU)',
      degree: 'B.Tech — Aeronautical Engineering · SGPA: 7.8',
      date: 'Sep 2023 – Jul 2027 (Class of 2027)',
      location: 'Rae Bareli, Uttar Pradesh',
      coursework: [
        { name: 'Aerodynamics & Gas Dynamics', color: 'bg-sky-50 text-sky-700 border-sky-200' },
        { name: 'Aircraft Propulsion & Gas Turbines', color: 'bg-amber-50 text-amber-800 border-amber-200' },
        { name: 'Aircraft Structures & FEA', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { name: 'Flight Mechanics & Performance', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        { name: 'Computational Fluid Dynamics (CFD)', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
        { name: 'Space Flight & Orbital Mechanics', color: 'bg-purple-50 text-purple-700 border-purple-200' }
      ]
    },
    {
      school: 'Kamla Nehru Institute of Child Education',
      degree: 'Intermediate (Class XII) · PCM',
      date: 'Apr 2021 – Feb 2023',
      location: 'Sultanpur, Uttar Pradesh'
    },
    {
      school: 'Central Academy',
      degree: 'Matriculation (Class X) · Science & Mathematics',
      date: '2017 – 2020',
      location: 'Sultanpur, Uttar Pradesh'
    }
  ];

  return (
    <motion.section 
      id="education" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          03.
        </span>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Education
        </h2>
      </div>
      
      <div className="space-y-4">
        {education.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 mt-0.5">
                <GraduationCap size={18} />
              </div>
              <div className="flex-grow">
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {item.school}
                </h3>
                <div className="text-xs text-sky-600 font-mono font-semibold mt-1">
                  {item.degree}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 font-sans mt-1">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                    <Calendar size={11} /> {item.date}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                      <MapPin size={11} /> {item.location}
                    </span>
                  )}
                </div>

                {item.coursework && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-600 font-semibold mb-2">
                      Core Aeronautical Modules:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.map((course, cIdx) => (
                        <span 
                          key={cIdx} 
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${course.color}`}
                        >
                          {course.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
