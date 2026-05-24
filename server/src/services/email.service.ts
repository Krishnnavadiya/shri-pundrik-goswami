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

export const sendKathaRequestNotification = async (data: {
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
  city: string;
  country: string;
  organizationName?: string;
  programType: string;
  preferredDate: string | Date;
  alternateDate?: string | Date;
  expectedAttendees?: number | string;
  venueAddress: string;
  message?: string;
}): Promise<void> => {
  if (!env.smtp.notifyTo) return;
  const fmt = (d: string | Date | undefined): string =>
    d ? new Date(d).toLocaleDateString('en-IN', { dateStyle: 'long' }) : '—';
  const html = `
    <h2>New Katha Request</h2>
    <p><strong>Program type:</strong> ${data.programType}</p>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Phone:</strong> ${data.phoneNumber}</p>
    ${data.whatsappNumber ? `<p><strong>WhatsApp:</strong> ${data.whatsappNumber}</p>` : ''}
    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
    <p><strong>City / Country:</strong> ${data.city}, ${data.country}</p>
    ${data.organizationName ? `<p><strong>Organization:</strong> ${data.organizationName}</p>` : ''}
    <p><strong>Preferred date:</strong> ${fmt(data.preferredDate)}</p>
    ${data.alternateDate ? `<p><strong>Alternate date:</strong> ${fmt(data.alternateDate)}</p>` : ''}
    ${data.expectedAttendees ? `<p><strong>Expected attendees:</strong> ${data.expectedAttendees}</p>` : ''}
    <p><strong>Venue:</strong><br/>${String(data.venueAddress).replace(/\n/g, '<br/>')}</p>
    ${data.message ? `<p><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>` : ''}
  `;
  await sendEmail({
    to: env.smtp.notifyTo,
    subject: `[Katha Request] ${data.programType} — ${data.fullName} (${data.city})`,
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
