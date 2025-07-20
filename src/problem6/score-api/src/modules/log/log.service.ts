// import pino, { Logger as PinoLogger } from 'pino';
import moment, { Moment } from 'moment';
import chalk from 'chalk';

export class LogService {
  // private readonly logger: PinoLogger;

  constructor() {
    // this.logger = pino({
    //   redact: ['accessToken', 'refreshToken', 'password'], // 👈 censor field
    //   transport: {
    //     target: 'pino-pretty',
    //     options: {
    //       colorize: true,
    //       translateTime: 'SYS:standard',
    //     },
    //   },
    // });
  }

  private formatMessage(
    level: string,
    context: string,
    message: string,
  ): string {
    const now: Moment = moment();
    const timestamp = now.format('MM/DD/YYYY, h:mm:ss A');

    const colorMap: Record<string, (msg: string) => string> = {
      log: chalk.green,
      info: chalk.blue,
      error: chalk.red,
      warn: chalk.hex('#FFA500'),
      debug: chalk.white,
    };

    const colorFn = colorMap[level.toLowerCase()] || ((txt) => txt);
    const coloredLevel = colorFn(level.toUpperCase());
    const coloredContext = chalk.bold.yellowBright(`[${context}]`);
    const coloredMessage = colorFn(message);

    const prefix = chalk.green(`[Nest] ${process.pid}  - `);
    return `${prefix}${timestamp}     ${coloredLevel} ${coloredContext} ${coloredMessage}`;
  }

  log(message: string, context = 'LogService', data?: unknown) {
    console.log(this.formatMessage('log', context, message), data || '');
  }

  info(message: string, context = 'LogService', data?: unknown) {
    console.log(this.formatMessage('info', context, message), data || '');
  }

  error(message: string, context = 'LogService', data?: unknown) {
    console.error(
      this.formatMessage(context, 'LogService', message),
      data || '',
    );
  }

  warn(message: string, context = 'LogService', data?: unknown) {
    console.warn(this.formatMessage('warn', context, message), data || '');
  }

  debug(message: string, context = 'LogService', data?: unknown) {
    console.debug(this.formatMessage('debug', context, message), data || '');
  }

  // info(message: string, data?: Record<string, unknown>) {
  //   this.logger.info(
  //     data || {},
  //     this.formatMessage('info', 'LogService', message),
  //   );
  // }
  //
  // error(message: string, data?: unknown) {
  //   this.logger.error(
  //     data || {},
  //     this.formatMessage('error', 'LogService', message),
  //   );
  // }
  //
  // warn(message: string, data?: unknown) {
  //   this.logger.warn(
  //     data || {},
  //     this.formatMessage('warn', 'LogService', message),
  //   );
  // }
  //
  // debug(message: string, data?: unknown) {
  //   this.logger.debug(
  //     data || {},
  //     this.formatMessage('debug', 'LogService', message),
  //   );
  // }
}
