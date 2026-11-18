import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { makeFlightPath, sampleFlightPath, sampleArrival, FlightSegment, FlightPoint } from '../lib/flightPath';
import { Activity, ShieldCheck, Terminal, Cpu, Radio, Sparkles, Volume2, VolumeX, Eye, ArrowUpRight } from 'lucide-react';

export type VehicleType = 'pod' | 'glider' | 'drone';

interface DevOpsFlightEngineProps {
  onSwitchToClassic?: () => void;
}

export function DevOpsFlightEngine({ onSwitchToClassic }: DevOpsFlightEngineProps) {
  const planeRef = useRef<HTMLDivElement>(null);
  const traceLeftRef = useRef<SVGPathElement>(null);
  const traceRightRef = useRef<SVGPathElement>(null);

  const [vehicle, setVehicle] = useState<VehicleType>('pod');
  const [isStunting, setIsStunting] = useState(false);
  const [hudOpen, setHudOpen] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Live telemetry state
  const [telemetry, setTelemetry] = useState({
    altitude: 1200,
    speed: 0,
    stage: 'Git Commit (Local Workspace)',
    stageIndex: 1,
    cluster: 'aws // us-east-1 // prod-eks',
    pods: '12/12 READY',
    activeSection: 'intro',
  });

  // Audio synthesis using Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);

  const playStuntSound = useCallback(() => {
    if (!audioEnabled) return;
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Audio context policy safe fallback
    }
  }, [audioEnabled]);

  const triggerBarrelRoll = () => {
    if (isStunting) return;
    setIsStunting(true);
    playStuntSound();
    setTimeout(() => {
      setIsStunting(false);
    }, 900);
  };

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    const plane = planeRef.current;
    const traceLeft = traceLeftRef.current;
    const traceRight = traceRightRef.current;
    if (!plane) return;

    let frame = 0;
    let route: FlightPoint[] = [];
    let segments: FlightSegment[] = [];
    let startY = 0;
    let glideEnd = 0;
    let planeWidth = 240;
    let planeHeight = 160;
    let currentY: number | null = null;
    let lastTime = 0;
    let arrivalStart: number | null = null;
    let arrivalReady = !document.fonts || document.fonts.status === 'loaded';
    let arrivalDone = Boolean(location.hash && location.hash !== '#top');
    let previousAngle = 0;
    let previousScroll = window.scrollY;

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

      const home = document.querySelector('.plane-home') as HTMLElement | null;
      const inspection = box(document.querySelector('#inspection'));
      const work = box(document.querySelector('#work'));
      const experience = box(document.querySelector('#experience'));
      const research = box(document.querySelector('#research'));
      const archive = box(document.querySelector('#archive'));
      const contact = box(document.querySelector('#contact'));

      const h = box(home);
      planeWidth = mobile ? 120 : 200;
      planeHeight = (planeWidth * 2) / 3;

      const edge = mobile ? W - 36 : W - 90;
      const left = mobile ? 36 : 90;
      startY = h.top + h.height / 2 || H * 0.28;

      const rawRoute = [
        { x: (h.left || W * 0.75) + (h.width || 240) / 2, y: startY, view: 0.32 },
        { x: edge, y: Math.max(startY + 180, (inspection.top || 600) + 80), view: 0.20 },
        { x: left, y: (work.top || 1400) + 60, view: mobile ? 0.80 : 0.72 },
        { x: edge, y: (experience.top || 2400) + 60, view: 0.38 },
        { x: left, y: (research.top || 3200) + 60, view: 0.65 },
        { x: mobile ? 50 : 145, y: (archive.top || 4000) + 40, view: 0.40 },
        { x: W * 0.82, y: (contact.top || 4800) + (contact.height || 400) * 0.64, view: 0.42 },
      ];

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);

      route = rawRoute.map((p, i) => ({
        x: p.x,
        y: i === 0 ? startY : p.view * H,
        at: i === 0 ? 0 : Math.max(0, p.y - p.view * H),
      }));

      if (mobile) {
        route[1].at = Math.max(150, (inspection.top || 400) - H * 0.6);
        route[2] = { x: W - 44, y: H * 0.18, at: (work.top || 1200) + 12 };
        route[3] = { x: W - 44, y: H * 0.30, at: (experience.top || 2200) - H * 0.32 };
        route[4] = { x: 44, y: H * 0.52, at: (research.top || 3000) };
      }

      route[route.length - 1].y = clamp((contact.top || 4800) + (contact.height || 400) * 0.64 - maxScroll, H * 0.2, H * 0.8);
      route[route.length - 1].at = maxScroll;

      route.forEach((p, i) => {
        if (i) p.at = Math.max(p.at, route[i - 1].at + 120);
      });

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
      if (document.hidden || !segments.length || !plane) return;

      const target = clamp(window.scrollY, 0, route[route.length - 1]?.at || 5000);
      const dt = Math.min(50, Math.max(1, time - lastTime));
      lastTime = time;

      // Calculate instantaneous scroll speed
      const scrollDelta = Math.abs(window.scrollY - previousScroll);
      previousScroll = window.scrollY;
      const calculatedSpeed = Math.min(180, Math.round((scrollDelta / dt) * 60));

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

      // Compute aerodynamic banking roll (angle change derivative)
      const angularVelocity = (p.angle - previousAngle) / (dt || 1);
      previousAngle = p.angle;
      const bankRoll = clamp(angularVelocity * 22, -35, 35);
      const pitch = clamp(p.dy * 0.15, -20, 20);

      const scale = mix(1, mobile ? 0.55 : 0.72, ease(clamp((currentY - glideEnd) / 420)));

      // 3D Matrix Transform (Aerodynamic banking!)
      plane.style.transform = `
        translate3d(${p.x - planeWidth / 2}px, ${p.y - planeHeight / 2}px, 0)
        rotateZ(${p.angle}deg)
        rotateY(${bankRoll}deg)
        rotateX(${pitch}deg)
        scale(${scale})
      `;

      // Dual Fiber-Optic Contrails (Wingtip / Thruster trails)
      if (traceLeft && traceRight) {
        const leftMarks: string[] = [];
        const rightMarks: string[] = [];
        let distance = 0;
        let previous = p;

        // Offset perpendicular to flight angle
        const rad = (p.angle * Math.PI) / 180;
        const perpX = Math.cos(rad + Math.PI / 2);
        const perpY = Math.sin(rad + Math.PI / 2);
        const wingSpan = (planeWidth * scale * 0.38) / 2;

        for (let yy = currentY - 3; yy >= 0 && yy > currentY - 380 && distance < 160; yy -= 3) {
          const q = sampleFlightPath(segments, yy);
          distance += Math.hypot(q.x - previous.x, q.y - previous.y);
          previous = q;
          if (distance > 18) {
            leftMarks.push(`${(q.x - perpX * wingSpan).toFixed(1)},${(q.y - perpY * wingSpan).toFixed(1)}`);
            rightMarks.push(`${(q.x + perpX * wingSpan).toFixed(1)},${(q.y + perpY * wingSpan).toFixed(1)}`);
          }
        }

        traceLeft.setAttribute('d', leftMarks.length ? 'M' + leftMarks.join(' L') : '');
        traceRight.setAttribute('d', rightMarks.length ? 'M' + rightMarks.join(' L') : '');
      }

      // Update Telemetry Info periodically
      if (Math.random() < 0.15 || Math.abs(currentY - target) > 1) {
        const H = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight - H;
        const scrollPct = clamp(window.scrollY / (totalHeight || 1), 0, 1);
        const alt = Math.round(1200 + scrollPct * 36800);

        let stage = 'Git Commit (Local Workspace)';
        let stageIndex = 1;
        let section = 'intro';

        if (window.scrollY > 3800) {
          stage = 'Production Live (99.99% Uptime)';
          stageIndex = 5;
          section = 'contact';
        } else if (window.scrollY > 2800) {
          stage = 'Edge AI / STGNN Inference Gateway';
          stageIndex = 4;
          section = 'research';
        } else if (window.scrollY > 1900) {
          stage = 'Amazon EKS Ingress & Pod Mesh';
          stageIndex = 3;
          section = 'experience';
        } else if (window.scrollY > 700) {
          stage = 'Argo CD GitOps Pull & Crossplane IaC';
          stageIndex = 2;
          section = 'inspection';
        }

        setTelemetry((prev) => ({
          ...prev,
          altitude: alt,
          speed: calculatedSpeed,
          stage,
          stageIndex,
          activeSection: section,
        }));
      }

      if (!arrivalDone || Math.abs(currentY - target) > 0.15 || isStunting) {
        frame = requestAnimationFrame(draw);
      }
    }

    function requestDraw() {
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    }

    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', measure);

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
    };
  }, [isStunting, audioEnabled]);

  const scrollToWaypoint = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dynamic Dual Glowing Fiber-Optic Contrails */}
      <svg className="fixed inset-0 pointer-events-none z-[99] w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="devopsGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#4facfe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
          <filter id="devopsContrailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={traceLeftRef}
          fill="none"
          stroke="url(#devopsGlowGradient)"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
          filter="url(#devopsContrailGlow)"
        />
        <path
          ref={traceRightRef}
          fill="none"
          stroke="url(#devopsGlowGradient)"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
          filter="url(#devopsContrailGlow)"
        />
      </svg>

      {/* Travelling Aircraft / Container Shuttle with 3D Banking */}
      <div
        ref={planeRef}
        onClick={triggerBarrelRoll}
        className={`fixed left-0 top-0 pointer-events-auto z-[100] cursor-pointer will-change-transform select-none transition-transform duration-75 ${isStunting ? 'animate-[spin_0.85s_cubic-bezier(0.4,0,0.2,1)]' : ''
          }`}
        style={{
          width: '200px',
          height: '133px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 25px rgba(15, 23, 42, 0.22)) drop-shadow(0 0 15px rgba(56, 189, 248, 0.25))',
        }}
        title="Click to execute deployment barrel roll!"
      >
        {/* Render Vehicle by chosen skin */}
        {vehicle === 'pod' && (
          <div className="relative w-full h-full flex items-center justify-center group">
            {/* Supersonic Deployment Shuttle / Container Capsule */}
            <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md">
              {/* Thruster Flame Glow */}
              <ellipse cx="40" cy="80" rx="22" ry="12" fill="#38bdf8" opacity="0.75" className="animate-pulse" />
              <ellipse cx="32" cy="80" rx="14" ry="7" fill="#ffffff" opacity="0.9" />

              {/* Main Fuselage / Capsule Body */}
              <path
                d="M 50 65 L 180 65 Q 220 80 180 95 L 50 95 Q 40 80 50 65 Z"
                fill="url(#capsuleGrad)"
                stroke="#0f172a"
                strokeWidth="2.5"
              />

              {/* Delta Wings */}
              <path
                d="M 90 65 L 130 20 L 155 65 Z"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <path
                d="M 90 95 L 130 140 L 155 95 Z"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="2"
              />

              {/* Wingtip Avionics Lights */}
              <circle cx="130" cy="20" r="3.5" fill="#38bdf8" className="animate-ping" />
              <circle cx="130" cy="140" r="3.5" fill="#22c55e" className="animate-ping" />

              {/* Cockpit Canopy */}
              <ellipse cx="170" cy="80" rx="22" ry="7" fill="#0284c7" opacity="0.9" />
              <ellipse cx="172" cy="79" rx="14" ry="3.5" fill="#e0f2fe" opacity="0.7" />

              {/* Kubernetes Hexagon Emblem / DevOps Logo */}
              <polygon
                points="115,74 122,70 129,74 129,82 122,86 115,82"
                fill="#326ce5"
                stroke="#ffffff"
                strokeWidth="1"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>
            </svg>

            {/* Micro Hover Hint */}
            <span className="absolute -bottom-6 bg-slate-900/90 text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              ⚡ Click for Barrel Roll
            </span>
          </div>
        )}

        {vehicle === 'glider' && (
          <div className="relative w-full h-full flex items-center justify-center group">
            <img
              src="/assets/glider-color.webp"
              alt="High-Tech Paper Glider"
              width="200"
              height="133"
              className="select-none pointer-events-none"
            />
            <span className="absolute -bottom-6 bg-slate-900/90 text-[10px] text-blue-300 font-mono px-2 py-0.5 rounded-full border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              ✈️ Click for Barrel Roll
            </span>
          </div>
        )}

        {vehicle === 'drone' && (
          <div className="relative w-full h-full flex items-center justify-center group">
            {/* Edge AI IoT Quad-Drone SVG */}
            <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-lg">
              {/* Rotor Arms */}
              <line x1="70" y1="40" x2="170" y2="120" stroke="#475569" strokeWidth="4" />
              <line x1="70" y1="120" x2="170" y2="40" stroke="#475569" strokeWidth="4" />

              {/* Quad Rotors (Rotating effect) */}
              <circle cx="70" cy="40" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" />
              <circle cx="170" cy="40" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" />
              <circle cx="70" cy="120" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" />
              <circle cx="170" cy="120" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" />

              {/* Central Core Chassis (ESP32 / Edge Unit) */}
              <rect x="95" y="60" width="50" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="120" cy="80" r="10" fill="#0284c7" />
              <circle cx="120" cy="80" r="4" fill="#a5f3fc" className="animate-ping" />
            </svg>
            <span className="absolute -bottom-6 bg-slate-900/90 text-[10px] text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              🛸 ESP32 Edge Sensor Probe
            </span>
          </div>
        )}
      </div>

      {/* Floating DevOps Telemetry Cockpit HUD */}
      <aside
        aria-label="DevOps Flight Telemetry Cockpit"
        className="fixed bottom-5 right-5 z-[999] pointer-events-auto transition-all duration-300 max-w-[340px] w-full font-mono select-none"
      >
        <div className="bg-slate-950/85 backdrop-blur-md text-slate-200 border border-slate-800 rounded-2xl shadow-2xl p-4 overflow-hidden relative">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-slate-100 uppercase">
                DEVOPS HUD :: PIPELINE
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Audio Toggle */}
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title={audioEnabled ? "Disable flight audio" : "Enable flight audio"}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Collapse HUD Toggle */}
              <button
                type="button"
                onClick={() => setHudOpen(!hudOpen)}
                className="text-[10px] text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
              >
                {hudOpen ? 'MIN' : 'EXP'}
              </button>
            </div>
          </div>

          {hudOpen ? (
            <div className="space-y-3">
              {/* Target & Cluster Info */}
              <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800/80 text-xs">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                  <span>TARGET CLUSTER</span>
                  <span className="text-cyan-400 font-semibold">{telemetry.cluster}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-300">STAGE [{telemetry.stageIndex}/5]:</span>
                  <span className="text-emerald-400 font-semibold truncate max-w-[160px] text-right">
                    {telemetry.stage}
                  </span>
                </div>
              </div>

              {/* Telemetry Gauges (Speed & Alt) */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider">Scroll IAS</div>
                  <div className="text-base font-bold text-cyan-300 mt-0.5">
                    {telemetry.speed} <span className="text-[10px] font-normal text-slate-400">KTS</span>
                  </div>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider">Alt (Depth)</div>
                  <div className="text-base font-bold text-emerald-300 mt-0.5">
                    {telemetry.altitude.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">FT</span>
                  </div>
                </div>
              </div>

              {/* Autopilot Waypoint Jump Radar */}
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                  <span>Autopilot Waypoints</span>
                  <span className="text-[9px] text-cyan-400">Click to fly</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => scrollToWaypoint('#inspection')}
                    className="p-1 rounded bg-slate-900 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 transition-colors text-center"
                  >
                    IaC
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToWaypoint('#work')}
                    className="p-1 rounded bg-slate-900 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 transition-colors text-center"
                  >
                    EKS
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToWaypoint('#research')}
                    className="p-1 rounded bg-slate-900 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 transition-colors text-center"
                  >
                    IEEE
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToWaypoint('#contact')}
                    className="p-1 rounded bg-slate-900 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 transition-colors text-center"
                  >
                    Prod
                  </button>
                </div>
              </div>

              {/* Vehicle Skin Switcher */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-[10px] text-slate-400">Craft:</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setVehicle('pod')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${vehicle === 'pod' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    🚀 Pod
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicle('glider')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${vehicle === 'glider' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    ✈️ Glider
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicle('drone')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${vehicle === 'drone' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    🛸 Drone
                  </button>
                </div>
              </div>

              {/* Switch back to Classic button */}
              {onSwitchToClassic && (
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={onSwitchToClassic}
                    className="text-[10px] text-slate-400 hover:text-cyan-400 underline underline-offset-2 transition-colors"
                  >
                    Switch back to Classic RahulM Engine
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Collapsed Pill View */
            <div className="flex justify-between items-center text-xs">
              <span className="text-cyan-300 font-bold">{telemetry.speed} KTS</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400 truncate max-w-[140px]">{telemetry.stage}</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}