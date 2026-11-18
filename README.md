# doneeswaran-portfolio-fixed

Corrected copy of [doneeswaran-portfolio](https://github.com/Doni1905/doneeswaran-portfolio) (original untouched).

Fixes over the original `df178ef`:
- Mobile: navigation no longer runs offscreen; plane animation and trail are hidden on narrow screens (desktop keeps the full effect); asset paths fixed for subpath hosting.
- Links: GitHub destinations now point to [Doni1905](https://github.com/Doni1905); the research abstract link opens an IEEE Xplore search for the paper title (replace with the DOI link when available).
- Honesty: dock panels are labeled as illustrative demos, not live telemetry; the internship OOMKilled incident is described as triaged with a proposed fix, matching the source notes.
- Dependencies: production audit is clean (`npm audit --omit=dev` = 0). The 4 dev-chain audit entries trace to picomatch advisory GHSA-fc5q-39xc-vjpf, which GitHub has since marked withdrawn.

## Run locally

```bash
npm install
npm run build
npm run preview
```

## Pull this repo

```bash
git clone https://github.com/Doni1905/doneeswaran-portfolio-fixed.git
cd doneeswaran-portfolio-fixed
npm install && npm run build
```

Live preview: https://doni1905.github.io/doneeswaran-portfolio-fixed/
