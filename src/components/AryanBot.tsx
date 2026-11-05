import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  User, 
  ArrowUpRight 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface AryanBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const AryanBot: React.FC<AryanBotProps> = ({ isOpen, onClose, onOpen }) => {
  const { themeConfig } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I'm AryanBot, Aryan Jangir's AI portfolio companion. Ask me anything about his technical stack, architecture philosophy, projects, or hire availability!`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What is Aryan's tech stack?",
    "Why should we hire Aryan?",
    "Tell me about his top projects",
    "How can I contact Aryan?",
  ];

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('stack') || q.includes('technolog') || q.includes('skills')) {
      return `Aryan specializes in Full-Stack development and AI systems:\n• Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js\n• Backend: Node.js, Express, Python (FastAPI), PostgreSQL, Redis\n• Cloud & DevOps: Docker, AWS, Cloudflare, CI/CD\n• AI/ML: LangChain, Vector DBs, Prompt Engineering.`;
    }

    if (q.includes('hire') || q.includes('why') || q.includes('experience')) {
      return `Here is why teams love working with Aryan:\n1. 3+ years experience engineering resilient systems with 99+ Lighthouse performance scores.\n2. Strong architectural ownership from system design to pixel-perfect UI execution.\n3. Passion for clean, tested code and fast delivery without tech debt.\n4. Available for full-time roles & high-impact contracts!`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      return `Aryan has built several flagship projects:\n1. NexusAI: Autonomous multi-agent workspace with streaming SSE.\n2. HyperForge: Interactive cloud topology visualizer that generates Terraform code.\n3. Chronos OS: In-browser UNIX desktop with virtual filesystem.\nCheck out the Featured Creations section above for complete case studies!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('call')) {
      return `You can reach Aryan directly at:\n📧 Email: ${portfolioData.email}\n💼 LinkedIn: ${portfolioData.linkedin}\n🐙 GitHub: ${portfolioData.github}\nHe typically responds within 24 hours!`;
    }

    return `Aryan is a passionate Full-Stack Engineer and Creative Developer based in India. He focuses on building high-performance web applications and resilient systems. Feel free to reach out to him directly at ${portfolioData.email}!`;
  };

  const handleSend = (textToSend?: string) => {
    const msgText = (textToSend || input).trim();
    if (!msgText) return;

    sound.playClick();

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      sound.playHover();
      const botReply: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: generateAnswer(msgText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Orb */}
      {!isOpen && (
        <button
          onClick={() => {
            sound.playClick();
            onOpen();
          }}
          onMouseEnter={() => sound.playHover()}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass-panel border shadow-2xl transition-all duration-300 hover:scale-110 group"
          style={{ 
            borderColor: themeConfig.primary,
            boxShadow: `0 0 20px ${themeConfig.glow}`
          }}
          title="Chat with AryanBot AI"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span 
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: themeConfig.primary }}
            />
            <span 
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: themeConfig.primary }}
            />
          </div>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl glass-panel shadow-2xl border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200"
          style={{ borderColor: `${themeConfig.primary}60` }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${themeConfig.primary}20`,
                  borderColor: themeConfig.primary,
                  color: themeConfig.primary
                }}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  AryanBot
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                    AI
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">Always online • Ask me anything</div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: `${themeConfig.primary}30` }}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-white/10 text-zinc-200 border border-white/10 rounded-tl-none'
                  }`}
                  style={{
                    backgroundColor: m.sender === 'user' ? themeConfig.primary : undefined,
                    color: m.sender === 'user' ? '#000000' : undefined,
                  }}
                >
                  {m.text}
                  <div className="text-[9px] opacity-60 mt-1 text-right font-mono">
                    {m.timestamp}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-zinc-400 text-xs italic">
                <Bot className="w-4 h-4 animate-spin" />
                <span>AryanBot is thinking...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-white/5 bg-white/[0.02] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                onMouseEnter={() => sound.playHover()}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl text-black font-semibold disabled:opacity-40 transition-transform active:scale-95"
              style={{ backgroundColor: themeConfig.primary }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

