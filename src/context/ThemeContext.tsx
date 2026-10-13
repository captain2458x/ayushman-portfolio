import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId } from '../types';
import SoundManager from '../utils/audio';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  availableThemes: { id: ThemeId; name: string; color: string; badge: string }[];
}

const THEMES: { id: ThemeId; name: string; color: string; badge: string }[] = [
  { id: 'deep-space', name: 'Deep Space', color: '#38BDF8', badge: 'DEEP SPACE' },
  { id: 'midnight-violet', name: 'Midnight Violet', color: '#A78BFA', badge: 'VIOLET' },
  { id: 'aerospace-light', name: 'Aerospace Light', color: '#0284C7', badge: 'LIGHT LAB' }
];

const STORAGE_KEY = 'ayushman_aerospace_theme_v2';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId;
      if (saved && (saved === 'deep-space' || saved === 'midnight-violet' || saved === 'aerospace-light')) {
        return saved;
      }
    } catch {
      // Fallback
    }
    // Always default to Deep Space dark aerospace theme
    return 'deep-space';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeId) => {
    SoundManager.playClick();
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
