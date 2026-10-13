import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
import SoundManager from '../utils/audio';

export default function Certifications() {
  const certs = [
    { 
      title: 'From Code to Flight — MATLAB & Simulink', 
      issuer: 'Vyadh Aerospace Pvt. Ltd.', 
      date: 'Mar 2026',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      link: null
    },
    { 
      title: 'Drone Systems and Controls', 
      issuer: 'NPTEL (IIT)', 
      date: 'Nov 2025',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      link: null 
    },
    { 
      title: 'Autodesk AutoCAD Certified', 
      issuer: 'Autodesk / Udemy', 
      date: 'Aug 2025',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      link: 'https://www.udemy.com/certificate/UC-1526f314-83bc-4cff-8446-697624ee93ee/'
    },
    { 
      title: 'Space Technology for Disaster Risk Reduction', 
      issuer: 'ISRO', 
      date: 'Jun 2025',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      link: 'https://isrolms.irs.gov.in/mod/customcert/verify_certificate.php?contextid=1628095'
    },
    { 
      title: 'Remote Sensing & Digital Image Analysis', 
      issuer: 'ISRO – IIRS', 
      date: 'Mar 2025',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      link: 'https://isrolms.irs.gov.in/mod/customcert/verify_certificate.php?contextid=1049408'
    },
    { 
      title: 'MATLAB Certified Specialist', 
      issuer: 'Great Learning / MathWorks', 
      date: 'Aug 2024',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      link: null 
    },
  ];

  return (
    <motion.section 
      id="certifications" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          06.
        </span>
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Certifications & Credentials
        </h2>
        <div className="h-px bg-slate-200 flex-grow max-w-xs"></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, i) => {
          const cardBody = (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <Award size={18} />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-slate-900 text-sm leading-snug group-hover:text-sky-600 transition-colors">
                    {cert.title}
                  </h3>
                  {cert.link && (
                    <ExternalLink size={13} className="text-slate-400 group-hover:text-sky-600 shrink-0 mt-0.5" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${cert.badgeColor}`}>
                    {cert.issuer}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600">{cert.date}</span>
                  {cert.link && (
                    <span className="text-[10px] font-mono text-sky-600 font-semibold ml-auto">
                      Verified ↗
                    </span>
                  )}
                </div>
              </div>
            </div>
          );

          return cert.link ? (
            <motion.a 
              key={i} 
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => SoundManager.playClick()}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="block cursor-pointer"
            >
              {cardBody}
            </motion.a>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              {cardBody}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
