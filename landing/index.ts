import { parseEmailToCommand, formatCommand } from "./parse/command";
import { getHandler } from "./handlers/commands";
import { agentMailClient } from "./ingest/agentmail";
import { parseRawEmail, formatEmailLog } from "./ingest/email";

// Clawderous configuration
export interface ClawderousConfig {
  apiKey?: string;
  email?: string;
  pollingInterval?: number; // in seconds
}

// Default configuration
const DEFAULT_CONFIG: ClawderousConfig = {
  pollingInterval: 30, // Check for new emails every 30 seconds
};

/**
 * Clawderous - Email-to-Anything for OpenClaw
 */
export class Clawderous {
  private config: ClawderousConfig;
  private running: boolean = false;
  private pollInterval: NodeJS.Timeout | null = null;

  constructor(config: ClawderousConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Configure Clawderous with AgentMail API key
   */
  async configure(apiKey: string): Promise<void> {
    await agentMailClient.configure(apiKey);
    this.config.apiKey = apiKey;
  }

  /**
   * Get or create the Clawderous inbox
   */
  async getInbox(username: string = "clawederous"): Promise<string> {
    return await agentMailClient.getInbox(username);
  }

  /**
   * Start polling for emails and processing them
   */
  async start(email?: string): Promise<void> {
    if (!agentMailClient.isConfigured()) {
      throw new Error("Clawderous not configured. Call configure(apiKey) first.");
    }

    const inboxEmail = email || this.config.email || "clawederous@agentmail.to";
    this.running = true;

    console.log(`🚀 Clawderous started! Polling: ${inboxEmail}`);
    console.log(`   Checking for emails every ${this.config.pollingInterval}s...`);

    // Poll immediately, then on interval
    await this.pollOnce(inboxEmail);
    
    this.pollInterval = setInterval(async () => {
      if (this.running) {
        await this.pollOnce(inboxEmail);
      }
    }, (this.config.pollingInterval || 30) * 1000);
  }

  /**
   * Stop polling
   */
  stop(): void {
    this.running = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    console.log("⏹️ Clawderous stopped");
  }

  /**
   * Poll once for new emails
   */
  private async pollOnce(emailAddress: string): Promise<void> {
    try {
      const emails = await agentMailClient.pollEmails(emailAddress);
      
      if (emails.length > 0) {
        console.log(`📬 Found ${emails.length} new email(s)`);
        
        for (const email of emails) {
          await this.processEmail(email, emailAddress);
        }
      }
    } catch (error) {
      console.error("❌ Polling error:", error);
    }
  }

  /**
   * Process a single email
   */
  private async processEmail(email: {
    id: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    receivedAt: Date;
  }, emailAddress: string): Promise<void> {
    console.log(formatEmailLog({
      from: email.from,
      to: email.to,
      subject: email.subject,
      body: email.body,
      date: email.receivedAt,
    }));

    // Parse to command
    const { command, error } = parseEmailToCommand(email.subject, email.body);

    if (!command) {
      console.log(`❌ Command parse error: ${error}`);
      await this.sendErrorReply(email, error || "Unknown error");
      return;
    }

    const commandStr = formatCommand(command);
    console.log(`✅ Parsed command: ${commandStr}`);

    // Process the command (in real impl, this would use Convex ctx)
    const handler = getHandler(command);
    
    try {
      // For now, just log the command
      // In production, this would:
      // 1. Store memo to Convex
      // 2. Trigger workflows
      // 3. Send replies
      
      console.log(`📋 Executing: ${commandStr}`);
      
      // Send success reply
      await agentMailClient.sendReply(
        emailAddress,
        email.from,
        `Re: ${email.subject}`,
        `✅ Command received!\n\n${commandStr}\n\nYour ${email.to} agent is processing this...`
      );
      
    } catch (err) {
      console.error(`❌ Command error:`, err);
      await this.sendErrorReply(email, String(err));
    }
  }

  /**
   * Send error reply
   */
  private async sendErrorReply(email: { from: string; subject: string }, error: string): Promise<void> {
    if (!agentMailClient.isConfigured()) return;
    
    const fromEmail = "claw@agentmail.to";
    await agentMailClient.sendReply(
      fromEmail,
      email.from,
      `Re: ${email.subject}`,
      `❌ Error processing your email:\n\n${error}\n\nReply with /help for available commands.`
    );
  }

  /**
   * Process a raw email directly (for webhook integrations)
   */
  async processRawEmail(rawEmail: string, userId: string): Promise<{
    success: boolean;
    message: string;
    command?: string;
  }> {
    const email = await parseRawEmail(rawEmail);
    console.log(formatEmailLog(email));

    const { command, error } = parseEmailToCommand(email.subject, email.body);

    if (!command) {
      return { success: false, message: error || "Unknown error" };
    }

    const commandStr = formatCommand(command);
    console.log(`✅ Parsed command: ${commandStr}`);

    return {
      success: true,
      message: `Command received: ${commandStr}`,
      command: commandStr,
    };
  }
}

// Export singleton
export const clawderous = new Clawderous();

// CLI entry point
if (require.main === module) {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Please set AGENTMAIL_API_KEY environment variable");
    console.log("   export AGENTMAIL_API_KEY=your_key_here");
    process.exit(1);
  }

  clawderous.configure(apiKey).then(async () => {
    const email = await clawderous.getInbox();
    console.log(`📧 Using inbox: ${email}`);
    await clawderous.start();
    
    // Handle graceful shutdown
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down...");
      clawderous.stop();
      process.exit(0);
    });
  }).catch((error) => {
    console.error("❌ Failed to start Clawderous:", error);
    process.exit(1);
  });
}
