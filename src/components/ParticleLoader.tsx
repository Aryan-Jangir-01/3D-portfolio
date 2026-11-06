import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowDown, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { ARYAN_FACE_MESH } from '../data/aryanFaceMesh';

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
  origColor: string;
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
  const [isShockwave, setIsShockwave] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  // Start mouse safely off-screen so the face is 100% intact by default
  const mouseRef = useRef({ 
    x: -9999, 
    y: -9999, 
    targetRotX: 0, 
    targetRotY: 0, 
    rotX: 0, 
    rotY: 0,
    isHovering: false 
  });
  const animFrameRef = useRef<number | null>(null);

  // 1. Initial 0 to 100 Circular Counter
  useEffect(() => {
    if (!isOpen) return;

    setIsLoaded(false);
    setIsShockwave(false);
    setIsExiting(false);
    setLoadingProgress(0);

    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setLoadingProgress(current);

      if (current % 8 === 0) {
        sound.playTick();
      }

      if (current >= 100) {
        window.clearInterval(interval);
        sound.playSuccess();
        window.setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  // 2. Initialize Particles from Aryan's 3D Face Mesh
  useEffect(() => {
    if (!isOpen) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const scale = isMobile ? 0.72 : 1.0;

    const particles: Particle[] = ARYAN_FACE_MESH.map((pt) => ({
      baseX: pt.x * scale,
      baseY: pt.y * scale,
      baseZ: pt.z * scale,
      // Start in subtle assembly motion
      x: (pt.x + (Math.random() - 0.5) * 60) * scale,
      y: (pt.y + (Math.random() - 0.5) * 60) * scale,
      z: (pt.z + (Math.random() - 0.5) * 50) * scale,
      vx: 0,
      vy: 0,
      vz: 0,
      size: isMobile ? Math.max(0.85, pt.s * 0.8) : pt.s,
      color: pt.c,
      origColor: pt.c,
      alpha: 0,
      origAlpha: pt.a,
      phase: Math.random() * Math.PI * 2,
    }));

    particlesRef.current = particles;
  }, [isOpen]);

  // 3. Canvas 60fps Render Loop (3D Perspective, Magnetic Hover Glow & Shockwave Physics)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 640;
    const width = isMobile ? Math.min(window.innerWidth - 32, 330) : 440;
    const height = isMobile ? Math.min(window.innerHeight * 0.44, 360) : 540;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const centerX = width / 2;
    const centerY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;

      const isInside = 
        mouseCanvasX >= -40 && 
        mouseCanvasX <= width + 40 && 
        mouseCanvasY >= -40 && 
        mouseCanvasY <= height + 40;

      mouseRef.current.isHovering = isInside;

      if (isInside) {
        mouseRef.current.x = mouseCanvasX - centerX;
        mouseRef.current.y = mouseCanvasY - centerY;
      } else {
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
      }

      // Smooth 3D tilt based on cursor position relative to screen center
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      const normX = (e.clientX - screenCenterX) / screenCenterX;
      const normY = (e.clientY - screenCenterY) / screenCenterY;

      mouseRef.current.targetRotY = normX * 0.35; // ~20 degrees max yaw
      mouseRef.current.targetRotX = -normY * 0.25; // ~15 degrees max pitch
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.targetRotX = 0;
      mouseRef.current.targetRotY = 0;
      mouseRef.current.isHovering = false;
    };

    // Touch event handlers for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mouseCanvasX = touch.clientX - rect.left;
      const mouseCanvasY = touch.clientY - rect.top;

      mouseRef.current.x = mouseCanvasX - centerX;
      mouseRef.current.y = mouseCanvasY - centerY;
      mouseRef.current.isHovering = true;

      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      mouseRef.current.targetRotY = ((touch.clientX - screenCenterX) / screenCenterX) * 0.35;
      mouseRef.current.targetRotX = -((touch.clientY - screenCenterY) / screenCenterY) * 0.25;
    };

    const handleTouchEnd = () => {
      handleMouseLeave();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    let time = 0;

    const render = () => {
      time += 0.025;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Smooth rotational damping
      mouseRef.current.rotX += (mouseRef.current.targetRotX - mouseRef.current.rotX) * 0.07;
      mouseRef.current.rotY += (mouseRef.current.targetRotY - mouseRef.current.rotY) * 0.07;

      const cosY = Math.cos(mouseRef.current.rotY);
      const sinY = Math.sin(mouseRef.current.rotY);
      const cosX = Math.cos(mouseRef.current.rotX);
      const sinX = Math.sin(mouseRef.current.rotX);

      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseNear = mouseX > -2000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.vx !== 0 || p.vy !== 0 || p.vz !== 0) {
          // Shockwave dispersal flight
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.vz *= 0.94;

          // Stop tiny velocity drift
          if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1 && Math.abs(p.vz) < 0.1) {
            p.vx = 0;
            p.vy = 0;
            p.vz = 0;
          }
        } else {
          // Assemble back to exact base position
          p.alpha = Math.min(p.origAlpha, p.alpha + 0.05);
          p.x += (p.baseX - p.x) * 0.12;
          p.y += (p.baseY - p.y) * 0.12;
          p.z += (p.baseZ - p.z) * 0.12;

          // Gentle ambient breathing oscillation
          const shimmer = Math.sin(time * 2 + p.phase) * 0.6;

          // Proximity interaction: Particles near cursor heat up & gently part
          if (isMouseNear) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);
            const radius = 65;

            if (dist < radius) {
              const force = (1 - dist / radius) * 14;
              p.x += (dx / (dist || 1)) * force * 0.3;
              p.y += (dy / (dist || 1)) * force * 0.3;
              // Heat up particle near cursor to gold/white
              p.color = '#ffcc00';
            } else {
              p.color = p.origColor;
            }
          } else {
            p.color = p.origColor;
          }

          // 3D Perspective Rotation Transform
          const x1 = p.x * cosY + p.z * sinY;
          const z1 = -p.x * sinY + p.z * cosY;

          const y1 = (p.y + shimmer) * cosX - z1 * sinX;
          const z2 = (p.y + shimmer) * sinX + z1 * cosX;

          // Perspective projection
          const fov = 440;
          const scale = fov / (fov + z2);

          const screenX = centerX + x1 * scale;
          const screenY = centerY + y1 * scale;

          if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            const renderSize = Math.max(0.6, p.size * scale);
            ctx.beginPath();
            ctx.arc(screenX, screenY, renderSize, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * Math.min(1, scale * 1.05);
            ctx.fill();

            // Specular glow for prominent nodes
            if (p.size >= 1.4 && p.alpha > 0.5) {
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
            } else {
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // 4. Interactive Shockwave Burst & Magnetize Back
  const triggerShockwave = useCallback(() => {
    if (isShockwave) return;
    sound.playLaserSweep();
    setIsShockwave(true);

    // Blast particles outward in 3D
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.vx = (p.x / 14 + (Math.random() - 0.5) * 18);
      p.vy = (p.y / 14 + (Math.random() - 0.5) * 18);
      p.vz = ((Math.random() - 0.5) * 32);
    }

    // Magnetically re-converge after 700ms
    setTimeout(() => {
      sound.playSuccess();
      particlesRef.current.forEach((p) => {
        p.vx = 0;
        p.vy = 0;
        p.vz = 0;
      });
      setIsShockwave(false);
    }, 750);
  }, [isShockwave]);

  const handleEnterPortfolio = () => {
    sound.playSuccess();
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#06060c] flex items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        isExiting ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Header Navigation Bar */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 px-4 sm:px-12 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-300 uppercase font-semibold truncate max-w-[170px] xs:max-w-none">
            Aryan Jangir • 3D Mesh
          </span>
        </div>

        <button
          onClick={handleEnterPortfolio}
          onMouseEnter={() => sound.playHover()}
          className="text-xs font-mono text-cyan-300 hover:text-white px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer font-semibold"
        >
          <span>Skip to Site</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================
          PHASE 1: Dead-Centered Circular Progress Ring (0 to 100)
          ======================================================== */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 transition-all duration-300"
        >
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Glowing Circular SVG Arc */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.07)"
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
                  filter: 'drop-shadow(0 0 12px #ff2a5f)',
                }}
              />
            </svg>

            {/* Inner Counter: 000 to 100 */}
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-3xl font-extrabold text-white tracking-tight">
                {String(loadingProgress).padStart(3, '0')}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-0.5">
                LOADING
              </span>
            </div>
          </div>

          <div className="mt-7 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Synthesizing Aryan's Facial Mesh Nodes...</span>
          </div>
        </div>
      )}

      {/* ========================================================
          PHASE 2: 100% Pure 3D Holographic Face Particle Bust
          (Zero 2D Photo - Pure Glowing 3D Neural Dots)
          ======================================================== */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 z-20 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Giant Metallic Background Title: DEVELOPER */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[180px] tracking-wider pointer-events-none select-none transition-all duration-700 leading-none"
          style={{
            color: '#ff1a4a',
            textShadow: '0 0 90px rgba(255, 26, 74, 0.35), 0 0 35px rgba(255, 26, 74, 0.45)',
            opacity: 0.28,
            filter: 'blur(1px)',
          }}
        >
          DEVELOPER
        </div>

        {/* Center Stage Container */}
        <div className="relative w-[300px] xs:w-[330px] sm:w-[440px] h-[320px] xs:h-[360px] sm:h-[540px] flex items-center justify-center">
          
          {/* Ambient Volumetric Radial Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none transition-all duration-700"
            style={{
              backgroundColor: '#ff2a5f',
              opacity: 0.18,
            }}
          />

          {/* 3D Holographic Particle Canvas (100% Pure Dots) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20 touch-none"
          />
        </div>

        {/* Interactive Controls & CTA Button Group */}
        <div className="relative z-30 mt-3 sm:mt-6 flex flex-col xs:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full px-5 max-w-sm sm:max-w-none">
          {/* Shockwave Particle Pulse Button */}
          <button
            onClick={triggerShockwave}
            onMouseEnter={() => sound.playHover()}
            disabled={isShockwave}
            className="w-full xs:w-auto px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white glass-panel border shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            style={{
              borderColor: '#ff2a5f',
              boxShadow: '0 0 20px rgba(255, 42, 95, 0.35)',
              backgroundColor: 'rgba(255, 42, 95, 0.15)',
            }}
          >
            <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{isShockwave ? 'DISPERSING...' : 'SHOCKWAVE PULSE'}</span>
          </button>

          {/* Primary Enter Portfolio Button */}
          <button
            onClick={handleEnterPortfolio}
            onMouseEnter={() => sound.playHover()}
            className="w-full xs:w-auto px-7 py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white glass-panel border shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            style={{
              borderColor: '#38bdf8',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.45)',
              backgroundColor: 'rgba(56, 189, 248, 0.20)',
            }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>ENTER PORTFOLIO</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Status Subtitle */}
      <div className="absolute bottom-4 text-[11px] font-mono text-zinc-400 text-center z-30 pointer-events-none">
        {isLoaded 
          ? 'Move cursor over hologram to rotate & interact with 3D neural particles' 
          : 'Synthesizing neural face mesh...'}
      </div>
    </div>
  );
};

export default ParticleLoader;
