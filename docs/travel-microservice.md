# Bunny Rabbit Travel Microservice

Service name: **`bunny-rabbit-travel`**

Mobile-first Phuket trip planner (Dec 15–22, 2026) for Tumelo, Katlego, and guests.

## Monorepo layout

```
Bunny-Rabbit/
├── README.md                    # Ops mission + repo overview
├── 01-Daily-Agent-Routine.md    # Obsidian ops (unchanged)
├── 05-Agent-Roster.md
├── apps/web/                    # Next.js App Router (primary deployable)
├── workers/edge/                # Cloudflare Worker stub (health + optional proxy)
├── docs/travel-microservice.md  # This file
├── .env.example
└── vercel.json                  # Vercel monorepo build from root
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # web + edge stub
```

| Port | Service              | Health check              |
|------|----------------------|---------------------------|
| 3000 | `@bunny-rabbit/web`  | `GET /api/health`         |
| 8787 | `@bunny-rabbit/edge` | `GET /health` (wrangler dev) |

## Deploy to Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com/new).
2. **Root Directory:** leave as repository root (uses root `vercel.json`)  
   *Alternative:* set Root Directory to `apps/web` and use default Next.js build.
3. Framework preset: **Next.js**.
4. Environment variables (see `.env.example`):
   - `NEXT_PUBLIC_APP_URL` → production URL (e.g. `https://bunny-rabbit-travel.vercel.app`)
5. Deploy. Verify: `curl https://<your-host>/api/health`

### Studex-style fleet registration

| Field        | Value |
|-------------|-------|
| Service ID  | `bunny-rabbit-travel` |
| Type        | `web` (Next.js) |
| Port (local)| `3000` |
| Health      | `GET /api/health` → `{ "status": "ok", "service": "bunny-rabbit-travel" }` |
| Depends on  | None (client-side localStorage; no DB in v0) |
| Optional    | LiteLLM gateway for future agent hooks |

## Deploy to Cloudflare

### Option A — Worker in front of Vercel (CDN / edge API)

1. `cd workers/edge && npm install`
2. `npx wrangler login` (use your Cloudflare account)
3. Set secret: `wrangler secret put VERCEL_ORIGIN_URL` → your Vercel URL
4. `npm run deploy`
5. Route DNS (orange cloud) `travel.yourdomain.com` → Worker  
   **WAF / DNS:** use Cloudflare dashboard for bot fight mode, rate limits, and geo rules on `/api/*`.

Edge health: `GET https://<worker-host>/health`

### Option B — Cloudflare Pages (static + Next export alternative)

For full Next.js on Cloudflare, use [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages) or OpenNext adapter in a follow-up. Current v0 targets **Vercel for the Next app** and **Worker stub** for edge health/proxy.

Pages static fallback (marketing only):

```bash
cd apps/web && npx next build && npx next export   # if export enabled in future
npx wrangler pages deploy out --project-name=bunny-rabbit-travel
```

## Cloudflare + Vercel together

```
User → Cloudflare DNS (WAF/CDN) → Worker (optional /health, /api/edge)
                              → Vercel (Next.js apps/web)
```

- **TLS:** Full (strict) between Cloudflare and Vercel custom domain.
- **Caching:** cache static assets at Cloudflare; bypass cache for `/api/*`.
- **Privacy:** wellness data never leaves the browser; no server-side PHI.

## Environment variables

Copy `.env.example` to `.env.local` in `apps/web` for local overrides. Never commit secrets.
