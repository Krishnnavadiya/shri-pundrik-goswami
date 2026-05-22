import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.mongoUri, {
      autoIndex: true,
    });
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected');
};
