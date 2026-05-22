import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let transporter: Transporter | null = null;

const getTransporter = (): Transporter | null => {
  if (!env.smtp.host || !env.smtp.user) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }
  return transporter;
};

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export const sendEmail = async (options: MailOptions): Promise<boolean> => {
  const tx = getTransporter();
  if (!tx) {
    logger.warn(`[email] SMTP not configured — would send to ${options.to}: ${options.subject}`);
    return false;
  }
  try {
    await tx.sendMail({
      from: env.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    return true;
  } catch (err) {
    logger.error('[email] Failed to send', err);
    return false;
  }
};

export const sendContactNotification = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> => {
  if (!env.smtp.notifyTo) return;
  const html = `
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br/>')}</p>
  `;
  await sendEmail({
    to: env.smtp.notifyTo,
    subject: `[Contact] ${data.subject || 'New inquiry'} from ${data.name}`,
    html,
    replyTo: data.email,
  });
};

export const sendRegistrationNotification = async (data: {
  name: string;
  email: string;
  phone?: string;
  programTitle?: string;
  message?: string;
}): Promise<void> => {
  if (!env.smtp.notifyTo) return;
  const html = `
    <h2>New Program Registration</h2>
    <p><strong>Program:</strong> ${data.programTitle || 'Initiation / Guidance'}</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.message ? `<p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>` : ''}
  `;
  await sendEmail({
    to: env.smtp.notifyTo,
    subject: `[Registration] ${data.name} — ${data.programTitle || 'Program'}`,
    html,
    replyTo: data.email,
  });
};
