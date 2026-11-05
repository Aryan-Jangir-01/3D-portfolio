import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowDown, RotateCcw, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface Particle {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

interface ParticleLoaderProps {
  onComplete: () => void;
  isOpen: boolean;
}

export const ParticleLoader: React.FC<ParticleLoaderProps> = ({ onComplete, isOpen }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 100 });
  const animFrameRef = useRef<number | null>(null);

  // 1. Initial 0 to 100 Circular Counter
  useEffect(() => {
    if (!isOpen) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setLoadingProgress(current);

      if (current % 12 === 0) {
        sound.playTick();
      }

      if (current >= 100) {
        clearInterval(interval);
        sound.playSuccess();
        setTimeout(() => {
          setIsLoaded(true);
        }, 350);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [isOpen]);

  // 2. Generate 3D Point-Cloud Particle Bust
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 480;
    const height = 580;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const count = 3200;

    const colors = ['#ff2a5f', '#ff5722', '#ff7b00', '#ff3366', '#ffffff'];

    for (let i = 0; i < count; i++) {
      let x = 0;
      let y = 0;
      let z = (Math.random() - 0.5) * 80;
      const zone = Math.random();

      if (zone < 0.25) {
        // Torso / Shoulders
        const t = Math.random();
        x = (Math.random() - 0.5) * (260 + t * 160);
        y = 120 + Math.random() * 150;
        z = (Math.random() - 0.5) * 60;
      } else if (zone < 0.38) {
        // Neck & Collar
        x = (Math.random() - 0.5) * 70;
        y = 65 + Math.random() * 60;
        z = (Math.random() - 0.5) * 50;
      } else if (zone < 0.72) {
        // Head / Face Oval
        const angle = Math.random() * Math.PI * 2;
        const rx = Math.random() * 65;
        const ry = Math.random() * 90;
        x = Math.cos(angle) * rx;
        y = -20 + Math.sin(angle) * ry;
        z = (Math.random() - 0.5) * 75;
      } else if (zone < 0.90) {
        // Hair & Bun (Cyber cut)
        const angle = Math.random() * Math.PI * 2;
        if (Math.random() > 0.5) {
          // Top Bun
          x = Math.cos(angle) * (Math.random() * 38);
          y = -135 + Math.sin(angle) * (Math.random() * 32);
        } else {
          // Hair crown
          x = (Math.random() - 0.5) * 140;
          y = -95 + (Math.random() - 0.5) * 50;
        }
        z = (Math.random() - 0.5) * 80;
      } else {
        // Ambient Cyber Dust
        x = (Math.random() - 0.5) * 380;
        y = (Math.random() - 0.5) * 440;
        z = (Math.random() - 0.5) * 160;
      }

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        x: x + (Math.random() - 0.5) * 200, // Initial scatter
        y: y + (Math.random() - 0.5) * 200,
        z: z + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.8 + 0.9,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = mouseX;
      mouseRef.current.targetY = mouseY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  // 3. Render Canvas Loop with 3D Orbit, Magnetic Physics & Disperse
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for 3D rotation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const rotY = mouseRef.current.x * 0.0012;
      const rotX = mouseRef.current.y * -0.0012;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isRevealed) {
          // Disperse outward when revealed
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.alpha = Math.max(0, p.alpha - 0.035);
        } else {
          // Attract back to original 3D position
          p.alpha = Math.min(0.9, p.alpha + 0.04);
          p.x += (p.baseX - p.x) * 0.08;
          p.y += (p.baseY - p.y) * 0.08;
          p.z += (p.baseZ - p.z) * 0.08;

          // Living shimmer sine oscillation
          const shimmer = Math.sin(time * 2 + p.phase) * 1.2;

          // Mouse proximity repulsion
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRef.current.radius) {
            const force = (1 - dist / mouseRef.current.radius) * 12;
            p.x += (dx / (dist || 1)) * force;
            p.y += (dy / (dist || 1)) * force;
          }

          // 3D Rotation Transform
          // Rotate around Y
          const x1 = p.x * cosY + p.z * sinY;
          const z1 = -p.x * sinY + p.z * cosY;

          // Rotate around X
          const y1 = (p.y + shimmer) * cosX - z1 * sinX;
          const z2 = (p.y + shimmer) * sinX + z1 * cosX;

          // Perspective projection
          const fov = 400;
          const scale = fov / (fov + z2);

          const screenX = centerX + x1 * scale;
          const screenY = centerY + y1 * scale;

          if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, Math.max(0.5, p.size * scale), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * (scale * 0.8);
            ctx.fill();

            // Glow aura for bright particles
            if (p.size > 2) {
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 6;
            } else {
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoaded, isRevealed]);

  // Handle Reveal Action
  const toggleReveal = () => {
    sound.playLaserSweep();

    if (!isRevealed) {
      // Setup explosion velocities for particles
      particlesRef.current.forEach((p) => {
        p.vx = (p.x / 40 + (Math.random() - 0.5) * 12);
        p.vy = (p.y / 40 + (Math.random() - 0.5) * 12);
        p.vz = ((Math.random() - 0.5) * 20);
      });
      setIsRevealed(true);
      // Scanline animation
      setScanProgress(0);
      let progress = 0;
      const scanTimer = setInterval(() => {
        progress += 4;
        setScanProgress(progress);
        if (progress >= 100) clearInterval(scanTimer);
      }, 16);
    } else {
      setIsRevealed(false);
      setScanProgress(0);
    }
  };

  const handleEnterPortfolio = () => {
    sound.playSuccess();
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#07070d] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        isExiting ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Bar with Skip / Enter */}
      <div className="absolute top-6 left-0 right-0 px-6 sm:px-10 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            Holographic Terminal • System Online
          </span>
        </div>

        <button
          onClick={handleEnterPortfolio}
          onMouseEnter={() => sound.playHover()}
          className="text-xs font-mono text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 transition-all flex items-center gap-1.5"
        >
          <span>Skip to Portfolio</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* PHASE 1: Circular Progress Loader (0 to 100) */}
      {!isLoaded && (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Circle Loader */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#ff2a5f"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * loadingProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-75 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 8px #ff2a5f)',
                }}
              />
            </svg>

            {/* Inner Percentage Number */}
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-3xl font-extrabold text-white tracking-tight">
                {String(loadingProgress).padStart(3, '0')}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                LOADING
              </span>
            </div>
          </div>

          <div className="mt-8 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Initializing 3D Neural Mesh...</span>
          </div>
        </div>
      )}

      {/* PHASE 2: The Hologram / Revealed Viewport */}
      {isLoaded && (
        <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
          
          {/* Giant Metallic Background Title: DEVELOPER */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[180px] tracking-wider pointer-events-none select-none transition-all duration-700"
            style={{
              color: isRevealed ? '#ff1a40' : '#222538',
              textShadow: isRevealed 
                ? '0 0 80px rgba(255, 26, 64, 0.4), 0 0 30px rgba(255, 26, 64, 0.6)' 
                : '0 0 40px rgba(0, 0, 0, 0.8)',
              opacity: isRevealed ? 0.35 : 0.22,
              filter: 'blur(1px)',
            }}
          >
            DEVELOPER
          </div>

          {/* Center Stage: Canvas & Photo Container */}
          <div className="relative w-[340px] sm:w-[440px] h-[480px] sm:h-[540px] flex items-center justify-center">
            
            {/* Background Ambient Glow */}
            <div 
              className="absolute inset-0 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700"
              style={{
                backgroundColor: isRevealed ? '#ff2a5f' : '#ff7b00',
                opacity: isRevealed ? 0.25 : 0.15,
              }}
            />

            {/* Revealed Photo Portrait */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: `scale(${isRevealed ? 1 : 0.95})`,
                filter: isRevealed ? 'none' : 'blur(10px)',
              }}
            >
              <img
                src="/avatar.svg"
                alt="Aryan Jangir"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_40px_rgba(255,42,95,0.35)]"
              />

              {/* Scanning Laser Line when revealing */}
              {scanProgress < 100 && isRevealed && (
                <div 
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#ffffff] pointer-events-none transition-all"
                  style={{ top: `${scanProgress}%` }}
                />
              )}
            </div>

            {/* 3D Particle Hologram Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
                isRevealed ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
            />
          </div>

          {/* Interactive Action Control Pill */}
          <div className="relative z-30 mt-6 flex flex-col items-center gap-3">
            <button
              onClick={toggleReveal}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white glass-panel border shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
              style={{
                borderColor: '#ff2a5f',
                boxShadow: '0 0 25px rgba(255, 42, 95, 0.4)',
                backgroundColor: 'rgba(255, 42, 95, 0.12)',
              }}
            >
              {isRevealed ? (
                <>
                  <RotateCcw className="w-4 h-4 text-rose-400 group-hover:rotate-180 transition-transform duration-500" />
                  <span>BACK TO DOTS</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>REVEAL</span>
                </>
              )}
            </button>

            {/* Enter Portfolio CTA button */}
            <button
              onClick={handleEnterPortfolio}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 hover:underline"
            >
              <span>Explore Full Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>

        </div>
      )}

      {/* Subtle Bottom Instruction */}
      <div className="absolute bottom-4 text-[11px] font-mono text-zinc-600 text-center">
        {isLoaded ? 'Move cursor over hologram to disturb neural particles' : 'Loading assets...'}
      </div>
    </div>
  );
};
