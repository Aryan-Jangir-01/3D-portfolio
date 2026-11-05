import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { themeConfig } = useTheme();

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .interactive');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', checkHover);

    // Smooth trailing ring loop
    let animId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', checkHover);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center point */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-75"
        style={{
          width: '8px',
          height: '8px',
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isClicking ? 0.7 : isHovered ? 1.5 : 1})`,
          backgroundColor: themeConfig.primary,
          boxShadow: `0 0 10px ${themeConfig.glow}`,
        }}
      />
      {/* Outer trailing aura */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-150 ease-out"
        style={{
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 14)}px, ${trailingPos.y - (isHovered ? 24 : 14)}px, 0)`,
          border: `1.5px solid ${themeConfig.primary}`,
          backgroundColor: isHovered ? `${themeConfig.primary}15` : 'transparent',
          boxShadow: isHovered ? `0 0 16px ${themeConfig.glow}` : 'none',
        }}
      />
    </>
  );
};
