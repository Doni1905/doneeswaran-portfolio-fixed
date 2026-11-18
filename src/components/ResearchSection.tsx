import { BookOpen, Award, ArrowUpRight, Network, Activity } from 'lucide-react';
import { RESEARCH } from '../data/portfolioData';

export function ResearchSection() {
  return (
    <section id="research" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Scholarly Work</span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Published IEEE Research
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md font-light">
          Advancing reliable deep learning frameworks for spatial-temporal graph modeling and seismic hazard estimation.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-900/40 to-neutral-950 border border-neutral-800 hover:border-neutral-700/80 transition-all shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Award className="w-3.5 h-3.5" />
            {RESEARCH.conference}
          </span>
          <span className="text-xs font-mono text-neutral-500">{RESEARCH.year}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white max-w-4xl leading-tight">
          {RESEARCH.title}
        </h3>

        <p className="mt-6 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
          {RESEARCH.summary}
        </p>

        {/* Quantified Benchmark Metric */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-teal-500/30 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block">Validated Performance</span>
              <p className="text-white font-medium text-sm mt-1">{RESEARCH.metric}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">Topology Innovation</span>
              <p className="text-white font-medium text-sm mt-1">
                Fuses spatial faultline connectivity graphs with recurrent time-series telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-2">
          {RESEARCH.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-800/60 text-neutral-300 border border-neutral-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
