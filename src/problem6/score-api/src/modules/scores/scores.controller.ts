import { Body, Controller, HttpCode, Put } from '@nestjs/common';
import { Auth } from '@decorators/auth.decorator';
import { UpdateScoreDto } from '@modules/scores/dtos/update-score.dto';
import { ScoresService } from '@modules/scores/scores.service';
import { BaseController } from '@modules/base/base.controller';
import { User } from '@decorators/user.decorator';
import { UserPayload } from '@appTypes/user-payload';

@Controller('scores')
export class ScoresController extends BaseController {
  constructor(private readonly scoresService: ScoresService) {
    super();
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
