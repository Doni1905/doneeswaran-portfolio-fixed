import { EXPERIENCES } from '../data/portfolioData';

export function ExperienceChapter() {
  return (
    <section className="experience wrap" id="experience" aria-labelledby="experience-title">
      <p className="eyebrow">Experience & Leadership</p>

      {EXPERIENCES.map((exp, idx) => (
        <div key={idx} className="role">
          <div className="role-year">{exp.period.split(' – ')[0] || exp.period}</div>
          <h2>
            {exp.role}
            <br />
            <a
              href={exp.company.includes('TPConnects') ? "https://tpconnects.com/" : "#top"}
              target={exp.company.includes('TPConnects') ? "_blank" : undefined}
              rel="noreferrer"
            >
              {exp.company} ↗
            </a>
          </h2>
          <div>
            <p>{exp.achievements[0]}</p>
            {exp.achievements[1] && (
              <p className="mt-3 text-neutral-500 text-xs font-mono leading-relaxed">
                {exp.achievements[1]}
              </p>
            )}
            {exp.company.includes('TPConnects') && (
              <p className="mt-2 text-xs font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <strong>Incident Triage:</strong> Migrated Redis to in-cluster EKS and resolved pod OOMKilled events via tuned container memory limits.
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
