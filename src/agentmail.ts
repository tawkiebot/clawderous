/**
 * AgentMail SDK Client Wrapper
 * Docs: https://docs.agentmail.to
 */

import { AgentMailClient } from 'agentmail';

const AGENTMAIL_API_KEY = process.env.AGENTMAIL_API_KEY || '';
const AGENTMAIL_INBOX = process.env.AGENTMAIL_INBOX || 'you@agentmail.to';

export interface Message {
  messageId: string;
  from: string;
  to: string[];
  subject: string;
  text: string;
  preview?: string;
  timestamp: string;
  read: boolean;
}

export interface Inbox {
  inboxId: string;
  displayName?: string;
  createdAt: string;
}

export class AgentMailClient {
  private client: AgentMailClient;
  private defaultInbox: string;

  constructor(config: { apiKey?: string; inbox?: string } = {}) {
    const apiKey = config.apiKey || AGENTMAIL_API_KEY;
    this.client = new AgentMailClient({ apiKey });
    this.defaultInbox = config.inbox || AGENTMAIL_INBOX;
  }

  /**
   * List all inboxes
   */
  async listInboxes(): Promise<Inbox[]> {
    const response = await this.client.inboxes.list();
    return response.inboxes.map(ib => ({
      inboxId: ib.inboxId,
      displayName: ib.displayName,
      createdAt: ib.createdAt,
    }));
  }

  /**
   * List messages in an inbox
   */
  async listMessages(inboxId?: string): Promise<Message[]> {
    const id = inboxId || this.defaultInbox;
    const response = await this.client.inboxes.messages.list(id);
    return response.messages.map(msg => ({
      messageId: msg.messageId,
      from: msg.from,
      to: msg.to,
      subject: msg.subject,
      text: msg.text,
      preview: msg.preview,
      timestamp: msg.timestamp,
      read: msg.read,
    }));
  }

  /**
   * Send an email
   */
  async sendEmail(params: {
    to: string;
    subject: string;
    text: string;
    html?: string;
    inboxId?: string;
  }): Promise<Message> {
    const inboxId = params.inboxId || this.defaultInbox;
    const response = await this.client.inboxes.messages.send(inboxId, {
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return {
      messageId: response.messageId,
      from: response.from,
      to: response.to,
      subject: response.subject,
      text: response.text,
      timestamp: response.timestamp,
      read: false,
    };
  }

  /**
   * Reply to a message
   */
  async reply(messageId: string, params: {
    text: string;
    html?: string;
    inboxId?: string;
  }): Promise<Message> {
    const inboxId = params.inboxId || this.defaultInbox;
    const response = await this.client.inboxes.messages.reply(inboxId, messageId, {
      text: params.text,
      html: params.html,
    });
    return {
      messageId: response.messageId,
      from: response.from,
      to: response.to,
      subject: response.subject,
      text: response.text,
      timestamp: response.timestamp,
      read: false,
    };
  }
}

// Export singleton instance
export const agentmail = new AgentMailClient();

// Convenience functions
export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<Message> {
  return agentmail.sendEmail({ to, subject, text });
}

export async function getMessages(inboxId?: string): Promise<Message[]> {
  return agentmail.listMessages(inboxId);
}

export async function replyTo(
  messageId: string,
  text: string
): Promise<Message> {
  return agentmail.reply(messageId, { text });
}
