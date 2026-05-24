import { api } from './api';
import type {
  Article,
  EventItem,
  Faq,
  KathaProgramType,
  LineagePerson,
  MediaItem,
  Page,
  Project,
  ApiResponse,
} from '@/types';

interface ListQuery {
  page?: number;
  limit?: number;
  language?: string;
  category?: string;
  search?: string;
  type?: string;
  upcoming?: boolean;
  from?: string;
  to?: string;
}

export const publicApi = {
  getPage: async (slug: string, language?: string): Promise<Page> => {
    const res = await api.get<ApiResponse<Page>>(`/pages/${slug}`, { params: { language } });
    return res.data.data;
  },

  listArticles: async (params: ListQuery = {}) => {
    const res = await api.get<ApiResponse<Article[]>>('/articles', { params });
    return res.data;
  },

  getArticle: async (slug: string, language?: string): Promise<Article> => {
    const res = await api.get<ApiResponse<Article>>(`/articles/${slug}`, { params: { language } });
    return res.data.data;
  },

  listEvents: async (params: ListQuery = {}) => {
    const res = await api.get<ApiResponse<EventItem[]>>('/events', { params });
    return res.data;
  },

  getEvent: async (slug: string): Promise<EventItem> => {
    const res = await api.get<ApiResponse<EventItem>>(`/events/${slug}`);
    return res.data.data;
  },

  listFaqs: async (params: ListQuery = {}): Promise<Faq[]> => {
    const res = await api.get<ApiResponse<Faq[]>>('/faqs', { params });
    return res.data.data;
  },

  listMedia: async (params: ListQuery = {}) => {
    const res = await api.get<ApiResponse<MediaItem[]>>('/media', { params });
    return res.data;
  },

  listNewsletters: async (params: ListQuery = {}): Promise<MediaItem[]> => {
    const res = await api.get<ApiResponse<MediaItem[]>>('/newsletters', { params });
    return res.data.data;
  },

  listProjects: async (params: ListQuery = {}): Promise<Project[]> => {
    const res = await api.get<ApiResponse<Project[]>>('/projects', { params });
    return res.data.data;
  },

  getProject: async (slug: string): Promise<Project> => {
    const res = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
    return res.data.data;
  },

  listLineage: async (): Promise<LineagePerson[]> => {
    const res = await api.get<ApiResponse<LineagePerson[]>>('/lineage');
    return res.data.data;
  },

  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    routeTo?: string;
  }) => {
    const res = await api.post<ApiResponse<{ id: string }>>('/contact', data);
    return res.data;
  },

  submitRegistration: async (data: {
    name: string;
    email: string;
    phone: string;
    dob?: string;
    programId?: string;
    programTitle?: string;
    address?: string;
    message?: string;
    consent: boolean;
  }) => {
    const res = await api.post<ApiResponse<{ id: string }>>('/registrations', data);
    return res.data;
  },

  submitKathaRequest: async (data: {
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
    expectedAttendees?: number | string;
    venueAddress: string;
    message?: string;
    consent: true;
  }) => {
    const res = await api.post<ApiResponse<{ id: string }>>('/katha-requests', data);
    return res.data;
  },
};
