import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { appConfig } from '@config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresModule } from '@modules/scores/scores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `${appConfig.mongodb.uri}/${appConfig.mongodb.databaseName}`,
    ),
    UsersModule,
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
