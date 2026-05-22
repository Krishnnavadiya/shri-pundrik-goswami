import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { AdminUser, AdminRole } from '../models/AdminUser';

export interface AuthPayload {
  id: string;
  email: string;
  role: AdminRole;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

const extractToken = (req: Request): string | null => {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    return header.slice(7);
  }
  return null;
};

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractToken(req);
    if (!token) {
      return next(ApiError.unauthorized('Authentication token missing'));
    }
    const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;
    const user = await AdminUser.findById(decoded.id).lean();
    if (!user || user.status !== 'active') {
      return next(ApiError.unauthorized('Account is not active'));
    }
    req.user = {
      id: String(user._id),
      email: user.email,
      role: user.role,
    };
    return next();
  } catch {
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};

export const requireRole =
  (...roles: AdminRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }
    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Insufficient permissions'));
    }
    return next();
  };
