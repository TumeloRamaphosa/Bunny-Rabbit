# Bunny-Rabbit Operations System

**Partners:** Tumelo Ramaphosa (CEO/Strategy) + Katlego (Chartered Accountant, Finance & Operations)

## Mission
Build a health virtual machine business (pharmaceutical manufacturing in Africa) while strengthening our relationship and creating agents that work for us.

## Three Systems
1. **Relationship Building** — intuitive AI questions, Obsidian knowledge base, couple's future planning
2. **Pharma Manufacturing Strategy** — investment sourcing, import substitution, Africa expansion (Natalia, Global Markets, Africa Buiz)
3. **Agent Operations** — daily routines, investment pipeline, time optimization

## Repository layout (monorepo)

Ops notes stay at the repo root; the **Phuket 2026 travel planner** lives in **`apps/web`** (Vercel Root Directory).

```
Bunny-Rabbit/
├── README.md (this file)
├── 01-Daily-Agent-Routine.md
├── 05-Agent-Roster.md
├── apps/web/              → Next.js (@bunny-rabbit/web) — **only** UI host
├── workers/edge/          → optional edge API stub (not used for UI deploy)
├── docs/travel-microservice.md
├── .env.example
└── .nvmrc                 → Node 24.x
```

## Travel planner (deployable microservice)

- **Service:** `bunny-rabbit-travel`
- **Trip:** Phuket, 15–22 Dec 2026 — 4BR villa + pool (Tumelo, Katlego, sister, sister's boyfriend)
- **Run locally:** `npm install && npm run dev` → [http://localhost:3000](http://localhost:3000) (Node **24.x**)
- **Health:** `GET /api/health`

### Deploy (Studex / Claudiou conventions)

**Primary host: Vercel** — team **`stud-ex-s-projects`**, project **`bunny-rabbit`** or **`studex-bunny-rabbit`**, Root Directory **`apps/web`**, Node **24.x**.

1. **Preview-first:** connect the repo, set Root Directory to `apps/web`, deploy from a **PR** and verify the Preview URL + `/api/health`.
2. **Production** on branch `main` only after **Agent Lord** approval.
3. **Custom domain** (candidate `bunny.studex-group.com` — not claimed yet) and Cloudflare DNS/CDN in front of Vercel — same approval gate; **do not** host the Next UI on Cloudflare Pages.

Full checklist: [docs/travel-microservice.md](./docs/travel-microservice.md). Env template: [`.env.example`](./.env.example) (`NEXT_PUBLIC_*`, optional `BUZZ_*`).

## Next: Lock the daily routine + push to git
