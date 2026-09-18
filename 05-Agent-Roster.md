# Agent Roster & API Keys

## Primary Agents

### Grok Bot
- **Role:** Central orchestrator, research + decision support
- **Endpoint:** [PASTE HERE]
- **API Key:** [PASTE HERE]
- **Repo:** [PASTE HERE]
- **Connection:** LiteLLM gateway (:4000)

### Buzz Group Agents
Agent 1:
- **Name:** [PASTE]
- **Role:** [Market Scout / Fundraiser / etc]
- **API Key:** [PASTE]
- **Endpoint:** [PASTE]

Agent 2:
- **Name:** [PASTE]
- **Role:** [Market Scout / Fundraiser / etc]
- **API Key:** [PASTE]
- **Endpoint:** [PASTE]

[Add more agents as needed]

## Integration
All agents route through **LiteLLM gateway** at `localhost:4000`:
- Standardizes OpenAI-compat API
- Logs all requests to Obsidian
- Routes to Grok bot as primary, falls back to others

## Config Template (save to ~/.env.bunny-rabbit)
```bash
GROK_API_KEY=[PASTE]
GROK_ENDPOINT=[PASTE]
BUZZ_AGENT_1_KEY=[PASTE]
BUZZ_AGENT_2_KEY=[PASTE]
LITELLM_GATEWAY=localhost:4000
```

## Wiring Checklist
- [ ] Grok bot endpoint + key
- [ ] Buzz agents (5x) endpoints + keys
- [ ] LiteLLM routes configured
- [ ] Obsidian logging enabled
- [ ] Daily routine cron jobs set up
- [ ] Katlego's financial dashboard connected

## Buzz Network Connection

**Endpoint:** `wss://studex-agents.communities.buzz.xyz`

### Agent Registration
All Bunny-Rabbit agents register with Buzz on startup:

```python
# Each agent connects:
import asyncio
from buzz_client import BuzzClient

client = BuzzClient(
    endpoint="wss://studex-agents.communities.buzz.xyz",
    agent_name="market-scout",
    pubkey="[agent_pubkey]"
)

await client.connect()
await client.subscribe("bunny-rabbit")  # Topic
await client.publish_status("online")
```

### Agent-to-Agent Communication
```
Market Scout → publishes: "pharma_import_scan_complete" → topic:bunny-rabbit
Investment Hunter → subscribes: receives data → processes deals
Katlego → subscribes: sees deals → scores
Fundraiser → subscribes: receives warm leads → outreach
Bunny Bot → subscribes: daily summary
```

### Buzz Advantages
- Decentralized (no central server required)
- Real-time (WebSocket)
- Searchable (Nostr protocol)
- Timestamped (immutable log)
- Privacy-first (agents own keys)

