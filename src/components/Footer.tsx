import React from 'react';
import { 
  Terminal, 
  Heart, 
  Mail, 
  Sparkles, 
  ArrowUp 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const { themeConfig, theme } = useTheme();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black/60 pt-16 pb-24 md:pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: themeConfig.primary }}
            />
            <span className="font-display font-bold text-white tracking-wide">
              ARYAN JANGIR
            </span>
            <span className="text-zinc-500 font-mono text-xs">/ {portfolioData.title}</span>
          </div>

          <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
            <span>Built with React 19, TypeScript & Tailwind</span>
            <span>•</span>
            <span className="text-emerald-400">All systems nominal</span>
          </div>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <span>Active Theme: <strong className="text-zinc-300 uppercase">{theme}</strong></span>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
