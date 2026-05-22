import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, SquareArrowOutUpRight, ChevronRight } from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const Section = ({ children, className = '', id }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={stagger}
    className={className}
  >
    {children}
  </motion.section>
);

const SectionTitle = ({ children }) => (
  <motion.h2
    variants={fadeUp}
    className="text-2xl md:text-3xl font-display mb-2"
  >
    {children}
  </motion.h2>
);

const SectionLine = () => (
  <motion.div
    variants={fadeUp}
    className="w-12 h-0.5 bg-accent-blue mb-8"
  />
);

const CaseStudy = () => {
  const { slug } = useParams();
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Project not found</h1>
          <Link to="/" className="text-accent-blue hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back nav */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors font-mono text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <Section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
          <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.2em]">
            {cs.tagline}
          </span>
          <span className="text-text-dim">•</span>
          <span className="text-text-muted font-mono text-xs uppercase tracking-wider">
            {cs.category}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
        >
          {cs.title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-text-muted max-w-3xl leading-relaxed mb-8"
        >
          {cs.overview}
        </motion.p>

        {/* Hero stats */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-4 mb-10"
        >
          {cs.heroStats.map((stat, i) => (
            <div
              key={i}
              className="px-5 py-3 bg-text-dim/5 border border-border-subtle rounded-lg"
            >
              <div className="text-xl font-display font-bold text-accent-blue">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-canvas font-bold rounded hover:bg-white transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Live Site
            </a>
          )}
          <a
            href={cs.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-text-dim/30 text-text-main font-bold rounded hover:border-accent-blue hover:text-accent-blue transition-colors text-sm"
          >
            <SquareArrowOutUpRight size={16} />
            View Source
          </a>
        </motion.div>
      </Section>

      {/* Tech stack bar */}
      <div className="border-y border-border-subtle bg-text-dim/5">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-wrap gap-2">
            {cs.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 bg-text-dim/5 text-text-muted text-xs font-mono rounded border border-border-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Problem */}
      <Section className="max-w-5xl mx-auto px-6 py-20">
        <SectionTitle>The Problem</SectionTitle>
        <SectionLine />
        <motion.p variants={fadeUp} className="text-text-muted leading-relaxed text-lg max-w-3xl">
          {cs.problem}
        </motion.p>
      </Section>

      {/* Architecture */}
      <Section className="max-w-5xl mx-auto px-6 py-20 border-t border-border-subtle">
        <SectionTitle>Architecture</SectionTitle>
        <SectionLine />
        <motion.p variants={fadeUp} className="text-text-muted leading-relaxed mb-10 max-w-3xl">
          {cs.architecture.description}
        </motion.p>
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cs.architecture.diagram.map((item, i) => (
            <div
              key={i}
              className="p-5 bg-text-dim/5 border border-border-subtle rounded-lg hover:border-accent-blue/30 transition-colors"
            >
              <div className="text-accent-blue font-mono text-xs uppercase tracking-widest mb-1">
                {item.label}
              </div>
              <div className="text-text-muted text-sm">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* Key Decisions */}
      <Section className="max-w-5xl mx-auto px-6 py-20 border-t border-border-subtle">
        <SectionTitle>Key Technical Decisions</SectionTitle>
        <SectionLine />
        <div className="space-y-8">
          {cs.decisions.map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative pl-8 border-l-2 border-accent-blue/30"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-canvas border-2 border-accent-blue" />
              <h3 className="text-lg font-display font-bold mb-2">{d.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{d.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Challenges */}
      <Section className="max-w-5xl mx-auto px-6 py-20 border-t border-border-subtle">
        <SectionTitle>Challenges & Solutions</SectionTitle>
        <SectionLine />
        <div className="space-y-8">
          {cs.challenges.map((ch, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 bg-text-dim/5 border border-border-subtle rounded-lg"
            >
              <div className="flex items-start gap-3 mb-3">
                <ChevronRight size={16} className="text-accent-blue mt-1 shrink-0" />
                <h3 className="text-lg font-display font-bold">{ch.title}</h3>
              </div>
              <p className="text-text-muted leading-relaxed text-sm pl-7">{ch.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section className="max-w-5xl mx-auto px-6 py-20 border-t border-border-subtle">
        <SectionTitle>Results</SectionTitle>
        <SectionLine />
        <motion.ul variants={stagger} className="space-y-3">
          {cs.results.map((r, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 text-text-muted"
            >
              <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
              <span className="leading-relaxed">{r}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* Next project CTA */}
      <div className="border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-text-muted font-mono text-xs uppercase tracking-widest mb-4">
            Want to see more?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent-blue text-canvas font-bold rounded hover:bg-white transition-colors"
          >
            View All Projects
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
