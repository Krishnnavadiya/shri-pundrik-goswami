import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';

import { env, isProd } from './config/env';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiters';

const createApp = (): Application => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: isProd ? env.frontendUrl.split(',').map((u) => u.trim()) : true,
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(mongoSanitize());

  if (!isProd) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

  app.use('/api/v1', generalLimiter, apiRoutes);

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      service: 'Shri Pundrik Goswami API',
      docs: '/api/v1/health',
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
