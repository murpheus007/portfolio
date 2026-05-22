import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const SkillCard = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={`p-6 bg-text-dim/[0.03] border border-border-subtle rounded-xl hover:border-accent-blue/30 transition-all duration-500 group ${
        index === 0 ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
        <h3 className="text-accent-blue font-mono text-xs uppercase tracking-[0.15em]">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, j) => (
          <span
            key={j}
            className="px-3 py-1.5 bg-text-dim/[0.04] text-text-muted text-xs font-mono rounded-lg border border-transparent group-hover:border-text-dim/20 group-hover:bg-accent-blue/5 group-hover:text-text-main transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Frontend",
      skills: ["React", "React Native", "Next.js", "Astro", "TypeScript", "TailwindCSS", "HTML/CSS", "Framer Motion"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs", "GraphQL", "WebSockets"],
    },
    {
      title: "Database & Cloud",
      skills: ["PostgreSQL", "SQLite", "Supabase", "Redis", "Appwrite"],
    },
    {
      title: "DevOps & Infrastructure",
      skills: ["Docker", "Docker Compose", "Nginx", "Nginx Proxy Manager", "Linux", "Vercel", "Render"],
    },
    {
      title: "AI & Automation",
      skills: ["Agent orchestration", "Sub-agent pipelines", "Cron automation", "Sentiment analysis", "LLM systems"],
    },
    {
      title: "Tools & Other",
      skills: ["Git", "GitHub", "Figma", "yt-dlp", "Telegram Bot API", "WhatsApp Bot API", "Stripe"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-text-dim/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-display mb-4">Skills & Technologies</h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Tools and technologies I use to bring ideas to life — from frontend to infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <SkillCard key={i} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
