# Email Providers

Clawderous supports multiple email providers. Users can choose their preferred provider based on cost, features, or existing setup.

---

## Architecture

```
Clawderous Core
      │
      ├── Provider Interface (standard contract)
      │         │
      │         ├── ResendProvider ✓
      │         ├── SendGridProvider ✓
      │         ├── PostmarkProvider (todo)
      │         └── [Custom Provider]
      │
      └── Command Handlers (/memo, /blog, etc.)
```

Each provider must implement two operations:
- **Inbound:** Receive emails via webhook → parse into standard format
- **Outbound:** Send emails via provider's API

---

## Supported Providers

| Provider | Status | Inbound | Outbound | Notes |
|----------|--------|---------|----------|-------|
| **Resend** | ✅ Ready | Webhook | API | Best DX, modern API |
| **SendGrid** | ✅ Ready | Parse Webhook | API | Enterprise, Twilio |
| **Postmark** | 🔄 Todo | Inbound | API | Developer-focused |
| **Mailgun** | 🔄 Todo | Inbound | API | Now Sinch |

---

## Configuration

### Resend

```bash
# Environment
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

```typescript
import { ResendProvider } from './providers/resend';

const provider = new ResendProvider(process.env.RESEND_API_KEY);
```

### SendGrid

```bash
# Environment
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx
```

```typescript
import { SendGridProvider } from './providers/sendgrid';

const provider = new SendGridProvider(process.env.SENDGRID_API_KEY);
```

---

## Creating a Custom Provider

Extend `EmailProvider` interface in `landing/providers/`:

```typescript
import { EmailProvider, InboundEmail, SendEmailParams } from './interface';

export class MyProvider implements EmailProvider {
  readonly name = 'my-provider';
  
  async sendEmail(params: SendEmailParams): Promise<string> {
    // Send via your provider's API
    return 'message-id';
  }
  
  async handleInboundWebhook(body: any): Promise<InboundEmail> {
    // Parse webhook → standard InboundEmail format
    return {
      id: '...',
      from: '...',
      to: '...',
      subject: '...',
      text: '...',
      html: '...',
      headers: {},
      receivedAt: new Date(),
    };
  }
  
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // Verify webhook authenticity
    return true;
  }
}
```

---

## Interface Reference

### InboundEmail

```typescript
interface InboundEmail {
  id: string;           // Provider's message ID
  from: string;         // Sender email
  to: string;          // Recipient (Clawderous address)
  subject: string;     // Email subject
  text: string;        // Plain text body
  html?: string;       // HTML body
  headers: Record<string, string>;
  receivedAt: Date;
}
```

### SendEmailParams

```typescript
interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  headers?: Record<string, string>;
}
```

---

## Design Principles

1. **Standard Contract:** All providers output the same `InboundEmail` format
2. **Pluggable:** Add new providers without changing core logic
3. **Secure:** Verify webhook signatures before processing
4. **Fail Gracefully:** Provider errors don't crash the system

---

## Future Providers

- Postmark
- Mailgun
- AWS SES
- Custom IMAP/SMTP

*Contributions welcome!*
