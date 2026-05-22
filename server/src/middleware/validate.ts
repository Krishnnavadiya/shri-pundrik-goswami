import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodSchema, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      return next(result.error);
    }
    (req as unknown as Record<string, unknown>)[target] = result.data;
    return next();
  };
