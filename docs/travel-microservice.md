# Bunny Rabbit Travel Microservice

Service name: **`bunny-rabbit-travel`**  
Fleet conventions: **Claudiou / Studex infra** (Vercel-primary; Cloudflare DNS/CDN later).

Mobile-first Phuket trip planner (Dec 15–22, 2026) for Tumelo, Katlego, and guests.

## Monorepo layout

```
Bunny-Rabbit/
├── README.md
├── apps/web/                    # Next.js — sole UI host (Vercel)
├── workers/edge/                # Optional; only if you add edge API outside Next (not used for UI)
├── docs/travel-microservice.md
└── .env.example
```

## Local development

Requires **Node 24.x** (see `.nvmrc`).

```bash
npm install          # from repo root (workspaces)
npm run dev          # http://localhost:3000
npm run build        # Next.js production build only
```

| Port | Service             | Health check        |
|------|---------------------|---------------------|
| 3000 | `@bunny-rabbit/web` | `GET /api/health`   |

Optional edge package (not part of default fleet deploy):

```bash
npm run build:edge   # only when maintaining workers/edge
```

## Vercel (primary host)

**Do not** deploy this Next.js UI to Cloudflare Pages. The app runs on Vercel only.

| Setting | Value |
|---------|--------|
| Team | `stud-ex-s-projects` |
| Project name | `bunny-rabbit` or `studex-bunny-rabbit` |
| Framework | Next.js |
| **Root Directory** | **`apps/web`** |
| Node.js version | **24.x** |
| Production branch | `main` |
| Preview deployments | **Pull requests** (preview-first workflow) |

### Preview-first deploy (recommended order)

1. In Vercel, switch to team **`stud-ex-s-projects`** and import this GitHub repo.
2. Create project **`bunny-rabbit`** (or **`studex-bunny-rabbit`**).
3. Set **Root Directory** to **`apps/web`**.
4. Enable **Include source files outside of the Root Directory** (monorepo workspaces).
5. Suggested commands (if Vercel does not auto-detect):
   - **Install Command:** `cd ../.. && npm install`
   - **Build Command:** `npm run build` (runs in `apps/web`)
   - **Output:** Next.js default (no custom `outputDirectory`)
6. Add environment variables from [`.env.example`](../.env.example) (Preview + Development first; Production later).
7. Open a PR → confirm **Preview** URL and `curl https://<preview-host>/api/health`.
8. **Production** on `main` and any **custom domain** (e.g. candidate `bunny.studex-group.com`, not yet claimed) only after **Agent Lord** approval.

### Studex fleet registration

| Field | Value |
|-------|--------|
| Service ID | `bunny-rabbit-travel` |
| Host | Vercel (`stud-ex-s-projects`) |
| Type | `web` (Next.js App Router) |
| Root path | `apps/web` |
| Port (local) | `3000` |
| Health | `GET /api/health` → `{ "status": "ok", "service": "bunny-rabbit-travel" }` |
| Data | Client `localStorage` only (v0); no server DB |
| Optional agents | `BUZZ_*` env vars for future Buzz / LiteLLM integration |

## Cloudflare (later — DNS / CDN only)

Use Cloudflare **in front of a custom domain** pointing to Vercel — not as a second Next host.

1. After Agent Lord approves a hostname (candidate: **`bunny.studex-group.com`**), add the domain in Vercel and note the recommended CNAME target.
2. In Cloudflare DNS, create the record Vercel specifies (typically CNAME → `cname.vercel-dns.com` or A/ALIAS per Vercel docs).
3. Orange-cloud proxy is OK for CDN/WAF; use **Full (strict)** SSL.
4. Cache static assets; **bypass cache** for `/api/*`.
5. **Do not** mirror the Next app on Cloudflare Pages.

### Workers (`workers/edge`)

Skip for the current product: health and UI live on Next (`/api/health`). Add a Worker **only** if you introduce a small **edge API outside Next** (rate limiting, webhooks, etc.). See `workers/edge/README.md` — not wired into Vercel deploy.

## Environment variables

Copy [`.env.example`](../.env.example) to `apps/web/.env.local` for local dev. Set the same keys in Vercel (Preview first). Never commit real secrets.

## Privacy

Wellness/cycle markers stay in the browser. No Flo API. Not medical advice.
