import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser';
import { Article } from '../models/Article';
import { Event } from '../models/Event';
import { ContactSubmission } from '../models/ContactSubmission';
import { Registration } from '../models/Registration';
import { MediaItem } from '../models/MediaItem';
import { Faq } from '../models/Faq';
import { Project } from '../models/Project';
import { KathaRequest } from '../models/KathaRequest';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  const [
    articleCount,
    publishedArticles,
    eventCount,
    upcomingEvents,
    contactCount,
    newContacts,
    registrationCount,
    newRegistrations,
    mediaCount,
    faqCount,
    projectCount,
    kathaRequestCount,
    newKathaRequests,
  ] = await Promise.all([
    Article.countDocuments(),
    Article.countDocuments({ status: 'published' }),
    Event.countDocuments(),
    Event.countDocuments({ startDate: { $gte: new Date() }, status: 'published' }),
    ContactSubmission.countDocuments(),
    ContactSubmission.countDocuments({ status: 'new' }),
    Registration.countDocuments(),
    Registration.countDocuments({ status: 'new' }),
    MediaItem.countDocuments(),
    Faq.countDocuments(),
    Project.countDocuments(),
    KathaRequest.countDocuments(),
    KathaRequest.countDocuments({ status: 'New' }),
  ]);

  sendSuccess(res, {
    articles: { total: articleCount, published: publishedArticles },
    events: { total: eventCount, upcoming: upcomingEvents },
    contacts: { total: contactCount, new: newContacts },
    registrations: { total: registrationCount, new: newRegistrations },
    kathaRequests: { total: kathaRequestCount, new: newKathaRequests },
    media: { total: mediaCount },
    faqs: { total: faqCount },
    projects: { total: projectCount },
  });
};

export const listAdminUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await AdminUser.find()
    .select('-passwordHash')
    .sort({ createdAt: -1 })
    .lean();
  sendSuccess(res, users);
};

export const createAdminUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'super_admin';
  };
  const existing = await AdminUser.findOne({ email: email.toLowerCase() });
  if (existing) throw ApiError.conflict('User with this email already exists');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await AdminUser.create({ name, email, passwordHash, role });
  sendCreated(res, {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const updateAdminUser = async (req: Request, res: Response): Promise<void> => {
  const { name, role, status } = req.body as {
    name?: string;
    role?: 'admin' | 'super_admin';
    status?: 'active' | 'inactive';
  };
  const user = await AdminUser.findByIdAndUpdate(
    req.params.id,
    { ...(name && { name }), ...(role && { role }), ...(status && { status }) },
    { new: true },
  ).select('-passwordHash');
  if (!user) throw ApiError.notFound('User not found');
  sendSuccess(res, user);
};

export const deleteAdminUser = async (req: Request, res: Response): Promise<void> => {
  if (req.user?.id === req.params.id) {
    throw ApiError.badRequest('You cannot delete your own account');
  }
  const user = await AdminUser.findByIdAndDelete(req.params.id);
  if (!user) throw ApiError.notFound('User not found');
  sendSuccess(res, { id: req.params.id }, 'User deleted');
};
