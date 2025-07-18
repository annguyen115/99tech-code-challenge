import { Body, Controller, Get, HttpCode, Put, Query } from '@nestjs/common';
import { Auth } from '@decorators/auth.decorator';
import { UpdateScoreDto } from '@modules/scores/dtos/update-score.dto';
import { ScoresService } from '@modules/scores/scores.service';
import { BaseController } from '@modules/base/base.controller';
import { User } from '@decorators/user.decorator';
import { UserPayload } from '@appTypes/user-payload';
import { toFinite } from 'lodash';
import { GetUserRankResponsePayload } from '@modules/scores/dtos/get-user-rank';
import { GetLeaderBoardRespondPayload } from '@modules/scores/dtos/get-leader-board';

@Controller('scores')
export class ScoresController extends BaseController {
  constructor(private readonly scoresService: ScoresService) {
    super();
  }

  @Get('leaderboard')
  @Auth()
  async getLeaderBoard(
    @Query('top') top: string,
  ): Promise<GetLeaderBoardRespondPayload[]> {
    const parsedLimit = toFinite(top) || 10;
    return this.scoresService.getLeaderboard(parsedLimit);
  }

  @Get('rank')
  @Auth()
  async getMyRank(
    @User('id') userId: string,
  ): Promise<GetUserRankResponsePayload> {
    return this.scoresService.getUserRankInfo(userId);
  }

  @Put()
  @Auth()
  @HttpCode(200)
  async updateScore(@Body() dto: UpdateScoreDto, @User() user: UserPayload) {
    const { score } = dto;
    const { id: userId, username } = user;
    await this.scoresService.updateScore(userId, score);
    return this.message(`Updated score for user ${username} successfully`);
  }
}
