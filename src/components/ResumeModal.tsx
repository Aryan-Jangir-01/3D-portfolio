import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Sparkles, 
  Eye, 
  CheckCircle2,
  Mail,
  MapPin
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';
import { portfolioData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<'ats' | 'pdf'>('ats');

  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playSuccess();
    const link = document.createElement('a');
    link.href = '/aryan_jangir_resume.pdf';
    link.download = 'Aryan_Jangir_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPdf = () => {
    sound.playClick();
    window.open('/aryan_jangir_resume.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-5xl max-h-[92vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl relative"
        style={{ borderColor: `${themeConfig.primary}40` }}
      >
        {/* Modal Top Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
              style={{
                borderColor: themeConfig.primary,
                backgroundColor: `${themeConfig.primary}15`,
                color: themeConfig.primary
              }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Curriculum Vitae
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  VERIFIED • 2026
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Aryan Jangir // AI & Data Science (Arya College)
              </p>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('ats');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all font-mono ${
                  activeTab === 'ats' 
                    ? 'bg-white/15 text-white font-semibold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ATS Interactive
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('pdf');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all font-mono flex items-center gap-1.5 ${
                  activeTab === 'pdf' 
                    ? 'bg-white/15 text-white font-semibold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PDF Document</span>
              </button>
            </div>

            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{
                backgroundColor: themeConfig.primary,
                color: '#000',
                boxShadow: `0 0 20px ${themeConfig.glow}`
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Download</span> PDF
            </button>

            {/* Open in Tab Button */}
            <button
              onClick={handleOpenPdf}
              onMouseEnter={() => sound.playHover()}
              title="Open raw PDF in new browser tab"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all hidden md:flex"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 text-zinc-400 hover:text-rose-300 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {activeTab === 'pdf' ? (
            /* Direct PDF Iframe Viewer */
            <div className="w-full h-[68vh] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner">
              <iframe 
                src="/aryan_jangir_resume.pdf#toolbar=1" 
                title="Aryan Jangir Official Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            /* ATS Interactive Resume View */
            <div className="max-w-4xl mx-auto space-y-7">
              {/* Top Contact Strip */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Aryan Jangir
                  </h1>
                  <p className="text-sm font-mono mt-1" style={{ color: themeConfig.primary }}>
                    B.Tech AI & Data Science Candidate • Smart India Hackathon (SIH 2025)
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-300">
                  <a 
                    href={`mailto:${portfolioData.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{portfolioData.email}</span>
                  </a>
                  <a 
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sky-400"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href={portfolioData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-purple-400"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Jaipur, Rajasthan</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Executive Summary</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
                  AI/ML internship candidate and B.Tech student in Artificial Intelligence and Data Science at Arya College of Engineering & IT with hands-on experience building academic web projects, games, and exploring AI-based solutions. Familiar with Python, frontend development, APIs, and databases. Interested in applying problem-solving and software development skills in an AI/ML or software engineering internship.
                </p>
              </div>

              {/* Education & Academic Performance */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Education & Academic Background</span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        B.Tech in Artificial Intelligence & Data Science
                      </h4>
                      <p className="text-sm text-zinc-400">
                        Arya College of Engineering & IT, Jaipur, Rajasthan
                      </p>
                      <p className="text-xs font-mono text-zinc-500 mt-1">
                        Specialization: AI, Machine Learning, Deep Learning & Web Systems
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Expected: 2028
                      </span>
                    </div>
                  </div>

                  {/* School Scores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-zinc-400">Senior Secondary (Class XII)</div>
                        <div className="text-sm font-semibold text-white">Secondary Board Exam</div>
                      </div>
                      <span className="text-base font-bold font-mono text-emerald-400">85%</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-zinc-400">Secondary (Class X)</div>
                        <div className="text-sm font-semibold text-white">Secondary Board Exam</div>
                      </div>
                      <span className="text-base font-bold font-mono text-cyan-400">80%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Breakdown */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Key Featured Projects</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kingdom of Shadows */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">Kingdom of Shadows</h5>
                      <a 
                        href="https://aryan-jangir-01.github.io/Kingdom-of-Shadows/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Live Game</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Epic 2D Dark Fantasy Action Platformer built with HTML5 Canvas, modern JS physics, active powers (Light Dash, Solar Blast, Shield), and Malakor boss battle.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['JavaScript', 'HTML5 Canvas', 'Game Dev', 'PWA'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DOC Verify */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">DOC Verify</h5>
                      <a 
                        href="https://xking8544-droid.github.io/DOC_verify/#home" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Live Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Web-based digital certificate verification portal providing instant academic credential validation and tamper detection.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['React.js', 'Verification', 'Web Security'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SIH 2025 AI Recommendation */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">SIH 2025 AI Internship Engine</h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        SIH 2025
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Algorithmic matching system analyzing candidate profiles to recommend hyper-relevant internship placements and skill-gap solutions.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Python', 'FastAPI', 'React', 'MongoDB'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CryptoPay */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">CryptoPay</h5>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        Fintech
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Freelance payment platform facilitating secure international cryptocurrency payments with integrated Firebase backend workflows.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['React.js', 'Firebase', 'Web3', 'Node.js'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Technical Skills</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs font-bold text-cyan-400 font-mono mb-1">Languages</div>
                    <div className="text-xs text-zinc-300 leading-relaxed">
                      Python, C, C++, Java, JavaScript
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs font-bold text-purple-400 font-mono mb-1">Frontend</div>
                    <div className="text-xs text-zinc-300 leading-relaxed">
                      HTML, CSS, React.js, Tailwind CSS
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs font-bold text-emerald-400 font-mono mb-1">Backend & APIs</div>
                    <div className="text-xs text-zinc-300 leading-relaxed">
                      FastAPI, REST API concepts, Express.js
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs font-bold text-amber-400 font-mono mb-1">Database & Tools</div>
                    <div className="text-xs text-zinc-300 leading-relaxed">
                      MongoDB, Firebase, Git, GitHub, VS Code, ChatGPT, Gemini
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 sm:px-8 py-3.5 border-t border-white/10 bg-black/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ready for AI/ML & Software Engineering Internships</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="text-white hover:underline flex items-center gap-1 font-semibold"
              style={{ color: themeConfig.primary }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF (aryan_jangir_resume.pdf)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
