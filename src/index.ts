/**
 * Clawederous - Email as the universal interface
 */

import { IMAPConnection } from './imap';
import { CommandParser } from './parsers/command';
import { WorkflowEngine } from './workflows/engine';

export interface ClawederousConfig {
  imapConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  dataDir?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export class Clawederous {
  private imap: IMAPConnection;
  private parser: CommandParser;
  private workflows: WorkflowEngine;
  private running = false;

  constructor(private config: ClawederousConfig) {
    this.imap = new IMAPConnection(config.imapConfig);
    this.parser = new CommandParser();
    this.workflows = new WorkflowEngine(config.dataDir || './data');
  }

  /**
   * Start listening for emails
   */
  async start(): Promise<void> {
    console.log('🦞 Clawederous starting...');
    
    await this.imap.connect();
    await this.imap.subscribe();
    
    this.running = true;
    console.log('👂 Listening for commands...');

    this.imap.on('mail', async (emails) => {
      for (const email of emails) {
        await this.processEmail(email);
      }
    });

    // Keep process alive
    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
  }

  /**
   * Stop the agent
   */
  async stop(): Promise<void> {
    this.running = false;
    await this.imap.disconnect();
    console.log('👋 Clawederous stopped');
  }

  /**
   * Process a single email
   */
  private async processEmail(email: EmailMessage): Promise<void> {
    const { subject, body, from } = email;
    
    console.log(`📧 Processing: ${subject} from ${from}`);

    // Parse command from subject
    const command = this.parser.parseSubject(subject);
    
    if (!command) {
      console.log('⚠️ No command found in subject');
      return;
    }

    // Execute command
    try {
      const result = await this.workflows.execute(command, { email, subject, body });
      console.log('✅ Command executed:', result);
      
      // Send confirmation
      await this.imap.sendReply(from, `✅ Done: ${result.message}`);
    } catch (error) {
      console.error('❌ Command failed:', error);
      await this.imap.sendReply(from, `❌ Error: ${error.message}`);
    }
  }
}

interface EmailMessage {
  from: string;
  subject: string;
  body: string;
  date: Date;
}
