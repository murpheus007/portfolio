export const blogPosts = [
  {
    slug: "building-streambolt",
    title: "Building StreamBolt: A Multi-Platform Social Video Downloader",
    excerpt: "How I architected a single Express backend that serves a React web UI, Telegram bot, and WhatsApp bot — all streaming video downloads via yt-dlp without buffering.",
    date: "2025-06-15",
    readTime: "8 min read",
    tags: ["Fullstack", "Node.js", "Docker", "Telegram Bot"],
    coverColor: "from-[#0B3D4A] to-[#00D4FF]",
    content: `## The Problem

Social media platforms don't make it easy to download videos. Users who want to save a clip for offline viewing, archival, or sharing outside the platform have to resort to sketchy third-party sites riddled with ads and malware.

I wanted to build a clean, self-hosted alternative that works across platforms — YouTube, Instagram, TikTok, Twitter/X, Facebook, Vimeo, Reddit, and more.

## Architecture Decisions

The core insight was that three different interfaces (Web, Telegram, WhatsApp) could all converge on a single Express backend. Instead of building three separate services, I designed one API that handles all download requests identically regardless of source.

### Streaming Downloads

The most critical decision was **not buffering videos on the server**. The \`/api/download\` endpoint pipes yt-dlp's stdout directly into the HTTP response:

\`\`\`
yt-dlp → stdout → HTTP response → client
\`\`\`

The server never holds the full video in memory. For a 500MB file, this means constant ~1MB memory usage instead of 500MB. Abort handling kills the yt-dlp process cleanly with SIGTERM → SIGKILL fallback after 3 seconds.

### Three Entry Points

- **Web UI**: React + Vite + TailwindCSS with metadata preview before download
- **Telegram Bot**: Built with Telegraf — users paste a link, get the video back
- **WhatsApp Bot**: Built with Baileys — same flow, different platform

All three hit the same \`/api/download\` and \`/api/metadata\` endpoints.

## Docker Multi-Stage Build

The container needs ffmpeg, Python (for yt-dlp), Deno (for edge functions), and Node.js. A multi-stage build keeps the final image lean:

\`\`\`
Stage 1: Install yt-dlp + ffmpeg + Python
Stage 2: Copy into Node.js base, install npm deps
Stage 3: Production image (~180MB)
\`\`\`

## Results

- 12+ platforms supported
- 3 entry points, 1 backend
- Zero server-side buffering
- SQLite analytics tracking every download
- Fully containerized with SSL via Nginx Proxy Manager

**Live:** [streambolt.tech](https://streambolt.tech)`
  },
  {
    slug: "multi-agent-ai-pipeline",
    title: "Designing a Multi-Agent AI Pipeline for Tennis Predictions",
    excerpt: "How I built AceAgent — a system that spawns parallel gatherer and analyst sub-agents to predict ATP tennis match outcomes, fully automated via cron.",
    date: "2025-05-20",
    readTime: "6 min read",
    tags: ["AI", "Python", "Agent Orchestration", "Automation"],
    coverColor: "from-[#F5A623] to-[#0B3D4A]",
    content: `## The Idea

What if an AI system could predict tennis match outcomes by researching players the way a human analyst would? Not just crunching numbers, but gathering context — recent form, head-to-head records, surface preferences, fatigue signals — and synthesizing it into a reasoned prediction.

That's AceAgent.

## The Pipeline

The system runs daily via cron:

1. **7 AM** — Match discovery: scrape upcoming ATP matches
2. **Parallel agents** — For each match, spawn two sub-agents simultaneously
3. **Synthesis** — Combine agent outputs into a final prediction
4. **10 AM** — Score fetching: check yesterday's results for accuracy tracking

## Sub-Agent Architecture

### Gatherer Agent
Fetches structured data:
- Head-to-head records from tennismylife.org API
- Surface-specific statistics (hard, clay, grass)
- Recent form (last 10 matches)
- Fatigue metrics (matches played in last 7 days)

### Analyst Agent
Runs an 11-point sentiment checklist via web search:
- Injury reports and withdrawal rumors
- Tournament importance to each player
- Travel and scheduling factors
- Historical performance at this venue

## Synthesis

Both agent outputs are combined into a final prediction with:
- **Probability percentage** (e.g., Player A wins 68%)
- **Confidence level** (High / Medium / Low)
- **Key factors** (top 3 reasons for the prediction)

## Data Pipeline

4 years of historical ATP match data (2023–2026) with match-level statistics for deeper analysis. All stored in SQLite, delivered via Telegram bot.

## Results

- Fully autonomous — runs daily without human intervention
- Parallel agent execution reduces per-match processing time
- Historical tracking enables accuracy measurement over time
- Telegram delivery for real-time notifications

**Code:** [github.com/murpheus007/aceagent](https://github.com/murpheus007/aceagent)`
  },
  {
    slug: "wallet-signature-auth",
    title: "Wallet-Signature Authentication with Supabase Edge Functions",
    excerpt: "How I implemented nonce-based wallet signature verification for Deriverse — linking a Solana wallet to a Supabase session with replay attack prevention, all in a Deno edge function.",
    date: "2025-04-10",
    readTime: "5 min read",
    tags: ["Web3", "Supabase", "Security", "React"],
    coverColor: "from-[#00D4FF] to-[#F5A623]",
    content: `## The Challenge

Deriverse needed wallet authentication — but not the typical "connect wallet" flow. I wanted users to sign a message with their Solana wallet, verify it server-side, and create a Supabase session tied to that wallet address.

The tricky part: preventing replay attacks where someone intercepts a valid signature and reuses it.

## The Flow

### 1. Generate Nonce
When the user clicks "Connect Wallet", the app generates a unique nonce (random string) and stores it in Supabase:

\`\`\`
nonce = crypto.randomUUID()
storeInDB(nonce, walletAddress, expiresAt: now + 5min)
\`\`\`

### 2. Sign Message
The user signs a message containing the nonce with their Solana wallet:

\`\`\`
message = "Sign this message to authenticate with Deriverse. Nonce: {nonce}"
signature = wallet.signMessage(message)
\`\`\`

### 3. Verify on Edge Function
A Supabase Edge Function (Deno runtime) handles verification:

\`\`\`
- Look up nonce in database
- Check expiration (reject if > 5 minutes old)
- Verify signature using @solana/web3.js
- Delete nonce (single-use)
- Create Supabase session for wallet address
\`\`\`

### 4. Session Established
The user now has a Supabase session with row-level security policies tied to their wallet address.

## Why Edge Functions?

- **Low latency**: Runs at the edge, close to the user
- **Deno runtime**: Native support for \`@solana/web3.js\`
- **No separate server**: Leverages existing Supabase infrastructure

## Replay Attack Prevention

Three layers of protection:
1. **Nonce expiration**: 5-minute window
2. **Single-use**: Nonce deleted after verification
3. **Wallet binding**: Nonce tied to specific wallet address

## Results

- Secure wallet-to-session linking
- No OAuth dependencies
- Works fully client-side with cloud persistence
- Row-level security for wallet-specific data

**Code:** [github.com/murpheus007/deriverse](https://github.com/murpheus007/deriverse)`
  }
];

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPosts = () => {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
};
