import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { themeConfig } = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Strictly disable on touch / mobile devices (phones, tablets, touchscreens)
    const checkTouch = () => {
      return (
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches)
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], .interactive, .cursor-pointer'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Butter-smooth 120fps hardware-accelerated requestAnimationFrame loop
    let animId: number;
    const loop = () => {
      // Smooth interpolation for the outer trailing aura ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }

      if (ringRef.current) {
        const offset = isHovered ? 24 : 15;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isHovered]);

  // Never render on mobile/touch screens or when cursor is off-window
  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      {/* High-precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-75"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: themeConfig.primary,
          boxShadow: `0 0 10px ${themeConfig.glow}`,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
      {/* Fluid glowing aura ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-150 ease-out"
        style={{
          width: isHovered ? '48px' : '30px',
          height: isHovered ? '48px' : '30px',
          border: `1.5px solid ${themeConfig.primary}`,
          backgroundColor: isHovered ? `${themeConfig.primary}18` : 'transparent',
          boxShadow: isHovered ? `0 0 18px ${themeConfig.glow}` : 'none',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
