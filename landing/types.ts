// Clawderous types

export interface ActionCtx {
  userId: string;
  email: string;
  runMutation: <Args, Result>(name: string, args: Args) => Promise<Result>;
  runQuery: <Args, Result>(name: string, args: Args) => Promise<Result>;
  runAction: <Args, Result>(name: string, args: Args) => Promise<Result>;
}

export interface ClawderousConfig {
  email: string;
  defaultDestination: "convex" | "r2" | "gist";
  webhookUrl?: string;
  imapConfig?: IMAPConfig;
}

export interface IMAPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  tls: boolean;
}

export interface Destination {
  type: "convex" | "r2" | "gist" | "blog";
  config: Record<string, unknown>;
}

export interface WorkflowResult {
  success: boolean;
  output: string;
  error?: string;
}
