/**
 * Resend Email Provider
 * 
 * Resend provides both inbound and outbound email via API.
 * 
 * ## Setup
 * 
 * 1. Create account at https://resend.com
 * 2. Get API key from https://resend.com/api-keys
 * 3. Configure inbound routing in Resend dashboard
 * 4. Set webhook URL to your Clawderous endpoint
 * 
 * ## Environment Variables
 * 
 * ```
 * RESEND_API_KEY=re_xxxxxxxxxxxx
 * ```
 * 
 * ## Inbound Webhook
 * 
 * Resend sends inbound emails as webhook POST to your URL.
 * The webhook body contains the email data.
 */

import { EmailProvider, InboundEmail, SendEmailParams } from './interface';

// Resend API types
interface ResendWebhookBody {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  headers?: Record<string, string>;
  attachments?: any[];
}

interface ResendSendResponse {
  id: string;
}

export class ResendProvider implements EmailProvider {
  readonly name = 'resend';
  
  private apiKey: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.RESEND_API_KEY || '';
  }
  
  /**
   * Send email via Resend API
   */
  async sendEmail(params: SendEmailParams): Promise<string> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: params.replyTo || 'Clawderous <onboarding@resend.dev>',
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
        reply_to: params.replyTo,
        cc: params.cc,
        bcc: params.bcc,
        headers: params.headers,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${response.status} - ${error}`);
    }
    
    const data: ResendSendResponse = await response.json();
    return data.id;
  }
  
  /**
   * Parse inbound webhook from Resend
   */
  async handleInboundWebhook(body: ResendWebhookBody): Promise<InboundEmail> {
    // Resend inbound webhook format
    return {
      id: body.headers?.['message-id'] || `resend-${Date.now()}`,
      from: body.from,
      to: body.to,
      subject: body.subject,
      text: body.text,
      html: body.html,
      headers: body.headers || {},
      receivedAt: new Date(),
    };
  }
  
  /**
   * Verify Resend webhook signature
   * 
   * Resend uses resend-signature header with timestamp:signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // TODO: Implement proper HMAC verification
    // For now, just check signature exists
    if (!signature) return false;
    
    // Full implementation would:
    // 1. Extract timestamp and signature from header
    // 2. Create signedPayload = timestamp + "." + payload
    // 3. Verify HMAC-SHA256 against webhook secret
    
    return true; // Placeholder
  }
  
  /**
   * Validate configuration
   */
  async validateConfig(): Promise<boolean> {
    if (!this.apiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }
    
    // Test API key with a simple request
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'test@test.com',
          to: 'test@test.com',
          subject: 'Test',
          text: 'Test',
        }),
      });
      
      // 422 means valid key but bad request (expected)
      // 401 means invalid key
      return response.status !== 401;
    } catch {
      return false;
    }
  }
}
