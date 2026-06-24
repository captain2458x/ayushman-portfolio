import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20 py-4 shadow-[0_4px_30px_rgba(6,182,212,0.1)]' : 'bg-transparent py-6'}`}
    >
      <div className="w-full px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-xl font-display font-bold tracking-tighter text-cyan-400 group">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          AS<span className="text-slate-100 group-hover:text-cyan-400 transition-colors">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a 
              key={item.name} 
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors relative group"
            >
              <span className="text-cyan-500/50 mr-1">0{i + 1}.</span>
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            href="/resume/Ayushmanresume.pdf" 
            target="_blank"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="px-4 py-2 text-sm font-mono text-cyan-400 border border-cyan-400/50 rounded hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
          >
            Resume
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
}
