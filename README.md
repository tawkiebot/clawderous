# Clawederous

> Email as the universal interface for personal automation.

<div align="center">

**A homage to Posterous (2008)** — the startup that let you blog via email, now reimagined for the agent era.

[Get Started](/docs/getting-started.md) · [Workflows](/docs/workflows.md) · [CLI](/docs/cli.md)

</div>

## What is Clawederous?

Clawederous is a personal automation layer that treats email as a command bus. Send an email, get things done. No apps, no logins, no friction.

```
To: you@agentmail.**to**
Subject: /tweet Hello from Clawederous! 🦞

→ Tweet posted. Confirmation reply sent.
```

## Why Email?

- **Universal** — Everyone has email. No new accounts, no lock-in.
- **Ubiquitous** — Works on any device, any email client.
- **Agent-ready** — Perfect interface for AI to parse and act on.
- **No lock-in** — Your data, your inbox, your rules.

## Quick Example

```
To: tawkie@agentmail.to
Subject: /note Meeting with Sarah

Body:
Action: follow up on pricing
@claris send: meeting notes attached
```

Result: Note saved to knowledge base, task sent to Claris.

## Supported Commands

| Command | Action |
|---------|--------|
| `/tweet` | Post to X/Twitter |
| `/note` | Save to personal knowledge base |
| `/claris` | Forward to designated recipient |
| `/log` | Append to daily journal |
| `/remind` | Create a reminder |
| `/summarize` | AI summary of email thread |

## Architecture

```
Email → IMAP → Parser → Agent → Action → Confirmation
                    ↓
              Knowledge Base / APIs
```

## Getting Started

1. Set up AgentMail inbox (or any IMAP provider)
2. Configure credentials in `.env`
3. Start the agent: `npm run dev`
4. Send your first command

```bash
git clone https://github.com/tawkie/clawederous
cd clawederous
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## Tech Stack

- **Inbox**: AgentMail (default) or any IMAP
- **Agent**: OpenClaw / Claude
- **Actions**: Twitter API, local filesystem, webhooks, Signal/Telegram

## Philosophy

> Email is the OS. Your inbox is your terminal.

Clawederous believes in:
- **Shorthand power** — Short syntax → structured actions
- **Beautiful defaults** — AgentMail as the default provider
- **Personal automation** — Build workflows that fit your life

---

Built with 🦞 by Tawkie
