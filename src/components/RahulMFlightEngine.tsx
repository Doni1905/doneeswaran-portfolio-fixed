import { useEffect, useRef } from 'react';
import { makeFlightPath, sampleFlightPath, sampleArrival, FlightSegment, FlightPoint } from '../lib/flightPath';

export function RahulMFlightEngine() {
  const planeRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    const plane = planeRef.current;
    const trace = traceRef.current;
    if (!plane || !trace) return;

    // Enable flight styles on body
    document.body.classList.add('flight-on', 'motion-on');

    const home = document.querySelector('.plane-home') as HTMLElement | null;
    const cup = document.querySelector('.coffee-object') as HTMLElement | null;
    const steam = document.querySelector('.steam') as HTMLElement | null;
    const lens = document.querySelector('.magnifier-object') as HTMLElement | null;
    const question = document.querySelector('.question') as HTMLElement | null;
    const discovery = document.querySelector('.discovery') as HTMLElement | null;

    let frame = 0;
    let route: FlightPoint[] = [];
    let segments: FlightSegment[] = [];
    let startY = 0;
    let glideEnd = 0;
    let planeWidth = 280;
    let planeHeight = 186;
    let currentY: number | null = null;
    let lastTime = 0;
    let arrivalStart: number | null = null;
    let arrivalReady = !document.fonts || document.fonts.status === 'loaded';
    let arrivalDone = Boolean(location.hash && location.hash !== '#top');
    let paused = preference.matches;

    const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t * t * (3 - 2 * t);

    const box = (el: Element | null) => {
      if (!el) return { top: 0, bottom: 0, height: 0, left: 0, width: 0 };
      const r = el.getBoundingClientRect();
      return {
        top: r.top + window.scrollY,
        bottom: r.bottom + window.scrollY,
        height: r.height,
        left: r.left,
        width: r.width,
      };
    };

    function measure() {
      const W = document.documentElement.clientWidth;
      const H = window.innerHeight;
      const mobile = W <= 650;

      const h = box(home);
      const inspection = box(document.querySelector('#inspection'));
      const work = box(document.querySelector('#work'));
      const experience = box(document.querySelector('#experience'));
      const research = box(document.querySelector('#research'));
      const archive = box(document.querySelector('#archive'));
      const contact = box(document.querySelector('#contact'));

      planeWidth = mobile ? 180 : 280;
      planeHeight = (planeWidth * 2) / 3;

      const edge = mobile ? W - 76 : W - 110;
      const left = mobile ? 76 : 110;
      startY = h.top + h.height / 2 || H * 0.28;

      // Waypoints mapped with screen-space viewport heights (p.view * H)
      // Broad bends happen in whitespace between products
      const rawRoute = [
        { x: (h.left || W * 0.75) + (h.width || 280) / 2, y: startY, view: 0.32 },
        { x: edge, y: Math.max(startY + 180, (inspection.top || 600) + 80), view: 0.20 },
        { x: left, y: (work.top || 1400) + 60, view: mobile ? 0.80 : 0.72 },
        { x: edge, y: (experience.top || 2400) + 60, view: 0.38 },
        { x: left, y: (research.top || 3200) + 60, view: 0.65 },
        { x: mobile ? 80 : 145, y: (archive.top || 4000) + 40, view: 0.40 },
        { x: mobile ? W - 80 : W * 0.82, y: (contact.top || 4800) + (contact.height || 400) * 0.64, view: 0.42 },
      ];

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);

      // Convert document Y to screen viewport Y: p.view * H
      // and map at to the exact scroll position where element reaches that viewport line
      route = rawRoute.map((p, i) => ({
        x: p.x,
        y: i === 0 ? startY : p.view * H,
        at: i === 0 ? 0 : Math.max(0, p.y - p.view * H),
      }));

      route[route.length - 1].y = clamp((contact.top || 4800) + (contact.height || 400) * 0.64 - maxScroll, H * 0.2, H * 0.8);
      route[route.length - 1].at = maxScroll;

      route.forEach((p, i) => {
        if (i) p.at = Math.max(p.at, route[i - 1].at + 120);
      });

      // Launch glide forward on a shallow diagonal
      glideEnd = Math.min(mobile ? 190 : 260, route[1].at * 0.55);
      const glide = mobile ? 42 : 85;
      const drop = glide * 0.2;
      route[0].x -= glide;
      const velocity = { x: glide / glideEnd, y: drop / glideEnd };
      route[0].velocity = velocity;
      route[1].x = route[0].x + glide + 12;
      route[1].y = Math.min(H * 0.78, startY + drop + (mobile ? 95 : 155));
      route.splice(1, 0, { x: route[0].x + glide, y: startY + drop, at: glideEnd, velocity });

      segments = makeFlightPath(route, W, H);
      requestDraw();
    }

    function draw(time: number) {
      frame = 0;
      if (paused || document.hidden || !segments.length || !plane || !trace) return;
      if (!arrivalDone && !arrivalReady) {
        plane.style.opacity = '0';
        return;
      }

      const target = clamp(window.scrollY, 0, route[route.length - 1]?.at || 5000);
      const dt = Math.min(50, Math.max(1, time - lastTime));
      lastTime = time;

      // Exponential damping
      currentY = currentY === null ? target : mix(currentY, target, 1 - Math.exp(-dt / 85));

      let p = sampleFlightPath(segments, currentY);
      const mobile = window.innerWidth <= 650;

      if (!arrivalDone) {
        arrivalStart ??= time;
        const progress = clamp((time - arrivalStart) / 1600);
        const blend = ease(clamp(target / 150));
        const entry = sampleArrival(sampleFlightPath(segments, 0), 1 - (1 - progress) ** 3, mobile);
        p = {
          x: mix(entry.x, p.x, blend),
          y: mix(entry.y, p.y, blend),
          angle: mix(entry.angle, p.angle, blend),
          dx: p.dx,
          dy: p.dy,
        };
        arrivalDone = progress === 1 || blend === 1;
        plane.style.opacity = String(clamp(progress / 0.15));
      } else {
        plane.style.opacity = '1';
      }

      const scale = mix(1, mobile ? 0.68 : 0.62, ease(clamp((currentY - glideEnd) / 420)));

      // Keep the shared curve inside a narrow viewport, including rotated wings.
      const fitMobile = <T extends { x: number; y: number; angle: number }>(point: T): T => {
        if (!mobile) return point;
        const angle = point.angle * Math.PI / 180;
        const halfW = scale * (Math.abs(Math.cos(angle)) * planeWidth + Math.abs(Math.sin(angle)) * planeHeight) / 2 + 4;
        const halfH = scale * (Math.abs(Math.sin(angle)) * planeWidth + Math.abs(Math.cos(angle)) * planeHeight) / 2 + 4;
        return { ...point, x: clamp(point.x, halfW, document.documentElement.clientWidth - halfW), y: clamp(point.y, halfH, innerHeight - halfH) };
      };
      p = fitMobile(p);

      // Transform fixed plane in screen-space
      plane.style.transform = `translate3d(${p.x - planeWidth / 2}px, ${p.y - planeHeight / 2}px, 0) rotate(${p.angle}deg) scale(${scale})`;

      // Contrail vapor trail
      const marks: string[] = [];
      let distance = 0;
      let previous = p;
      for (let yy = currentY - 3; yy >= 0 && yy > currentY - 360 && distance < 135; yy -= 3) {
        const q = fitMobile(sampleFlightPath(segments, yy));
        distance += Math.hypot(q.x - previous.x, q.y - previous.y);
        previous = q;
        if (distance > planeWidth * scale * 0.34) {
          marks.push(`${q.x.toFixed(1)},${q.y.toFixed(1)}`);
        }
      }
      trace.setAttribute('d', marks.length ? 'M' + marks.join(' L') : '');

      // Physical objects linked to scroll focus
      const getProgress = (el: HTMLElement | null) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return clamp((window.innerHeight * 0.9 - r.top) / (window.innerHeight * 0.85));
      };

      if (cup) {
        const focus = getProgress(cup);
        cup.style.transform = `translate3d(${(1 - focus) * 18}px, ${(1 - focus) * -28}px, 0) rotate(${(1 - focus) * -7}deg)`;
        if (steam) {
          steam.style.opacity = String(Math.sin(clamp((focus - 0.2) / 0.8) * Math.PI) * 0.8);
          steam.style.transform = `translateY(${-focus * 30}px)`;
        }
      }

      if (lens) {
        const inspect = getProgress(lens);
        lens.style.transform = `translateX(${mix(-12, 16, inspect)}px) rotate(${mix(-8, 5, inspect)}deg)`;
        const reveal = clamp((inspect - 0.25) / 0.5);
        if (discovery) {
          discovery.style.opacity = String(reveal);
        }
        if (question) {
          question.style.opacity = String(1 - reveal);
        }
      }

      if (!arrivalDone || Math.abs(currentY - target) > 0.15) {
        frame = requestAnimationFrame(draw);
      }
    }

    function requestDraw() {
      if (!frame && !paused) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    }

    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', measure);

    // Initial measurement
    if (document.fonts) {
      document.fonts.ready.then(() => {
        arrivalReady = true;
        measure();
      });
    } else {
      setTimeout(measure, 100);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestDraw);
      window.removeEventListener('resize', measure);
      document.body.classList.remove('flight-on', 'motion-on');
    };
  }, []);

  return (
    <div className="flight-layer" aria-hidden="true">
      <svg className="plane-trail" aria-hidden="true">
        <path ref={traceRef} />
      </svg>
      <div ref={planeRef} className="travelling-plane" aria-hidden="true">
        <img
          src="assets/glider-color.webp"
          alt=""
          width="280"
          height="186"
          className="select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
