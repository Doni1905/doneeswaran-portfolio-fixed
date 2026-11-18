import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactSection() {
  return (
    <>
      <section className="contact wrap" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Have something in mind?</p>
        <h2 id="contact-title">
          Let’s make<br />
          <em>something great.</em>
        </h2>

        <a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>
          {PERSONAL_INFO.email} <span aria-hidden="true">↗</span>
        </a>

        <div className="mt-8 text-neutral-500 text-sm font-mono flex flex-wrap gap-4">
          <span>Phone: {PERSONAL_INFO.phone}</span>
          <span>•</span>
          <span>Location: {PERSONAL_INFO.location}</span>
          <span>•</span>
          <span>Batch: 2027</span>
        </div>
      </section>

      <footer className="footer wrap">
        <a className="wordmark" href="#top" aria-label="Doneeswaran J, back to top">
          doneeswaran<span>j.</span>
        </a>

        <div className="socials">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={`tel:${PERSONAL_INFO.phone}`}>
            Call ↗
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`}>
            Email ↗
          </a>
        </div>

        <a href="#top" aria-label="Back to top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
