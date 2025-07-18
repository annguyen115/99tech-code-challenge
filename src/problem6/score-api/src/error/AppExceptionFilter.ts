import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './AppError';
import {
  ErrorCode,
  ErrorHttpStatusMap,
  ErrorMessage,
  HttpStatusCode,
} from './ErrorCode';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      const httpCode =
        ErrorHttpStatusMap[exception.statusCode] ||
        HttpStatusCode.INTERNAL_SERVER_ERROR;

      return response.status(httpCode).json({
        statusCode: exception.statusCode,
        errorMessage: exception.errorMessage,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      let errorMessage: string | string[] = 'Unexpected error';
      let statusCode: string | number = 'HTTP_ERROR';

      if (typeof res === 'string') {
        errorMessage = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as Record<string, any>;
        statusCode = (r.statusCode as number) ?? statusCode;
        // if (Array.isArray(r.message)) {
        //   errorMessage = r.message.join(', ');
        // } else {
        //   errorMessage = (r.message as string) ?? errorMessage;
        // }
        errorMessage = (r.message as string | string[]) ?? errorMessage;
      }

      return response.status(status).json({
        statusCode,
        errorMessage,
      });
    }

    console.error('💥 Unhandled error', exception);

    return response.status(500).json({
      statusCode: ErrorCode.INTERNAL,
      errorMessage: ErrorMessage.SOMETHING_WENT_WRONG,
    });
  }
}
