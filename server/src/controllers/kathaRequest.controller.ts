import { Request, Response } from 'express';
import { KathaRequest } from '../models/KathaRequest';
import { ApiError } from '../utils/ApiError';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { sendKathaRequestNotification } from '../services/email.service';
import { logger } from '../utils/logger';

interface KathaRequestBody {
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
  city: string;
  country: string;
  organizationName?: string;
  programType:
    | 'Katha'
    | 'Pravachan'
    | 'Sankirtan'
    | 'Spiritual Gathering'
    | 'Online Session'
    | 'Other';
  preferredDate: string;
  alternateDate?: string;
  expectedAttendees?: number | string;
  venueAddress: string;
  message?: string;
  consent: true;
}

const cleanString = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;

const parseAttendees = (v: number | string | undefined): number | undefined => {
  if (v === undefined || v === null || v === '') return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export const submitKathaRequest = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as KathaRequestBody;

  const created = await KathaRequest.create({
    fullName: body.fullName.trim(),
    phoneNumber: body.phoneNumber.trim(),
    whatsappNumber: cleanString(body.whatsappNumber),
    email: cleanString(body.email)?.toLowerCase(),
    city: body.city.trim(),
    country: body.country.trim(),
    organizationName: cleanString(body.organizationName),
    programType: body.programType,
    preferredDate: new Date(body.preferredDate),
    alternateDate: body.alternateDate ? new Date(body.alternateDate) : undefined,
    expectedAttendees: parseAttendees(body.expectedAttendees),
    venueAddress: body.venueAddress.trim(),
    message: cleanString(body.message),
    consent: body.consent === true,
  });

  // Best-effort email notification — don't block on errors
  sendKathaRequestNotification({
    fullName: created.fullName,
    phoneNumber: created.phoneNumber,
    whatsappNumber: created.whatsappNumber,
    email: created.email,
    city: created.city,
    country: created.country,
    organizationName: created.organizationName,
    programType: created.programType,
    preferredDate: created.preferredDate,
    alternateDate: created.alternateDate,
    expectedAttendees: created.expectedAttendees,
    venueAddress: created.venueAddress,
    message: created.message,
  }).catch((err) => logger.error('[katha] notification failed', err));

  sendCreated(
    res,
    { id: String(created._id) },
    'Thank you. Your Katha request has been submitted successfully. The official team will contact you soon.',
  );
};

export const adminListKathaRequests = async (req: Request, res: Response): Promise<void> => {
  const {
    status,
    programType,
    search,
    page = '1',
    limit = '30',
  } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (programType) filter.programType = programType;

  if (search && search.trim()) {
    const re = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { fullName: re },
      { city: re },
      { country: re },
      { organizationName: re },
      { phoneNumber: re },
      { email: re },
    ];
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 30));

  const [items, total] = await Promise.all([
    KathaRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    KathaRequest.countDocuments(filter),
  ]);

  sendSuccess(res, items, 'Katha requests', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.max(1, Math.ceil(total / limitNum)),
  });
};

export const adminGetKathaRequest = async (req: Request, res: Response): Promise<void> => {
  const item = await KathaRequest.findById(req.params.id).lean();
  if (!item) throw ApiError.notFound('Katha request not found');
  sendSuccess(res, item);
};

export const updateKathaRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const { status, adminNote } = req.body as {
    status: 'New' | 'Contacted' | 'Confirmed' | 'Rejected' | 'Completed';
    adminNote?: string;
  };
  const update: Record<string, unknown> = { status };
  if (typeof adminNote === 'string') update.adminNote = adminNote;
  const item = await KathaRequest.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!item) throw ApiError.notFound('Katha request not found');
  sendSuccess(res, item, 'Status updated');
};

export const deleteKathaRequest = async (req: Request, res: Response): Promise<void> => {
  const item = await KathaRequest.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Katha request not found');
  sendSuccess(res, { id: req.params.id }, 'Katha request deleted');
};
