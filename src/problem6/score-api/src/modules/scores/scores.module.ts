import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score } from '@modules/scores/scores.schema';
import { ScoresRepository } from '@modules/scores/scores.repository';
import { ScoresController } from './scores.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Score.name,
        schema: ScoresModule,
      },
    ]),
  ],
  providers: [ScoresService, ScoresRepository],
  controllers: [ScoresController],
})
export class ScoresModule {}
