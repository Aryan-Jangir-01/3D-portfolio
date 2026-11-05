import React, { useState } from 'react';
import { 
  Cpu, 
  Layout, 
  Server, 
  Cloud, 
  Layers, 
  Search, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export const Skills: React.FC = () => {
  const { themeConfig } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Mastery': <Layout className="w-4 h-4 text-cyan-400" />,
    'Backend & Systems': <Server className="w-4 h-4 text-emerald-400" />,
    'DevOps & Cloud': <Cloud className="w-4 h-4 text-purple-400" />,
    'AI & Emerging Tech': <Cpu className="w-4 h-4 text-amber-400" />,
  };

  const allSkills = portfolioData.skills.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.name }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
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
          <Layers className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Skills & <span style={{ color: themeConfig.primary }}>Proficiencies</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          A battle-tested toolkit designed for building high-performance distributed backends, rich interactive frontends, and AI workflows.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel">
          <button
            onClick={() => {
              sound.playClick();
              setActiveCategory('All');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCategory === 'All'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Tech ({allSkills.length})
          </button>
          {portfolioData.skills.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.name);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.name
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {categoryIcons[cat.name]}
              <span>{cat.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech stack..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group"
            style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                {skill.name}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-white">
                {skill.level}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: themeConfig.primary,
                  boxShadow: `0 0 10px ${themeConfig.glow}`,
                }}
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
              {skill.description}
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Production Tested
              </span>
              <span>{skill.category.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-zinc-500 text-sm">
          No skills found matching "{searchQuery}"
        </div>
      )}
    </section>
  );
};
