import { Injectable } from '@nestjs/common';
import { ScoresRepository } from '@modules/scores/scores.repository';
import { GetLeaderBoardRespondPayload } from '@modules/scores/dtos/get-leader-board';
import { map } from 'lodash/fp';
import { GetUserRankResponsePayload } from '@modules/scores/dtos/get-user-rank';

@Injectable()
export class ScoresService {
  constructor(private readonly scoresRepository: ScoresRepository) {}

  updateScore(userId: string, score: number) {
    return this.scoresRepository.updateScoreByUserId(userId, score);
  }

  async getLeaderboard(top: number): Promise<GetLeaderBoardRespondPayload[]> {
    const scores = await this.scoresRepository.getTopScore(top);

    return map(
      (score) => ({
        username: score.user?.username,
        fullName: score.user?.fullName,
        score: score.value,
        userId: score.user?.id,
      }),
      scores,
    );
  }

  async getUserRankInfo(userId: string): Promise<GetUserRankResponsePayload> {
    const rankInfo = await this.scoresRepository.getUserRankInfo(userId);

    return {
      userId: rankInfo?.userId,
      rank: rankInfo?.rank,
      score: rankInfo?.score,
    } as GetUserRankResponsePayload;
  }
}
