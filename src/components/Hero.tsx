import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Phone, FileText, Crosshair, Activity } from 'lucide-react';

export default function Hero() {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 relative">
      {/* HUD Elements */}
      <div className="absolute top-10 left-0 text-[10px] font-mono text-cyan-400/50 hidden md:block">
        <p>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
          SYS.STATUS: ONLINE
        </p>
        <p>ORBIT_SYNC: {time}</p>
        <p>LAT: 26.22° N | LON: 81.24° E</p>
      </div>
      
      <div className="absolute top-10 right-0 hidden md:flex flex-col items-end gap-2">
        <Crosshair className="text-cyan-500/30 animate-pulse" size={24} />
        <div className="w-12 h-[1px] bg-cyan-500/30"></div>
        <div className="w-8 h-[1px] bg-cyan-500/30"></div>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center w-full z-10 mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <Activity className="text-cyan-400" size={18} />
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Mission Commander · Aeronautical Engineering</p>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-100 tracking-tight mb-4 leading-none">
            Ayushman<br />Srivastava.
          </h1>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-slate-400 tracking-tight mb-6">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">aerospace & IoT</span> solutions.
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-xl text-slate-400 leading-relaxed mb-10 border-l-2 border-cyan-400/30 pl-4 text-base font-sans"
          >
            Aeronautical Engineering student at FGIET, Rae Bareli. Specializing in CAD/CAM, CFD simulations, satellite trajectory design, and embedded IoT prototyping. Passionate about India's space missions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <a 
              href="#projects" 
              className="group relative px-6 py-3 bg-cyan-400 text-slate-950 rounded font-mono text-xs font-semibold hover:opacity-90 transition-all uppercase tracking-wider"
            >
              View Projects
            </a>
            <a 
              href="/resume/Ayushmanresume.pdf" 
              download
              target="_blank"
              className="group relative px-6 py-3 border border-cyan-400/40 text-cyan-400 rounded font-mono text-xs font-semibold hover:bg-cyan-500/10 transition-all uppercase tracking-wider"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <a href="mailto:ayushmansrivastava2506@gmail.com" className="flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 px-4 py-2 rounded-md transition-colors bg-slate-900/40">
              <Mail size={14} /> <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/ayushmansrivastavaofficial/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 px-4 py-2 rounded-md transition-colors bg-slate-900/40">
              <Linkedin size={14} /> <span>LinkedIn</span>
            </a>
            <a href="tel:+919473512071" className="flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 px-4 py-2 rounded-md transition-colors bg-slate-900/40">
              <Phone size={14} /> <span>+91 94735 12071</span>
            </a>
          </motion.div>
        </motion.div>

        {/* PROFILE PHOTO COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group w-[260px] h-[310px] mx-auto md:mx-0 select-none hidden md:block"
        >
          {/* HUD Corner Accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-30"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-30"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-30"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-30"></div>
          
          <div className="absolute inset-0 border border-cyan-400/15 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 rounded-md"></div>
          
          <div className="relative bg-slate-900 overflow-hidden w-full h-full rounded border border-slate-800 z-10">
            <div className="absolute inset-0 bg-cyan-400/20 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-multiply"></div>
            <img 
              src="/profile.jpg" 
              alt="Ayushman Srivastava" 
              className="w-full h-full object-cover object-[center_10%] grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/ayushman/500/500";
              }}
            />
            <div className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/80 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/20 z-30 tracking-wider">
              ID: AYUSHMAN-SRIVASTAVA
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
