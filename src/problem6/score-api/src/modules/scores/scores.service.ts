import { Injectable } from '@nestjs/common';
import { ScoresRepository } from '@modules/scores/scores.repository';

@Injectable()
export class ScoresService {
  constructor(private readonly scoresRepository: ScoresRepository) {}

  updateScore(userId: string, score: number) {
    return this.scoresRepository.updateScoreByUserId(userId, score);
  }
}
