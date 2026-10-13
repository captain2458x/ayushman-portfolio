import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plane, Menu, X, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SoundManager from '../utils/audio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isProjectsPage = location.pathname.startsWith('/projects');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    SoundManager.playClick();
    if (isProjectsPage) {
      e.preventDefault();
      if (href === '#projects') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(`/${href}`);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    SoundManager.playClick();
    if (isProjectsPage) {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <motion.header 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href={isProjectsPage ? "/" : "#"} 
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-xs">
            <Plane size={16} className="rotate-45 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-slate-900 tracking-tight text-base leading-none">
              Ayushman<span className="text-sky-500">.</span>
            </span>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">Aero Engineer</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={isProjectsPage ? `/${item.href}` : item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors relative group py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 rounded-full transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
          
          <a 
            href="/resume/Ayushmanresume.pdf" 
            target="_blank"
            download
            onClick={() => SoundManager.playFlyby()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-full shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <a 
            href="/resume/Ayushmanresume.pdf" 
            target="_blank"
            download
            className="px-3 py-1.5 text-xs font-mono font-semibold text-white bg-sky-600 rounded-full"
          >
            Resume
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg space-y-3"
        >
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={isProjectsPage ? `/${item.href}` : item.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, item.href);
              }}
              className="block text-sm font-medium text-slate-700 hover:text-sky-600 py-1.5 border-b border-slate-100 last:border-none"
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
