# clawderous

> Email-to-anything for OpenClaw. Claude on Claw, via Email.

## Critical Context

**IMPORTANT:** Read these rules before making any changes:

- Backend code is in landing/ folder, frontend in src/
- Deployed to GitHub Pages at tawkiebot.github.io/clawderous/
- Use npm run build:frontend to build the React app
- Deploy by pushing to gh-pages branch with built files
- Email commands: /memo, /blog, /run, /reply, /status, /help

## Project Structure

| Component | Path | Purpose |
|-----------|------|---------|
| Backend | `landing/index.ts` | |
| Frontend | `src/App.tsx` | |
| Commands | `landing/handlers/commands.ts` | |
| Parser | `landing/parse/command.ts` | |

## Quick Navigation

- Working with **email**? → Check landing/ingest/ for email handling
- Working with **commands**? → See landing/handlers/commands.ts for /memo, /blog, etc.
- Working with **deploy**? → Push to gh-pages branch, see .github/workflows/

## Overview

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

## Commands

# Commands Reference

All Clawderous commands are triggered via email subject line.

---

## Command Overview

| Command | Description | Required Fields |
|---------|-------------|-----------------|
| `/memo` | Save a quick note | content |
| `/blog` | Publish a blog post | title, content |
| `/run` | Execute a workflow | workflow name |
| `/reply` | Send an email reply | to, content |
| `/status` | View your stats | (none) |
| `/help` | Get help text | (none) |

---

## /memo

Save a quick note to your knowledge base.

### Syntax

```
To: clawederous@agentmail.to
Subject: /memo [optional title]
Body: Your note content here...
```

### Examples

**With title:**
```
Subject: /memo Shopping List
Body:
- Milk
- Eggs
- Bread
```

**Without title (first line becomes title):**
```
Subject: /memo
Body: Remember to call mom
```

### Response

```
✅ Memo saved!
📝 Shopping List
🔗 https://tawkie.dev/memo/abc123
```

---

## /blog

Publish a blog post with markdown formatting.

### Syntax

```
To: clawederous@agentmail.to
Subject: /blog Post Title
Body: Your blog content here...
```

### Example

```
Subject: /blog Why Email Still Matters
Body: 
Email is the original API. It's been around since 1971...

## Why Email?

1. Universal
2. Asynchronous  
3. Familiar

*Posted via Clawderous*
```

### Response

```
✅ Blog published!
✍️ "Why Email Still Matters"
🔗 https://tawkie.dev/blog/abc123
```

---

## /run

Execute an OpenClaw workflow.

### Syntax

```
To: clawederous@agentmail.to
Subject: /run workflow-name
Body: Optional parameters
```

### Example

```
Subject: /run daily-backup
Body: --files --compress
```

### Response

```
⚡ Executed "daily-backup"
✅ Done!
```

---

## /reply

Send an email reply to a specific recipient.

### Syntax

```
To: clawederous@agentmail.to
Subject: /reply recipient@example.com
Body: Your reply message...
```

### Example

```
Subject: /reply john@example.com
Body: Thanks for the update! I'll review the PR later.
```

### Response

```
↩️ Reply sent to john@example.com
```

---

## /status

View your Clawderous usage statistics.

### Syntax

```
To: clawederous@agentmail.to
Subject: /status
```

### Response

```
🔍 Your Clawderous Stats:
- Today: 3 memos
- This week: 12 memos
- Total: 47 memos
```

---

## /help

Get help with Clawderous commands.

### Syntax

```
To: clawederous@agentmail.to
Subject: /help
```

### Response

```
📧 Clawderous Commands:

/memo [title] - Quick note or memo
/blog <title> - Publish a blog post
/run <workflow> - Execute a workflow
/reply <to> - Send an email reply
/status - View your Clawderous stats
/help - Show this message

Just email clawederous@agentmail.to to get started!
```

---

## Tips

### Command Parsing

- Commands are **case-insensitive**: `/MEMO` = `/memo`
- First line of body becomes title if not provided
- Use markdown in blog posts for formatting

### Quick Commands

You can also use shorthand:
- Just send an email with no command → treated as `/memo`
- Subject is optional for memos

## Architecture

# Architecture

---

## System Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Email     │───▶│  Clawderous  │───▶│   Output    │
│  (AgentMail │    │   Engine     │    │  Handlers   │
│   or IMAP)  │    │              │    │             │
└─────────────┘    └─────────────┘    │ • Convex    │
                                       │ • Blog      │
                                       │ • Workflow  │
                                       └─────────────┘
