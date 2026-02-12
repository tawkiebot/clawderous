# Getting Started with Clawederous

## Prerequisites

- Node.js 18+
- An email inbox (AgentMail recommended)
- An OpenClaw agent or Claude API key
- Git

## Installation

```bash
# Clone the repository
git clone https://github.com/tawkie/clawederous
cd clawederous

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

## Configuration

Edit `.env` with your credentials:

```env
# Email (IMAP)
IMAP_HOST=imap.agentmail.to
IMAP_PORT=993
IMAP_USER=your-email@agentmail.to
IMAP_PASS=your-app-password

# Agent
OPENCLAW_URL=http://localhost:3000
AGENT_KEY=your-agent-key

# Optional: Twitter
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-secret
TWITTER_ACCESS_TOKEN=your-access-token
TWITTER_ACCESS_SECRET=your-access-secret

# Optional: Output directory
DATA_DIR=./data
```

## First Run

```bash
npm run dev
```

You should see:
```
✓ Connected to IMAP
✓ Agent initialized
👂 Listening for commands...
```

## Your First Command

Send an email to your configured inbox:

```
To: your-email@agentmail.to
Subject: /ping

Hello Clawederous!
```

You should receive a reply:
```
✓ Received: /ping
👋 Hello! Clawederous is listening.
```

## Verify Setup

1. Check your inbox for the confirmation email
2. Try `/help` to see available commands
3. Try `/status` to see agent health

## Troubleshooting

**IMAP connection failed**
- Check your `.env` credentials
- Ensure IMAP is enabled in your email provider
- Try a different port (993 for SSL, 143 for TLS)

**No commands being processed**
- Check the terminal for errors
- Verify your inbox is reachable via webmail
- Ensure the agent has network access

**Getting help**
- Run `npm run help`
- Join our Discord: https://discord.gg/clawederous
- Open an issue on GitHub
