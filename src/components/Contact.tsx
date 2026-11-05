import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  MapPin, 
  Sparkles, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

export const Contact: React.FC = () => {
  const { themeConfig } = useTheme();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      sound.playSuccess();
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
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
          <Mail className="w-3.5 h-3.5" />
          <span>INITIATE HANDSHAKE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Let's Build Something <span style={{ color: themeConfig.primary }}>Iconic</span>
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          Have an exciting project, an open engineering role, or a visionary concept? Drop me a message or connect directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        
        {/* Left Side: Contact Info & Copy Email (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Quick Copy Email Card */}
          <div 
            onMouseEnter={() => sound.playHover()}
            className="glass-panel p-6 rounded-3xl border"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="text-xs font-mono text-zinc-400 mb-2">DIRECT COMMUNICATION</div>
            <div className="text-xl font-bold font-display text-white mb-4 break-all">
              {portfolioData.email}
            </div>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all"
              style={{
                borderColor: copied ? '#22c55e' : themeConfig.primary,
                backgroundColor: copied ? '#22c55e20' : `${themeConfig.primary}15`,
                color: copied ? '#4ade80' : themeConfig.primary,
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Availability Card */}
          <div 
            className="glass-panel p-6 rounded-3xl border space-y-4 text-xs"
            style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Location</div>
                <div className="text-zinc-400">{portfolioData.location} (Remote Friendly)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-purple-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Guaranteed Response</div>
                <div className="text-zinc-400">Under 24 hours guaranteed</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Security & Integrity</div>
                <div className="text-zinc-400">Spam-free direct mailbox</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Message Form (3 cols) */}
        <div 
          className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-3xl border"
          style={{ borderColor: `${themeConfig.primary}30` }}
        >
          {submitted ? (
            <div className="py-16 text-center space-y-4 animate-in fade-in">
              <div 
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border shadow-xl"
                style={{
                  backgroundColor: `${themeConfig.primary}20`,
                  borderColor: themeConfig.primary,
                  color: themeConfig.primary
                }}
              >
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Message Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
                Thank you for reaching out. I have received your message and will get back to you promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Project inquiry / Full-time role"
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono text-zinc-400">
                    MESSAGE DETAILS *
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {formState.message.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your goals, timelines, or role requirements..."
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                style={{
                  backgroundColor: themeConfig.primary,
                  boxShadow: `0 0 20px ${themeConfig.glow}`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Encrypting & Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
