import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Palette, 
  FolderGit2, 
  Sparkles, 
  FileText, 
  Mail, 
  Briefcase, 
  Layers,
  ArrowRight,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';
import { portfolioData } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onReplayLoader?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Themes';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose, 
  onOpenTerminal,
  onReplayLoader 
}) => {
  const { setTheme, availableThemes, themeConfig } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger confetti celebration
  const triggerConfetti = () => {
    sound.playSuccess();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const commands: CommandItem[] = [
    // Hologram Loader
    ...(onReplayLoader
      ? [
          {
            id: 'act-hologram',
            title: 'Play 3D Hologram Reveal Intro',
            subtitle: 'Replay the futuristic particle point-cloud loader',
            category: 'Actions' as const,
            icon: <Eye className="w-4 h-4 text-rose-400" />,
            action: () => {
              onClose();
              onReplayLoader();
            },
          },
        ]
      : []),

    // Navigation
    {
      id: 'nav-about',
      title: 'Go to About Section',
      subtitle: 'Read personal bio, philosophies, and career highlights',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills Universe',
      subtitle: 'Frontend, Backend, DevOps & AI skills matrix',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Browse Featured Projects',
      subtitle: 'Interactive project case studies & live demos',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'nav-experience',
      title: 'View Career Milestones',
      subtitle: 'Work history, leadership, and open-source contributions',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-yellow-400" />,
      action: () => {
        window.location.hash = '#experience';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Get In Touch',
      subtitle: 'Send message, copy email, or connect socially',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },

    // Actions
    {
      id: 'act-terminal',
      title: 'Launch AryanOS Terminal',
      subtitle: 'Interactive CLI shell with secret commands',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'act-sound',
      title: 'Toggle Sound FX',
      subtitle: sound.isEnabled() ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects',
      category: 'Actions',
      icon: sound.isEnabled() ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        sound.toggle();
        onClose();
      },
    },
    {
      id: 'act-resume',
      title: 'Download Resume / CV',
      subtitle: 'Save a PDF copy of my latest credentials',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => {
        sound.playSuccess();
        window.open(`mailto:${portfolioData.email}?subject=Resume Request - Aryan Jangir`, '_blank');
        onClose();
      },
    },
    {
      id: 'act-confetti',
      title: 'Celebrate with Confetti 🎉',
      subtitle: 'Blast an interactive confetti particle storm',
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
      action: () => {
        triggerConfetti();
        onClose();
      },
    },

    // Themes
    ...availableThemes.map((t) => ({
      id: `theme-${t.name}`,
      title: `Switch Theme: ${t.label}`,
      subtitle: `Apply ${t.label} palette across the entire portfolio`,
      category: 'Themes' as const,
      icon: <Palette className="w-4 h-4" style={{ color: t.primary }} />,
      action: () => {
        setTheme(t.name as any);
        onClose();
      },
    })),
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl glass-panel shadow-2xl border overflow-hidden flex flex-col max-h-[80vh]"
        style={{ borderColor: `${themeConfig.primary}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections... (e.g. hologram, projects, terminal)"
            className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 text-sm font-sans"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="overflow-y-auto p-2 divide-y divide-white/5">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              No matching commands found for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    sound.playClick();
                    cmd.action();
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setSelectedIndex(idx);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-white/15 text-white'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                  style={{
                    borderLeft: isSelected ? `3px solid ${themeConfig.primary}` : '3px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {cmd.title}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 font-mono">
                          {cmd.category}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 font-sans">{cmd.subtitle}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-zinc-400 animate-pulse" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Aryan Jangir • Portfolio v1.0</span>
        </div>
      </div>
    </div>
  );
};
