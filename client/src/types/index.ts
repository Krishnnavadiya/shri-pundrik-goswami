export interface Page {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  heroImage?: string;
  language: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  _id: string;
  slug: string;
  title: string;
  summary?: string;
  body: string;
  authorName?: string;
  authorBio?: string;
  authorImage?: string;
  language: string;
  category?: string;
  tags: string[];
  heroImage?: string;
  publishedAt?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface EventItem {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  body?: string;
  category?: string;
  eventType?: string;
  startDate: string;
  endDate?: string;
  lunarDate?: string;
  location?: string;
  image?: string;
  language: string;
  registrationUrl?: string;
  status: 'draft' | 'published';
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  language: string;
  sortOrder: number;
  status: 'draft' | 'published';
}

export type MediaType = 'image' | 'pdf' | 'audio' | 'video' | 'newsletter';

export interface MediaItem {
  _id: string;
  title: string;
  type: MediaType;
  url?: string;
  file?: string;
  coverImage?: string;
  author?: string;
  language: string;
  description?: string;
  category?: string;
  downloadable: boolean;
  publishedAt?: string;
  status: 'draft' | 'published';
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  mission?: string;
  body?: string;
  activities: string[];
  gallery: string[];
  heroImage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  language: string;
  status: 'draft' | 'published';
}

export interface LineagePerson {
  _id: string;
  name: string;
  title?: string;
  position?: string;
  lineageType: 'primary' | 'branch';
  parentId?: string | null;
  portrait?: string;
  bio?: string;
  birthYear?: string;
  passingYear?: string;
  language: string;
  sortOrder: number;
}

export interface ContactSubmission {
  _id: string;
  routeTo?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  createdAt: string;
}

export interface Registration {
  _id: string;
  programId?: string;
  programTitle?: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  address?: string;
  message?: string;
  consent: boolean;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  createdAt: string;
}

export type KathaProgramType =
  | 'Katha'
  | 'Pravachan'
  | 'Sankirtan'
  | 'Spiritual Gathering'
  | 'Online Session'
  | 'Other';

export type KathaRequestStatus = 'New' | 'Contacted' | 'Confirmed' | 'Rejected' | 'Completed';

export interface KathaRequest {
  _id: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
  city: string;
  country: string;
  organizationName?: string;
  programType: KathaProgramType;
  preferredDate: string;
  alternateDate?: string;
  expectedAttendees?: number;
  venueAddress: string;
  message?: string;
  consent: boolean;
  status: KathaRequestStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  status?: 'active' | 'inactive';
  lastLoginAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
