import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Palette, 
  Menu, 
  X, 
  Command, 
  Sparkles,
  Clock,
  Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onReplayLoader?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCommandPalette, onReplayLoader }) => {
  const { theme, setTheme, availableThemes, themeConfig } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(sound.isEnabled());
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live time in IST (India Standard Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = sound.toggle();
    setSoundActive(state);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'py-2.5 backdrop-blur-xl bg-black/40 border-b border-white/10' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg border transition-all duration-300 group-hover:scale-105"
            style={{ 
              borderColor: themeConfig.primary, 
              backgroundColor: `${themeConfig.primary}15`,
              color: themeConfig.primary,
              boxShadow: `0 0 15px ${themeConfig.glow}`
            }}
          >
            AJ
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-display font-bold text-base tracking-wide text-white">
              <span>ARYAN</span>
              <span style={{ color: themeConfig.primary }}>.DEV</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Available for hire</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="px-3.5 py-1 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          
          {/* Hologram Loader Trigger */}
          {onReplayLoader && (
            <button
              onClick={() => {
                sound.playClick();
                onReplayLoader();
              }}
              onMouseEnter={() => sound.playHover()}
              title="Show 3D Hologram Reveal Intro"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono text-rose-300 hover:text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]"
            >
              <Eye className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Hologram</span>
            </button>
          )}

          {/* Live IST clock */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime || 'IST'}</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => sound.playHover()}
            title="Command Palette (Ctrl + K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Cmd+K</span>
          </button>

          {/* Interactive Terminal Trigger */}
          <button
            onClick={() => {
              sound.playTerminalBeep();
              onOpenTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            title="Open Interactive Terminal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline font-mono">CLI</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.playHover()}
            title={soundActive ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all"
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Theme Selector Button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowThemePicker(!showThemePicker);
              }}
              onMouseEnter={() => sound.playHover()}
              title="Change Theme Palette"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all flex items-center gap-1"
            >
              <Palette className="w-4 h-4" style={{ color: themeConfig.primary }} />
            </button>

            {/* Theme Picker Dropdown */}
            {showThemePicker && (
              <div className="absolute right-0 mt-2 w-48 p-2 rounded-xl glass-panel shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-1 mb-1 border-b border-white/10">
                  Select Theme
                </div>
                {availableThemes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name as any);
                      setShowThemePicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      theme === t.name
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: t.primary }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] p-4 glass-panel border-b border-white/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {onReplayLoader && (
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onReplayLoader();
                }}
                className="px-4 py-2.5 rounded-lg text-sm text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 text-left transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Play Hologram 3D Intro</span>
              </button>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Time: {currentTime}
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="text-emerald-400 underline font-mono"
              >
                Open Terminal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
