import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const Section = ({ children, className = '' }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={stagger}
    className={className}
  >
    {children}
  </motion.section>
);

// Simple markdown-like renderer
const renderContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLanguage = '';

  lines.forEach((line, i) => {
    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="my-4 p-4 bg-text-dim/10 border border-border-subtle rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-text-muted">
              {codeLines.join('\n')}
            </code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(
        <motion.h2 key={i} variants={fadeUp} className="text-2xl font-display font-bold mt-10 mb-4">
          {line.slice(3)}
        </motion.h2>
      );
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <motion.h3 key={i} variants={fadeUp} className="text-xl font-display font-bold mt-8 mb-3">
          {line.slice(4)}
        </motion.h3>
      );
      return;
    }

    // Inline code
    if (line.includes('`') && !line.startsWith('```')) {
      const parts = line.split(/(`[^`]+`)/g);
      elements.push(
        <motion.p key={i} variants={fadeUp} className="text-text-muted leading-relaxed mb-3">
          {parts.map((part, j) =>
            part.startsWith('`') && part.endsWith('`') ? (
              <code key={j} className="px-1.5 py-0.5 bg-text-dim/10 text-accent-blue text-sm font-mono rounded">
                {part.slice(1, -1)}
              </code>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </motion.p>
      );
      return;
    }

    // Links
    if (line.includes('[') && line.includes('](')) {
      const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g);
      elements.push(
        <motion.p key={i} variants={fadeUp} className="text-text-muted leading-relaxed mb-3">
          {parts.map((part, j) => {
            const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
              return (
                <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                  {linkMatch[1]}
                </a>
              );
            }
            return <span key={j}>{part}</span>;
          })}
        </motion.p>
      );
      return;
    }

    // List items
    if (line.startsWith('- ')) {
      elements.push(
        <motion.div key={i} variants={fadeUp} className="flex items-start gap-2 mb-2 pl-4">
          <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 shrink-0" />
          <span className="text-text-muted leading-relaxed">{line.slice(2)}</span>
        </motion.div>
      );
      return;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\.\s/)[1];
      const text = line.slice(num.length + 2);
      elements.push(
        <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 mb-2 pl-4">
          <span className="text-accent-blue font-mono text-sm font-bold shrink-0">{num}.</span>
          <span className="text-text-muted leading-relaxed">{text}</span>
        </motion.div>
      );
      return;
    }

    // Bold text
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <motion.p key={i} variants={fadeUp} className="text-text-main font-bold mt-4 mb-2">
          {line.slice(2, -2)}
        </motion.p>
      );
      return;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
      return;
    }

    // Regular paragraph
    elements.push(
      <motion.p key={i} variants={fadeUp} className="text-text-muted leading-relaxed mb-3">
        {line}
      </motion.p>
    );
  });

  return elements;
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const allPosts = getBlogPosts();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent-blue hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-20">
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors font-mono text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <Section className="max-w-3xl mx-auto px-6 pb-12">
        {/* Cover gradient */}
        <div className={`h-2 w-full rounded-full bg-gradient-to-r ${post.coverColor} mb-8`} />

        {/* Tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-text-dim/10 text-text-muted text-xs font-mono rounded border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div variants={fadeUp} className="flex items-center gap-6 text-text-dim text-sm font-mono">
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} />
            {post.readTime}
          </span>
        </motion.div>
      </Section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-12 h-0.5 bg-accent-blue mb-10" />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {renderContent(post.content)}
        </motion.div>
      </div>

      {/* Post Navigation */}
      <div className="border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group p-5 bg-text-dim/5 border border-border-subtle rounded-lg hover:border-accent-blue/30 transition-all"
              >
                <div className="text-text-dim text-xs font-mono mb-2">← Previous</div>
                <div className="text-text-main font-display font-bold group-hover:text-accent-blue transition-colors text-sm">
                  {prevPost.title}
                </div>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group p-5 bg-text-dim/5 border border-border-subtle rounded-lg hover:border-accent-blue/30 transition-all md:text-right"
              >
                <div className="text-text-dim text-xs font-mono mb-2 flex items-center gap-1 justify-end">
                  Next <ArrowRight size={10} />
                </div>
                <div className="text-text-main font-display font-bold group-hover:text-accent-blue transition-colors text-sm">
                  {nextPost.title}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Back to blog CTA */}
      <div className="border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-text-dim/30 text-text-main font-bold rounded hover:border-accent-blue hover:text-accent-blue transition-colors text-sm"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
