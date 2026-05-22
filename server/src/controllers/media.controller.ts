import { Request, Response } from 'express';
import { MediaItem } from '../models/MediaItem';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const listMedia = async (req: Request, res: Response): Promise<void> => {
  const { type, language, search, category, page = 1, limit = 24 } = req.query as Record<
    string,
    string
  >;
  const filter: Record<string, unknown> = { status: 'published' };
  if (type) filter.type = type;
  if (language) filter.language = language;
  if (category) filter.category = category;
  if (search) filter.$or = [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const [items, total] = await Promise.all([
    MediaItem.find(filter)
      .sort({ sortOrder: 1, publishedAt: -1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    MediaItem.countDocuments(filter),
  ]);
  sendSuccess(res, items, 'Media fetched', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const listNewsletters = async (req: Request, res: Response): Promise<void> => {
  const { language } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { status: 'published', type: 'newsletter' };
  if (language) filter.language = language;
  const items = await MediaItem.find(filter).sort({ publishedAt: -1 }).lean();
  sendSuccess(res, items);
};

export const adminListMedia = async (req: Request, res: Response): Promise<void> => {
  const { type, search } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (type) filter.type = type;
  if (search) filter.title = { $regex: search, $options: 'i' };
  const items = await MediaItem.find(filter).sort({ createdAt: -1 }).lean();
  sendSuccess(res, items);
};

export const createMedia = async (req: Request, res: Response): Promise<void> => {
  const item = await MediaItem.create(req.body);
  sendCreated(res, item);
};

export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  const item = await MediaItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw ApiError.notFound('Media not found');
  sendSuccess(res, item, 'Media updated');
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  const item = await MediaItem.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Media not found');
  sendSuccess(res, { id: req.params.id }, 'Media deleted');
};

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) throw ApiError.badRequest('No file uploaded');
  const fileObj = file as Express.Multer.File & { path?: string; filename?: string };

  const url = (fileObj.path?.startsWith('http') ? fileObj.path : `/uploads/${fileObj.filename}`) as string;
  sendSuccess(
    res,
    {
      url,
      filename: fileObj.filename,
      mimetype: file.mimetype,
      size: file.size,
      originalName: file.originalname,
    },
    'File uploaded',
  );
};
