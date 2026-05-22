type LogArgs = unknown[];

const stamp = () => new Date().toISOString();

export const logger = {
  info: (...args: LogArgs): void => {
    // eslint-disable-next-line no-console
    console.log(`[${stamp()}] [INFO]`, ...args);
  },
  warn: (...args: LogArgs): void => {
    // eslint-disable-next-line no-console
    console.warn(`[${stamp()}] [WARN]`, ...args);
  },
  error: (...args: LogArgs): void => {
    // eslint-disable-next-line no-console
    console.error(`[${stamp()}] [ERROR]`, ...args);
  },
  debug: (...args: LogArgs): void => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug(`[${stamp()}] [DEBUG]`, ...args);
    }
  },
};
