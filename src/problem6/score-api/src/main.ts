import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@config';
import { AppExceptionFilter } from '@error/AppExceptionFilter';
import { LoggingInterceptor } from '@interceptors/log.interceptor';
import { LogService } from '@modules/log/log.service';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogService)));
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(appConfig.port ?? 3000);
}

void bootstrap();
