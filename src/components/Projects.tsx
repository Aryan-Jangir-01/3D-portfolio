import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';
import { ProjectModal } from './ProjectModal';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const { themeConfig } = useTheme();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate tilt angles (-7 to +7 degrees)
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sound.playHover()}
      onClick={() => {
        sound.playClick();
        onSelect(project);
      }}
      className="glass-panel p-6 sm:p-7 rounded-3xl border flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden"
      style={{
        borderColor: 'rgba(255, 255, 255, 0.08)',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      {/* Corner Glow Accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: themeConfig.primary }}
      />

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span 
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: `${themeConfig.primary}40`,
                backgroundColor: `${themeConfig.primary}10`,
                color: themeConfig.primary,
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>

          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-cyan-400/50 group-hover:scale-110 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-2.5">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Performance Metric Badge */}
        {project.metrics && (
          <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{project.metrics}</span>
          </div>
        )}
      </div>

      {/* Tech tags */}
      <div>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { themeConfig } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Game Dev', 'AI / ML', 'Systems / Web3'];

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border"
          style={{ 
            borderColor: `${themeConfig.primary}40`,
            color: themeConfig.primary,
            backgroundColor: `${themeConfig.primary}10`
          }}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION BUILDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Featured <span style={{ color: themeConfig.primary }}>Creations</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          A showcase of scalable web applications, autonomous AI orchestrators, and performance-critical systems. Click any card to inspect full architecture details.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-white/20 text-white border border-white/20 shadow-sm'
                : 'text-zinc-400 hover:text-white glass-panel'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => setActiveModalProject(p)}
          />
        ))}
      </div>

      {/* Modal Drawer */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