```

### Data Flow

1. **Ingest** — Email arrives at AgentMail inbox
2. **Parse** — Extract command from subject line
3. **Validate** — Zod schemas validate command structure
4. **Execute** — Handler processes the command
5. **Store** — Results saved to Convex or triggered as actions
6. **Respond** — Optional email reply sent

---

## Code Structure

```
clawderous/
├── landing/                    # Backend email engine
│   ├── index.ts               # Main entry point
│   ├── types.ts               # TypeScript interfaces
│   ├── ingest/                # Email ingestion
│   │   ├── agentmail.ts       # AgentMail polling
│   │   └── email.ts           # Email parsing
│   ├── parse/                 # Command parsing
│   │   └── command.ts         # Command parser + Zod schemas
│   ├── handlers/              # Command handlers
│   │   └── commands.ts        # Handler implementations
│   └── functions/              # Convex functions
│       └── memos.ts           # Memo CRUD operations
│
├── src/                       # Frontend website
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── About.tsx         # About page
│   │   ├── GettingStarted.tsx # Setup guide
│   │   ├── API.tsx           # API reference
│   │   └── Posterous.tsx     # Posterous homage
│   ├── App.tsx               # Router + layout
│   └── main.tsx              # React entry
│
└── dist/                      # Built frontend (GitHub Pages)
```

---

## Key Components

### 1. Email Ingest (`landing/ingest/`)

**agentmail.ts** — Polls AgentMail API for new emails:
```typescript
async function pollInbox(): Promise<Email[]> {
  const emails = await agentmail.getMessages();
  return emails;
}
```

### 2. Command Parser (`landing/parse/command.ts`)

Parses email subject/body into typed commands using Zod:

```typescript
const MemoSchema = z.object({
  command: z.literal("/memo"),
  title: z.optional(z.string()),
  content: z.string(),
});
```

### 3. Command Handlers (`landing/handlers/commands.ts`)

Each command has a handler implementing `CommandHandler`:

| Handler | Purpose |
|---------|---------|
| `MemoHandler` | Store notes in Convex |
| `BlogHandler` | Format and store blog posts |
| `RunHandler` | Trigger OpenClaw workflows |
| `ReplyHandler` | Send email responses |
| `StatusHandler` | Query user statistics |
| `HelpHandler` | Return help text |

### 4. Convex Functions (`landing/functions/`)

Backend storage for memos:
- `memos:create` — Create a new memo
- `memos:byUser` — Query user's memos
- `memos:delete` — Delete a memo

---

## Type Definitions

### ActionCtx

Context passed to handlers with database access:

```typescript
interface ActionCtx {
  userId: string;
  email: string;
  runMutation: <Args, Result>(name: string, args: Args) => Promise<Result>;
  runQuery: <Args, Result>(name: string, args: Args) => Promise<Result>;
  runAction: <Args, Result>(name: string, args: Args) => Promise<Result>;
}
```

### Command

Union type of all valid commands:

```typescript
type Command = 
  | { command: "/memo"; title?: string; content: string }
  | { command: "/blog"; title: string; content: string }
  | { command: "/run"; workflow: string; args?: string[] }
  | { command: "/reply"; to: string; content: string }
  | { command: "/status" }
  | { command: "/help" };
```

---

## BYO Infrastructure

Clawderous is designed to be modular:

| Component | Default | Alternatives |
|-----------|---------|---------------|
| Email | AgentMail | Gmail IMAP, Proton Mail |
| Storage | Convex | R2, GitHub Gists |
| Intelligence | Claude (OpenClaw) | Any LLM |
| Workflows | OpenClaw | n8n, Zapier |

---

## Frontend (src/)

React + Vite SPA with client-side routing:

- **Home** — Hero + quick start
- **About** — Project backstory  
- **Getting Started** — Setup walkthrough
- **API** — Developer docs
- **Posterous** — Inspiration page

Built with `base: './'` for GitHub Pages compatibility.

## Api

# API Reference

---

## Clawderous Module

### configure(apiKey: string)

Configure Clawderous with your AgentMail API key.

```typescript
import { clawderous } from "clawderous";

await clawderous.configure("your_api_key");
```

### getInbox()

Get or create your Clawderous email inbox.

```typescript
const inbox = await clawderous.getInbox();
// Returns: { email: "clawederous@agentmail.to", ... }
```

### start()

Start polling for emails.

```typescript
await clawderous.start();
// Now listening for emails...
```

### stop()

Stop polling.

```typescript
await clawderous.stop();
```

---

## Command Parser

### parseEmailToCommand(subject: string, body: string)

Parse an email into a typed command.

```typescript
import { parseEmailToCommand } from "./parse/command";

const result = parseEmailToCommand("/memo My Note", "Content here");

