import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const TimelineItem = ({ exp, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className="relative pl-10"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-6 bottom-0 w-px bg-gradient-to-b from-accent-blue/40 to-transparent" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent-blue bg-canvas flex items-center justify-center">
        <div className="w-2 h-2 bg-accent-blue rounded-full" />
      </div>

      <div className="pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-display font-bold text-text-main">
              {exp.role}
            </h3>
            {exp.certificate && (
              <span className="text-[9px] font-mono text-accent-blue border border-accent-blue/30 px-2 py-0.5 rounded uppercase tracking-widest">
                Certified
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-accent-blue shrink-0">{exp.period}</span>
        </div>

        <div className="text-accent-blue/80 font-mono text-xs mb-3 uppercase tracking-wider">
          {exp.company}
        </div>

        <p className="text-text-muted leading-relaxed text-sm">{exp.description}</p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "UI / UX Design",
      company: "Dev and Design",
      period: "May 2024 – Nov 2024",
      description:
        "6-month intensive bootcamp. Certificate of Completion covering User Research, UI Design, Illustration Design, Web Design, Mobile Design, Figma, and HTML & CSS. Applied end-to-end design thinking from research to high-fidelity prototypes.",
      certificate: true,
    },
    {
      role: "UI Development (JavaScript)",
      company: "Dev and Design",
      period: "Sep 2023 – Mar 2024",
      description:
        "6-month intensive bootcamp. Certification in Static UI Development with HTML & CSS, Version Control with Git & GitHub, and Dynamic UI Development with JavaScript. Built interactive, responsive interfaces as part of the certification requirements.",
      certificate: true,
    },
    {
      role: "Community Moderator",
      company: "MahjongMeta",
      period: "2023 – 2024",
      description:
        "Managed and moderated a crypto gaming community. Handled user engagement, conflict resolution, and community guidelines enforcement. Coordinated with the development team to relay user feedback and bug reports.",
    },
    {
      role: "Community Moderator",
      company: "Qorpo Games Studios",
      period: "2021 – 2022",
      description:
        "Moderated gaming community channels across Discord and Telegram. Organized community events and managed user onboarding. Provided first-level support and triaged technical issues.",
    },
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Career
          </span>
          <h2 className="text-3xl md:text-4xl font-display mb-4">Experience</h2>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <TimelineItem
              key={i}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
