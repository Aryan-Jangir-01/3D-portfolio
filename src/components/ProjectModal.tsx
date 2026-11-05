import React from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { themeConfig } = useTheme();

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] rounded-3xl glass-panel shadow-2xl border flex flex-col overflow-hidden"
        style={{ borderColor: `${themeConfig.primary}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{ 
                borderColor: `${themeConfig.primary}50`,
                backgroundColor: `${themeConfig.primary}15`,
                color: themeConfig.primary 
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Build
              </span>
            )}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
              {project.title}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Metric Highlight */}
          {project.metrics && (
            <div 
              className="p-4 rounded-2xl border flex items-center gap-3.5 bg-white/[0.03]"
              style={{ borderColor: `${themeConfig.primary}30` }}
            >
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-xs font-mono text-zinc-400">ENGINEERING BENCHMARK</div>
                <div className="text-sm font-semibold text-white">{project.metrics}</div>
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Architectural Highlights & Capabilities
            </h4>
            <div className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/15 text-white flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-4 py-2 rounded-xl text-xs font-medium text-black flex items-center gap-2 transition-all hover:scale-105 shadow-md"
                style={{ backgroundColor: themeConfig.primary }}
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-xs font-mono text-zinc-400 hover:text-white"
          >
            Press ESC or Close
          </button>
        </div>
      </div>
    </div>
  );
};
