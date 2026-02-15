import { AgentMailClient } from "agentmail";

// Email interface
export interface ClawderousEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  html?: string;
  receivedAt: Date;
}

// AgentMail client wrapper for Clawderous
export class AgentMailClientWrapper {
  private client: AgentMailClient | null = null;
  private configured: boolean = false;
  private username: string = "";
  private domain: string = "agentmail.to";

  /**
   * Initialize AgentMail client with API key
   */
  async configure(apiKey: string): Promise<void> {
    this.client = new AgentMailClient({
      apiKey,
    });

    // Verify connection
    try {
      await this.client.inboxes.list({});
      this.configured = true;
      console.log("✅ AgentMail configured successfully");
    } catch (error) {
      console.error("❌ AgentMail configuration failed:", error);
      throw error;
    }
  }

  /**
   * Check if configured
   */
  isConfigured(): boolean {
    return this.configured && this.client !== null;
  }

  /**
   * Get or create inbox
   */
  async getInbox(username: string): Promise<string> {
    if (!this.client) {
      throw new Error("AgentMail not configured");
    }

    this.username = username;
    const email = `${username}@${this.domain}`;

    try {
      // Try to create the inbox
      await this.client.inboxes.create({
        username,
        domain: this.domain,
      });
      console.log(`✅ Created inbox: ${email}`);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("AlreadyExists")) {
        console.log(`📧 Inbox already exists: ${email}`);
      } else {
        throw error;
      }
    }

    return email;
  }

  /**
   * Get inbox ID for messages
   */
  private async getInboxId(): Promise<string> {
    if (!this.client) {
      throw new Error("AgentMail not configured");
    }
    
    const inbox = await this.client.inboxes.get(`${this.username}@${this.domain}`);
    return inbox.inboxId;
  }

  /**
   * Poll for new emails
   */
  async pollEmails(emailAddress: string, _since?: string): Promise<ClawderousEmail[]> {
    if (!this.client) {
      throw new Error("AgentMail not configured");
    }

    const inboxId = await this.getInboxId();

    // List messages for this inbox
    const response = await this.client.inboxes.messages.list(inboxId, {});

    const emails: ClawderousEmail[] = response.messages.map((msg) => ({
      id: msg.messageId,
      from: msg.from,
      to: emailAddress,
      subject: msg.subject || "(No subject)",
      body: msg.preview || "",
      receivedAt: new Date(msg.timestamp),
    }));

    return emails;
  }

  /**
   * Send a reply
   */
  async sendReply(fromEmail: string, to: string, subject: string, body: string): Promise<string> {
    if (!this.client) {
      throw new Error("AgentMail not configured");
    }

    const inboxId = await this.getInboxId();

    const response = await this.client.inboxes.messages.send(inboxId, {
      to,
      subject: `Re: ${subject}`,
      text: body,
    });

    return response.messageId;
  }
}

// Singleton instance
export const agentMailClient = new AgentMailClientWrapper();
