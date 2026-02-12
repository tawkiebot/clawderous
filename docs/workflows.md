# Clawederous Workflows

## Core Workflows

### 1. Email-to-Podcast Pipeline
Parse newsletters/emails, research embedded links for context, generate a conversational podcast script using AI, then use ElevenLabs TTS to create an audio episode.

**Command**: `/podcast [newsletter-name]`

### 2. Priority Inbox Summarizer
Scan emails for urgency keywords, group by topic/sender, and send a daily digest with action items.

**Command**: `/digest` (auto-runs daily) or `/summarize now`

### 3. Meeting Prep Auto-Pack
When a meeting invite arrives, extract agenda items, search for related docs/threads, and email a pre-meeting brief.

**Command**: `/prep [meeting-name]` or auto-trigger on calendar invites

### 4. Customer Support Triage
Route incoming support emails by sentiment and topic, auto-draft responses for common issues, escalate complex cases.

**Command**: `/triage` (for support inboxes)

### 5. Weekly Wins Recap
Pull accomplishment emails from the week and compile a brag-sheet for team reviews or personal journaling.

**Command**: `/wins` (weekly scheduler)

### 6. Shorthand Meeting Notes (NEW)
Shorthand notation in subject or first line, auto-parsed into structured notes sent to Claris or saved to knowledge base.

**Command**:
```
To: tawkie@agentmail.to
Subject: /note Meeting with Gary

Body: Action: follow up on pricing
      @claris send: meeting notes attached
```

## Experimental Ideas

### Posterous Mode
Full blog posting via email — send content, get a rendered post (Markdown → HTML → publish).

### Quick Tweet
Tweet from email without API tokens — reply to confirmation, agent handles the post.

### Email-to-Signal
Forward email → Signal message to designated contact.

### Context Reply
Reply to any email with `/reply [instructions]` — agent drafts a context-aware response.

## Configuration

Workflows can be enabled/disabled per inbox:

```json
{
  "workflows": {
    "podcast": true,
    "digest": true,
    "meeting_prep": true,
    "claris_forward": true
  }
}
```
