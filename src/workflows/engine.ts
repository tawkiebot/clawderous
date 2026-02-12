/**
 * Workflow Engine - Executes commands
 */

import * as fs from 'fs';
import * as path from 'path';
import { ParsedCommand } from '../parsers/command';

export interface WorkflowResult {
  success: boolean;
  message: string;
  data?: Record<string, any>;
}

export interface WorkflowContext {
  email: {
    from: string;
    subject: string;
    body: string;
    date: Date;
  };
  subject: string;
  body: string;
}

export class WorkflowEngine {
  private dataDir: string;
  private workflows: Map<string, WorkflowHandler> = new Map();

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
    this.ensureDataDir();
    this.registerBuiltInWorkflows();
  }

  /**
   * Execute a command
   */
  async execute(command: ParsedCommand, context: WorkflowContext): Promise<WorkflowResult> {
    const handler = this.workflows.get(command.command);
    
    if (!handler) {
      return {
        success: false,
        message: `Unknown command: /${command.command}`,
      };
    }

    return handler(command.args, context);
  }

  /**
   * Register a workflow handler
   */
  register(name: string, handler: WorkflowHandler): void {
    this.workflows.set(name, handler);
  }

  /**
   * Register built-in workflows
   */
  private registerBuiltInWorkflows(): void {
    // /ping - Health check
    this.register('ping', async (args) => {
      return {
        success: true,
        message: 'Pong! 🦞 Clawederous is alive.',
      };
    });

    // /help - Show help
    this.register('help', async (args) => {
      const commands = Array.from(this.workflows.keys()).join(', ');
      return {
        success: true,
        message: `Available commands: ${commands}`,
      };
    });

    // /note - Save to knowledge base
    this.register('note', async (args, context) => {
      const content = args.join(' ') || context.body;
      const filename = this.saveNote(content, context.subject);
      return {
        success: true,
        message: `Note saved: ${filename}`,
        data: { filename },
      };
    });

    // /log - Add to daily journal
    this.register('log', async (args, context) => {
      const entry = `[${new Date().toISOString()}] ${context.subject}: ${context.body}`;
      await this.appendToFile(path.join(this.dataDir, 'journal.md'), entry);
      return {
        success: true,
        message: 'Entry added to journal',
      };
    });

    // /remind - Create reminder
    this.register('remind', async (args, context) => {
      const reminder = {
        id: Date.now(),
        message: context.subject,
        body: context.body,
        created: new Date().toISOString(),
      };
      
      await this.appendToFile(
        path.join(this.dataDir, 'reminders.md'),
        JSON.stringify(reminder, null, 2)
      );
      
      return {
        success: true,
        message: 'Reminder created',
        data: reminder,
      };
    });

    // /claris - Forward to Claris
    this.register('claris', async (args, context) => {
      // In production: send to actual endpoint
      console.log(`📤 Forwarding to Claris: ${context.body}`);
      return {
        success: true,
        message: 'Forwarded to Claris',
        data: { forwarded: true },
      };
    });

    // /tweet - Post to Twitter (placeholder)
    this.register('tweet', async (args, context) => {
      const content = args.join(' ') || context.body.slice(0, 280);
      console.log(`🐦 Tweet: ${content}`);
      return {
        success: true,
        message: 'Tweet posted (placeholder)',
        data: { content },
      };
    });
  }

  /**
   * Ensure data directory exists
   */
  private ensureDataDir(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive }
  }

 : true });
    /**
   * Save a note
   */
  private saveNote(content: string, title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${slug}.md`;
    const filepath = path.join(this.dataDir, 'notes', filename);
    
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const note = `---
title: ${title}
date: ${new Date().toISOString()}
---

${content}
`;

    fs.writeFileSync(filepath, note);
    return filename;
  }

  /**
   * Append to a file
   */
  private async appendToFile(filepath: string, content: string): Promise<void> {
    fs.appendFileSync(filepath, content + '\n');
  }
}

type WorkflowHandler = (
  args: string[],
  context: WorkflowContext
) => Promise<WorkflowResult>;
