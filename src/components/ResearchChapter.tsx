import { RESEARCH } from '../data/portfolioData';

export function ResearchChapter() {
  return (
    <section className="chapter wrap" id="research" aria-labelledby="research-title">
      <div className="chapter-copy">
        <p className="eyebrow">IEEE Scholarly Publication</p>
        <h2 id="research-title">
          Seismic graphs.<br />
          <em>Predictive deep learning.</em>
        </h2>
        <p>
          Earthquake telemetry consists of spatial faultline geometries coupled with irregular temporal vibrations. Standard recurrent models lose spatial context; pure graph models lose temporal dynamics.
        </p>
        <p>
          I proposed and validated a hybrid architecture fusing Spatial-Temporal Graph Neural Networks (STGNN) with Long Short-Term Memory (LSTM), accepted and published at <strong>IEEE ICIDCA 2025</strong>.
        </p>
        <a className="text-link" href="https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=%22A%20Hybrid%20LSTM-STGNN%20Framework%20for%20Reliable%20Earthquake%20Magnitude%20Prediction%22" target="_blank" rel="noreferrer">
          Search this title on IEEE Xplore <span>↗</span>
        </a>
      </div>

      <div className="inspection" aria-hidden="true" style={{ height: 'auto', padding: '30px 0' }}>
        <div className="p-8 rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pb-3 border-b border-neutral-200">
            <span>IEEE ICIDCA 2025</span>
            <span className="text-emerald-700 font-semibold">PEER-REVIEWED</span>
          </div>

          <h3 className="font-serif italic text-2xl text-neutral-900 leading-snug">
            "{RESEARCH.title}"
          </h3>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 font-mono text-xs text-neutral-800 space-y-1">
            <div className="text-emerald-700 font-semibold">
              ★ Measured Benchmark: {RESEARCH.metric}
            </div>
            <div className="text-neutral-500">
              Architecture: STGNN (Spatial-Temporal) + Bidirectional LSTM
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {RESEARCH.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-200/70 text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
