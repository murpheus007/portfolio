import { useState, useEffect } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme, openSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['contact', 'experience', 'projects', 'skills', 'about'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-canvas/90 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-canvas/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center text-white font-black text-sm transition-all duration-300 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-accent-blue/30">
            M
          </div>
          <span className="font-brand font-[900] text-xl lowercase tracking-tighter hidden sm:inline">
            <span className={theme === 'dark' ? 'text-white' : 'text-primary-teal'}>mur</span>
            <span className="text-accent-blue">pheus</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'text-accent-blue bg-accent-blue/5'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300 text-text-muted hover:text-accent-blue hover:bg-accent-blue/5"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={openSidebar}
            className="p-2 rounded-lg bg-accent-blue text-white shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
