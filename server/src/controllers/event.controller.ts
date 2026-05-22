import { Request, Response } from 'express';
import slugify from 'slugify';
import { Event } from '../models/Event';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

const buildSlug = (title: string): string =>
  slugify(title, { lower: true, strict: true, trim: true });

export const listEvents = async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 50,
    language,
    category,
    upcoming,
    from,
    to,
  } = req.query as Record<string, string>;

  const filter: Record<string, unknown> = { status: 'published' };
  if (language) filter.language = language;
  if (category) filter.category = category;

  if (upcoming === 'true') {
    filter.startDate = { $gte: new Date() };
  } else if (from || to) {
    const range: Record<string, Date> = {};
    if (from) range.$gte = new Date(from);
    if (to) range.$lte = new Date(to);
    filter.startDate = range;
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const [items, total] = await Promise.all([
    Event.find(filter)
      .sort({ startDate: 1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Event.countDocuments(filter),
  ]);

  sendSuccess(res, items, 'Events fetched', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  const event = await Event.findOne({ slug: req.params.slug, status: 'published' }).lean();
  if (!event) throw ApiError.notFound('Event not found');
  sendSuccess(res, event);
};

export const adminListEvents = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 30, status, search } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const [items, total] = await Promise.all([
    Event.find(filter)
      .sort({ startDate: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Event.countDocuments(filter),
  ]);
  sendSuccess(res, items, 'Events fetched', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Record<string, unknown>;
  if (!data.slug && typeof data.title === 'string') {
    data.slug = buildSlug(data.title);
  }
  const event = await Event.create(data);
  sendCreated(res, event);
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) throw ApiError.notFound('Event not found');
  sendSuccess(res, event, 'Event updated');
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) throw ApiError.notFound('Event not found');
  sendSuccess(res, { id: req.params.id }, 'Event deleted');
};
