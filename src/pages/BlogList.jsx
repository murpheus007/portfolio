import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
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

const BlogList = () => {
  const posts = getBlogPosts();

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="text-accent-blue font-mono text-xs uppercase tracking-[0.2em]">
              Blog
            </span>
            <span className="text-text-dim">•</span>
            <span className="text-text-muted font-mono text-xs uppercase tracking-wider">
              {posts.length} articles
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight"
          >
            Technical articles<br />
            <span className="text-accent-blue">&amp; creative thoughts</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-text-muted max-w-2xl leading-relaxed text-lg"
          >
            Writing about the systems I build, the problems I solve, and the lessons learned along the way.
          </motion.p>
        </motion.div>
      </div>

      {/* Post Grid */}
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {posts.map((post, i) => (
            <motion.div key={post.slug} variants={fadeUp} custom={i}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="h-full p-6 bg-text-dim/5 border border-border-subtle rounded-lg hover:border-accent-blue/30 transition-all duration-300 flex flex-col">
                  {/* Cover gradient bar */}
                  <div className={`h-2 w-full rounded-full bg-gradient-to-r ${post.coverColor} mb-5 opacity-60 group-hover:opacity-100 transition-opacity`} />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-text-dim/10 text-text-muted text-[10px] font-mono rounded border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-display font-bold mb-2 group-hover:text-accent-blue transition-colors leading-snug">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle">
                    <div className="flex items-center gap-4 text-text-muted text-xs font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-accent-blue text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight size={12} />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogList;
