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
