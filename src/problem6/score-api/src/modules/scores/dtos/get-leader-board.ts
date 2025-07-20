import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetLeaderBoardRespondPayload {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
