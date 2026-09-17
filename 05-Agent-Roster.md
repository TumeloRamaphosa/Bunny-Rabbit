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
