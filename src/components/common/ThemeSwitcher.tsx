import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import SoundManager from '../../utils/audio';

export default function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = availableThemes.find(t => t.id === theme) || availableThemes[0];

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          SoundManager.playClick();
          setIsOpen(!isOpen);
        }}
        aria-label="Select website theme"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-surface hover:bg-surface-elevated hover:border-primary/50 text-text-primary text-xs transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span 
          className="w-2.5 h-2.5 rounded-full border border-border shrink-0 shadow-sm"
          style={{ backgroundColor: currentThemeObj.color }}
        />
        <span className="hidden sm:inline font-mono text-[11px] font-medium tracking-wider">
          {currentThemeObj.badge}
        </span>
        <Palette size={13} className="text-text-secondary" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-border shadow-2xl backdrop-blur-md p-1.5 z-50 animate-in fade-in duration-150"
          role="menu"
        >
          <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-text-secondary border-b border-border mb-1">
            Visual Theme
          </div>

          {availableThemes.map((t) => {
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                role="menuitem"
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0 border border-border" 
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="font-sans text-xs">{t.name}</span>
                </div>
                {isActive && <Check size={13} className="text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
