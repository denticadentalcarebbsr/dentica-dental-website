'use client';
import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: '100%',
        background: 'linear-gradient(90deg, var(--accent), var(--primary-light))',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        zIndex: 1100,
        pointerEvents: 'none',
      }}
    />
  );
}
