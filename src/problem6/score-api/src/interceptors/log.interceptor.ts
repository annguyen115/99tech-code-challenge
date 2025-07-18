import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { LogService } from '@modules/log/log.service';
import { appConfig } from '@config';
import { Request } from 'express';
import { isPlainObject } from 'lodash';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const originalUrl = req.originalUrl;
    const body = req.body as Record<string, unknown>;
    const start = Date.now();

    const censoredBody = this.censor(body);

    this.logService.info('[Request]', {
      method,
      url: originalUrl,
      body: censoredBody,
    });

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - start;
        const censoredRes = this.censor(response as Record<string, unknown>);

        this.logService.info('[Response]', {
          method,
          url: originalUrl,
          duration: `${duration}ms`,
          response: censoredRes,
        });
      }),
    );
  }

  private censor<T extends Record<string, any>>(data: T): T {
    const walk = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(walk);
      }

      if (isPlainObject(obj)) {
        const result: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(obj as Record<string, any>)) {
          if (appConfig.logger.sensitives.includes(key)) {
            result[key] = '[CENSORED]';
          } else {
            result[key] = walk(value);
          }
        }

        return result;
      }

      return obj;
    };

    return walk(data) as T;
  }
}
