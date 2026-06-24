import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const certs = [
    { 
      title: 'From Code to Flight — MATLAB & Simulink', 
      issuer: 'Vyadh Aerospace Pvt. Ltd.', 
      date: 'Mar 2026',
      link: null
    },
    { 
      title: 'Drone Systems and Controls', 
      issuer: 'NPTEL', 
      date: 'Nov 2025',
      link: null 
    },
    { 
      title: 'Autodesk AutoCAD Certified', 
      issuer: 'Udemy', 
      date: 'Aug 2025',
      link: 'https://www.udemy.com/certificate/UC-1526f314-83bc-4cff-8446-697624ee93ee/'
    },
    { 
      title: 'Space Technology for Disaster Risk Reduction', 
      issuer: 'ISRO', 
      date: 'Jun 2025',
      link: 'https://isrolms.irs.gov.in/mod/customcert/verify_certificate.php?contextid=1628095'
    },
    { 
      title: 'Remote Sensing & Digital Image Analysis', 
      issuer: 'ISRO – IIRS', 
      date: 'Mar 2025',
      link: 'https://isrolms.irs.gov.in/mod/customcert/verify_certificate.php?contextid=1049408'
    },
    { 
      title: 'MATLAB Certified', 
      issuer: 'Great Learning', 
      date: 'Aug 2024',
      link: null 
    },
  ];

  return (
    <motion.section 
      id="certifications" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-display font-bold text-slate-200 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl font-normal">06.</span> Certifications
        </h2>
      </div>

      <div className="space-y-4">
        {certs.map((cert, i) => {
          const content = (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-colors"></div>
              <div className="mt-1 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                <Award size={20} />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5 flex-wrap">
                  {cert.title}
                  {cert.link && <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-400">{cert.issuer}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                  {cert.link ? (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-cyan-500/80 font-mono group-hover:text-cyan-400 transition-colors">View Certificate ↗</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] text-slate-600 font-mono">Available on Request</span>
                    </>
                  )}
                </div>
              </div>
            </>
          );

          if (cert.link) {
            return (
              <motion.a 
                key={i} 
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-cyan-400/30 transition-all group relative overflow-hidden cursor-pointer"
              >
                {content}
              </motion.a>
            );
          }

          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 hover:border-cyan-400/30 transition-all group relative overflow-hidden"
            >
              {content}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
