import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { sound } from '../utils/sound';

interface ThemeConfig {
  name: string;
  label: string;
  bg: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  glow: string;
  particleColor: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  neon: {
    name: 'neon',
    label: 'Cyber Neon',
    bg: '#080811',
    card: 'rgba(16, 17, 34, 0.75)',
    border: 'rgba(56, 189, 248, 0.2)',
    primary: '#06b6d4', // cyan-500
    secondary: '#8b5cf6', // violet-500
    accent: '#38bdf8', // sky-400
    text: '#f1f5f9',
    muted: '#94a3b8',
    glow: 'rgba(6, 182, 212, 0.5)',
    particleColor: '#06b6d4'
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk 2077',
    bg: '#0a0904',
    card: 'rgba(28, 23, 10, 0.8)',
    border: 'rgba(250, 204, 21, 0.3)',
    primary: '#facc15', // yellow-400
    secondary: '#ec4899', // pink-500
    accent: '#06b6d4', // cyan-500
    text: '#fef08a',
    muted: '#a1a1aa',
    glow: 'rgba(250, 204, 21, 0.6)',
    particleColor: '#facc15'
  },
  matrix: {
    name: 'matrix',
    label: 'Matrix Hacker',
    bg: '#030a05',
    card: 'rgba(5, 26, 12, 0.8)',
    border: 'rgba(34, 197, 94, 0.25)',
    primary: '#22c55e', // green-500
    secondary: '#10b981', // emerald-500
    accent: '#4ade80', // green-400
    text: '#dcfce7',
    muted: '#86efac',
    glow: 'rgba(34, 197, 94, 0.55)',
    particleColor: '#22c55e'
  },
  synthwave: {
    name: 'synthwave',
    label: 'Synthwave 84',
    bg: '#130421',
    card: 'rgba(36, 12, 58, 0.78)',
    border: 'rgba(244, 63, 94, 0.3)',
    primary: '#f43f5e', // rose-500
    secondary: '#a855f7', // purple-500
    accent: '#fb7185', // rose-400
    text: '#ffe4e6',
    muted: '#cbd5e1',
    glow: 'rgba(244, 63, 94, 0.55)',
    particleColor: '#f43f5e'
  },
  obsidian: {
    name: 'obsidian',
    label: 'Deep Obsidian',
    bg: '#080808',
    card: 'rgba(20, 20, 22, 0.82)',
    border: 'rgba(255, 255, 255, 0.12)',
    primary: '#e2e8f0', // slate-200
    secondary: '#94a3b8', // slate-400
    accent: '#38bdf8', // sky-400
    text: '#f8fafc',
    muted: '#94a3b8',
    glow: 'rgba(255, 255, 255, 0.3)',
    particleColor: '#94a3b8'
  }
};

interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio_theme') as ThemeMode;
    return saved && THEMES[saved] ? saved : 'neon';
  });

  const applyThemeVariables = (themeKey: ThemeMode) => {
    const conf = THEMES[themeKey];
    const root = document.documentElement;
    root.style.setProperty('--color-bg', conf.bg);
    root.style.setProperty('--color-card', conf.card);
    root.style.setProperty('--color-border', conf.border);
    root.style.setProperty('--color-primary', conf.primary);
    root.style.setProperty('--color-secondary', conf.secondary);
    root.style.setProperty('--color-accent', conf.accent);
    root.style.setProperty('--color-text', conf.text);
    root.style.setProperty('--color-muted', conf.muted);
    root.style.setProperty('--color-glow', conf.glow);
    document.body.style.backgroundColor = conf.bg;
  };

  useEffect(() => {
    applyThemeVariables(theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    sound.playClick();
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: THEMES[theme],
        setTheme,
        availableThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
