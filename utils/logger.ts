/**
 * Clean API Logging Utility for InsightForge AI
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';

export const logger = {
  log: (level: LogLevel, message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] [InsightForge API]`;
    
    switch (level) {
      case 'INFO':
        console.log(`\x1b[36m${prefix}\x1b[0m ${message}`, meta ? meta : '');
        break;
      case 'SUCCESS':
        console.log(`\x1b[32m${prefix}\x1b[0m ${message}`, meta ? meta : '');
        break;
      case 'WARN':
        console.warn(`\x1b[33m${prefix}\x1b[0m ${message}`, meta ? meta : '');
        break;
      case 'ERROR':
        console.error(`\x1b[31m${prefix}\x1b[0m ${message}`, meta ? meta : '');
        break;
    }
  },
  info: (message: string, meta?: any) => logger.log('INFO', message, meta),
  success: (message: string, meta?: any) => logger.log('SUCCESS', message, meta),
  warn: (message: string, meta?: any) => logger.log('WARN', message, meta),
  error: (message: string, meta?: any) => logger.log('ERROR', message, meta),
};
