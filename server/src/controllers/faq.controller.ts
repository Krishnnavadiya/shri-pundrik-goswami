import { Request, Response } from 'express';
import { Faq } from '../models/Faq';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const listFaqs = async (req: Request, res: Response): Promise<void> => {
  const { language, category, search } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { status: 'published' };
  if (language) filter.language = language;
  if (category) filter.category = category;
  if (search) filter.$or = [
    { question: { $regex: search, $options: 'i' } },
    { answer: { $regex: search, $options: 'i' } },
  ];
  const items = await Faq.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const adminListFaqs = async (_req: Request, res: Response): Promise<void> => {
  const items = await Faq.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const createFaq = async (req: Request, res: Response): Promise<void> => {
  const faq = await Faq.create(req.body);
  sendCreated(res, faq);
};

export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!faq) throw ApiError.notFound('FAQ not found');
  sendSuccess(res, faq, 'FAQ updated');
};

export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  const faq = await Faq.findByIdAndDelete(req.params.id);
  if (!faq) throw ApiError.notFound('FAQ not found');
  sendSuccess(res, { id: req.params.id }, 'FAQ deleted');
};
