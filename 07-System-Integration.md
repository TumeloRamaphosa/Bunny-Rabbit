# Bunny-Rabbit System Integration

**Wiring Bunny-Rabbit into the Studex Agent OS Infrastructure**

---

## Architecture Alignment

Bunny-Rabbit follows the **Studex Agent OS pattern**:
- Infrastructure: COMPLETE-SYSTEM-MAP (Mac Mini + Oracle VM, Cloudflare, Tailscale)
- Platform: STUDEX-ECOSYSTEM-SAAS-PLATFORM (multi-agent coordination)
- Operations: COFFEE-COMMAND-CENTRE pattern (domain-specific agents)
- Storage: DATA-ROOM-ARCHITECTURE (Google Drive source of truth)

---

## Deployment Summary

**Agents:** Market Scout (Ollama), Investment Hunter (Grok), Fundraiser (LM Studio), Bunny Bot (Claude API)
**Services:** MCP Bridge (:8001), Brain API (:8000), Obsidian vault, Gitea (robusca-brain)
**Storage:** Google Drive (Studex Group/Agent OS/bunny-rabbit/)
**Networks:** Cloudflare Tunnel (public), Tailscale mesh (private)
**Dashboard:** War Room (100.95.66.29:3002), Katlego Financial Gate (:5061)

Ready to activate once you provide:
1. Grok bot API key + endpoint
2. Buzz agent credentials (5x)
3. GitHub/Gitea push access

**Next:** Paste agent keys → I wire everything → First agent runs → You review output
