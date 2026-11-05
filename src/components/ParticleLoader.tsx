import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowDown, RotateCcw } from 'lucide-react';
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
  isDispersed: boolean;
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
  const [isScanning, setIsScanning] = useState(false);
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
  const scanTimerRef = useRef<number | null>(null);

  // 1. Initial 0 to 100 Circular Counter
  useEffect(() => {
    if (!isOpen) return;

    setIsLoaded(false);
    setIsRevealed(false);
    setIsExiting(false);
    setIsScanning(false);
    setScanProgress(0);
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

    const particles: Particle[] = ARYAN_FACE_MESH.map((pt) => ({
      baseX: pt.x,
      baseY: pt.y,
      baseZ: pt.z,
      // Start in subtle assembly motion
      x: pt.x + (Math.random() - 0.5) * 80,
      y: pt.y + (Math.random() - 0.5) * 80,
      z: pt.z + (Math.random() - 0.5) * 60,
      vx: 0,
      vy: 0,
      vz: 0,
      size: pt.s,
      color: pt.c,
      origColor: pt.c,
      alpha: 0,
      origAlpha: pt.a,
      phase: Math.random() * Math.PI * 2,
      isDispersed: false,
    }));

    particlesRef.current = particles;
  }, [isOpen]);

  // 3. Canvas 60fps Render Loop (3D Perspective, Magnetic Hover Glow & Laser Sweep)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 440;
    const height = 540;
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

        if (p.isDispersed) {
          // Scattered velocity flight when laser sweeps
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.vz *= 0.96;
          p.alpha = Math.max(0, p.alpha - 0.03);
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

  // 4. Laser Reveal and Back-to-Dots Action
  const triggerReveal = useCallback(() => {
    sound.playLaserSweep();
    setIsScanning(true);
    setIsRevealed(true);

    // Setup progressive laser scanline from top (0%) to bottom (100%)
    const height = 540;
    const durationMs = 1100;
    const startTime = performance.now();

    const animateScan = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(100, (elapsed / durationMs) * 100);
      setScanProgress(progress);

      // Current Y threshold in canvas coordinate space (-270 to +270)
      const currentCanvasY = (progress / 100) * height - 270;

      // Disperse particles as the laser passes them
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isDispersed && p.y <= currentCanvasY + 15) {
          p.isDispersed = true;
          // Spark explosion outwards
          p.vx = (p.x / 20 + (Math.random() - 0.5) * 14);
          p.vy = (Math.random() - 0.7) * 12;
          p.vz = (Math.random() - 0.5) * 20;
        }
      }

      if (progress < 100) {
        scanTimerRef.current = requestAnimationFrame(animateScan);
      } else {
        setIsScanning(false);
      }
    };

    scanTimerRef.current = requestAnimationFrame(animateScan);
  }, []);

  const triggerBackToDots = useCallback(() => {
    sound.playLaserSweep();
    setIsScanning(true);

    const height = 540;
    const durationMs = 800;
    const startTime = performance.now();

    const animateReverse = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setScanProgress(progress);

      const currentCanvasY = (progress / 100) * height - 270;

      // Re-converge particles as laser moves up
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isDispersed && p.y >= currentCanvasY - 15) {
          p.isDispersed = false;
          p.vx = 0;
          p.vy = 0;
          p.vz = 0;
        }
      }

      if (progress > 0) {
        scanTimerRef.current = requestAnimationFrame(animateReverse);
      } else {
        setIsScanning(false);
        setIsRevealed(false);
        // Ensure all particles are fully re-assembled
        particlesRef.current.forEach((p) => {
          p.isDispersed = false;
          p.vx = 0;
          p.vy = 0;
          p.vz = 0;
        });
      }
    };

    scanTimerRef.current = requestAnimationFrame(animateReverse);
  }, []);

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
      <div className="absolute top-6 left-0 right-0 px-6 sm:px-12 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase font-semibold">
            Aryan Jangir • Neural Hologram Mesh
          </span>
        </div>

        <button
          onClick={handleEnterPortfolio}
          onMouseEnter={() => sound.playHover()}
          className="text-xs font-mono text-zinc-300 hover:text-white px-4 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 transition-all flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95"
        >
          <span>Skip to Portfolio</span>
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
          PHASE 2: 3D Holographic Face Bust Stage & Laser Reveal
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
            color: isRevealed ? '#ff1a4a' : '#222538',
            textShadow: isRevealed 
              ? '0 0 90px rgba(255, 26, 74, 0.45), 0 0 35px rgba(255, 26, 74, 0.65)' 
              : '0 0 40px rgba(0, 0, 0, 0.85)',
            opacity: isRevealed ? 0.40 : 0.22,
            filter: 'blur(1px)',
          }}
        >
          DEVELOPER
        </div>

        {/* Center Stage Container (440 x 540) */}
        <div className="relative w-[340px] sm:w-[440px] h-[440px] sm:h-[540px] flex items-center justify-center">
          
          {/* Ambient Volumetric Radial Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
            style={{
              backgroundColor: isRevealed ? '#ff1a4a' : '#ff7b00',
              opacity: isRevealed ? 0.28 : 0.16,
            }}
          />

          {/* Real Photo Portrait Layer (Unmasked directly by the Laser Beam) */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none transition-opacity duration-300"
            style={{
              clipPath: isRevealed 
                ? `inset(0 0 ${Math.max(0, 100 - scanProgress)}% 0)` 
                : 'inset(0 0 100% 0)',
            }}
          >
            <img
              src="/aryan_avatar_hologram.png"
              alt="Aryan Jangir"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_50px_rgba(255,26,74,0.4)]"
            />
          </div>

          {/* Laser Scanline Beam Sweep */}
          {(isScanning || (isRevealed && scanProgress < 100)) && (
            <div 
              className="absolute left-0 right-0 h-[2px] pointer-events-none z-30 transition-all ease-linear"
              style={{
                top: `${scanProgress}%`,
                background: 'linear-gradient(90deg, transparent 0%, #ff8c00 25%, #ffffff 50%, #ff2a5f 75%, transparent 100%)',
                boxShadow: '0 0 15px #ffffff, 0 0 30px #ff2a5f, 0 0 60px #ff2a5f',
              }}
            >
              {/* Central Glowing Spark Flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white blur-[2px] opacity-90 shadow-[0_0_20px_#ffffff]" />
            </div>
          )}

          {/* 3D Holographic Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20"
          />
        </div>

        {/* Interactive Controls & CTA Button Group */}
        <div className="relative z-30 mt-4 sm:mt-6 flex flex-col items-center gap-3">
          <button
            onClick={isRevealed ? triggerBackToDots : triggerReveal}
            onMouseEnter={() => sound.playHover()}
            className="px-8 py-2.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white glass-panel border shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
            style={{
              borderColor: isRevealed ? '#38bdf8' : '#ff2a5f',
              boxShadow: isRevealed 
                ? '0 0 25px rgba(56, 189, 248, 0.4)' 
                : '0 0 25px rgba(255, 42, 95, 0.45)',
              backgroundColor: isRevealed 
                ? 'rgba(56, 189, 248, 0.15)' 
                : 'rgba(255, 42, 95, 0.18)',
            }}
          >
            {isRevealed ? (
              <>
                <RotateCcw className="w-4 h-4 text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>BACK TO DOTS</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>REVEAL</span>
              </>
            )}
          </button>

          {/* Enter Portfolio CTA */}
          <button
            onClick={handleEnterPortfolio}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            <span>Explore Full Portfolio</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Status Subtitle */}
      <div className="absolute bottom-4 text-[11px] font-mono text-zinc-500 text-center z-30 pointer-events-none">
        {isLoaded 
          ? 'Move cursor over hologram to rotate & interact with 3D neural particles' 
          : 'Synthesizing neural face mesh...'}
      </div>
    </div>
  );
};
