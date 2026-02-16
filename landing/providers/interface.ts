/**
 * Email Provider Interface
 * 
 * Clawderous supports multiple email providers. Each provider must implement
 * this interface to handle both inbound (receiving) and outbound (sending) emails.
 * 
 * ## Architecture
 * 
 * ```
 * Clawderous Core
 *      │
 *      ├── Provider Interface (this file)
 *      │         │
 *      │         ├── ResendProvider
 *      │         ├── SendGridProvider
 *      │         ├── PostmarkProvider
 *      │         └── [Custom Provider]
 *      │
 *      └── Command Handlers (/memo, /blog, etc.)
 * ```
 * 
 * ## Creating a Custom Provider
 * 
 * 1. Create a new file in `landing/providers/`
 * 2. Implement the EmailProvider interface
 * 3. Register in `landing/index.ts`
 * 
 * ## Example: Custom Provider
 * 
 * ```typescript
 * import { EmailProvider, InboundEmail, SendEmailParams } from './interface';
 * 
 * export class MyProvider implements EmailProvider {
 *   readonly name = 'my-provider';
 *   
 *   async sendEmail(params: SendEmailParams): Promise<string> {
 *     // Your implementation
 *     return 'message-id';
 *   }
 *   
 *   async handleInboundWebhook(body: any): Promise<InboundEmail> {
 *     // Parse webhook body → InboundEmail
 *     return {
 *       id: 'msg-123',
 *       from: 'user@example.com',
 *       to: 'clawderous@example.com',
 *       subject: 'Hello',
 *       text: 'Body text',
 *       html: '<p>Body</p>',
 *       headers: {},
 *       receivedAt: new Date()
 *     };
 *   }
 *   
 *   verifyWebhookSignature(payload: string, signature: string): boolean {
 *     // Verify webhook signature
 *     return true;
 *   }
 * }
 * ```
 */

export interface InboundEmail {
  /** Unique message ID from provider */
  id: string;
  /** Sender email address */
  from: string;
  /** Recipient email address (Clawderous address) */
  to: string;
  /** Email subject */
  subject: string;
  /** Plain text body */
  text: string;
  /** HTML body */
  html?: string;
  /** Raw headers */
  headers: Record<string, string>;
  /** When email was received */
  receivedAt: Date;
  /** Optional: raw envelope info */
  envelope?: {
    mailFrom: string;
    rcptTo: string[];
  };
}

export interface SendEmailParams {
  /** Recipient email address */
  to: string;
  /** Email subject */
  subject: string;
  /** Plain text body */
  text: string;
  /** HTML body (optional) */
  html?: string;
  /** Reply-to address */
  replyTo?: string;
  /** CC recipients */
  cc?: string[];
  /** BCC recipients */
  bcc?: string[];
  /** Custom headers */
  headers?: Record<string, string>;
}

export interface EmailProvider {
  /** Provider name (e.g., 'resend', 'sendgrid') */
  readonly name: string;
  
  /**
   * Send an outbound email
   * @returns Message ID from provider
   */
  sendEmail(params: SendEmailParams): Promise<string>;
  
  /**
   * Handle inbound webhook from provider
   * @param body Raw webhook request body
   * @returns Parsed InboundEmail
   */
  handleInboundWebhook(body: any): Promise<InboundEmail>;
  
  /**
   * Verify webhook signature for security
   * @param payload Raw request body
   * @param signature Provider's signature header
   * @returns True if signature is valid
   */
  verifyWebhookSignature(payload: string, signature: string): boolean;
  
  /**
   * Optional: Validate provider configuration
   */
  validateConfig?(): Promise<boolean>;
}

/**
 * Provider registry for Clawderous
 */
export const providers: Record<string, EmailProvider> = {};

/**
 * Register a provider
 */
export function registerProvider(provider: EmailProvider): void {
  providers[provider.name] = provider;
}

/**
 * Get provider by name
 */
export function getProvider(name: string): EmailProvider | undefined {
  return providers[name];
}
