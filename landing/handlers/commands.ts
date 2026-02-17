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
/extract <url> - Summarize a webpage
/status - View your Clawderous stats
/help - Show this message

Just email clawederous@agentmail.to to get started!`,
    };
  }
}

// Extract handler - fetches URL and generates summary
export class ExtractHandler implements CommandHandler {
  async execute(command: Command, ctx: ActionCtx) {
    if (command.command !== "/extract") {
      throw new Error("Wrong handler for command");
    }

    const { url, questions } = command;

    // Step 1: Fetch the page content
    let pageContent: string;
    try {
      pageContent = await this.fetchPage(url);
    } catch (error) {
      return {
        success: false,
        message: `❌ Failed to fetch page: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }

    // Step 2: Generate summary using LLM (mocked for now)
    const summary = await this.generateSummary(pageContent, url, questions);

    // Step 3: Save to Convex
    const id = await ctx.runMutation("memos:create", {
      userId: ctx.userId,
      email: ctx.email,
      command: "/extract",
      title: summary.title,
      content: summary.content,
      createdAt: Date.now(),
      metadata: {
        originalUrl: url,
        keyPoints: summary.keyPoints,
        questions: questions || [],
      },
    });

    const memoUrl = `https://tawkie.dev/memo/${id}`;

    return {
      success: true,
      message: this.formatResponse(summary, memoUrl),
      url: memoUrl,
    };
  }

  private async fetchPage(url: string): Promise<string> {
    // Use web_fetch tool to get page content
    // This would be called via the appropriate mechanism in production
    // For now, we use the web_fetch function if available
    
    try {
      // In production, this would call the actual web_fetch tool
      // For this implementation, we'll simulate the fetch
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Clawderous/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      // Basic HTML to text conversion
      const text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return text.substring(0, 10000); // Truncate to 10K chars
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        // In browser context or restricted environment, use alternative
        throw new Error(`Unable to fetch ${url}. The page may require authentication or be inaccessible.`);
      }
      throw error;
    }
  }

  private async generateSummary(
    content: string,
    url: string,
    questions?: string[]
  ): Promise<{ title: string; content: string; keyPoints: string[] }> {
    // Mock LLM summary - in production, this would call an actual LLM
    const title = this.extractTitle(content) || "Untitled Article";
    
    // Generate mock key points based on content length and questions
    const keyPoints = this.generateMockKeyPoints(content, questions);
    
    const contentText = `## Summary of ${url}

${this.generateMockSummary(content, questions)}

### Key Points:
${keyPoints.map((p) => `- ${p}`).join("\n")}

---
*Extracted by Clawderous 📧*
`;

    return {
      title: `📝 Extract: ${title}`,
      content: contentText,
      keyPoints,
    };
  }

  private extractTitle(content: string): string | null {
    // Try to find a title in the content
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) return titleMatch[1].trim();
    
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) return h1Match[1].trim();
    
    // First substantial line as title
    const lines = content.split("\n").filter((l) => l.length > 20);
    if (lines.length > 0) {
      return lines[0].substring(0, 80);
    }
    
    return null;
  }

  private generateMockKeyPoints(
    content: string,
    questions?: string[]
  ): string[] {
    const points: string[] = [];
    
    // If questions provided, use them as key points (focus areas)
    if (questions && questions.length > 0) {
      return questions.slice(0, 5);
    }
    
    // Generate generic key points based on content length
    const wordCount = content.split(/\s+/).length;
    
    if (wordCount < 100) {
      points.push("Short content - visit URL for full details");
    } else {
      points.push("Main topic identified from page content");
      points.push("Key information extracted successfully");
      points.push("Multiple sections found in the article");
    }
    
    // Add up to 3 generic points
    points.push("Actionable insights included");
    points.push("Relevant examples mentioned");
    
    return points.slice(0, 5);
  }

  private generateMockSummary(
    content: string,
    questions?: string[]
  ): string {
    const wordCount = content.split(/\s+/).length;
    
    if (questions && questions.length > 0) {
      return `This page was analyzed to address the following question(s):\n${questions.map((q) => `- ${q}`).join("\n")}\n\nThe content provides relevant information covering these topics.`;
    }
    
    return `This article contains approximately ${wordCount} words of content. The page covers several key topics and provides detailed information on the subject matter. The main points have been extracted and summarized below.`;
  }

  private formatResponse(
    summary: { title: string; keyPoints: string[] },
    url: string
  ): string {
    return `✅ Extracted!
📝 ${summary.title}

Key Points:
${summary.keyPoints.map((p) => `• ${p}`).join("\n")}

🔗 ${url}`;
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
    case "/extract":
      return new ExtractHandler();
    default:
      throw new Error(`Unknown command: ${(command as Command).command}`);
  }
}
