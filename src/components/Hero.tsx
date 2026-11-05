import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Sparkles, 
  FileDown, 
  Bot, 
  Flame,
  Code2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenBot: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenBot }) => {
  const { themeConfig } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = portfolioData.roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % portfolioData.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial gradient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: themeConfig.primary }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Availability Pill */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border mb-8 animate-float"
          style={{ borderColor: `${themeConfig.primary}40` }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: themeConfig.primary }}
            />
            <span 
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: themeConfig.primary }}
            />
          </span>
          <span className="text-xs font-mono tracking-wide text-zinc-300">
            Open to High-Impact Roles & Collaborations
          </span>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-white/10 text-zinc-400">
            Arya College • 2028
          </span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white max-w-4xl leading-[1.15]">
          Hi, I'm <span 
            className="text-glow underline decoration-wavy decoration-2"
            style={{ 
              color: themeConfig.primary,
              textDecorationColor: `${themeConfig.primary}60`
            }}
          >
            {portfolioData.name}
          </span>
        </h1>

        {/* Dynamic Typewriter Subheading */}
        <div className="h-12 sm:h-14 mt-4 flex items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl font-semibold">
          <span className="text-zinc-400 mr-2">&gt;</span>
          <span className="text-white font-mono">{displayText}</span>
          <span 
            className="w-2.5 h-7 ml-1 animate-pulse"
            style={{ backgroundColor: themeConfig.primary }}
          />
        </div>

        {/* Short Mission Bio */}
        <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans">
          {portfolioData.bio}
        </p>

        {/* Action Button Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          {/* Projects Button */}
          <a
            href="#projects"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              backgroundColor: themeConfig.primary,
              color: '#000',
              boxShadow: `0 0 25px ${themeConfig.glow}`,
            }}
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Launch Terminal CLI */}
          <button
            onClick={() => {
              sound.playTerminalBeep();
              onOpenTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-3 rounded-xl font-mono text-sm flex items-center gap-2 glass-panel border hover:bg-white/10 text-white transition-all duration-200"
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span>Launch CLI</span>
          </button>

          {/* AI Assistant Chat Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBot();
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 glass-panel border hover:bg-white/10 text-white transition-all duration-200"
            style={{ borderColor: `${themeConfig.secondary}50` }}
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>Ask AryanBot</span>
          </button>
        </div>

        {/* Bento Stats Row */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
          {portfolioData.aboutHighlights.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">{stat.label}</span>
                {idx === 0 && <Code2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />}
                {idx === 1 && <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />}
                {idx === 2 && <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />}
                {idx === 3 && <Bot className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />}
              </div>
              <div 
                className="text-2xl sm:text-3xl font-extrabold font-display"
                style={{ color: themeConfig.primary }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1 leading-snug">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
