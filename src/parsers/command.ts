/**
 * Command Parser - Extracts commands from email subjects
 */

export interface ParsedCommand {
  command: string;
  args: string[];
  raw: string;
}

export class CommandParser {
  /**
   * Parse command from email subject
   */
  parseSubject(subject: string): ParsedCommand | null {
    if (!subject) return null;

    const trimmed = subject.trim();
    
    // Check for command prefix
    if (!trimmed.startsWith('/')) {
      // Check body for command instead
      return null;
    }

    // Parse: /command arg1 arg2 "multi word arg"
    const parts = this.tokenize(trimmed);
    const command = parts[0].slice(1).toLowerCase(); // Remove leading '/'
    
    return {
      command,
      args: parts.slice(1),
      raw: trimmed,
    };
  }

  /**
   * Parse command from body text
   */
  parseBody(body: string): ParsedCommand | null {
    if (!body) return null;

    // Look for command in first line
    const firstLine = body.trim().split('\n')[0];
    
    if (firstLine.startsWith('/')) {
      return this.parseSubject(firstLine);
    }

    // Look for shorthand patterns
    // Format: /command or Command: value
    const shorthandMatch = body.match(/^\/(\w+)\s*(.*)$/m);
    if (shorthandMatch) {
      return {
        command: shorthandMatch[1].toLowerCase(),
        args: shorthandMatch[2].split(/\s+/),
        raw: shorthandMatch[0],
      };
    }

    return null;
  }

  /**
   * Tokenize command string handling quotes
   */
  private tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inQuote = false;
    let quoteChar = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === '"' || char === "'") {
        if (!inQuote) {
          inQuote = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuote = false;
          quoteChar = '';
        } else {
          current += char;
        }
      } else if (char === ' ' && !inQuote) {
        if (current) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) {
      tokens.push(current);
    }

    return tokens;
  }
}
