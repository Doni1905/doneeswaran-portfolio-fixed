import { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';

export function ShowcaseDock() {
  const [activeTab, setActiveTab] = useState<string>('todos-kanban');

  const activeProject = PROJECTS.find((p) => p.id === activeTab) || PROJECTS[0];

  const dockApps = [
    { id: 'todos-kanban', label: 'TODOS', iconText: 'EKS', color: '#10b981' },
    { id: 'currency-hub', label: 'Currency', iconText: 'AI', color: '#3b82f6' },
    { id: 'ai-transcription', label: 'Whisper', iconText: 'ASR', color: '#8b5cf6' },
    { id: 'eduease', label: 'EDUEASE', iconText: 'RBAC', color: '#f59e0b' },
  ];

  return (
    <div className="showcase wrap" id="work">
      {/* The App Dock row */}
      <div className="dock-row">
        <div className="app-dock" role="tablist" aria-label="Selected projects dock">
          {dockApps.map((app) => {
            const isSelected = activeTab === app.id;
            return (
              <button
                key={app.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(app.id)}
                className="group"
              >
                <div
                  className="dock-icon-box"
                  style={{
                    borderBottom: isSelected ? `2px solid ${app.color}` : '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: isSelected ? app.color : '#4b5563' }}
                  >
                    {app.iconText}
                  </span>
                </div>
                <span>{app.label}</span>
              </button>
            );
          })}
        </div>

        <a
          href="https://github.com/Doneeswaran"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors hidden sm:inline-flex items-center gap-1"
        >
          All repositories on GitHub ↗
        </a>
      </div>

      {/* Active Dock Panel */}
      <section className="dock-panel" role="tabpanel">
        <div className="project-copy">
          <p className="eyebrow">{activeProject.category}</p>
          <h2>
            {activeProject.title.split(' - ')[0]}
            <span className="product-thought">
              {activeProject.subtitle.split(' ')[0]}{' '}
              <em>{activeProject.subtitle.split(' ').slice(1).join(' ')}.</em>
            </span>
          </h2>
          <p>{activeProject.problem}</p>
          <p className="text-neutral-600 text-sm mt-3 font-normal">
            <strong className="text-neutral-900">Quantified Outcome:</strong> {activeProject.outcome}
          </p>

          {activeProject.githubUrl && (
            <a
              className="text-link"
              href={activeProject.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              Explore {activeProject.title.split(' - ')[0]} code <span aria-hidden="true">↗</span>
            </a>
          )}

          {/* Authentic coffee cup object with animated rising steam */}
          <div className="coffee-object" aria-hidden="true">
            <div className="steam">
              <span></span>
            </div>
            <img
              src="/assets/cup-color.webp"
              alt=""
              width="110"
              height="110"
              className="select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Realistic interactive simulated demo frame */}
        <figure className="dock-media">
          <div className="demo-frame">
            {activeTab === 'todos-kanban' && (
              <div className="font-mono text-xs text-neutral-800 space-y-2 select-none">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-neutral-500 text-[11px]">
                  <span>cluster: amazon-eks-production-crossview</span>
                  <span className="text-emerald-600 font-semibold">● SYNCED (Argo CD)</span>
                </div>
                <div className="py-2 text-neutral-600">
                  $ kubectl get pods -n todos --selector=app=kanban-api
                </div>
                <div className="bg-neutral-100 p-3 rounded-lg text-[11px] leading-relaxed text-neutral-700 font-mono">
                  NAME READY STATUS RESTARTS AGE<br />
                  kanban-api-7b8c9d4-x1 1/1 Running 0 14d<br />
                  kanban-api-7b8c9d4-y2 1/1 Running 0 14d<br />
                  mysql-ha-primary-0 1/1 Running 0 32d
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 flex justify-between">
                  <span>Ingress: AWS ALB + TLS ACM Cert</span>
                  <span>Auto-deploy on commit to main</span>
                </div>
              </div>
            )}

            {activeTab === 'currency-hub' && (
              <div className="font-mono text-xs text-neutral-800 space-y-2 select-none">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-neutral-500 text-[11px]">
                  <span>device: ESP32-CAM Edge AI Telemetry</span>
                  <span className="text-blue-600 font-semibold">● INFERENCE ACTIVE</span>
                </div>
                <div className="p-3 bg-neutral-900 text-neutral-200 rounded-lg text-[11px] font-mono leading-relaxed">
                  [SIFT ENGINE] Feature keypoints extracted: 142<br />
                  [HSV FILTER] Currency hue match: ₹500 note confirmed<br />
                  [LATENCY] Pipeline: 184ms (sub-200ms target met)<br />
                  [TTS] Audio generated: "Five Hundred Rupees"
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 flex justify-between">
                  <span>Accuracy: ~94% across 5 notes</span>
                  <span>Cloud API calls: 0 (Zero recurring cost)</span>
                </div>
              </div>
            )}

            {activeTab === 'ai-transcription' && (
              <div className="font-mono text-xs text-neutral-800 space-y-2 select-none">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-neutral-500 text-[11px]">
                  <span>service: Whisper ASR Worker Queue</span>
                  <span className="text-purple-600 font-semibold">● WORKER READY</span>
                </div>
                <div className="p-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-700 font-mono leading-relaxed">
                  [CI/CD] GitHub Actions: EC2 Docker deploy in 2m 42s (down from 20m)<br />
                  [STORAGE] Amazon S3 signed upload URL generated<br />
                  [CONCURRENCY] 50+ files/hour processed via async task queue
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 flex justify-between">
                  <span>User-facing latency cut: ~35%</span>
                  <span>Model: OpenAI Whisper Medium</span>
                </div>
              </div>
            )}

            {activeTab === 'eduease' && (
              <div className="font-mono text-xs text-neutral-800 space-y-2 select-none">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-neutral-500 text-[11px]">
                  <span>app: EDUEASE Role-Based OD Approval</span>
                  <span className="text-amber-600 font-semibold">● PRODUCTION READY</span>
                </div>
                <div className="p-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-700 font-mono leading-relaxed">
                  [RBAC ENGINE] Student $\to$ Mentor $\to$ Faculty $\to$ HoD state machine<br />
                  [NOTIFICATION] Real-time session alerts and digital signatures<br />
                  [AUDIT] Approval turnaround reduced from 2-3 days to under 4 hours
                </div>
                <div className="pt-2 text-[11px] text-neutral-500 flex justify-between">
                  <span>Stack: Flask + MySQL + REST API</span>
                  <span>Active users: Campus departments</span>
                </div>
              </div>
            )}
          </div>
          <figcaption className="text-right text-[11px] text-neutral-500 mt-2">
            Architecture and telemetry of {activeProject.title.split(' - ')[0]}
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
