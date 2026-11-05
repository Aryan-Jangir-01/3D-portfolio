import React from 'react';
import { 
  Mail, 
  Terminal, 
  Command, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface SocialDockProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const SocialDock: React.FC<SocialDockProps> = ({ onOpenTerminal, onOpenCommandPalette }) => {
  const { themeConfig } = useTheme();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const blastConfetti = () => {
    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.9 },
    });
  };

  const dockItems = [
    {
      label: 'GitHub',
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => window.open(portfolioData.github, '_blank'),
    },
    {
      label: 'LinkedIn',
      icon: <LinkedinIcon className="w-4 h-4" />,
      action: () => window.open(portfolioData.linkedin, '_blank'),
    },
    {
      label: 'Email Me',
      icon: <Mail className="w-4 h-4" />,
      action: () => window.open(`mailto:${portfolioData.email}`, '_blank'),
    },
    {
      label: 'CLI Terminal',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: onOpenTerminal,
    },
    {
      label: 'Command Palette',
      icon: <Command className="w-4 h-4 text-cyan-400" />,
      action: onOpenCommandPalette,
    },
    {
      label: 'Confetti!',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: blastConfetti,
    },
    {
      label: 'Top',
      icon: <ArrowUp className="w-4 h-4 text-zinc-300" />,
      action: scrollToTop,
    },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:block">
      <div 
        className="glass-panel px-3 py-2 rounded-2xl border flex items-center gap-1.5 shadow-2xl backdrop-blur-2xl"
        style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
      >
        {dockItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              item.action();
            }}
            onMouseEnter={() => sound.playHover()}
            title={item.label}
            className="p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-125 flex items-center justify-center relative group"
          >
            {item.icon}

            {/* Tooltip on hover */}
            <span className="absolute -top-8 px-2 py-0.5 rounded-md bg-black/80 border border-white/10 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
