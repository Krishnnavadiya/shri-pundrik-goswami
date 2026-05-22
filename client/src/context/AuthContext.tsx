import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { adminApi } from '@/services/adminApi';
import type { AdminUser } from '@/types';

interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async (): Promise<void> => {
    const token = localStorage.getItem('spg_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const me = await adminApi.me();
      setUser(me);
    } catch {
      localStorage.removeItem('spg_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const data = await adminApi.login(email, password);
    localStorage.setItem('spg_token', data.token);
    setUser(data.user);
  };

  const logout = async (): Promise<void> => {
    try {
      await adminApi.logout();
    } catch {
      // silently ignore
    }
    localStorage.removeItem('spg_token');
    setUser(null);
  };

  const value = useMemo<AuthState>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
