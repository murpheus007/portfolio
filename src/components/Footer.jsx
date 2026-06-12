import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm font-mono text-text-muted">
          <span>© 2026 Murpheus.</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-text-muted">
          <span>Built with</span>
          <Heart size={12} className="text-accent-blue fill-accent-blue" />
          <span>using React + TailwindCSS</span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-text-dim hover:text-accent-blue transition-colors flex items-center gap-1.5 text-xs font-mono group"
        >
          Back to top
          <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
