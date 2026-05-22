import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const formatDate = (value?: string | Date, pattern = 'd MMM yyyy'): string => {
  if (!value) return '';
  const d = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(d)) return '';
  return format(d, pattern);
};

export const formatDateTime = (value?: string | Date): string =>
  formatDate(value, "d MMM yyyy 'at' h:mm a");

export const fromNow = (value?: string | Date): string => {
  if (!value) return '';
  const d = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(d)) return '';
  return formatDistanceToNow(d, { addSuffix: true });
};

export const stripHtml = (html?: string): string =>
  (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const truncate = (text: string, n = 160): string =>
  text.length > n ? text.slice(0, n).trim() + '…' : text;
