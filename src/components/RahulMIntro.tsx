import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const verbs = ['build', 'automate', 'scale', 'deploy'];

export function RahulMIntro() {
  const [verbIndex, setVerbIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % verbs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="intro wrap" aria-labelledby="intro-title">
      {/* Hello row with tilted badge */}
      <div className="hello">
        <div className="hello-badge">D</div>
        <div className="hello-text">
          <span>Hi, I’m Doneeswaran.</span>
          <br />
          <span className="hello-sub">Cloud & DevOps Engineer. Chennai.</span>
        </div>
      </div>

      {/* Opening headline with cycling verb and home airplane */}
      <div className="opening">
        <h1 id="intro-title">
          <span className="hero-firstline">
            I{' '}
            <span
              className="verb-switch"
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              <span className="inline-block transition-all duration-300">
                {verbs[verbIndex]}
              </span>
            </span>{' '}
            systems.
          </span>
          <br />
          <em>From code to cluster.</em>
        </h1>

        {/* The home airplane where flight begins */}
        <div className="plane-home" aria-hidden="true">
          <img
            src="assets/glider-color.webp"
            width="280"
            height="186"
            alt=""
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Intro bottom paragraph with hand-drawn underlines */}
      <div className="intro-bottom">
        <p className="trail-sentence">
          I care about zero-downtime infrastructure and resilient systems. I’ve shipped enterprise dashboards to{' '}
          <a href="#work" aria-label="Explore selected projects starting with TODOS on EKS">
            Amazon EKS
          </a>
          , published{' '}
          <a href="#research" aria-label="See IEEE research publication">
            IEEE deep learning research
          </a>
          , and automated GitOps with{' '}
          <a href="#inspection" aria-label="Inspect Crossplane and Argo CD">
            Argo CD & Crossplane
          </a>
          .
        </p>
      </div>

      {/* Proof row */}
      <div className="intro-proof">
        <span>
          DevOps Intern at{' '}
          <a href="#experience">TPConnects (Dubai) ↗</a>
        </span>
        <span>
          IEEE ICIDCA 2025{' '}
          <a href="#research">Published Author ↗</a>
        </span>
        <span>
          Final-year B.Tech AI & ML{' '}
          <a href="#archive">2027 Batch ↗</a>
        </span>
      </div>

      {/* Scroll invite */}
      <div className="scroll-invite">
        <span>Scroll to fly</span>
        <span className="scroll-line"></span>
        <span>↓</span>
      </div>
    </section>
  );
}
