import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from '@modules/scores/scores.schema';
import { ScoresRepository } from '@modules/scores/scores.repository';
import { ScoresController } from './scores.controller';
import { ScoresGateway } from '@modules/scores/scores.gateway';
import { LogModule } from '@modules/log/log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Score.name,
        schema: ScoreSchema,
      },
    ]),
    LogModule,
  ],
  providers: [ScoresService, ScoresRepository, ScoresGateway],
  controllers: [ScoresController],
})
export class ScoresModule {}
