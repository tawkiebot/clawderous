# Email Provider Integration - ClawHub Skill

This document explains how Clawderous integrates with email providers, specifically focusing on AgentMail integration.

## Overview

ClawHub allows Clawderous to receive and process emails through AgentMail. Emails sent to `clawderous@agentmail.to` are parsed and processed through the Clawderous engine, enabling command-based interactions via email.

## AgentMail Integration

### How It Works

AgentMail provides a webhook-based system that forwards incoming emails to Clawderous. When an email is received at your AgentMail address, AgentMail:

1. Receives and parses the email
2. Extracts command and content from the email body
3. Sends a webhook POST request to Clawderous
4. Clawderous processes the command and responds

### Webhook/Event System

The webhook payload from AgentMail includes:

```json
{
  "to": "clawderous@agentmail.to",
  "from": "user@example.com",
  "subject": "/memo Check this idea",
  "body": "Consider using Convex for real-time data sync",
  "timestamp": "2026-02-15T17:27:00Z",
  "messageId": "<abc123@agentmail.to>"
}
```

### Email Parsing

Clawderous parses incoming emails by extracting the command from the subject line or beginning of the body:

**Example 1: Simple command**
```
Subject: /memo Project ideas for Q2

Need to research competitor features and plan roadmap
```

**Example 2: Command with inline content**
```
Subject: /blog New post idea

Topic: Why automation matters
Content: Here's my draft about...
```

**Example 3: Multi-line content**
```
Subject: /run daily-sync

Start the daily synchronization workflow at 9 AM
Include all team members
Send summary to #general
```

## Supported Commands

### `/memo` - Quick Notes

Store quick notes in Convex for later retrieval.

**Usage:**
```
Subject: /memo [optional title]

Your note content here...
```

**Example:**
```
Subject: /memo Book recommendations

- "The Pragmatic Programmer"
- "Clean Code"
- "Working Effectively with Legacy Code"
```

### `/blog` - Blog Posts (Stub)

Create draft blog posts for later editing and publishing.

**Usage:**
```
Subject: /blog [post title]

Your blog post content here...
```

**Example:**
```
Subject: /blog Getting Started with Clawderous

Clawderous is an agent framework that... (more content)
```

### `/run` - Trigger Workflows (Stub)

Trigger predefined workflows from email.

**Usage:**
```
Subject: /run [workflow-name] [optional parameters]

Additional instructions if needed
```

**Example:**
```
Subject: /run daily-summary

Generate summary for yesterday's metrics
Include charts
```

### `/reply` - Email Replies (Stub)

Send replies to existing conversations or threads.

**Usage:**
```
Subject: /reply [thread-reference]

Your reply content
```

### `/status` - View Stats (Stub)

Check Clawderous status and statistics.

**Usage:**
```
Subject: /status
```

Returns system status, uptime, recent activity, etc.

### `/help` - Get Help

Get help on available commands and usage.

**Usage:**
```
Subject: /help
```

Or request help for a specific command:

```
Subject: /help memo
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Email Flow                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Email Client ──► AgentMail Server ──► Webhook ──► Clawderous  │
│                         │                      │                 │
│                         ▼                      ▼                 │
│                   Email Storage         Clawderous Engine       │
│                                              │                   │
│                                              ▼                   │
│                                       ┌──────────────┐           │
│                                       │   Command    │           │
│                                       │   Parser     │           │
│                                       └──────┬───────┘           │
│                                              │                   │
│                    ┌─────────────────────────┼──────────────┐    │
│                    ▼                         ▼              ▼    │
│              ┌──────────┐            ┌───────────┐   ┌────────┐ │
│              │  Convex  │            │ Workflows │   │ Other │ │
│              │ Database │            │  Engine   │   │   ▲   │ │
│              └──────────┘            └───────────┘   └───┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow Description

1. **Email Client** → User sends email to `clawderous@agentmail.to`
2. **AgentMail Server** → Receives and processes the email
3. **Webhook** → AgentMail sends HTTP POST to Clawderous webhook endpoint
4. **Clawderous Engine** → Parses command, validates, routes to handler
5. **Handlers** → Execute specific command logic:
   - `/memo` → Store in Convex
   - `/blog` → Create blog draft
   - `/run` → Trigger workflow
   - etc.

## Setup Instructions

### Getting an AgentMail Address

1. **Sign up for AgentMail**:
   - Visit [AgentMail.to](https://agentmail.to)
   - Create an account
   - Generate a new email address

2. **Configure your address**:
   - Choose your subdomain (e.g., `clawderous`)
   - Your email will be: `clawderous@agentmail.to`
   - Note the API key for webhook configuration

### Configuring the Skill

1. **Set up environment variables**:
   ```bash
   export AGENTMAIL_API_KEY="your-api-key"
   export AGENTMAIL_WEBHOOK_SECRET="your-webhook-secret"
   ```

2. **Configure webhook URL**:
   - In AgentMail dashboard, set your webhook URL to:
   ```
   https://your-domain.com/webhooks/agentmail
   ```

3. **Add to ClawHub configuration** (`config/clawhub.json`):
   ```json
   {
     "skills": {
       "clawhub": {
         "enabled": true,
         "agentmail": {
           "address": "clawderous@agentmail.to",
           "webhook_path": "/webhooks/agentmail"
         }
       }
     }
   }
   ```

4. **Restart Clawderous**:
   ```bash
   openclaw restart
   ```

### Testing the Integration

Send a test email:

```
To: clawderous@agentmail.to
Subject: /memo Test note from email

This is a test note to verify email integration works!
```

Check your logs to verify the command was processed:

```bash
openclaw logs --tail | grep -i agentmail
```

## Security Considerations

- **Webhook validation**: Always verify the webhook signature from AgentMail
- **Rate limiting**: Implement rate limits to prevent abuse
- **Input sanitization**: Sanitize email content before processing
- **API key protection**: Never commit API keys to version control

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not received | Check webhook URL is accessible from AgentMail |
| Commands not recognized | Ensure command is first word in subject line |
| Parsing errors | Check email format matches expected structure |
| No response | Verify Convex connection and permissions |

## Next Steps

- [ ] Implement `/blog` command fully
- [ ] Add `/run` workflow triggers
- [ ] Implement `/reply` for email threading
- [ ] Add `/status` dashboard
- [ ] Add email filtering and spam detection
