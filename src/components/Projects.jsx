import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, SquareArrowOutUpRight, ArrowRight } from 'lucide-react';

const projects = [
  {
    slug: "streambolt",
    title: "StreamBolt",
    tagline: "Social Video Downloader",
    description: "A full-stack social media video downloader supporting YouTube, Instagram, TikTok, Twitter/X, Facebook, Vimeo, and Reddit. Three entry points — Web UI, Telegram Bot, and WhatsApp Bot — all powered by a single Dockerized Node.js backend with streaming downloads via yt-dlp.",
    tech: ["React 19", "Node.js", "Express 5", "yt-dlp", "Docker", "SQLite"],
    category: "Fullstack",
    github: "https://github.com/murpheus007/streambolt",
    live: "https://streambolt.tech",
    highlights: ["12+ platforms", "3 entry points", "Streaming downloads"],
  },
  {
    slug: "birdeye",
    title: "Birdeye",
    tagline: "Solana Trading Dashboard",
    description: "A full-stack cryptocurrency trading dashboard for the Solana blockchain. 9 pages of real-time market data, whale wallet tracking, customizable price alerts, and a Discord bot for instant notifications — all in a 5-service Docker deployment.",
    tech: ["React 18", "TypeScript", "Flask", "PostgreSQL", "Redis", "Docker"],
    category: "Fullstack",
    github: "https://github.com/murpheus007/birdeye",
    live: "https://birdeyeradar.site",
    highlights: ["9 pages", "17+ API endpoints", "Discord bot"],
  },
  {
    slug: "deriverse",
    title: "Deriverse",
    tagline: "Wallet-Aware Trading Analytics for Solana",
    description: "A wallet-aware trading analytics dashboard that ingests trade fills and derives actionable metrics — PnL tracking, win/loss ratios, drawdown analysis, fee breakdowns. Works fully offline in demo mode or connects a Solana wallet for cloud persistence.",
    tech: ["React 19", "TypeScript", "Zustand", "TanStack Query", "Supabase", "Solana/web3.js"],
    category: "Frontend",
    github: "https://github.com/murpheus007/deriverse",
    highlights: ["Dual-mode", "100% client-side analytics", "Multi-wallet"],
  },
  {
    slug: "genievirtualtalk",
    title: "GenieVirtualTalk",
    tagline: "E-Commerce & Remote Work Recruitment Platform",
    description: "A full-stack platform for a virtual call center connecting people to work-from-home jobs with Fortune 500 companies. Dual-purpose: recruitment marketing site + full e-commerce store with Stripe-powered checkout.",
    tech: ["React 19", "Express 5", "Stripe", "Appwrite", "Framer Motion"],
    category: "Fullstack",
    github: "https://github.com/murpheus007/genie-virtual-talk",
    live: "https://genievirtualtalk.vercel.app",
    highlights: ["Stripe payments", "Dual deployment", "Full e-commerce"],
  },
  {
    slug: "chainstellar",
    title: "Chainstellar",
    tagline: "Creative Writer & Technical Analyst Portfolio",
    description: "A portfolio website for a Solana blockchain writer and analyst. 7 sections with animated hero, filterable works gallery (19 publications), alternating timeline of recognitions, and bento grid skills — built with Astro static generation and React islands.",
    tech: ["Astro 5", "React 19", "TailwindCSS 4", "Framer Motion", "Docker"],
    category: "Frontend",
    github: "https://github.com/murpheus007/chainstellar",
    live: "https://chainstellar.site",
    highlights: ["Astro static", "19 works", "Dark mode"],
  },
  {
    slug: "pixelforge",
    title: "PixelForge",
    tagline: "AI Image Generation Platform",
    description: "A fullstack AI image generation platform. Users sign in via Clerk, type a prompt, and the system queues an async job through Celery + Redis. A worker calls OpenRouter's FLUX.2 model, stores the image in MinIO, and the frontend polls until ready. Next.js + FastAPI, all containerized.",
    tech: ["Next.js 14", "TypeScript", "FastAPI", "Celery", "Redis", "MinIO", "Clerk"],
    category: "Fullstack",
    github: "https://github.com/murpheus007/pixelforge",
    highlights: ["Async queue", "FLUX.2 model", "6-service Docker"],
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Fullstack', 'Frontend', 'Backend'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-4xl font-display mb-6">Selected Works</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ${
                filter === tab
                ? 'bg-accent-blue border-accent-blue text-canvas shadow-lg shadow-accent-blue/20'
                : 'border-text-dim/20 text-text-muted hover:border-accent-blue/50 hover:text-text-main'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              key={project.slug}
              className="group relative bg-text-dim/[0.03] border border-border-subtle rounded-xl overflow-hidden hover:border-accent-blue/30 transition-all duration-500"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative p-8 flex flex-col h-full">
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent-blue font-mono text-[10px] uppercase tracking-[0.2em]">
                      {project.tagline}
                    </span>
                    <span className="text-text-dim font-mono text-[10px] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold group-hover:text-accent-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.highlights.map(h => (
                    <span key={h} className="text-[10px] font-mono text-accent-blue/70 bg-accent-blue/5 border border-accent-blue/10 px-2 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono text-text-dim border border-text-dim/15 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle">
                  <div className="flex gap-5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-blue transition-colors flex items-center gap-1.5 text-xs font-mono"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SquareArrowOutUpRight size={14} />
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent-blue transition-colors flex items-center gap-1.5 text-xs font-mono"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                  </div>
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-accent-blue text-xs font-mono hover:gap-2.5 transition-all duration-300"
                  >
                    Case Study
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
