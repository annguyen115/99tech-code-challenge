import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@config';
import { AppExceptionFilter } from '@error/AppExceptionFilter';
import { LoggingInterceptor } from '@interceptors/log.interceptor';
import { LogService } from '@modules/log/log.service';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogService)));
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowedOrigins = appConfig.cors.origins;

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`), false);
      }
    },
    credentials: appConfig.cors.credentials ?? true,
  } as CorsOptions);

  await app.listen(appConfig.port ?? 3000);
}

void bootstrap();
