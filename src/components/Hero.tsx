import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, GitBranch, Cpu, ArrowUpRight, Copy, Check, Terminal, ExternalLink, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const verbs = ['ships', 'architects', 'automates', 'scales'];

export function Hero() {
  const [verbIndex, setVerbIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % verbs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 px-6 max-w-6xl mx-auto min-h-[88vh] flex flex-col justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Recruiter Live Status Badge */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {PERSONAL_INFO.status}
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
          {PERSONAL_INFO.location}
        </div>
      </div>

      {/* 2. Primary Headline (Editorial Serif Accent + DM Sans) */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-5xl leading-[1.12]">
        Doneeswaran{' '}
        <span className="inline-block relative min-w-[170px] sm:min-w-[240px] md:min-w-[280px] h-[1.15em] align-top overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={verbs[verbIndex]}
              initial={{ y: 35, opacity: 0, rotateX: -25 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -35, opacity: 0, rotateX: 25 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="absolute left-0 top-0 font-['Instrument_Serif',serif] italic font-normal text-emerald-400 text-5xl sm:text-7xl md:text-8xl"
            >
              {verbs[verbIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <br />
        resilient cloud infrastructure and edge AI systems.
      </h1>

      {/* 3. Subtitle / Value Proposition */}
      <p className="mt-6 text-base sm:text-xl text-neutral-400 max-w-3xl leading-relaxed font-light">
        Final-year B.Tech in Artificial Intelligence & Machine Learning with production DevOps internship experience at{' '}
        <strong className="text-white font-medium">TPConnects (Dubai)</strong> taking enterprise dashboards to{' '}
        <strong className="text-emerald-400 font-medium font-mono">Amazon EKS</strong> via{' '}
        <strong className="text-white font-medium">Argo CD GitOps</strong> & Crossplane. IEEE-published deep learning researcher.
      </p>

      {/* 4. Three High-Velocity Recruiter Proof Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Production DevOps */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Production DevOps</span>
          </div>
          <p className="mt-3 text-sm text-neutral-200 font-medium">
            Production EKS Rollout, GitOps with Argo CD & Crossplane IaC at TPConnects Dubai.
          </p>
          <span className="mt-3 text-xs font-mono text-emerald-400">Kubernetes • ALB • Aurora PG</span>
        </div>

        {/* Card 2: Published Researcher */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between">
          <div className="flex items-center gap-3 text-teal-400">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">IEEE Research</span>
          </div>
          <p className="mt-3 text-sm text-neutral-200 font-medium">
            Published author at IEEE ICIDCA 2025: Hybrid LSTM-STGNN with 12% lower prediction error.
          </p>
          <span className="mt-3 text-xs font-mono text-teal-400">Deep Learning • STGNN • Seismology</span>
        </div>

        {/* Card 3: Edge AI & Systems */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Edge AI & IoT</span>
          </div>
          <p className="mt-3 text-sm text-neutral-200 font-medium">
            Sub-200ms real-time computer vision on ESP32-CAM + OpenCV for assistive devices.
          </p>
          <span className="mt-3 text-xs font-mono text-emerald-400">ESP32 • SIFT/HSV • Micro-inference</span>
        </div>
      </div>

      {/* 5. Direct Action Callouts (The 7.4-second exit) */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 group"
        >
          Explore Work & Architecture
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <button
          onClick={handleCopyEmail}
          className="px-5 py-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-xs flex items-center gap-2 transition-all hover:bg-neutral-800"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
          <span>{copied ? 'Copied to Clipboard!' : PERSONAL_INFO.email}</span>
        </button>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 rounded-full border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-mono text-xs flex items-center gap-2 transition-all hover:text-white"
        >
          <Terminal className="w-4 h-4 text-neutral-400" />
          <span>github.com/Doneeswaran</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
        </a>
      </div>
    </section>
  );
}