if (result.command) {
  console.log(result.command.command); // "/memo"
  console.log(result.command.title);  // "My Note"
  console.log(result.command.content); // "Content here"
} else {
  console.error(result.error);
}
```

### Command Schemas

Each command has a Zod schema for validation:

```typescript
import { MemoSchema, BlogSchema, RunSchema, ReplySchema, StatusSchema, HelpSchema } from "./parse/command";

// Memo
{ command: "/memo", title?: string, content: string }

// Blog  
{ command: "/blog", title: string, content: string }

// Run
{ command: "/run", workflow: string, args?: string[] }

// Reply
{ command: "/reply", to: string, content: string }

// Status
{ command: "/status" }

// Help
{ command: "/help" }
```

---

## Handlers

### getHandler(command: Command)

Get the appropriate handler for a command.

```typescript
import { getHandler } from "./handlers/commands";

const handler = getHandler(parsedCommand);
const result = await handler.execute(command, context);
```

### Handler Interface

```typescript
interface CommandHandler {
  execute(command: Command, ctx: ActionCtx): Promise<{
    success: boolean;
    message: string;
    url?: string;
  }>;
}
```

---

## Action Context

### ActionCtx

Passed to handlers, provides database and action access:

```typescript
interface ActionCtx {
  userId: string;
  email: string;
  
  // Run a Convex mutation
  runMutation: <Args, Result>(name: string, args: Args) => Promise<Result>;
  
  // Run a Convex query
  runQuery: <Args, Result>(name: string, args: Args) => Promise<Result>;
  
  // Run an OpenClaw action
  runAction: <Args, Result>(name: string, args: Args) => Promise<Result>;
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AGENTMAIL_API_KEY` | Yes | Your AgentMail API key |
| `CONVEX_DEPLOY_KEY` | For deploy | Convex deployment key |
| `OPENCLAW_URL` | Optional | OpenClaw gateway URL |

---

## Events

### Email Events

```typescript
clawderous.on("email", (email) => {
  console.log("New email:", email.subject);
});

clawderous.on("command", (command) => {
  console.log("Executing:", command.command);
});

clawderous.on("error", (err) => {
  console.error("Error:", err);
});
```

---

## Error Handling

```typescript
try {
  await clawderous.start();
} catch (err) {
  if (err.code === "INVALID_API_KEY") {
    console.error("Check your AgentMail API key");
  } else if (err.code === "CONNECTION_FAILED") {
    console.error("Check your internet connection");
  }
}
```

---

## TypeScript

Full TypeScript support. Import types:

```typescript
import type { Command, ActionCtx, ClawderousConfig } from "./types";
```

## Workflows

# Workflows

The `/run` command triggers OpenClaw workflows from email.

---

## How It Works

```
Email with /run → Clawderous → OpenClaw → Workflow Execution
```

When you send `/run workflow-name`, Clawderous:
1. Parses the workflow name from the subject
2. Extracts optional arguments from the body
3. Triggers the workflow via OpenClaw
4. Returns the result

---

## Syntax

```
To: clawederous@agentmail.to
Subject: /run workflow-name
Body: Optional arguments (--arg1 value --arg2)
```

---

## Built-in Workflows

### /run backup

Trigger a backup workflow.

```
Subject: /run backup
Body: --files /data --compress
```

### /run notify

Send a notification.

```
Subject: /run notify
Body: --message "Don't forget the meeting!" --channel telegram
```

---

## Custom Workflows

Create your own workflows in OpenClaw:

```typescript
// In your OpenClaw config
workflows: {
  "daily-summary": async (args) => {
    const tasks = await getTasks();
    const summary = summarize(tasks);
    await sendEmail(summary);
    return "Daily summary sent!";
  }
}
```

Then trigger via email:
```
Subject: /run daily-summary
```

---

## Workflow Arguments

Pass arguments in the email body:

```
Subject: /run generate-report
Body: --format pdf --period week --email team@example.com
```

Arguments are parsed as `--key value` pairs.

---

## Workflow Results

Successful execution:
```
⚡ Executed "daily-summary"
✅ Done!
```

Error:
```
⚡ Executed "nonexistent-workflow"
❌ Error: Workflow not found
```

---

## Best Practices

1. **Use descriptive names**: `/run weekly-backup` > `/run wb`
2. **Document arguments**: Tell users what args are available
3. **Handle errors**: Return helpful error messages
4. **Keep it async**: Long-running workflows should queue and respond when done

---

## Example Workflows

### Reminder

```
Subject: /run reminder
Body: --time 14:00 --message Team standup in 30 min
```

### Data Sync

```
Subject: /run sync-data
Body: --source github --target convex
```

### Content Generation

```
Subject: /run generate-post
Body: --topic "The Future of AI Agents" --tone professional
```

---
Generated by [Dewey](https://github.com/arach/dewey) | Last updated: 2026-02-16