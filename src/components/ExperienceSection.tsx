import { Briefcase, MapPin, Calendar, CheckCircle2, ShieldCheck, Server, AlertTriangle } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Track Record</span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Work Experience & Production Impact
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md font-light">
          Real battle-tested operations: Kubernetes production migrations, GitOps automation, and incident triage in enterprise environments.
        </p>
      </div>

      <div className="space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="p-8 sm:p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800 relative overflow-hidden group hover:border-neutral-700/80 transition-all shadow-xl"
          >
            {/* Top metadata row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/60">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {exp.type}
                  </span>
                </div>
                <div className="text-lg font-medium text-neutral-300 mt-1 flex items-center gap-2">
                  <span>{exp.company}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-sm text-neutral-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-800/60 px-4 py-2 rounded-xl self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {exp.period}
              </div>
            </div>

            {/* Achievements List */}
            <div className="mt-8 space-y-4">
              {exp.achievements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Special Incident / Infrastructure Spotlight for TPConnects */}
            {exp.company.includes('TPConnects') && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-neutral-800/60">
                <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3">
                  <Server className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-neutral-200 block font-semibold mb-1">GitOps & Secrets Orchestration</strong>
                    <span className="text-neutral-400 leading-normal">
                      Configured Argo CD ApplicationSets with pull-based reconciliations and decoupled secret management via External Secrets Operator + EKS Pod Identity.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-neutral-200 block font-semibold mb-1">OOMKilled Incident Triage</strong>
                    <span className="text-neutral-400 leading-normal">
                      Analyzed memory leakage in dashboard pod containers, isolated cgroup spikes in ElastiCache-to-EKS Redis migration, and tuned container memory-limit requests.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tech badges */}
            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-wrap gap-2">
              {exp.technologies.map((t, tidx) => (
                <span
                  key={tidx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-800/50 text-neutral-300 border border-neutral-700/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
