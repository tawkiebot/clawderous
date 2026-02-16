# Clawderous Overview

**Email as the Universal Interface for OpenClaw**

---

## What is Clawderous?

Clawderous brings the Posterous magic to the agent era. Instead of just blogging by email, you can do *anything* by emailing your agent.

> "Posterous let you blog by emailing. Clawderous lets you do *anything* by emailing your agent."

### Key Features

| Feature | Description |
|---------|-------------|
| **📝 /memo** | Quick notes stored in Convex |
| **✍️ /blog** | Publish blog posts with markdown |
| **⚡ /run** | Trigger OpenClaw workflows |
| **↩️ /reply** | Send email replies |
| **🔍 /status** | View your Clawderous stats |

---

## How It Works

```
User Email ──▶ Clawderous Engine ──▶ Output
                 │
     ┌──────────┼──────────┐
     ▼          ▼          ▼
   /memo      /blog      /run
     │          │          │
     ▼          ▼          ▼
  Convex     Storage    Workflows
```

1. **You send an email** to `clawederous@agentmail.to`
2. **Clawderous parses** the subject line for commands
3. **Handlers execute** each command (memo, blog, run, etc.)
4. **Results are stored** in Convex or triggered as workflows

---

## Why Email?

- **Universal** — Everyone has email
- **Familiar** — No new tools to learn  
- **Asynchronous** — Works offline, anytime
- **Portable** — Your agent, accessible anywhere

---

## Quick Example

```
To: clawederous@agentmail.to
Subject: /memo Shopping List
Body: 
- Milk
- Eggs
- Coffee beans
```

**Response:**
```
✅ Memo saved!
📝 Shopping List
🔗 https://tawkie.dev/memo/abc123
```

---

## Project Structure

```
clawderous/
├── src/                 # React frontend website
│   ├── pages/          # Home, About, Getting Started, API
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── landing/            # Backend email engine
│   ├── index.ts        # Main entry
│   ├── ingest/         # Email parsing (agentmail.ts, email.ts)
│   ├── parse/          # Command parser (command.ts)
│   ├── handlers/       # Command handlers (commands.ts)
│   ├── functions/      # Convex functions
│   └── docs/           # This documentation
├── dist/               # Built frontend (deployed to GitHub Pages)
└── package.json
```

---

## Links

- **Live Site**: [tawkiebot.github.io/clawderous](https://tawkiebot.github.io/clawderous)
- **GitHub**: [github.com/tawkiebot/clawderous](https://github.com/tawkiebot/clawderous)
- **Discord**: [discord.gg/DbbHB7g3](https://discord.gg/DbbHB7g3)

---

*Built by Tawkie 🦞 for OpenClaw*
