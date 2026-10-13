import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import MonogramLogo from './MonogramLogo';
import ThemeSwitcher from './ThemeSwitcher';
import CockpitAudioControl from './CockpitAudioControl';
import { mainNavLinks } from '../../data/navigation';
import SoundManager from '../../utils/audio';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-lg py-2.5'
          : 'bg-background/40 backdrop-blur-sm border-b border-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Brand Monogram */}
          <MonogramLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {mainNavLinks.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                onClick={() => SoundManager.playClick()}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-md transition-colors tracking-wide ${
                    isActive
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-2 h-[2px] bg-primary rounded-full" />
                    )}
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>

          {/* Right Controls: Theme, Audio, Resume, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CockpitAudioControl />
            <ThemeSwitcher />

            <RouterNavLink
              to="/resume"
              onClick={() => SoundManager.playClick()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-mono text-xs font-semibold tracking-wider transition-all duration-200"
            >
              <FileText size={13} />
              <span>RESUME</span>
            </RouterNavLink>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => {
                SoundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg border border-border bg-surface text-text-primary hover:bg-surface-elevated transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-secondary px-3 py-1 border-b border-border mb-2">
            Navigation Menu
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {mainNavLinks.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                onClick={() => {
                  SoundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-mono text-xs transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-primary/15 text-primary font-bold border border-primary/30'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-[10px] opacity-40">→</span>
              </RouterNavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-border mt-3 flex items-center justify-between">
            <RouterNavLink
              to="/resume"
              onClick={() => {
                SoundManager.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-background font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-opacity"
            >
              <FileText size={14} />
              <span>VIEW RESUME & CREDENTIALS</span>
            </RouterNavLink>
          </div>
        </div>
      )}
    </header>
  );
}
