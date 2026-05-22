import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { sendSuccess } from '../utils/apiResponse';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await AdminUser.findOne({ email: email.toLowerCase() });
  if (!user || user.status !== 'active') {
    throw ApiError.unauthorized('Invalid email or password');
  }
  const ok = await user.comparePassword(password);
  if (!ok) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const signOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as unknown as SignOptions['expiresIn'],
  };
  const token = jwt.sign(
    { id: String(user._id), email: user.email, role: user.role },
    env.jwtSecret,
    signOptions,
  );

  user.lastLoginAt = new Date();
  await user.save();

  sendSuccess(res, {
    token,
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw ApiError.unauthorized();
  const user = await AdminUser.findById(req.user.id).lean();
  if (!user) throw ApiError.notFound('User not found');
  sendSuccess(res, {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    lastLoginAt: user.lastLoginAt,
  });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  sendSuccess(res, { ok: true }, 'Logged out');
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw ApiError.unauthorized();
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };
  if (!newPassword || newPassword.length < 6) {
    throw ApiError.badRequest('New password must be at least 6 characters');
  }
  const user = await AdminUser.findById(req.user.id);
  if (!user) throw ApiError.notFound('User not found');
  const ok = await user.comparePassword(currentPassword);
  if (!ok) throw ApiError.unauthorized('Current password is incorrect');
  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  await user.save();
  sendSuccess(res, { ok: true }, 'Password updated');
};
