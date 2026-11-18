import { CheckCircle, Award, GraduationCap, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-800/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Technical Breadth</span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Skills, Certifications & Education
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-md font-light">
          Contextual proficiencies built across production cloud operations, embedded hardware, and AI research.
        </p>
      </div>

      {/* Skills Matrix by Domain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-800/70 text-neutral-300 border border-neutral-700/50 hover:border-emerald-500/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Certifications Card */}
        <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Certifications & Training
            </h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, cidx) => (
                <div
                  key={cidx}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs flex flex-col gap-1"
                >
                  <strong className="text-neutral-200 font-medium">{cert.title}</strong>
                  <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px]">
                    <span>{cert.issuer}</span>
                    {cert.date && <span className="text-emerald-400">{cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline */}
      <div className="mt-16 pt-12 border-t border-neutral-800/80">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          Academic Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, eidx) => (
            <div
              key={eidx}
              className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-emerald-400">{edu.period}</span>
                <h4 className="text-lg font-bold text-white mt-1">{edu.degree}</h4>
                <p className="text-neutral-400 text-sm mt-1">{edu.institution}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800/60">
                <span className="inline-block px-2.5 py-1 rounded text-xs font-mono bg-neutral-800 text-neutral-300">
                  {edu.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
