import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: 'Database validation error',
      errors: Object.values(err.errors).map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: `Invalid value for ${err.path}`,
    });
    return;
  }

  if (
    err &&
    typeof err === 'object' &&
    'code' in err &&
    (err as { code?: number }).code === 11000
  ) {
    res.status(409).json({
      success: false,
      message: 'Duplicate key error',
      details: (err as { keyValue?: unknown }).keyValue,
    });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  logger.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : message,
  });
};
