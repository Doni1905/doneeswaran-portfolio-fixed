import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

function cubic(a: number, b: number, c: number, d: number, t: number) {
  return (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
}

function slope(a: number, b: number, c: number, d: number, t: number) {
  return 3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c);
}

interface FlightCompanionProps {
  enabled: boolean;
}

export function FlightCompanion({ enabled }: FlightCompanionProps) {
  const [trail, setTrail] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);

  const planeX = useMotionValue(-100);
  const planeY = useMotionValue(-100);
  const planeAngle = useMotionValue(0);
  const planeScale = useMotionValue(1);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 45, stiffness: 220, restDelta: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const unsubscribe = smoothY.on('change', (y) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (W < 768) return; // Disable flight on narrow mobile screens

      // Dynamic waypoints routed through page whitespace
      const waypoints = [
        { x: W * 0.86, y: H * 0.32, at: 0 },
        { x: W * 0.92, y: H * 0.70, at: 600 },
        { x: W * 0.12, y: H * 0.45, at: 1400 },
        { x: W * 0.88, y: H * 0.60, at: 2300 },
        { x: W * 0.15, y: H * 0.75, at: 3200 },
        { x: W * 0.82, y: H * 0.50, at: 4200 },
      ];

      let idx = waypoints.findIndex((w) => y <= w.at);
      if (idx === -1) idx = waypoints.length - 1;
      const p1 = waypoints[Math.max(0, idx - 1)];
      const p2 = waypoints[idx];

      const range = Math.max(1, p2.at - p1.at);
      const t = Math.max(0, Math.min(1, (y - p1.at) / range));

      const cx1 = p1.x + (p2.x - p1.x) * 0.25;
      const cy1 = p1.y + 40;
      const cx2 = p2.x - (p2.x - p1.x) * 0.25;
      const cy2 = p2.y - 40;

      const px = cubic(p1.x, cx1, cx2, p2.x, t);
      const py = cubic(p1.y, cy1, cy2, p2.y, t);

      const dx = slope(p1.x, cx1, cx2, p2.x, t);
      const dy = slope(p1.y, cy1, cy2, p2.y, t);

      // Tangent angle so nose points in flight vector direction
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 45;

      planeX.set(px);
      planeY.set(py);
      planeAngle.set(angle);
      planeScale.set(Math.max(0.7, 1 - y / 8000));

      // SVG Contrail coordinates (past positions)
      const points: string[] = [];
      for (let lag = 18; lag <= 150; lag += 25) {
        const pastY = Math.max(0, y - lag);
        const pastT = Math.max(0, Math.min(1, (pastY - p1.at) / range));
        points.push(`${cubic(p1.x, cx1, cx2, p2.x, pastT).toFixed(1)},${cubic(p1.y, cy1, cy2, p2.y, pastT).toFixed(1)}`);
      }
      setTrail(`M ${px.toFixed(1)} ${py.toFixed(1)} L ` + points.join(' L '));
    });

    return () => unsubscribe();
  }, [smoothY, enabled, reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Contrail Vapor Trail */}
      <svg className="w-full h-full">
        <path
          d={trail}
          fill="none"
          stroke="rgba(16, 185, 129, 0.4)"
          strokeWidth="2.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>

      {/* Travelling Paper Plane */}
      <motion.div
        style={{
          x: planeX,
          y: planeY,
          rotate: planeAngle,
          scale: planeScale,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-emerald-400 drop-shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </motion.div>
    </div>
  );
}
