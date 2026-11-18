import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Sparkles, Briefcase, Mail } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  isCinematic: boolean;
  onToggleMode: () => void;
}

export function Navbar({ isCinematic, onToggleMode }: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none">
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          width: scrolled ? 'min(94%, 900px)' : 'min(96%, 1100px)',
          backgroundColor: scrolled ? 'rgba(12, 13, 14, 0.85)' : 'rgba(12, 13, 14, 0.5)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
        }}
        initial={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-auto relative rounded-full border backdrop-blur-xl px-5 sm:px-7 py-3 flex items-center justify-between shadow-2xl transition-all"
      >
        {/* Wordmark */}
        <a href="#top" className="flex items-center gap-2 group">
          <span className="font-mono text-sm tracking-tight text-white font-semibold group-hover:text-emerald-400 transition-colors">
            doneeswaran<span className="text-emerald-400">.dev</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            2027 Batch
          </span>
        </a>

        {/* Section Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-300">
          <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          <a href="#research" className="hover:text-emerald-400 transition-colors">IEEE Research</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </nav>

        {/* Actions & Mode Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Dual Mode Switcher Button */}
          <button
            onClick={onToggleMode}
            title={isCinematic ? "Switch to Recruiter Mode (Zero distractions)" : "Switch to Cinematic Mode (Flight animations)"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
              isCinematic
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-neutral-800/80 border-neutral-700/80 text-neutral-300 hover:text-white'
            }`}
          >
            {isCinematic ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Cinematic</span>
              </>
            ) : (
              <>
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Recruiter</span>
              </>
            )}
          </button>

          {/* Direct Resume CTA */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send Email"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll Progress Bar running underneath */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 origin-left"
        />
      </motion.div>
    </header>
  );
}
