import { PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

export function ArchiveSection() {
  return (
    <section className="archive wrap" id="archive" aria-labelledby="archive-title">
      <p className="eyebrow" id="archive-title">The Collection</p>

      {/* Accordion 1: All Projects */}
      <details id="all-projects" open>
        <summary>
          <span>All projects & systems</span>
          <span>
            04 <i aria-hidden="true">+</i>
          </span>
        </summary>
        <div className="project-list">
          {PROJECTS.map((p) => (
            <a key={p.id} href={p.githubUrl || "#work"} target={p.githubUrl ? "_blank" : undefined} rel="noreferrer">
              <strong>{p.title.split(' - ')[0]}</strong>
              <span>{p.subtitle}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </details>

      {/* Accordion 2: Skills by Domain */}
      <details id="skills-list">
        <summary>
          <span>Technical skills & stack</span>
          <span>
            28 <i aria-hidden="true">+</i>
          </span>
        </summary>
        <div className="py-6 space-y-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="pb-4 border-b border-neutral-100 last:border-0">
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-2 font-semibold">
                {cat.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-100 text-neutral-800 border border-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>

      {/* Accordion 3: Certifications & Education */}
      <details id="recognition">
        <summary>
          <span>Certifications & Education</span>
          <span>
            05 <i aria-hidden="true">+</i>
          </span>
        </summary>
        <div className="py-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, cidx) => (
              <div key={cidx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-mono text-emerald-700 font-semibold uppercase">{cert.issuer}</span>
                <h4 className="font-medium text-neutral-900 text-sm mt-1">{cert.title}</h4>
                {cert.date && <span className="text-xs text-neutral-500 font-mono mt-1 block">{cert.date}</span>}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 space-y-3">
            {EDUCATION.map((edu, eidx) => (
              <div key={eidx} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm py-2">
                <div>
                  <strong className="text-neutral-900 block">{edu.degree}</strong>
                  <span className="text-neutral-500 text-xs">{edu.institution}</span>
                </div>
                <span className="text-xs font-mono text-neutral-500">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}
