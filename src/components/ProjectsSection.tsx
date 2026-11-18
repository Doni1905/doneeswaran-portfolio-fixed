import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight, Zap } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsSectionProps {
  isCinematic: boolean;
}

export function ProjectsSection({ isCinematic }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'DevOps & Cloud', 'Edge AI & IoT', 'Full Stack'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-800/80">
      {/* Header & Filter Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Featured Projects</span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Engineered Systems & Measured Outcomes
          </h2>
          <p className="mt-2 text-neutral-400 text-sm max-w-lg font-light">
            Every project addresses an operational bottleneck or edge-device limitation with concrete performance metrics.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                selectedFilter === cat
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.id}
            layoutId={isCinematic ? `project-${project.id}` : undefined}
            initial={{ opacity: 0, y: isCinematic ? 20 : 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between relative overflow-hidden group shadow-xl transition-all"
          >
            <div>
              {/* Category & Year */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-neutral-800/80 text-emerald-400 border border-neutral-700/60">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-neutral-500">{project.period}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">{project.subtitle}</p>

              {/* Problem / Engineering description */}
              <div className="mt-5 space-y-3 text-sm text-neutral-300 font-light leading-relaxed">
                <p>
                  <strong className="text-neutral-400 font-normal">Challenge:</strong> {project.problem}
                </p>
                <p>
                  <strong className="text-neutral-400 font-normal">Solution:</strong> {project.solution}
                </p>
              </div>

              {/* Architecture Highlight Pill */}
              <div className="mt-4 px-3.5 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{project.architectureHighlight}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80">
              {/* Quantified Outcome Highlight Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-mono text-emerald-400 block mb-0.5">Quantified Metric:</strong>
                  {project.outcome}
                </div>
              </div>

              {/* Stack tags & Links */}
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.stack.slice(0, 4).map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800/60 text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[11px] font-mono text-neutral-500 self-center">
                      +{project.stack.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-emerald-400 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
