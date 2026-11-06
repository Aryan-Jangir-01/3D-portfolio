import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';
import { ThemeMode } from '../types';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
  isHtml?: boolean;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const { setTheme, themeConfig } = useTheme();
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'AryanOS v3.4.0 (x86_64-pc-browser-gnu)',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to see available commands, or "sudo hire" for a surprise.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playTerminalBeep();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const newLines: OutputLine[] = [
      { id: Math.random().toString(), type: 'input', text: `aryan@terminal:~$ ${cmd}` },
    ];

    const [action, ...args] = cmd.split(' ');
    const lowerAction = action.toLowerCase();

    switch (lowerAction) {
      case 'help':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help            - Display this manual
  about           - Short biography & engineering philosophy
  skills          - Breakdown of technical proficiencies
  projects        - List shipped projects with tech stacks
  contact         - Reach out via email, GitHub & LinkedIn
  theme <name>    - Change theme: neon, cyberpunk, matrix, synthwave, obsidian
  sound           - Toggle sound synthesizer ON/OFF
  cat resume.txt  - Print summarized credentials
  sudo hire       - Fast-track recruiter authorization (Easter Egg!)
  clear           - Clear terminal viewport
  matrix          - Set theme to matrix green
  exit            - Close this terminal modal`,
        });
        break;

      case 'about':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Aryan Jangir (${portfolioData.title})
Location: ${portfolioData.location}
Bio: ${portfolioData.bio}

"Performance is not an afterthought; it's a fundamental feature."`,
        });
        break;

      case 'skills':
        const skillsText = portfolioData.skills
          .map((cat) => `[${cat.name}]\n` + cat.skills.map((s) => `  • ${s.name} [${s.level}%] - ${s.description}`).join('\n'))
          .join('\n\n');
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: skillsText,
        });
        break;

      case 'projects':
        const projText = portfolioData.projects
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.category})\n   Tags: ${p.tags.join(', ')}\n   Metric: ${p.metrics || 'Production ready'}`)
          .join('\n\n');
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: projText,
        });
        break;

      case 'contact':
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Email:    ${portfolioData.email}
GitHub:   ${portfolioData.github}
LinkedIn: ${portfolioData.linkedin}
Twitter:  ${portfolioData.twitter || 'N/A'}`,
        });
        break;

      case 'theme':
        const requested = args[0]?.toLowerCase() as ThemeMode;
        const validThemes: ThemeMode[] = ['neon', 'cyberpunk', 'matrix', 'synthwave', 'obsidian'];
        if (validThemes.includes(requested)) {
          setTheme(requested);
          newLines.push({
            id: Math.random().toString(),
            type: 'output',
            text: `[SUCCESS] Theme updated to "${requested}".`,
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: 'error',
            text: `Invalid theme. Available options: ${validThemes.join(', ')}`,
          });
        }
        break;

      case 'matrix':
        setTheme('matrix');
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `[SYSTEM] Matrix subroutines engaged. Welcome to the construct, Neo.`,
        });
        break;

      case 'sound':
        const state = sound.toggle();
        newLines.push({
          id: Math.random().toString(),
          type: 'output',
          text: `Sound FX is now ${state ? 'ENABLED' : 'MUTED'}.`,
        });
        break;

      case 'sudo':
        if (args[0] === 'hire' || args[0] === 'hire-me') {
          sound.playSuccess();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
          });
          newLines.push({
            id: Math.random().toString(),
            type: 'output',
            text: `[PERMISSION GRANTED] 🚀
Congratulations! You've unlocked the executive hiring terminal.
Aryan Jangir is ready to build impactful systems with your team.
Direct Email: ${portfolioData.email}
(Sending an email or booking a call now!)`,
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: 'error',
            text: `aryan is not in the sudoers file. This incident will be reported. Try "sudo hire".`,
          });
        }
        break;

      case 'cat':
        if (args[0] === 'resume.txt' || args[0] === 'resume') {
          newLines.push({
            id: Math.random().toString(),
            type: 'output',
            text: `------------------------------------------------------------
OFFICIAL RESUME SUMMARY: ARYAN JANGIR
Specialization: B.Tech in AI & Data Science (Arya College, Jaipur • 2028)
Academics: Senior Secondary (XII): 85% | Secondary (X): 80%
Email: ${portfolioData.email}
GitHub: ${portfolioData.github}
LinkedIn: ${portfolioData.linkedin}

KEY PROJECTS:
1. Kingdom of Shadows - 2D Action Platformer (aryan-jangir-01.github.io/Kingdom-of-Shadows/)
2. DOC Verify - Certificate Verification Portal (xking8544-droid.github.io/DOC_verify/#home)
3. SIH 2025 - AI Internship Recommendation Engine
4. CryptoPay - Freelance Cryptocurrency Payment Platform
5. NoteShare - Educational Notes-Sharing Platform

Download full verified PDF: /aryan_jangir_resume.pdf
------------------------------------------------------------`,
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: 'error',
            text: `cat: ${args[0] || ''}: No such file or directory. Try: cat resume.txt`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: `command not found: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl h-[560px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden border font-mono text-xs sm:text-sm"
        style={{ borderColor: `${themeConfig.primary}60` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:opacity-80 transition"
              title="Close"
            />
            <button 
              className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:opacity-80 transition"
              title="Minimize"
            />
            <button 
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:opacity-80 transition"
              title="Maximize"
            />
            <span className="ml-3 text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              aryan@AryanOS: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSuccess();
                handleCommand('sudo hire');
              }}
              className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 text-[11px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              sudo hire
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#090a0f]/90 text-zinc-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap leading-relaxed">
              {line.type === 'input' && (
                <span className="text-cyan-400 font-semibold">{line.text}</span>
              )}
              {line.type === 'system' && (
                <span className="text-zinc-500">{line.text}</span>
              )}
              {line.type === 'output' && (
                <span className="text-emerald-300/90">{line.text}</span>
              )}
              {line.type === 'error' && (
                <span className="text-rose-400">{line.text}</span>
              )}
            </div>
          ))}

          {/* Active Command Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-cyan-400 font-bold">aryan@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyan-400 text-xs sm:text-sm"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-1.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Type <span className="text-cyan-400 font-bold">help</span> for commands</span>
          <span>Tab completion enabled</span>
        </div>
      </div>
    </div>
  );
};

