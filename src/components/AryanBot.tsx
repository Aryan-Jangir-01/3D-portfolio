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

    if (q.includes('college') || q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('arya')) {
      return `Aryan is a 3rd-year B.Tech student specializing in Artificial Intelligence and Data Science at Arya College of Engineering & IT, Jaipur, with an expected graduation in 2028.`;
    }

    if (q.includes('stack') || q.includes('technolog') || q.includes('skills') || q.includes('language')) {
      return `Aryan's technical arsenal includes:\n• Languages: Python, C, C++, Java, JavaScript\n• Frontend: React.js, Tailwind CSS, HTML5, CSS3\n• Backend & APIs: FastAPI, Node.js, Express.js\n• Databases: MongoDB, Firebase, SQL\n• Domains & Tools: AI/ML, Deep Learning, Cybersecurity fundamentals, Git, GitHub, Linux, Arduino IoT.`;
    }

    if (q.includes('hire') || q.includes('why') || q.includes('about') || q.includes('goal')) {
      return `Aryan Jangir is an ambitious AI & Data Science engineer from Arya College, Jaipur (Class of 2028). He is passionate about building innovative, secure, and intelligent solutions, competing in national hackathons like SIH 2025, and eager to contribute to high-impact software engineering roles.`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('sih') || q.includes('hackathon')) {
      return `Aryan has engineered several impressive projects:\n1. 🏆 AI Internship Recommendation Engine (Smart India Hackathon - SIH 2025)\n2. 🔐 CryptoPay - Secure digital cryptocurrency payment platform\n3. 🧠 MindEase - AI mental wellness & sentiment analysis companion\n4. 📚 NoteShare - Collaborative student academic repository\n5. 👁️ Face Age Analysis - Computer Vision CNN deep learning model\n6. 🌱 Arduino Soil Moisture Detection - Smart agricultural IoT system\nExplore the Projects section for full interactive details!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('call')) {
      return `You can reach Aryan directly at:\n📧 Email: ${portfolioData.email}\n💼 LinkedIn: ${portfolioData.linkedin}\n🐙 GitHub: ${portfolioData.github}\nHe is actively open to collaborations, hackathons, and high-impact roles!`;
    }

    return `Aryan Jangir is an AI & Data Science undergrad at Arya College of Engineering & IT, Jaipur (2028). He specializes in AI/ML, Full-Stack development, and Cybersecurity. Feel free to ask about his SIH 2025 hackathon project, his skills, or reach out at ${portfolioData.email}!`;
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

