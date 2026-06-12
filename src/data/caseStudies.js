export const caseStudies = [
  {
    slug: "streambolt",
    title: "StreamBolt",
    tagline: "Social Video Downloader",
    liveUrl: "https://streambolt.tech",
    githubUrl: "https://github.com/murpheus007/streambolt",
    category: "Fullstack",
    tech: ["React 19", "Vite", "TailwindCSS", "Node.js", "Express 5", "yt-dlp", "Telegraf", "Baileys", "SQLite", "Docker", "Nginx Proxy Manager"],
    heroStats: [
      { label: "Platforms", value: "12+" },
      { label: "Entry Points", value: "3" },
      { label: "Architecture", value: "Multi-container" },
    ],
    overview: "StreamBolt is a full-stack social media video downloader that lets users paste a link from YouTube, Instagram, TikTok, Twitter/X, Facebook, Vimeo, or Reddit and download the video directly to their device. It also operates as a Telegram bot and WhatsApp bot, all powered by a single Dockerized Node.js backend.",
    problem: "Social media platforms don't make it easy to download videos. Users who want to save a clip for offline viewing, archival, or sharing outside the platform have to resort to sketchy third-party sites riddled with ads and malware. I wanted to build a clean, self-hosted alternative that I could run myself and share with others — one that works across platforms and doesn't compromise on privacy.",
    architecture: {
      description: "The system has three entry points into a single backend: a React web UI, a Telegram bot built with Telegraf, and a WhatsApp bot built with Baileys. All three paths converge on the same Express backend, which spawns yt-dlp as a child process, streams the video data back to the client, and logs the download to a SQLite analytics database.",
      diagram: [
        { label: "Web UI", desc: "React + Vite + TailwindCSS" },
        { label: "Telegram Bot", desc: "Telegraf" },
        { label: "WhatsApp Bot", desc: "Baileys" },
        { label: "Backend", desc: "Express + yt-dlp" },
        { label: "Database", desc: "SQLite" },
      ],
    },
    decisions: [
      {
        title: "Streaming downloads, not buffering",
        detail: "The /api/download endpoint pipes yt-dlp's stdout directly into the HTTP response. The server never holds the full video in memory — critical for large files and concurrent users. Abort handling kills the yt-dlp process cleanly (SIGTERM → SIGKILL fallback after 3 seconds).",
      },
      {
        title: "Multi-source cookie support",
        detail: "yt-dlp needs browser cookies for age-restricted or private content. Built a priority chain: local cookies.txt → env-specified path → Render secret files → raw cookie string → base64-encoded cookies. Works seamlessly across local dev, Docker, and cloud platforms.",
      },
      {
        title: "Platform-agnostic bot architecture",
        detail: "The Telegram and WhatsApp bots share the same downloader module as the web UI. Adding a new bot platform means writing a thin adapter that calls createVideoDownloadProcess() — the core logic stays in one place.",
      },
      {
        title: "Download analytics with zero overhead",
        detail: "Every successful download is logged to SQLite with platform detection and source tracking. The /api/stats endpoint powers a public dashboard showing total downloads, 24-hour activity, top platforms, uptime, and source breakdown.",
      },
    ],
    challenges: [
      {
        title: "Process lifecycle management",
        detail: "yt-dlp is a long-running child process. Implemented a state machine tracking streamStarted, responseFinished, sourceClosed, and terminationRequested to handle every edge case — aborted downloads, mid-stream connection drops, crashes — without leaking processes or hanging responses.",
      },
      {
        title: "Docker multi-stage build",
        detail: "Stage 1 builds the React frontend with Vite. Stage 2 copies built assets into a slim Node.js image with ffmpeg, Python, Deno, and yt-dlp installed. Keeps the production image minimal while ensuring all dependencies are available at runtime.",
      },
      {
        title: "WhatsApp session persistence",
        detail: "Baileys stores auth credentials in a local directory. Mounted backend/baileys_auth as a Docker volume so the WhatsApp session survives container restarts — users only scan the QR code once.",
      },
    ],
    results: [
      "Supports 12+ social media platforms through yt-dlp's extractor library",
      "Three access methods (web, Telegram, WhatsApp) from a single codebase",
      "Public analytics dashboard with real-time download metrics",
      "Fully containerized — one docker compose up command deploys everything",
      "Persistent data across rebuilds via Docker volume mounts",
    ],
  },
  {
    slug: "birdeye",
    title: "Birdeye",
    tagline: "Solana Trading Dashboard",
    liveUrl: "https://birdeyeradar.site",
    githubUrl: "https://github.com/murpheus007/birdeye",
    category: "Fullstack",
    tech: ["React 18", "Vite", "TypeScript", "TailwindCSS", "Zustand", "Recharts", "Flask", "Gunicorn", "SQLAlchemy", "PostgreSQL", "Redis", "discord.py", "Docker Compose"],
    heroStats: [
      { label: "Pages", value: "9" },
      { label: "API Endpoints", value: "17+" },
      { label: "Services", value: "5" },
    ],
    overview: "Birdeye is a full-stack cryptocurrency trading dashboard built for the Solana blockchain. It combines a React frontend, Flask REST API, Discord bot, PostgreSQL database, and Redis cache into a unified multi-container system. The platform provides real-time token analytics, whale wallet tracking, customizable price alerts, a persistent watchlist, and a command center that aggregates live market data.",
    problem: "Solana's ecosystem moves fast. Tokens can pump or crash in minutes, and traders need real-time data — price action, whale movements, volume spikes, security ratings — consolidated in one place. Existing tools are either too fragmented or too centralized with paywalls. I wanted a self-hosted, open dashboard that pulls from public APIs, runs its own alerting infrastructure, and notifies through Discord.",
    architecture: {
      description: "Five services orchestrated with Docker Compose, all connected through a shared external network alongside an existing Nginx Proxy Manager for SSL termination and routing. The frontend proxies /api/* to the backend, and the proxy manager routes external traffic by hostname.",
      diagram: [
        { label: "Frontend", desc: "React + Vite + Nginx" },
        { label: "Backend", desc: "Flask + Gunicorn (4 workers)" },
        { label: "Discord Bot", desc: "discord.py + Redis pub/sub" },
        { label: "Database", desc: "PostgreSQL 15" },
        { label: "Cache", desc: "Redis 7 (dual DB)" },
      ],
    },
    decisions: [
      {
        title: "Multi-container shared network",
        detail: "Instead of running its own isolated network, Birdeye joins an existing Docker network shared with an Nginx Proxy Manager. This lets the proxy manager handle SSL termination and domain routing without Birdeye managing certificates or exposing ports directly.",
      },
      {
        title: "Redis-backed alert system",
        detail: "Alert rules are stored in PostgreSQL for persistence but mirrored into Redis for fast lookups. The Discord bot subscribes to a Redis pub/sub channel to trigger notifications in real time — the bot processes alerts independently without polling the database.",
      },
      {
        title: "Session-based auth with wallet signatures",
        detail: "Authentication uses a challenge-response flow — the server generates a nonce, the user signs it with their Solana wallet, and the signature is verified server-side. Sessions use HTTP-only cookies with SameSite=Lax. No OAuth dependencies.",
      },
      {
        title: "Demo user auto-provisioning",
        detail: "For users without a wallet, the API auto-creates a demo user on first request. This lets the frontend show a fully functional watchlist and alert system immediately, with the option to migrate to a real wallet later.",
      },
      {
        title: "Frontend data aggregation with graceful degradation",
        detail: "The Command Center fires 4 parallel API requests via Promise.all. If any endpoint fails, the UI shows a non-blocking warning rather than a full-page error. Each panel renders independently.",
      },
    ],
    challenges: [
      {
        title: "Database schema bootstrapping",
        detail: "SQLAlchemy models existed but Alembic migrations were empty. The init script created tables in wrong schemas. Every user-scoped endpoint threw 'relation does not exist' → 500. Fixed by running db.create_all() from the application context.",
      },
      {
        title: "Python module resolution in Docker",
        detail: "The Flask app imported from backend.config.config but the working directory IS the backend source — no backend package exists. A single-line import correction fixed the ModuleNotFoundError.",
      },
      {
        title: "CORS in production",
        detail: "Production CORS origins had to include https://birdeyeradar.site (not just localhost) to prevent the browser from blocking API responses through the proxy manager.",
      },
    ],
    results: [
      "9 pages — Landing, Explorer, Radar, Token War Room, Watchlist, Whales, Whale Detail, Alerts, Settings",
      "17+ API endpoints across discovery, analysis, auth, alerts, and user management",
      "Real-time data from the Birdeye public API",
      "Discord bot with 4 synced slash commands and Redis pub/sub alert listener",
      "SSL-secured with Let's Encrypt via Nginx Proxy Manager",
      "Fully containerized — 5 services with health checks and dependency ordering",
    ],
  },
  {
    slug: "deriverse",
    title: "Deriverse",
    tagline: "Wallet-Aware Trading Analytics for Solana",
    githubUrl: "https://github.com/murpheus007/deriverse",
    category: "Frontend",
    tech: ["React 19", "Vite 5", "TypeScript", "TailwindCSS", "Zustand", "TanStack Query", "TanStack Table", "Recharts", "Supabase", "Edge Functions (Deno)", "Zod", "@solana/web3.js"],
    heroStats: [
      { label: "Pages", value: "6" },
      { label: "Analytics", value: "100% client-side" },
      { label: "Modes", value: "Dual" },
    ],
    overview: "Deriverse is a wallet-aware trading analytics dashboard built for Solana traders. It ingests trade fills — from CSV imports, mock data, or live wallet sync — and derives actionable analytics: PnL tracking, win/loss ratios, drawdown analysis, fee breakdowns, symbol performance, and time-based patterns. A dual-mode architecture lets users run fully local with demo data or connect a Solana wallet via Supabase anonymous auth.",
    problem: "On-chain traders on Solana generate hundreds of fills across spot, perpetual, and options markets. Understanding performance requires derived trades, fee analysis, drawdown curves, and filtering by wallet, symbol, time range, and market type. Existing tools require connecting to third-party services (privacy risk), manual spreadsheets (error-prone), or paying for institutional-grade analytics.",
    architecture: {
      description: "A React SPA with two runtime modes: Demo Mode (localStorage + mock data) and Wallet Mode (Supabase + RLS). Both implement the same StorageRepository interface, so every page, hook, and analytics function works identically regardless of where data lives.",
      diagram: [
        { label: "Demo Mode", desc: "localStorage + 100 mock fills" },
        { label: "Wallet Mode", desc: "Supabase anon auth + RLS" },
        { label: "Auth", desc: "Nonce-sign-verify Edge Functions" },
        { label: "Analytics", desc: "Pure functions over fill arrays" },
        { label: "Sync", desc: "MockSyncProvider (seeded hash)" },
      ],
    },
    decisions: [
      {
        title: "Dual-mode storage with automatic switching",
        detail: "The StorageProvider auto-detects the runtime mode: if Supabase is configured AND the user has linked a wallet, it uses createSupabaseRepository(); otherwise it falls back to createLocalRepository(). Both implement the same interface — linking a wallet automatically promotes the session.",
      },
      {
        title: "Derived trades from raw fills",
        detail: "Raw fills are individual order executions. deriveTradesFromFills() pairs them into complete trades by grouping by symbol-side and sorting chronologically. Each derived trade computes PnL (accounting for fees), return percentage, duration, and order type mix. Pure functional logic — trivially testable.",
      },
      {
        title: "Nonce-based wallet signature verification",
        detail: "Two-step Edge Function pattern: create-nonce generates a UUID nonce with 10-minute expiry; verify-wallet-link validates the nonce, verifies the Ed25519 signature using tweetnacl, upserts the wallet, and marks the nonce as used. Replay attack prevention.",
      },
      {
        title: "Money-safe arithmetic",
        detail: "toMoney()/fromMoney() helpers convert between floating-point dollars and integer-cent representations. All PnL calculations use raw integer form to avoid floating-point rounding errors across hundreds of trades.",
      },
      {
        title: "CSV import with validation",
        detail: "parseTradeFillsCsv() validates headers, required fields, numeric types, and enum values before any data touches the storage layer. Errors are collected per-row with row numbers and field names. Files parsed client-side using the File API.",
      },
    ],
    challenges: [
      {
        title: "Wallet auth without a traditional backend",
        detail: "Supabase anonymous auth provides the session, but wallet ownership proof happens through a custom nonce-sign-verify flow in Edge Functions. Coordinating the JWT-authenticated client for reading nonces with the service role client for upserting wallets required careful security boundary design.",
      },
      {
        title: "RLS with wallet-scoped data",
        detail: "Row-level security policies needed to ensure users can only see their own wallets. The wallets table policy uses an exists subquery against user_wallets. Required careful testing with multiple anonymous sessions to ensure no data leaked across users.",
      },
      {
        title: "Mobile-responsive trade tables",
        detail: "The Trades page switches between a full TanStack Table on desktop and a custom card-based layout on mobile (isCompact state driven by matchMedia). The card layout reuses the same data but renders clickable cards instead of table rows.",
      },
    ],
    results: [
      "6 pages — Dashboard, Trades, Journal, Portfolio, Calendar, Settings",
      "100% client-side analytics — all metrics computed from fill arrays",
      "Dual-mode architecture — demo mode works fully offline",
      "Multi-wallet support with primary wallet selection",
      "CSV import with per-row validation and error reporting",
      "JSON export for data portability",
      "Dark/light theme with Zustand persistence",
      "Type-safe end-to-end with TypeScript",
    ],
  },
  {
    slug: "genievirtualtalk",
    title: "Genie Virtual Talk",
    tagline: "E-Commerce & Remote Work Recruitment Platform",
    liveUrl: "https://genievirtualtalk.vercel.app",
    githubUrl: "https://github.com/murpheus007/genie-virtual-talk",
    category: "Fullstack",
    tech: ["React 19", "Vite", "TailwindCSS", "React Router", "Express 5", "Stripe", "Appwrite", "Framer Motion", "React Toastify"],
    heroStats: [
      { label: "Purpose", value: "Dual" },
      { label: "Deploy", value: "Vercel + Render" },
      { label: "Payments", value: "Stripe" },
    ],
    overview: "Genie Virtual Talk is a full-stack web application for Genie Talk Telecommunications LLC, a virtual call center based in Atlanta, Georgia. The platform serves a dual purpose: it markets the company's remote job opportunities through a polished landing page experience, and it sells digital career resources through a complete e-commerce flow — from product browsing to Stripe-powered checkout.",
    problem: "Genie Virtual Talk needed a professional online presence that could recruit remote job applicants and monetize digital career resources simultaneously. The recruitment side required a compelling marketing site; the commerce side required a full product catalog, shopping cart, user auth, Stripe payments, and order history — essentially a mini Shopify in one cohesive app.",
    architecture: {
      description: "Two independently deployable parts: a React SPA on Vercel and an Express backend on Render. The Express server handles Stripe PaymentIntent creation and webhook processing. Appwrite serves as the sole database for user profiles, payments, cart items, and job applications.",
      diagram: [
        { label: "Frontend", desc: "React + Vite (Vercel)" },
        { label: "Backend", desc: "Express + Stripe (Render)" },
        { label: "Database", desc: "Appwrite" },
        { label: "Auth", desc: "Appwrite Account API" },
        { label: "Payments", desc: "Stripe PaymentIntents" },
      ],
    },
    decisions: [
      {
        title: "Idempotent payment intent creation",
        detail: "The /create-payment-intent endpoint queries Appwrite for an existing payment with the same sessionId and status: 'initiated' before calling Stripe. If one exists, it returns the stored client_secret — preventing duplicate charges from refresh or back-button during checkout.",
      },
      {
        title: "Raw body parsing for Stripe webhooks",
        detail: "The webhook route uses express.raw({ type: 'application/json' }) instead of express.json() because Stripe's signature verification requires the raw request body. JSON parsing would alter the body and cause every webhook verification to fail silently.",
      },
      {
        title: "Dual-state checkout with progress steps",
        detail: "Three-step wizard (Shipping → Payment → Confirmation) managed by local component state. Step 1 triggers PaymentIntent creation. Step 2 renders Stripe's CardElement. Step 3 shows confirmation with auto-redirect after 4 seconds.",
      },
      {
        title: "Client-side tax calculation prevention",
        detail: "Tax (7.5%) is calculated on the server side during PaymentIntent creation, not on the frontend. This prevents users from manipulating the tax amount — the server is the source of truth.",
      },
      {
        title: "User info document race condition fix",
        detail: "Implemented a waitForUserId polling function (up to 10 retries at 500ms intervals) that waits for the Appwrite Auth session to be fully available before creating the user info document — preventing null user ID errors.",
      },
    ],
    challenges: [
      {
        title: "Payment intent lifecycle management",
        detail: "The frontend needs the client_secret to render the Stripe payment form, but the server needs to create the PaymentIntent first. Solved by making Step 1 (shipping form) trigger creation, and only advancing to Step 2 once the client_secret is received.",
      },
      {
        title: "Webhook reliability",
        detail: "Stripe webhooks can fire multiple times for the same event. The handler is idempotent — it looks up the payment by stripePaymentId and updates the status, so duplicate deliveries are harmless.",
      },
      {
        title: "Cross-origin deployment",
        detail: "Frontend on Vercel and backend on Render are on different domains. CORS configured with origin: true on Express, and the frontend uses VITE_API_URL env var to point to the correct backend URL.",
      },
    ],
    results: [
      "Full e-commerce flow: catalog → cart → shipping → Stripe payment → order confirmation → order history",
      "Application form with validation and Appwrite document submission",
      "User authentication with email/password and OAuth2 social login",
      "Protected routes for checkout, profile, and order history",
      "Responsive design with mobile-first navigation",
      "Dual deployment: frontend on Vercel, backend on Render",
      "Webhook-verified payment status updates",
    ],
  },
  {
    slug: "chainstellar",
    title: "Chainstellar",
    tagline: "Creative Writer & Technical Analyst Portfolio",
    liveUrl: "https://chainstellar.site",
    githubUrl: "https://github.com/murpheus007/chainstellar",
    category: "Frontend",
    tech: ["Astro 5", "React 19", "TailwindCSS 4", "Framer Motion", "Vite 7", "Nginx", "Docker"],
    heroStats: [
      { label: "Sections", value: "7" },
      { label: "Works", value: "19" },
      { label: "Build", value: "Static" },
    ],
    overview: "Chainstellar is a portfolio website for Damian D. Chidera, a creative writer and technical analyst specializing in the Solana blockchain ecosystem. It showcases his published works, recognitions, and skill set in a polished, animated single-page experience built with Astro, React, and TailwindCSS. The site is fully containerized, served through Nginx, and deployed behind a shared reverse proxy with SSL.",
    problem: "Writers and analysts in the Web3 space need a portfolio that demonstrates technical depth and showcases creative range. Most portfolio templates are generic — they weren't designed for someone who publishes on Medium, Substack, and X/Twitter, wins bounties on Superteam Earn, and gets recognized by state governments for content creation.",
    architecture: {
      description: "A single-service static site with a multi-stage Docker build. Stage 1 builds with Node/Astro, producing pure HTML/CSS. Stage 2 serves through custom Nginx Alpine on port 4321 behind the shared Nginx Proxy Manager.",
      diagram: [
        { label: "Framework", desc: "Astro 5 (static generation)" },
        { label: "Components", desc: "React 19 (interactive islands)" },
        { label: "Styling", desc: "TailwindCSS 4 + CSS Modules" },
        { label: "Animations", desc: "Framer Motion + IntersectionObserver" },
        { label: "Server", desc: "Nginx Alpine (port 4321)" },
      ],
    },
    decisions: [
      {
        title: "Astro with React islands",
        detail: "The site is mostly static content compiled to pure HTML/CSS at build time. Only interactive parts (navbar drawer, hero animations, scroll-triggered card reveals) run React. Keeps the JS bundle small while allowing rich client-side behavior.",
      },
      {
        title: "Scroll-triggered animations via IntersectionObserver",
        detail: "A global IntersectionObserver watches for .bw-card elements entering the viewport. When a card scrolls into view, it gets a bw-visible class triggering fade-up CSS transitions with staggered delays. Vanilla JS — no animation library needed for scroll reveals.",
      },
      {
        title: "Dynamic See More with re-observation",
        detail: "The Best Works grid shows 6 items by default with a See More button revealing all 19. Newly revealed cards are attached to a global window._reobserveCards() function that re-observes any .bw-card elements without the bw-visible class.",
      },
      {
        title: "Dark mode with CSS custom properties",
        detail: "The entire color system is built on CSS custom properties defined in @theme (TailwindCSS 4) and overridden in a .dark class. The navbar reads the initial theme from document.documentElement.classList on mount and persists to localStorage.",
      },
      {
        title: "Hero animation choreography",
        detail: "Two parallel useEffect animation loops: one cycles through heading words with scale pulses, the other cycles the hero image between tilted and upright positions. Both use cancelled flags in cleanup functions to prevent state updates on unmounted components.",
      },
    ],
    challenges: [
      {
        title: "Port configuration in a shared network",
        detail: "The container uses port 4321 behind a reverse proxy. Required matching the Dockerfile EXPOSE, custom nginx config, docker-compose expose directive, and Nginx Proxy Manager host mapping — a mismatch anywhere results in 502 Bad Gateway.",
      },
      {
        title: "CSS-in-JS vs. CSS Modules vs. Tailwind",
        detail: "The project uses all three: Tailwind for utility-first layout, CSS Modules for component-scoped styles, and inline <style> tags for dynamic CSS injected at runtime (skills grid animations, recognition timeline).",
      },
      {
        title: "Build-time vs. runtime environment variables",
        detail: "SITE_URL is passed as a Docker build arg for Astro's sitemap at build time, while allowedHosts in Vite dev server config uses a hardcoded value for ngrok tunneling.",
      },
    ],
    results: [
      "7 sections — Hero, Skills (bento grid), Best Works (19 articles/threads), Recognitions (timeline), Why Me (CTA), Navbar, Footer",
      "19 published works in a filterable grid with lazy-loaded images",
      "6 recognitions in an alternating timeline with year badges",
      "6 skill cards in a bento grid with scroll-triggered fly-in animations",
      "Dark mode with full CSS custom property coverage",
      "SEO-optimized with JSON-LD structured data, sitemap, and Open Graph meta tags",
      "Multi-stage Docker build producing minimal nginx image",
    ],
  },
  {
    slug: "pixelforge",
    title: "PixelForge",
    tagline: "AI Image Generation Platform",
    githubUrl: "https://github.com/murpheus007/pixelforge",
    category: "Fullstack",
    tech: ["Next.js 14", "TypeScript", "TailwindCSS", "Clerk", "FastAPI", "Celery", "Redis", "PostgreSQL", "MinIO", "OpenRouter", "Docker Compose"],
    heroStats: [
      { label: "Architecture", value: "Async queue" },
      { label: "AI Model", value: "FLUX.2" },
      { label: "Storage", value: "S3-compatible" },
    ],
    overview: "PixelForge is a fullstack AI image generation platform. Users sign in via Clerk, type a text prompt, and the system queues an async generation job through Celery + Redis. A worker calls OpenRouter's FLUX.2 Klein 4B model, stores the resulting image in MinIO (S3-compatible object storage), and the frontend polls until the image is ready. Built with Next.js on the frontend and FastAPI on the backend, all containerized with Docker Compose.",
    problem: "AI image generation requires calling external APIs that can take 10-30 seconds per request. A synchronous web request would time out or leave users staring at a blank screen. The system needs to accept a prompt, return immediately, process the generation asynchronously, and notify the user when their image is ready — all while handling auth, storage, and cost tracking.",
    architecture: {
      description: "A decoupled async pipeline: the Next.js frontend submits prompts to FastAPI, which enqueues a Celery task via Redis. A Celery worker picks up the job, calls OpenRouter's FLUX.2 model, stores the image in MinIO, and updates PostgreSQL. The frontend polls the generation endpoint until the image URL is available.",
      diagram: [
        { label: "Frontend", desc: "Next.js 14 + Clerk auth" },
        { label: "API", desc: "FastAPI (Python)" },
        { label: "Queue", desc: "Celery + Redis" },
        { label: "AI", desc: "OpenRouter → FLUX.2 Klein 4B" },
        { label: "Storage", desc: "MinIO (S3-compatible)" },
        { label: "Database", desc: "PostgreSQL" },
      ],
    },
    decisions: [
      {
        title: "Async queue instead of synchronous generation",
        detail: "Image generation takes 10-30 seconds. Instead of holding the HTTP request open (risking timeouts), FastAPI enqueues a Celery task and returns immediately with a job ID. The frontend polls GET /api/generate/:id until status is 'complete'. This decouples the web layer from the AI layer entirely.",
      },
      {
        title: "MinIO for S3-compatible image storage",
        detail: "MinIO provides an S3-compatible API that runs locally in Docker — no cloud storage costs during development. The same code works with AWS S3 in production by swapping the endpoint URL and credentials. Images are stored with public URLs served directly from MinIO.",
      },
      {
        title: "Clerk for auth with middleware protection",
        detail: "Clerk handles email/password and OAuth social login. Next.js middleware protects /generate and /gallery routes — unauthenticated users are redirected to sign-in before hitting any API. The backend verifies the Clerk session token on every API call.",
      },
      {
        title: "Polling-based status updates",
        detail: "The frontend polls the generation status endpoint every 2 seconds after submission. When the Celery worker finishes and updates the database record with the image URL, the next poll returns it and the UI transitions from loading to displaying the image. Simple, reliable, no WebSocket complexity needed.",
      },
      {
        title: "Cost-conscious model selection",
        detail: "FLUX.2 Klein 4B at $0.014 per image keeps costs predictable. At 100 test images, total cost is ~$1.40. The architecture supports swapping models via OpenRouter without code changes — just update the model string in the Celery task.",
      },
    ],
    challenges: [
      {
        title: "Celery worker coordination across containers",
        detail: "The Celery worker needs access to the same Python code, Redis connection, and database as the FastAPI app. All services share a Docker Compose network, and the worker imports from the same app package — ensuring models, config, and services are identical.",
      },
      {
        title: "Image URL generation behind reverse proxy",
        detail: "MinIO serves images on a different port than the frontend. The generation record stores the full MinIO URL, and the frontend renders it directly — the browser fetches images from MinIO while the app itself is served through the proxy.",
      },
      {
        title: "Frontend polling without overwhelming the API",
        detail: "Polling every 2 seconds is aggressive but necessary for a responsive UX. The status endpoint is a simple primary key lookup on PostgreSQL — negligible load. A production upgrade would use Server-Sent Events or WebSockets for push-based updates.",
      },
    ],
    results: [
      "Full async image generation pipeline — submit a prompt, get an image in 10-30 seconds",
      "6-service Docker Compose setup: frontend, API, worker, Redis, PostgreSQL, MinIO",
      "Clerk authentication with protected routes via Next.js middleware",
      "S3-compatible storage with MinIO — zero cloud costs in development",
      "Cost-effective at $0.014 per image via OpenRouter FLUX.2",
      "Interactive API docs at /docs via FastAPI Swagger",
      "Gallery page with pagination and delete functionality",
    ],
  },
];

export const getCaseStudyBySlug = (slug) => {
  return caseStudies.find((cs) => cs.slug === slug);
};
