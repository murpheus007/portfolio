import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const GitHub = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Sidebar = ({ isOpen, onClose }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    { name: 'StreamBolt', tagline: 'Social Video Downloader' },
    { name: 'Birdeye', tagline: 'Solana Trading Dashboard' },
    { name: 'Deriverse', tagline: 'Wallet-Aware Trading Analytics' },
    { name: 'GenieVirtualTalk', tagline: 'E-Commerce Platform' },
    { name: 'Chainstellar', tagline: 'Writer & Analyst Portfolio' },
    { name: 'AceAgent', tagline: 'AI Tennis Prediction' },
  ];

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, projects.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-canvas/60 backdrop-blur-2xl z-[120]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-canvas border-l border-border-subtle z-[130] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent-blue rounded-sm flex items-center justify-center text-white font-black text-sm transition-transform rotate-3">
                  M
                </div>
                <span className="font-brand font-[900] text-xl lowercase tracking-tighter">
                  <span className="text-primary-teal dark:text-white">mur</span>
                  <span className="text-accent-blue">pheus</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-md bg-text-dim/10 text-text-main hover:text-accent-blue transition-all rotate-0 hover:rotate-90 duration-500"
                aria-label="Close sidebar"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Quick Window */}
              <section>
                <p className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3">Quick Window</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Blog', desc: 'Technical articles and creative thoughts', icon: ExternalLink, href: '#/blog' },
                    { label: 'Github', desc: 'Source code and open-source contributions', icon: GitHub, href: 'https://github.com/murpheus007' },
                    { label: 'Whatsapp', desc: 'Direct messaging for inquiries', icon: MessageCircle, href: 'https://wa.me/yourwhatsapp' },
                    { label: 'Curriculum Vitae', desc: 'My professional journey', icon: FileText, href: '/cv.pdf', highlight: true },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={clsx(
                        "group flex items-center justify-between px-4 py-2.5 rounded-sm transition-all duration-300",
                        link.highlight 
                          ? "bg-accent-blue text-canvas hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20" 
                          : "bg-text-dim/10 dark:bg-white/10 hover:bg-accent-blue/10 hover:translate-x-2"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={clsx(
                          "p-2 rounded-sm",
                          link.highlight ? "bg-canvas/20" : "bg-canvas dark:bg-white/10 text-accent-blue"
                        )}>
                          <link.icon size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className={clsx("font-bold text-xs tracking-tight", !link.highlight && "text-text-main")}>
                            {link.label}
                          </span>
                          <span className={clsx("text-[10px]", link.highlight ? "text-canvas/70" : "text-text-muted")}>
                            {link.desc}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Show Glass */}
              <section>
                <p className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3">Show Glass</p>
                <div className="relative h-60 bg-text-dim/5 dark:bg-white/5 rounded-sm border border-border-subtle overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProjectIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 p-6 flex flex-col justify-center"
                    >
                      <h4 className="text-base font-bold text-accent-blue mb-1">{projects[currentProjectIndex].name}</h4>
                      <p className="text-xs text-text-muted italic leading-relaxed">{projects[currentProjectIndex].tagline}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </section>

              {/* Let's Connect */}
              <section className="pt-6 border-t border-border-subtle">
                <p className="text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-4">Let's Connect</p>
                <div className="flex gap-3">
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-text-dim/5 dark:bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-blue transition-all duration-300">
                    <Twitter size={18} />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm bg-text-dim/5 dark:bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-blue transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
