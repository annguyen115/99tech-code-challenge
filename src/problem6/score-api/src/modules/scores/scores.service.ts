import { Injectable } from '@nestjs/common';
import { ScoresRepository } from '@modules/scores/scores.repository';
import { GetLeaderBoardRespondPayload } from '@modules/scores/dtos/get-leader-board';
import { map } from 'lodash/fp';
import { GetUserRankResponsePayload } from '@modules/scores/dtos/get-user-rank';
import { ScoresGateway } from '@modules/scores/scores.gateway';

@Injectable()
export class ScoresService {
  constructor(
    private readonly scoresRepository: ScoresRepository,
    private readonly scoresGateway: ScoresGateway,
  ) {}

  async updateScore(userId: string, score: number) {
    await this.scoresRepository.updateScoreByUserId(userId, score);
    this.scoresGateway.emitScoreUpdate();
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
