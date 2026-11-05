import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Play, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Volume2, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/sound';

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export const ArcadeGame: React.FC = () => {
  const { themeConfig } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('arcade_high_score') || '0', 10);
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shipPosRef = useRef({ x: 180, width: 34, height: 26 });
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const asteroidsRef = useRef<Asteroid[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const scoreRef = useRef(0);

  const startGame = () => {
    sound.playSuccess();
    setScore(0);
    scoreRef.current = 0;
    setGameOver(false);
    setIsPlaying(true);
    shipPosRef.current.x = 180;
    asteroidsRef.current = [];
  };

  const handleGameOver = () => {
    sound.playGameOver();
    setIsPlaying(false);
    setGameOver(true);

    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem('arcade_high_score', scoreRef.current.toString());
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA', 'a'].includes(e.code) || e.key === 'ArrowLeft') {
        keysRef.current.left = true;
      }
      if (['ArrowRight', 'KeyD', 'd'].includes(e.code) || e.key === 'ArrowRight') {
        keysRef.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA', 'a'].includes(e.code) || e.key === 'ArrowLeft') {
        keysRef.current.left = false;
      }
      if (['ArrowRight', 'KeyD', 'd'].includes(e.code) || e.key === 'ArrowRight') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = 360;
    const canvasHeight = 420;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw cyber background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvasWidth; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      // Move player ship
      const shipSpeed = 6;
      if (keysRef.current.left) {
        shipPosRef.current.x = Math.max(16, shipPosRef.current.x - shipSpeed);
      }
      if (keysRef.current.right) {
        shipPosRef.current.x = Math.min(canvasWidth - 16, shipPosRef.current.x + shipSpeed);
      }

      // Spawn falling obstacles
      const spawnRate = Math.max(20, 50 - Math.floor(scoreRef.current / 150));
      if (frameCount % spawnRate === 0) {
        asteroidsRef.current.push({
          id: Math.random(),
          x: Math.random() * (canvasWidth - 40) + 20,
          y: -20,
          size: Math.random() * 12 + 14,
          speed: Math.random() * 2 + 2.5 + scoreRef.current * 0.003,
          color: Math.random() > 0.5 ? themeConfig.primary : '#ec4899',
        });
      }

      // Draw player ship (Futuristic triangle with thrusters)
      const ship = shipPosRef.current;
      const shipY = canvasHeight - 40;

      // Thruster flame
      ctx.beginPath();
      ctx.moveTo(ship.x - 7, shipY + 12);
      ctx.lineTo(ship.x + 7, shipY + 12);
      ctx.lineTo(ship.x, shipY + 22 + (Math.random() * 6));
      ctx.fillStyle = themeConfig.primary;
      ctx.shadowBlur = 12;
      ctx.shadowColor = themeConfig.primary;
      ctx.fill();

      // Ship body
      ctx.beginPath();
      ctx.moveTo(ship.x, shipY - 14);
      ctx.lineTo(ship.x + 14, shipY + 12);
      ctx.lineTo(ship.x, shipY + 6);
      ctx.lineTo(ship.x - 14, shipY + 12);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Draw & update obstacles
      for (let i = asteroidsRef.current.length - 1; i >= 0; i--) {
        const ast = asteroidsRef.current[i];
        ast.y += ast.speed;

        // Draw obstacle
        ctx.beginPath();
        ctx.arc(ast.x, ast.y, ast.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = ast.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = ast.color;
        ctx.fill();

        // Collision detection
        const dist = Math.hypot(ship.x - ast.x, shipY - ast.y);
        if (dist < (ast.size / 2 + 12)) {
          handleGameOver();
          return;
        }

        // Out of bounds -> remove and score
        if (ast.y > canvasHeight + 20) {
          asteroidsRef.current.splice(i, 1);
          scoreRef.current += 10;
          setScore(scoreRef.current);
          if (scoreRef.current % 100 === 0) {
            sound.playLaser();
          }
        }
      }

      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, themeConfig.primary]);

  return (
    <section id="arcade" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border"
          style={{ 
            borderColor: `${themeConfig.primary}40`,
            color: themeConfig.primary,
            backgroundColor: `${themeConfig.primary}10`
          }}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>CYBER RETRO ZONE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          The <span style={{ color: themeConfig.primary }}>Arcade</span> Room
        </h2>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          Need a break from inspecting code? Dodge incoming telemetry packets in this retro browser game!
        </p>
      </div>

      {/* Arcade Cabinet Machine Container */}
      <div 
        className="max-w-md mx-auto glass-panel p-6 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col items-center"
        style={{ borderColor: `${themeConfig.primary}50` }}
      >
        {/* Top Header / Score Bar */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>SCORE: <strong className="text-white text-sm">{score}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>BEST: <strong className="text-yellow-400 text-sm">{highScore}</strong></span>
          </div>
        </div>

        {/* Game Canvas Viewport */}
        <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/15 bg-black/80 w-[360px] h-[420px] shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />

          {/* Idle / Game Over Overlay */}
          {(!isPlaying || gameOver) && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <Gamepad2 
                className="w-12 h-12 mb-3 animate-bounce" 
                style={{ color: themeConfig.primary }} 
              />
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                {gameOver ? 'SYSTEM CRASHED!' : 'SPACE DODGER'}
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mb-6">
                {gameOver
                  ? `You dodged with precision! Final Score: ${score}`
                  : 'Control your ship using A/D or Left/Right Arrow Keys. Dodge falling cyber obstacles!'}
              </p>

              <button
                onClick={startGame}
                onMouseEnter={() => sound.playHover()}
                className="px-6 py-3 rounded-xl font-bold text-sm text-black flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: themeConfig.primary,
                  boxShadow: `0 0 20px ${themeConfig.glow}`,
                }}
              >
                {gameOver ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{gameOver ? 'Play Again' : 'Insert Coin & Start'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile On-Screen Controls */}
        <div className="w-full flex items-center justify-between mt-4 sm:hidden">
          <button
            onTouchStart={() => (keysRef.current.left = true)}
            onTouchEnd={() => (keysRef.current.left = false)}
            onMouseDown={() => (keysRef.current.left = true)}
            onMouseUp={() => (keysRef.current.left = false)}
            className="flex-1 mr-2 py-3 rounded-xl bg-white/10 active:bg-white/20 flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onTouchStart={() => (keysRef.current.right = true)}
            onTouchEnd={() => (keysRef.current.right = false)}
            onMouseDown={() => (keysRef.current.right = true)}
            onMouseUp={() => (keysRef.current.right = false)}
            className="flex-1 ml-2 py-3 rounded-xl bg-white/10 active:bg-white/20 flex items-center justify-center text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions footer */}
        <div className="mt-4 text-[11px] font-mono text-zinc-500 text-center">
          Keyboard: [←] [→] or [A] [D] to steer
        </div>
      </div>
    </section>
  );
};
