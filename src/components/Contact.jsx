import { useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, useInView } from 'framer-motion';
import { Mail, SquareArrowOutUpRight, Send, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Contact = () => {
  const [state, handleSubmit] = useForm('xredqagw');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-accent-blue/10 border border-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={24} className="text-accent-blue" />
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">Message Sent! ✨</h2>
            <p className="text-text-muted text-lg">
              Thanks for reaching out. I'll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-text-dim/[0.02]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-display mb-4">Get In Touch</h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Have a project in mind or just want to connect? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info side */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-text-muted leading-relaxed">
              I'm open to remote full-time, contract, and freelance opportunities.
              Whether you have a project in mind or just want to connect — reach out.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/5 border border-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:dreamgotwings@gmail.com"
                    className="text-text-main hover:text-accent-blue transition-colors text-sm"
                  >
                    dreamgotwings@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/5 border border-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                  <SquareArrowOutUpRight size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-0.5">
                    GitHub
                  </div>
                  <a
                    href="https://github.com/murpheus007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-main hover:text-accent-blue transition-colors text-sm"
                  >
                    murpheus007
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-blue/5 border border-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-0.5">
                    Location
                  </div>
                  <span className="text-text-main text-sm">Uyo, Nigeria (GMT+1)</span>
                </div>
              </div>
            </div>

            {/* Quick availability note */}
            <div className="p-4 bg-accent-blue/5 border border-accent-blue/10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-accent-blue uppercase tracking-widest">
                  Status
                </span>
              </div>
              <p className="text-text-muted text-sm">
                Currently available for new projects and collaborations.
              </p>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-text-dim/[0.03] border border-border-subtle rounded-lg p-3.5 text-sm text-text-main placeholder:text-text-dim/50 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/20 transition-all"
                  />
                  <ValidationError field="name" prefix="Name" errors={state.errors} className="text-red-400 text-xs font-mono mt-1" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-text-dim/[0.03] border border-border-subtle rounded-lg p-3.5 text-sm text-text-main placeholder:text-text-dim/50 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/20 transition-all"
                  />
                  <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs font-mono mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-dim uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full bg-text-dim/[0.03] border border-border-subtle rounded-lg p-3.5 text-sm text-text-main placeholder:text-text-dim/50 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/20 transition-all resize-none"
                />
                <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-400 text-xs font-mono mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-accent-blue text-canvas font-bold rounded-lg hover:bg-white transition-all duration-300 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent-blue/20 flex items-center justify-center gap-2"
              >
                {state.submitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>

              <ValidationError errors={state.errors} className="text-red-400 text-xs font-mono" />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
