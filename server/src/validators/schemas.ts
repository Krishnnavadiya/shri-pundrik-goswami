import { z } from 'zod';

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  language: z.string().min(2).max(5).optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  type: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(5).max(5000),
  routeTo: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export const registrationSchema = z.object({
  programId: z.string().optional(),
  programTitle: z.string().optional(),
  name: z.string().min(2).max(120),
  dob: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  address: z.string().max(500).optional().or(z.literal('')),
  message: z.string().max(2000).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit' }),
  }),
  honeypot: z.string().max(0).optional(),
});

const baseStatus = z.enum(['draft', 'published']).default('published');

export const articleSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens')
    .optional(),
  title: z.string().min(2).max(250),
  summary: z.string().max(600).optional().or(z.literal('')),
  body: z.string().default(''),
  authorName: z.string().optional(),
  authorBio: z.string().optional(),
  authorImage: z.string().url().optional().or(z.literal('')),
  language: z.string().default('en'),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  heroImage: z.string().url().optional().or(z.literal('')),
  publishedAt: z.string().optional(),
  status: baseStatus,
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().url().optional().or(z.literal('')),
});

export const eventSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  title: z.string().min(2).max(250),
  description: z.string().optional(),
  body: z.string().optional(),
  category: z.string().optional(),
  eventType: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().or(z.literal('')),
  lunarDate: z.string().optional(),
  location: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  language: z.string().default('en'),
  registrationUrl: z.string().optional(),
  status: baseStatus,
});

export const faqSchema = z.object({
  question: z.string().min(3).max(400),
  answer: z.string().min(2),
  category: z.string().optional(),
  language: z.string().default('en'),
  sortOrder: z.number().default(0),
  status: baseStatus,
});

export const mediaSchema = z.object({
  title: z.string().min(2),
  type: z.enum(['image', 'pdf', 'audio', 'video', 'newsletter']),
  url: z.string().optional(),
  file: z.string().optional(),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  language: z.string().default('en'),
  description: z.string().optional(),
  category: z.string().optional(),
  downloadable: z.boolean().default(true),
  sortOrder: z.number().default(0),
  status: baseStatus,
  publishedAt: z.string().optional(),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  title: z.string().min(2),
  mission: z.string().optional(),
  body: z.string().optional(),
  activities: z.array(z.string()).default([]),
  gallery: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
  language: z.string().default('en'),
  sortOrder: z.number().default(0),
  status: baseStatus,
});

export const lineageSchema = z.object({
  name: z.string().min(2),
  title: z.string().optional(),
  position: z.string().optional(),
  lineageType: z.enum(['primary', 'branch']).default('primary'),
  parentId: z.string().nullable().optional(),
  portrait: z.string().optional(),
  bio: z.string().optional(),
  birthYear: z.string().optional(),
  passingYear: z.string().optional(),
  language: z.string().default('en'),
  sortOrder: z.number().default(0),
  status: baseStatus,
});

export const pageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-/]+$/),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  body: z.string().default(''),
  heroImage: z.string().optional(),
  language: z.string().default('en'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().optional(),
  status: baseStatus,
});

export const submissionStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'contacted', 'closed']),
});

export const adminUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'super_admin']).default('admin'),
});
