import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { appConfig } from '@config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresModule } from '@modules/scores/scores.module';
import { LogModule } from '@modules/log/log.module';
import { AuthModule } from '@modules/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { User, UserSchema } from '@modules/users/users.schema';
import { Score, ScoreSchema } from '@modules/scores/scores.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      `${appConfig.mongodb.uri}/${appConfig.mongodb.databaseName}`,
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Score.name,
        schema: ScoreSchema,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: appConfig.logger.sensitives,
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'SYS:standard',
            colorize: true,
          },
        },
      },
    }),
    UsersModule,
    ScoresModule,
    AuthModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
