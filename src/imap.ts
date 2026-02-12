/**
 * IMAP Connection for Clawederous
 */

import Imap from 'imap';
import { SimpleGit } from './utils/git';

export interface IMAPConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

export class IMAPConnection {
  private imap: Imap;
  private connected = false;

  constructor(private config: IMAPConfig) {
    this.imap = new Imap({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });
  }

  /**
   * Connect to IMAP server
   */
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.connected = true;
        console.log('✓ Connected to IMAP');
        resolve();
      });

      this.imap.once('error', (err) => {
        console.error('IMAP Error:', err);
        reject(err);
      });

      this.imap.connect();
    });
  }

  /**
   * Subscribe to inbox for new mail
   */
  async subscribe(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          reject(err);
          return;
        }
        
        console.log(`✓ Opened inbox: ${box.messages.total} messages`);
        
        // Listen for new mail
        this.imap.on('mail', (count) => {
          console.log(`📬 New mail: ${count} messages`);
        });

        resolve();
      });
    });
  }

  /**
   * Fetch recent emails
   */
  async fetchRecent(count = 10): Promise<EmailMessage[]> {
    return new Promise((resolve, reject) => {
      const messages: EmailMessage[] = [];

      const f = this.imap.seq.fetch(`${Math.max(1, box.messages.total - count)}:*`, {
        bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)', 'TEXT'],
        struct: true,
      });

      f.on('message', (msg) => {
        let email: EmailMessage = {
          from: '',
          subject: '',
          body: '',
          date: new Date(),
        };

        msg.on('body', (stream, info) => {
          let buffer = '';
          stream.on('data', (chunk) => {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', () => {
            if (info.which === 'HEADER.FIELDS (FROM SUBJECT DATE)') {
              const headers = this.parseHeaders(buffer);
              email.from = headers.from || '';
              email.subject = headers.subject || '';
              email.date = new Date(headers.date || new Date());
            } else {
              email.body = this.stripQuoted(buffer);
            }
          });
        });

        msg.once('end', () => {
          messages.push(email);
        });
      });

      f.once('error', reject);
      f.once('end', () => resolve(messages));
    });
  }

  /**
   * Send a reply email
   */
  async sendReply(to: string, body: string): Promise<void> {
    // Simple console output for development
    console.log(`📤 Reply to ${to}: ${body}`);
    
    // In production, integrate with SMTP or AgentMail API
    // await fetch('https://api.agentmail.io/send', { ... });
  }

  /**
   * Disconnect from IMAP
   */
  async disconnect(): Promise<void> {
    if (this.connected) {
      this.imap.end();
      this.connected = false;
    }
  }

  private parseHeaders(headerText: string): Record<string, string> {
    const headers: Record<string, string> = {};
    const lines = headerText.split('\r\n');
    
    for (const line of lines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).toLowerCase().trim();
        const value = line.slice(colonIdx + 1).trim();
        headers[key] = value;
      }
    }
    
    return headers;
  }

  private stripQuoted(body: string): string {
    return body
      .split('\r\n-- \r\n')[0] // Remove signature
      .split('\r\n> ')[0]      // Remove quoted text
      .trim();
  }
}

let box: any; // Placeholder for box reference
