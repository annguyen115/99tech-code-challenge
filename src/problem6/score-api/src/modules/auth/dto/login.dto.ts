import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestPayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
