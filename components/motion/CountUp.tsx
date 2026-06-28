'use client';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export function CountUp({ to, duration = 1500, suffix = '' }: {
  to: number; duration?: number; suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(eased * to));
          if (p < 1) requestAnimationFrame(tick); else setVal(to);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reducedMotion]);

  return <span ref={ref}>{val}{suffix}</span>;
}
