import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetUserRankResponsePayload {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  rank: number;
}
