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
