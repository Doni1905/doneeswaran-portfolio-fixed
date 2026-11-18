export const NOSE_ANGLE = -40;

const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const cubic = (a: number, b: number, c: number, d: number, t: number) =>
  (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
const slope = (a: number, b: number, c: number, d: number, t: number) =>
  3 * (1 - t) ** 2 * (b - a) + 6 * (1 - t) * t * (c - b) + 3 * t * t * (d - c);

export interface FlightPoint {
  x: number;
  y: number;
  at: number;
  view?: number;
  velocity?: { x: number; y: number };
}

export interface FlightSegment {
  a: FlightPoint;
  b: FlightPoint;
  c1: { x: number; y: number };
  c2: { x: number; y: number };
}

export function makeFlightPath(points: FlightPoint[], width: number, height: number): FlightSegment[] {
  const velocity = points.map((p, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const v: { x: number; y: number } = { x: 0, y: 0 };
    for (const [axis, max] of [['x', width], ['y', height]] as const) {
      const m = p.velocity?.[axis] ?? (next[axis] - prev[axis]) / (next.at - prev.at || 1);
      const before = p.at - prev.at || 1;
      const after = next.at - p.at || 1;
      const low = p[axis] - 15;
      const high = max - 15 - p[axis];
      const cap = m >= 0
        ? Math.min(i ? 3 * low / before : Infinity, i < points.length - 1 ? 3 * high / after : Infinity)
        : Math.min(i ? 3 * high / before : Infinity, i < points.length - 1 ? 3 * low / after : Infinity);
      v[axis] = Math.sign(m) * Math.min(Math.abs(m), Math.max(0, cap));
    }
    return v;
  });

  return points.slice(0, -1).map((a, i) => {
    const b = points[i + 1];
    const third = (b.at - a.at) / 3;
    return {
      a,
      b,
      c1: { x: a.x + velocity[i].x * third, y: a.y + velocity[i].y * third },
      c2: { x: b.x - velocity[i + 1].x * third, y: b.y - velocity[i + 1].y * third },
    };
  });
}

export function sampleFlightPath(segments: FlightSegment[], scroll: number) {
  if (!segments.length) return { x: 0, y: 0, angle: 0, dx: 0, dy: 0 };
  const s = segments.find((seg) => scroll <= seg.b.at) || segments[segments.length - 1];
  const t = clamp((scroll - s.a.at) / (s.b.at - s.a.at || 1), 0, 1);
  const dx = slope(s.a.x, s.c1.x, s.c2.x, s.b.x, t);
  const dy = slope(s.a.y, s.c1.y, s.c2.y, s.b.y, t);
  return {
    x: cubic(s.a.x, s.c1.x, s.c2.x, s.b.x, t),
    y: cubic(s.a.y, s.c1.y, s.c2.y, s.b.y, t),
    angle: (Math.atan2(dy, dx) * 180) / Math.PI - NOSE_ANGLE,
    dx,
    dy,
  };
}

export function sampleArrival(end: { x: number; y: number }, t: number, mobile: boolean) {
  const a = { x: end.x - (mobile ? 100 : 230), y: end.y - (mobile ? 20 : 140) };
  const b = { x: end.x - (mobile ? 70 : 190), y: end.y - (mobile ? 14 : 65) };
  const c = { x: end.x - (mobile ? 35 : 75), y: end.y - (mobile ? 7 : 15) };
  const dx = slope(a.x, b.x, c.x, end.x, t);
  const dy = slope(a.y, b.y, c.y, end.y, t);
  return {
    x: cubic(a.x, b.x, c.x, end.x, t),
    y: cubic(a.y, b.y, c.y, end.y, t),
    angle: (Math.atan2(dy, dx) * 180) / Math.PI - NOSE_ANGLE,
  };
}
