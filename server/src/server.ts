import createApp from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

const start = async (): Promise<void> => {
  await connectDatabase();
  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
    logger.info(`API base: http://localhost:${env.port}/api/v1`);
  });
};

start().catch((err) => {
  logger.error('Fatal startup error:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
});
