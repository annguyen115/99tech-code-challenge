import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateScoreDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
