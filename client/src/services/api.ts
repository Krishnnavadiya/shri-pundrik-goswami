import axios, { AxiosError, AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('spg_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      if (isAdminRoute && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('spg_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);

export const extractErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message || err.message;
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong';
};
