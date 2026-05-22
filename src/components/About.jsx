import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const About = () => {
  const keyFacts = [
    { label: "Role", value: "Fullstack Developer & Cybersecurity Student" },
    { label: "Location", value: "Uyo, Akwa Ibom, Nigeria" },
    { label: "Education", value: "B.Sc. Cybersecurity — University of Uyo (Expected Nov 2027)" },
    { label: "Availability", value: "Open to remote full-time, contract, and freelance" },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            About
          </span>
          <h2 className="text-3xl md:text-4xl font-display tracking-tight">
            About Me
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="w-full lg:w-1/3 shrink-0"
          >
            <div className="relative w-full max-w-[340px] mx-auto lg:mx-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border-subtle">
                <img
                  src="/images/profile.jpg"
                  alt="Ubong Joe Joshua — Murpheus"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent-blue/20 rounded-xl -z-10" />
              <div className="absolute -top-3 -left-3 w-20 h-20 border border-accent-blue/10 rounded-lg -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-xl text-text-main mb-6 leading-relaxed">
                I'm{' '}
                <span className="text-accent-blue font-semibold">Ubong Joe Joshua</span>{' '}
                — a Fullstack Developer and Cybersecurity student based in Uyo, Nigeria.
              </motion.p>

              <motion.p variants={fadeUp} className="text-text-muted mb-10 leading-relaxed">
                I build production-grade web applications, AI agent systems, and containerized
                deployments. My background in design thinking and security awareness shapes how
                I approach every product — functional, usable, and secure. From real-time
                trading dashboards to multi-agent AI pipelines, I ship systems that work.
              </motion.p>

              {/* Key facts grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              >
                {keyFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="p-4 bg-text-dim/[0.03] border border-border-subtle rounded-lg"
                  >
                    <div className="text-[10px] font-mono text-accent-blue uppercase tracking-widest mb-1">
                      {fact.label}
                    </div>
                    <div className="text-sm text-text-muted">{fact.value}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <a
                  href="/cv.pdf"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent-blue text-canvas font-bold rounded-lg hover:bg-white transition-all duration-300 group hover:shadow-lg hover:shadow-accent-blue/20"
                >
                  Download CV
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
