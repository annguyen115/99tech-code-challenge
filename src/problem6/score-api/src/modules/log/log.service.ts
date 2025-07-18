import pino, { Logger as PinoLogger } from 'pino';

export class LogService {
  private readonly logger: PinoLogger;

  constructor() {
    this.logger = pino({
      redact: ['accessToken', 'refreshToken', 'password'], // 👈 censor field
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      },
    });
  }

  info(message: string, data?: Record<string, unknown>) {
    this.logger.info(data || {}, message);
  }

  error(message: string, data?: unknown) {
    this.logger.error(data || {}, message);
  }

  warn(message: string, data?: unknown) {
    this.logger.warn(data || {}, message);
  }

  debug(message: string, data?: unknown) {
    this.logger.debug(data || {}, message);
  }
}
