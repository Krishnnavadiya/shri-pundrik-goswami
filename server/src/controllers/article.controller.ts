import { Request, Response } from 'express';
import slugify from 'slugify';
import { Article } from '../models/Article';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

const buildSlug = (title: string): string =>
  slugify(title, { lower: true, strict: true, trim: true });

export const listArticles = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 12, language, category, search, status } = req.query as Record<
    string,
    string
  >;
  const filter: Record<string, unknown> = {};
  if (language) filter.language = language;
  if (category) filter.category = category;
  if (search) filter.$or = [
    { title: { $regex: search, $options: 'i' } },
    { summary: { $regex: search, $options: 'i' } },
    { tags: { $in: [new RegExp(search, 'i')] } },
  ];
  if (status) filter.status = status;
  else filter.status = 'published';

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const [items, total] = await Promise.all([
    Article.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Article.countDocuments(filter),
  ]);

  sendSuccess(res, items, 'Articles fetched', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const { language } = req.query as { language?: string };
  const article = await Article.findOne({
    slug,
    status: 'published',
    ...(language ? { language } : {}),
  }).lean();
  if (!article) throw ApiError.notFound('Article not found');
  sendSuccess(res, article);
};

export const adminListArticles = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 20, search, status, language } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (language) filter.language = language;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const [items, total] = await Promise.all([
    Article.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Article.countDocuments(filter),
  ]);
  sendSuccess(res, items, 'Articles fetched', 200, {
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
};

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Record<string, unknown>;
  if (!data.slug && typeof data.title === 'string') {
    data.slug = buildSlug(data.title);
  }
  if (!data.publishedAt) data.publishedAt = new Date();
  const article = await Article.create(data);
  sendCreated(res, article);
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const article = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!article) throw ApiError.notFound('Article not found');
  sendSuccess(res, article, 'Article updated');
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const article = await Article.findByIdAndDelete(id);
  if (!article) throw ApiError.notFound('Article not found');
  sendSuccess(res, { id }, 'Article deleted');
};
