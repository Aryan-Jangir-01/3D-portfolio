import React from 'react';
import { 
  FileText, 
  MapPin, 
  CheckCircle2, 
  Headphones, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface AboutProps {
  onOpenResume?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { themeConfig } = useTheme();

  const handleResumeClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
    });
    if (onOpenResume) {
      onOpenResume();
    } else {
      window.open('/aryan_jangir_resume.pdf', '_blank');
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border"
          style={{ 
            borderColor: `${themeConfig.primary}40`,
            color: themeConfig.primary,
            backgroundColor: `${themeConfig.primary}10`
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ORIGIN & PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Architecting Systems with <span style={{ color: themeConfig.primary }}>Passion</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          From deep-dive backend optimization to fluid front-end animations, here is a glimpse into how I turn ideas into production reality.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Main Bio Card (Spans 2 cols) */}
        <div 
          onMouseEnter={() => sound.playHover()}
          className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {portfolioData.location}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-4">
              Building Intelligent, Secure & Impactful Technology.
            </h3>

            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              I am a third-year B.Tech student specializing in <strong className="text-white">Artificial Intelligence and Data Science</strong> at <strong className="text-white">Arya College of Engineering & IT, Jaipur</strong> (Class of 2028). Passionate technology enthusiast, developer, and aspiring AI/ML and Cybersecurity professional.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              From engineering our <strong className="text-white">AI-Based Internship Recommendation Engine for Smart India Hackathon (SIH 2025)</strong> to building secure fintech platforms like CryptoPay, NoteShare, MindEase, and computer vision systems, I thrive on participating in hackathons, learning emerging technologies, and solving real-world challenges through creative coding.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/aryan_avatar_formal.png"
                alt="Aryan Jangir"
                className="w-11 h-11 rounded-full object-cover border-2 shadow-lg"
                style={{ borderColor: themeConfig.primary }}
              />
              <div className="text-xs">
                <div className="text-white font-bold text-sm">Aryan Jangir</div>
                <div className="text-zinc-400">{portfolioData.title}</div>
              </div>
            </div>

            <button
              onClick={handleResumeClick}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 hover:bg-white/10 text-white transition-all"
              style={{ borderColor: themeConfig.primary, color: themeConfig.primary }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Full CV</span>
            </button>
          </div>
        </div>

        {/* Live Music / Spotify Vibe Card */}
        <div 
          onMouseEnter={() => sound.playHover()}
          className="glass-panel p-6 rounded-3xl border flex flex-col justify-between"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-purple-400" />
                VIBE & FOCUS
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-3 bg-cyan-400 animate-pulse" />
                <span className="w-1 h-5 bg-purple-400 animate-pulse delay-75" />
                <span className="w-1 h-2 bg-emerald-400 animate-pulse delay-150" />
              </span>
            </div>

            <div className="text-lg font-bold text-white mb-1">
              Cyberpunk Synth & Lo-Fi Beats
            </div>
            <div className="text-xs text-zinc-400">
              Fueling deep work sessions and late night builds.
            </div>
          </div>

          <div className="mt-6 p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="overflow-hidden text-xs">
              <div className="text-white font-medium truncate">Flow State Mode</div>
              <div className="text-zinc-500 text-[11px]">120 BPM • Coding Mix</div>
            </div>
          </div>
        </div>

        {/* Developer Mindset / Code Terminal Card */}
        <div 
          onMouseEnter={() => sound.playHover()}
          className="glass-panel p-6 rounded-3xl border flex flex-col justify-between font-mono"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-zinc-500 ml-2">aryan.config.ts</span>
            </div>

            <div className="text-[12px] text-zinc-300 leading-relaxed overflow-x-auto space-y-1">
              <span className="text-purple-400">const</span> developer = &#123;
              <div className="pl-3">
                <span className="text-cyan-400">name</span>: <span className="text-emerald-300">"{portfolioData.name}"</span>,
              </div>
              <div className="pl-3">
                <span className="text-cyan-400">focus</span>: <span className="text-emerald-300">"Full-Stack & AI"</span>,
              </div>
              <div className="pl-3">
                <span className="text-cyan-400">mindset</span>: <span className="text-amber-300">"Ship & Iterate"</span>,
              </div>
              <div className="pl-3">
                <span className="text-cyan-400">coffeeLevel</span>: <span className="text-purple-400">99.9</span>
              </div>
              &#125;;
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>// Zero compile warnings</span>
            <span className="text-emerald-400">✔ Ready</span>
          </div>
        </div>

        {/* Core Philosophies (Spans 4 cols on large screens) */}
        <div 
          className="md:col-span-3 lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border"
          style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
        >
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Guiding Principles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.philosophies.map((philo, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono mb-3"
                  style={{ 
                    backgroundColor: `${themeConfig.primary}20`,
                    color: themeConfig.primary 
                  }}
                >
                  0{idx + 1}
                </div>
                <p className="text-zinc-200 text-sm font-medium leading-relaxed">
                  "{philo}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
