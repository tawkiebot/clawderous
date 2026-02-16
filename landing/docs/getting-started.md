# Getting Started with Clawderous

---

## Prerequisites

- OpenClaw installed and running
- AgentMail account (or any IMAP provider)
- Convex account (for memo storage)

---

## Step 1: Get an AgentMail Inbox

AgentMail provides email inboxes for AI agents.

1. Go to [console.agentmail.to](https://console.agentmail.to)
2. Sign up for an account
3. Get your API key from the dashboard
4. Create an inbox (e.g., `claw`)

Your email address will be: **`clawederous@agentmail.to`**

---

## Step 2: Install Clawderous

```bash
# Clone the repo
git clone https://github.com/tawkiebot/clawderous.git
cd clawderous

# Install dependencies
npm install
```

---

## Step 3: Configure

Set your AgentMail API key:

```bash
export AGENTMAIL_API_KEY=your_api_key_here
```

Or create a `.env` file:

```bash
echo "AGENTMAIL_API_KEY=your_api_key_here" > .env
```

---

## Step 4: Start Clawderous

```bash
# Start the email polling engine
npm run dev
```

Clawderous will:
1. Connect to AgentMail
2. Start polling for new emails
3. Parse commands from subject lines
4. Execute handlers and respond

---

## Step 5: Send Your First Command

### Quick Memo

```
To: clawederous@agentmail.to
Subject: /memo Hello World
Body: This is my first Clawderous memo!
```

### Blog Post

```
To: clawederous@agentmail.to
Subject: /blog Why Email Rocks
Body: Email has been around for decades...
```

### Check Status

```
To: clawederous@agentmail.to
Subject: /status
```

---

## Troubleshooting

### "Unknown command" error

Make sure your subject line starts with `/`:
- ✅ `/memo My Note`
- ❌ `memo My Note`

### No response from Clawderous

1. Check your AgentMail inbox is set up correctly
2. Verify `AGENTMAIL_API_KEY` is exported
3. Check logs: `npm run dev`

### Convex not storing memos

Run `npx convex dev` to start the local Convex dev server.

---

## Next Steps

- [Commands Reference](commands) — Learn all available commands
- [Architecture](architecture) — Understand the system design
- [API](api) — Developer documentation
