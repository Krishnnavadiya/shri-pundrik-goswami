import { Request, Response } from 'express';
import slugify from 'slugify';
import { Project } from '../models/Project';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const listProjects = async (req: Request, res: Response): Promise<void> => {
  const { language } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { status: 'published' };
  if (language) filter.language = language;
  const items = await Project.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findOne({ slug: req.params.slug, status: 'published' }).lean();
  if (!project) throw ApiError.notFound('Project not found');
  sendSuccess(res, project);
};

export const adminListProjects = async (_req: Request, res: Response): Promise<void> => {
  const items = await Project.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Record<string, unknown>;
  if (!data.slug && typeof data.title === 'string') {
    data.slug = slugify(data.title, { lower: true, strict: true });
  }
  const project = await Project.create(data);
  sendCreated(res, project);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw ApiError.notFound('Project not found');
  sendSuccess(res, project, 'Project updated');
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw ApiError.notFound('Project not found');
  sendSuccess(res, { id: req.params.id }, 'Project deleted');
};
