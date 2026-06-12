import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getBlogPosts } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const BlogSection = () => {
  const posts = getBlogPosts().slice(0, 3);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-24 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.span
                variants={fadeUp}
                className="text-accent-blue font-mono text-xs uppercase tracking-[0.2em] block mb-3"
              >
                Blog
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-display font-bold"
              >
                Latest articles
              </motion.h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-accent-blue font-mono text-sm hover:gap-3 transition-all"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {/* Post cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div key={post.slug} variants={fadeUp} custom={i + 1}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="h-full p-5 bg-text-dim/5 border border-border-subtle rounded-lg hover:border-accent-blue/30 transition-all duration-300 flex flex-col">
                    {/* Cover gradient */}
                    <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${post.coverColor} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-text-dim/10 text-text-muted text-[10px] font-mono rounded border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-display font-bold mb-2 group-hover:text-accent-blue transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-text-dim text-xs font-mono mt-auto pt-3 border-t border-border-subtle">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile view all */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-accent-blue font-mono text-sm"
            >
              View all articles <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
