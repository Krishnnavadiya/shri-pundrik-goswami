import { Request, Response } from 'express';
import { ContactSubmission } from '../models/ContactSubmission';
import { Registration } from '../models/Registration';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { ApiError } from '../utils/ApiError';
import {
  sendContactNotification,
  sendRegistrationNotification,
} from '../services/email.service';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    routeTo?: string;
  };
  const submission = await ContactSubmission.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: body.subject,
    message: body.message,
    routeTo: body.routeTo || 'general',
  });
  await sendContactNotification(body);
  sendCreated(
    res,
    { id: submission._id },
    'Thank you for reaching out. We will respond soon.',
  );
};

export const submitRegistration = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as {
    name: string;
    email: string;
    phone: string;
    dob?: string;
    programId?: string;
    programTitle?: string;
    address?: string;
    message?: string;
    consent: boolean;
  };
  const submission = await Registration.create({
    ...body,
    dob: body.dob ? new Date(body.dob) : undefined,
  });
  await sendRegistrationNotification(body);
  sendCreated(
    res,
    { id: submission._id },
    'Registration received. We will be in touch shortly.',
  );
};

export const adminListContactSubmissions = async (req: Request, res: Response): Promise<void> => {
  const { status, page = 1, limit = 30 } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const [items, total] = await Promise.all([
    ContactSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    ContactSubmission.countDocuments(filter),
  ]);
  sendSuccess(res, items, 'Contact submissions', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const adminListRegistrations = async (req: Request, res: Response): Promise<void> => {
  const { status, page = 1, limit = 30 } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const [items, total] = await Promise.all([
    Registration.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Registration.countDocuments(filter),
  ]);
  sendSuccess(res, items, 'Registrations', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  const item = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!item) throw ApiError.notFound('Submission not found');
  sendSuccess(res, item, 'Status updated');
};

export const updateRegistrationStatus = async (req: Request, res: Response): Promise<void> => {
  const item = await Registration.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!item) throw ApiError.notFound('Registration not found');
  sendSuccess(res, item, 'Status updated');
};

export const deleteContactSubmission = async (req: Request, res: Response): Promise<void> => {
  const item = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Submission not found');
  sendSuccess(res, { id: req.params.id }, 'Submission deleted');
};

export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
  const item = await Registration.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Registration not found');
  sendSuccess(res, { id: req.params.id }, 'Registration deleted');
};
