import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { data: T }> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: { message: string } | { data: T }) => {
        if (
          data &&
          typeof data === 'object' &&
          Object.keys(data).includes('message')
        ) {
          return data;
        }

        return { data };
      }),
    );
  }
}
