import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Phone, ArrowRight, Download, Send, Sparkles } from 'lucide-react';
import SoundManager from '../utils/audio';

export default function Hero() {
  const specTags = [
    { name: 'ANSYS Fluent CFD', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { name: 'SolidWorks & Fusion 360', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Structural FEA (10g)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'MATLAB Simulink (PID)', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'NASA GMAT Astrodynamics', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  return (
    <section id="hero" className="min-h-[90vh] flex flex-col justify-center pt-24 pb-12 relative">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center w-full z-10">
        
        {/* Left Column: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-mono mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span>FLIGHT READY · AERONAUTICAL ENGINEERING</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight mb-4 leading-[1.1]">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
              Ayushman Srivastava
            </span>
          </h1>

          <p className="text-lg md:text-xl font-display text-slate-700 font-medium mb-4">
            Exploring the science of flight, aerodynamics & space systems.
          </p>
          
          <p className="max-w-xl text-slate-700 leading-relaxed mb-6 font-sans text-sm md:text-base">
            Aeronautical Engineering scholar at FGIET Rae Bareli (AKTU). Specializing in Aerodynamics, ANSYS Fluent CFD simulations, Aircraft Structures & FEA, Propulsion, and Orbital Astrodynamics.
          </p>

          {/* Multi-Colored Spec Tags */}
          <div className="flex flex-wrap gap-2 mb-8 max-w-xl">
            {specTags.map((tag) => (
              <span 
                key={tag.name} 
                className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border ${tag.color} shadow-2xs`}
              >
                {tag.name}
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a 
              href="#projects" 
              onClick={() => SoundManager.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="/resume/Ayushmanresume.pdf" 
              download
              target="_blank"
              onClick={() => SoundManager.playFlyby()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl font-medium text-sm shadow-xs hover:shadow-sm transition-all active:scale-95"
            >
              <Download size={16} className="text-slate-500" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="mailto:ayushmansrivastava2506@gmail.com" 
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
            >
              <Mail size={14} className="text-sky-500" />
              <span>Email</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ayushmansrivastavaofficial/" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
            >
              <Linkedin size={14} className="text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="tel:+919473512071" 
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
            >
              <Phone size={14} className="text-emerald-500" />
              <span>+91 94735 12071</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Clean Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-sm mx-auto lg:ml-auto w-full"
        >
          {/* Soft background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/50 via-blue-100/30 to-indigo-100/40 rounded-3xl filter blur-xl -z-10 transform scale-105" />

          {/* Main Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md relative overflow-hidden">
            {/* Image Frame */}
            <div className="relative w-full h-[340px] rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
              <img 
                src="/profile.jpg" 
                alt="Ayushman Srivastava" 
                className="w-full h-full object-cover object-[center_12%] hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/ayushman/500/500";
                }}
              />
              
              {/* Bottom pill tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-mono text-slate-800 border border-slate-200/60 shadow-xs font-semibold">
                  FGIET · Class of 2027
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 backdrop-blur-md text-[11px] font-mono text-white shadow-xs font-bold">
                  7.8 SGPA
                </span>
              </div>
            </div>

            {/* Quick meta snippet beneath photo */}
            <div className="mt-3.5 px-1 flex items-center justify-between text-xs text-slate-600 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Open for Aero Roles
              </span>
              <span>Rae Bareli, UP</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
