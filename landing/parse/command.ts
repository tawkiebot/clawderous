import { z } from "zod";

// Command schemas
const MemoSchema = z.object({
  command: z.literal("/memo"),
  title: z.optional(z.string()),
  content: z.string(),
});

const BlogSchema = z.object({
  command: z.literal("/blog"),
  title: z.string(),
  content: z.string(),
});

const RunSchema = z.object({
  command: z.literal("/run"),
  workflow: z.string(),
  args: z.optional(z.array(z.string())),
});

const ReplySchema = z.object({
  command: z.literal("/reply"),
  to: z.string(),
  content: z.string(),
});

const StatusSchema = z.object({
  command: z.literal("/status"),
});

const HelpSchema = z.object({
  command: z.literal("/help"),
});

// Union of all commands
const CommandSchema = z.union([
  MemoSchema,
  BlogSchema,
  RunSchema,
  ReplySchema,
  StatusSchema,
  HelpSchema,
]);

export type Command =
  | z.infer<typeof MemoSchema>
  | z.infer<typeof BlogSchema>
  | z.infer<typeof RunSchema>
  | z.infer<typeof ReplySchema>
  | z.infer<typeof StatusSchema>
  | z.infer<typeof HelpSchema>;

export type CommandType = Command["command"];

// Parse email subject/body into a command
export function parseEmailToCommand(
  subject: string,
  body: string
): { command: Command | null; error?: string } {
  // Normalize: lowercase command, trim whitespace
  const normalizedSubject = subject.trim();
  const normalizedBody = body.trim();

  // Check for command in subject first
  const subjectMatch = normalizedSubject.match(/^\/(\w+)(?:\s+(.*))?$/);
  
  if (subjectMatch) {
    const commandWord = subjectMatch[1].toLowerCase();
    const commandArgs = subjectMatch[2] || "";

    // Build combined text for parsing
    const fullText = commandArgs + "\n" + normalizedBody;
    
    // Try to parse based on command word
    switch (commandWord) {
      case "memo":
        return parseMemo(commandArgs, normalizedBody);
      case "blog":
        return parseBlog(commandArgs, normalizedBody);
      case "run":
        return parseRun(commandArgs, normalizedBody);
      case "reply":
        return parseReply(commandArgs, normalizedBody);
      case "status":
        return { command: { command: "/status" as const } };
      case "help":
        return { command: { command: "/help" as const } };
      default:
        return { command: null, error: `Unknown command: /${commandWord}` };
    }
  }

  // Default to memo if no command specified
  return parseMemo("", normalizedSubject + "\n\n" + normalizedBody);
}

function parseMemo(title: string, body: string): { command: Command | null; error?: string } {
  // First line might be title
  const lines = body.split("\n");
  const firstLine = lines[0].trim();
  
  // If first line looks like a title (short, no punctuation), use it
  const actualTitle = title || (firstLine.length < 80 && !firstLine.endsWith(".")) 
    ? firstLine 
    : undefined;
  
  const actualContent = actualTitle ? lines.slice(1).join("\n").trim() : body;

  if (!actualContent) {
    return { command: null, error: "Memo content is empty" };
  }

  return {
    command: {
      command: "/memo" as const,
      title: actualTitle,
      content: actualContent,
    },
  };
}

function parseBlog(title: string, body: string): { command: Command | null; error?: string } {
  if (!title && !body) {
    return { command: null, error: "Blog post requires a title or content" };
  }

  const lines = body.split("\n");
  const firstLine = lines[0].trim();
  
  const actualTitle = title || firstLine;
  const actualContent = title ? body : lines.slice(1).join("\n").trim();

  return {
    command: {
      command: "/blog" as const,
      title: actualTitle,
      content: actualContent || firstLine,
    },
  };
}

function parseRun(workflow: string, args: string): { command: Command | null; error?: string } {
  if (!workflow) {
    return { command: null, error: "/run requires a workflow name" };
  }

  const argList = args
    .split(/\s+/)
    .filter((a) => a.startsWith("--"))
    .map((a) => a.replace(/^--/, ""));

  return {
    command: {
      command: "/run" as const,
      workflow,
      args: argList,
    },
  };
}

function parseReply(to: string, content: string): { command: Command | null; error?: string } {
  if (!to) {
    // Try to extract from body
    const toMatch = content.match(/^to:\s*(\S+)/i);
    if (toMatch) {
      return {
        command: {
          command: "/reply" as const,
          to: toMatch[1],
          content: content.replace(/^to:\s*(\S+)\s*/i, "").trim(),
        },
      };
    }
    return { command: null, error: "/reply requires a recipient" };
  }

  if (!content) {
    return { command: null, error: "/reply requires content" };
  }

  return {
    command: {
      command: "/reply" as const,
      to,
      content,
    },
  };
}

// Format command for display
export function formatCommand(command: Command): string {
  switch (command.command) {
    case "/memo":
      return `📝 /memo${command.title ? ` ${command.title}` : ""}`;
    case "/blog":
      return `✍️ /blog ${command.title}`;
    case "/run":
      return `⚡ /run ${command.workflow}`;
    case "/reply":
      return `↩️ /reply ${command.to}`;
    case "/status":
      return `🔍 /status`;
    case "/help":
      return `❓ /help`;
  }
}
