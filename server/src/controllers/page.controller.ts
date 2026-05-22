import { Request, Response } from 'express';
import { Page } from '../models/Page';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const getPageBySlug = async (req: Request, res: Response): Promise<void> => {
  const { language } = req.query as { language?: string };
  const page = await Page.findOne({
    slug: req.params.slug,
    status: 'published',
    ...(language ? { language } : {}),
  }).lean();
  if (!page) throw ApiError.notFound('Page not found');
  sendSuccess(res, page);
};

export const adminListPages = async (_req: Request, res: Response): Promise<void> => {
  const items = await Page.find().sort({ slug: 1 }).lean();
  sendSuccess(res, items);
};

export const createPage = async (req: Request, res: Response): Promise<void> => {
  const page = await Page.create(req.body);
  sendCreated(res, page);
};

export const updatePage = async (req: Request, res: Response): Promise<void> => {
  const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!page) throw ApiError.notFound('Page not found');
  sendSuccess(res, page, 'Page updated');
};

export const deletePage = async (req: Request, res: Response): Promise<void> => {
  const page = await Page.findByIdAndDelete(req.params.id);
  if (!page) throw ApiError.notFound('Page not found');
  sendSuccess(res, { id: req.params.id }, 'Page deleted');
};
