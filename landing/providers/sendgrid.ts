/**
 * SendGrid Email Provider
 * 
 * SendGrid (Twilio) provides both inbound and outbound email via API.
 * 
 * ## Setup
 * 
 * 1. Create account at https://sendgrid.com
 * 2. Get API key from https://app.sendgrid.com/settings/api_keys
 * 3. Configure inbound parse webhook in Settings → Inbound Parse
 * 4. Set webhook URL to your Clawderous endpoint
 * 
 * ## Environment Variables
 * 
 * ```
 * SENDGRID_API_KEY=SG.xxxxxxxxxxxxxx
 * ```
 * 
 * ## Inbound Webhook
 * 
 * SendGrid sends inbound emails as multipart/form-data POST.
 * The body contains envelope, headers, and text/HTML parts.
 */

import { EmailProvider, InboundEmail, SendEmailParams } from './interface';

// SendGrid Inbound Parse webhook types
interface SendGridInboundPayload {
  envelope: string;  // JSON string
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: number;  // Count of attachments
}

interface SendGridEnvelope {
  from: string;
  to: string[];
}

interface SendGridSendResponse {
  id: string;
}

export class SendGridProvider implements EmailProvider {
  readonly name = 'sendgrid';
  
  private apiKey: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.SENDGRID_API_KEY || '';
  }
  
  /**
   * Send email via SendGrid API
   */
  async sendEmail(params: SendEmailParams): Promise<string> {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: params.to }],
          cc: params.cc?.map(e => ({ email: e })),
          bcc: params.bcc?.map(e => ({ email: e })),
        }],
        from: { email: params.replyTo || 'noreply@yourdomain.com' },
        subject: params.subject,
        content: [
          { type: 'text/plain', value: params.text },
          ...(params.html ? [{ type: 'text/html', value: params.html }] : []),
        ],
        headers: params.headers,
        reply_to: params.replyTo ? { email: params.replyTo } : undefined,
      }),
    });
    
    if (response.status >= 400) {
      const error = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${error}`);
    }
    
    // SendGrid returns 202 on success with X-Message-Id header
    return response.headers.get('x-message-id') || `sg-${Date.now()}`;
  }
  
  /**
   * Parse inbound webhook from SendGrid
   * SendGrid sends multipart/form-data
   */
  async handleInboundWebhook(body: SendGridInboundPayload): Promise<InboundEmail> {
    let envelope: SendGridEnvelope = { from: '', to: [] };
    
    try {
      envelope = JSON.parse(body.envelope);
    } catch {
      // Ignore parse errors
    }
    
    return {
      id: `sg-${Date.now()}`,
      from: body.from || envelope.from,
      to: body.to || envelope.to[0] || '',
      subject: body.subject,
      text: body.text,
      html: body.html,
      headers: {},
      receivedAt: new Date(),
      envelope,
    };
  }
  
  /**
   * Verify SendGrid webhook signature
   * 
   * SendGrid uses X-Twilio-Email-Event-Webhook-Signature header
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // TODO: Implement proper signature verification
    // SendGrid uses Ed25519 for webhook signatures
    
    if (!signature) return false;
    return true; // Placeholder
  }
  
  /**
   * Validate configuration
   */
  async validateConfig(): Promise<boolean> {
    if (!this.apiKey) {
      throw new Error('SENDGRID_API_KEY not configured');
    }
    
    return this.apiKey.startsWith('SG.');
  }
}
