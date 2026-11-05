import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { SocialDock } from './components/SocialDock';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { CommandPalette } from './components/CommandPalette';
import { AryanBot } from './components/AryanBot';
import { ParticleLoader } from './components/ParticleLoader';

export const AppContent: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [botOpen, setBotOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-100 cyber-grid overflow-x-hidden">
      {/* Cinematic 3D Hologram Particle Loader & Reveal Screen */}
      <ParticleLoader 
        isOpen={showLoader} 
        onComplete={() => setShowLoader(false)} 
      />

      {/* 60fps Interactive Starfield Canvas Background */}
      <StarfieldCanvas />

      {/* Futuristic Trailing Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onReplayLoader={() => setShowLoader(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero 
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenBot={() => setBotOpen(true)}
        />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Bottom Floating Social Dock */}
      <SocialDock 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onReplayLoader={() => setShowLoader(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive AryanOS Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Keyboard Command Palette (Ctrl+K) */}
      <CommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onReplayLoader={() => setShowLoader(true)}
      />

      {/* AI Assistant Widget (AryanBot) */}
      <AryanBot 
        isOpen={botOpen}
        onClose={() => setBotOpen(false)}
        onOpen={() => setBotOpen(true)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
