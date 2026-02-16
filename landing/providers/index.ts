/**
 * Email Providers Index
 * 
 * Export all available providers and registration utilities.
 */

export { EmailProvider, InboundEmail, SendEmailParams, registerProvider, getProvider, providers } from './interface';
export { ResendProvider } from './resend';
export { SendGridProvider } from './sendgrid';
