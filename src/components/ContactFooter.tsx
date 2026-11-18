import { useState } from 'react';
import { Mail, Phone, ArrowUpRight, Copy, Check } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-800/80">
      <div className="flex flex-col items-center text-center py-12">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
          Ready for 2027 Opportunities
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-3xl leading-tight">
          Let’s build <br />
          <em className="font-['Instrument_Serif',serif] italic font-normal text-emerald-400 text-5xl sm:text-7xl md:text-8xl">
            something resilient.
          </em>
        </h2>

        <p className="mt-6 text-neutral-400 text-base sm:text-lg max-w-xl font-light leading-relaxed">
          Open to full-time roles, graduate programs, and engineering challenges across Cloud Infrastructure, DevOps/GitOps, and AI Systems.
        </p>

        {/* Big Email CTA Button with Copy interaction */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-base transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3 group"
          >
            <Mail className="w-5 h-5" />
            <span>{PERSONAL_INFO.email}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={handleCopy}
            className="px-6 py-4 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-mono text-sm flex items-center gap-2.5 transition-all hover:bg-neutral-800"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Secondary Contact Info */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-neutral-400">
          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-neutral-500" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          <span className="text-neutral-700">•</span>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-neutral-500" />
            <span>github.com/Doneeswaran</span>
          </a>

          <span className="text-neutral-700">•</span>

          <span className="text-neutral-500">Chennai, Tamil Nadu</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>
          © {new Date().getFullYear()} Doneeswaran J • Engineered with React 19, Tailwind CSS & Framer Motion
        </div>
        <a
          href="#top"
          className="hover:text-emerald-400 transition-colors flex items-center gap-1"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
