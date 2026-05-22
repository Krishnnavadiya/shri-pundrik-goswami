import { Request, Response } from 'express';
import { LineagePerson } from '../models/LineagePerson';
import { ApiError } from '../utils/ApiError';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export const listLineage = async (req: Request, res: Response): Promise<void> => {
  const { language } = req.query as Record<string, string>;
  const filter: Record<string, unknown> = { status: 'published' };
  if (language) filter.language = language;
  const items = await LineagePerson.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const adminListLineage = async (_req: Request, res: Response): Promise<void> => {
  const items = await LineagePerson.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  sendSuccess(res, items);
};

export const createLineage = async (req: Request, res: Response): Promise<void> => {
  const person = await LineagePerson.create(req.body);
  sendCreated(res, person);
};

export const updateLineage = async (req: Request, res: Response): Promise<void> => {
  const person = await LineagePerson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!person) throw ApiError.notFound('Lineage entry not found');
  sendSuccess(res, person, 'Lineage entry updated');
};

export const deleteLineage = async (req: Request, res: Response): Promise<void> => {
  const person = await LineagePerson.findByIdAndDelete(req.params.id);
  if (!person) throw ApiError.notFound('Lineage entry not found');
  sendSuccess(res, { id: req.params.id }, 'Lineage entry deleted');
};
