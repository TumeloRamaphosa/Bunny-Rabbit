# Bunny-Rabbit Operating System

**Orchestrator:** !Bunny Rabbit  
**Updated:** 19 Sep 2026

## Rituals
### Daily lock-in — 19:00 SAST (every day)
- Mode: together or video; **laptops + notepads only** (no phones / WhatsApp)
- Duration: 1 hour (can sit inside dinner or after calls)
- Agenda:
  1. Couple-goals overview (short)
  2. ~20 min agents — goals, procedures, blockers
  3. ~20 min couple goals, fitness, therapy/counselling
  4. Diary + tomorrow alignment
- Grok Bot routine: `7pm-lock-in-prep`

### Sunday weekly align — 10:00 SAST
- Align diaries, travel/accommodation cost cuts, fitness week, couple + therapy touchpoint, agent priorities
- Grok Bot routine: `sunday-weekly-align`

## Fitness
- 2 shared weight sessions / week
- 3 shared walks × 1 hour / week
- Track in app: Fitness + Food tracker

## App (online)
- Repo: https://github.com/TumeloRamaphosa/Bunny-Rabbit
- Vercel project: `bunny-rabbit` (team `stud-ex-s-projects`), root `apps/web`
- Cloudflare: DNS/CDN later (Agent Lord gate)
- Modules: Lock-in Diary · Agent Check · Couple Goals · Fitness/Food · Travel · Private therapy notes

## Agent model tiers
| Role | Tier | Notes |
|------|------|-------|
| Orchestrator | Strong reasoning | Routing + judgment |
| Market Scout / Investment Hunter | Fast + search | Bulk intel |
| Fundraiser drafts | Strong writer | Human approve outbound |
| Travel research | Fast + browser | Quotes |
| Fitness/food logger | Small/fast | Structured logs |
| Therapy prompts | Strong + careful | Private; never auto-send |

## Connections
- [x] GitHub Bunny-Rabbit
- [x] Vercel project linked
- [ ] Vercel Root Directory = `apps/web` + include outside root
- [ ] Cloudflare DNS
- [ ] Google Calendar
- [ ] AgentMail / Gmail
- [ ] Buzz / OpenClaw (fleet, not personal WA)
- [ ] Headroom (portable skill or proxy) for token headroom
- [ ] Notion/Sheets for Katlego P&L (optional)

## Headroom
Context-optimization layer / portable skill — compress tool outputs before they hit models. Install path TBD (portable skill into repo vs full proxy).
