import { simpleParser } from "mailparser";

// Email ingestion interface
export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  body: string;
  html?: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
  date: Date;
}

// Helper to extract email address from mailparser's address types
function extractEmail(address: unknown): string {
  if (!address) return "unknown@email.com";
  
  // Handle single address object
  if (typeof address === "object" && !Array.isArray(address)) {
    const addr = address as { address?: string; value?: Array<{ address?: string }> };
    if ("value" in addr && Array.isArray(addr.value)) {
      return addr.value[0]?.address || "unknown@email.com";
    }
    return addr.address || "unknown@email.com";
  }
  
  // Handle array of addresses
  if (Array.isArray(address)) {
    const firstAddr = address[0];
    if (firstAddr && typeof firstAddr === "object") {
      const addr = firstAddr as { address?: string };
      return addr.address || "unknown@email.com";
    }
  }
  
  return "unknown@email.com";
}

// Parse raw email to structured format
export async function parseRawEmail(rawEmail: string): Promise<EmailMessage> {
  const parsed = await simpleParser(rawEmail);

  // Extract email addresses
  const fromEmail = extractEmail(parsed.from);
  const toEmail = extractEmail(parsed.to);

  // Get body text (prefer plain text, fallback to HTML strip)
  let body = parsed.text || "";
  if (!body && parsed.html) {
    // Simple HTML strip
    body = parsed.html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }

  // Extract attachments
  const attachments = parsed.attachments?.map((att) => ({
    filename: att.filename || "attachment",
    content: att.content,
  }));

  const hasAttachments = attachments && attachments.length > 0;

  return {
    from: fromEmail,
    to: toEmail,
    subject: parsed.subject || "(No subject)",
    body,
    html: parsed.html || undefined,
    attachments: hasAttachments ? attachments : undefined,
    date: parsed.date || new Date(),
  };
}

// Format email for display (for debugging/logging)
export function formatEmailLog(email: EmailMessage): string {
  return `
📧 Email received:
  From: ${email.from}
  To: ${email.to}
  Subject: ${email.subject}
  Date: ${email.date.toISOString()}
  Body length: ${email.body.length} chars
  Attachments: ${email.attachments?.length || 0}
`.trim();
}

// Validate email is meant for Clawderous
export function isForClawderous(email: EmailMessage): boolean {
  // Check if addressed to claw email
  const clawAddresses = [
    "clawederous@agentmail.to",
    "me@agentmail.io",
  ];
  
  return clawAddresses.some((addr) => 
    email.to.toLowerCase().indexOf(addr.toLowerCase()) >= 0
  );
}
