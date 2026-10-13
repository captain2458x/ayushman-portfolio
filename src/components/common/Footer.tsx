import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, Compass, ExternalLink } from 'lucide-react';
import MonogramLogo from './MonogramLogo';
import { profileData } from '../../data/profile';
import { mainNavLinks } from '../../data/navigation';
import SoundManager from '../../utils/audio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50 relative overflow-hidden mt-24">
      {/* Subtle Technical Coordinate Grid Background */}
      <div className="absolute inset-0 aerospace-grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <MonogramLogo />
            <p className="text-text-secondary text-sm max-w-md font-sans leading-relaxed">
              Aerospace engineering portfolio of {profileData.name}. Dedicated to computational aerodynamics, multirotor UAV dynamics, CAD design, and satellite orbital trajectory simulations.
            </p>
            <div className="font-mono text-xs text-text-secondary flex items-center gap-2">
              <Compass size={14} className="text-primary" />
              <span>{profileData.institution} · {profileData.location}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {mainNavLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => SoundManager.playClick()}
                    className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>▸</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Professional Profiles */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
              Connect
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Linkedin size={14} className="text-primary" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={10} className="opacity-60" />
                </a>
              </li>
              {profileData.github && (
                <li>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Github size={14} className="text-primary" />
                    <span>GitHub Repositories</span>
                    <ExternalLink size={10} className="opacity-60" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-primary" />
                  <span>{profileData.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-secondary">
          <p>© {currentYear} {profileData.name}. All engineering rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span>SYS.ONLINE: LEO_ORBIT_VALID</span>
            </span>
            <span>·</span>
            <span>B.Tech Aeronautical {profileData.classYear}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
