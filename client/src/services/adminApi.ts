import { api } from './api';
import type {
  AdminUser,
  ApiResponse,
  Article,
  ContactSubmission,
  EventItem,
  Faq,
  LineagePerson,
  MediaItem,
  Page,
  Project,
  Registration,
} from '@/types';

export const adminApi = {
  login: async (email: string, password: string) => {
    const res = await api.post<ApiResponse<{ token: string; user: AdminUser }>>('/auth/login', {
      email,
      password,
    });
    return res.data.data;
  },

  me: async (): Promise<AdminUser> => {
    const res = await api.get<ApiResponse<AdminUser>>('/auth/me');
    return res.data.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },

  stats: async () => {
    const res = await api.get<ApiResponse<Record<string, { total: number; new?: number; published?: number; upcoming?: number }>>>(
      '/admin/stats',
    );
    return res.data.data;
  },

  // Articles
  listArticles: async (params: Record<string, unknown> = {}) => {
    const res = await api.get<ApiResponse<Article[]>>('/admin/articles', { params });
    return res.data;
  },
  createArticle: async (data: Partial<Article>) => {
    const res = await api.post<ApiResponse<Article>>('/admin/articles', data);
    return res.data.data;
  },
  updateArticle: async (id: string, data: Partial<Article>) => {
    const res = await api.put<ApiResponse<Article>>(`/admin/articles/${id}`, data);
    return res.data.data;
  },
  deleteArticle: async (id: string) => {
    await api.delete(`/admin/articles/${id}`);
  },

  // Events
  listEvents: async (params: Record<string, unknown> = {}) => {
    const res = await api.get<ApiResponse<EventItem[]>>('/admin/events', { params });
    return res.data;
  },
  createEvent: async (data: Partial<EventItem>) => {
    const res = await api.post<ApiResponse<EventItem>>('/admin/events', data);
    return res.data.data;
  },
  updateEvent: async (id: string, data: Partial<EventItem>) => {
    const res = await api.put<ApiResponse<EventItem>>(`/admin/events/${id}`, data);
    return res.data.data;
  },
  deleteEvent: async (id: string) => {
    await api.delete(`/admin/events/${id}`);
  },

  // FAQs
  listFaqs: async () => {
    const res = await api.get<ApiResponse<Faq[]>>('/admin/faqs');
    return res.data.data;
  },
  createFaq: async (data: Partial<Faq>) => {
    const res = await api.post<ApiResponse<Faq>>('/admin/faqs', data);
    return res.data.data;
  },
  updateFaq: async (id: string, data: Partial<Faq>) => {
    const res = await api.put<ApiResponse<Faq>>(`/admin/faqs/${id}`, data);
    return res.data.data;
  },
  deleteFaq: async (id: string) => {
    await api.delete(`/admin/faqs/${id}`);
  },

  // Media
  listMedia: async (params: Record<string, unknown> = {}) => {
    const res = await api.get<ApiResponse<MediaItem[]>>('/admin/media', { params });
    return res.data.data;
  },
  createMedia: async (data: Partial<MediaItem>) => {
    const res = await api.post<ApiResponse<MediaItem>>('/admin/media', data);
    return res.data.data;
  },
  updateMedia: async (id: string, data: Partial<MediaItem>) => {
    const res = await api.put<ApiResponse<MediaItem>>(`/admin/media/${id}`, data);
    return res.data.data;
  },
  deleteMedia: async (id: string) => {
    await api.delete(`/admin/media/${id}`);
  },
  uploadFile: async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await api.post<ApiResponse<{ url: string; filename: string }>>(
      '/admin/media/upload',
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return res.data.data;
  },

  // Projects
  listProjects: async () => {
    const res = await api.get<ApiResponse<Project[]>>('/admin/projects');
    return res.data.data;
  },
  createProject: async (data: Partial<Project>) => {
    const res = await api.post<ApiResponse<Project>>('/admin/projects', data);
    return res.data.data;
  },
  updateProject: async (id: string, data: Partial<Project>) => {
    const res = await api.put<ApiResponse<Project>>(`/admin/projects/${id}`, data);
    return res.data.data;
  },
  deleteProject: async (id: string) => {
    await api.delete(`/admin/projects/${id}`);
  },

  // Lineage
  listLineage: async () => {
    const res = await api.get<ApiResponse<LineagePerson[]>>('/admin/lineage');
    return res.data.data;
  },
  createLineage: async (data: Partial<LineagePerson>) => {
    const res = await api.post<ApiResponse<LineagePerson>>('/admin/lineage', data);
    return res.data.data;
  },
  updateLineage: async (id: string, data: Partial<LineagePerson>) => {
    const res = await api.put<ApiResponse<LineagePerson>>(`/admin/lineage/${id}`, data);
    return res.data.data;
  },
  deleteLineage: async (id: string) => {
    await api.delete(`/admin/lineage/${id}`);
  },

  // Pages
  listPages: async () => {
    const res = await api.get<ApiResponse<Page[]>>('/admin/pages');
    return res.data.data;
  },
  createPage: async (data: Partial<Page>) => {
    const res = await api.post<ApiResponse<Page>>('/admin/pages', data);
    return res.data.data;
  },
  updatePage: async (id: string, data: Partial<Page>) => {
    const res = await api.put<ApiResponse<Page>>(`/admin/pages/${id}`, data);
    return res.data.data;
  },
  deletePage: async (id: string) => {
    await api.delete(`/admin/pages/${id}`);
  },

  // Forms
  listContactSubmissions: async (params: Record<string, unknown> = {}) => {
    const res = await api.get<ApiResponse<ContactSubmission[]>>('/admin/contact-submissions', {
      params,
    });
    return res.data;
  },
  listRegistrations: async (params: Record<string, unknown> = {}) => {
    const res = await api.get<ApiResponse<Registration[]>>('/admin/registrations', { params });
    return res.data;
  },
  updateContactStatus: async (id: string, status: string) => {
    const res = await api.patch<ApiResponse<ContactSubmission>>(
      `/admin/contact-submissions/${id}/status`,
      { status },
    );
    return res.data.data;
  },
  updateRegistrationStatus: async (id: string, status: string) => {
    const res = await api.patch<ApiResponse<Registration>>(
      `/admin/registrations/${id}/status`,
      { status },
    );
    return res.data.data;
  },
  deleteContactSubmission: async (id: string) => {
    await api.delete(`/admin/contact-submissions/${id}`);
  },
  deleteRegistration: async (id: string) => {
    await api.delete(`/admin/registrations/${id}`);
  },
};
