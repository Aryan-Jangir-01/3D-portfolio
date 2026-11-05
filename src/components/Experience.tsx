import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export const Experience: React.FC = () => {
  const { themeConfig } = useTheme();

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      
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
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TRAJECTORY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Experience & <span style={{ color: themeConfig.primary }}>Impact</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Proven history of engineering resilient systems, leading development teams, and shipping production software.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-12">
        {portfolioData.experiences.map((exp, idx) => (
          <div 
            key={exp.id}
            onMouseEnter={() => sound.playHover()}
            className="relative pl-6 sm:pl-10 group"
          >
            {/* Timeline Node Icon */}
            <div 
              className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: '#0a0a0f',
                borderColor: themeConfig.primary,
                boxShadow: `0 0 10px ${themeConfig.glow}`,
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: themeConfig.primary }}
              />
            </div>

            {/* Card Content */}
            <div 
              className="glass-panel p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:border-cyan-500/40 group-hover:translate-x-1"
              style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-medium text-cyan-400">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description Bullets */}
              <div className="mt-4 space-y-2">
                {exp.description.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-zinc-500 mr-1">Stack:</span>
                {exp.technologies.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

