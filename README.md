# Bunny-Rabbit Operations System

**Partners:** Tumelo Ramaphosa (CEO/Strategy) + Katlego (Chartered Accountant, Finance & Operations)

## Mission
Build a health virtual machine business (pharmaceutical manufacturing in Africa) while strengthening our relationship and creating agents that work for us.

## Three Systems
1. **Relationship Building** — intuitive AI questions, Obsidian knowledge base, couple's future planning
2. **Pharma Manufacturing Strategy** — investment sourcing, import substitution, Africa expansion (Natalia, Global Markets, Africa Buiz)
3. **Agent Operations** — daily routines, investment pipeline, time optimization

## Repository layout (monorepo)

Ops notes stay at the repo root; the **Phuket 2026 travel planner** lives in `apps/web`.

```
Bunny-Rabbit/
├── README.md (this file)
├── 01-Daily-Agent-Routine.md (daily loop for pharma sourcing + relationship)
├── 02-Katlego-Financial-Dashboard.md (P&L, import deficit tracking, deal pipeline)
├── 03-Relationship-Questions.md (daily check-ins, knowledge base seeding)
├── 04-Pharma-Strategy.md (investment targets, African expansion, manufacturing roadmap)
├── 05-Agent-Roster.md (names, roles, daily tasks, API keys)
├── 06-Travel-Timeline.md (China, Thailand, logistics + business milestones)
├── apps/web/              → Next.js travel microservice (@bunny-rabbit/web)
├── workers/edge/          → Cloudflare Worker stub (@bunny-rabbit/edge)
├── docs/travel-microservice.md
├── .env.example
└── vercel.json
```

## Travel planner (deployable microservice)

- **Service:** `bunny-rabbit-travel`
- **Trip:** Phuket, 15–22 Dec 2026 — 4BR villa + pool (Tumelo, Katlego, sister, sister's boyfriend)
- **Features:** itinerary calendar, villa shortlist (R50k–R100k ZAR filter), shared checklist/notes, private wellness/cycle calendar (local only), Hotels.com deep links
- **Run locally:** `npm install && npm run dev` → [http://localhost:3000](http://localhost:3000)
- **Health:** `GET /api/health`
- **Deploy:** see [docs/travel-microservice.md](./docs/travel-microservice.md) for **Vercel** and **Cloudflare** (Worker + Pages notes) and Studex-style fleet metadata.

## Next: Lock the daily routine + push to git
