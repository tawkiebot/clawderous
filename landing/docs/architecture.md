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
