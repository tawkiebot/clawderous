import type { Command } from "../parse/command";
import type { ActionCtx } from "../types";

// Handler interface
export interface CommandHandler {
  execute(command: Command, ctx: ActionCtx): Promise<{ success: boolean; message: string; url?: string }>;
}

// Memo handler - stores to Convex
export class MemoHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/memo") {
      throw new Error("Wrong handler for command");
    }

    const id = await ctx.runMutation("memos:create", {
      userId: ctx.userId,
      email: ctx.email,
      command: "/memo",
      title: command.title,
      content: command.content,
      createdAt: Date.now(),
    });

    const url = `https://tawkie.dev/memo/${id}`;

    return {
      success: true,
      message: `📝 Memo saved! ${command.title ? `"${command.title}"` : "Quick note"}`,
      url,
    };
  }
}

// Blog handler - formats and stores
export class BlogHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/blog") {
      throw new Error("Wrong handler for command");
    }

    const content = this.formatBlogPost(command.title, command.content);
    
    const id = await ctx.runMutation("memos:create", {
      userId: ctx.userId,
      email: ctx.email,
      command: "/blog",
      title: command.title,
      content,
      createdAt: Date.now(),
    });

    const url = `https://tawkie.dev/blog/${id}`;

    return {
      success: true,
      message: `✍️ Blog post published! "${command.title}"`,
      url,
    };
  }

  private formatBlogPost(title: string, content: string): string {
    return `---
title: ${title}
date: ${new Date().toISOString()}
---

${content}

---
*Posted via Clawderous 📧*
`;
  }
}

// Run handler - triggers OpenClaw workflows
export class RunHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/run") {
      throw new Error("Wrong handler for command");
    }

    // In a real implementation, this would trigger an OpenClaw workflow
    // For now, we simulate
    const result = await ctx.runAction("workflows:execute", {
      name: command.workflow,
      args: command.args,
    });

    return {
      success: true,
      message: `⚡ Executed "${command.workflow}" - ${result}`,
    };
  }
}

// Reply handler - sends email response
export class ReplyHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/reply") {
      throw new Error("Wrong handler for command");
    }

    await ctx.runAction("email:send", {
      to: command.to,
      subject: "Re: Your Clawderous request",
      body: command.content,
    });

    return {
      success: true,
      message: `↩️ Reply sent to ${command.to}`,
    };
  }
}

// Status handler - returns user stats
export class StatusHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/status") {
      throw new Error("Wrong handler for command");
    }

    const memos: Array<{ createdAt: number }> = await ctx.runQuery("memos:byUser", { userId: ctx.userId });
    const today = memos.filter((m) => m.createdAt > Date.now() - 86400000);
    const week = memos.filter((m) => m.createdAt > Date.now() - 604800000);

    return {
      success: true,
      message: `🔍 Your Clawderous Stats:\n
- Today: ${today.length} memos
- This week: ${week.length} memos
- Total: ${memos.length} memos`,
    };
  }
}

// Help handler - returns help text
export class HelpHandler implements CommandHandler {
  async execute(command: Command) {
    return {
      success: true,
      message: `📧 Clawderous Commands:

/memo [title] - Quick note or memo
/blog <title> - Publish a blog post
/run <workflow> - Execute a workflow
/reply <to> - Send an email reply
/status - View your Clawderous stats
/help - Show this message

Just email clawederous@agentmail.to to get started!`,
    };
  }
}

// Handler factory
export function getHandler(command: Command): CommandHandler {
  switch (command.command) {
    case "/memo":
      return new MemoHandler();
    case "/blog":
      return new BlogHandler();
    case "/run":
      return new RunHandler();
    case "/reply":
      return new ReplyHandler();
    case "/status":
      return new StatusHandler();
    case "/help":
      return new HelpHandler();
  default:
    throw new Error(`Unknown command: ${(command as Command).command}`);
  }
}
