import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Escape XML special characters (outside CDATA) */
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert a single markdown text line to HTML inline.
 * Handles **bold**, `code`, and [text](url) — mirrors the client-side
 * formatInline() logic in BlogPost.jsx.
 */
function mdInline(line) {
  const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  let out = '';
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) {
      out += `<strong>${esc(part.slice(2, -2))}</strong>`;
    } else if (part.startsWith('`') && part.endsWith('`')) {
      out += `<code>${esc(part.slice(1, -1))}</code>`;
    } else {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        out += `<a href="${esc(linkMatch[2])}" target="_blank" rel="noopener noreferrer">${esc(linkMatch[1])}</a>`;
      } else {
        out += esc(part);
      }
    }
  }
  return out;
}

/** Convert full markdown content string to HTML for RSS description */
function markdownToHtml(md) {
  let html = '';
  const lines = md.split('\n');
  let inCode = false;
  let codeBuf = [];
  let inUl = false;
  let inOl = false;

  function closeLists() {
    if (inUl) { html += '</ul>'; inUl = false; }
    if (inOl) { html += '</ol>'; inOl = false; }
  }

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const t = line.trim();

    // Code fence toggle
    if (t.startsWith('```')) {
      closeLists();
      if (inCode) {
        html += `<pre><code>${codeBuf.join('\n').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`;
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    if (t === '') {
      // Don't close lists on blank line — RSS readers vary in blank-line handling
      continue;
    }

    // Headings
    if (t.startsWith('## ')) {
      closeLists();
      html += `<h2>${esc(t.slice(3))}</h2>`;
      continue;
    }
    if (t.startsWith('### ')) {
      closeLists();
      html += `<h3>${esc(t.slice(4))}</h3>`;
      continue;
    }

    // Unordered list items
    if (t.startsWith('- ')) {
      if (!inUl) { if (inOl) { html += '</ol>'; inOl = false; } html += '<ul>'; inUl = true; }
      html += `<li>${mdInline(t.slice(2))}</li>`;
      continue;
    }

    // Ordered list items
    if (/^\d+\.\s/.test(t)) {
      const m = t.match(/^(\d+)\.\s(.*)$/);
      if (!inOl) { if (inUl) { html += '</ul>'; inUl = false; } html += '<ol>'; inOl = true; }
      html += `<li>${mdInline(m[2])}</li>`;
      continue;
    }

    closeLists();

    // Bold-only line (standalone — like **Live:** ... )
    if (t.startsWith('**') && t.endsWith('**')) {
      html += `<p><strong>${esc(t.slice(2, -2))}</strong></p>`;
      continue;
    }

    // Default: paragraph with inline formatting
    html += `<p>${mdInline(t)}</p>`;
  }

  closeLists();
  return html;
}

/** Format date to RFC 822 (required by RSS 2.0) */
function toRfc822(dateStr) {
  return new Date(dateStr + 'T00:00:00Z').toUTCString().replace('GMT', '+0000');
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Dynamic import of blog data
  const mod = await import(join(ROOT, 'src/data/blogPosts.js'));
  const posts = (mod.getBlogPosts ? mod.getBlogPosts() : mod.blogPosts) ?? [];

  const SITE_URL = 'https://murpheus.me';
  const FEED_URL = `${SITE_URL}/feed.xml`;
  const BUILD_DATE = new Date().toUTCString().replace('GMT', '+0000');

  const items = posts.map((post) => {
    const link = `${SITE_URL}/#/blog/${post.slug}`;
    const description = markdownToHtml(post.content);
    const pubDate = toRfc822(post.date);
    const categoryXml = post.tags.map(tag => `    <category>${esc(tag)}</category>`).join('\n');

    return `  <item>
    <title>${esc(post.title)}</title>
    <link>${esc(link)}</link>
    <guid isPermaLink="true">${esc(link)}</guid>
    <description><![CDATA[${description}]]></description>
    <pubDate>${pubDate}</pubDate>
${categoryXml}
    <author>dreamgotwings@gmail.com (Ubong Joe Joshua)</author>
  </item>`;
  }).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>Murpheus Blog</title>
  <link>${SITE_URL}</link>
  <description>Technical articles &amp; creative thoughts — writing about the systems I build, the problems I solve, and the lessons learned along the way.</description>
  <language>en-us</language>
  <lastBuildDate>${BUILD_DATE}</lastBuildDate>
  <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
  <managingEditor>dreamgotwings@gmail.com (Ubong Joe Joshua)</managingEditor>
  <webMaster>dreamgotwings@gmail.com (Ubong Joe Joshua)</webMaster>
  <image>
    <url>${SITE_URL}/images/profile.jpg</url>
    <title>Murpheus Blog</title>
    <link>${SITE_URL}</link>
  </image>
${items}
</channel>
</rss>`;

  mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = join(PUBLIC_DIR, 'feed.xml');
  writeFileSync(outPath, feed.trim() + '\n', 'utf-8');
  console.log(`✅ RSS feed generated: feed.xml (${posts.length} items)`);
}

main().catch((err) => {
  console.error('❌ RSS generation failed:', err);
  process.exit(1);
});
