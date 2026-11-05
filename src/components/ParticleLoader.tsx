import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowDown, RotateCcw, UserCheck, Flame } from 'lucide-react';
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
  origAlpha: number;
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
  const [avatarMode, setAvatarMode] = useState<'formal' | 'casual'>('formal');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, radius: 110 });
  const animFrameRef = useRef<number | null>(null);

  const activeAvatarSrc = avatarMode === 'formal' ? '/aryan_avatar_formal.png' : '/aryan_avatar_casual.png';

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
        }, 300);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isOpen]);

  // 2. Generate 3D Point-Cloud Sampled Directly from Aryan's Face Scan
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 480;
    const height = 580;
    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.src = activeAvatarSrc;

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const sampleW = 200;
      const sampleH = 260;
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;

      const particles: Particle[] = [];
      const step = 3; // sampling step

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (y * sampleW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          // Ignore pitch black background pixels
          if (brightness > 24) {
            const normX = (x - sampleW / 2) / (sampleW / 2);
            const normY = (y - sampleH / 2) / (sampleH / 2);

            // 3D Depth estimation for Aryan's facial features
            // Oval angular face bulge & forehead curvature
            const centerDist = Math.hypot(normX, normY);
            const facialCurvature = Math.max(0, 1 - centerDist * 1.1) * 65;

            // Cheeks & nose bridge protrusion
            const isNoseArea = Math.abs(normX) < 0.18 && normY > -0.2 && normY < 0.25;
            const noseBulge = isNoseArea ? 30 : 0;

            const baseZ = facialCurvature + noseBulge + (Math.random() - 0.5) * 14;
            const targetX = normX * 180;
            const targetY = normY * 230 + 10;

            // Holographic Cyberpunk Color Palette: Fire Crimson, Neon Amber, Glowing White
            let color = '#ff2a5f';
            if (brightness > 180) {
              color = '#ffffff'; // Specular highlights on forehead & nose
            } else if (brightness > 110) {
              color = '#ff7b00'; // Mid-tone fiery amber
            } else if (brightness > 60) {
              color = '#ff2a5f'; // Crimson tone
            } else {
              color = '#a81538'; // Dark shadow tones (beard & hair depth)
            }

            particles.push({
              baseX: targetX,
              baseY: targetY,
              baseZ: baseZ,
              x: targetX + (Math.random() - 0.5) * 180,
              y: targetY + (Math.random() - 0.5) * 180,
              z: baseZ + (Math.random() - 0.5) * 120,
              vx: 0,
              vy: 0,
              vz: 0,
              size: Math.random() * 1.6 + 0.9,
              color: color,
              alpha: Math.min(1, (brightness / 255) * 0.9 + 0.2),
              origAlpha: Math.min(1, (brightness / 255) * 0.9 + 0.2),
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      // Add atmospheric ambient cyber dust particles
      for (let i = 0; i < 150; i++) {
        particles.push({
          baseX: (Math.random() - 0.5) * 440,
          baseY: (Math.random() - 0.5) * 480,
          baseZ: (Math.random() - 0.5) * 150,
          x: (Math.random() - 0.5) * 440,
          y: (Math.random() - 0.5) * 480,
          z: (Math.random() - 0.5) * 150,
          vx: 0,
          vy: 0,
          vz: 0,
          size: Math.random() * 1.5 + 0.6,
          color: '#ff7b00',
          alpha: Math.random() * 0.4 + 0.1,
          origAlpha: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

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
  }, [isLoaded, activeAvatarSrc]);

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

      const rotY = mouseRef.current.x * 0.0014;
      const rotX = mouseRef.current.y * -0.0014;
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
          p.alpha = Math.max(0, p.alpha - 0.04);
        } else {
          // Attract back to original 3D face position
          p.alpha = Math.min(p.origAlpha, p.alpha + 0.04);
          p.x += (p.baseX - p.x) * 0.09;
          p.y += (p.baseY - p.y) * 0.09;
          p.z += (p.baseZ - p.z) * 0.09;

          // Living shimmer sine oscillation
          const shimmer = Math.sin(time * 2 + p.phase) * 0.8;

          // Mouse proximity repulsion (interactive magnetic push)
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRef.current.radius) {
            const force = (1 - dist / mouseRef.current.radius) * 14;
            p.x += (dx / (dist || 1)) * force;
            p.y += (dy / (dist || 1)) * force;
          }

          // 3D Perspective Rotation Transform
          // Rotate around Y
          const x1 = p.x * cosY + p.z * sinY;
          const z1 = -p.x * sinY + p.z * cosY;

          // Rotate around X
          const y1 = (p.y + shimmer) * cosX - z1 * sinX;
          const z2 = (p.y + shimmer) * sinX + z1 * cosX;

          // Perspective projection
          const fov = 420;
          const scale = fov / (fov + z2);

          const screenX = centerX + x1 * scale;
          const screenY = centerY + y1 * scale;

          if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, Math.max(0.6, p.size * scale), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * (scale * 0.9);
            ctx.fill();

            // Glow core for bright particles
            if (p.size > 1.8) {
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
        p.vx = (p.x / 35 + (Math.random() - 0.5) * 14);
        p.vy = (p.y / 35 + (Math.random() - 0.5) * 14);
        p.vz = ((Math.random() - 0.5) * 25);
      });
      setIsRevealed(true);
      // Scanline laser animation
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
      {/* Top Bar with Avatar Switcher & Skip / Enter */}
      <div className="absolute top-6 left-0 right-0 px-6 sm:px-10 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase font-semibold">
              Aryan Jangir • Neural Hologram Scan
            </span>
          </div>

          {/* Quick Avatar View Toggle */}
          {isLoaded && (
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl glass-panel border border-white/10 text-[11px] font-mono">
              <button
                onClick={() => {
                  sound.playClick();
                  setAvatarMode('formal');
                  setIsRevealed(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  avatarMode === 'formal'
                    ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Studio Formal
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setAvatarMode('casual');
                  setIsRevealed(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  avatarMode === 'casual'
                    ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Front Denim
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleEnterPortfolio}
          onMouseEnter={() => sound.playHover()}
          className="text-xs font-mono text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 transition-all flex items-center gap-1.5 shadow-md"
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
                  filter: 'drop-shadow(0 0 10px #ff2a5f)',
                }}
              />
            </svg>

            {/* Inner Percentage Number */}
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-3xl font-extrabold text-white tracking-tight">
                {String(loadingProgress).padStart(3, '0')}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                SCANNING
              </span>
            </div>
          </div>

          <div className="mt-8 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Synthesizing Face Scan Mesh...</span>
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

          {/* Center Stage: Canvas & Aryan's Real Photo Container */}
          <div className="relative w-[340px] sm:w-[440px] h-[480px] sm:h-[540px] flex items-center justify-center">
            
            {/* Background Ambient Glow */}
            <div 
              className="absolute inset-0 rounded-full blur-[110px] pointer-events-none transition-opacity duration-700"
              style={{
                backgroundColor: isRevealed ? '#ff2a5f' : '#ff7b00',
                opacity: isRevealed ? 0.25 : 0.15,
              }}
            />

            {/* Revealed Photo Portrait (Aryan's Real Photo) */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 overflow-hidden rounded-3xl"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: `scale(${isRevealed ? 1 : 0.95})`,
                filter: isRevealed ? 'none' : 'blur(10px)',
              }}
            >
              <img
                src={activeAvatarSrc}
                alt="Aryan Jangir - Full-Stack Developer"
                className="w-full h-full object-cover filter drop-shadow-[0_10px_50px_rgba(255,42,95,0.4)] rounded-3xl"
              />

              {/* Laser Scanline Sweep when revealing */}
              {scanProgress < 100 && isRevealed && (
                <div 
                  className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_#ffffff] pointer-events-none transition-all"
                  style={{ top: `${scanProgress}%` }}
                />
              )}
            </div>

            {/* 3D Particle Hologram Canvas (Sampled directly from Aryan's face) */}
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
      <div className="absolute bottom-4 text-[11px] font-mono text-zinc-500 text-center">
        {isLoaded ? 'Move cursor over hologram to disturb facial neural particles in 3D' : 'Loading facial scan metrics...'}
      </div>
    </div>
  );
};
