import { Response } from 'express';

interface MetaShape {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: MetaShape,
): Response =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });

export const sendCreated = <T>(res: Response, data: T, message = 'Created'): Response =>
  sendSuccess(res, data, message, 201);
