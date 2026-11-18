export function InspectionChapter() {
  return (
    <section className="chapter wrap" id="inspection" aria-labelledby="inspection-title">
      <div className="chapter-copy">
        <p className="eyebrow">Continuous GitOps & Infrastructure</p>
        <h2 id="inspection-title">
          Zero drift.<br />
          <em>Guaranteed state.</em>
        </h2>
        <p>
          Infrastructure isn't static files stored in a drawer — it's continuous reconciliation. Using Crossplane and Argo CD, Kubernetes clusters actively align reality with declared state, while secrets are dynamically bound via External Secrets Operator.
        </p>
        <a className="text-link" href="#work">
          Explore production workloads <span>↗</span>
        </a>
      </div>

      <div className="inspection" aria-hidden="true">
        <div className="question">Self-healing clusters?</div>
        <div className="discovery">Argo CD & Crossplane.</div>
        <img
          src="/assets/magnifier-color.webp"
          alt=""
          className="magnifier-object select-none pointer-events-none"
        />
        <div className="hand-note">
          Reconciling state continuously on Amazon EKS
        </div>
      </div>
    </section>
  );
}
