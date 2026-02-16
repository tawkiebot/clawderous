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
