import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const education = [
    {
      school: 'Feroze Gandhi Institute of Engg & Technology',
      degree: 'B.Tech — Aeronautical Engineering · SGPA: 7.8',
      date: 'Sep 2023 – Jul 2027',
      location: 'Rae Bareli'
    },
    {
      school: 'Kamla Nehru Institute of Child Education',
      degree: 'Intermediate (Class XII)',
      date: 'Apr 2021 – Feb 2023',
      location: ''
    },
    {
      school: 'Central Academy',
      degree: 'Matriculation (Class X)',
      date: '2017 – 2020',
      location: ''
    }
  ];

  return (
    <motion.section 
      id="education" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">05.</span> Education
        </h2>
      </div>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
        {education.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-950 text-cyan-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
              <GraduationCap size={18} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/30 transition-colors relative overflow-hidden group-hover:bg-slate-800/80">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-200">{item.school}</div>
              </div>
              <div className="text-sm text-cyan-400 font-mono mb-2">{item.degree}</div>
              <div className="text-xs text-slate-500 font-mono">{item.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
